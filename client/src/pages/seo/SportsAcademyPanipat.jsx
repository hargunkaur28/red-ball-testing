import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a multi-sport academy near Panipat?',
    a: 'Red Ball Sports Arena in Rohtak is the closest comprehensive multi-sport academy to Panipat — around 95 km and 90 minutes away, offering cricket, badminton, pickleball, and swimming.',
  },
  {
    q: 'How long is the drive from Panipat to Red Ball Sports Arena?',
    a: 'The drive from Panipat to Red Ball Sports Arena in Rohtak takes approximately 90 minutes, covering about 95 km via the Panipat–Rohtak highway route.',
  },
  {
    q: 'Is Red Ball Sports Arena worth travelling to from Panipat?',
    a: 'For serious athletes and families committed to professional sports development, yes. Red Ball offers facilities and coaching — including Rohtak\'s only Box 360 24/7 circular cricket ground — that are not available locally in Panipat.',
  },
  {
    q: 'Can my child join the cricket academy at Red Ball from Panipat?',
    a: 'Yes. Red Ball\'s cricket academy runs structured batch programmes. Families from Panipat typically visit on weekends or plan a weekly schedule. Call +91 93500 76653 for details.',
  },
  {
    q: 'Are there weekend sports programmes for Panipat visitors?',
    a: 'Yes. Weekend batches and flexible slot bookings are available across all sports. Panipat families often combine multiple sports in a single visit to make the most of the journey.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' },
    { name: 'Sports Academy Panipat', path: '/sports-academy-panipat' },
  ]),
  faqSchema(faqs),
];

export default function SportsAcademyPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy Near Panipat | Red Ball Sports Arena Rohtak"
        description="Professional sports academy near Panipat — Red Ball Sports Arena Rohtak, 95 km / 90 minutes. Cricket, badminton, swimming, pickleball coaching. Weekend batches available."
        canonical="/sports-academy-panipat"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is 95 km from Panipat — about 90 minutes on the road. For athletes serious about their game, that 90 minutes unlocks access to Haryana's most comprehensive private sports complex: cricket, badminton, pickleball, swimming, gym, and an on-site restaurant. Panipat athletes make this trip, and they don't regret it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              See All Programmes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          The Nearest Serious Sports Academy for Panipat Athletes
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Panipat has a proud sporting heritage, but a fully-equipped private multi-sport complex with professional coaching across cricket, aquatics, and racket sports remains rare in the region. Red Ball Sports Arena in Rohtak — on Jhajjar Road, Sector 22-D — is 90 minutes away and worth every minute. The Box 360 circular cricket ground is open 24/7 and is the first of its kind in Rohtak. Swimming batches run in the open-air pool, badminton and pickleball courts are kept to professional standards, and the in-house coaching team develops athletes for competitions and recreational fitness alike. Panipat families that visit once tend to come back regularly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Weekend Visit = Full Day of Sport', desc: 'Panipat families combine multiple sports in one visit — cricket in the morning, badminton in the afternoon, and a swim — making the 90-minute drive highly efficient.' },
            { title: 'Box 360 Circular Cricket', desc: 'Train on Rohtak\'s first 24/7 Box 360 circular cricket ground — an experience unavailable anywhere near Panipat. The circular format sharpens fielding and batting skills uniquely.' },
            { title: 'Dine In After Sport + Restaurant', desc: 'Recover and celebrate after a great session at Red Ball\'s on-site restaurant — a welcome option after the long drive from Panipat.' },
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
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
              { label: 'Kids Sports Academy Rohtak', to: '/kids-sports-academy-rohtak' },
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
