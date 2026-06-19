import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports academy near Jhajjar?',
    a: 'Yes. Red Ball Sports Arena in Rohtak is the nearest multi-sport academy to Jhajjar — only 25 km and about 25 minutes away on Jhajjar Road, Sector 22-D.',
  },
  {
    q: 'What sports can I train in at Red Ball if I am from Jhajjar?',
    a: 'Red Ball offers professional coaching in cricket (including Box 360 circular format), badminton, pickleball, and swimming. All facilities are available for Jhajjar-based students.',
  },
  {
    q: 'Is the drive from Jhajjar to Red Ball Sports Arena convenient?',
    a: 'Very convenient. Red Ball is located directly on Jhajjar Road in Rohtak — the same road that connects Jhajjar to Rohtak, so you barely need to deviate from your route.',
  },
  {
    q: 'Does Red Ball Sports Academy offer memberships for Jhajjar students?',
    a: 'Yes. Monthly and annual memberships are available that cover coaching, facility access, and practice slots. Jhajjar students and families can contact us at +91 93500 76653 to enrol.',
  },
  {
    q: 'Are there facilities for kids from Jhajjar at Red Ball?',
    a: 'Yes. Red Ball has a dedicated Kids Sports Academy programme covering cricket, badminton, and swimming — ideal for children aged 6 and above travelling from Jhajjar.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' },
    { name: 'Sports Academy Jhajjar', path: '/sports-academy-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function SportsAcademyJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy Near Jhajjar | Red Ball Sports Arena Rohtak"
        description="Nearest sports academy to Jhajjar — Red Ball Sports Arena in Rohtak, just 25 km and 25 minutes away. Cricket, badminton, pickleball, swimming coaching. Enrol today."
        canonical="/sports-academy-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is the closest professional sports academy to Jhajjar — just 25 km away, roughly a 25-minute drive on Jhajjar Road. With facilities covering cricket, badminton, pickleball, and swimming, the short commute is more than worth it for serious athletes and young learners alike.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Academy Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Jhajjar's Nearest Multi-Sport Academy
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Jhajjar lacks a full-scale multi-sport academy with professional coaching infrastructure. Red Ball Sports Arena in Rohtak fills that gap perfectly. Situated on Jhajjar Road — the very road connecting Jhajjar to Rohtak — Red Ball is effectively on your doorstep. Students from Jhajjar district train here daily for cricket at the iconic Box 360 circular ground, badminton on indoor courts, and swimming in the open-air pool. Professional coaches, proper equipment, and structured programmes make Red Ball the academy of choice for Jhajjar families who take sport seriously.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '25 Min from Jhajjar', desc: 'Red Ball sits directly on Jhajjar Road in Rohtak — approximately 25 km from Jhajjar city. The route is straightforward with no complex navigation required.' },
            { title: 'All Major Sports Under One Roof', desc: 'Cricket (Box 360 circular format), badminton, pickleball, swimming, and gymnasium — all accessible with a single Red Ball membership.' },
            { title: 'Coaching + Restaurant', desc: 'Professional certified coaches run structured batch programmes. After training, players and families can relax and refuel at Red Ball\'s on-site restaurant.' },
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
