import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a badminton court near Gurgaon worth visiting in Rohtak?',
    a: 'Yes. Alchemy 360 in Rohtak is a professional badminton facility about 90 km and 90 minutes from Gurgaon (Gurugram). Players from Gurgaon looking for a day trip with great sports infrastructure make this journey regularly.',
  },
  {
    q: 'How do I get from Gurgaon to Alchemy 360 in Rohtak?',
    a: 'From Gurgaon, take NH-48 towards Delhi then NH-148B or NH-352 towards Rohtak. Alchemy 360 is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — about a 90-minute drive.',
  },
  {
    q: 'Why would a Gurgaon badminton player travel to Rohtak?',
    a: 'Alchemy 360 offers a full sports complex experience — professional courts, gym, pickleball, and a restaurant — in a quieter, less congested setting than Gurgaon. Many players come for the atmosphere and value.',
  },
  {
    q: 'Can I book a badminton court at Alchemy 360 from Gurgaon online?',
    a: 'Yes. Booking is fully online and available in advance. Gurgaon players can lock in a specific time slot before making the trip, ensuring no wasted journey.',
  },
  {
    q: 'Are there membership options that suit Gurgaon-based players who visit occasionally?',
    a: 'Alchemy 360 offers both one-time slot bookings and memberships. For Gurgaon players who visit once or twice a month, the one-time booking option is the most flexible.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
    { name: 'Badminton Court Gurgaon', path: '/badminton-court-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court Near Gurgaon | Alchemy 360 Rohtak"
        description="Professional badminton court near Gurgaon (Gurugram) — Alchemy 360, Rohtak, 90 km / 90 min away. Great courts, full sports complex, online booking."
        canonical="/badminton-court-gurgaon"
        schema={schema}
      />
      <SportsNav activePath="/badminton-court-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is a full-scale sports destination — 90 km and approximately 90 minutes from Gurgaon (Gurugram). Gurgaon players who want a change of scene and a proper professional badminton setup without the city crowd find Alchemy 360 a compelling day trip. Book your court online before you leave and step onto the court the moment you arrive.
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
          Escape the City, Play at Alchemy 360
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon has plenty of sports options, but Alchemy 360 offers something different — a purpose-built multi-sport complex in Haryana's sports capital of Rohtak, where you can play badminton, pickleball and train in the gym all in one day. The 90-minute drive is best treated as part of the experience, especially on weekends when Rohtak's roads are clear and the facility is buzzing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '90 Min Haryana Drive', desc: 'Clear highway run from Gurgaon on NH-48 then NH-148B. Less traffic than a city commute — and you arrive at a top-tier sports complex.' },
            { title: 'Professional Badminton', desc: 'Alchemy 360\'s courts are maintained to a competitive standard — ideal for Gurgaon club teams or serious recreational players wanting quality.' },
            { title: 'Full Day Out', desc: "Combine badminton with other Alchemy 360 facilities and round it off with a proper meal at the on-site restaurant before heading back to Gurgaon." },
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
