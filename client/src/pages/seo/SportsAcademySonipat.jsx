import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a good sports academy near Sonipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the top multi-sport academy nearest to Sonipat — approximately 55 km and 55 minutes away, offering cricket, badminton, pickleball, and swimming coaching.',
  },
  {
    q: 'How far is Alchemy 360 Sports Arena from Sonipat?',
    a: 'Alchemy 360 Sports Arena is located in Sector 22-D, Jhajjar Road, Rohtak — approximately 55 km from Sonipat, reachable in about 55 minutes via well-connected Haryana state highways.',
  },
  {
    q: 'Can Sonipat students enrol in cricket coaching at Alchemy 360?',
    a: 'Absolutely. Sonipat students are welcome to join Alchemy 360\'s cricket academy. The Box 360 circular cricket ground — Rohtak\'s first 24/7 circular format — is a major draw for serious cricketers.',
  },
  {
    q: 'Does Alchemy 360 offer swimming coaching for Sonipat students?',
    a: 'Yes. Alchemy 360\'s open-air swimming pool has coaching batches for all age groups. Students from Sonipat can enrol in the swimming academy — call +91 93500 76653 for batch timings.',
  },
  {
    q: 'Is it worth travelling from Sonipat to Alchemy 360 for sports training?',
    a: 'Many Sonipat athletes make this journey regularly. Alchemy 360 provides professional infrastructure — coaching, maintained grounds, swimming pool, restaurant — that justifies the 55-minute drive compared to training in subpar facilities locally.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' },
    { name: 'Sports Academy Sonipat', path: '/sports-academy-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function SportsAcademySonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy Near Sonipat | Alchemy 360 Sports Arena Rohtak"
        description="Nearest professional sports academy to Sonipat — Alchemy 360 Sports Arena in Rohtak, 55 km / 55 minutes. Cricket, badminton, swimming, pickleball. Enrol your child today."
        canonical="/sports-academy-sonipat"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena is Rohtak's premier multi-sport complex — and the best sports academy option for Sonipat athletes. At 55 km and a 55-minute drive, Alchemy 360 offers cricket, badminton, pickleball, and swimming under one roof, with professional coaching that serious athletes from Sonipat have come to rely on.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore Programmes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Sonipat's Go-To Sports Academy in Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has a strong sporting culture, but a dedicated private multi-sport academy with the depth of Alchemy 360's offering is hard to find locally. Alchemy 360 Sports Arena in Rohtak provides exactly that — a single campus where cricketers train on the Box 360 circular ground (open 24/7), swimmers develop in the open-air pool, and racket sport players take to professional badminton and pickleball courts. The journey from Sonipat to Rohtak on NH-9 is well-maintained and takes under an hour — a reasonable investment for training that genuinely builds careers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min from Sonipat', desc: 'Rohtak and Sonipat are well connected via NH-9. The 55 km drive is comfortable and direct, making daily or weekly training sessions feasible for Sonipat athletes.' },
            { title: 'Swimming Academy Highlight', desc: 'Alchemy 360\'s open-air swimming pool draws serious swimmers from across the region. Batch coaching, competitive preparation, and recreational swimming are all available.' },
            { title: 'Full Complex + Restaurant', desc: 'After training in the water, on the courts, or at the crease, Sonipat athletes can wind down and eat well at Alchemy 360\'s on-site restaurant before heading home.' },
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
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
              { label: 'Swimming Academy Rohtak', to: '/swimming-academy-rohtak' },
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
