import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is Alchemy 360 Sports Arena in Rohtak?',
    a: 'Alchemy 360 Sports Arena is a multi-sport facility in Rohtak, Haryana, offering box cricket, badminton, pickleball, swimming, gym, and a kids sports academy — all in one location.',
  },
  {
    q: 'Can I play without a membership at the sports arena?',
    a: 'Yes. You can book individual slots without a membership using our one-time booking or book-slots feature. Memberships are available for players who visit regularly.',
  },
  {
    q: 'Are there coaches available at Alchemy 360 Sports Arena?',
    a: 'Yes. Experienced coaches are available for badminton, cricket, and swimming. You can request coaching sessions when booking your slot.',
  },
  {
    q: 'How do I reach Alchemy 360 Sports Arena in Rohtak?',
    a: 'We are located at Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001. The arena is well-connected by road from central Rohtak.',
  },
  {
    q: 'Is Alchemy 360 Sports Arena suitable for corporate team events?',
    a: 'Absolutely. We host corporate sports days, team tournaments, and group bookings. Contact us to arrange a customised event for your team.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Sports Arena Rohtak', path: '/sports-arena-rohtak' }]),
  faqSchema(faqs),
];

export default function SportsArenaRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Arena in Rohtak | Alchemy 360 Sports Arena Haryana"
        description="Alchemy 360 Sports Arena in Rohtak is your one-stop sports destination. Play cricket, badminton, pickleball, swim, or hit the gym. Book slots online or get a membership."
        canonical="/sports-arena-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/sports-arena-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak · Haryana · India</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Arena in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena brings world-class sports infrastructure to Rohtak. From floodlit cricket pitches to Olympic-standard courts, everything you need to play, train, and compete is here.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Session
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Memberships
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Play Every Sport, All in One Place
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Alchemy 360 Sports Arena in Rohtak is designed to be the city's go-to sports destination. Whether you love cricket, prefer racquet sports, enjoy swimming laps, or want to lift weights — you'll find it all here with professional-grade equipment and expert coaching.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: '🏏 Box Cricket', to: '/box-cricket-rohtak' },
            { label: '🏸 Badminton', to: '/badminton-court-rohtak' },
            { label: '🥒 Pickleball', to: '/pickleball-court-rohtak' },
            { label: '🏊 Swimming', to: '/swimming-pool-rohtak' },
            { label: '🏋️ Gym', to: '/gym-in-rohtak' },
            { label: "👦 Kids' Academy", to: '/kids-sports-academy-rohtak' },
          ].map(item => (
            <Link key={item.label} to={item.to}
              className="border border-black/10 rounded-xl p-4 text-center text-sm font-semibold text-[#0D0D0D] hover:border-[#C5DB3B]/50 hover:text-[#C5DB3B] transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Flexible Access — Book Once or Join as a Member
          </h2>
          <p className="text-[#0D0D0D]/70 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena offers two ways to access the facilities. Book individual slots for a specific sport on any day you like, or opt for a monthly, quarterly, or annual membership for unlimited or fixed-quota access at a lower per-session cost.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/one-time-booking" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>One-Time Booking →</Link>
            <Link to="/buy-membership" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Membership Plans →</Link>
          </div>
        </div>
      </section>

      <CTAStrip />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
