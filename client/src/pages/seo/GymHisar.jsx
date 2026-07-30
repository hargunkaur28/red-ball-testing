import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good gym near Hisar?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the closest fully-equipped gym to Hisar — approximately 100 km away, around 100 minutes on NH-9. The route is straightforward and the facility is worth making the trip for.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Hisar?',
    a: 'Alchemy 360 is around 100 km from Hisar city, located at Sector 22-D, Jhajjar Road, Rohtak. Most drivers from Hisar reach us in under 100 minutes via NH-9.',
  },
  {
    q: 'What gym equipment is available at Alchemy 360?',
    a: 'The gym has free weights, barbells, resistance machines for all major muscle groups, cardio equipment including treadmills, cycles, and ellipticals, plus a functional training area.',
  },
  {
    q: 'Can Hisar residents buy a gym membership at Alchemy 360?',
    a: 'Yes. Monthly, quarterly, and annual memberships are available. Some plans include access to multiple sports — swimming, badminton, and more. Contact us at +91 93500 76653 for current pricing.',
  },
  {
    q: 'Is there somewhere to eat at Alchemy 360 after a gym session?',
    a: 'Yes. Alchemy 360 has an on-site restaurant where you can refuel after your workout. No need to hunt for a dhaba on the way back to Hisar.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Hisar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Near Hisar', path: '/gym-hisar' },
  ]),
  faqSchema(faqs),
];

export default function GymHisar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Hisar | Alchemy 360 Sports Arena Rohtak"
        description="Looking for a gym near Hisar? Alchemy 360 Sports Arena in Rohtak is ~100 km away — fully equipped gym with free weights, cardio, personal training & memberships."
        canonical="/gym-hisar"
        schema={schema}
      />

      <SportsNav activePath="/gym-hisar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym & Fitness · Near Hisar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Hisar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 100 km from Hisar — about 100 minutes on NH-9. If you're looking for a serious gym with proper equipment, trained staff, and multi-sport access all under one roof, the drive from Hisar is absolutely worth it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Gym
            </Link>
            <Link to="/gym-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Gym Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Why Hisar Fitness Enthusiasts Come to Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          When you want a gym that goes beyond the basics, Alchemy 360 Sports Arena delivers. Located at Sector 22-D, Jhajjar Road in Rohtak, the facility offers serious strength equipment, cardio machines, and personal training — not a cramped studio with a few dumbbells. For Hisar residents visiting Rohtak for other reasons, or those planning a dedicated fitness trip, Alchemy 360 makes the journey count with a full day of training options across multiple sports.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Full Equipment Range', desc: 'Barbells, free weights, resistance machines, treadmills, cycles — everything you need for strength, cardio, and athletic conditioning in one facility.' },
            { title: 'Open 5 AM to 11 PM', desc: 'Early risers and late-night trainers are equally welcome. Seven days a week, morning to night — fit your workout around your Hisar-to-Rohtak schedule.' },
            { title: 'Train, Then Eat', desc: "After your session, head straight to Alchemy 360's on-site restaurant. Proper post-workout food without having to find a place on the road back to Hisar." },
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
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Sports Complex Hisar', to: '/sports-complex-hisar' },
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
