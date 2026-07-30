import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What is the best kids sports academy in Haryana?',
    a: 'Alchemy 360 Sports Arena in Rohtak is one of Haryana\'s leading children\'s sports academies — offering structured programmes in cricket, badminton, pickleball, and swimming for kids from age 6 upwards.',
  },
  {
    q: 'Which cities in Haryana can send their children to Alchemy 360?',
    a: 'Children from Jhajjar (25 km), Bahadurgarh (45 km), Sonipat (55 km), Panipat (95 km), Gurgaon (90 km), and other Haryana cities regularly attend Alchemy 360\'s kids sports academy in Rohtak.',
  },
  {
    q: 'What age groups does the kids sports academy at Alchemy 360 cover?',
    a: 'Alchemy 360\'s kids sports programme is designed for children aged 6 and above. Batches are structured by age group to ensure age-appropriate coaching and safe participation.',
  },
  {
    q: 'Are the coaches at Alchemy 360 qualified to teach children?',
    a: 'Yes. Alchemy 360\'s coaching staff have experience working with young athletes. Child safety, correct technique, and enjoyment are the priorities — especially for beginners joining their first sports programme.',
  },
  {
    q: 'How do I enrol my child in the Alchemy 360 kids sports academy from anywhere in Haryana?',
    a: 'Call +91 93500 76653 or book online at Alchemy 360 Sports Arena. The team will advise on the right sport, batch, and schedule based on your child\'s age and your commute from your city in Haryana.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'State', name: 'Haryana' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Kids Sports Academy Rohtak', path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Sports Academy Haryana', path: '/kids-sports-academy-haryana' },
  ]),
  faqSchema(faqs),
];

export default function KidsSportsAcademyHaryana() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Sports Academy in Haryana | Alchemy 360 Sports Arena Rohtak"
        description="Best kids sports academy in Haryana — Alchemy 360 Sports Arena, Rohtak. Children's coaching in cricket, badminton, swimming, pickleball. Serving Jhajjar, Sonipat, Panipat & beyond."
        canonical="/kids-sports-academy-haryana"
        schema={schema}
      />

      <SportsNav activePath="/kids-sports-academy-haryana" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Sports Academy · Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Sports Academy in Haryana
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak offers Haryana's children a world of sport in one place. From cricket to swimming, badminton to pickleball — professional coaching designed for young athletes is available here. Families from Jhajjar, Bahadurgarh, Sonipat, Panipat, and Gurgaon make the journey regularly, because the quality of children's sports development at Alchemy 360 simply isn't matched locally.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol Your Child
            </Link>
            <Link to="/kids-sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Programme Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Haryana's Favourite Kids Sports Academy
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Children across Haryana deserve access to professional sports coaching — not just in big cities but throughout the state. Alchemy 360 Sports Arena in Rohtak serves as a regional hub for kids' sports development, drawing young athletes from districts near and far. The kids programme at Alchemy 360 covers cricket (using the unique Box 360 circular ground), badminton, pickleball, and swimming. Each sport has age-appropriate batches with qualified coaches who prioritise fun, safety, and skill-building in equal measure. Whether your child is just starting out or already shows competitive potential, Alchemy 360's kids academy in Rohtak is the right place to build their sporting journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Serving All of Haryana', desc: 'Children from Jhajjar (25 km), Bahadurgarh (45 km), Sonipat (55 km), and beyond train at Alchemy 360. Weekend batches and flexible scheduling accommodate commuting families.' },
            { title: 'Multiple Sports, One Campus', desc: 'Cricket, badminton, pickleball, swimming — your child can explore and excel in multiple sports without switching academies. One Alchemy 360 membership covers it all.' },
            { title: 'After Practice, Eat Together + Restaurant', desc: 'Parents and children can enjoy a meal at Alchemy 360\'s on-site restaurant after training — making the trip a complete family outing, not just a sports drop-off.' },
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
              { label: 'Kids Sports Academy Rohtak', to: '/kids-sports-academy-rohtak' },
              { label: 'Sports Academy Rohtak', to: '/sports-academy-rohtak' },
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
