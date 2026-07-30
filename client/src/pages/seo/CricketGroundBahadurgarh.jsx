import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Bahadurgarh?',
    a: 'Yes. Alchemy 360 Sports Arena in Rohtak is the nearest professional cricket ground to Bahadurgarh — approximately 30–35 km away via NH 9, reachable in around 35–40 minutes.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Bahadurgarh?',
    a: 'Alchemy 360 Sports Arena is approximately 30–35 km from Bahadurgarh via Delhi–Rohtak NH 9. The drive takes around 35–40 minutes without traffic.',
  },
  {
    q: 'Can teams from Bahadurgarh book the cricket ground?',
    a: 'Yes. Teams and players from Bahadurgarh regularly book Alchemy 360\'s cricket ground. Online slot booking is available — book in advance and arrive ready to play.',
  },
  {
    q: 'Is Alchemy 360 accessible from Bahadurgarh Industrial Area?',
    a: 'Yes. Bahadurgarh\'s industrial area is well-connected to Rohtak via NH 9. Many corporate teams from Bahadurgarh book Alchemy 360 for cricket events.',
  },
  {
    q: 'Does Alchemy 360 host corporate cricket events for Bahadurgarh companies?',
    a: 'Yes. Corporate cricket tournaments and sports days are a speciality at Alchemy 360. Companies from Bahadurgarh regularly organise cricket events at the facility.',
  },
  {
    q: 'Is there a cricket academy near Bahadurgarh?',
    a: 'Alchemy 360 Cricket Academy in Rohtak is the closest professional cricket academy to Bahadurgarh with structured coaching, practice ground, and membership programs.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Bahadurgarh', path: '/cricket-ground-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Bahadurgarh | Alchemy 360 Sports Arena Rohtak"
        description="Best cricket ground near Bahadurgarh — Alchemy 360 Sports Arena in Rohtak, 35 minutes via NH 9. Professional floodlit ground, online booking, corporate cricket events."
        canonical="/cricket-ground-bahadurgarh"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is the premier cricket ground serving Bahadurgarh and the Jhajjar district. Just 30–35 km via NH 9, it's the closest professional floodlit cricket facility to Bahadurgarh. Teams, corporate groups, and cricket enthusiasts from Bahadurgarh regularly book Alchemy 360 for matches and tournaments.
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
          The Go-To Cricket Ground for Bahadurgarh Teams
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh is one of Haryana's fastest-growing industrial and residential cities, yet lacks a premium cricket facility within its limits. Alchemy 360 Sports Arena in Rohtak fills this gap — offering Bahadurgarh teams a world-class cricket ground that's a comfortable drive away. Corporate cricket leagues, college cricket tournaments, and private match bookings from Bahadurgarh are a regular feature at Alchemy 360.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '35 Min via NH 9', desc: 'Direct route from Bahadurgarh to Rohtak via NH 9. Easy to reach for morning, evening, or weekend cricket sessions.' },
            { title: 'Corporate Events', desc: 'Full corporate cricket event management — ground booking, team registration, umpiring, trophies, and food court for Bahadurgarh companies.' },
            { title: 'Full Sports Complex', desc: 'After cricket, enjoy badminton, swimming, gym, or the food court — making Alchemy 360 a full sports day destination from Bahadurgarh.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Nearby Cricket Grounds</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Jhajjar', to: '/cricket-ground-jhajjar' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Cricket Tournaments Rohtak', to: '/cricket-tournaments-rohtak' },
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
