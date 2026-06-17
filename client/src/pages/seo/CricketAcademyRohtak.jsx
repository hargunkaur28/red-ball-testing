import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Red Ball have a cricket academy in Rohtak?',
    a: 'Yes. Red Ball Academy offers cricket coaching on its box cricket ground in Rohtak. Coaching is available for all age groups including a structured kids cricket program.',
  },
  {
    q: 'What is box cricket and how is it different from regular cricket?',
    a: 'Box cricket is a compact version of cricket played in an enclosed space with modified rules. It is fast-paced, great for practice, and can be played with smaller teams. Red Ball Sports Arena has a dedicated box cricket ground in Rohtak.',
  },
  {
    q: 'Can I book the cricket ground for a private match?',
    a: 'Yes. You can book the box cricket ground for private matches, corporate tournaments, birthday parties, or friendly games through our online slot booking system.',
  },
  {
    q: 'What is the cost of booking the cricket ground?',
    a: 'Pricing varies by slot duration and time of day. Check current rates on our Book Slots page. Membership plans offer discounted per-session rates.',
  },
  {
    q: 'Is coaching available for kids at the cricket academy?',
    a: 'Yes. Our kids cricket academy offers structured coaching for children aged 6 and above, with age-appropriate drills and training.',
  },
  {
    q: 'Is the cricket ground available for early morning sessions?',
    a: 'Yes. The facility opens at 5:00 AM daily, making early morning cricket sessions possible before school or work.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
  },
  breadcrumbSchema([
    { name: 'Sports Academy', path: '/sports-academy-rohtak' },
    { name: 'Cricket Academy Rohtak', path: '/cricket-academy-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Academy in Rohtak | Box Cricket Ground | Red Ball"
        description="Red Ball Cricket Academy in Rohtak, Haryana — professional coaching, box cricket ground booking, kids cricket programs. Book your cricket session online today."
        canonical="/cricket-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-academy-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Cricket Academy in Rohtak offers professional-grade box cricket facilities and expert coaching. Whether you want to practice your game, book the ground for a match, or enrol your child — we've got you covered.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Slot
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Cricket at Red Ball Sports Arena, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our box cricket ground is purpose-built for exciting, fast-paced cricket. With a professional pitch, floodlighting for night sessions, and proper equipment, it's the ideal venue for both training and match play in Rohtak, Haryana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box Cricket Ground', desc: 'Covered, floodlit ground with professional surface for matches and practice sessions.' },
            { title: 'Coaching Sessions', desc: 'Batting, bowling, and fielding drills with experienced cricket coaches.' },
            { title: "Kids' Cricket Academy", desc: 'Age-appropriate cricket coaching for children 6 years and above.' },
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
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
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
