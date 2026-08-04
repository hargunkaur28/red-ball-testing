import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { stadiumOrArenaSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is the Rohtak Cricket League (RCL)?',
    a: 'The Rohtak Cricket League is a premier local T20 cricket tournament held at Alchemy 360 Sports Arena, Rohtak. It features 20-over matches between local corporate and franchise teams from Rohtak and Haryana.',
  },
  {
    q: 'Is the Rohtak Cricket League broadcast live?',
    a: 'Yes. RCL matches are broadcast live on YouTube, Siti Cable, and DEN Networks — making it one of the few local cricket leagues in Haryana with full live coverage.',
  },
  {
    q: 'How can my team register for the Rohtak Cricket League?',
    a: 'Contact Alchemy 360 Sports Arena at +91 93500 76653 or email redballcricketground@gmail.com to register your team. Both corporate and franchise teams are welcome.',
  },
  {
    q: 'Where are RCL matches played?',
    a: 'All Rohtak Cricket League matches are played at Alchemy 360 Sports Arena, Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — which also features Box 360, Rohtak\'s first 24/7 circular box cricket facility.',
  },
  {
    q: 'What facilities are available for spectators during RCL matches?',
    a: 'Alchemy 360 Sports Arena has floodlit day/night grounds, seating for spectators, and an on-site restaurant where fans can dine during and after matches.',
  },
  {
    q: 'Are teams from outside Rohtak eligible to play in the RCL?',
    a: 'Yes. Corporate and franchise teams from across Haryana and Delhi NCR are eligible to participate. The league welcomes teams from cities like Jhajjar, Sonipat, Panipat, Gurgaon, and beyond.',
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
        title="Rohtak Cricket League (RCL) | Live T20 Tournament | Alchemy 360 Sports Arena"
        description="The Rohtak Cricket League is Rohtak's premier T20 tournament — broadcast live on YouTube, Siti Cable & DEN Networks. Hosted at Alchemy 360 Sports Arena, Jhajjar Road, Rohtak. Register your team."
        canonical="/rohtak-cricket-league"
        schema={schema}
      />

      <SportsNav activePath="/rohtak-cricket-league" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Live T20 Cricket · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Rohtak Cricket League
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Rohtak Cricket League (RCL) is Rohtak's premier T20 cricket tournament — 20-over league cricket featuring corporate and franchise teams from Rohtak and across Haryana, played under floodlights at Alchemy 360 Sports Arena.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            RCL matches are broadcast live on <span className="text-white/80 font-semibold">YouTube</span>, <span className="text-white/80 font-semibold">Siti Cable</span>, and <span className="text-white/80 font-semibold">DEN Networks</span> — bringing professional cricket coverage to Rohtak.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Register Your Team
            </Link>
            <Link to="/cricket-tournaments-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              All Tournaments
            </Link>
          </div>
        </div>
      </section>

      {/* Live broadcast highlight */}
      <section className="bg-[#C5DB3B] px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-white">
          <div className="text-4xl">📺</div>
          <div>
            <p className="font-black text-lg uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Broadcast Live</p>
            <p className="text-white/85 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              RCL matches air on <strong>YouTube</strong>, <strong>Siti Cable</strong>, and <strong>DEN Networks</strong> — watch from anywhere in Haryana or tune in live at the ground.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Rohtak's Home of Competitive Cricket
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Alchemy 360 Sports Arena on Jhajjar Road is the official venue of the Rohtak Cricket League. The arena's floodlit grounds host day-night T20 matches in a league format, with the stadium atmosphere bringing out the best in every team that competes here. The RCL isn't just a tournament — it's a live event with broadcast coverage that reaches viewers across Haryana and beyond. Alongside the cricket ground, Alchemy 360's Box 360 — Rohtak's first 24/7 circular box cricket facility — hosts warm-up and practice matches for RCL squads.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: '20-Over T20 Format',
              desc: 'Full league format — 20-over T20 matches with corporate and franchise teams. Group stages, knockouts, and a grand final played under Alchemy 360\'s floodlights.',
            },
            {
              title: 'Live on Cable & YouTube',
              desc: 'RCL matches are broadcast live on YouTube, Siti Cable, and DEN Networks. Come watch in person or follow along from anywhere.',
            },
            {
              title: 'Stadium Experience',
              desc: 'Spectator seating, on-site restaurant serving food and drinks during match days, and a genuine live sports atmosphere at every RCL fixture.',
            },
          ].map(item => (
            <div key={item.title} className="bg-[#F9F6F1] rounded-xl p-5">
              <h3 className="font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
              <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Box 360 callout */}
      <section className="bg-[#0D0D0D] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Exclusive to Alchemy 360</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Box 360 — Rohtak's First Circular Box Cricket
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alongside the main cricket ground, Alchemy 360 features Box 360 — a unique circular box cricket format available 24/7. It's the first of its kind in Rohtak, offering a fast, high-intensity game format perfect for practice or a quick competitive match at any hour.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More Cricket at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Tournaments', to: '/cricket-tournaments-rohtak' },
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
