import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, ContactBand } from '../../components/seo/SEOLandingLayout';
import { blogPosts } from '../../data/blogPosts';

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

export default function BlogIndex() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Blog | Cricket, Badminton, Swimming Tips | Red Ball Sports Arena Rohtak"
        description="Expert articles on cricket, badminton, swimming, fitness, and sports events in Rohtak and Haryana from Red Ball Sports Arena — Rohtak's premier multi-sport complex."
        canonical="/blog"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Red Ball Sports Arena Blog',
          description: 'Expert sports content from Red Ball Sports Arena, Rohtak, Haryana',
          url: 'https://www.redballsportsarena.in/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Red Ball Sports Arena',
            url: 'https://www.redballsportsarena.in',
          },
        }}
      />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak Sports · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Blog
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Cricket, badminton, swimming, fitness, and everything sports in Rohtak. Expert guides, tips, and local knowledge from Red Ball Sports Arena.
          </p>
        </div>
      </section>

      <nav className="bg-white border-b border-black/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link to="/" className="text-[#0D0D0D]/50 hover:text-[#C8102E] transition-colors">← Home</Link>
          <span className="text-[#0D0D0D]/30">/</span>
          <span className="text-[#0D0D0D]">Blog</span>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block bg-white border border-black/8 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-[#F9F6F1] h-36 flex items-center justify-center px-4">
                <span className="text-3xl font-black text-[#0D0D0D]/10 text-center leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {post.title.split(':')[0]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#0D0D0D]/40">{post.date}</span>
                </div>
                <h2 className="font-bold text-[#0D0D0D] text-sm leading-snug mb-2 group-hover:text-[#C8102E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {post.title}
                </h2>
                <p className="text-xs text-[#0D0D0D]/60 leading-relaxed line-clamp-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {post.metaDescription}
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
