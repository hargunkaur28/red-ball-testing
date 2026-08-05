import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is badminton coaching available for complete beginners?',
    a: 'Yes. Alchemy 360 offers badminton coaching for complete beginners — starting with grip, serving, and basic rally skills before building to full stroke technique.',
  },
  {
    q: 'Can I get private badminton coaching at Alchemy 360?',
    a: 'Yes. One-on-one private coaching sessions are available for players who want focused, personalised training on specific aspects of their game.',
  },
  {
    q: 'Are there group coaching batches for badminton?',
    a: 'Yes. Group coaching batches are available with a maximum of 4–6 players per coach. Group sessions are scheduled in morning and evening batches.',
  },
  {
    q: 'How do I know which level of coaching I need?',
    a: 'New students are assessed in a trial session. Based on current skill level, the coach recommends the appropriate program. You can start with a one-time trial booking.',
  },
  {
    q: 'Is the badminton coaching focused on recreational or competitive play?',
    a: 'Both. Alchemy 360 offers recreational coaching for those who play for fitness and fun, as well as competitive coaching for players preparing for tournaments.',
  },
  {
    q: 'Do coaches provide shuttles during coaching sessions?',
    a: 'Yes. Shuttles are provided during all coaching sessions. Racquets are also available for use. Serious players are encouraged to use their own racquet for consistency.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
  },
  breadcrumbSchema([
    { name: 'Badminton Court', path: '/badminton-court-rohtak' },
    { name: 'Badminton Coaching Rohtak', path: '/badminton-coaching-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCoachingRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Coaching in Rohtak | Expert Trainers | Alchemy 360"
        description="Professional badminton coaching in Rohtak at Alchemy 360 — expert coaches, smash training, footwork drills, singles and doubles tactics for all levels."
        canonical="/badminton-coaching-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/badminton-coaching-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton Coaching · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Coaching in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 provides professional badminton coaching in Rohtak — with experienced coaches who break down technique, identify weaknesses, and build consistent, tournament-ready skills. Whether you want to fix your smash, improve footwork, or master net play — our programs deliver structured improvement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership?sport=badminton-coaching" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Start Coaching
            </Link>
            <Link to="/book-slots" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Court
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Coach-Led Badminton Training at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Badminton coaching at Alchemy 360 is designed for measurable improvement. Coaches use targeted drill sequences and match simulation to develop technically sound, tactically aware players. Sessions cover all aspects of the game — stroke technique, movement patterns, rallying strategy, and mental composure under pressure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Stroke Technique', desc: 'Detailed coaching on clear, drop, smash, drive, and net kill technique with targeted drills to correct and reinforce proper mechanics.' },
            { title: 'Footwork Mastery', desc: 'Court movement patterns, split step, lunge technique, and recovery footwork — the foundation of elite-level badminton performance.' },
            { title: 'Match Strategy', desc: 'Game pattern development, serve and return tactics, pressure management, and opponent reading for competitive players.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court', to: '/badminton-court-rohtak' },
              { label: 'Badminton Academy', to: '/badminton-academy-rohtak' },
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
