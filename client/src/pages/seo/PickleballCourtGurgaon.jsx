import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a pickleball court near Gurgaon outside Delhi NCR?',
    a: 'Alchemy 360 in Rohtak has one of Haryana\'s best pickleball courts — approximately 90 km and 90 minutes from Gurgaon. For players wanting a quality court away from the city crowd, it\'s well worth the drive.',
  },
  {
    q: 'How far is Alchemy 360 from Gurgaon?',
    a: 'Alchemy 360 is located in Sector 22-D, Jhajjar Road, Rohtak — approximately 90 km from Gurgaon, reachable in about 90 minutes via the Gurgaon–Jhajjar–Rohtak route.',
  },
  {
    q: 'Why would a Gurgaon player travel to Rohtak for pickleball?',
    a: 'Gurgaon pickleball courts tend to be busy, expensive, or limited. Alchemy 360 in Rohtak offers a dedicated court with a less crowded experience, competitive pricing, and a full multi-sport complex to enjoy alongside pickleball.',
  },
  {
    q: 'Can I combine pickleball with other sports at Alchemy 360?',
    a: 'Absolutely. Alchemy 360 also has badminton courts (Box 360 circular format), and a gymnasium. Gurgaon visitors often plan a full-day sports trip combining multiple activities.',
  },
  {
    q: 'Is advance booking required for the pickleball court at Alchemy 360?',
    a: 'Advance booking is recommended, especially on weekends when slots fill up. Call +91 93500 76653 or book online to secure your court time before making the trip from Gurgaon.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Pickleball',
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Pickleball Court Rohtak', path: '/pickleball-court-rohtak' },
    { name: 'Pickleball Court Gurgaon', path: '/pickleball-court-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function PickleballCourtGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Pickleball Court Near Gurgaon | Alchemy 360 Rohtak"
        description="Pickleball court near Gurgaon — Alchemy 360 in Rohtak, 90 km / 90 minutes away. Dedicated court, multi-sport complex, less crowded than city options. Book now."
        canonical="/pickleball-court-gurgaon"
        schema={schema}
      />

      <SportsNav activePath="/pickleball-court-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pickleball · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Pickleball Court Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Tired of overpriced, overcrowded courts in Gurgaon? Alchemy 360 in Rohtak is 90 km and 90 minutes away — and the difference is night and day. A dedicated pickleball court, a full multi-sport complex, and a relaxed sporting atmosphere await Gurgaon players willing to make the drive to Haryana's finest sports arena.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/pickleball" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Pickleball Court
            </Link>
            <Link to="/badminton-court-gurgaon" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Badminton Near Gurgaon
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          The Gurgaon Pickleball Escape — Come to Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon has a fast-growing pickleball community, but court availability in the city can be frustrating — slots book out, prices run high, and the atmosphere is often rushed. Alchemy 360 in Rohtak offers a different experience: a dedicated pickleball court in a sprawling multi-sport complex where you can book ahead, arrive relaxed, and play without the usual city hassle. The 90-minute drive from Gurgaon becomes a sports day out rather than just a court booking. Combine pickleball with badminton on professional courts, or a session in the gymnasium — all under one roof.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Escape the City Court Rush', desc: 'Gurgaon courts are busy and expensive. Alchemy 360 in Rohtak offers an uncrowded, well-maintained pickleball court with easy booking and transparent pricing.' },
            { title: 'Full-Day Sports Experience', desc: 'Don\'t just play pickleball — pair it with badminton, or a swim. Alchemy 360 is a complete sports complex, making the 90-minute drive from Gurgaon genuinely worthwhile.' },
            { title: 'Eat After You Play + Restaurant', desc: 'Cap your sports day with a proper meal at Alchemy 360\'s on-site restaurant before the drive back to Gurgaon. Good food, great sport — all in one place.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Pickleball Court Rohtak', to: '/pickleball-court-rohtak' },
              { label: 'Badminton Court Gurgaon', to: '/badminton-court-gurgaon' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
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
