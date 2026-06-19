const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title:           { type: String, required: true, trim: true },
  slug:            { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt:         { type: String, default: '', maxlength: 160 },
  category:        { type: String, default: 'General', trim: true },
  status:          { type: String, enum: ['draft', 'published'], default: 'draft' },
  tags:            [{ type: String, trim: true }],
  coverImage:      { type: String, default: '' },
  metaTitle:       { type: String, default: '', maxlength: 60 },
  metaDescription: { type: String, default: '', maxlength: 160 },
  metaKeywords:    { type: String, default: '' },
  content:         { type: String, default: '' },
  author:          { type: String, default: 'Red Ball Sports Arena' },
}, { timestamps: true });

blogPostSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

blogPostSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
