import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Jind?',
    a: 'Red Ball Sports Arena in Rohtak is the nearest professional cricket facility to Jind — approximately 75 km away, around 70 minutes by road. It offers an open cricket ground and Box 360, a 24/7 circular box cricket ground.',
  },
  {
    q: 'How far is Red Ball Sports Arena from Jind?',
    a: 'Red Ball is around 75 km from Jind city, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 70 minutes.',
  },
  {
    q: 'Can Jind teams participate in cricket tournaments at Red Ball?',
    a: 'Yes. Red Ball Sports Arena hosts cricket tournaments including inter-city and corporate competitions that Jind teams are welcome to enter. Contact +91 93500 76653 for upcoming tournament schedules.',
  },
  {
    q: 'What is the difference between Box 360 and regular cricket at Red Ball?',
    a: "Box 360 is Rohtak's first 24/7 circular box cricket ground — a contained format with 360-degree play, perfect for quick matches and team practice. The open ground is for traditional format cricket including full-pitch matches.",
  },
  {
    q: 'Does Red Ball have coaching for Jind players who want to improve?',
    a: 'Yes. Red Ball Cricket Academy offers coaching for youth and adult players. Jind players can enrol in coaching programs or book net practice sessions. Call +91 93500 76653 for details.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Jind' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Near Jind', path: '/cricket-ground-jind' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundJind() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Jind | Red Ball Sports Arena Rohtak"
        description="Cricket ground near Jind — Red Ball Sports Arena in Rohtak, ~75 km, ~70 min drive. Open ground + Box 360 24/7 circular box cricket. Online booking, coaching available."
        canonical="/cricket-ground-jind"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-jind" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Near Jind</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Jind
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is approximately 75 km from Jind — around 70 minutes by road. Jind cricket teams looking for professional ground conditions and the unique Box 360 circular box cricket experience will find Red Ball the most worthwhile destination in the region — with coaching, tournaments, and multi-sport facilities all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/cricket-ground-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Ground Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Jind Cricketers — Your Best Ground Is in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Jind's cricketing tradition runs deep — the district has produced talented players who deserve serious training and match infrastructure. Red Ball Sports Arena in Rohtak, at Sector 22-D, Jhajjar Road, is 70 minutes away and offers conditions far beyond what's available locally. Two cricket formats: traditional open ground for full-format cricket, and Box 360 — Rohtak's first 24/7 circular box cricket ground — for the quick, intense box cricket format that's increasingly popular across Haryana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Two Cricket Formats', desc: 'Open ground for traditional cricket, and Box 360 for circular box cricket — Jind teams get both options at Red Ball, depending on the match format they want.' },
            { title: 'Join the Tournament Circuit', desc: 'Red Ball hosts cricket tournaments drawing teams from across Haryana, including Jind. Entering as a Jind team means competing against quality opposition in a professional setting.' },
            { title: 'Eat at the Arena', desc: "Red Ball's on-site restaurant means Jind teams can have a post-match meal on-site. No need to rush out hungry after a long day of cricket — it's all right here." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Cricket Tournaments Rohtak', to: '/cricket-tournaments-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
