import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Red Ball Sports Arena have a football ground?',
    a: 'Yes. Red Ball Sports Arena has a football ground suitable for 5-a-side, 7-a-side, and 11-a-side football, available for booking for matches, training sessions, and events.',
  },
  {
    q: 'Can I book the football ground for a private match?',
    a: 'Yes. The football ground can be booked for private matches, corporate tournaments, school team practice, and casual group games through the online booking system.',
  },
  {
    q: 'Is the football ground available for training?',
    a: 'Yes. Individual players, school teams, and corporate groups can book the football ground for training sessions and practice matches.',
  },
  {
    q: 'Are there football coaching programs at Red Ball?',
    a: 'Football coaching programs are available seasonally. Contact Red Ball at +91 93500 76653 for current football coaching availability.',
  },
  {
    q: 'Can I book multiple sports facilities for a sports day?',
    a: 'Yes. Multi-sport sports days can be arranged at Red Ball combining football, cricket, badminton, and other facilities. Contact us for multi-facility event bookings.',
  },
  {
    q: 'What are the charges for booking the football ground?',
    a: 'Football ground booking charges vary by session length and time of day. Check current rates on the Book Slots page or call +91 93500 76653.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Football',
  },
  breadcrumbSchema([
    { name: 'Sports Complex', path: '/sports-complex-rohtak' },
    { name: 'Football Ground Rohtak', path: '/football-ground-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function FootballGroundRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Football Ground in Rohtak | Book Football Turf | Red Ball Sports Arena"
        description="Book a football ground in Rohtak at Red Ball Sports Arena — maintained field, 5-a-side to 11-a-side, corporate football events, online booking available."
        canonical="/football-ground-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/football-ground-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Football · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Football Ground in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena includes a football ground in Rohtak — a well-maintained field suitable for 5-a-side, 7-a-side, and full-format football. Available for casual games, football training sessions, corporate football tournaments, and school and college team practices.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Football Ground
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Get Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Football at Red Ball Sports Arena, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Football at Red Ball Sports Arena adds another dimension to Rohtak's sports scene. The football ground is maintained with proper line markings, goal posts, and adequate space for full-team play. Combined with the arena's other facilities — cricket, badminton, swimming — it makes Red Ball the most complete sports complex in Rohtak for teams and individuals looking for comprehensive sport access.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Match Ground', desc: 'Maintained football ground with proper line markings, goal posts, and space for 5-a-side to full 11-a-side football.' },
            { title: 'Corporate Football', desc: 'Book the ground for corporate sports days, inter-department tournaments, and team-building football events in Rohtak.' },
            { title: 'Training Sessions', desc: 'Book the ground for football training sessions, practice matches, and conditioning drills for school and college teams.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground', to: '/cricket-ground-rohtak' },
              { label: 'Sports Complex', to: '/sports-complex-rohtak' },
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
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
