import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a box cricket ground near Panipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest venue with a proper box cricket facility to Panipat — approximately 95 km and 90 minutes away. Box 360, Rohtak\'s first 24/7 circular box cricket ground, is available for bookings by Panipat teams.',
  },
  {
    q: 'What makes Box 360 at Alchemy 360 special compared to other box cricket grounds?',
    a: 'Box 360 is circular — not rectangular like conventional box cricket grounds. This unique format means batsmen play in all 360 degrees, fielders face constant pressure from every angle, and the game is faster, more intense, and more exciting. It\'s available 24/7 and is the first of its kind in Rohtak.',
  },
  {
    q: 'Can a Panipat team travel to Alchemy 360 for a box cricket tournament?',
    a: 'Yes. Teams from Panipat are welcome to compete in the Rohtak Cricket League (RCL) hosted at Alchemy 360. RCL matches are broadcast live on YouTube, Siti Cable, and DEN Networks — making it a proper competitive platform with regional media reach.',
  },
  {
    q: 'Is Box 360 available for late-night bookings from Panipat?',
    a: 'Yes. Box 360 at Alchemy 360 operates 24/7, including late-night slots under floodlights. Panipat teams can book early morning or late evening — ideal for groups who want to avoid peak traffic on the drive to Rohtak.',
  },
  {
    q: 'How do I book Box 360 for a Panipat group visit?',
    a: 'Book online or call +91 93500 76653. Advance booking is recommended for group visits from Panipat to ensure the preferred time slot is available — especially for weekends and tournament days.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Box Cricket Rohtak', path: '/box-cricket-rohtak' },
    { name: 'Box Cricket Panipat', path: '/box-cricket-panipat' },
  ]),
  faqSchema(faqs),
];

export default function BoxCricketPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Box Cricket Near Panipat | Box 360 at Alchemy 360 Sports Arena Rohtak"
        description="Box cricket near Panipat — Alchemy 360's Box 360, Rohtak's first 24/7 circular box cricket ground, 95 km / 90 minutes from Panipat. RCL tournaments. Book your match."
        canonical="/box-cricket-panipat"
        schema={schema}
      />

      <SportsNav activePath="/box-cricket-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Box Cricket · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Box Cricket Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Panipat teams looking for box cricket that goes beyond the ordinary need to make one trip to Alchemy 360 Sports Arena in Rohtak. At 95 km and 90 minutes away, Box 360 — Rohtak's first 24/7 circular box cricket ground — offers a cricket format that simply doesn't exist anywhere closer to Panipat. One visit and you'll understand why Panipat cricketers keep coming back.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Box Cricket
            </Link>
            <Link to="/cricket-ground-panipat" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Ground Near Panipat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Why Panipat Cricketers Come to Box 360 in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Box cricket in Panipat typically means standard rectangular enclosures — functional, but limited. Box 360 at Alchemy 360 Sports Arena in Rohtak is a different proposition entirely. The circular format — Rohtak's first of its kind, available 24 hours a day — eliminates corners and forces a complete, all-direction game. Batting, bowling, and fielding all feel different in the circular arena, and the intensity of play is noticeably higher. Panipat teams plan a 90-minute drive to Alchemy 360 as a proper cricket event, not just a casual booking. For those looking to compete, the Rohtak Cricket League (RCL) — broadcast live on YouTube, Siti Cable, and DEN Networks — provides a regional stage that makes the journey an even more compelling proposition.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box 360 — 360° Circular Cricket', desc: 'No other box cricket ground in the region matches Box 360\'s circular format. Available 24/7, including night sessions under floodlights — worth every kilometre of the 95 km drive from Panipat.' },
            { title: 'Compete in the RCL on TV', desc: 'The Rohtak Cricket League is broadcast live on YouTube, Siti Cable, and DEN Networks. Panipat teams can enter RCL and play competitive cricket with real broadcast reach across the region.' },
            { title: 'Celebrate After the Match + Restaurant', desc: 'After a great box cricket session, teams from Panipat can dine together at Alchemy 360\'s on-site restaurant — a proper post-match meal before the drive back.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Box Cricket Rohtak', to: '/box-cricket-rohtak' },
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
              { label: 'Cricket Tournaments Rohtak', to: '/cricket-tournaments-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
