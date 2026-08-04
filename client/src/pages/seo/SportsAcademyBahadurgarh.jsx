import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a professional sports academy near Bahadurgarh?',
    a: 'Alchemy 360 Sports Arena in Rohtak is the nearest full-scale multi-sport academy to Bahadurgarh — approximately 45 km and 40 minutes away via NH-9 and Jhajjar Road.',
  },
  {
    q: 'How long does it take to reach Alchemy 360 from Bahadurgarh?',
    a: 'The drive from Bahadurgarh to Alchemy 360 Sports Arena in Rohtak typically takes around 40 minutes, covering roughly 45 km. The route via Jhajjar Road is well connected.',
  },
  {
    q: 'What coaching programmes does Alchemy 360 offer for Bahadurgarh students?',
    a: 'Alchemy 360 offers structured coaching in cricket (including the unique Box 360 circular format), badminton, pickleball. Batch timings are flexible to accommodate commuting students.',
  },
  {
    q: 'Can I get a sports academy membership from Bahadurgarh?',
    a: 'Yes. Monthly and annual memberships are available. Students from Bahadurgarh can call +91 93500 76653 to discuss the right programme and timing.',
  },
  {
    q: 'Is Alchemy 360 better than local sports options in Bahadurgarh?',
    a: 'Alchemy 360 provides a professional multi-sport environment that is difficult to match locally — certified coaches, maintained facilities, and the only Box 360 circular cricket ground in Rohtak. The 40-minute drive is a small price for serious training.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Bahadurgarh' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' },
    { name: 'Sports Academy Bahadurgarh', path: '/sports-academy-bahadurgarh' },
  ]),
  faqSchema(faqs),
];

export default function SportsAcademyBahadurgarh() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy Near Bahadurgarh | Alchemy 360 Sports Arena Rohtak"
        description="Best sports academy near Bahadurgarh — Alchemy 360 Sports Arena Rohtak, 45 km / 40 minutes away. Cricket, badminton, pickleball. Join the academy today."
        canonical="/sports-academy-bahadurgarh"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-bahadurgarh" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Academy · Near Bahadurgarh</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy Near Bahadurgarh
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Bahadurgarh athletes deserve professional-grade training. Alchemy 360 Sports Arena in Rohtak is 45 km away — a 40-minute drive — and offers the kind of multi-sport coaching infrastructure that simply doesn't exist in the immediate Bahadurgarh area. Whether it's cricket, badminton, pickleball, , the drive pays off.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              View Programmes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Why Bahadurgarh Athletes Train at Alchemy 360
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Bahadurgarh sits at the crossroads of Haryana and Delhi NCR, yet lacks a dedicated multi-sport academy with the breadth Alchemy 360 offers. Players and parents from Bahadurgarh make the 40-minute journey to Rohtak because the quality is worth it — Box 360 circular cricket (Rohtak's first 24/7 ground), professional badminton courts, a pickleball setup, all in one complex. Coaches at Alchemy 360 have years of competitive and training experience, and batch sizes are kept manageable for proper attention.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '40 Min Drive, World-Class Training', desc: 'The 45 km journey from Bahadurgarh to Alchemy 360 on Jhajjar Road is smooth and direct — a small investment for access to Haryana\'s premier multi-sport facility.' },
            { title: 'Cricket + Racket Sports', desc: 'From Box 360 circular cricket to badminton and pickleball courts — Alchemy 360 covers every major sport under one roof.' },
            { title: 'Train Hard, Eat Well + Restaurant', desc: 'Post-training recovery matters. Alchemy 360\'s on-site restaurant lets Bahadurgarh athletes refuel with a proper meal before the drive home.' },
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
              { label: 'Badminton Academy Rohtak', to: '/badminton-academy-rohtak' },
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
