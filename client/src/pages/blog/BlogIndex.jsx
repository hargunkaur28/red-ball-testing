import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, ContactBand } from '../../components/seo/SEOLandingLayout';
import { blogPosts, getBlogCoverImage } from '../../data/blogPosts';
import api from '../../lib/axios';

const categoryColors = {
  Cricket: 'bg-red-100 text-red-700',
  Swimming: 'bg-blue-100 text-blue-700',
  Badminton: 'bg-green-100 text-green-700',
  Pickleball: 'bg-yellow-100 text-yellow-700',
  Events: 'bg-purple-100 text-purple-700',
  Gym: 'bg-gray-100 text-gray-700',
  Football: 'bg-orange-100 text-orange-700',
  Fitness: 'bg-teal-100 text-teal-700',
  Membership: 'bg-indigo-100 text-indigo-700',
  'Kids Academy': 'bg-pink-100 text-pink-700',
};

const staticBySlug = Object.fromEntries(blogPosts.map(p => [p.slug, p]));

export default function BlogIndex() {
  const { data } = useQuery({
    queryKey: ['blog-index-posts'],
    queryFn: () => api.get('/blog?status=published&limit=100').then(r => r.data),
    staleTime: 2 * 60 * 1000,
  });

  const dbPosts = data?.posts ?? [];
  const dbBySlug = Object.fromEntries(dbPosts.map(p => [p.slug, p]));

  // Static posts with DB data overlaid where available
  const staticMerged = blogPosts.map(p => ({
    ...p,
    coverImage: dbBySlug[p.slug]?.coverImage || getBlogCoverImage(p.slug),
    title: dbBySlug[p.slug]?.title || p.title,
    excerpt: dbBySlug[p.slug]?.excerpt || p.metaDescription || '',
  }));

  // DB-only posts (created via admin, not in static data)
  const dbOnly = dbPosts
    .filter(p => !staticBySlug[p.slug])
    .map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.createdAt,
      coverImage: p.coverImage || getBlogCoverImage(p.slug),
      excerpt: p.excerpt || '',
    }));

  const allPosts = [...staticMerged, ...dbOnly];

  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Blog | Cricket, Badminton, Swimming Tips | Alchemy 360 Sports Arena Rohtak"
        description="Expert articles on cricket, badminton, swimming, fitness, and sports events in Rohtak and Haryana from Alchemy 360 Sports Arena — Rohtak's premier multi-sport complex."
        canonical="/blog"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Alchemy 360 Sports Arena Blog',
          description: 'Expert sports content from Alchemy 360 Sports Arena, Rohtak, Haryana',
          url: 'https://www.alchemy360.in/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Alchemy 360 Sports Arena',
            url: 'https://www.alchemy360.in',
          },
        }}
      />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak Sports · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Blog
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Cricket, badminton, swimming, fitness, and everything sports in Rohtak. Expert guides, tips, and local knowledge from Alchemy 360 Sports Arena.
          </p>
        </div>
      </section>

      <nav className="bg-white border-b border-black/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link to="/" className="text-[#0D0D0D]/50 hover:text-[#C5DB3B] transition-colors">← Home</Link>
          <span className="text-[#0D0D0D]/30">/</span>
          <span className="text-[#0D0D0D]">Blog</span>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block bg-white border border-black/8 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-44 overflow-hidden bg-[#F0EDEA]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#0D0D0D]/40">
                    {post.date ? new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                  </span>
                </div>
                <h2 className="font-bold text-[#0D0D0D] text-sm leading-snug mb-2 group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {post.title}
                </h2>
                <p className="text-xs text-[#0D0D0D]/60 leading-relaxed line-clamp-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTAStrip />
      <ContactBand />
    </SEOLandingLayout>
  );
}
