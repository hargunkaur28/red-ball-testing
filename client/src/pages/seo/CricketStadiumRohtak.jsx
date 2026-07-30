import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is Alchemy 360 Sports Arena a proper cricket stadium?',
    a: 'Alchemy 360 Sports Arena is a professional cricket facility — a floodlit, enclosed box cricket stadium with professional pitch conditions, spectator areas, and full amenities. It is the premier cricket venue in Rohtak.',
  },
  {
    q: 'Does Alchemy 360 host cricket tournaments and leagues?',
    a: 'Yes. Alchemy 360 is the home venue for the Rohtak Cricket League and regularly hosts corporate cricket tournaments, inter-college matches, and private competitions.',
  },
  {
    q: 'How many players can play at the Alchemy 360 cricket stadium?',
    a: 'The cricket ground accommodates teams of 6 to 11 players per side, making it suitable for box cricket, T10, and modified formats.',
  },
  {
    q: 'Is there parking available at the cricket stadium?',
    a: 'Yes. Alchemy 360 Sports Arena has ample parking space for players, spectators, and event attendees.',
  },
  {
    q: 'Can I book the cricket stadium for a private event?',
    a: 'Yes. The cricket stadium can be booked for private events, birthday tournaments, office cricket days, and corporate leagues. Contact us at +91 93500 76653 for event bookings.',
  },
  {
    q: 'Is there a food court at the Alchemy 360 cricket stadium?',
    a: 'Yes. An on-site food court with in-ground delivery service is available. Players and spectators can order food directly to the ground.',
  },
];

const schema = [
  stadiumOrArenaSchema,
  breadcrumbSchema([
    { name: 'Cricket Stadium Rohtak', path: '/cricket-stadium-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketStadiumRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Stadium in Rohtak | Alchemy 360 Sports Arena"
        description="Alchemy 360 Sports Arena — Rohtak's premier cricket stadium with professional ground, floodlighting, seating, and online booking. Home of cricket in Rohtak, Haryana."
        canonical="/cricket-stadium-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-stadium-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Stadium · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Stadium in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena is Rohtak's most complete cricket stadium facility — a floodlit, enclosed cricket ground with dedicated spectator areas, modern amenities, and professional match conditions. Hosting everything from friendly games to the Rohtak Cricket League, it is the definitive cricket destination in Haryana.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Match Slot
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Stadium Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Alchemy 360 — The Cricket Stadium Rohtak Has Been Waiting For
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          From the moment you walk into Alchemy 360 Sports Arena, you feel the difference. The cricket stadium is built for the complete experience: a well-maintained pitch, professional boundary setup, floodlit playing surface, spectator viewing areas, food court access, and digital QR entry. Whether you are playing a corporate match, a Rohtak Cricket League fixture, or a casual session with friends — this is the cricket stadium that sets the standard in Rohtak, Haryana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Match-Ready Ground', desc: 'Professional pitch and outfield maintained to match standards. Suitable for hard-ball, tennis-ball, box cricket leagues, and corporate events.' },
            { title: 'Spectator Viewing', desc: 'Dedicated spectator areas around the cricket ground — ideal for Rohtak Cricket League matches and corporate events with audiences.' },
            { title: 'Food Court Access', desc: 'On-site food court with in-ground delivery. Players and spectators can order food and beverages without leaving the stadium premises.' },
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
              { label: 'Cricket Ground', to: '/cricket-ground-rohtak' },
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Sports Complex', to: '/sports-complex-rohtak' },
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
