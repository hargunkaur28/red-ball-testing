const AcademySettings = require('../models/AcademySettings');
const cache = require('../utils/memCache');

const PUBLIC_CACHE_KEY = 'academy-settings-public';

exports.getPublicAcademySettings = async (req, res) => {
  try {
    const cached = cache.get(PUBLIC_CACHE_KEY);
    if (cached) return res.json(cached);

    const settings = await AcademySettings.findOne();
    const payload = {
      success: true,
      data: {
        academyName: settings?.academyName || 'Red Ball Sports Arena',
        address: settings?.address || '',
        phone: settings?.phone || '',
        email: settings?.email || '',
        operatingHours: settings?.operatingHours || '',
      },
    };
    cache.set(PUBLIC_CACHE_KEY, payload, 5 * 60_000); // 5 min TTL
    res.json(payload);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
};

exports.getAcademySettings = async (req, res) => {
  try {
    let settings = await AcademySettings.findOne();
    if (!settings) {
      settings = await AcademySettings.create({
        academyName: 'Red Ball Cricket Academy',
        address: '123 Sports Complex',
        phone: '',
        email: ''
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching academy settings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch academy settings' });
  }
};

exports.updateAcademySettings = async (req, res) => {
  try {
    const { academyName, address, phone, email, operatingHours } = req.body;
    let settings = await AcademySettings.findOne();
    
    if (!settings) {
      settings = new AcademySettings();
    }
    
    if (academyName !== undefined) settings.academyName = academyName;
    if (address !== undefined) settings.address = address;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (operatingHours !== undefined) settings.operatingHours = operatingHours;

    settings.updatedBy = req.user.id;
    await settings.save();
    cache.invalidate(PUBLIC_CACHE_KEY);
    res.json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating academy settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update academy settings' });
  }
};
