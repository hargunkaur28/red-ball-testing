import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a dedicated cricket practice ground at Red Ball?',
    a: 'Yes. Red Ball Sports Arena has a dedicated practice area with batting nets, bowling crease markings, and a maintained pitch surface for structured practice sessions.',
  },
  {
    q: 'What time does the cricket practice ground open?',
    a: 'The cricket practice facility at Red Ball opens at 5:00 AM, seven days a week — ideal for early morning sessions before school or work.',
  },
  {
    q: 'Can I book the practice ground for net sessions?',
    a: 'Yes. Practice sessions can be booked online through the Book Slots page. Select your date, time, and preferred session type.',
  },
  {
    q: 'Is coaching available during practice sessions?',
    a: 'Yes. Coached practice sessions are available where a Red Ball cricket coach runs your batting or bowling drills. Alternatively, book an uncoached open practice slot.',
  },
  {
    q: 'Is the practice ground available for full team practice?',
    a: 'Yes. The full ground is available for team training sessions including fielding drills, match simulations, and full practice matches.',
  },
  {
    q: 'Do I need to bring my own cricket equipment?',
    a: 'Basic cricket equipment is available at the Red Ball sports accessories shop. You can bring your own gear or purchase/rent equipment on-site.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Cricket',
  },
  breadcrumbSchema([
    { name: 'Cricket Academy', path: '/cricket-academy-rohtak' },
    { name: 'Cricket Practice Ground Rohtak', path: '/cricket-practice-ground-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function CricketPracticeGroundRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Cricket Practice Ground in Rohtak | Nets & Drills | Red Ball Sports Arena"
        description="Professional cricket practice ground in Rohtak at Red Ball Sports Arena — batting nets, bowling practice, floodlit facility, open from 5 AM. Book your practice session online."
        canonical="/cricket-practice-ground-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/cricket-practice-ground-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cricket Practice · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Cricket Practice Ground in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena provides a dedicated cricket practice ground in Rohtak — with batting nets, full bowling runs, and a maintained pitch surface. Whether you want to work on your batting technique, bowling accuracy, or full team fielding drills, the Red Ball practice facility gives you professional conditions every session.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Practice Slot
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Academy
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Train Seriously on Rohtak's Best Cricket Practice Ground
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          A proper practice ground makes the difference between developing good habits and reinforcing bad ones. Red Ball Sports Arena's cricket practice facility in Rohtak has a maintained pitch, bowling crease markings, and ample space for full run-ups. Floodlighting extends practice sessions into the evening, and the facility opens at 5:00 AM — perfect for serious players who train before work or school.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Batting Nets', desc: 'Enclosed batting practice zones for focused net sessions. Practice against pace, spin, and machine bowling in a controlled environment.' },
            { title: 'Full Bowling Run-Up', desc: 'Adequate space for fast bowlers to complete full run-up practice. Proper crease markings and maintained surface for serious bowling work.' },
            { title: 'Early Morning Access', desc: 'Opens at 5:00 AM daily — Rohtak\'s best option for serious players who need early morning practice sessions before school or work.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Also at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Cricket Ground', to: '/cricket-ground-rohtak' },
              { label: 'Cricket Coaching', to: '/cricket-coaching-rohtak' },
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
              { label: 'Sports Complex', to: '/sports-complex-rohtak' },
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
