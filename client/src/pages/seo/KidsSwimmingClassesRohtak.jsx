import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'At what age can children start swimming classes at Red Ball?',
    a: 'Kids swimming classes at Red Ball are available from age 4. The youngest children (4–6 years) are in specially designed beginner water comfort batches with child-specialist coaches.',
  },
  {
    q: 'Is the pool safe for young children?',
    a: 'Yes. The pool has appropriate depth zones, anti-slip surfaces, and pool safety equipment. Young children are supervised at all times by certified swim instructors.',
  },
  {
    q: 'How quickly can a child learn to swim?',
    a: 'Most children begin swimming independently within 2–3 weeks of daily classes. Full stroke development typically takes 8–12 weeks of structured training.',
  },
  {
    q: 'Do I need to stay with my child during swimming lessons?',
    a: 'Parents are welcome to watch from designated areas. Children are safe under coach supervision and many children focus better without parental presence in the pool area.',
  },
  {
    q: 'What should my child bring for swimming classes?',
    a: 'Children should bring a swimsuit, swim cap, goggles, and a towel. A swim bag is recommended. Lockers are available at the facility.',
  },
  {
    q: 'Are the kids swimming coaches trained in child safety?',
    a: 'Yes. All children\'s swim coaches at Red Ball are certified in both swimming instruction and child safety protocols including first aid and emergency response.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
  },
  breadcrumbSchema([
    { name: "Kids' Sports Academy", path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Swimming Classes Rohtak', path: '/kids-swimming-classes-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function KidsSwimmingClassesRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Swimming Classes in Rohtak | Children's Swim Academy | Red Ball"
        description="Safe and fun kids swimming classes in Rohtak at Red Ball Sports Arena — certified instructors, child-friendly pool, ages 4 and above. Enrol your child today."
        canonical="/kids-swimming-classes-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/kids-swimming-classes-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Swimming · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Swimming Classes in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena offers dedicated kids swimming classes in Rohtak — designed to build water confidence, safety awareness, and proper technique from an early age. Our certified instructors use child-friendly teaching methods that make learning to swim enjoyable and safe for children from 4 years old.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol Your Child
            </Link>
            <Link to="/one-time-booking" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Trial Class
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Give Your Child the Gift of Swimming at Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Learning to swim is one of the most important life skills a child can develop. At Red Ball Sports Arena, our kids swimming program uses age-appropriate teaching methods, small batch sizes, and a supportive environment to take children from water-hesitant to confident, safe swimmers. Our coaches understand how to engage children, build confidence progressively, and ensure safety at all times.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Water Safety First', desc: 'All kids swimming programs begin with water confidence and safety skills — floating, emergency treading water, and safe pool behaviour.' },
            { title: 'Age-Appropriate Batches', desc: 'Classes divided into ages 4–6 (beginner water comfort) and 6–14 (stroke development and swimming skills) for targeted learning.' },
            { title: 'Small Group Learning', desc: 'Maximum 6 children per coach ensures every child receives individual attention and progresses at a safe, comfortable pace.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Swimming Classes', to: '/swimming-classes-rohtak' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
              { label: 'Kids Badminton', to: '/kids-badminton-classes-rohtak' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                className="px-4 py-2 border border-black/20 rounded-full text-sm text-[#0D0D0D] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
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
