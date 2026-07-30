import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good swimming pool near Sonipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak has an open-air swimming pool accessible from Sonipat — approximately 55 km and 55 minutes by road. It is one of the better pool facilities in the region.',
  },
  {
    q: 'How do I reach Alchemy 360\'s swimming pool from Sonipat?',
    a: 'From Sonipat, take NH-334B towards Rohtak. Alchemy 360 Sports Arena is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — the journey takes around 55 minutes.',
  },
  {
    q: 'Can Sonipat swimmers book a pool session at Alchemy 360 online?',
    a: 'Yes. Swimming sessions at Alchemy 360 can be booked and paid for online, so Sonipat swimmers can plan their visit in advance without any walk-in uncertainty.',
  },
  {
    q: 'Does Alchemy 360 offer swimming coaching for Sonipat players?',
    a: 'Yes. Alchemy 360\'s swimming academy provides coaching for beginners and intermediate swimmers. Sonipat residents interested in structured swimming classes can enquire about session packages.',
  },
  {
    q: 'Is the pool at Alchemy 360 open year-round for Sonipat visitors?',
    a: 'Alchemy 360\'s open-air pool operates seasonally. We recommend calling ahead at +91 93500 76653 or checking online to confirm session availability before making the drive from Sonipat.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Swimming',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Swimming Pool Rohtak', path: '/swimming-pool-rohtak' },
    { name: 'Swimming Pool Sonipat', path: '/swimming-pool-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function SwimmingPoolSonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Swimming Pool Near Sonipat | Alchemy 360 Sports Arena Rohtak"
        description="Swimming pool near Sonipat — Alchemy 360 Sports Arena, Rohtak, 55 km / 55 min away. Open-air pool, coaching available, online booking, full sports facility."
        canonical="/swimming-pool-sonipat"
        schema={schema}
      />
      <SportsNav activePath="/swimming-pool-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Swimming · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Swimming Pool Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 55 km and 55 minutes from Sonipat via NH-334B — and home to an open-air swimming pool that draws visitors from across Haryana. For Sonipat swimmers who want a clean facility with proper management and the option to combine sports in one trip, Alchemy 360 is the clear destination.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Swimming Session
            </Link>
            <Link to="/swimming-pool-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Pool Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          A Swim Worth the Drive from Sonipat
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has good road connectivity to Rohtak, and Alchemy 360 Sports Arena sits right off the main highway — making the 55-minute drive straightforward. The pool is open-air, well-maintained, and embedded within a multi-sport complex where Sonipat visitors can also access badminton courts, a gymnasium, Box 360 cricket, and an on-site restaurant. Many Sonipat families and fitness groups treat Alchemy 360 as their regular weekend sports destination.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Open-Air Setting', desc: 'Alchemy 360\'s outdoor pool offers a fresh, open environment — a welcome contrast to the crowded indoor options sometimes found closer to Sonipat.' },
            { title: 'Coaching Available', desc: 'Alchemy 360\'s swimming academy provides structured coaching — useful for Sonipat swimmers looking to improve technique alongside their regular sessions.' },
            { title: 'Full Day Planned', desc: "Swim your laps, play a sport, then sit down for food at Alchemy 360's on-site restaurant. Sonipat visitors consistently say the trip feels well worth it." },
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
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
              { label: 'Cricket Ground Sonipat', to: '/cricket-ground-sonipat' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
