import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a swimming pool near Jhajjar?',
    a: 'Yes. Alchemy 360 Sports Arena in Rohtak has an open-air swimming pool — the nearest professional swimming facility to Jhajjar, just 25 km and 25 minutes away on Jhajjar Road.',
  },
  {
    q: 'How far is Alchemy 360\'s swimming pool from Jhajjar?',
    a: 'Alchemy 360 Sports Arena is approximately 25 km from Jhajjar, on the Rohtak–Jhajjar Road. The pool is at the main complex in Sector 22-D, Rohtak — about a 25-minute drive.',
  },
  {
    q: 'Can I book a swimming session at Alchemy 360 from Jhajjar in advance?',
    a: 'Yes. Swimming sessions at Alchemy 360 can be booked online. Jhajjar residents can reserve a time slot and pay digitally before making the trip.',
  },
  {
    q: 'Is Alchemy 360\'s swimming pool suitable for children from Jhajjar?',
    a: 'Alchemy 360 Sports Arena offers swimming for all age groups, including children. Jhajjar families looking for a safe, well-maintained outdoor pool can book swimming sessions for kids and adults.',
  },
  {
    q: 'What other facilities are available alongside the pool at Alchemy 360 for Jhajjar visitors?',
    a: "Jhajjar visitors can also use Alchemy 360's badminton courts, Box 360 cricket facility, gymnasium, and pickleball courts. The on-site restaurant means you can make a full day of it.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Jhajjar', path: '/swimming-pool-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Jhajjar | Alchemy 360 Sports Arena Rohtak"
        description="Nearest swimming pool to Jhajjar — Alchemy 360 Sports Arena, Rohtak, just 25 km / 25 min away. Open-air pool, online booking, full sports complex with on-site restaurant."
        canonical="/swimming-pool-jhajjar"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is home to the nearest open-air swimming pool to Jhajjar — just 25 km along the Jhajjar–Rohtak road. Whether you're heading in for a morning lap session or a family swim, the 25-minute drive puts you at one of Haryana's best sports facilities.
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
          Jhajjar's Nearest Open-Air Swimming Pool
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          For Jhajjar residents, Alchemy 360's open-air swimming pool in Rohtak is the obvious choice when you want a clean, well-maintained facility that is actually close by. The route from Jhajjar to Alchemy 360 runs directly on the highway — you don't need to navigate through Rohtak city to reach the sports complex. Regulars from Jhajjar often pair a swim with a badminton session or cricket at Box 360, turning the trip into a proper outing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Open-Air Pool', desc: 'Alchemy 360\'s outdoor pool is clean, well-managed, and open for lap swimmers, recreational swimmers, and families arriving from Jhajjar.' },
            { title: 'Right on Jhajjar Road', desc: 'The facility sits directly on Jhajjar Road, Sector 22-D — so Jhajjar residents don\'t have to navigate deep into Rohtak to reach the pool.' },
            { title: 'Eat After Your Swim', desc: "Cool down after your session and grab a meal at Alchemy 360's on-site restaurant before heading back to Jhajjar." },
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
              { label: 'Cricket Ground Jhajjar', to: '/cricket-ground-jhajjar' },
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
