import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Where is Red Ball cricket ground located in Haryana?',
    a: 'Red Ball Sports Arena is located in Rohtak, Haryana — at Sector 22-D, Jhajjar Road, near Village Maina. It is one of the best cricket grounds in Haryana.',
  },
  {
    q: 'Is Red Ball the best cricket ground in Haryana?',
    a: 'Red Ball Sports Arena is among Haryana\'s best-equipped cricket grounds — offering a professional floodlit box cricket ground, online booking, and tournament hosting capabilities.',
  },
  {
    q: 'Which cities in Haryana can reach Red Ball Sports Arena easily?',
    a: 'Red Ball Sports Arena in Rohtak is conveniently accessible from Jhajjar, Bahadurgarh, Sonipat, Panipat, Hisar, and Delhi NCR via the Rohtak–Jhajjar Road and Delhi–Rohtak NH 9.',
  },
  {
    q: 'Does Red Ball host Haryana-level cricket tournaments?',
    a: 'Yes. Red Ball hosts the Rohtak Cricket League and welcomes teams from across Haryana for corporate cricket events, inter-college tournaments, and open cricket leagues.',
  },
  {
    q: 'Is Red Ball cricket ground open to players from outside Rohtak?',
    a: 'Absolutely. Players and teams from any city in Haryana and Delhi NCR are welcome to book the cricket ground for matches, practice, or tournaments.',
  },
  {
    q: 'Can I book the Haryana cricket ground online?',
    a: 'Yes. Red Ball\'s cricket ground booking is fully online. Book your slot, pay digitally, and get QR-code-based entry on your match day.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'State', name: 'Haryana', sameAs: 'https://en.wikipedia.org/wiki/Haryana' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Rohtak', path: '/cricket-ground-rohtak' },
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundHaryana() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground in Haryana | Best Cricket Venue | Red Ball Sports Arena Rohtak"
        description="Looking for a cricket ground in Haryana? Red Ball Sports Arena in Rohtak is Haryana's premier cricket ground — floodlit, professional, online booking. Teams from across Haryana welcome."
        canonical="/cricket-ground-haryana"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-haryana" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground in Haryana
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is Haryana's go-to cricket ground for matches, tournaments, practice, and corporate cricket events. Teams from Jhajjar, Bahadurgarh, Sonipat, Panipat, Hisar, and Delhi NCR regularly play here. Professional conditions, floodlighting, and online booking make it the best cricket venue in the region.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/cricket-ground-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Ground Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Haryana's Best Cricket Ground at Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Red Ball Sports Arena, located in Rohtak on Jhajjar Road, serves as the central cricket destination for players across Haryana. Its central location in Rohtak — the heart of Haryana — makes it accessible from virtually every major city in the state within 1–2 hours. The facility offers professional box cricket, coaching, tournament hosting, and full sports complex amenities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Central Haryana Location', desc: 'Rohtak is at the geographic centre of Haryana, making Red Ball Sports Arena accessible from Jhajjar, Sonipat, Panipat, Hisar, Gurgaon, and Delhi NCR.' },
            { title: 'Tournament Ready', desc: 'Full tournament infrastructure — ground, seating, scoreboard, food court, and QR entry — for Haryana-level cricket events.' },
            { title: 'Teams from Across Haryana', desc: 'Corporate teams, college squads, and club sides from across Haryana regularly book Red Ball for match days and league fixtures.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Cricket Grounds Near You in Haryana</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Jhajjar', to: '/cricket-ground-jhajjar' },
              { label: 'Cricket Ground Sonipat', to: '/cricket-ground-sonipat' },
              { label: 'Cricket Ground Bahadurgarh', to: '/cricket-ground-bahadurgarh' },
              { label: 'Cricket Ground Gurgaon', to: '/cricket-ground-gurgaon' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                className="px-4 py-2 border border-black/20 rounded-full text-sm text-[#0D0D0D] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
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
