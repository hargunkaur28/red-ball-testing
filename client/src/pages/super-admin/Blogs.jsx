import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ExternalLink, ArrowLeft, Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon, Quote, Eraser, Star } from 'lucide-react';
import api from '../../lib/axios';
import { blogPosts as staticPosts, getBlogCoverImage } from '../../data/blogPosts';

function staticToDbForm(post) {
  let content = `<p>${post.intro}</p>`;
  post.sections?.forEach(s => {
    content += `<h2>${s.heading}</h2>`;
    s.body.split('\n\n').forEach(p => { content += `<p>${p}</p>`; });
  });
  if (post.faqs?.length) {
    content += '<h2>Frequently Asked Questions</h2>';
    post.faqs.forEach(f => { content += `<h3>${f.q}</h3><p>${f.a}</p>`; });
  }
  return {
    title: post.title,
    slug: post.slug,
    excerpt: (post.metaDescription || post.intro || '').slice(0, 160),
    category: post.category,
    status: 'published',
    tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
    coverImage: getBlogCoverImage(post.slug),
    metaTitle: post.title.slice(0, 60),
    metaDescription: (post.metaDescription || '').slice(0, 160),
    metaKeywords: Array.isArray(post.tags) ? post.tags.join(', ') : '',
    content,
  };
}

const CATEGORIES = ['Badminton', 'Pickleball', 'Gym', 'Fitness', 'Events', 'Membership', 'Coaching', 'Facilities', 'General'];

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', category: 'General', status: 'draft',
  tags: '', coverImage: '', metaTitle: '', metaDescription: '', metaKeywords: '', content: '',
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function readTime(html) {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ── Rich Text Editor ──────────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const lastHtmlRef = useRef(value);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      lastHtmlRef.current = value;
    }
  }, []); // intentionally only on mount — after that the editor owns its own state

  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    flush();
  };

  const flush = () => {
    const html = editorRef.current?.innerHTML ?? '';
    if (html !== lastHtmlRef.current) {
      lastHtmlRef.current = html;
      onChange(html);
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL (include https://)');
    if (url) exec('createLink', url);
  };

  const handleImage = () => {
    const url = prompt('Enter image URL');
    if (url) exec('insertImage', url);
  };

  const tools = [
    { icon: <Bold size={14} />, title: 'Bold', action: () => exec('bold') },
    { icon: <Italic size={14} />, title: 'Italic', action: () => exec('italic') },
    { icon: <span className="text-xs font-bold">H2</span>, title: 'Heading 2', action: () => exec('formatBlock', 'h2') },
    { icon: <span className="text-xs font-bold">H3</span>, title: 'Heading 3', action: () => exec('formatBlock', 'h3') },
    { icon: <List size={14} />, title: 'Bullet list', action: () => exec('insertUnorderedList') },
    { icon: <ListOrdered size={14} />, title: 'Numbered list', action: () => exec('insertOrderedList') },
    { icon: <Link2 size={14} />, title: 'Link', action: handleLink },
    { icon: <ImageIcon size={14} />, title: 'Image', action: handleImage },
    { icon: <Quote size={14} />, title: 'Blockquote', action: () => exec('formatBlock', 'blockquote') },
    { icon: <Eraser size={14} />, title: 'Clear formatting', action: () => exec('removeFormat') },
  ];

  return (
    <div className="border border-[#E5E5E5] rounded-xl overflow-hidden focus-within:border-[#111] transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#E5E5E5] bg-[#FAFAFA]">
        {tools.map((t, i) => (
          <button
            key={i}
            type="button"
            title={t.title}
            onMouseDown={(e) => { e.preventDefault(); t.action(); }}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#EBEBEB] text-[#444] transition-colors"
          >
            {t.icon}
          </button>
        ))}
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={flush}
        onBlur={flush}
        className="min-h-[260px] p-4 text-sm text-[#111] leading-relaxed outline-none prose prose-sm max-w-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        data-placeholder="Start writing your post here..."
      />
      <style>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #aaa; pointer-events: none; }
        [contenteditable] h2 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 .5rem; }
        [contenteditable] h3 { font-size: 1.05rem; font-weight: 700; margin: .75rem 0 .4rem; }
        [contenteditable] blockquote { border-left: 3px solid #C5DB3B; padding-left: .75rem; color: #555; margin: .75rem 0; }
        [contenteditable] ul { list-style: disc; padding-left: 1.5rem; margin: .5rem 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.5rem; margin: .5rem 0; }
        [contenteditable] a { color: #C5DB3B; text-decoration: underline; }
        [contenteditable] img { max-width: 100%; border-radius: .5rem; margin: .5rem 0; }
      `}</style>
    </div>
  );
}

// ── Post Editor Form ──────────────────────────────────────────────────────────
function PostEditor({ post, onClose }) {
  const qc = useQueryClient();
  const isEdit = !!post?._id;
  // static posts are passed as { _prefill: {...} } — unwrap for form init
  const src = post?._prefill ?? post ?? {};

  const [form, setForm] = useState(() => ({
    title: src.title ?? '',
    slug: src.slug ?? '',
    excerpt: src.excerpt ?? '',
    category: src.category ?? 'General',
    status: src.status ?? 'draft',
    tags: typeof src.tags === 'string' ? src.tags : (Array.isArray(src.tags) ? src.tags.join(', ') : ''),
    coverImage: src.coverImage ?? '',
    metaTitle: src.metaTitle ?? '',
    metaDescription: src.metaDescription ?? '',
    metaKeywords: src.metaKeywords ?? '',
    content: src.content ?? '',
  }));
  const [slugLocked, setSlugLocked] = useState(!!src.slug);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(post?.coverImage ?? '');
  const fileRef = useRef(null);

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm(f => {
      const next = { ...f, [field]: val };
      if (field === 'title' && !slugLocked) next.slug = slugify(val);
      return next;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm(f => ({ ...f, coverImage: '' }));
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('imageFile', imageFile);
      if (isEdit) return api.put(`/blog/${post._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      return api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success(isEdit ? 'Post updated' : 'Post created');
      onClose();
    },
    onError: (err) => toast.error(err.response?.data?.message ?? 'Something went wrong'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    if (!form.slug.trim()) return toast.error('Slug is required');
    mutation.mutate(form);
  };

  const mins = readTime(form.content);

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#111] transition-colors">
          <ArrowLeft size={15} /> Back
        </button>
        <div>
          <h2 className="text-lg font-bold text-[#111]">{isEdit ? 'Edit Post' : post?._prefill ? 'Import & Edit Post' : 'New Post'}</h2>
          <p className="text-xs text-[#999] flex items-center gap-1 mt-0.5">
            <span className="inline-block w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">⏱</span>
            Est. read time: {mins} min{mins !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-[#111] mb-1.5">Title <span className="text-red-500">*</span></label>
          <input value={form.title} onChange={set('title')} placeholder="Enter post title"
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors" />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold text-[#111] mb-1.5">
            Slug <span className="text-red-500">*</span>
            <span className="text-[#999] font-normal ml-2">(auto-generated — click to edit)</span>
          </label>
          <input
            value={form.slug}
            onChange={(e) => { setSlugLocked(true); set('slug')(e); }}
            onFocus={() => setSlugLocked(true)}
            placeholder="post-url-slug"
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors font-mono"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-[#111] mb-1.5">
            Excerpt <span className="text-[#999] font-normal">{form.excerpt.length}/160</span>
          </label>
          <textarea value={form.excerpt} onChange={set('excerpt')} maxLength={160}
            placeholder="Short description shown in blog listing (max 160 chars)"
            rows={2}
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors resize-none" />
        </div>

        {/* Category + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">Category</label>
            <select value={form.category} onChange={set('category')}
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] bg-white transition-colors">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">Status</label>
            <select value={form.status} onChange={set('status')}
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] bg-white transition-colors">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Tags + Cover Image */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">Tags <span className="text-[#999] font-normal">(comma-separated)</span></label>
            <input value={form.tags} onChange={set('tags')} placeholder="badminton, rohtak, sports"
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">Cover Image</label>
            <div className="flex gap-2">
              <input
                value={imageFile ? '' : form.coverImage}
                onChange={(e) => { setImageFile(null); setImagePreview(''); set('coverImage')(e); }}
                placeholder="Upload or paste an image URL"
                className="flex-1 min-w-0 border border-[#E5E5E5] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#111] transition-colors"
              />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#555] hover:border-[#111] transition-colors whitespace-nowrap">
                <Plus size={13} /> Upload
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
            {(imagePreview || form.coverImage) && (
              <img src={imagePreview || form.coverImage} alt="preview"
                className="mt-2 h-20 w-full object-cover rounded-lg border border-[#E5E5E5]" />
            )}
          </div>
        </div>

        {/* SEO Meta */}
        <div className="bg-[#FDFAF5] border border-[#E8E0D0] rounded-2xl p-4 space-y-4">
          <p className="text-xs font-bold text-[#7A5C2E] uppercase tracking-wider">SEO Meta</p>
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">
              Meta Title <span className="text-[#999] font-normal">{form.metaTitle.length}/60</span>
            </label>
            <input value={form.metaTitle} onChange={set('metaTitle')} maxLength={60} placeholder="SEO title (max 60 chars)"
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">
              Meta Description <span className="text-[#999] font-normal">{form.metaDescription.length}/160</span>
            </label>
            <textarea value={form.metaDescription} onChange={set('metaDescription')} maxLength={160} rows={2}
              placeholder="Meta description for search engines (max 160 chars)"
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors resize-none bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#111] mb-1.5">Meta Keywords <span className="text-[#999] font-normal">(comma-separated)</span></label>
            <input value={form.metaKeywords} onChange={set('metaKeywords')} placeholder="sports, rohtak"
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:border-[#111] transition-colors bg-white" />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-[#111] mb-1.5">Content <span className="text-red-500">*</span></label>
          <RichEditor value={form.content} onChange={(html) => setForm(f => ({ ...f, content: html }))} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-[#EBEBEB]">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-sm font-semibold text-[#555] hover:border-[#999] transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={mutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#111] text-white text-sm font-bold hover:bg-[#333] disabled:opacity-50 transition-colors">
            {mutation.isPending ? 'Saving…' : (
              <>
                <span className="text-base">📄</span>
                {form.status === 'published' ? 'Publish Post' : 'Save Draft'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Post List ─────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  published: 'bg-green-50 text-green-700 border-green-200',
  draft:     'bg-amber-50 text-amber-700 border-amber-200',
};

export default function Blogs() {
  const qc = useQueryClient();
  const [view, setView] = useState('list'); // 'list' | 'new' | 'edit'
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: () => api.get('/blog').then(r => r.data),
  });

  const { data: featuredData } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: () => api.get('/blog/featured/list').then(r => r.data),
  });

  const featuredSlugs = featuredData?.slugs ?? [];

  const featuredMutation = useMutation({
    mutationFn: (slugs) => api.put('/blog/featured/list', { slugs }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['featured-blogs'] });
      toast.success('Home page updated');
    },
    onError: () => toast.error('Failed to update featured posts'),
  });

  const toggleFeatured = (slug) => {
    const next = featuredSlugs.includes(slug)
      ? featuredSlugs.filter(s => s !== slug)
      : featuredSlugs.length >= 3
        ? (toast.error('Max 3 posts on home page — remove one first'), featuredSlugs)
        : [...featuredSlugs, slug];
    if (next !== featuredSlugs) featuredMutation.mutate(next);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blog/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog-posts'] }); toast.success('Post deleted'); },
    onError: () => toast.error('Failed to delete'),
  });

  const handleDelete = (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(post._id);
  };

  if (view !== 'list') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#EBEBEB] p-6">
        <PostEditor post={view === 'edit' ? editing : null} onClose={() => { setView('list'); setEditing(null); }} />
      </div>
    );
  }

  const dbPosts = data?.posts ?? [];
  const dbSlugs = new Set(dbPosts.map(p => p.slug));

  // Static posts not yet imported to DB
  const staticOnly = staticPosts.filter(p => !dbSlugs.has(p.slug));

  // Combined list: DB posts first, then unimported statics
  const allRows = [
    ...dbPosts.map(p => ({ ...p, _source: 'db' })),
    ...staticOnly.map(p => ({
      _id: null,
      _source: 'static',
      title: p.title,
      slug: p.slug,
      category: p.category,
      status: 'published',
      createdAt: p.date,
      _static: p,
    })),
  ];

  const handleEditStatic = (staticPost) => {
    setEditing({ _prefill: staticToDbForm(staticPost) });
    setView('edit');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#111]">Blog Posts</h1>
          <p className="text-sm text-[#888] mt-0.5">
            {allRows.length} posts total
            {featuredSlugs.length > 0 && (
              <span className="ml-2 text-amber-600 font-medium">· {featuredSlugs.length}/3 shown on home page</span>
            )}
          </p>
        </div>
        <button
          onClick={() => setView('new')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] text-white text-sm font-semibold hover:bg-[#333] transition-colors"
        >
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-[#999] text-sm">Loading…</div>
      ) : allRows.length === 0 ? (
        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-semibold text-[#111] mb-1">No posts yet</p>
          <p className="text-sm text-[#888] mb-5">Create your first blog post to get started.</p>
          <button onClick={() => setView('new')}
            className="px-5 py-2 rounded-xl bg-[#111] text-white text-sm font-semibold hover:bg-[#333] transition-colors">
            Write first post
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0F0F0] bg-[#FAFAFA]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">Title</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="px-3 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider text-center" title="Show on home page">Home</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#888] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((post, i) => {
                const isStatic = post._source === 'static';
                return (
                  <tr key={post._id ?? post.slug} className={`border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors ${i === allRows.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#111] line-clamp-1">{post.title || <span className="text-[#999] italic">Untitled</span>}</span>
                        {isStatic && (
                          <span className="shrink-0 inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">Static</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#AAA] font-mono mt-0.5 line-clamp-1">{post.slug}</div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="text-xs text-[#666]">{post.category}</span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[post.status] ?? STATUS_COLORS.draft}`}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell text-xs text-[#888]">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {(() => {
                        const isFeatured = featuredSlugs.includes(post.slug);
                        return (
                          <button
                            onClick={() => toggleFeatured(post.slug)}
                            disabled={featuredMutation.isPending}
                            title={isFeatured ? 'Remove from home page' : 'Show on home page'}
                            className={`w-7 h-7 mx-auto flex items-center justify-center rounded-lg transition-colors ${
                              isFeatured
                                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                : 'text-[#CCC] hover:text-amber-400 hover:bg-amber-50'
                            }`}
                          >
                            <Star size={13} fill={isFeatured ? 'currentColor' : 'none'} />
                          </button>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer"
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#888] hover:text-[#111] hover:bg-dark-hover transition-colors">
                          <ExternalLink size={13} />
                        </a>
                        {isStatic ? (
                          <button
                            onClick={() => handleEditStatic(post._static)}
                            title="Import to DB and edit"
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#888] hover:text-[#111] hover:bg-dark-hover transition-colors">
                            <Pencil size={13} />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => { setEditing(post); setView('edit'); }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-[#888] hover:text-[#111] hover:bg-dark-hover transition-colors">
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => handleDelete(post)}
                              disabled={deleteMutation.isPending}
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-[#888] hover:text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
