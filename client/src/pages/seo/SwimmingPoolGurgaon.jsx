import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there an open-air swimming pool near Gurgaon in Haryana?',
    a: 'Yes. Red Ball Sports Arena in Rohtak has an open-air swimming pool — about 90 km and 90 minutes from Gurgaon (Gurugram). It is a popular sports day destination for Gurgaon families and fitness groups.',
  },
  {
    q: 'How do I get from Gurgaon to Red Ball Sports Arena?',
    a: 'From Gurgaon, take NH-48 towards Delhi, then connect to NH-148B or NH-352 towards Rohtak. Red Ball is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — approximately 90 minutes.',
  },
  {
    q: 'Why would Gurgaon residents travel to Rohtak for a swim?',
    a: "Red Ball's open-air pool combined with its multi-sport complex — cricket, badminton, gym, pickleball — and on-site restaurant makes it an experience that's different from standard city pools. Gurgaon visitors come for the full sports day, not just the swim.",
  },
  {
    q: 'Can I book a swimming session at Red Ball from Gurgaon in advance?',
    a: 'Yes. Online booking at Red Ball is available and recommended for Gurgaon visitors who want to guarantee their pool time before making the 90-minute trip.',
  },
  {
    q: 'Is the Red Ball pool suitable for competitive swimmers from Gurgaon?',
    a: 'Red Ball\'s pool caters to lap swimmers and recreational swimmers alike. Competitive or fitness-focused swimmers from Gurgaon will find it a clean, properly managed venue for serious training.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Gurgaon', path: '/swimming-pool-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Gurgaon | Red Ball Sports Arena Rohtak"
        description="Open-air swimming pool near Gurgaon — Red Ball Sports Arena, Rohtak, 90 km / 90 min away. Book online, full multi-sport complex, on-site restaurant."
        canonical="/swimming-pool-gurgaon"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is 90 km from Gurgaon (Gurugram) — about a 90-minute drive that takes you away from city congestion and into Haryana's premier sports complex. The open-air swimming pool is just one reason Gurgaon visitors make the trip; the full facility and on-site restaurant turn it into a genuine day out.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Swimming Session
            </Link>
            <Link to="/swimming-pool-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Pool Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Gurgaon's Weekend Sports Escape — Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon has no shortage of sports options, but Red Ball Sports Arena offers something the city rarely does — an open-air pool in a calm, spacious sports complex where you can also play cricket in Rohtak's first 24/7 Box 360 facility, hit the badminton court, or work out in the gym. The 90-minute highway drive is best done on a weekend morning when the roads are clear, and the full day at Red Ball makes it feel like a proper sports retreat rather than a commute.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Open-Air & Spacious', desc: "Gurgaon's indoor facilities can feel cramped. Red Ball's open-air pool in Rohtak offers a different, fresher experience that swimmers consistently prefer." },
            { title: 'Book Before You Drive', desc: 'Reserve your swimming slot online before leaving Gurgaon. 90 minutes is a committed journey — online booking makes sure your time is guaranteed.' },
            { title: 'The Full Day Option', desc: "After your swim, explore cricket, badminton, or pickleball. Then sit down at Red Ball's on-site restaurant before the drive back to Gurgaon." },
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
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Cricket Ground Gurgaon', to: '/cricket-ground-gurgaon' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
