import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Panipat?',
    a: 'Red Ball Sports Arena in Rohtak is one of the best multi-sport complexes accessible from Panipat — approximately 95 km and 90 minutes away. Cricket, badminton, pickleball, swimming, a gym, and a restaurant are all available.',
  },
  {
    q: 'How far is Red Ball from Panipat?',
    a: 'Red Ball Sports Arena is around 95 km from Panipat, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 90 minutes.',
  },
  {
    q: 'What unique sports does Red Ball have that Panipat teams will find interesting?',
    a: "Red Ball hosts Box 360 — Rohtak's first 24/7 circular box cricket ground — and pickleball courts, both of which are unusual features that attract teams from as far as Panipat for unique sports experiences.",
  },
  {
    q: 'Can Panipat corporate teams plan a full sports day at Red Ball?',
    a: 'Yes. Corporate sports days with multiple sports, catering from the on-site restaurant, and team activities can be planned at Red Ball. Call +91 93500 76653 to discuss your requirements.',
  },
  {
    q: 'Does Red Ball have a gym that Panipat fitness enthusiasts can use?',
    a: 'Yes. The gym at Red Ball is fully equipped with free weights, resistance machines, and cardio equipment. Day passes are available for visitors from Panipat and other cities.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Panipat', path: '/sports-complex-panipat' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Panipat | Red Ball Sports Arena Rohtak"
        description="Sports complex near Panipat — Red Ball Sports Arena in Rohtak, ~95 km, ~90 min drive. Cricket (Box 360), badminton, pickleball, swimming, gym & restaurant."
        canonical="/sports-complex-panipat"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is approximately 95 km from Panipat — about 90 minutes by road. For Panipat teams and individuals planning a dedicated sports day, Red Ball is the most complete facility available within that range — with cricket, swimming, badminton, pickleball, a gym, and dining all in one complex.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore Facilities
            </Link>
            <Link to="/sports-complex-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Full Complex Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          A Sports Complex Worth the 90-Minute Drive from Panipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Panipat has growing demand for high-quality sports facilities, and Red Ball Sports Arena in Rohtak meets that demand at a scale that justifies the drive. Located at Sector 22-D, Jhajjar Road, Rohtak, the complex brings together five sports disciplines, a full gym, an open-air swimming pool, and a restaurant — under one roof. Panipat corporate teams use Red Ball for full-day sports events, while individuals come for the Box 360 box cricket experience or a serious gym session combined with a swim.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Box 360 — Unique Experience', desc: "Rohtak's first 24/7 circular box cricket ground. Panipat cricket fans make the 90-minute trip specifically for this — a format and format not available anywhere else in the region." },
            { title: 'Gym + Pool Combo', desc: 'Strength training in the fully equipped gym followed by laps in the open-air swimming pool — a sports day combination that Panipat visitors plan dedicated trips around.' },
            { title: 'Eat and Recharge', desc: "Red Ball's on-site restaurant means Panipat groups don't have to rush — finish your sessions, eat a proper meal on-site, and drive back fed and satisfied." },
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
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Cricket Ground Panipat', to: '/cricket-ground-panipat' },
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
              { label: 'Football Ground Panipat', to: '/football-ground-panipat' },
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
