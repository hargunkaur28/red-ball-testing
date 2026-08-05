import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What kind of academy is Alchemy 360 in Rohtak?',
    a: 'Alchemy 360 is a sports academy in Rohtak, Haryana, offering training in badminton and fitness. It also has a dedicated kids sports academy for young athletes.',
  },
  {
    q: 'What age groups can join the academy?',
    a: 'The academy welcomes all age groups — from children (6+ years) in the kids program to adults in individual sports and fitness programs.',
  },
  {
    q: 'Are there professional coaches at the academy?',
    a: 'Yes. Alchemy 360 has experienced coaches for badminton. Coaches offer both group and individual training sessions.',
  },
  {
    q: 'What is the admission fee for the academy?',
    a: 'Admission and membership fees vary by sport and plan. Visit our Membership page to see current pricing, or contact us directly for academy enrollment details.',
  },
  {
    q: 'How do I enroll my child in the sports academy?',
    a: 'You can enroll online via our website or visit the academy in person. We recommend calling ahead to check batch availability for your child\'s age group.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Academy in Rohtak', path: '/academy-in-rohtak' }]),
  faqSchema(faqs),
];

export default function AcademyInRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Academy in Rohtak | Alchemy 360 Haryana"
        description="Alchemy 360 in Rohtak offers professional sports training for all ages. Badminton, gym & kids programs. Join the best sports academy in Rohtak, Haryana."
        canonical="/academy-in-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/academy-in-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Training · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 in Rohtak is where athletes are built — through structured coaching, consistent practice, and access to world-class infrastructure. Whether you're enrolling your child or pursuing personal athletic goals, we have the right program for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Academy
            </Link>
            <Link to="/book-slots" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Trial Session
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Programs at Alchemy 360, Rohtak
        </h2>
        <div className="space-y-4">
          {[
            {
              title: 'Badminton Academy',
              desc: 'Learn badminton with experienced coaches. Available for beginners, intermediate players, and competitive athletes.',
              to: '/badminton-court-rohtak',
            },
            {
              title: 'Gym & Fitness',
              desc: 'Strength, conditioning, and fitness training. Access to modern equipment and optional personal training sessions.',
              to: '/gym-in-rohtak',
            },
          ].map(prog => (
            <Link key={prog.title} to={prog.to} className="flex items-start gap-4 p-5 border border-black/10 rounded-xl hover:border-[#C5DB3B]/40 transition-all group">
              <span className="text-[#C5DB3B] text-2xl mt-1">🏅</span>
              <div>
                <h3 className="font-bold text-[#0D0D0D] mb-1 group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.title}</h3>
                <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTAStrip />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
