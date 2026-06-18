import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a professional cricket ground near Panipat?',
    a: 'Yes. Red Ball Sports Arena in Rohtak is one of the best cricket grounds accessible from Panipat — approximately 75–80 km away, reachable in around 75–90 minutes via NH 44 and NH 9.',
  },
  {
    q: 'How do I travel from Panipat to Red Ball Sports Arena?',
    a: 'From Panipat, take NH 44 south towards Sonipat, then NH 9 west towards Rohtak. Red Ball Sports Arena is at Sector 22-D on Jhajjar Road, Rohtak.',
  },
  {
    q: 'Can Panipat teams book for cricket tournaments at Red Ball?',
    a: 'Yes. Teams from Panipat are welcome to participate in and host cricket tournaments at Red Ball. The venue serves as an excellent neutral ground for inter-city competitions.',
  },
  {
    q: 'Does Red Ball offer accommodation recommendations for out-of-city teams?',
    a: 'Rohtak has multiple hotels and guesthouses near Red Ball Sports Arena. Contact us and we can share nearby accommodation options for visiting teams.',
  },
  {
    q: 'Is Red Ball suitable for overnight cricket tournaments from Panipat?',
    a: 'Yes. For multi-day tournaments, Rohtak offers affordable accommodation options. Red Ball can coordinate tournament scheduling for visiting teams from Panipat.',
  },
  {
    q: 'Is there cricket coaching available for Panipat players?',
    a: 'Panipat players can join Red Ball Cricket Academy coaching programs. Regular sessions make the drive worthwhile for serious players seeking professional coaching.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Panipat', path: '/cricket-ground-panipat' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Panipat | Red Ball Sports Arena Rohtak"
        description="Professional cricket ground accessible from Panipat — Red Ball Sports Arena Rohtak. Tournament hosting, coaching, floodlit ground, online booking for Panipat teams."
        canonical="/cricket-ground-panipat"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is a premier cricket destination for teams from Panipat and northern Haryana. With professional ground conditions, full tournament infrastructure, and online booking, it's worth the drive from Panipat for any serious cricket team or corporate event.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/cricket-tournaments-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tournament Info
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          A Cricket Ground Worth the Drive from Panipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          When you play at Red Ball Sports Arena, you understand why teams travel from Panipat. The facility offers a level of cricket experience that smaller local venues simply cannot match — professional pitch, floodlighting, seating, digital entry, food court, and a buzzing sports atmosphere. For corporate cricket days and inter-city tournaments, Red Ball is the default choice for Haryana teams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Tournament Grade', desc: 'Full tournament infrastructure — scoreboard, umpires, digital entry, food service, and team facilities for inter-city fixtures.' },
            { title: 'Multiple Formats', desc: 'Suitable for box cricket, T10, T20, and custom corporate formats. Flexible match duration options for visiting teams.' },
            { title: 'Multi-City Leagues', desc: 'Red Ball hosts the Rohtak Cricket League which welcomes teams from Panipat, Sonipat, and across Haryana to compete.' },
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
              { label: 'Cricket Ground Sonipat', to: '/cricket-ground-sonipat' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
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
