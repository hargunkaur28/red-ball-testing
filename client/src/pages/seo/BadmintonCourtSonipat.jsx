import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good badminton court near Sonipat?',
    a: 'Alchemy 360 in Rohtak is one of the best badminton facilities accessible from Sonipat — about 55 km and 55 minutes away, with professional courts and easy online booking.',
  },
  {
    q: 'How long does it take to reach Alchemy 360 from Sonipat?',
    a: 'The drive from Sonipat to Alchemy 360 in Rohtak takes approximately 55 minutes via NH-334B. The route is well-connected and straightforward.',
  },
  {
    q: 'Can Sonipat players book badminton courts in advance at Alchemy 360?',
    a: 'Yes. Alchemy 360\'s online booking system lets you reserve a specific court slot and pay digitally before you leave Sonipat — so your court is guaranteed when you arrive.',
  },
  {
    q: 'Does Alchemy 360 offer badminton memberships for out-of-city players?',
    a: 'Yes. Alchemy 360 offers membership plans that are suitable for players from Sonipat who visit on a regular weekly or fortnightly basis. Memberships offer better rates than one-time bookings.',
  },
  {
    q: 'What else can Sonipat visitors do at Alchemy 360 besides badminton?',
    a: "Sonipat visitors often combine badminton with other facilities at Alchemy 360 — the gymnasium and pickleball courts make it a full day out.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Sonipat', path: '/badminton-court-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Sonipat | Alchemy 360 Rohtak"
        description="Professional badminton court near Sonipat — Alchemy 360, Rohtak, 55 km / 55 min away. Book online, play on pro courts, dine at the on-site restaurant."
        canonical="/badminton-court-sonipat"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For badminton players in Sonipat seeking a professional venue, Alchemy 360 in Rohtak is the answer — 55 km and roughly 55 minutes away via NH-334B. The facility delivers the kind of courts, lighting, and atmosphere that make the journey from Sonipat completely worthwhile.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/badminton" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Worth the Drive from Sonipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat players looking for serious badminton infrastructure often find that Alchemy 360 in Rohtak fills the gap. The courts are professionally lit and maintained, the booking process is entirely online, and the wider facility — with its gym and pickleball courts — means a trip to Alchemy 360 rarely feels like just one sport. Groups from Sonipat regularly book multiple courts for club sessions on weekends.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min on NH-334B', desc: 'Clear highway from Sonipat to Rohtak. Alchemy 360 is near Omaxe, Sector 22-D — easy to find, good parking on arrival.' },
            { title: 'Club-Grade Courts', desc: 'Multiple badminton courts available, suitable for competitive play, coaching drills, and back-to-back group sessions from Sonipat clubs.' },
            { title: 'Dine After You Play', desc: "No need to plan where to eat after the drive — Alchemy 360's on-site restaurant has you covered before your journey back to Sonipat." },
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
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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

      <CTAStrip sport="badminton" />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
