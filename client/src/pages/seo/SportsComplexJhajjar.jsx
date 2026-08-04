import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Jhajjar?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest multi-sport complex to Jhajjar — just 25 km away on Jhajjar Road, approximately 25 minutes by car. It offers cricket, badminton, pickleball, a gym, and a restaurant all in one facility.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Jhajjar?',
    a: 'Alchemy 360 is approximately 25 km from Jhajjar city, at Sector 22-D, Jhajjar Road, Rohtak. The drive takes around 25 minutes and the road connects both cities directly.',
  },
  {
    q: 'Which sports are available at Alchemy 360 for Jhajjar visitors?',
    a: 'Cricket (Box 360 circular box cricket + open ground), badminton, pickleball, and a fully equipped gymnasium — all under one roof at Alchemy 360 Sports Arena, Rohtak.',
  },
  {
    q: 'Can Jhajjar families visit Alchemy 360 for a sports day?',
    a: 'Yes. Alchemy 360 is family-friendly with sports and facilities suited to all age groups. The on-site restaurant makes it easy to spend a full day without needing to leave the complex.',
  },
  {
    q: 'Does Alchemy 360 Sports Arena offer memberships for Jhajjar residents?',
    a: 'Yes. Monthly, quarterly, and annual memberships are available. Some plans cover multiple sports. Contact us at +91 93500 76653 or visit our membership page for current plans.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Jhajjar', path: '/sports-complex-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Jhajjar | Alchemy 360 Sports Arena Rohtak"
        description="Best sports complex near Jhajjar — Alchemy 360 Sports Arena in Rohtak, just 25 km away. Cricket, badminton, pickleball, gym & restaurant under one roof."
        canonical="/sports-complex-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is Jhajjar's nearest proper sports complex — just 25 km on Jhajjar Road, about 25 minutes away. Cricket, badminton, pickleball, a gym, and an on-site restaurant — all the sports infrastructure Jhajjar residents need, right next door.
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
          Everything Jhajjar Needs — 25 Minutes Away in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Jhajjar is directly connected to Rohtak on the Jhajjar Road, and Alchemy 360 Sports Arena sits right on that route at Sector 22-D. For Jhajjar residents who want genuine multi-sport access — not just a local playground — Alchemy 360 is the most convenient professional complex available. Kids can join cricket or badminton coaching, adults can train at the gym or swim, and teams can book the Box 360 box cricket ground or football ground. The on-site restaurant rounds out a complete day.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Direct on Jhajjar Road', desc: 'Alchemy 360 is located at Sector 22-D, Jhajjar Road, Rohtak — you pass right by it on the main Jhajjar–Rohtak route. No detour, no hassle.' },
            { title: '5 Sports Under One Roof', desc: 'Cricket (Box 360 + open ground), badminton, pickleball, and a full gymnasium — the most complete sports facility accessible from Jhajjar.' },
            { title: 'Sports + Dining', desc: "Alchemy 360's on-site restaurant means Jhajjar families and teams can have a full day out without leaving the complex — play, swim, train, and eat all in one place." },
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
