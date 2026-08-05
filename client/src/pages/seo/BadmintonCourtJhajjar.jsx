import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a badminton court near Jhajjar?',
    a: 'Yes. Alchemy 360 in Rohtak is the nearest badminton facility to Jhajjar — just 25 km away on Jhajjar Road, Sector 22-D, and reachable in about 25 minutes.',
  },
  {
    q: 'How far is Alchemy 360 from Jhajjar city?',
    a: 'Alchemy 360 is approximately 25 km from Jhajjar, directly on the Rohtak–Jhajjar Road. Most Jhajjar residents make the drive in 20–25 minutes.',
  },
  {
    q: 'Can I book a badminton court online from Jhajjar?',
    a: 'Absolutely. You can book badminton court slots online at Alchemy 360 from anywhere, including Jhajjar. Just pick your time slot and pay digitally — no need to visit in advance.',
  },
  {
    q: 'Does Alchemy 360 have professional badminton courts?',
    a: 'Alchemy 360 features well-maintained indoor badminton courts with proper court markings and equipment. The facility caters to casual players, club teams, and serious training sessions.',
  },
  {
    q: 'Is it worth driving from Jhajjar to Alchemy 360 for badminton?',
    a: "For players serious about the sport, yes. Alchemy 360 offers a standard of court and facility — including a restaurant on-site — that is not available in Jhajjar's immediate locality. The 25-minute drive is widely considered worthwhile by regular visitors from Jhajjar.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Jhajjar', path: '/badminton-court-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Jhajjar | Alchemy 360 Rohtak"
        description="Nearest badminton court to Jhajjar — Alchemy 360, Rohtak, just 25 km / 25 minutes away. Professional courts, online booking, on-site restaurant."
        canonical="/badminton-court-jhajjar"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is the closest professional badminton facility to Jhajjar — located right on Jhajjar Road, Sector 22-D, just 25 km and about 25 minutes from Jhajjar. Whether you're looking for a regular court for weekend games or structured practice, the short drive from Jhajjar puts you on a proper badminton court.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/badminton" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Jhajjar's Nearest Badminton Facility
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Jhajjar district residents looking for a proper badminton court don't need to travel all the way to Rohtak city centre — Alchemy 360 sits directly on the Jhajjar–Rohtak highway, making it the most naturally accessible sports complex for Jhajjar players. The courts are maintained to a standard that supports both casual games and competitive club sessions, and the facility includes ample parking for visitors arriving from Jhajjar and surrounding villages.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '25 Min from Jhajjar', desc: 'Directly on Jhajjar Road — no city traffic to navigate. Most Jhajjar players arrive fresh and ready to play.' },
            { title: 'Professional Courts', desc: 'Well-lit badminton courts with standard markings, suitable for singles, doubles, and coaching sessions.' },
            { title: 'Full Sports Day', desc: "Play badminton, then try pickleball or a session in the gym — all in one place." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
