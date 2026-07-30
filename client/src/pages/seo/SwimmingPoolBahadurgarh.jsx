import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a swimming pool near Bahadurgarh?',
    a: 'Yes. Alchemy 360 Sports Arena in Rohtak has an open-air swimming pool that is accessible from Bahadurgarh — approximately 45 km and 40 minutes by road.',
  },
  {
    q: 'How long is the drive from Bahadurgarh to Alchemy 360\'s swimming pool?',
    a: 'The drive from Bahadurgarh to Alchemy 360 Sports Arena in Rohtak takes approximately 40 minutes via NH-148B. The complex is in Sector 22-D, Jhajjar Road, near Omaxe.',
  },
  {
    q: 'Can I book a swimming session at Alchemy 360 in advance from Bahadurgarh?',
    a: 'Yes. Alchemy 360\'s online booking allows you to secure a swimming slot and pay before leaving Bahadurgarh — so your session is confirmed when you arrive.',
  },
  {
    q: 'Is Alchemy 360\'s swimming pool suitable for beginners from Bahadurgarh?',
    a: 'Alchemy 360\'s pool caters to swimmers of all levels, including beginners. The facility is well-supervised and also offers swimming classes for those looking to learn or improve.',
  },
  {
    q: 'What else can I do at Alchemy 360 if I am coming from Bahadurgarh for a swim?',
    a: "Bahadurgarh visitors often pair a swim with other activities at Alchemy 360 — badminton courts, Box 360 cricket, pickleball, and the gymnasium. The on-site restaurant is perfect for a meal before heading home.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Bahadurgarh', path: '/swimming-pool-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Bahadurgarh | Alchemy 360 Sports Arena Rohtak"
        description="Swimming pool near Bahadurgarh — Alchemy 360 Sports Arena, Rohtak, 45 km / 40 min away. Open-air pool, online booking, full sports facility with restaurant."
        canonical="/swimming-pool-bahadurgarh"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena's open-air swimming pool in Rohtak is the best pool destination accessible from Bahadurgarh — 45 km and a comfortable 40-minute drive on NH-148B. Whether it's laps for fitness or a recreational family swim, Bahadurgarh residents consistently find the trip worthwhile.
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
          Bahadurgarh's Choice for a Proper Swimming Pool
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh is on the Delhi–Rohtak corridor, which means Alchemy 360 Sports Arena is a natural destination for Bahadurgarh residents heading towards Rohtak. The pool is open-air, well-maintained, and set within a broader sports complex — so you're not driving 40 minutes just for a swim, you're accessing a full sports facility. Families from Bahadurgarh especially appreciate the ability to combine a swim with other activities and a meal at the on-site restaurant.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '40 Min on NH-148B', desc: 'The Bahadurgarh–Rohtak highway run is well-connected and easy. Alchemy 360 is signposted near Omaxe, Sector 22-D — hard to miss.' },
            { title: 'Open-Air Pool', desc: 'A proper outdoor pool, maintained and supervised — a clear step above informal pools available closer to Bahadurgarh.' },
            { title: 'Family Day Out', desc: "Bring the whole family — swim, play badminton or cricket, and round the day off at Alchemy 360's on-site restaurant." },
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
              { label: 'Cricket Ground Bahadurgarh', to: '/cricket-ground-bahadurgarh' },
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
