import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a gym at Alchemy 360 Sports Arena in Rohtak?',
    a: 'Yes. Alchemy 360 Sports Arena has a modern gym in Rohtak with strength, cardio, and conditioning equipment available to members and day-pass users.',
  },
  {
    q: 'What gym equipment is available at Alchemy 360?',
    a: 'The gym is equipped with free weights, barbells, machines for major muscle groups, cardio equipment (treadmills, cycles), and functional training tools.',
  },
  {
    q: 'Are personal trainers available at the gym in Rohtak?',
    a: 'Yes. Personal trainers are available on request. Contact us to schedule personal training sessions.',
  },
  {
    q: 'What are the gym timings at Alchemy 360 Sports Arena?',
    a: 'The gym is open from 5:00 AM to 11:00 PM, seven days a week. Early morning sessions are popular for working professionals and students.',
  },
  {
    q: 'Can I get a monthly gym membership at Alchemy 360?',
    a: 'Yes. Monthly, quarterly, and annual gym memberships are available. Visit our Membership page to see current plans and pricing.',
  },
  {
    q: 'Is the gym combined with other sports access?',
    a: 'Some membership plans include multi-sport access covering gym, badminton, swimming, and more. Check our membership options for combined plans.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    sport: 'Fitness',
  },
  breadcrumbSchema([
    { name: 'Sports Complex', path: '/sports-complex-rohtak' },
    { name: 'Gym in Rohtak', path: '/gym-in-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function GymInRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym in Rohtak | Fitness Centre at Alchemy 360 Sports Arena"
        description="Modern gym in Rohtak at Alchemy 360 Sports Arena. Free weights, cardio machines, personal training & flexible memberships. Open 5 AM – 11 PM every day."
        canonical="/gym-in-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/gym-in-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym & Fitness · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena's gym in Rohtak is equipped for serious training. Whether your goal is strength, weight loss, endurance, or athletic performance — train here with the right equipment and expert guidance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Gym
            </Link>
            <Link to="/book-slots" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Day Pass
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          What's in Our Gym
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our fitness centre is a proper gym — not a hotel room with a few dumbbells. It's equipped to support strength training, cardiovascular fitness, functional conditioning, and sports performance training.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {[
            '🏋️ Free weights — dumbbells, barbells, plates',
            '💪 Resistance machines for all major muscle groups',
            '🏃 Cardio equipment — treadmills, cycles, ellipticals',
            '⚡ Functional training area',
            '👨‍🏫 Personal training sessions on request',
            '🌅 Open 5 AM for early morning workouts',
          ].map(pt => (
            <li key={pt} className="flex items-start gap-2 p-3 bg-[#F9F6F1] rounded-lg text-[#0D0D0D]/80">{pt}</li>
          ))}
        </ul>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Gym + Sports — The Complete Fitness Package
          </h2>
          <p className="text-sm text-[#0D0D0D]/60 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Combine gym training with cricket, badminton, or swimming at Alchemy 360 for a complete sports fitness routine.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Courts', to: '/badminton-court-rohtak' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Cricket Ground', to: '/cricket-academy-rohtak' },
              { label: 'Memberships', to: '/buy-membership' },
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
