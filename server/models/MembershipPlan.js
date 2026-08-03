const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
  },
  duration: {
    type: String, // e.g., "5 Minutes", "1 Month"
    required: true,
  },
  durationValue: {
    type: Number,
    required: true,
    default: 30,
  },
  durationUnit: {
    type: String,
    enum: ['minutes', 'hours', 'days', 'months', 'years'],
    default: 'days',
  },
  // Keep for backwards compatibility
  durationDays: {
    type: Number,
  },
  sportsIncluded: [{
    type: String,
  }],
  isAllServices: {
    type: Boolean,
    default: false,
  },
  requiresSlotBooking: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  gstPercent: {
    type: Number,
    default: 18,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  autoSync: {
    type: Boolean,
    default: true,
  },
  // Combo / specialty plans created by hand in Super Admin → Sports → Combo Plans.
  // They are never derived from a single sport's pricing fields, so the sport
  // sync must not treat them as that sport's plan for a given duration.
  isStandalone: {
    type: Boolean,
    default: false,
  },
  features: [{
    type: String,
  }],
  image: {
    type: String,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  // Training add-on
  trainingAvailable: {
    type: Boolean,
    default: false,
  },
  trainingPrice: {
    type: Number,
    default: 0,
  },
  basePrice: {
    type: Number,
  },

  // Kids Academy add-on flags
  isKidsAcademy: {
    type: Boolean,
    default: false,
  },
  coachIncluded: {
    type: Boolean,
    default: false,
  },
  admissionFeeRequired: {
    type: Boolean,
    default: false,
  },
  admissionFeeAmount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);
