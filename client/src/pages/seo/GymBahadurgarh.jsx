import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good gym near Bahadurgarh?',
    a: 'Alchemy 360 Sports Arena in Rohtak has a well-equipped gymnasium accessible from Bahadurgarh — approximately 45 km and 40 minutes on NH-148B. It is part of a full multi-sport complex.',
  },
  {
    q: 'How far is Alchemy 360\'s gym from Bahadurgarh?',
    a: 'Alchemy 360 Sports Arena is about 45 km from Bahadurgarh, reachable in approximately 40 minutes via NH-148B towards Rohtak. The complex is in Sector 22-D, near Omaxe.',
  },
  {
    q: 'Can I get a gym membership at Alchemy 360 from Bahadurgarh?',
    a: 'Yes. Alchemy 360 offers gym memberships for regular visitors and one-time session bookings for occasional visitors from Bahadurgarh. Enquire online or call +91 93500 76653.',
  },
  {
    q: 'Is Alchemy 360\'s gym better than gyms in Bahadurgarh?',
    a: "Alchemy 360's gym operates within a full sports complex — alongside cricket, badminton, and pickleball facilities. For fitness enthusiasts from Bahadurgarh who want a training environment that extends beyond standard gym equipment, it's a significant step up.",
  },
  {
    q: 'Can I swim and use the gym on the same visit from Bahadurgarh?',
    a: "Yes. Bahadurgarh visitors often combine gym training with a swim in Alchemy 360's open-air pool. The facilities are co-located and the on-site restaurant makes a full day practical and enjoyable.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Bahadurgarh', path: '/gym-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function GymBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Bahadurgarh | Alchemy 360 Sports Arena Rohtak"
        description="Gym near Bahadurgarh — Alchemy 360 Sports Arena, Rohtak, 45 km / 40 min away. Well-equipped gymnasium, memberships, full sports complex with cricket & more."
        canonical="/gym-bahadurgarh"
        schema={schema}
      />
      <SportsNav activePath="/gym-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak offers a proper gymnasium within a full multi-sport complex — 45 km and 40 minutes from Bahadurgarh on NH-148B. For Bahadurgarh fitness enthusiasts who want more than a standalone gym and are willing to make a 40-minute highway drive for a complete sports experience, Alchemy 360 is the right move.
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
          Bahadurgarh's Best Gym is 40 Minutes Away
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh is well-connected to Rohtak by NH-148B, and for fitness enthusiasts from Bahadurgarh who want a gym that forms part of a real sports environment, Alchemy 360 Sports Arena is the obvious upgrade. The gymnasium here isn't bolted onto a shopping complex — it's inside a dedicated sports arena alongside Box 360 cricket, badminton courts, and pickleball. Bahadurgarh gym-goers who visit regularly often add a swim or a sport to their routine, making the 40-minute commute feel entirely worthwhile.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '40 Min NH-148B Drive', desc: 'Smooth, well-maintained highway from Bahadurgarh to Rohtak. Alchemy 360 is right off the main road near Omaxe — easy to find, easy to park.' },
            { title: 'Sports Complex Gym', desc: 'Train in a facility built for athletes — surrounded by cricket, and racket sports infrastructure that keeps motivation high.' },
            { title: 'Gym + Meal', desc: "Post-workout nutrition sorted — Alchemy 360's on-site restaurant serves food for gym members and sports visitors from Bahadurgarh without any extra planning." },
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
