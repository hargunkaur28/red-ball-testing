import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a swimming pool at Alchemy 360 Sports Arena in Rohtak?',
    a: 'Yes. Alchemy 360 Sports Arena has a swimming pool in Rohtak, open year-round. Swimming sessions can be booked online or by walk-in.',
  },
  {
    q: 'Are swimming coaches available at Alchemy 360?',
    a: 'Yes. Swimming instructors are available for learn-to-swim lessons, technique improvement, and fitness swimming sessions.',
  },
  {
    q: 'Can children learn to swim at Alchemy 360 Academy?',
    a: 'Yes. We offer beginner swimming lessons for children and have experience teaching non-swimmers of all ages.',
  },
  {
    q: 'What are the swimming pool timings in Rohtak?',
    a: 'The pool is open from 5:00 AM to 11:00 PM, seven days a week. Early morning swimming sessions are popular for fitness enthusiasts.',
  },
  {
    q: 'What is the condition of the swimming pool?',
    a: 'The pool is maintained and cleaned regularly. Contact us directly for current details on water temperature and facilities.',
  },
  {
    q: 'How do I book a swimming slot at Alchemy 360 Rohtak?',
    a: 'Book online via our Book Slots page, or use the one-time booking feature. Membership plans offer better per-session rates for regular swimmers.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    sport: 'Swimming',
  },
  breadcrumbSchema([
    { name: 'Sports Complex', path: '/sports-complex-rohtak' },
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool in Rohtak | Alchemy 360 Sports Arena Haryana"
        description="Alchemy 360 Sports Arena has a swimming pool in Rohtak, Haryana. Open year-round with swimming instructors, kids lessons & membership plans. Book your swim session online."
        canonical="/swimming-pool-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/swimming-pool-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena offers a clean, well-maintained swimming pool in Rohtak, with trained instructors for all levels. From early morning laps to kids' learn-to-swim programs, the pool is available all week.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Swimming Session
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Swimming Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Swimming at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our swimming pool serves fitness swimmers, students learning to swim, and kids who are just getting comfortable in the water. Experienced instructors help make every session safe and productive.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Lap Swimming', desc: 'Open lanes for regular lap swimming. Early morning and evening slots available.' },
            { title: 'Swim Coaching', desc: 'Experienced instructors for technique improvement, endurance training, and competitive swim prep.' },
            { title: "Kids' Swim Lessons", desc: 'Safe, fun learn-to-swim lessons for children with experienced instructors.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360 Sports Arena, Rohtak</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground', to: '/cricket-academy-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Gym & Fitness', to: '/gym-in-rohtak' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
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
