import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Does Alchemy 360 have a badminton academy?',
    a: 'Yes. Alchemy 360 runs a structured badminton academy with coaching programs for all skill levels — beginner, intermediate, and competitive — on professional wooden-floor courts.',
  },
  {
    q: 'How is the badminton academy structured?',
    a: 'The academy uses a level-based curriculum. Students are assessed on joining and placed in the appropriate batch. Progress through levels is tracked by coaches with regular assessments.',
  },
  {
    q: 'Are there badminton academy programs for adults?',
    a: 'Yes. Adult badminton coaching programs are available for all levels, including complete beginners and club-level players looking to improve specific aspects of their game.',
  },
  {
    q: 'What facilities do the badminton courts have?',
    a: 'Alchemy 360\'s badminton courts have wooden flooring, professional lighting, full net setup, and shuttle availability. Courts meet standard dimensions for competitive play.',
  },
  {
    q: 'How many courts does Alchemy 360 have for badminton?',
    a: 'Alchemy 360 has multiple badminton courts available for both open play and structured academy coaching sessions.',
  },
  {
    q: 'Is there separate coaching for singles and doubles badminton?',
    a: 'Yes. The academy covers both singles and doubles tactics, footwork patterns, and positional play as part of the intermediate and advanced programs.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Badminton',
  },
  breadcrumbSchema([
    { name: 'Badminton Court', path: '/badminton-court-rohtak' },
    { name: 'Badminton Academy Rohtak', path: '/badminton-academy-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Academy in Rohtak | Professional Coaching | Alchemy 360"
        description="Join Alchemy 360 Badminton Academy in Rohtak — structured coaching programs, professional courts, expert coaches for beginners to competitive players. Enroll today."
        canonical="/badminton-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/badminton-academy-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton Academy · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 runs a full-scale badminton academy in Rohtak — offering structured coaching for beginners, intermediates, and competitive players. With professional wooden-floor courts and experienced coaches, it is Rohtak's most serious badminton training destination.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership?sport=badminton" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Badminton Academy
            </Link>
            <Link to="/sports/badminton" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Court
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Structured Badminton Training at Alchemy 360, Rohtak
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Alchemy 360 Badminton Academy follows a structured curriculum with defined skill levels and regular assessments. Students begin with grip, footwork, and basic strokes, advancing through net play, smash technique, defensive skills, and match strategy. Academy batches are kept small to ensure each player gets coach attention and progresses steadily through the program.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Technique Foundation', desc: 'Grip, footwork patterns, forehand/backhand clears, drops, and net play fundamentals for beginners building a proper technical base.' },
            { title: 'Tactical Training', desc: 'Match tactics, deception, positioning, attacking patterns, and rally construction for intermediate and advanced players.' },
            { title: 'Competitive Coaching', desc: 'Tournament strategy, mental game training, physical conditioning, and competitive match preparation for advanced players.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Court', to: '/badminton-court-rohtak' },
              { label: 'Badminton Coaching', to: '/badminton-coaching-rohtak' },
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
