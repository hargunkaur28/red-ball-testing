import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Panipat?',
    a: 'Alchemy 360 in Rohtak is one of the best multi-sport complexes accessible from Panipat — approximately 95 km and 90 minutes away. Badminton, pickleball, a gym, and a restaurant are all available.',
  },
  {
    q: 'How far is Alchemy 360 from Panipat?',
    a: 'Alchemy 360 is around 95 km from Panipat, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 90 minutes.',
  },
  {
    q: 'What unique sports does Alchemy 360 have that Panipat teams will find interesting?',
    a: "Alchemy 360 hosts dedicated pickleball courts and professional badminton courts, both unusual features that attract players from as far as Panipat.",
  },
  {
    q: 'Can Panipat corporate teams plan a full sports day at Alchemy 360?',
    a: 'Yes. Corporate sports days with multiple sports, catering from the on-site restaurant, and team activities can be planned at Alchemy 360. Call +91 93500 76653 to discuss your requirements.',
  },
  {
    q: 'Does Alchemy 360 have a gym that Panipat fitness enthusiasts can use?',
    a: 'Yes. The gym at Alchemy 360 is fully equipped with free weights, resistance machines, and cardio equipment. Day passes are available for visitors from Panipat and other cities.',
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
        title="Sports Complex Near Panipat | Alchemy 360 Rohtak"
        description="Sports complex near Panipat — Alchemy 360 in Rohtak, ~95 km, ~90 min drive. Badminton, pickleball and gym."
        canonical="/sports-complex-panipat"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is approximately 95 km from Panipat — about 90 minutes by road. For Panipat teams and individuals planning a dedicated sports day, Alchemy 360 is the most complete facility available within that range — with badminton, pickleball, a gym, and dining all in one complex.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Panipat has growing demand for high-quality sports facilities, and Alchemy 360 in Rohtak meets that demand at a scale that justifies the drive. Located at Sector 22-D, Jhajjar Road, Rohtak, the complex brings together five sports disciplines, a full gym, and a restaurant — under one roof. Panipat corporate teams use Alchemy 360 for full-day sports events, while individuals come for a badminton session or a serious gym workout.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Dedicated Pickleball', desc: "Panipat players make the 90-minute trip specifically for these courts — among the very few dedicated pickleball courts in the region." },
            { title: 'Eat and Recharge', desc: "Alchemy 360's on-site restaurant means Panipat groups don't have to rush — finish your sessions, eat a proper meal on-site, and drive back fed and satisfied." },
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
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
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
