import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Hisar?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest professional cricket ground to Hisar — approximately 100 km away, around 100 minutes on NH-9. It includes both an open cricket ground and Box 360, a 24/7 circular box cricket ground.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Hisar?',
    a: 'Alchemy 360 is around 100 km from Hisar city, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 100 minutes on NH-9.',
  },
  {
    q: 'Is the drive from Hisar to Alchemy 360 straightforward?',
    a: 'Yes. NH-9 connects Hisar and Rohtak directly — the drive is on a good road with no major diversions. Alchemy 360 is at Sector 22-D, Jhajjar Road, easy to locate on arrival in Rohtak.',
  },
  {
    q: 'Can Hisar teams book the Box 360 cricket ground?',
    a: "Yes. Box 360 — Rohtak's first 24/7 circular box cricket ground — is available for online booking at any time. Hisar teams can schedule a late-night session or an early morning match with equal ease.",
  },
  {
    q: 'What should Hisar teams plan for a full day at Alchemy 360?',
    a: 'Start with Box 360 or open ground cricket, follow with a session at the gym or badminton courts, swim in the open-air pool, and finish with a meal at the on-site restaurant before driving back to Hisar on NH-9.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Hisar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Near Hisar', path: '/cricket-ground-hisar' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundHisar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Hisar | Alchemy 360 Sports Arena Rohtak"
        description="Cricket ground near Hisar — Alchemy 360 Sports Arena in Rohtak, ~100 km on NH-9, ~100 min drive. Open ground + Box 360 24/7 circular box cricket, online booking available."
        canonical="/cricket-ground-hisar"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-hisar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Near Hisar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Hisar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 100 km from Hisar — around 100 minutes on NH-9. For Hisar cricket players and teams that want a professional setting with both traditional open ground and Box 360 circular box cricket, Alchemy 360 is the most complete cricket destination in western Haryana.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/cricket-ground-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Ground Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Hisar's Best Cricket Option Is in Rohtak — 100 Minutes Away
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Hisar has a rich cricket heritage — NCA-linked players, strong college teams, and a passionate district cricket community. But professional ground infrastructure has been a gap. Alchemy 360 Sports Arena in Rohtak addresses that gap directly: 100 minutes on NH-9 brings Hisar cricket teams to Sector 22-D, Jhajjar Road, Rohtak, where two cricket formats await. The open ground for traditional pitch cricket, and Box 360 — Rohtak's first 24/7 circular box cricket ground that offers a completely different format around the clock. Combined with the multi-sport complex, making the trip from Hisar a full day's value is easy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH-9 Direct Route', desc: 'Hisar to Rohtak on NH-9 — a clear highway drive with no major diversions. Alchemy 360 is at Sector 22-D, Jhajjar Road, easy to find at the Rohtak end of the journey.' },
            { title: 'Box 360 — A First for Haryana', desc: "Rohtak's first 24/7 circular box cricket ground. Hisar teams book Box 360 for its unique format — 360-degree play, contained space, and the flexibility of booking at any hour." },
            { title: 'Fuel Up Before You Leave', desc: "Alchemy 360's on-site restaurant ensures Hisar teams are well-fed before the 100-minute drive back on NH-9 — proper food, on-site, no side trips needed." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Sports Complex Hisar', to: '/sports-complex-hisar' },
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
