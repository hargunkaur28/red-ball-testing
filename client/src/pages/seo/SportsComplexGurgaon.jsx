import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a sports complex near Gurgaon in Haryana?',
    a: 'Alchemy 360 in Rohtak is approximately 90 km from Gurgaon — about 90 minutes by road. It is one of the most complete multi-sport complexes in Haryana, with badminton, pickleball, a gym, and a restaurant.',
  },
  {
    q: 'How far is Alchemy 360 from Gurgaon?',
    a: 'Alchemy 360 is around 90 km from Gurgaon, at Sector 22-D, Jhajjar Road, Rohtak, Haryana 124001. The drive is approximately 90 minutes.',
  },
  {
    q: 'Why would Gurgaon teams travel to Rohtak for sports?',
    a: "Alchemy 360 offers experiences you can't find in Gurgaon — including dedicated pickleball courts and professional badminton courts, all in a far less congested environment.",
  },
  {
    q: 'Does Alchemy 360 have pickleball courts?',
    a: "Yes. Alchemy 360 has dedicated pickleball courts — making it one of the few facilities in Haryana offering the sport. Gurgaon's growing pickleball community frequently makes the drive for court time.",
  },
  {
    q: 'Can Gurgaon corporate teams book Alchemy 360 for team sports days?',
    a: 'Yes. Corporate sports days combining badminton and pickleball are popular with Gurgaon companies. Contact +91 93500 76653 to plan a corporate event at Alchemy 360.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' },
    { name: 'Sports Complex Near Gurgaon', path: '/sports-complex-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function SportsComplexGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex Near Gurgaon | Alchemy 360 Rohtak"
        description="Sports complex near Gurgaon — Alchemy 360 in Rohtak, ~90 km, ~90 min drive. Badminton, pickleball and gym in Haryana."
        canonical="/sports-complex-gurgaon"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Complex · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is approximately 90 km from Gurgaon — about 90 minutes on the highway. For Gurgaon professionals and corporate teams that want a proper Haryana sports experience outside the NCR, Alchemy 360 offers pickleball, badminton, and a full gym — all without the city noise and pricing.
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
          Escape Gurgaon — Come to Alchemy 360 in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon has sports facilities, but not quite like Alchemy 360. The 90-minute drive to Rohtak takes you to a genuinely different kind of sports day — open-air, spacious, relaxed, and genuinely multi-sport. At Sector 22-D, Jhajjar Road, Rohtak, the complex includes pickleball courts (a sport exploding in popularity in Gurgaon's corporate community), a gym, and badminton courts. Gurgaon corporate teams regularly hire Alchemy 360 for team-building days that work better when everyone's away from the office.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Pickleball Courts', desc: "Dedicated pickleball courts — rare in Haryana. Gurgaon's growing pickleball crowd makes the 90-minute drive to Alchemy 360 for court time unavailable closer to home." },
            { title: 'Dedicated Pickleball', desc: "Courts built to IFP specifications — among the very few in Haryana, and a draw for NCR players who can't find them locally." },
            { title: 'Dine After the Game', desc: "Alchemy 360's on-site restaurant means Gurgaon groups can eat a proper post-game meal on-site before the highway drive back — no hunting for restaurants in an unfamiliar area." },
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
              { label: 'Pickleball Court Rohtak', to: '/pickleball-court-rohtak' },
              { label: 'Badminton Court Rohtak', to: '/badminton-court-rohtak' },
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
