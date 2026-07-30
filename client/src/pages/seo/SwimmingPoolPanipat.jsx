import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a swimming pool near Panipat worth visiting?',
    a: 'Alchemy 360 Sports Arena in Rohtak has a quality open-air swimming pool, accessible from Panipat in around 90 minutes (approximately 95 km via NH-44). It\'s a popular destination for Panipat swimmers seeking a proper facility.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Panipat?',
    a: 'Alchemy 360 is approximately 95 km from Panipat, reachable via NH-44 and the Rohtak bypass. The drive takes around 90 minutes under normal traffic conditions.',
  },
  {
    q: 'Is advance booking required for the swimming pool at Alchemy 360?',
    a: 'We recommend booking your swimming slot in advance, especially for weekend visits. Online booking at Alchemy 360 is quick and ensures your session is confirmed before you travel from Panipat.',
  },
  {
    q: 'Can Panipat groups or teams book swimming sessions at Alchemy 360?',
    a: 'Yes. Alchemy 360 accommodates group bookings for the pool. School teams, swim clubs, and fitness groups from Panipat can coordinate batch sessions in advance.',
  },
  {
    q: 'What should Panipat visitors know before driving to Alchemy 360?',
    a: "Alchemy 360 Sports Arena is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak. Call ahead at +91 93500 76653 to confirm pool timings. The on-site restaurant means you won't need to plan separate meals.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Panipat', path: '/swimming-pool-panipat' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Panipat | Alchemy 360 Sports Arena Rohtak"
        description="Swimming pool near Panipat — Alchemy 360 Sports Arena, Rohtak, 95 km / 90 min away. Open-air pool, group bookings, full sports complex, on-site restaurant."
        canonical="/swimming-pool-panipat"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is a premium sports destination with an open-air swimming pool — 95 km from Panipat and reachable in about 90 minutes on NH-44. Panipat swimmers and sports groups who make the trip find a clean, properly managed pool within a full-scale multi-sport complex that makes the journey completely worthwhile.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Plan a Swim Day from Panipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          For Panipat swimmers serious about the sport, a visit to Alchemy 360 Sports Arena in Rohtak is best treated as a proper day out. The 90-minute drive on NH-44 is comfortable, and on arrival you're rewarded with a full sports complex — open-air pool, badminton courts, Box 360 cricket, gymnasium, pickleball, and an on-site restaurant. Panipat groups who book in advance make the most of the visit by combining swimming with other sports.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH-44 Direct Route', desc: 'Panipat to Rohtak is a well-known highway run. Alchemy 360 is near Omaxe, Sector 22-D — accessible without navigating deep into the city.' },
            { title: 'Open-Air Pool', desc: 'A maintained outdoor pool where Panipat swimmers can do serious lap training or enjoy a relaxed recreational swim in a clean environment.' },
            { title: 'Rest and Refuel', desc: "After swimming and a possible second sport, Alchemy 360's on-site restaurant keeps Panipat visitors fed and ready for the drive home." },
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
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
