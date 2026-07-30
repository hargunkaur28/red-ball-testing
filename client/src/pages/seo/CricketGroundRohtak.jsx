import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Where is Alchemy 360 cricket ground located in Rohtak?',
    a: 'Alchemy 360 Sports Arena cricket ground is located at Sector 22-D, Jhajjar Road, near Village Maina, Rohtak, Haryana 124001. It is easily accessible from the main Rohtak–Jhajjar highway.',
  },
  {
    q: 'Can I book the cricket ground online?',
    a: 'Yes. Alchemy 360 offers online slot booking for the cricket ground. Visit the Book Slots page, select your preferred date and time, and complete the booking with online payment. QR-code entry is provided on booking.',
  },
  {
    q: 'What type of cricket is played at Alchemy 360?',
    a: 'Alchemy 360 Sports Arena has a box cricket ground — a compact, enclosed format ideal for 6–11 players per side. It is fast-paced, can be finished in under an hour, and is perfect for both casual games and competitive tournaments.',
  },
  {
    q: 'Is the cricket ground available at night?',
    a: 'Yes. The cricket ground at Alchemy 360 is fully floodlit and available for evening and night sessions. The facility is open from 5:00 AM to 11:00 PM daily.',
  },
  {
    q: 'Is the cricket ground available for tournaments?',
    a: 'Yes. Alchemy 360 hosts private cricket tournaments, corporate cricket events, and the Rohtak Cricket League on its grounds. Contact us for tournament bookings.',
  },
  {
    q: 'What are the charges for booking the cricket ground in Rohtak?',
    a: 'Per-slot rates vary by time of day and session length. Membership holders get discounted rates. Check current pricing on the Book Slots page or call +91 93500 76653.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
  },
  breadcrumbSchema([
    { name: 'Cricket Ground', path: '/cricket-ground-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground in Rohtak | Book Cricket Slot | Alchemy 360 Sports Arena"
        description="Book the best cricket ground in Rohtak at Alchemy 360 Sports Arena — professional pitch, floodlit box cricket ground, Sector 22-D Jhajjar Road. Online slot booking available."
        canonical="/cricket-ground-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena features a dedicated, floodlit cricket ground in Rohtak — built for professional-quality play. Located on Jhajjar Road, Sector 22-D, it is the go-to cricket ground in Rohtak for private matches, practice sessions, league games, and tournaments.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Cricket Ground at Alchemy 360 Sports Arena, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our cricket ground in Rohtak is purpose-built for competitive and recreational play. The surface is maintained to professional standards with proper boundary markings, wickets, and equipment. High-intensity LED floodlighting makes evening and night sessions possible, and the enclosed structure keeps the game tight and exciting. Whether you are booking for a casual match with friends, a corporate cricket day, or a serious league fixture — this is Rohtak's best cricket ground.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Professional Pitch', desc: 'Maintained cricket surface with proper crease markings, boundary ropes, and stumps. Suitable for hard-ball and tennis-ball cricket.' },
            { title: 'Floodlit Ground', desc: 'High-intensity LED floodlighting for evening and night cricket sessions. Play after work or school without any compromise on visibility.' },
            { title: 'Online Booking', desc: 'Book your cricket slot in advance through our online system. QR-code-based entry makes access seamless on match day.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Stadium', to: '/cricket-stadium-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
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
