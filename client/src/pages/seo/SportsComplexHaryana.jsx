import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is the best sports complex in Haryana?',
    a: 'Alchemy 360 in Rohtak is among Haryana\'s best multi-sport complexes — offering badminton, pickleball, gym, football, and kids academy under one roof.',
  },
  {
    q: 'Where is Alchemy 360 located in Haryana?',
    a: 'Alchemy 360 is located in Rohtak, Haryana — at Sector 22-D, Jhajjar Road, near Village Maina. Rohtak is at the geographic centre of Haryana.',
  },
  {
    q: 'Does Alchemy 360 offer membership plans?',
    a: 'Yes. Alchemy 360 offers monthly, quarterly, and annual membership plans with access to all sports facilities. Multi-sport memberships offer the best value.',
  },
  {
    q: 'What sports are available at Alchemy 360?',
    a: 'Cricket (box cricket and practice ground), badminton, pickleball, gym, football, and a kids sports academy. Plus food court and sports accessories shop.',
  },
  {
    q: 'Is Alchemy 360 suitable for corporate events in Haryana?',
    a: 'Yes. Alchemy 360 is one of Haryana\'s best venues for corporate sports events — offering cricket tournaments, team-building sports days, and multi-sport corporate packages.',
  },
  {
    q: 'Which cities in Haryana is Alchemy 360 accessible from?',
    a: 'Alchemy 360 in Rohtak is accessible from Jhajjar, Bahadurgarh, Sonipat, Panipat, Hisar, Karnal, Gurgaon, and Delhi NCR via well-connected highways.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'State', name: 'Haryana', sameAs: 'https://en.wikipedia.org/wiki/Haryana' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Haryana', path: '/sports-complex-haryana' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexHaryana() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex in Haryana | Best Multi-Sport Facility | Alchemy 360 Rohtak"
        description="Alchemy 360 in Rohtak — Haryana's best sports complex with badminton, gym, pickleball, and kids academy. Membership and online booking available."
        canonical="/sports-complex-haryana"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-haryana" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex in Haryana
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is Haryana's most complete multi-sport complex — offering badminton, pickleball, gym, and football under one roof. Serving players from across Haryana with professional facilities, expert coaching, and flexible membership plans.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Complex
            </Link>
            <Link to="/sports-complex-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore All Sports
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Haryana's Multi-Sport Hub — Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Haryana has always had a strong sports culture — from wrestling and kabaddi to cricket and badminton. Alchemy 360 in Rohtak brings that tradition into a modern, world-class facility that serves players from every corner of Haryana. With its central location in Rohtak, Alchemy 360 is within reach of virtually every major city in the state, making it the natural anchor of sport in Haryana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '6 Sports Under One Roof', desc: 'Badminton, pickleball, gym, and football — the most comprehensive multi-sport complex in Haryana.' },
            { title: 'Central Haryana Location', desc: 'Rohtak\'s central position in Haryana means Alchemy 360 is accessible from Jhajjar, Sonipat, Bahadurgarh, Hisar, and Delhi NCR.' },
            { title: 'Haryana Sports Events', desc: 'Host of the Rohtak Cricket League and regular Haryana-wide sports events — Alchemy 360 is the sports events hub of the region.' },
          ].map(item => (
            <div key={item.title} className="bg-[#F9F6F1] rounded-xl p-5">
              <h3 className="font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
              <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>All Sports at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court', to: '/badminton-court-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
              { label: 'Pickleball', to: '/pickleball-court-rohtak' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                className="px-4 py-2 border border-black/20 rounded-full text-sm text-[#0D0D0D] hover:border-[#C5DB3B] hover:text-[#C5DB3B] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
