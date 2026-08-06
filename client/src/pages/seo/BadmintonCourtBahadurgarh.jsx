import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a badminton court near Bahadurgarh?',
    a: 'Yes. Alchemy 360 in Rohtak is the nearest professional badminton facility to Bahadurgarh — approximately 45 km away and about 40 minutes by road.',
  },
  {
    q: 'How do I reach Alchemy 360 from Bahadurgarh?',
    a: 'From Bahadurgarh, take NH-148B towards Rohtak. Alchemy 360 is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — a straightforward 40-minute drive.',
  },
  {
    q: 'Can I book a badminton slot in advance from Bahadurgarh?',
    a: 'Yes. Alchemy 360 offers online booking so players from Bahadurgarh can reserve their court slot before making the journey. Payment is fully digital.',
  },
  {
    q: 'Are there group or club badminton sessions available at Alchemy 360?',
    a: 'Alchemy 360 accommodates groups, club bookings, and regular memberships. Players from Bahadurgarh who visit regularly often find a membership the most economical option.',
  },
  {
    q: 'What facilities are available alongside the badminton courts at Alchemy 360?',
    a: "Alchemy 360 also has badminton courts, a gym and pickleball courts — making it a full sports day destination for Bahadurgarh visitors.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Bahadurgarh', path: '/badminton-court-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Bahadurgarh | Alchemy 360 Rohtak"
        description="Best badminton court near Bahadurgarh — Alchemy 360 in Rohtak, 45 km / 40 minutes away. Professional courts, online booking, on-site restaurant."
        canonical="/badminton-court-bahadurgarh"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 is Rohtak's premier badminton destination — and at just 45 km and 40 minutes from Bahadurgarh, it's the best professional court accessible to players in the area. Bahadurgarh players increasingly make Alchemy 360 their regular badminton venue, drawn by the quality courts, clean facility, and the convenience of online booking.
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
          The Go-To Badminton Court for Bahadurgarh Players
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh sits on the Delhi–Rohtak corridor, and Alchemy 360 is a natural pit stop for badminton enthusiasts making that journey. The 40-minute drive on NH-148B is smooth and well-connected, and on arrival you'll find courts that are a clear step above anything available in the immediate Bahadurgarh area. Whether it's a weekend doubles game with friends or a regular training grind, Alchemy 360 has the infrastructure to support it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '40 Min Drive', desc: 'Smooth highway run from Bahadurgarh on NH-148B. No complicated navigation — Alchemy 360 is signposted near Omaxe, Rohtak.' },
            { title: 'Standard Courts', desc: 'Indoor badminton courts with proper lighting and markings — ideal for serious players and club matches from Bahadurgarh.' },
            { title: 'Stay & Eat', desc: "After your badminton session, refuel at Alchemy 360's on-site restaurant before heading back to Bahadurgarh. No need to find food separately." },
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

      <CTAStrip sport="badminton" />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
