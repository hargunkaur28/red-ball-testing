import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Sonipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest comprehensive multi-sport complex to Sonipat — approximately 55 km away, around 55 minutes by road. It has cricket, badminton, pickleball, a gym, and a restaurant.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Sonipat?',
    a: 'Alchemy 360 is around 55 km from Sonipat, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 55 minutes on the Rohtak–Sonipat Road.',
  },
  {
    q: 'Can Sonipat university students get memberships at Alchemy 360?',
    a: 'Yes. Student membership plans are available. Sonipat students visiting Rohtak for college or sports events can also make use of day-pass bookings. Contact +91 93500 76653 for student rates.',
  },
  {
    q: 'Does Alchemy 360 Sports Arena have badminton courts?',
    a: 'Yes. Alchemy 360 has multiple badminton courts available for casual play, competitive matches, and coaching sessions — one of several sports available for Sonipat visitors.',
  },
  {
    q: 'What is Box 360 at Alchemy 360 Sports Arena?',
    a: "Box 360 is Rohtak's first 24/7 circular box cricket ground — a unique format that runs at Alchemy 360 Sports Arena around the clock. Sonipat cricket teams can book it for matches and tournaments at any time.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Sonipat', path: '/sports-complex-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Sonipat | Alchemy 360 Sports Arena Rohtak"
        description="Sports complex near Sonipat — Alchemy 360 Sports Arena in Rohtak, ~55 km, ~55 min drive. Cricket, badminton, pickleball, gym & on-site restaurant."
        canonical="/sports-complex-sonipat"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 55 km from Sonipat — around 55 minutes on the Rohtak–Sonipat Road. Sonipat players, students, and teams looking for a serious multi-sport facility will find everything at Alchemy 360 that isn't locally available — including Box 360 circular box cricket and courts for badminton and pickleball.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore Facilities
            </Link>
            <Link to="/sports-complex-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Full Complex Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Sonipat's Go-To Sports Complex — Alchemy 360 in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has a vibrant sports community — with multiple universities and a strong grassroots athletics culture. Alchemy 360 Sports Arena in Rohtak gives Sonipat athletes the infrastructure to train at the level they're aiming for. The 55-minute drive on the Rohtak–Sonipat Road is straightforward, and arriving at Alchemy 360's Sector 22-D campus, you'll find sports courts, aquatic facilities, a gym, and coaching programs all waiting. It's not just a ground — it's a full sports day destination.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box 360 Cricket', desc: "Rohtak's first 24/7 circular box cricket ground — a unique format that Sonipat cricket enthusiasts make the 55-minute drive for. Book any time, day or night." },
            { title: 'Badminton + Pickleball', desc: 'Courts for badminton and pickleball are available for casual players and competitive athletes from Sonipat. Coaching is available for both sports.' },
            { title: 'Full Day Out', desc: "Alchemy 360's on-site restaurant means Sonipat visitors can spend a full day — train in the morning, swim or play badminton in the afternoon, and eat before heading home." },
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
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
              { label: 'Football Ground Sonipat', to: '/football-ground-sonipat' },
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
