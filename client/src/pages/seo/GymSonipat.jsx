import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports-complex gym near Sonipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak has a well-equipped gymnasium set within a full sports complex — approximately 55 km and 55 minutes from Sonipat via NH-334B.',
  },
  {
    q: 'How long does it take to drive from Sonipat to Alchemy 360\'s gym?',
    a: 'The drive from Sonipat to Alchemy 360 Sports Arena in Rohtak takes approximately 55 minutes on NH-334B. The complex is at Sector 22-D, Jhajjar Road (near Omaxe).',
  },
  {
    q: 'Can Sonipat gym-goers buy a membership at Alchemy 360?',
    a: 'Yes. Alchemy 360 offers gym memberships for regular visitors. Sonipat residents who plan to visit on a weekly or fortnightly basis can choose a membership plan that suits their frequency.',
  },
  {
    q: 'What makes Alchemy 360\'s gym different from local gyms in Sonipat?',
    a: "Alchemy 360's gym is embedded in a multi-sport complex. Sonipat members get access to cricket, swimming, badminton, and pickleball alongside their training — it's a full sports lifestyle, not just a workout room.",
  },
  {
    q: 'Can I do both gym and cricket on the same trip from Sonipat?',
    a: "Yes. Many Sonipat visitors combine gym training with a session at Box 360 — Rohtak's first 24/7 circular box cricket facility. It's a full sports experience in one visit, capped off at Alchemy 360's on-site restaurant.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Sonipat', path: '/gym-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function GymSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Sonipat | Alchemy 360 Sports Arena Rohtak"
        description="Gym near Sonipat — Alchemy 360 Sports Arena, Rohtak, 55 km / 55 min away. Sports-complex gymnasium, memberships, cricket, swimming & more in one facility."
        canonical="/gym-sonipat"
        schema={schema}
      />
      <SportsNav activePath="/gym-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 55 km and about 55 minutes from Sonipat on NH-334B — and it offers a gymnasium that is part of a full sports complex, not a standalone fitness room. For Sonipat gym-goers who want to train in a real sports environment, the highway drive is a worthwhile commitment.
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
          Train at Rohtak's Best Sports Complex — From Sonipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has a solid sporting culture, and Alchemy 360 Sports Arena in Rohtak is increasingly where Sonipat athletes and fitness enthusiasts go when they want to step up their game. The gym is well-equipped and sits within a complex that also houses Box 360 cricket, an open-air swimming pool, badminton courts, and pickleball. Sonipat members who visit Alchemy 360 regularly often structure their visit around multiple activities, making the hour-long commute feel efficient and well-spent.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min on NH-334B', desc: 'NH-334B from Sonipat to Rohtak is a clear, direct route. Alchemy 360 is in Sector 22-D, Jhajjar Road — straightforward navigation from the highway.' },
            { title: 'Athletes Train Here', desc: 'Alchemy 360\'s gym is used by cricketers, swimmers, and badminton players in training — a focused sports environment that Sonipat gym-goers find motivating.' },
            { title: 'Fuel After the Session', desc: "Alchemy 360's on-site restaurant handles post-workout nutrition. Sonipat visitors can eat well without hunting for a dhaba before the drive home." },
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
              { label: 'Cricket Ground Sonipat', to: '/cricket-ground-sonipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
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
