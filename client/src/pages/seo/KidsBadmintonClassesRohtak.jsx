import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'At what age can children start badminton classes at Alchemy 360?',
    a: 'Kids badminton classes are available from age 6. The program is structured in two age groups: 6–10 and 10–14, with age-appropriate coaching methods for each.',
  },
  {
    q: 'Is badminton safe for young children?',
    a: 'Badminton is one of the safest racquet sports for children — low contact, easy to learn, and excellent for developing coordination, agility, and reflexes.',
  },
  {
    q: 'How many children are in each kids badminton batch?',
    a: 'Kids badminton batches are capped at 6 children per coach to ensure each child gets attention, correction, and encouragement during every session.',
  },
  {
    q: 'Do children need to bring their own racquet?',
    a: 'Racquets are available for use in beginner classes. As children progress, having their own racquet is recommended for grip and control consistency.',
  },
  {
    q: 'Are the kids badminton coaches trained to work with children?',
    a: 'Yes. Alchemy 360\'s kids coaches are trained in child-appropriate sports instruction, patience-driven coaching, and positive reinforcement techniques.',
  },
  {
    q: 'Is there a summer camp for kids badminton?',
    a: 'Yes. Alchemy 360 organises intensive summer badminton camps for children during school holidays with additional hours, mini-tournaments, and sports fitness sessions.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
  },
  breadcrumbSchema([
    { name: "Kids' Sports Academy", path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Badminton Rohtak', path: '/kids-badminton-classes-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function KidsBadmintonClassesRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Badminton Classes in Rohtak | Children's Training | Alchemy 360 Sports Arena"
        description="Fun and structured kids badminton classes in Rohtak at Alchemy 360 Sports Arena — experienced coaches, small batches, ages 6 and above. Enrol your child today."
        canonical="/kids-badminton-classes-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/kids-badminton-classes-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Badminton · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Badminton Classes in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena offers specialised kids badminton classes in Rohtak for children aged 6 and above. Our coaches use play-based, encouraging methods that build proper technique, coordination, and a genuine love for badminton in a fun, structured environment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Build Champions Early — Kids Badminton at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Children who learn proper sports technique early develop better athleticism and game intelligence. Alchemy 360's kids badminton program in Rohtak focuses on building movement coordination, hand-eye coordination, basic stroke mechanics, and court awareness from a young age — creating the foundation for lifelong sport participation and potential competitive excellence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Ages 6–10 Program', desc: 'Fundamentals of badminton: grip, serve, rally, and basic strokes in a playful, encouraging coaching environment for young learners.' },
            { title: 'Ages 10–14 Program', desc: 'Intermediate technique covering all strokes, court coverage, and basic match play for older children building competitive skills.' },
            { title: 'Mini Tournaments', desc: 'Regular in-academy mini-tournaments to build game experience, competitive confidence, and sportsmanship.' },
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
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
              { label: 'Badminton Court', to: '/badminton-court-rohtak' },
              { label: 'Badminton Academy', to: '/badminton-academy-rohtak' },
              { label: 'Kids Swimming', to: '/kids-swimming-classes-rohtak' },
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
