import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Red Ball host inter-college cricket tournaments?',
    a: 'Yes. Red Ball Sports Arena is a popular venue for inter-college cricket tournaments in Rohtak. College teams from Rohtak, MDU, and across Haryana compete here regularly.',
  },
  {
    q: 'How can a college team register for cricket tournaments at Red Ball?',
    a: 'College teams can contact Red Ball at +91 93500 76653 or email redballcricketground@gmail.com to register for upcoming inter-college cricket tournaments.',
  },
  {
    q: 'Is Red Ball affiliated with any university cricket body?',
    a: 'Red Ball Sports Arena provides the venue infrastructure for college cricket tournaments. Affiliation status with university boards varies by tournament. Contact us for current tournament details.',
  },
  {
    q: 'Are there cricket coaching programs for college players at Red Ball?',
    a: 'Yes. Red Ball Cricket Academy offers structured coaching for college-age players looking to improve their game for university-level and inter-college competitions.',
  },
  {
    q: 'What is the format for inter-college cricket at Red Ball?',
    a: 'Inter-college tournaments at Red Ball are typically played in box cricket or T10/T20 formats, allowing multiple college teams to compete in a single day or weekend event.',
  },
  {
    q: 'Is there student pricing for college cricket at Red Ball?',
    a: 'Yes. Special student pricing is available for college teams booking practice sessions and for inter-college tournament registrations. Contact Red Ball for student rates.',
  },
];

const schema = [
  stadiumOrArenaSchema,
  breadcrumbSchema([
    { name: 'Cricket Tournaments Rohtak', path: '/cricket-tournaments-rohtak' },
    { name: 'Inter-College Cricket Tournaments', path: '/inter-college-cricket-tournaments' },
  ]),
  faqSchema(faqs),
];

export default function InterCollegeCricketTournaments() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Inter-College Cricket Tournaments in Rohtak | Red Ball Sports Arena"
        description="Inter-college cricket tournaments in Rohtak at Red Ball Sports Arena — college teams from Rohtak, MDU, and across Haryana compete on Rohtak's best cricket ground."
        canonical="/inter-college-cricket-tournaments"
        schema={schema}
      />

      <SportsNav activePath="/inter-college-cricket-tournaments" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Inter-College Cricket · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Inter-College Cricket Tournaments
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena is Rohtak's home for inter-college cricket. College teams from Maharshi Dayanand University (MDU) Rohtak and across Haryana compete on our professional ground in a charged, competitive atmosphere. Regular inter-college tournaments give student cricketers the match experience they need to develop.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Register Your College Team
            </Link>
            <Link to="/cricket-tournaments-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              All Tournaments
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Where Rohtak's College Cricket Happens
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Rohtak is home to Maharshi Dayanand University and dozens of affiliated colleges with passionate cricket teams. Red Ball Sports Arena provides the arena where these teams go head-to-head in properly organised tournaments. Our inter-college cricket program gives student cricketers match practice, competitive experience, and the thrill of playing in a professional cricket environment — far beyond what any college ground can offer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'College Team Registration', desc: 'Simple online and offline registration process for college cricket teams. Competitive entry fees make Red Ball accessible for student budgets.' },
            { title: 'MDU & Haryana Colleges', desc: 'Teams from MDU Rohtak, PGIMS, IIT Rohtak, and colleges across Haryana participate in Red Ball inter-college cricket seasons.' },
            { title: 'Career Opportunities', desc: 'Performing well in Red Ball tournaments gives college players visibility for district and state-level cricket selection scouts.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Red Ball</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Rohtak Cricket League', to: '/rohtak-cricket-league' },
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Coaching', to: '/cricket-coaching-rohtak' },
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
