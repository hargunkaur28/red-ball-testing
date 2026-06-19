import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a kids sports academy close to Sonipat?',
    a: 'Red Ball Sports Arena in Rohtak is the nearest professional kids sports academy to Sonipat — approximately 55 km and 55 minutes away, with children\'s coaching in cricket, badminton, swimming, and pickleball.',
  },
  {
    q: 'Is swimming coaching available for Sonipat children at Red Ball?',
    a: 'Yes. Red Ball\'s open-air swimming pool has dedicated coaching batches for children. Sonipat kids can join swimming classes with structured learning that takes them from beginner to confident swimmer.',
  },
  {
    q: 'What is the minimum age for the kids sports programme at Red Ball?',
    a: 'Children aged 6 and above are welcome. Different age groups have separate batches to ensure appropriate coaching intensity and safety for all children.',
  },
  {
    q: 'Can my child try multiple sports at Red Ball from Sonipat?',
    a: 'Yes. Red Ball\'s membership structure allows children to participate in multiple sports. Many Sonipat children train in cricket and badminton — or cricket and swimming — in the same visit.',
  },
  {
    q: 'Is Red Ball Sports Arena a safe environment for young children?',
    a: 'Absolutely. Red Ball is a family-friendly sports complex with supervised batches for children and a welcoming environment for parents. Safety and proper coaching methodology are the foundation of all kids programmes.',
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
    { name: 'Kids Sports Academy Rohtak', path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Sports Academy Sonipat', path: '/kids-sports-academy-sonipat' },
  ]),
  faqSchema(faqs),
];

export default function KidsSportsAcademySonipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Sports Academy Near Sonipat | Red Ball Sports Arena Rohtak"
        description="Kids sports academy near Sonipat — Red Ball Sports Arena Rohtak, 55 km / 55 minutes. Cricket, badminton, swimming for children aged 6+. Enrol your child today."
        canonical="/kids-sports-academy-sonipat"
        schema={schema}
      />

      <SportsNav activePath="/kids-sports-academy-sonipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Sports Academy · Near Sonipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Sports Academy Near Sonipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Sonipat children have big sporting dreams — Red Ball Sports Arena in Rohtak is where those dreams get proper coaching. Just 55 km and a 55-minute drive, Red Ball offers cricket, badminton, swimming, and pickleball for kids, with experienced coaches and a safe, family-friendly environment that Sonipat parents consistently trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol Your Child
            </Link>
            <Link to="/sports-academy-sonipat" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Sports Academy Near Sonipat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Sonipat's Trusted Kids Sports Academy — Red Ball, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sonipat has a proud sporting culture, and parents here want their children trained by coaches who take development seriously. Red Ball Sports Arena in Rohtak delivers on that expectation. Kids from Sonipat train in swimming batches at the open-air pool, develop cricket skills on the Box 360 circular ground, and improve their racket skills on Red Ball's professional badminton courts. The 55-minute drive from Sonipat is a manageable, regular commitment — and the results in children's confidence, fitness, and sporting skill speak for themselves. A family visit to Red Ball becomes a highlight of the week, not just a chore.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: '55 Min from Sonipat', desc: 'The Sonipat–Rohtak highway makes for a smooth 55-minute drive. Many Sonipat families schedule kids\' training 3–4 times weekly — morning batches work especially well before school.' },
            { title: 'Swimming Highlight for Kids', desc: 'Red Ball\'s open-air swimming pool is a favourite for Sonipat kids. Structured swimming coaching builds water confidence and technique in a safe, well-maintained pool environment.' },
            { title: 'Kids Train, Family Dines + Restaurant', desc: 'While children finish their training, families can relax at Red Ball\'s on-site restaurant — a convenient and enjoyable way to end a sports session before heading back to Sonipat.' },
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
              { label: 'Kids Sports Academy Rohtak', to: '/kids-sports-academy-rohtak' },
              { label: 'Sports Academy Sonipat', to: '/sports-academy-sonipat' },
              { label: 'Badminton Academy Rohtak', to: '/badminton-academy-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
