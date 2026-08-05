import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is the best private sports academy in Haryana?',
    a: 'Alchemy 360 in Rohtak is widely regarded as one of Haryana\'s best private multi-sport academies, offering cricket (including the Box 360 circular format), badminton, pickleball, and gymnasium in a single complex.',
  },
  {
    q: 'Which cities in Haryana can access Alchemy 360?',
    a: 'Athletes from Jhajjar (25 km), Bahadurgarh (45 km), Sonipat (55 km), Gurgaon (90 km), Panipat (95 km), and many more Haryana cities regularly train at Alchemy 360 in Rohtak.',
  },
  {
    q: 'Does Alchemy 360 offer coaching for all age groups?',
    a: 'Yes. Alchemy 360 has structured programmes for kids, teenagers, and adults across badminton, pickleball. Separate batches ensure age-appropriate training.',
  },
  {
    q: 'Is Alchemy 360 the only facility with Box 360 cricket in Haryana?',
    a: 'Box 360 at Alchemy 360 is Rohtak\'s first 24/7 circular box cricket ground. This unique format — available round the clock — sets Alchemy 360 apart from any other sports facility in the region.',
  },
  {
    q: 'How do I enroll in a sports academy programme at Alchemy 360 from anywhere in Haryana?',
    a: 'Call +91 93500 76653 or book online. Alchemy 360\'s team will help you choose the right programme and batch timing to fit your commute from anywhere in Haryana.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'State', name: 'Haryana' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' },
    { name: 'Sports Academy Haryana', path: '/sports-academy-haryana' },
  ]),
  faqSchema(faqs),
];

export default function SportsAcademyHaryana() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy in Haryana | Alchemy 360 Rohtak"
        description="Best sports academy in Haryana — Alchemy 360, Rohtak. Serving Jhajjar, Sonipat, Bahadurgarh, Panipat, Gurgaon and beyond. Badminton, pickleball."
        canonical="/sports-academy-haryana"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-haryana" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy in Haryana
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak serves athletes from across Haryana — Jhajjar, Bahadurgarh, Sonipat, Panipat, Gurgaon, and every district in between. One campus, multiple professional sports, expert coaching, and the state's only Box 360 24/7 circular cricket ground. This is Haryana's go-to private sports academy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore All Sports
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Haryana's Premier Private Multi-Sport Academy
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Haryana breeds champions — and Alchemy 360 in Rohtak is where many of them train. Athletes from Jhajjar drive 25 minutes, those from Bahadurgarh take 40 minutes, and families from Sonipat and Panipat travel over an hour, all because the quality at Alchemy 360 is simply not available closer to home. The Box 360 circular cricket ground is open 24 hours, 7 days a week — the first of its kind in Rohtak and unique across Haryana. professional badminton and pickleball courts, and a full gymnasium make Alchemy 360 a complete sporting destination. Add professional coaching staff and structured academy programmes for kids, teens, and adults, and the drive from anywhere in Haryana becomes an easy decision.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Haryana-Wide Catchment', desc: 'Athletes travel from Jhajjar, Bahadurgarh, Sonipat, Panipat, Gurgaon, and beyond. Rohtak\'s central location in Haryana makes Alchemy 360 accessible from all directions.' },
            { title: 'Best Sports Academy Rohtak', desc: 'Alchemy 360 has earned its reputation as Rohtak\'s top sports academy through results — competitive cricketers, strong swimmers, and skilled badminton players trained here.' },
            { title: 'Compete, Train + Restaurant', desc: 'From academy enrollment to tournament play in the Rohtak Cricket League, Alchemy 360 is a full sports ecosystem. Stay for a meal at the on-site restaurant after your session.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
              { label: 'Best Sports Academy Rohtak', to: '/best-sports-academy-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
