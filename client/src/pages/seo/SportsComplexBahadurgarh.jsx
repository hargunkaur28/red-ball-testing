import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Bahadurgarh?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest multi-sport complex to Bahadurgarh — approximately 45 km, about 40 minutes on NH-334B. It offers cricket, badminton, pickleball, swimming, a gym, and an on-site restaurant.',
  },
  {
    q: 'How long does it take to drive from Bahadurgarh to Alchemy 360?',
    a: 'The drive from Bahadurgarh to Alchemy 360 Sports Arena in Rohtak takes approximately 40 minutes on NH-334B. The facility is at Sector 22-D, Jhajjar Road, Rohtak.',
  },
  {
    q: 'Does Alchemy 360 have a swimming pool?',
    a: 'Yes. Alchemy 360 Sports Arena has an open-air swimming pool — one of the best-maintained pools accessible from Bahadurgarh. Swimming sessions and memberships are available.',
  },
  {
    q: 'Can Bahadurgarh corporate groups book multiple sports facilities?',
    a: 'Yes. Multi-sport corporate events combining cricket, football, badminton, and more can be arranged at Alchemy 360. Call +91 93500 76653 to plan a corporate sports day.',
  },
  {
    q: 'Is the Alchemy 360 gym open early for Bahadurgarh visitors who travel in the morning?',
    a: 'Yes. The gym at Alchemy 360 opens at 5:00 AM, seven days a week — ideal for Bahadurgarh visitors who want to arrive early and train before the day gets busy.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Bahadurgarh', path: '/sports-complex-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Bahadurgarh | Alchemy 360 Sports Arena Rohtak"
        description="Sports complex near Bahadurgarh — Alchemy 360 Sports Arena in Rohtak, ~45 km, 40 min drive. Cricket, badminton, pickleball, swimming pool, gym & restaurant."
        canonical="/sports-complex-bahadurgarh"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 45 km from Bahadurgarh — around 40 minutes on NH-334B. For Bahadurgarh residents wanting a complete multi-sport facility without going all the way into Delhi, Alchemy 360 is the most practical destination in the region.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore Facilities
            </Link>
            <Link to="/sports-complex-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Full Complex Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Skip Delhi — Rohtak's Alchemy 360 Has It All
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh sits on the edge of Delhi, but heading west to Rohtak for sports is often faster and far less stressful than navigating Delhi's traffic. Alchemy 360 Sports Arena at Sector 22-D, Jhajjar Road, Rohtak is a 40-minute drive with no major congestion — and the facility genuinely competes with the best Delhi has to offer. Cricket, badminton, pickleball, a swimming pool, a full gym, and an on-site restaurant — all accessible, all bookable online.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Rohtak Over Delhi', desc: 'From Bahadurgarh, Rohtak is faster and easier than Delhi. Alchemy 360 gives you the same quality facilities without the capital\'s traffic and parking nightmare.' },
            { title: 'Cricket + Swimming + Gym', desc: 'Bring the whole family — one plays cricket, another swims, another hits the gym. Alchemy 360 covers all bases for Bahadurgarh families wanting proper sports access.' },
            { title: 'Lunch on-site', desc: "Alchemy 360's on-site restaurant means you can eat between sessions or after — no need to search for food on the Bahadurgarh–Rohtak highway." },
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
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Cricket Ground Bahadurgarh', to: '/cricket-ground-bahadurgarh' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Football Ground Bahadurgarh', to: '/football-ground-bahadurgarh' },
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
