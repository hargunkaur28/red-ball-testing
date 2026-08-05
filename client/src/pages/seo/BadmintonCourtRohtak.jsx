import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Where can I play badminton in Rohtak?',
    a: 'Alchemy 360 has professional badminton courts in Rohtak at Sector 22-D, Jhajjar Road. Courts can be booked online or by walk-in.',
  },
  {
    q: 'Are badminton coaching sessions available at Alchemy 360?',
    a: 'Yes. Badminton coaches are available for individual and group sessions, suitable for beginners through to advanced players.',
  },
  {
    q: 'What is the cost of renting a badminton court in Rohtak?',
    a: 'Court rental rates are listed on our Book Slots page. Membership plans offer more economical per-session pricing for frequent players.',
  },
  {
    q: 'Can kids learn badminton at Alchemy 360?',
    a: 'Yes. We have a kids badminton program with age-appropriate coaching for children. Check our Kids\' Sports Academy page for details.',
  },
  {
    q: 'Is badminton equipment provided at the court?',
    a: 'Shuttlecocks and rackets may be available for rent. Contact us to confirm current availability.',
  },
  {
    q: 'What are the badminton court timings at Alchemy 360?',
    a: 'Courts are available from 5:00 AM to 11:00 PM, seven days a week.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    sport: 'Badminton',
  },
  breadcrumbSchema([
    { name: 'Sports Arena', path: '/sports-arena-rohtak' },
    { name: 'Badminton Court Rohtak', path: '/badminton-court-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function BadmintonCourtRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Badminton Court in Rohtak | Book Badminton | Alchemy 360"
        description="Play badminton in Rohtak at Alchemy 360. Professional wooden-floor courts, experienced coaches, kids programs & flexible membership plans. Book online."
        canonical="/badminton-court-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/badminton-court-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Badminton · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Badminton Court in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 offers professional-grade badminton courts in Rohtak — wooden-floored, well-lit, and maintained to high standards. Play casually, compete seriously, or learn with an experienced coach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/badminton" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Badminton Court
            </Link>
            <Link to="/buy-membership?sport=badminton" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Badminton Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Badminton at Alchemy 360 — Rohtak's Best Courts
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our badminton courts in Rohtak feature proper wooden flooring, professional-grade nets, and even lighting that eliminates shadows. Whether you're playing singles, doubles, or mixed, our courts deliver the right playing experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Court Booking', desc: 'Book by the hour, any day. Courts available 5 AM to 11 PM. Instant online confirmation.' },
            { title: 'Coaching', desc: 'One-on-one and group coaching sessions with experienced badminton coaches.' },
            { title: "Kids' Badminton", desc: 'Structured badminton program for children with age-appropriate coaching and drills.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More Sports at Alchemy 360 Arena, Rohtak</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Pickleball', to: '/pickleball-court-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
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
