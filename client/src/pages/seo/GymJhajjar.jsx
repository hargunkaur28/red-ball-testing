import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a gym near Jhajjar?',
    a: 'Yes. Alchemy 360 Sports Arena in Rohtak has a well-equipped gymnasium — the nearest proper sports-complex gym to Jhajjar, just 25 km and 25 minutes along Jhajjar Road.',
  },
  {
    q: 'How far is Alchemy 360\'s gym from Jhajjar?',
    a: 'Alchemy 360 Sports Arena is approximately 25 km from Jhajjar city, directly on the Rohtak–Jhajjar Road (Sector 22-D). Most Jhajjar residents reach it in 20–25 minutes.',
  },
  {
    q: 'Can I join the gym at Alchemy 360 from Jhajjar?',
    a: 'Yes. Alchemy 360 offers gym memberships suitable for Jhajjar residents who plan to visit regularly. You can also book one-time gym sessions online without a long-term commitment.',
  },
  {
    q: 'What equipment does the gym at Alchemy 360 have?',
    a: 'Alchemy 360\'s gymnasium is part of a full sports complex and is equipped for strength and fitness training. For specific equipment details, call +91 93500 76653 or enquire online before your visit from Jhajjar.',
  },
  {
    q: 'Can I combine gym with other sports at Alchemy 360 in the same visit from Jhajjar?',
    a: "Yes. Jhajjar visitors often combine the gym with a cricket session at Box 360 or a swim in the open-air pool. After training, Alchemy 360's on-site restaurant is right there for a meal.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Jhajjar', path: '/gym-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function GymJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Jhajjar | Alchemy 360 Sports Arena Rohtak"
        description="Nearest gym to Jhajjar — Alchemy 360 Sports Arena, Rohtak, just 25 km / 25 min away. Well-equipped gymnasium, online membership, full sports complex."
        canonical="/gym-jhajjar"
        schema={schema}
      />
      <SportsNav activePath="/gym-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak has a well-equipped gymnasium that is the closest proper sports-complex gym to Jhajjar — just 25 km and 25 minutes away on Jhajjar Road. For fitness-focused residents of Jhajjar who want more than a local commercial gym, Alchemy 360 delivers a training environment backed by a full multi-sport facility.
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
          The Gym Closest to Jhajjar — at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Jhajjar fitness enthusiasts looking for a gym that offers more than standard commercial equipment will find Alchemy 360 Sports Arena the natural upgrade. The gymnasium sits within a full sports complex, so on any given visit you can train in the gym, follow it up with a sport, and eat at the on-site restaurant — all without leaving the facility. The 25-minute commute from Jhajjar on a clear road is a small price for a training environment this complete.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '25 Min from Jhajjar', desc: 'Directly on Jhajjar Road — one of the most accessible sports-complex gyms for Jhajjar district residents. No city traffic to wade through.' },
            { title: 'Gym Within a Sports Complex', desc: 'Train in a real sports environment alongside cricketers, badminton players, and swimmers — a different energy from a standalone gym.' },
            { title: 'Train, Play, Eat', desc: "Hit the gym, then try a badminton session or a swim. After training, Alchemy 360's on-site restaurant is ready when you are." },
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
