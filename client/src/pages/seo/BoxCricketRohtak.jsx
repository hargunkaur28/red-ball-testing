import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Where can I play box cricket in Rohtak?',
    a: 'Alchemy 360 Sports Arena in Rohtak has a dedicated, covered box cricket ground at Sector 22-D, Jhajjar Road. Book your slot online or walk in.',
  },
  {
    q: 'How many players are needed for box cricket at Alchemy 360?',
    a: 'Box cricket can be played with 6 to 11 players per side. You can book the ground for your group size.',
  },
  {
    q: 'Can I book the box cricket ground for a birthday party or team event?',
    a: 'Yes. The box cricket ground is available for group bookings including birthday parties, corporate team events, and friendly tournaments. Contact us to plan your event.',
  },
  {
    q: 'Is box cricket available at night in Rohtak?',
    a: 'Yes. Our box cricket ground has floodlighting, so evening and night sessions are available until 11:00 PM.',
  },
  {
    q: 'What equipment is provided at the box cricket ground?',
    a: 'We provide bats, balls, and protective gear for your session. Bring your own if you prefer.',
  },
  {
    q: 'How do I book the box cricket ground at Alchemy 360?',
    a: 'Visit our Book Slots page, select Box Cricket, choose your preferred date and time, and pay online. You\'ll receive a confirmation with a QR code for entry.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    sport: 'Box Cricket',
  },
  breadcrumbSchema([
    { name: 'Cricket Academy', path: '/cricket-academy-rohtak' },
    { name: 'Box Cricket Rohtak', path: '/box-cricket-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function BoxCricketRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Box Cricket in Rohtak | Book Box Cricket Ground | Alchemy 360"
        description="Book box cricket in Rohtak at Alchemy 360 Sports Arena. Covered, floodlit box cricket ground available for group matches, tournaments & corporate events. Easy online booking."
        canonical="/box-cricket-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/box-cricket-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Box Cricket · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Box Cricket in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena has Rohtak's best box cricket experience — a covered, floodlit pitch designed for fast-paced, exciting cricket. Book it for a friendly game, a corporate outing, or a tournament.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Box Cricket
            </Link>
            <Link to="/one-time-booking" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              One-Time Booking
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Why Play Box Cricket at Alchemy 360?
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Box cricket at Alchemy 360 Sports Arena is a proper, professional experience. Our enclosed ground means rain doesn't cancel your match. Floodlights mean you can play after sunset. And our easy online booking means your slot is confirmed before you arrive.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#0D0D0D]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {[
            '🏏 Covered ground — play in any weather',
            '💡 Floodlit for evening and night matches',
            '🎯 Professional pitch surface',
            '⚡ Fast-paced, exciting match format',
            '📱 Online slot booking with instant confirmation',
            '🎉 Available for group, corporate, and event bookings',
            '🧢 Equipment provided (bats, balls, gear)',
            '🍽️ On-site restaurant for post-match food',
          ].map(pt => (
            <li key={pt} className="flex items-start gap-2 p-3 bg-[#F9F6F1] rounded-lg">{pt}</li>
          ))}
        </ul>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            More at Alchemy 360 Sports Arena, Rohtak
          </h2>
          <p className="text-sm text-[#0D0D0D]/60 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            After your cricket session, explore what else the arena offers.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Courts', to: '/badminton-court-rohtak' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
              { label: 'Memberships', to: '/buy-membership' },
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
