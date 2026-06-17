import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What age can my child join the kids sports academy in Rohtak?',
    a: 'Red Ball Academy\'s kids sports program accepts children from 6 years of age. Batches are grouped by age to ensure age-appropriate training.',
  },
  {
    q: 'Which sports are available for kids at Red Ball Academy?',
    a: 'Currently, kids programs are available for cricket and badminton. Swimming lessons are also offered for children.',
  },
  {
    q: 'Are the coaches qualified for kids coaching?',
    a: 'Yes. Our youth coaches have experience working with children and are trained in age-appropriate coaching methods, making sessions fun, safe, and effective.',
  },
  {
    q: 'What is the schedule for kids sports training?',
    a: 'Kids training batches run in the morning and afternoon. Contact us for the current schedule and to check available spots in your child\'s age group.',
  },
  {
    q: 'Is there an admission fee for the kids sports academy?',
    a: 'Yes, there is an admission/registration fee along with the membership fee. Contact us or visit our Membership page for current pricing.',
  },
  {
    q: 'Can parents watch the training sessions?',
    a: 'Yes. Parents are welcome to observe training sessions from the designated viewing area.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([
    { name: 'Sports Academy', path: '/sports-academy-rohtak' },
    { name: "Kids' Sports Academy Rohtak", path: '/kids-sports-academy-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function KidsSportsAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Sports Academy in Rohtak | Red Ball Academy Haryana"
        description="Red Ball Kids Sports Academy in Rohtak offers cricket, badminton & swimming coaching for children aged 6+. Expert youth coaches, structured programs & safe environment."
        canonical="/kids-sports-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/kids-sports-academy-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Youth Sports Training · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Sports Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Academy's kids sports program in Rohtak gives children a structured, fun, and safe environment to learn cricket, badminton, and swimming under expert guidance. Build their confidence, fitness, and sporting skills from an early age.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enroll My Child
            </Link>
            <Link to="/book-slots" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book a Trial Session
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Kids Programs at Red Ball Academy, Rohtak
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              sport: '🏏 Kids Cricket',
              desc: 'Batting, bowling, and fielding fundamentals. Age-appropriate drills that build technique and love for the game.',
              to: '/cricket-academy-rohtak',
            },
            {
              sport: '🏸 Kids Badminton',
              desc: 'Footwork, strokes, and game sense for young badminton players. Beginner to intermediate levels.',
              to: '/badminton-court-rohtak',
            },
            {
              sport: '🏊 Kids Swimming',
              desc: 'Learn-to-swim in a safe, supervised environment. Building water confidence from the very first session.',
              to: '/swimming-pool-rohtak',
            },
          ].map(prog => (
            <Link key={prog.sport} to={prog.to} className="border border-black/10 rounded-xl p-5 hover:border-[#C8102E]/40 transition-all group">
              <div className="text-2xl mb-3">{prog.sport.split(' ')[0]}</div>
              <h3 className="font-bold text-[#0D0D0D] mb-2 group-hover:text-[#C8102E] transition-colors text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {prog.sport.split(' ').slice(1).join(' ')}
              </h3>
              <p className="text-xs text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Why Parents Choose Red Ball Academy for Their Kids
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#0D0D0D]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {[
              '👨‍🏫 Experienced youth sports coaches',
              '🛡️ Safe, supervised training environment',
              '🎯 Structured programs with clear progression',
              '👶 Age-grouped batches from 6 years onwards',
              '📊 Regular progress updates for parents',
              '🏆 Both recreational and competitive pathways',
              '🚌 Accessible location in Rohtak, Haryana',
              '💳 Affordable membership and enrollment plans',
            ].map(pt => (
              <li key={pt} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-black/5">{pt}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTAStrip />
      <FAQSection faqs={faqs} />
      <ContactBand />
    </SEOLandingLayout>
  );
}
