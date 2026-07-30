import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'How far is Alchemy 360 Sports Arena from Delhi?',
    a: 'Alchemy 360 Sports Arena is approximately 70–80 km from central Delhi via NH 9 (Rohtak Road). The drive from West Delhi takes around 60–75 minutes.',
  },
  {
    q: 'Is Alchemy 360 accessible from West Delhi?',
    a: 'Yes. Alchemy 360 Sports Arena is directly accessible from West Delhi via NH 9 (Rohtak Road). From Rajouri Garden or Janakpuri, the drive takes approximately 60 minutes.',
  },
  {
    q: 'Why do Delhi teams book Alchemy 360 for cricket?',
    a: 'Delhi teams choose Alchemy 360 for the professional conditions, open space, affordable pricing, and escape from urban congestion — combined with Haryana\'s cricket culture.',
  },
  {
    q: 'Can Delhi corporate teams organise a cricket day at Alchemy 360?',
    a: 'Yes. Alchemy 360 is a popular corporate cricket destination for Delhi companies seeking a full-day sports outing with professional match conditions and complete amenities.',
  },
  {
    q: 'What is the best route from Delhi to Alchemy 360 Sports Arena?',
    a: 'Take NH 9 (Rohtak Road) from West Delhi towards Rohtak. From the Rohtak bypass, take Jhajjar Road and look for Alchemy 360 Sports Arena at Sector 22-D.',
  },
  {
    q: 'Does Alchemy 360 host Delhi teams in cricket leagues?',
    a: 'Yes. Delhi teams regularly participate in Alchemy 360\'s cricket leagues and tournaments. It serves as a popular neutral venue for Delhi vs Haryana cricket fixtures.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Delhi', path: '/cricket-ground-delhi' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundDelhi() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Delhi | Alchemy 360 Sports Arena Rohtak | Delhi NCR"
        description="Best cricket ground near Delhi — Alchemy 360 Sports Arena Rohtak, 60-75 min from West Delhi via NH 9. Corporate cricket, tournament hosting, professional ground, online booking."
        canonical="/cricket-ground-delhi"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-delhi" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Ground · Near Delhi NCR</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Delhi
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is one of the top cricket ground destinations for Delhi and Delhi NCR teams. Located 70–80 km via NH 9, it's a smooth highway drive from West Delhi to Haryana's best cricket facility — professional conditions, floodlit ground, tournament infrastructure, and significantly more affordable than Delhi rates.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Cricket Ground
            </Link>
            <Link to="/corporate-cricket-events" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Corporate Cricket
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Delhi NCR's Gateway to Premium Cricket in Haryana
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Delhi has cricket in its blood, but premium cricket grounds within the city are expensive, congested, and hard to book. Alchemy 360 Sports Arena in Rohtak offers Delhi teams the escape they need — open space, professional conditions, honest pricing, and the authentic Haryana cricket atmosphere. Many Delhi corporate teams now make Alchemy 360 their default cricket day destination for exactly these reasons.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Direct NH 9 Access', desc: 'NH 9 (Rohtak Road) connects West Delhi directly to Rohtak. The highway drive is smooth and predictable for weekend trips.' },
            { title: 'Haryana Cricket Atmosphere', desc: 'Experience the passion of Haryana cricket culture — serious about the game, welcoming to visiting teams, with full spectator areas.' },
            { title: 'Half the Price, Twice the Experience', desc: 'Alchemy 360 offers professional conditions at a fraction of the cost of comparable Delhi venues. Worth every kilometre.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also Explore</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Corporate Cricket Events', to: '/corporate-cricket-events' },
              { label: 'Cricket Ground Gurgaon', to: '/cricket-ground-gurgaon' },
              { label: 'Cricket Tournaments Rohtak', to: '/cricket-tournaments-rohtak' },
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
