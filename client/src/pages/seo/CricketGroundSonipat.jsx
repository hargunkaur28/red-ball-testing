import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good cricket ground near Sonipat?',
    a: 'Yes. Red Ball Sports Arena in Rohtak is one of the best cricket grounds near Sonipat — approximately 45–50 km away, reachable in about 50–60 minutes via NH 9.',
  },
  {
    q: 'How far is Red Ball Sports Arena from Sonipat?',
    a: 'Red Ball Sports Arena is approximately 45–50 km from Sonipat via NH 9 (Delhi–Rohtak highway). The drive typically takes 50–60 minutes.',
  },
  {
    q: 'Can Sonipat teams book the cricket ground at Red Ball?',
    a: 'Yes. Teams from Sonipat are welcome to book Red Ball\'s cricket ground for matches, practice sessions, and cricket tournaments.',
  },
  {
    q: 'Is Red Ball suitable for inter-city cricket tournaments involving Sonipat teams?',
    a: 'Yes. Red Ball hosts inter-city cricket tournaments and is an ideal neutral venue for matches between Sonipat and Rohtak teams.',
  },
  {
    q: 'Is there a cricket academy near Sonipat?',
    a: 'Red Ball Cricket Academy in Rohtak is the nearest professional cricket academy to Sonipat — offering coached practice, batting nets, and structured programs.',
  },
  {
    q: 'Does Red Ball offer corporate cricket events for Sonipat companies?',
    a: 'Yes. Companies from Sonipat regularly book Red Ball for corporate cricket days and inter-department tournaments. Contact us for corporate event packages.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Sonipat', path: '/cricket-ground-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Sonipat | Red Ball Sports Arena Rohtak"
        description="Best cricket ground near Sonipat — Red Ball Sports Arena Rohtak, 50 minutes via NH 9. Professional floodlit cricket ground, tournament hosting, online booking."
        canonical="/cricket-ground-sonipat"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak serves cricket players and teams from Sonipat with a professional floodlit cricket ground, coaching academy, and full tournament infrastructure. Located 45–50 km via NH 9, it's a smooth drive from Sonipat to one of Haryana's best cricket facilities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Sonipat Teams Choose Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has strong cricket culture but limited premium cricket infrastructure. Red Ball Sports Arena in Rohtak is the go-to destination for Sonipat teams seeking a professional ground, proper match conditions, and smooth booking experience. The NH 9 connectivity makes it a practical choice for regular play — not just one-off trips.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH 9 Connectivity', desc: 'Direct highway route from Sonipat to Rohtak. Clear roads make for a comfortable drive for evening or weekend cricket.' },
            { title: 'Neutral Venue', desc: 'Red Ball serves as an ideal neutral venue for inter-city matches between Sonipat, Rohtak, and other Haryana teams.' },
            { title: 'Full Amenities', desc: 'Beyond the cricket ground — food court, changing rooms, sports accessories shop, and multi-sport facilities available.' },
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
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
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
