import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports-complex gym accessible from Panipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak has a gymnasium embedded in a full multi-sport complex — approximately 95 km and 90 minutes from Panipat via NH-44. Serious gym-goers from Panipat make the trip for the quality and environment.',
  },
  {
    q: 'How far is Alchemy 360\'s gym from Panipat?',
    a: 'Alchemy 360 Sports Arena is about 95 km from Panipat. The drive via NH-44 towards Rohtak takes around 90 minutes under normal conditions.',
  },
  {
    q: 'Is Alchemy 360\'s gym worth the 90-minute drive from Panipat?',
    a: "For serious fitness enthusiasts or athletes from Panipat who want a gym within a full sports complex — with cricket, badminton, and an on-site restaurant — the answer is yes. It's a proper sports day, not just a gym session.",
  },
  {
    q: 'Can Panipat gym members combine training with cricket at Alchemy 360?',
    a: "Yes. Alchemy 360's Box 360 — Rohtak's first 24/7 circular box cricket facility — is on the same complex as the gym. Panipat athletes who play cricket and train in the gym can do both in a single visit.",
  },
  {
    q: 'How do I book a gym session at Alchemy 360 from Panipat?',
    a: 'Visit redbalsportarena.com or call +91 93500 76653 to enquire about gym memberships and session bookings. Online booking is available so your session is confirmed before you leave Panipat.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Panipat', path: '/gym-panipat' },
  ]),
  faqSchema(faqs),
];

export default function GymPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Panipat | Alchemy 360 Sports Arena Rohtak"
        description="Gym near Panipat — Alchemy 360 Sports Arena, Rohtak, 95 km / 90 min away. Sports-complex gymnasium, Box 360 cricket, online booking, on-site restaurant."
        canonical="/gym-panipat"
        schema={schema}
      />
      <SportsNav activePath="/gym-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 95 km from Panipat — a 90-minute highway drive on NH-44 that delivers you to one of Haryana's most complete sports facilities. The gymnasium here isn't a commercial gym franchise; it's a proper training space within a multi-sport complex that includes Box 360 cricket, an open-air pool, and badminton courts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Gym
            </Link>
            <Link to="/gym-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Gym Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Panipat Athletes Choose Alchemy 360 for a Reason
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Panipat has a strong sporting tradition, and Alchemy 360 Sports Arena in Rohtak is the facility that Panipat athletes point to when they want to train at a higher level. The gym is surrounded by cricketers, swimmers, and badminton players — an environment that motivates serious training in a way a standalone gym simply cannot. For Panipat visitors making the 90-minute journey, Alchemy 360's on-site restaurant ensures the day is well-catered before the drive home on NH-44.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH-44 from Panipat', desc: 'Panipat to Rohtak via NH-44 is a well-known intercity route. Alchemy 360 is near Omaxe, Sector 22-D — plan an early start for a full day of training.' },
            { title: 'Athletes\' Environment', desc: 'The Alchemy 360 gym sits alongside Box 360 cricket, badminton courts — the kind of multi-sport environment that fuels serious Panipat athletes.' },
            { title: 'Dine Before You Drive', desc: "Alchemy 360's on-site restaurant is the natural stop after a training session before Panipat visitors head back on NH-44. Good food, no guesswork." },
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
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
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
