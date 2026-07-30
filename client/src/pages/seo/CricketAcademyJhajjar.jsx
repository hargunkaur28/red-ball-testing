import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket academy near Jhajjar?',
    a: 'Alchemy 360 Sports Arena in Rohtak has the nearest professional cricket academy to Jhajjar — just 25 km and 25 minutes away on Jhajjar Road. Coaching covers all formats including the unique Box 360 circular cricket.',
  },
  {
    q: 'What makes Alchemy 360 Cricket Academy stand out for Jhajjar players?',
    a: 'Alchemy 360 is home to Box 360 — Rohtak\'s first 24/7 circular box cricket ground. The circular format develops unique fielding reflexes and batting angles not possible on conventional rectangular grounds. It\'s a training edge Jhajjar cricketers have started using.',
  },
  {
    q: 'Does Alchemy 360 participate in any cricket tournaments?',
    a: 'Yes. Alchemy 360 hosts the Rohtak Cricket League (RCL), which is broadcast live on YouTube, Siti Cable, and DEN Networks. Cricketers from Jhajjar can participate in league matches and gain competitive exposure on a broadcast platform.',
  },
  {
    q: 'Can I join the cricket academy at Alchemy 360 as an adult from Jhajjar?',
    a: 'Absolutely. Alchemy 360\'s cricket academy has batches for juniors and adults. Whether you\'re starting out or looking to sharpen your game for competitive cricket, there\'s a programme suited to your level.',
  },
  {
    q: 'How do I book a cricket coaching slot at Alchemy 360 from Jhajjar?',
    a: 'Call +91 93500 76653 or book online. Given the short 25-minute drive from Jhajjar, morning and evening batches are both practical options for daily training.',
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
    { name: 'Cricket Academy Rohtak', path: '/cricket-academy-rohtak' },
    { name: 'Cricket Academy Jhajjar', path: '/cricket-academy-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function CricketAcademyJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Academy Near Jhajjar | Alchemy 360 Sports Arena Rohtak"
        description="Nearest cricket academy to Jhajjar — Alchemy 360 Sports Arena Rohtak, 25 km / 25 minutes. Box 360 circular cricket, RCL league, professional coaching. Join the cricket academy."
        canonical="/cricket-academy-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/cricket-academy-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Academy · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Academy Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is Jhajjar's nearest professional cricket academy — 25 km and 25 minutes on Jhajjar Road. Train on Rohtak's first 24/7 Box 360 circular cricket ground, get coached by experienced professionals, and even play in the Rohtak Cricket League (RCL) — broadcast live on YouTube, Siti Cable, and DEN Networks.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Cricket Academy
            </Link>
            <Link to="/cricket-ground-jhajjar" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Ground Near Jhajjar
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Jhajjar's Closest Cricket Academy — With a League Behind It
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          For cricketers from Jhajjar, Alchemy 360 Sports Arena in Rohtak is not just the nearest academy — it's genuinely one of the best in the region. The academy revolves around Box 360, Rohtak's first circular box cricket ground that operates 24 hours a day, 7 days a week. The circular format is unlike anything available in Jhajjar — it trains batsmen to hit in all 360 degrees and forces fielders to maintain constant alertness, developing skills that translate directly to competitive cricket. Beyond individual coaching, Alchemy 360 hosts the Rohtak Cricket League (RCL) — a structured tournament broadcast live on YouTube, Siti Cable, and DEN Networks — giving Jhajjar cricketers a real platform for competitive exposure and recognition.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box 360 — 24/7 Circular Cricket', desc: 'Train on Rohtak\'s first 24/7 circular box cricket ground. The 360-degree format is unique to Alchemy 360 in this region — a genuine advantage for Jhajjar cricketers serious about improving.' },
            { title: 'Rohtak Cricket League (RCL)', desc: 'Compete in the RCL — broadcast live on YouTube, Siti Cable, and DEN Networks. Jhajjar players get real match exposure and the chance to be seen by a wider cricket audience.' },
            { title: 'Full Campus + Restaurant', desc: 'Cricket is just the start. After training, explore the badminton courts, swimming pool, or gymnasium — and end the session with a meal at Alchemy 360\'s on-site restaurant.' },
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
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Ground Jhajjar', to: '/cricket-ground-jhajjar' },
              { label: 'Rohtak Cricket League', to: '/rohtak-cricket-league' },
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
