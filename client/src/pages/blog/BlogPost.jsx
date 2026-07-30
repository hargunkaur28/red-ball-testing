import { useParams, Link, Navigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand } from '../../components/seo/SEOLandingLayout';
import { getBlogPost, getBlogCoverImage, blogPosts } from '../../data/blogPosts';
import { articleSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const schema = [
    articleSchema({
      title: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      slug: post.slug,
    }),
    breadcrumbSchema([
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faqSchema(post.faqs),
  ];

  return (
    <SEOLandingLayout>
      <SEOHead
        title={`${post.title} | Alchemy 360 Sports Arena Blog`}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        schema={schema}
      />

      <nav className="bg-white border-b border-black/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-2 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link to="/" className="text-[#0D0D0D]/50 hover:text-[#C5DB3B] transition-colors">Home</Link>
          <span className="text-[#0D0D0D]/30">/</span>
          <Link to="/blog" className="text-[#0D0D0D]/50 hover:text-[#C5DB3B] transition-colors">Blog</Link>
          <span className="text-[#0D0D0D]/30">/</span>
          <span className="text-[#0D0D0D]">{post.category}</span>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#C5DB3B] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.category}</span>
            <span className="text-xs text-[#0D0D0D]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.date}</span>
            <span className="text-xs text-[#0D0D0D]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>By {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0D0D0D] leading-tight mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            {post.h1}
          </h1>
          <p className="text-base md:text-lg text-[#0D0D0D]/70 leading-relaxed border-l-4 border-[#C5DB3B] pl-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {post.intro}
          </p>
        </header>

        {/* Cover image */}
        <div className="mb-10 rounded-2xl overflow-hidden bg-[#F0EDEA]" style={{ aspectRatio: '16/7' }}>
          <img
            src={getBlogCoverImage(post.slug)}
            alt={post.h1}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="prose max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {post.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
                {section.heading}
              </h2>
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} className="text-[#0D0D0D]/75 leading-relaxed mb-4 text-sm md:text-base">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-black/10">
          <div className="bg-[#F9F6F1] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-[#0D0D0D] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Alchemy 360 Sports Arena</p>
              <p className="text-xs text-[#0D0D0D]/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sector 22-D, Jhajjar Road, Rohtak, Haryana 124001 · +91 93500 76653</p>
            </div>
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#96AC2E] transition-colors whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Slot
            </Link>
          </div>
        </div>
      </article>

      <FAQSection faqs={post.faqs} />

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-10 border-t border-black/10">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More {post.category} Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map(rp => (
              <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group block bg-[#F9F6F1] rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-[#C5DB3B] font-semibold mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{rp.category}</p>
                <h3 className="font-bold text-[#0D0D0D] text-sm leading-snug group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{rp.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          <Link to="/blog" className="px-3 py-1.5 border border-black/20 rounded-full text-xs text-[#0D0D0D] hover:border-[#C5DB3B] hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            ← All Articles
          </Link>
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-[#F9F6F1] rounded-full text-xs text-[#0D0D0D]/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>
          ))}
        </div>
      </section>

      <CTAStrip />
      <ContactBand />
    </SEOLandingLayout>
  );
}
