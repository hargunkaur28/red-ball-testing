import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good cricket ground accessible from Gurgaon?',
    a: 'Yes. Red Ball Sports Arena in Rohtak is one of the best cricket grounds accessible from Gurgaon — approximately 75–80 km via NH 9/48, reachable in about 60–90 minutes.',
  },
  {
    q: 'How do Gurgaon teams travel to Red Ball Sports Arena?',
    a: 'From Gurgaon, take NH 48 (Delhi–Gurgaon Expressway), enter Delhi, then take NH 9 west towards Rohtak. Red Ball Sports Arena is at Sector 22-D, Jhajjar Road.',
  },
  {
    q: 'Why do Gurgaon corporate teams choose Red Ball for cricket events?',
    a: 'Red Ball offers the complete corporate cricket package — professional ground, event management, food court, QR entry, and a relaxed Rohtak atmosphere away from city congestion.',
  },
  {
    q: 'Is Red Ball a good venue for Gurgaon corporate cricket day outings?',
    a: 'Yes. Red Ball is a popular choice for Gurgaon corporate outing cricket days — combining the drive experience, professional match conditions, and full amenities.',
  },
  {
    q: 'Can Gurgaon players book cricket coaching at Red Ball?',
    a: 'Yes. Red Ball Cricket Academy welcomes players from Gurgaon for coaching programs. For players willing to commute, the professional coaching environment is worth the journey.',
  },
  {
    q: 'Does Red Ball host weekend cricket leagues for Gurgaon teams?',
    a: 'Yes. Weekend cricket leagues and tournaments at Red Ball regularly include teams from Gurgaon, Delhi, and NCR. Contact us to register your Gurgaon team.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Gurgaon', path: '/cricket-ground-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Gurgaon | Red Ball Sports Arena Rohtak | Corporate Cricket"
        description="Best cricket ground for Gurgaon teams — Red Ball Sports Arena Rohtak, 60-90 min drive. Professional ground, corporate cricket events, floodlit, online booking."
        canonical="/cricket-ground-gurgaon"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Gurgaon / Gurugram</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is a favourite cricket destination for corporate teams and cricket enthusiasts from Gurgaon and Gurugram. A 60–90 minute drive on NH 9 brings you to one of Haryana's best cricket grounds — perfect for corporate cricket days, team building, and serious match play away from city crowds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/corporate-cricket-events" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Corporate Cricket
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Why Gurgaon Teams Drive to Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon's corporate culture has a strong appetite for cricket — but premium cricket venues within the city are overpriced and overbooked. Red Ball Sports Arena in Rohtak offers better value, better conditions, and a better experience. The drive becomes part of the corporate cricket day outing, and the facility more than justifies the journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Corporate Cricket Packages', desc: 'Full-day corporate cricket packages with ground booking, team registration, umpiring, trophies, and food court for Gurgaon companies.' },
            { title: 'Weekend Leagues', desc: 'Weekend cricket leagues that Gurgaon and NCR teams regularly participate in — mix of corporate, college, and club cricket.' },
            { title: 'Better Value', desc: 'Professional ground, better conditions, and significantly more affordable than premium cricket venues in Gurgaon or Delhi.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also Explore</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Corporate Cricket Events', to: '/corporate-cricket-events' },
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
              { label: 'Cricket Ground Delhi', to: '/cricket-ground-delhi' },
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
