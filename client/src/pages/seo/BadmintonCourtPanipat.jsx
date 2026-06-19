import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a professional badminton court near Panipat?',
    a: 'Red Ball Sports Arena in Rohtak offers professional badminton courts accessible from Panipat — approximately 95 km and 90 minutes away. It is a well-regarded destination for Panipat players seeking quality facilities.',
  },
  {
    q: 'How far is Red Ball Sports Arena from Panipat?',
    a: 'Red Ball is roughly 95 km from Panipat, accessible via NH-44 and then the Rohtak bypass. The journey typically takes around 90 minutes depending on traffic.',
  },
  {
    q: 'Is booking available in advance for players coming from Panipat?',
    a: 'Yes. Red Ball\'s online booking ensures your court is reserved before you travel from Panipat — eliminating the risk of arriving and finding courts occupied.',
  },
  {
    q: 'What makes Red Ball worth the drive from Panipat for badminton?',
    a: 'Red Ball offers a combination of professional courts, a full sports complex, and an on-site restaurant — a level of sports infrastructure that justifies the 90-minute drive for serious Panipat badminton players.',
  },
  {
    q: 'Can Panipat college or club teams book multiple courts at Red Ball?',
    a: 'Yes. Group and club bookings for multiple courts are available. College teams and clubs from Panipat can coordinate a full session or mini-tournament at Red Ball Sports Arena.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Panipat', path: '/badminton-court-panipat' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Panipat | Red Ball Sports Arena Rohtak"
        description="Professional badminton court near Panipat — Red Ball Sports Arena, Rohtak, 95 km / 90 min away. Book courts online, full sports complex, on-site dining."
        canonical="/badminton-court-panipat"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is the go-to badminton venue for serious players across Haryana — and for Panipat players, it's 95 km and 90 minutes away, worth every kilometre. When you arrive, you'll find professional courts, a buzzing sports atmosphere, and a full facility that turns a badminton trip into a proper sports day out.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Badminton Court
            </Link>
            <Link to="/badminton-court-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Court Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          A Proper Badminton Destination for Panipat Players
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Panipat is well-connected to Rohtak via NH-44, and the 90-minute drive to Red Ball Sports Arena is a journey Panipat club teams and serious players make regularly. The draw is simple: courts that meet a professional standard, a facility that includes multiple sports under one roof, and a booking system that lets you plan your visit without any guesswork. For groups travelling from Panipat, the on-site restaurant is a welcome bonus after an intense session.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Connected by NH-44', desc: 'Panipat to Rohtak is a well-travelled highway route. Red Ball is clearly located near Omaxe, Sector 22-D — easy for first-time visitors from Panipat.' },
            { title: 'Tournament-Ready Courts', desc: 'Red Ball\'s badminton courts are used for club matches and events — Panipat teams looking for a competitive environment will feel right at home.' },
            { title: 'Plan a Full Day', desc: "Combine badminton with the gym or a swim, then wind down at Red Ball's on-site restaurant before the drive back to Panipat." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
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
