const SessionConfig = require('../models/SessionConfig');
const { invalidateConfigCache } = require('../utils/sessionCalculator');

// GET /api/session-config — returns all configs (global + sport overrides)
exports.getAll = async (req, res) => {
  try {
    let data = await SessionConfig.find({}).sort({ type: 1, key: 1 }).lean();

    // Auto-create the global default on first access so the UI always has something to show
    if (!data.find((c) => c.key === 'default')) {
      const defaultDoc = await SessionConfig.findOneAndUpdate(
        { key: 'default' },
        { $setOnInsert: { key: 'default', type: 'global', allowedDurationMinutes: 75, overtimeThresholdMinutes: 0, lateFeePerMinuteOverride: null, autoCheckoutAfterMinutes: 240 } },
        { upsert: true, new: true }
      );
      data = [defaultDoc.toObject(), ...data];
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/session-config — upsert the global default config
exports.upsertGlobal = async (req, res) => {
  try {
    const {
      allowedDurationMinutes,
      overtimeThresholdMinutes,
      lateFeePerMinuteOverride,
      autoCheckoutAfterMinutes,
    } = req.body;

    const update = {};
    if (allowedDurationMinutes !== undefined) update.allowedDurationMinutes = Number(allowedDurationMinutes);
    if (overtimeThresholdMinutes !== undefined) update.overtimeThresholdMinutes = Number(overtimeThresholdMinutes);
    if (lateFeePerMinuteOverride !== undefined)
      update.lateFeePerMinuteOverride = lateFeePerMinuteOverride === '' || lateFeePerMinuteOverride === null
        ? null
        : Number(lateFeePerMinuteOverride);
    if (autoCheckoutAfterMinutes !== undefined) update.autoCheckoutAfterMinutes = Number(autoCheckoutAfterMinutes);
    update.updatedBy = req.user?.userId || req.user?.id;
    update.$inc = { configVersion: 1 };

    const config = await SessionConfig.findOneAndUpdate(
      { key: 'default' },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    invalidateConfigCache();
    res.json({ success: true, data: config });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/session-config/sport/:sportSlug — upsert a sport-specific override
exports.upsertSport = async (req, res) => {
  try {
    const { sportSlug } = req.params;
    const {
      allowedDurationMinutes,
      overtimeThresholdMinutes,
      lateFeePerMinuteOverride,
      autoCheckoutAfterMinutes,
    } = req.body;

    const update = { type: 'sport', sportSlug: sportSlug.toLowerCase() };
    if (allowedDurationMinutes !== undefined) update.allowedDurationMinutes = Number(allowedDurationMinutes);
    if (overtimeThresholdMinutes !== undefined) update.overtimeThresholdMinutes = Number(overtimeThresholdMinutes);
    if (lateFeePerMinuteOverride !== undefined)
      update.lateFeePerMinuteOverride = lateFeePerMinuteOverride === '' || lateFeePerMinuteOverride === null
        ? null
        : Number(lateFeePerMinuteOverride);
    if (autoCheckoutAfterMinutes !== undefined) update.autoCheckoutAfterMinutes = Number(autoCheckoutAfterMinutes);
    update.updatedBy = req.user?.userId || req.user?.id;

    const config = await SessionConfig.findOneAndUpdate(
      { key: `sport:${sportSlug.toLowerCase()}` },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    invalidateConfigCache();
    res.json({ success: true, data: config });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/session-config/:id — remove a sport override (can't delete the global default)
exports.deleteSportConfig = async (req, res) => {
  try {
    const config = await SessionConfig.findById(req.params.id);
    if (!config) return res.status(404).json({ success: false, message: 'Config not found' });
    if (config.key === 'default') return res.status(400).json({ success: false, message: 'Cannot delete the global default config' });

    await SessionConfig.findByIdAndDelete(req.params.id);
    invalidateConfigCache();
    res.json({ success: true, message: 'Sport config removed — now inheriting global defaults' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
