// Keeps Slot.status consistent with currentBookings/capacity.
//
// The Slot schema has a pre('save') hook that derives status from occupancy, but
// every booking path claims capacity with findOneAndUpdate + $inc for atomicity,
// and those bypass Mongoose document middleware. Without this the status field
// drifts — a fully booked slot keeps reading 'available'.
//
// Availability checks should still compare currentBookings against capacity
// directly; this only stops the denormalised field from lying to admin views.
const Slot = require('../models/Slot');

const statusForOccupancy = (slot) => {
  if (slot.isBookable === false) return 'maintenance';
  if (slot.status === 'maintenance') return 'maintenance';
  // Leave in-progress/finished sessions alone — they aren't occupancy states
  if (slot.status === 'ongoing' || slot.status === 'completed') return slot.status;

  const capacity = slot.capacity || 1;
  const occupancy = (slot.currentBookings / capacity) * 100;
  if (occupancy >= 100) return 'full';
  if (occupancy >= 75) return 'filling-fast';
  return 'available';
};

/**
 * Recalculate and persist a slot's status. Accepts the already-updated document
 * returned by findOneAndUpdate, or a slot id.
 */
async function syncSlotStatus(slotOrId) {
  try {
    const slot = typeof slotOrId === 'object' && slotOrId?.capacity !== undefined
      ? slotOrId
      : await Slot.findById(slotOrId);
    if (!slot) return null;

    const next = statusForOccupancy(slot);
    if (next !== slot.status) {
      await Slot.updateOne({ _id: slot._id }, { $set: { status: next } });
    }
    return next;
  } catch (err) {
    // Never let a bookkeeping update break a booking
    console.error('[syncSlotStatus] failed:', err.message);
    return null;
  }
}

module.exports = { syncSlotStatus, statusForOccupancy };
