import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a professional cricket academy near Panipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest full-scale professional cricket academy to Panipat — approximately 95 km and 90 minutes away. The quality of coaching and facilities makes the drive worthwhile for dedicated players.',
  },
  {
    q: 'What is Box 360 cricket at Alchemy 360?',
    a: 'Box 360 is Rohtak\'s first 24/7 circular box cricket ground at Alchemy 360 Sports Arena. The circular format trains batsmen to score in all directions and sharpens fielding reflexes in ways traditional rectangular grounds cannot replicate.',
  },
  {
    q: 'Can Panipat cricketers join the Rohtak Cricket League?',
    a: 'Yes. The Rohtak Cricket League (RCL) is open to competitive cricketers from across the region. RCL matches are broadcast live on YouTube, Siti Cable, and DEN Networks — giving Panipat cricketers regional recognition.',
  },
  {
    q: 'Is Alchemy 360 Cricket Academy suitable for Panipat players who travel for coaching?',
    a: 'Yes. Alchemy 360 accommodates travelling players with flexible batch timings including weekend programmes. Many serious cricketers from Panipat plan a weekly training trip, covering a full coaching session in a single visit.',
  },
  {
    q: 'How do I contact Alchemy 360 Cricket Academy from Panipat?',
    a: 'Call +91 93500 76653 or book online. The Alchemy 360 team will help you find the right batch and coaching programme to suit your skill level and travel schedule from Panipat.',
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
    { name: 'Cricket Academy Rohtak', path: '/cricket-academy-rohtak' },
    { name: 'Cricket Academy Panipat', path: '/cricket-academy-panipat' },
  ]),
  faqSchema(faqs),
];

export default function CricketAcademyPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Academy Near Panipat | Alchemy 360 Sports Arena Rohtak"
        description="Professional cricket academy near Panipat — Alchemy 360 Sports Arena Rohtak, 95 km / 90 minutes. Box 360 circular cricket, RCL league coverage. Join the cricket academy."
        canonical="/cricket-academy-panipat"
        schema={schema}
      />

      <SportsNav activePath="/cricket-academy-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Academy · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Academy Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 95 km from Panipat — 90 minutes on the highway. For cricketers who are serious about their game, that 90 minutes is a one-way investment into Haryana's most complete cricket facility: Box 360 circular cricket, professional coaching, and a platform to compete in the Rohtak Cricket League broadcast live on YouTube, Siti Cable, and DEN Networks.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Cricket Academy
            </Link>
            <Link to="/cricket-ground-panipat" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Ground Near Panipat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Panipat Cricketers Train at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Panipat has produced talented cricketers — and the ones who are serious about making it to the next level seek out facilities that match their ambition. Alchemy 360 Sports Arena in Rohtak is that facility. Box 360 — Rohtak's first 24/7 circular box cricket ground — offers a training environment that is genuinely unique in this part of Haryana. The circular format forces batsmen to develop a complete 360-degree game and trains fielders to operate without a conventional boundary pattern. Beyond the ground, Alchemy 360's coaching staff brings years of experience developing competitive players. And the Rohtak Cricket League (RCL) — broadcast live on YouTube, Siti Cable, and DEN Networks — provides exactly the tournament exposure that ambitious Panipat cricketers need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box 360 — Unique Training Advantage', desc: 'Box 360 is Rohtak\'s first 24/7 circular cricket ground and the only one of its kind in the region. The circular format develops a complete cricketing game unavailable anywhere near Panipat.' },
            { title: 'Play in the RCL — On Broadcast TV', desc: 'The Rohtak Cricket League is streamed live on YouTube and broadcast on Siti Cable and DEN Networks. Panipat cricketers who train and compete at Alchemy 360 gain real media visibility.' },
            { title: 'Full Complex + Restaurant', desc: 'Recover from a hard training session with a visit to the swimming pool or gymnasium. Then eat well at Alchemy 360\'s on-site restaurant before the drive back to Panipat.' },
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
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
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
