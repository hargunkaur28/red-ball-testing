import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is cricket coaching available at Alchemy 360 Sports Arena?',
    a: 'Yes. Alchemy 360 offers structured cricket coaching programs for all age groups — children, teenagers, and adults. Coaching covers batting, bowling, and fielding with experienced coaches.',
  },
  {
    q: 'What is the coaching fee for cricket in Rohtak at Alchemy 360?',
    a: 'Coaching fees vary by program type, duration, and batch size. Contact Alchemy 360 at +91 93500 76653 or visit the membership page for current coaching program rates.',
  },
  {
    q: 'Is there a kids cricket coaching program?',
    a: 'Yes. Alchemy 360 runs a dedicated kids cricket academy for children aged 6 and above with age-appropriate drills, small-batch coaching, and progressive skill tracking.',
  },
  {
    q: 'Who are the cricket coaches at Alchemy 360?',
    a: 'Alchemy 360 employs experienced cricket coaches with professional playing backgrounds. Coaches are trained in youth cricket instruction and sports technique development.',
  },
  {
    q: 'How often are coaching sessions held?',
    a: 'Coaching sessions are structured on weekly schedules with morning and evening batches. Custom private coaching sessions can also be arranged.',
  },
  {
    q: 'Can adults join cricket coaching at Alchemy 360?',
    a: 'Yes. Cricket coaching at Alchemy 360 is open to adults with no upper age limit. Corporate cricket coaching programs are also available for office teams.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
  },
  breadcrumbSchema([
    { name: 'Cricket Academy', path: '/cricket-academy-rohtak' },
    { name: 'Cricket Coaching Rohtak', path: '/cricket-coaching-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketCoachingRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Coaching in Rohtak | Professional Training | Alchemy 360 Sports Arena"
        description="Join professional cricket coaching in Rohtak at Alchemy 360 Sports Arena — expert coaches, structured batting, bowling, and fielding programs for all age groups. Book today."
        canonical="/cricket-coaching-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-coaching-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Coaching · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Coaching in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena offers structured cricket coaching in Rohtak for all skill levels. Our experienced coaches run systematic programs covering batting, bowling, and fielding technique, sports fitness, and match strategy — all on our dedicated cricket ground in Rohtak, Haryana.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enquire About Coaching
            </Link>
            <Link to="/book-slots" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Practice Session
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Professional Cricket Training at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Cricket coaching at Alchemy 360 goes beyond just practice time on the ground. Our coaches provide personalised feedback, drills designed for specific skill development, and a structured progression framework. Whether you are a child stepping onto a cricket ground for the first time or an adult looking to sharpen competitive game skills — Alchemy 360 cricket coaching in Rohtak has a program designed for your level and goals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Batting Coaching', desc: 'Technique-focused batting drills covering stance, grip, footwork, shot selection, and power hitting. Suitable for beginners to advanced players.' },
            { title: 'Bowling Coaching', desc: 'Fast bowling, spin bowling, and swing coaching with targeted drills for line and length, variation, and match-situation bowling.' },
            { title: 'Fielding & Fitness', desc: 'Fielding drills, agility work, and sports-specific fitness conditioning to complement technical skill development.' },
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
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Ground', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Practice', to: '/cricket-practice-ground-rohtak' },
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
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
