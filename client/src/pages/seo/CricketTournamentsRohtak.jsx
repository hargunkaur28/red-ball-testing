import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Alchemy 360 Sports Arena host cricket tournaments in Rohtak?',
    a: 'Yes. Alchemy 360 Sports Arena is Rohtak\'s premier cricket tournament venue — hosting the Rohtak Cricket League, corporate cricket events, inter-college tournaments, and private competitions.',
  },
  {
    q: 'How do I book Alchemy 360 for a cricket tournament in Rohtak?',
    a: 'Contact Alchemy 360 at +91 93500 76653 or email info.alchemy360@gmail.com. Provide your tournament dates, number of teams, and format for a tournament package quote.',
  },
  {
    q: 'What formats are supported for cricket tournaments at Alchemy 360?',
    a: 'Alchemy 360 supports box cricket, T10, T20, and custom match formats. The ground can accommodate tournaments with 4–20+ teams depending on the schedule.',
  },
  {
    q: 'Does Alchemy 360 provide umpires and scorekeeping for tournaments?',
    a: 'Yes. Tournament packages at Alchemy 360 include umpire arrangements, scorekeeping support, and tournament management services.',
  },
  {
    q: 'Is there food available for tournament teams at Alchemy 360?',
    a: 'Yes. The on-site food court provides meals and refreshments for players and spectators. In-ground food delivery during matches is also available.',
  },
  {
    q: 'Can I organise an annual cricket tournament at Alchemy 360?',
    a: 'Yes. Many organisations use Alchemy 360 as their annual cricket tournament venue. Early booking is recommended for preferred dates, especially weekends.',
  },
];

const schema = [
  stadiumOrArenaSchema,
  breadcrumbSchema([
    { name: 'Cricket Tournaments Rohtak', path: '/cricket-tournaments-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketTournamentsRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Tournaments in Rohtak | Host Your Match | Alchemy 360 Sports Arena"
        description="Alchemy 360 Sports Arena is Rohtak's #1 cricket tournament venue — Rohtak Cricket League, corporate cricket, inter-college tournaments. Book your tournament today."
        canonical="/cricket-tournaments-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-tournaments-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Tournaments · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Tournaments in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena is Rohtak's home of cricket tournaments — hosting the Rohtak Cricket League, corporate cricket championships, inter-college competitions, and private tournaments. Professional infrastructure, digital entry, food court, and full event support make every tournament at Alchemy 360 a memorable occasion.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Tournament Venue
            </Link>
            <Link to="/rohtak-cricket-league" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Rohtak Cricket League
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Rohtak's #1 Cricket Tournament Venue
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Organising a cricket tournament requires the right venue, and Alchemy 360 Sports Arena in Rohtak delivers on every count. From the ground conditions to the food court, from the digital entry system to the spectator areas — every element is designed to make your cricket tournament a success. We've hosted hundreds of tournaments and know exactly what teams, organisers, and spectators need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Full Tournament Management', desc: 'Ground booking, umpire arrangements, team registration, scoring, and trophy ceremony coordination for your cricket tournament.' },
            { title: 'Multiple Formats', desc: 'Box cricket, T10, T20, and custom formats supported. Flexible scheduling for day tournaments, evening matches, and multi-day events.' },
            { title: 'Complete Amenities', desc: 'Floodlit ground, food court, parking, changing rooms, QR entry, and spectator seating — everything a tournament needs.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Tournament Types at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Rohtak Cricket League', to: '/rohtak-cricket-league' },
              { label: 'Corporate Cricket', to: '/corporate-cricket-events' },
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
