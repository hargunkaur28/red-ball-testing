const mongoose = require('mongoose');

const heroCardSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  tagline:  { type: String, required: true, trim: true },
  href:     { type: String, required: true, trim: true },
  iconUrl:  { type: String, default: '' },
  color:    { type: String, default: '#C8102E' },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HeroCard', heroCardSchema);
