import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a pickleball court near Sonipat?',
    a: 'Alchemy 360 in Rohtak has a dedicated pickleball court — approximately 55 km and 55 minutes from Sonipat. It is one of the nearest proper pickleball venues to Sonipat.',
  },
  {
    q: 'How far is the Alchemy 360 pickleball court from Sonipat?',
    a: 'Alchemy 360 is in Sector 22-D, Jhajjar Road, Rohtak — about 55 km from Sonipat. The drive takes approximately 55 minutes via the Sonipat–Rohtak road.',
  },
  {
    q: 'Is pickleball available for beginners at Alchemy 360?',
    a: 'Yes. Pickleball at Alchemy 360 is open to complete beginners. The game is easy to learn, and introductory sessions can be arranged. Equipment is available on-site.',
  },
  {
    q: 'Can a group from Sonipat book the pickleball court at Alchemy 360?',
    a: 'Group bookings are welcome. Call +91 93500 76653 to arrange a time for your group from Sonipat — corporate teams and friend groups regularly book the court for competitive sessions.',
  },
  {
    q: 'What else can I do at Alchemy 360 when visiting from Sonipat?',
    a: 'Alongside pickleball, Alchemy 360 offers badminton courts, the Box 360 circular cricket ground, and a gymnasium. Sonipat visitors often spend a full day enjoying multiple sports.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Pickleball',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Pickleball Court Rohtak', path: '/pickleball-court-rohtak' },
    { name: 'Pickleball Court Sonipat', path: '/pickleball-court-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function PickleballCourtSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Pickleball Court Near Sonipat | Alchemy 360 Rohtak"
        description="Pickleball court near Sonipat — Alchemy 360 in Rohtak, 55 km / 55 minutes away. Dedicated pickleball court, beginner-friendly, group bookings. Book your slot."
        canonical="/pickleball-court-sonipat"
        schema={schema}
      />

      <SportsNav activePath="/pickleball-court-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pickleball · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Pickleball Court Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Sonipat players looking for a dedicated pickleball court need look no further than Alchemy 360 in Rohtak — just 55 km and 55 minutes away. One of the only purpose-built pickleball setups in the region, Alchemy 360 is where Sonipat's pickleball community comes to play, compete, and improve.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/pickleball" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Pickleball Court
            </Link>
            <Link to="/badminton-court-sonipat" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Badminton Near Sonipat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Sonipat's Nearest Pickleball Court — at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Pickleball has swept through Haryana's sporting circles, and Sonipat players are among the most enthusiastic. The challenge has been finding a proper, dedicated court locally. Alchemy 360 in Rohtak solves this — a 55-minute drive on well-maintained roads brings Sonipat players to one of the region's few proper pickleball setups. The court sits within a full multi-sport complex, so a pickleball session can easily be extended with a badminton match, a swim, or a quick gym session. Whether you're a total newcomer or a regular player looking for competitive games, Alchemy 360 has the space and the setup for it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min from Sonipat', desc: 'The Sonipat–Rohtak drive takes about 55 minutes and covers roughly 55 km. The route is well connected — a smooth, predictable journey for regular court sessions.' },
            { title: 'Dedicated Pickleball Court', desc: 'No makeshift setup — Alchemy 360 has a proper pickleball court with correct dimensions, markings, and net height. Equipment available on-site for players of all levels.' },
            { title: 'Stay for a Meal + Restaurant', desc: 'After your pickleball session, there\'s no need to rush. Relax and eat at Alchemy 360\'s on-site restaurant before the drive back to Sonipat.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Pickleball Court Rohtak', to: '/pickleball-court-rohtak' },
              { label: 'Badminton Court Sonipat', to: '/badminton-court-sonipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
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
