import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Are swimming classes available for adults in Rohtak?',
    a: 'Yes. Alchemy 360 offers adult swimming classes in Rohtak for complete beginners and those who want to improve their technique. Morning and evening batches are available.',
  },
  {
    q: 'What is the minimum age for swimming classes?',
    a: 'Swimming classes at Alchemy 360 are available from 4 years old. Kids swimming programs are structured separately for children aged 4–6 and 6–14.',
  },
  {
    q: 'Are there batch swimming classes or only private lessons?',
    a: 'Both options are available. Group batch classes are cost-effective and suitable for most learners. Private one-on-one coaching can also be arranged.',
  },
  {
    q: 'How long does it take to learn swimming?',
    a: 'A complete beginner typically progresses to independent swimming within 3–4 weeks of daily classes. Full stroke mastery takes 8–12 weeks of structured training.',
  },
  {
    q: 'Is the swimming pool clean and maintained?',
    a: 'Yes. Alchemy 360\'s swimming pool is regularly cleaned, water quality is tested, and chemical levels are monitored to maintain safe and hygienic conditions.',
  },
  {
    q: 'What are the timings for swimming classes?',
    a: 'Swimming classes are scheduled in morning (5:30 AM – 9:00 AM) and evening (4:00 PM – 8:00 PM) batches. Check current batch timings when enrolling.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
  },
  breadcrumbSchema([
    { name: 'Swimming Pool', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Classes Rohtak', path: '/swimming-classes-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingClassesRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Classes in Rohtak | Learn to Swim | Alchemy 360 Sports Arena"
        description="Join swimming classes in Rohtak at Alchemy 360 Sports Arena — certified swim instructors, beginners to advanced programs, kids and adult batches. Enrol today."
        canonical="/swimming-classes-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/swimming-classes-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming Classes · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Classes in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena offers structured swimming classes in Rohtak for all age groups — beginners learning to float and kick, children building confidence in water, and adults improving technique and stamina. Certified swim instructors run morning and evening batches at our maintained swimming pool.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol in Swimming Classes
            </Link>
            <Link to="/one-time-booking" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Trial Session
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Learn to Swim at Rohtak's Best Swimming Academy
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our swimming classes in Rohtak are structured in progressive levels — beginners start with water comfort, basic strokes, and safety skills, then advance to freestyle, breaststroke, backstroke, and competitive techniques. Small batch sizes ensure each student gets individual attention from our certified instructors. Whether you are enrolling yourself or your child, Alchemy 360's swimming program delivers real results in a safe, encouraging environment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Beginner Classes', desc: 'Water comfort, floating, kicking technique, and basic stroke introduction for complete beginners of all ages.' },
            { title: 'Intermediate Training', desc: 'Freestyle, breaststroke, backstroke, and butterfly technique coaching with endurance building sessions.' },
            { title: 'Advanced Coaching', desc: 'Competitive swimming training including turns, starts, race pacing, and open water technique for advanced swimmers.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Kids Swimming', to: '/kids-swimming-classes-rohtak' },
              { label: 'Swimming Academy', to: '/swimming-academy-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
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
