import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good badminton court near Sonipat?',
    a: 'Red Ball Sports Arena in Rohtak is one of the best badminton facilities accessible from Sonipat — about 55 km and 55 minutes away, with professional courts and easy online booking.',
  },
  {
    q: 'How long does it take to reach Red Ball from Sonipat?',
    a: 'The drive from Sonipat to Red Ball Sports Arena in Rohtak takes approximately 55 minutes via NH-334B. The route is well-connected and straightforward.',
  },
  {
    q: 'Can Sonipat players book badminton courts in advance at Red Ball?',
    a: 'Yes. Red Ball\'s online booking system lets you reserve a specific court slot and pay digitally before you leave Sonipat — so your court is guaranteed when you arrive.',
  },
  {
    q: 'Does Red Ball offer badminton memberships for out-of-city players?',
    a: 'Yes. Red Ball offers membership plans that are suitable for players from Sonipat who visit on a regular weekly or fortnightly basis. Memberships offer better rates than one-time bookings.',
  },
  {
    q: 'What else can Sonipat visitors do at Red Ball besides badminton?',
    a: "Sonipat visitors often combine badminton with other facilities at Red Ball — the open-air swimming pool, the gymnasium, Box 360 box cricket, and the on-site restaurant make it a full day out.",
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
        title="Badminton Court Near Sonipat | Red Ball Sports Arena Rohtak"
        description="Professional badminton court near Sonipat — Red Ball Sports Arena, Rohtak, 55 km / 55 min away. Book online, play on pro courts, dine at the on-site restaurant."
        canonical="/badminton-court-sonipat"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For badminton players in Sonipat seeking a professional venue, Red Ball Sports Arena in Rohtak is the answer — 55 km and roughly 55 minutes away via NH-334B. The facility delivers the kind of courts, lighting, and atmosphere that make the journey from Sonipat completely worthwhile.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Sonipat players looking for serious badminton infrastructure often find that Red Ball Sports Arena in Rohtak fills the gap. The courts are professionally lit and maintained, the booking process is entirely online, and the wider facility — with its swimming pool, gym, and Box 360 cricket — means a trip to Red Ball rarely feels like just one sport. Groups from Sonipat regularly book multiple courts for club sessions on weekends.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min on NH-334B', desc: 'Clear highway from Sonipat to Rohtak. Red Ball is near Omaxe, Sector 22-D — easy to find, good parking on arrival.' },
            { title: 'Club-Grade Courts', desc: 'Multiple badminton courts available, suitable for competitive play, coaching drills, and back-to-back group sessions from Sonipat clubs.' },
            { title: 'Dine After You Play', desc: "No need to plan where to eat after the drive — Red Ball's on-site restaurant has you covered before your journey back to Sonipat." },
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
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
              { label: 'Cricket Ground Sonipat', to: '/cricket-ground-sonipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
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
