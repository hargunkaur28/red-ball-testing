import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is Alchemy 360 Sports Arena a full stadium in Rohtak?',
    a: 'Alchemy 360 Sports Arena is a modern multi-sport complex in Rohtak with floodlit courts, a covered box cricket ground, swimming pool, gym, and sports facilities — comparable to a community sports stadium.',
  },
  {
    q: 'Can I rent the sports complex for tournaments or events?',
    a: 'Yes. Alchemy 360 Sports Arena can host local tournaments, corporate sports events, and group bookings. Contact us to discuss event requirements.',
  },
  {
    q: 'What facilities are available at the arena?',
    a: 'The arena has box cricket grounds, badminton courts, pickleball courts, a swimming pool, a modern gym, a restaurant, and a kids sports zone.',
  },
  {
    q: 'Is the ground available for early morning sessions?',
    a: 'Yes. We open at 5:00 AM daily to accommodate early-morning players and fitness enthusiasts before school or work.',
  },
  {
    q: 'Is online booking available for the stadium/arena?',
    a: 'Yes. You can book slots online through our website. Select your sport, choose a time slot, and pay securely through Razorpay.',
  },
  {
    q: 'Where is Alchemy 360 Sports Arena located?',
    a: 'We are at Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Stadium in Rohtak', path: '/stadium-in-rohtak' }]),
  faqSchema(faqs),
];

export default function StadiumInRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Stadium in Rohtak | Alchemy 360 Sports Arena & Complex"
        description="Looking for a stadium or sports complex in Rohtak? Alchemy 360 Sports Arena offers world-class facilities — box cricket, badminton, swimming, gym & pickleball. Book online today."
        canonical="/stadium-in-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/stadium-in-rohtak" />

      {/* Hero */}
      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Multi-Sport Complex · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Stadium in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena is Rohtak's premier sports complex — a full-featured venue with cricket grounds, racquet sports courts, aquatic facilities, and a modern gym, all under one roof.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Ground
            </Link>
            <Link to="/one-time-booking" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              One-Time Access
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Facilities at Our Rohtak Sports Complex
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Box Cricket Ground', desc: 'Covered, floodlit box cricket pitch with professional surface. Ideal for matches, practice, and tournaments.', link: '/box-cricket-rohtak' },
            { title: 'Badminton Courts', desc: 'Multiple wooden-floored badminton courts with lighting for daytime and evening sessions.', link: '/badminton-court-rohtak' },
            { title: 'Pickleball Courts', desc: 'Dedicated pickleball courts in Rohtak — a growing sport with limited venues in Haryana.', link: '/pickleball-court-rohtak' },
            { title: 'Swimming Pool', desc: 'Clean, maintained swimming pool open year-round. Instructor-led sessions available.', link: '/swimming-pool-rohtak' },
            { title: 'Gym & Fitness Centre', desc: 'Modern gym with weights, cardio machines, and strength equipment.', link: '/gym-in-rohtak' },
            { title: "Kids' Sports Zone", desc: 'Safe, structured sports environment for children. Coaching in cricket and badminton.', link: '/kids-sports-academy-rohtak' },
          ].map(item => (
            <Link key={item.title} to={item.link} className="border border-black/10 rounded-xl p-5 hover:border-[#C5DB3B]/40 hover:shadow-sm transition-all group">
              <h3 className="font-bold text-[#0D0D0D] mb-2 group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
              <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Complex Highlights */}
      <section className="bg-[#F9F6F1] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Rohtak's Sports Hub for Individuals, Families & Teams
          </h2>
          <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Whether you're a casual player looking for a quick session, a serious athlete training daily, or a group organizing a corporate sports event — Alchemy 360 Sports Arena in Rohtak is equipped to host you. Our facility supports individual bookings, membership-based access, and bulk team bookings.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports-academy-rohtak" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy →</Link>
            <Link to="/sports-arena-rohtak" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Arena →</Link>
            <Link to="/sports-complex-rohtak" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex →</Link>
          </div>
        </div>
      </section>

      <CTAStrip />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
