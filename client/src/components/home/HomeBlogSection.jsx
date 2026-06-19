import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { blogPosts, getBlogCoverImage } from '../../data/blogPosts';
import api from '../../lib/axios';

const categoryColors = {
  Cricket:      { bg: 'bg-red-50',    text: 'text-red-600'    },
  Swimming:     { bg: 'bg-blue-50',   text: 'text-blue-600'   },
  Badminton:    { bg: 'bg-green-50',  text: 'text-green-700'  },
  Pickleball:   { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Events:       { bg: 'bg-purple-50', text: 'text-purple-700' },
  Gym:          { bg: 'bg-gray-100',  text: 'text-gray-700'   },
  Football:     { bg: 'bg-orange-50', text: 'text-orange-600' },
  Membership:   { bg: 'bg-indigo-50', text: 'text-indigo-700' },
  'Kids Academy':{ bg: 'bg-pink-50',  text: 'text-pink-700'   },
};

const staticBySlug = Object.fromEntries(blogPosts.map(p => [p.slug, p]));
const fallback = blogPosts.slice(0, 3);

function PostCard({ post, i }) {
  const col = categoryColors[post.category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  const image = post.coverImage || getBlogCoverImage(post.slug);
  const title  = post.h1 || post.title;
  const intro  = post.intro || post.excerpt || '';
  const date   = post.date || post.createdAt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/8 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
      >
        {/* Cover image */}
        <div className="h-44 overflow-hidden bg-[#F0EDEA] shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Category + date bar */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${col.bg} ${col.text}`}>
            {post.category}
          </span>
          <span className="text-[11px] text-white/35">
            {date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
          </span>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3 flex-1">
            {intro}
          </p>
          <div className="mt-5 flex items-center gap-1 text-primary text-sm font-semibold">
            Read article <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeBlogSection() {
  const { data } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: () => api.get('/blog/featured/list').then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });

  // Resolve each featured slug to a post object
  let posts = fallback;
  if (data?.slugs?.length) {
    const resolved = data.slugs
      .map(slug => data.dbPosts?.[slug] ?? staticBySlug[slug])
      .filter(Boolean);
    if (resolved.length > 0) posts = resolved;
  }

  return (
    <section className="bg-[#0A0D0D] py-20 md:py-28" data-theme="dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-bold tracking-[0.22em] text-primary uppercase mb-2">
              From the Arena
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white leading-none uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
            >
              Latest from the Blog
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-[#0A0D0D] transition-all duration-200 whitespace-nowrap"
            >
              View all articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => <PostCard key={post.slug} post={post} i={i} />)}
        </div>

      </div>
    </section>
  );
}
