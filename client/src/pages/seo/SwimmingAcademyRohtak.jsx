import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What makes Alchemy 360 a swimming academy rather than just swim classes?',
    a: 'Alchemy 360 Swimming Academy follows a structured curriculum with defined levels, milestone assessments, and progressive coaching — not just open pool time with basic instructions.',
  },
  {
    q: 'Does the swimming academy offer competitive swimming training?',
    a: 'Yes. Advanced level students receive coaching in competitive techniques including relay starts, flip turns, race pacing, and open water preparation.',
  },
  {
    q: 'Are there certification or achievement programs at the swimming academy?',
    a: 'Yes. Students who complete each level receive acknowledgement and progress to the next structured level. Academy progress is tracked by coaches.',
  },
  {
    q: 'Can I join the swimming academy mid-year?',
    a: 'Yes. Enrolment is open year-round. New students are assessed and placed in the appropriate level batch based on their current ability.',
  },
  {
    q: 'Is the swimming academy suitable for competitive swimmers?',
    a: 'Yes. Alchemy 360\'s advanced swimming program is designed for competitive swimmers looking to improve race-level performance and stroke technique.',
  },
  {
    q: 'What is the coach-to-student ratio in swimming academy batches?',
    a: 'Alchemy 360 maintains small batch sizes for quality coaching. The typical ratio is 1 coach to 6–8 students in structured academy batches.',
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
    { name: 'Swimming Academy Rohtak', path: '/swimming-academy-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Academy in Rohtak | Professional Swim Training | Alchemy 360"
        description="Alchemy 360 Swimming Academy in Rohtak — professional swim coaches, structured training programs from beginner to competitive level. Enrol now."
        canonical="/swimming-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/swimming-academy-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming Academy · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Swimming Academy is Rohtak's most complete swim training program — offering structured coaching from beginner water safety to competitive swimming preparation. Built on a progressive curriculum, certified coaches, and a technique-first approach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/one-time-booking" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Trial Class
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Rohtak's Premier Swimming Academy at Alchemy 360 Sports Arena
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Alchemy 360 Swimming Academy in Rohtak goes beyond casual swim lessons. The academy follows a structured curriculum with defined levels, milestone-based progression, and regular assessment. Students move from water familiarity through stroke mastery to competitive technique. Coaches provide individual feedback and track each student's development against program milestones.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Structured Curriculum', desc: 'Progressive levels from water comfort through all major strokes to competitive technique. Each level has clear milestones and assessments.' },
            { title: 'Certified Coaches', desc: 'Professionally trained swim coaches with experience in youth instruction, competitive swimming, and water safety.' },
            { title: 'Competitive Prep', desc: 'Advanced swimmers receive training in race starts, turns, pacing strategies, and competition-level technique refinement.' },
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
              { label: 'Swimming Classes', to: '/swimming-classes-rohtak' },
              { label: 'Kids Swimming', to: '/kids-swimming-classes-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
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
