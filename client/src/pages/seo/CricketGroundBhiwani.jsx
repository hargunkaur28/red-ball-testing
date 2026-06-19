import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a cricket ground near Bhiwani?',
    a: 'Red Ball Sports Arena in Rohtak is the nearest professional cricket ground to Bhiwani — approximately 70 km away, around 65 minutes by road. The facility includes both an open cricket ground and Box 360 circular box cricket.',
  },
  {
    q: 'How far is Red Ball Sports Arena from Bhiwani?',
    a: 'Red Ball is around 70 km from Bhiwani, at Sector 22-D, Jhajjar Road, Rohtak. The drive is approximately 65 minutes.',
  },
  {
    q: 'Can Bhiwani cricket clubs book the ground for practice sessions?',
    a: 'Yes. Practice sessions, matches, and tournaments can be booked at Red Ball Sports Arena. Online booking is available, and advance group bookings for clubs and teams can be arranged by calling +91 93500 76653.',
  },
  {
    q: 'Does Red Ball have a cricket academy near Bhiwani?',
    a: 'Red Ball Cricket Academy in Rohtak is the closest professional cricket coaching facility to Bhiwani. Coaching programs are available for youth players and adults.',
  },
  {
    q: 'What makes Red Ball better than local grounds near Bhiwani?',
    a: 'Red Ball offers floodlit pitches, a 24/7 box cricket ground (Box 360), professionally maintained surfaces, online booking, and a full sports complex with swimming, badminton, and a gym — not available at local grounds near Bhiwani.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
    areaServed: [
      { '@type': 'City', name: 'Bhiwani' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Cricket Ground Haryana', path: '/cricket-ground-haryana' },
    { name: 'Cricket Ground Near Bhiwani', path: '/cricket-ground-bhiwani' },
  ]),
  faqSchema(faqs),
];

export default function CricketGroundBhiwani() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Ground Near Bhiwani | Red Ball Sports Arena Rohtak"
        description="Cricket ground near Bhiwani — Red Ball Sports Arena in Rohtak, ~70 km, ~65 min drive. Professional ground, Box 360 24/7 box cricket, online booking available."
        canonical="/cricket-ground-bhiwani"
        schema={schema}
      />

      <SportsNav activePath="/cricket-ground-bhiwani" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket · Near Bhiwani</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Ground Near Bhiwani
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena in Rohtak is approximately 70 km from Bhiwani — around 65 minutes by road. For Bhiwani cricketers wanting professional pitch conditions, the Box 360 24/7 circular box cricket experience, and easy online booking, Red Ball in Rohtak is the most accessible quality destination in the region.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Bhiwani's Nearest Professional Cricket Facility
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bhiwani has produced some of Haryana's finest athletes — and its cricket players deserve proper training infrastructure. Red Ball Sports Arena in Rohtak, at Sector 22-D, Jhajjar Road, offers precisely that. A 65-minute drive on a clear road brings Bhiwani teams to maintained pitches, floodlit evening sessions, and Box 360 — Rohtak's first 24/7 circular box cricket ground that operates around the clock. The multi-sport complex means Bhiwani visitors can pair cricket with a gym session or a swim and make a proper day of it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '65 Min from Bhiwani', desc: 'A clear 70 km drive on the Bhiwani–Rohtak route brings your team to Red Ball — the closest professional cricket facility to Bhiwani district.' },
            { title: 'Maintained Pitches + Floodlights', desc: 'Professionally maintained pitch surfaces with clear boundary markings and floodlighting for evening sessions — conditions that Bhiwani local grounds simply cannot match.' },
            { title: 'Cricket, Then a Meal', desc: "Red Ball's on-site restaurant is ready for Bhiwani teams after the match. Eat together on-site and save the long drive home for after you've refuelled properly." },
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
              { label: 'Cricket Ground Rohtak', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Ground Haryana', to: '/cricket-ground-haryana' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Box Cricket Rohtak', to: '/box-cricket-rohtak' },
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
