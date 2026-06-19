import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a kids sports academy near Jhajjar?',
    a: 'Yes. Red Ball Sports Arena in Rohtak is the closest professional kids sports academy to Jhajjar — just 25 km and 25 minutes away on Jhajjar Road, with coaching in cricket, badminton, swimming, and pickleball.',
  },
  {
    q: 'What age is appropriate for the kids sports programme at Red Ball?',
    a: 'Red Ball\'s kids sports academy accepts children from age 6 onwards. Batches are structured by age group so younger children are not mixed with older ones during training.',
  },
  {
    q: 'How often should my child attend Red Ball from Jhajjar?',
    a: 'Ideally 3–4 times per week for regular skill development. Given the 25-minute drive from Jhajjar, many families make it part of their weekly routine — especially morning and evening batches.',
  },
  {
    q: 'Is cricket coaching available for kids from Jhajjar at Red Ball?',
    a: 'Yes. The cricket coaching programme at Red Ball includes training on the Box 360 circular ground — the first 24/7 circular cricket ground in Rohtak — giving kids from Jhajjar a unique and exciting training environment.',
  },
  {
    q: 'Is there a safe environment for children at Red Ball Sports Arena?',
    a: 'Yes. Red Ball is a family-friendly complex with dedicated supervision during kids\' batches. Parents can wait on-site and are welcome to observe sessions. Safety and proper coaching are the top priorities.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Jhajjar' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Kids Sports Academy Rohtak', path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Sports Academy Jhajjar', path: '/kids-sports-academy-jhajjar' },
  ]),
  faqSchema(faqs),
];

export default function KidsSportsAcademyJhajjar() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Sports Academy Near Jhajjar | Red Ball Sports Arena Rohtak"
        description="Nearest kids sports academy to Jhajjar — Red Ball Sports Arena Rohtak, only 25 km / 25 minutes. Cricket, badminton, swimming for children. Enrol your child today."
        canonical="/kids-sports-academy-jhajjar"
        schema={schema}
      />

      <SportsNav activePath="/kids-sports-academy-jhajjar" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Sports Academy · Near Jhajjar</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Sports Academy Near Jhajjar
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Give your child the gift of professional sports coaching — just 25 km from Jhajjar. Red Ball Sports Arena in Rohtak has a dedicated kids sports academy covering cricket, badminton, swimming, and pickleball. Located directly on Jhajjar Road, the 25-minute drive is a small investment in your child's future.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol Your Child
            </Link>
            <Link to="/kids-sports-academy-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Kids Programme Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Jhajjar Kids Deserve the Best — Red Ball Delivers
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Finding quality children's sports coaching in Jhajjar is a challenge most parents know well. Red Ball Sports Arena in Rohtak — right on Jhajjar Road, 25 minutes away — changes that equation entirely. Kids from Jhajjar train on the Box 360 circular cricket ground (open 24/7 and the first of its kind in Rohtak), practise badminton on professional indoor courts, and swim in the open-air pool, all under the guidance of experienced coaches. Age-specific batches ensure children develop at the right pace, and the family-friendly environment means parents can relax or watch while their kids learn. Many Jhajjar families have made Red Ball part of their weekly routine.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Just 25 Min from Jhajjar', desc: 'Red Ball sits directly on Jhajjar Road in Rohtak — there\'s no easier commute for Jhajjar families. Morning and evening batches are available to suit school schedules.' },
            { title: 'Cricket, Badminton + Swimming', desc: 'Kids can try multiple sports at Red Ball — from Box 360 circular cricket to professional badminton courts and an open-air swimming pool. All under one roof, one membership.' },
            { title: 'Family Day Out + Restaurant', desc: 'While kids train, parents wait comfortably on-site. After practice, the whole family can eat together at Red Ball\'s on-site restaurant before heading back to Jhajjar.' },
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
              { label: 'Sports Academy Jhajjar', to: '/sports-academy-jhajjar' },
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
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
