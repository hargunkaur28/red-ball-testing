import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a box cricket ground near Jhajjar?',
    a: 'Yes. Red Ball Sports Arena in Rohtak has Box 360 — Rohtak\'s first 24/7 circular box cricket ground. It is just 25 km and 25 minutes from Jhajjar on Jhajjar Road, making it the nearest box cricket venue to Jhajjar.',
  },
  {
    q: 'What is Box 360 at Red Ball Sports Arena?',
    a: 'Box 360 is a unique circular box cricket ground — Rohtak\'s first of its kind and the only 24/7 facility of this format in the region. The circular design means there are no corners, batsmen can hit in all directions, and fielding dynamics are completely different from rectangular grounds.',
  },
  {
    q: 'Can teams from Jhajjar book Box 360 for a match?',
    a: 'Yes. Groups and teams from Jhajjar regularly book Box 360 for casual matches, corporate games, and tournaments. Online booking is available, and the 24/7 format means you can even play late-night cricket.',
  },
  {
    q: 'Is Box 360 at Red Ball open at night for Jhajjar visitors?',
    a: 'Yes. Box 360 operates 24 hours a day, 7 days a week. Floodlighting means you can play night matches — a popular option for Jhajjar groups who prefer evening sessions.',
  },
  {
    q: 'Does Red Ball have cricket tournaments that Jhajjar teams can participate in?',
    a: 'Yes. The Rohtak Cricket League (RCL) is hosted at Red Ball and broadcast live on YouTube, Siti Cable, and DEN Networks. Teams from Jhajjar are eligible to participate and gain regional broadcast exposure.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Box Cricket Rohtak', path: '/box-cricket-rohtak' },
    { name: 'Box Cricket Jhajjar', path: '/box-cricket-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function BoxCricketJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Box Cricket Near Jhajjar | Box 360 at Red Ball Sports Arena Rohtak"
        description="Box cricket near Jhajjar — Red Ball's Box 360, Rohtak's first 24/7 circular box cricket ground, just 25 km / 25 minutes from Jhajjar. Book your match today."
        canonical="/box-cricket-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/box-cricket-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Box Cricket · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Box Cricket Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Jhajjar's nearest box cricket experience is unlike anything else in the region. Red Ball Sports Arena in Rohtak — just 25 km and 25 minutes away — is home to Box 360: Rohtak's first 24/7 circular box cricket ground. No corners. No rectangular restrictions. Just pure, fast-paced cricket in every direction, day or night.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Box Cricket
            </Link>
            <Link to="/cricket-ground-jhajjar" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Ground Near Jhajjar
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Box 360 — Rohtak's First Circular Box Cricket Ground
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Box cricket has taken Haryana by storm — and Box 360 at Red Ball Sports Arena has taken it a step further. The circular format at Box 360 is the first of its kind in Rohtak and operates 24 hours a day, every day of the year. For Jhajjar players and teams, this is an extraordinary resource just 25 minutes away. Whether you're booking a corporate game, a friend's match, a birthday cricket session, or serious pre-season training, Box 360 delivers an experience unavailable anywhere closer to Jhajjar. The Rohtak Cricket League (RCL) also calls Red Ball home — broadcast live on YouTube, Siti Cable, and DEN Networks — so the box cricket culture here is genuinely competitive, not just recreational.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Open 24/7 — Play Any Time', desc: 'Box 360 is the only 24/7 circular box cricket ground in Rohtak. Jhajjar teams can book morning slots, afternoon sessions, or late-night matches under floodlights — entirely on their schedule.' },
            { title: 'Circular Format — Unique Experience', desc: 'The 360-degree circular design removes corners and forces players to think differently. Batting in all directions and constant fielding pressure make Box 360 the most exciting format in the region.' },
            { title: 'RCL Tournaments + Restaurant', desc: 'Compete in the Rohtak Cricket League — broadcast on YouTube, Siti Cable, and DEN. After the match, celebrate or commiserate at Red Ball\'s on-site restaurant before the drive back to Jhajjar.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Box Cricket Rohtak', to: '/box-cricket-rohtak' },
              { label: 'Cricket Ground Jhajjar', to: '/cricket-ground-jhajjar' },
              { label: 'Rohtak Cricket League', to: '/rohtak-cricket-league' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
