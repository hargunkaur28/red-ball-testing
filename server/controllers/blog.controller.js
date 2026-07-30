const BlogPost = require('../models/BlogPost');
const SiteSettings = require('../models/SiteSettings');
const cloudinary = require('../config/cloudinary');

const FEATURED_KEY = 'featured_blog_slugs';

exports.getFeatured = async (req, res) => {
  try {
    const setting = await SiteSettings.findOne({ key: FEATURED_KEY }).lean();
    const slugs = setting?.value ?? [];
    // Return DB post data for any featured slugs that exist in DB
    const dbPosts = await BlogPost.find({ slug: { $in: slugs } })
      .select('slug title category excerpt coverImage createdAt status')
      .lean();
    const dbMap = {};
    dbPosts.forEach(p => { dbMap[p.slug] = p; });
    res.json({ slugs, dbPosts: dbMap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setFeatured = async (req, res) => {
  try {
    const { slugs } = req.body;
    if (!Array.isArray(slugs)) return res.status(400).json({ message: 'slugs must be an array' });
    const limited = slugs.slice(0, 3);
    await SiteSettings.findOneAndUpdate(
      { key: FEATURED_KEY },
      { value: limited },
      { upsert: true, new: true }
    );
    res.json({ slugs: limited });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [posts, total] = await Promise.all([
      BlogPost.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      BlogPost.countDocuments(query),
    ]);
    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.coverImage = req.file.path;
    if (body.tags && typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    const post = await BlogPost.create(body);
    res.status(201).json(post);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Slug already in use — choose a different title or edit the slug.' });
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.coverImage = req.file.path;
    if (body.tags && typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    const post = await BlogPost.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Slug already in use.' });
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.coverImage) {
      const parts = post.coverImage.split('/');
      const file = parts[parts.length - 1];
      const publicId = 'alchemy360-uploads/' + file.split('.')[0];
      cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
