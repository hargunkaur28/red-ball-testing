import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a professional badminton court near Hisar?',
    a: 'Alchemy 360 Sports Arena in Rohtak is one of the best badminton venues accessible from Hisar — approximately 100 km and 100 minutes away, offering professional courts and a full sports facility.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Hisar?',
    a: 'Alchemy 360 is about 100 km from Hisar city, accessible via NH-9 towards Rohtak. The drive typically takes around 90–100 minutes on this well-maintained national highway.',
  },
  {
    q: 'Can Hisar players book badminton courts at Alchemy 360 in advance?',
    a: 'Yes. Online booking at Alchemy 360 is quick and reliable — Hisar players can reserve a specific slot before setting out, so your court is guaranteed on arrival.',
  },
  {
    q: 'What sports can I play at Alchemy 360 besides badminton?',
    a: "Alchemy 360 offers cricket on Box 360 (Rohtak's first 24/7 circular box cricket facility), open-air swimming pool, gymnasium, and pickleball courts — making it a worthwhile day trip from Hisar.",
  },
  {
    q: 'Does Alchemy 360 have a sports academy for players from Hisar?',
    a: 'Yes. Alchemy 360 Sports Arena runs a sports academy with coaching in cricket, badminton, and swimming. Players from Hisar interested in regular training can enquire about academy memberships.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Hisar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Hisar', path: '/badminton-court-hisar' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtHisar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Hisar | Alchemy 360 Sports Arena Rohtak"
        description="Professional badminton court near Hisar — Alchemy 360 Sports Arena, Rohtak, 100 km / 100 min away. Book online, full sports complex with cricket, swimming & gym."
        canonical="/badminton-court-hisar"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-hisar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Hisar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Hisar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 100 km and about 100 minutes from Hisar via NH-9 — a highway drive that drops you into Haryana's most fully-equipped sports complex. For Hisar badminton players who want professional courts and a facility worth the trip, Alchemy 360 is the destination.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Badminton Court
            </Link>
            <Link to="/badminton-court-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Court Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Hisar's Best Badminton Option is in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Hisar players with a competitive or enthusiastic approach to badminton consistently point to Alchemy 360 Sports Arena in Rohtak as the facility that justifies the highway drive. The courts are properly set up, the facility is clean and well-staffed, and the supporting amenities — including a gym, open-air pool, Box 360 cricket, and a restaurant — mean your day at Alchemy 360 is never just about one sport. Groups from Hisar planning a sports day often find Alchemy 360 the ideal destination.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'NH-9 Direct from Hisar', desc: 'Hisar to Rohtak on NH-9 is a smooth national highway route. Plan your drive for an early start and you\'ll be on court within 100 minutes.' },
            { title: 'Full Sports Complex', desc: 'Beyond badminton, explore Box 360 cricket, open-air swimming, and a well-equipped gym — all available on the same visit from Hisar.' },
            { title: 'Eat On-Site', desc: "Alchemy 360's restaurant means Hisar visitors can refuel without searching for food in an unfamiliar part of Rohtak. Convenient and good." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
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
