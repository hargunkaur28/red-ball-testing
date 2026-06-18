import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is the Rohtak Cricket League?',
    a: 'The Rohtak Cricket League (RCL) is a structured cricket tournament hosted at Red Ball Sports Arena — featuring teams from Rohtak and across Haryana competing in a league format.',
  },
  {
    q: 'How can my team register for the Rohtak Cricket League?',
    a: 'Contact Red Ball Sports Arena at +91 93500 76653 or email redballcricketground@gmail.com to register your team for the next Rohtak Cricket League season.',
  },
  {
    q: 'Where is the Rohtak Cricket League played?',
    a: 'All Rohtak Cricket League matches are played at Red Ball Sports Arena, Sector 22-D, Jhajjar Road, Rohtak — the official home ground of the RCL.',
  },
  {
    q: 'How many teams participate in the Rohtak Cricket League?',
    a: 'The Rohtak Cricket League features multiple teams each season. Team count varies by season. Contact us for current season participation details.',
  },
  {
    q: 'Is the Rohtak Cricket League open to teams from outside Rohtak?',
    a: 'Yes. Teams from across Haryana and Delhi NCR are welcome to participate in the Rohtak Cricket League. Contact Red Ball to register an out-of-city team.',
  },
  {
    q: 'Is there an entry fee for the Rohtak Cricket League?',
    a: 'Yes. Team registration fees apply for the Rohtak Cricket League. Fees vary by season and format. Contact Red Ball for current RCL registration details.',
  },
];

const schema = [
  stadiumOrArenaSchema,
  breadcrumbSchema([
    { name: 'Cricket Tournaments Rohtak', path: '/cricket-tournaments-rohtak' },
    { name: 'Rohtak Cricket League', path: '/rohtak-cricket-league' },
  ]),
  faqSchema(faqs),
];

export default function RohtakCricketLeague() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Rohtak Cricket League | RCL Official Venue | Red Ball Sports Arena"
        description="The Rohtak Cricket League (RCL) is played at Red Ball Sports Arena — Rohtak's home of cricket. Register your team, view schedules, and be part of Haryana's most exciting cricket league."
        canonical="/rohtak-cricket-league"
        schema={schema}
      />

      <SportsNav activePath="/rohtak-cricket-league" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Official Home Venue · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Rohtak Cricket League
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena is the official home of the Rohtak Cricket League — Rohtak's most competitive and celebrated cricket tournament. Season after season, the RCL brings together the best cricket teams from Rohtak and Haryana to compete on Rohtak's finest cricket ground.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Register Your Team
            </Link>
            <Link to="/cricket-tournaments-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              All Tournaments
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          The Home of Cricket Competition in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          The Rohtak Cricket League at Red Ball Sports Arena is more than a tournament — it's the centrepiece of Rohtak's cricket calendar. Teams train for months to compete in the RCL. Spectators fill the ground on match days. The league has created a genuine cricket culture in Rohtak, giving players a competitive outlet and a reason to take the game seriously. Red Ball's facilities make every RCL match a professional experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'League Format', desc: 'Round-robin group stage followed by knockout semi-finals and a grand final. Multiple matches across the season for all participating teams.' },
            { title: 'Official Ground', desc: 'All RCL matches played at Red Ball Sports Arena — floodlit ground, scoreboard, seating, food court, and QR-based entry system.' },
            { title: 'Open Registration', desc: 'Teams from Rohtak, Haryana, and Delhi NCR are eligible to register. Corporate, college, and club teams all welcome.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More Cricket at Red Ball</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
              { label: 'Corporate Cricket', to: '/corporate-cricket-events' },
              { label: 'Inter-College Cricket', to: '/inter-college-cricket-tournaments' },
              { label: 'Cricket Ground', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Stadium', to: '/cricket-stadium-rohtak' },
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
