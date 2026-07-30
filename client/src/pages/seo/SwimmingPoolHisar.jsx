import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a swimming pool near Hisar worth the drive?',
    a: 'Alchemy 360 Sports Arena in Rohtak has an open-air swimming pool about 100 km from Hisar — roughly 100 minutes on NH-9. For Hisar swimmers wanting a quality facility within Haryana, it is a well-regarded option.',
  },
  {
    q: 'How far is Alchemy 360 from Hisar for swimming?',
    a: 'Alchemy 360 Sports Arena is approximately 100 km from Hisar, reachable via NH-9 towards Rohtak in about 90–100 minutes. The complex is at Sector 22-D, Jhajjar Road, Rohtak.',
  },
  {
    q: 'Can Hisar swimmers book the Alchemy 360 pool online?',
    a: 'Yes. Swimming sessions at Alchemy 360 can be booked and confirmed online before you travel from Hisar — so your slot is secure when you arrive.',
  },
  {
    q: 'Is the swimming pool at Alchemy 360 open early morning for Hisar visitors?',
    a: 'Alchemy 360 offers early morning swim sessions. Hisar visitors planning an early start can check available slots online or call +91 93500 76653 to confirm morning timings.',
  },
  {
    q: 'What other sports can Hisar visitors enjoy at Alchemy 360 besides swimming?',
    a: "At Alchemy 360, Hisar visitors can access the gym, badminton courts, Box 360 box cricket (Rohtak's first 24/7 circular cricket facility), and pickleball courts — all in one visit. The on-site restaurant handles meals.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Hisar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Hisar', path: '/swimming-pool-hisar' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolHisar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Hisar | Alchemy 360 Sports Arena Rohtak"
        description="Swimming pool near Hisar — Alchemy 360 Sports Arena, Rohtak, 100 km / 100 min away via NH-9. Open-air pool, gym, cricket, badminton — book online."
        canonical="/swimming-pool-hisar"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-hisar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Hisar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Hisar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For Hisar swimmers seeking a properly managed open-air pool within Haryana, Alchemy 360 Sports Arena in Rohtak is the answer — 100 km via NH-9, approximately 100 minutes. The drive is on an established national highway, and what awaits in Rohtak is a complete sports complex where a swim is just the start of what's possible.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Swimming Session
            </Link>
            <Link to="/swimming-pool-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Pool Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Alchemy 360 is Hisar's Best Swimming Option in Haryana
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Hisar has road connections west of Rohtak, making Alchemy 360 Sports Arena the most natural Haryana sports destination for Hisar residents heading east. The open-air pool is well-maintained and part of a multi-sport complex that gives Hisar visitors every reason to plan a full day. Alchemy 360's Box 360 circular cricket facility — the first of its kind in Rohtak, operating 24/7 — is an added attraction that Hisar cricket fans especially enjoy alongside their swim.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH-9 from Hisar', desc: 'National Highway 9 connects Hisar to Rohtak directly. The 100-minute drive is straightforward and consistent — no tricky detours.' },
            { title: 'Open-Air Pool Quality', desc: 'Alchemy 360\'s outdoor pool in Rohtak is maintained to a standard Hisar swimmers can rely on for both fitness laps and recreational use.' },
            { title: 'Eat & Unwind', desc: "After your swim and any additional sports at Alchemy 360, the on-site restaurant is where Hisar visitors settle in before the return journey on NH-9." },
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
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
