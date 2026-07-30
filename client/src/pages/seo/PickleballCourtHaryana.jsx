import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Where can I play pickleball in Haryana?',
    a: 'Alchemy 360 Sports Arena in Rohtak has one of Haryana\'s dedicated pickleball courts — a professional setup open to beginners and competitive players alike. Located in Sector 22-D, Jhajjar Road, Rohtak.',
  },
  {
    q: 'Is pickleball popular in Haryana?',
    a: 'Pickleball is rapidly growing in Haryana, especially among urban players looking for a sport that combines badminton, tennis, and table tennis. Alchemy 360 in Rohtak is one of the few venues in the state with a dedicated court.',
  },
  {
    q: 'Do I need prior experience to play pickleball at Alchemy 360?',
    a: 'No. Pickleball is one of the easiest racket sports to pick up. Alchemy 360 welcomes complete beginners — equipment is available, and introductory sessions can be arranged on request.',
  },
  {
    q: 'Can I book a pickleball court at Alchemy 360 online?',
    a: 'Yes. Pickleball courts can be booked online or by calling +91 93500 76653. Slot availability and pricing can be confirmed directly with the Alchemy 360 team.',
  },
  {
    q: 'Is Alchemy 360 the only pickleball venue in Haryana?',
    a: 'Purpose-built pickleball courts are rare in Haryana. Alchemy 360 Sports Arena in Rohtak is one of the very few venues in the state offering a proper dedicated pickleball court with regular play sessions.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Pickleball',
    areaServed: [
      { '@type': 'State', name: 'Haryana' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Pickleball Court Rohtak', path: '/pickleball-court-rohtak' },
    { name: 'Pickleball Court Haryana', path: '/pickleball-court-haryana' },
  ]),
  faqSchema(faqs),
];

export default function PickleballCourtHaryana() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Pickleball Court in Haryana | Alchemy 360 Sports Arena Rohtak"
        description="Play pickleball in Haryana at Alchemy 360 Sports Arena, Rohtak. One of the state's few dedicated pickleball courts. Open for all levels — book your court today."
        canonical="/pickleball-court-haryana"
        schema={schema}
      />

      <SportsNav activePath="/pickleball-court-haryana" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pickleball · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Pickleball Court in Haryana
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Pickleball is one of the world's fastest-growing sports — and Haryana is catching on fast. Alchemy 360 Sports Arena in Rohtak hosts one of the state's dedicated pickleball courts, open to beginners and seasoned players from Jhajjar, Bahadurgarh, Sonipat, Gurgaon, Panipat, and beyond. Come try the sport everyone's talking about.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Pickleball Court
            </Link>
            <Link to="/pickleball-court-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Court Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Haryana's Home for Pickleball
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Pickleball combines the best of badminton, tennis, and table tennis into a fast-paced, social game that anyone can learn in minutes. Haryana's sporting culture is embracing it, and Alchemy 360 Sports Arena in Rohtak is leading the way with one of the state's few purpose-built pickleball courts. Whether you're a corporate group looking for a team sport, a family wanting a shared activity, or a competitive player seeking regular court time — Alchemy 360's pickleball court in Rohtak is the answer. Players from across Haryana, from Jhajjar to Panipat, make the trip to Alchemy 360 specifically for pickleball.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Rare in Haryana', desc: 'Dedicated pickleball courts are scarce across Haryana. Alchemy 360 in Rohtak is one of the very few venues in the state where you can play on a properly marked, maintained pickleball court.' },
            { title: 'Beginner Friendly', desc: 'Never held a pickleball paddle? No problem. The sport takes minutes to learn. Equipment is available, and Alchemy 360\'s staff can walk you through the basics before your first game.' },
            { title: 'Multiple Sports + Restaurant', desc: 'Pickleball is just the start. Pair your session with a swim, a badminton match, or a cricket slot — and wrap up the day with a meal at Alchemy 360\'s on-site restaurant.' },
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
              { label: 'Pickleball Court Rohtak', to: '/pickleball-court-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
