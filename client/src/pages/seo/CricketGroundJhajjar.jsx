import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Jhajjar?',
    a: 'Yes. Alchemy 360 Sports Arena in Rohtak is the nearest professional cricket ground to Jhajjar — just 15–20 minutes away on Jhajjar Road, Sector 22-D.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Jhajjar?',
    a: 'Alchemy 360 Sports Arena is approximately 15–20 km from Jhajjar city, easily reachable on the Rohtak–Jhajjar Road. The journey takes around 20–25 minutes.',
  },
  {
    q: 'Can teams from Jhajjar book the cricket ground?',
    a: 'Yes. Teams and players from Jhajjar regularly book Alchemy 360\'s cricket ground for matches, practice sessions, and tournaments. Online booking is available.',
  },
  {
    q: 'Is there parking available at the cricket ground for Jhajjar visitors?',
    a: 'Yes. Alchemy 360 Sports Arena has ample parking space for players and visitors travelling from Jhajjar and surrounding areas.',
  },
  {
    q: 'Can Jhajjar corporate teams book the cricket ground for events?',
    a: 'Yes. Corporate cricket events and team-building sports days are regularly organised at Alchemy 360 for companies from Jhajjar district.',
  },
  {
    q: 'Is there a cricket academy near Jhajjar?',
    a: 'Alchemy 360 Cricket Academy in Rohtak is the closest professional cricket academy to Jhajjar, offering coaching, practice ground, and membership programs.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Jhajjar', path: '/cricket-ground-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Jhajjar | Alchemy 360 Sports Arena Rohtak"
        description="Best cricket ground near Jhajjar — Alchemy 360 Sports Arena in Rohtak, just 20 minutes from Jhajjar. Professional ground, floodlighting, online booking for Jhajjar teams."
        canonical="/cricket-ground-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is the closest professional cricket ground to Jhajjar — located on Jhajjar Road, just 15–20 km and 20–25 minutes from Jhajjar city. Teams from Jhajjar book Alchemy 360 for matches, practice sessions, tournaments, and corporate cricket events.
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
          Jhajjar's Nearest Professional Cricket Ground
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          For players and teams from Jhajjar district, Alchemy 360 Sports Arena is the natural choice for cricket. Situated on Jhajjar Road in Rohtak, the facility is directly on the route between Jhajjar and Rohtak, making it extremely convenient to reach. The cricket ground offers professional conditions that simply aren't available in smaller localities — making the short drive fully worthwhile.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '20 Min from Jhajjar', desc: 'Located directly on Jhajjar Road, Rohtak — the most convenient professional cricket ground for Jhajjar district players and teams.' },
            { title: 'Professional Ground', desc: 'Floodlit box cricket ground with maintained pitch, proper boundary markings, and tournament-grade infrastructure.' },
            { title: 'Easy Booking', desc: 'Book online in minutes, pay digitally, and arrive ready to play. No paperwork, no queues — just cricket.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More Nearby Cricket Venues</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Cricket Ground Bahadurgarh', to: '/cricket-ground-bahadurgarh' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
