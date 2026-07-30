import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Hisar?',
    a: 'Alchemy 360 Sports Arena in Rohtak is approximately 100 km from Hisar — about 100 minutes on NH-9. It is a complete multi-sport complex with cricket, badminton, pickleball, swimming, a gym, and a restaurant.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Hisar?',
    a: 'Alchemy 360 is around 100 km from Hisar city, at Sector 22-D, Jhajjar Road, Rohtak. Most drivers from Hisar reach Alchemy 360 in under 100 minutes on NH-9.',
  },
  {
    q: 'What sports can Hisar visitors access at Alchemy 360?',
    a: 'Cricket (Box 360 circular box cricket + open ground), badminton courts, pickleball courts, open-air swimming pool, and a full gym — all in one complex at Sector 22-D, Jhajjar Road, Rohtak.',
  },
  {
    q: 'Is Alchemy 360 worth the drive from Hisar?',
    a: 'For a dedicated sports day, absolutely. Alchemy 360 is the most complete sports complex in Haryana — the range of facilities, the quality of infrastructure, and the on-site restaurant make it a full-day destination that Hisar simply cannot match locally.',
  },
  {
    q: 'Does Alchemy 360 Sports Arena have a sports academy for kids?',
    a: "Yes. Alchemy 360's sports academy offers structured coaching for children in cricket and badminton. Hisar families visiting Rohtak can enrol their kids or arrange trial sessions. Call +91 93500 76653.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Hisar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Hisar', path: '/sports-complex-hisar' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexHisar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Hisar | Alchemy 360 Sports Arena Rohtak"
        description="Sports complex near Hisar — Alchemy 360 Sports Arena in Rohtak, ~100 km, ~100 min drive. Cricket (Box 360), badminton, pickleball, swimming, gym & on-site restaurant."
        canonical="/sports-complex-hisar"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-hisar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Hisar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Hisar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 100 km from Hisar — about 100 minutes on NH-9. For Hisar athletes, families, and corporate teams looking for a genuinely complete sports complex, Alchemy 360 in Rohtak is the most worthwhile destination in western Haryana.
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
          Haryana's Most Complete Sports Complex — Alchemy 360 in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Hisar has sports culture but limited multi-sport infrastructure. Alchemy 360 Sports Arena in Rohtak fills that gap. The 100-minute drive on NH-9 puts you at Sector 22-D, Jhajjar Road — a complete sports campus where you can play Box 360 circular box cricket, train at the gym, swim in the open-air pool, play badminton or pickleball, and have a meal at the on-site restaurant all in one visit. For Hisar residents making a day trip, Alchemy 360 is worth planning around.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Sports Academy for Kids', desc: 'Alchemy 360 offers structured coaching for children in cricket and badminton. Hisar families visiting Rohtak can arrange trial sessions or enrol kids in ongoing coaching programs.' },
            { title: 'Box 360 + Open Ground', desc: "Cricket at Alchemy 360 means two options — the iconic Box 360 24/7 circular box cricket ground, or the open cricket ground for traditional formats. Both are bookable online." },
            { title: 'Everything in One Stop', desc: "Alchemy 360's on-site restaurant caps off a full sports day for Hisar visitors — eat a proper meal before the NH-9 drive back, without scrambling for food on the road." },
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
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
              { label: 'Gym Near Hisar', to: '/gym-hisar' },
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
