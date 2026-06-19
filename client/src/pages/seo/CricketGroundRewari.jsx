import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Rewari?',
    a: 'Red Ball Sports Arena in Rohtak is the nearest professional cricket ground to Rewari — approximately 85 km away, around 80 minutes by road. It offers both an open cricket ground and Box 360, a 24/7 circular box cricket ground.',
  },
  {
    q: 'How far is Red Ball Sports Arena from Rewari?',
    a: 'Red Ball is around 85 km from Rewari, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 80 minutes.',
  },
  {
    q: 'Can Rewari cricket teams book the ground online?',
    a: 'Yes. Teams from Rewari can book the cricket ground online in minutes through our booking system. No paperwork needed — select your slot, pay digitally, and show up ready to play.',
  },
  {
    q: 'What is Box 360 at Red Ball Sports Arena?',
    a: "Box 360 is Rohtak's first 24/7 circular box cricket ground — a unique format that offers 360-degree play. Rewari cricket teams can book it at any time of day or night, making it ideal for flexible schedules.",
  },
  {
    q: 'Is there parking for Rewari cricket teams at Red Ball?',
    a: 'Yes. Red Ball Sports Arena has ample parking space for large groups and teams travelling from Rewari and surrounding areas.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Rewari' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Near Rewari', path: '/cricket-ground-rewari' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundRewari() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Rewari | Red Ball Sports Arena Rohtak"
        description="Nearest cricket ground to Rewari — Red Ball Sports Arena in Rohtak, ~85 km, ~80 min drive. Box 360 circular box cricket + open ground, online booking available."
        canonical="/cricket-ground-rewari"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-rewari" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Near Rewari</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Rewari
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is approximately 85 km from Rewari — around 80 minutes by road. For Rewari cricket teams and players who want professional ground conditions, Red Ball offers both an open cricket ground and Box 360, Rohtak's first 24/7 circular box cricket ground — bookable online, any time.
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
          Rewari's Nearest Professional Cricket Ground
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Rewari has a passionate cricket following, but professional ground access has always required a drive. Red Ball Sports Arena in Rohtak is the most practical destination for Rewari cricketers — 80 minutes on a clear highway, arriving at Sector 22-D, Jhajjar Road, Rohtak to find properly maintained pitches, clear boundary markings, floodlighting for evening sessions, and the unique Box 360 format that you simply cannot find anywhere else in the region.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '80 Minutes from Rewari', desc: 'A clear highway drive of around 85 km puts Rewari cricket teams at Red Ball — the most professionally equipped cricket facility accessible from Rewari district.' },
            { title: 'Box 360 — Day or Night', desc: "Rohtak's first 24/7 circular box cricket ground. Rewari teams can book any time slot — early morning, afternoon, or late night — and play 360-degree box cricket unlike anywhere else in Haryana." },
            { title: 'Cricket + Dining', desc: "After the match, Red Ball's on-site restaurant is right there. Rewari teams can eat together on-site before the drive back — no hunting for a dhaba on the highway." },
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
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Box Cricket Rohtak', to: '/box-cricket-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
