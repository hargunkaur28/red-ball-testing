import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Karnal?',
    a: 'Alchemy 360 Sports Arena in Rohtak is approximately 120 km from Karnal — around 2 hours by road. For Karnal teams planning a dedicated cricket day, Alchemy 360 offers professional ground conditions, Box 360 box cricket, and a full multi-sport complex.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Karnal?',
    a: 'Alchemy 360 is around 120 km from Karnal, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 2 hours.',
  },
  {
    q: 'Is the drive from Karnal to Alchemy 360 worth it?',
    a: 'For a full cricket day — yes. Alchemy 360 offers Box 360 (a 24/7 circular box cricket format unique to Rohtak), a professional open ground, multi-sport access, and an on-site restaurant. Karnal teams come for a full-day experience, not just a match.',
  },
  {
    q: 'Can Karnal players join cricket coaching at Alchemy 360?',
    a: 'Yes. Alchemy 360 Cricket Academy offers professional coaching for youth and adult players. Karnal players visiting Rohtak can join coaching sessions or book net practice. Call +91 93500 76653 to enquire.',
  },
  {
    q: 'Does Alchemy 360 have facilities for Karnal teams to freshen up after a long drive?',
    a: 'Yes. Changing rooms are available at Alchemy 360 Sports Arena. The on-site restaurant is also available so Karnal teams can eat before starting their session after the 2-hour drive.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Karnal' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Near Karnal', path: '/cricket-ground-karnal' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundKarnal() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Karnal | Alchemy 360 Sports Arena Rohtak"
        description="Cricket ground near Karnal — Alchemy 360 Sports Arena in Rohtak, ~120 km, ~2 hrs drive. Box 360 24/7 circular box cricket, professional open ground, cricket academy, restaurant."
        canonical="/cricket-ground-karnal"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-karnal" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Near Karnal</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Karnal
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is approximately 120 km from Karnal — around 2 hours by road. For Karnal cricket teams that want a full-day sports destination with professional ground conditions, a 24/7 box cricket option, cricket coaching, and on-site dining, the 2-hour drive to Rohtak is a trip worth planning.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Plan a Full Cricket Day — Karnal to Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          At 120 km, Karnal is the furthest city from Alchemy 360 Sports Arena in Rohtak — but Karnal teams come because the destination justifies the distance. Located at Sector 22-D, Jhajjar Road, Rohtak, Alchemy 360 is not just a ground — it's a full cricket campus. Two formats under one roof: a traditional open ground for proper cricket, and Box 360, Rohtak's first 24/7 circular box cricket ground that operates round the clock. Add the Cricket Academy, the multi-sport complex, and an on-site restaurant, and a Karnal team can make a full day of it with ease.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Full Cricket Campus', desc: 'Open ground for traditional formats + Box 360 for circular box cricket — Karnal teams get two cricket experiences in one visit, justifying the 2-hour drive from Karnal.' },
            { title: 'Cricket Academy Access', desc: 'Alchemy 360 Cricket Academy offers coaching sessions that Karnal players can book during their visit — net practice, technical coaching, or a structured session with academy coaches.' },
            { title: 'Eat Before You Leave', desc: "Alchemy 360's on-site restaurant is essential for Karnal teams with a 2-hour drive home. Have a proper meal after your match — on-site, no detours, no highway dhabas." },
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
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
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
