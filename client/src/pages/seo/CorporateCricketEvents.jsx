import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Alchemy 360 organise corporate cricket events?',
    a: 'Yes. Alchemy 360 Sports Arena specialises in corporate cricket events — from half-day team tournaments to full-day sports days with cricket, badminton, and food.',
  },
  {
    q: 'How many employees can participate in a corporate cricket event at Alchemy 360?',
    a: 'Alchemy 360 can accommodate corporate events with 20 to 200+ employees, with multiple matches running simultaneously or sequentially throughout the day.',
  },
  {
    q: 'What is included in a corporate cricket event package at Alchemy 360?',
    a: 'Packages typically include ground booking, umpires, team registration, scorekeeping, food court access, trophies/medals, and event coordination support.',
  },
  {
    q: 'Can Alchemy 360 host a corporate cricket tournament for multiple companies?',
    a: 'Yes. Inter-company cricket leagues and corporate cricket championships involving multiple organisations are a Alchemy 360 speciality.',
  },
  {
    q: 'How far in advance should corporate events be booked at Alchemy 360?',
    a: 'We recommend booking corporate cricket events at least 2–4 weeks in advance, especially for weekends. Large events (100+ participants) require earlier booking.',
  },
  {
    q: 'Is there a separate area for corporate event guests and spectators?',
    a: 'Yes. Alchemy 360 has dedicated spectator areas and the food court can be reserved for corporate event guests. Custom event setups can be arranged.',
  },
];

const schema = [
  stadiumOrArenaSchema,
  breadcrumbSchema([
    { name: 'Cricket Tournaments Rohtak', path: '/cricket-tournaments-rohtak' },
    { name: 'Corporate Cricket Events', path: '/corporate-cricket-events' },
  ]),
  faqSchema(faqs),
];

export default function CorporateCricketEvents() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Corporate Cricket Events in Rohtak | Team Building | Alchemy 360 Sports Arena"
        description="Organise your corporate cricket event at Alchemy 360 Sports Arena Rohtak — professional ground, full event management, team tournaments, food court, Haryana & Delhi NCR teams welcome."
        canonical="/corporate-cricket-events"
        schema={schema}
      />

      <SportsNav activePath="/corporate-cricket-events" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Corporate Cricket · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Corporate Cricket Events
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena is the corporate cricket venue of choice for companies across Rohtak, Haryana, and Delhi NCR. We handle everything — ground, umpires, food, trophies, and coordination — so your team just shows up, plays, and has an unforgettable day.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Corporate Event
            </Link>
            <Link to="/cricket-tournaments-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              View All Tournaments
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          The Corporate Cricket Experience at Alchemy 360
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Corporate cricket at Alchemy 360 Sports Arena goes beyond just booking a ground. We create a complete experience — multiple team matches, professional umpires, live scoring, food court service, a closing ceremony, and trophies for winners. Whether it's your annual sports day, a team-building outing, or an inter-department championship, Alchemy 360 makes it memorable. Companies from Rohtak, Bahadurgarh, Jhajjar, Gurgaon, and Delhi regularly choose Alchemy 360 for their corporate cricket events.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'End-to-End Event Management', desc: 'Ground booking, team brackets, umpires, live scoring, food service, trophy ceremony — fully managed so HR teams can relax and enjoy.' },
            { title: 'Flexible Team Sizes', desc: 'Events for 20 to 200+ employees. Multiple matches scheduled across the day with round-robin or knockout formats.' },
            { title: 'Multi-Sport Options', desc: 'Add badminton, pickleball,  to your corporate sports day. Alchemy 360\'s multi-sport facilities make full-day corporate events possible.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Related Cricket Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Rohtak Cricket League', to: '/rohtak-cricket-league' },
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
              { label: 'Inter-College Cricket', to: '/inter-college-cricket-tournaments' },
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
