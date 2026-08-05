import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { sportsClubSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: "What is Alchemy 360's sports club membership?",
    a: "Alchemy 360's sports club membership gives access to all facilities — badminton, pickleball, and gym — with priority booking and discounted slot rates.",
  },
  {
    q: 'How much does sports club membership cost at Alchemy 360?',
    a: 'Membership plans are available monthly, quarterly, and annually. Visit the Buy Membership page or call +91 93500 76653 for current membership rates.',
  },
  {
    q: 'Can families join Alchemy 360 as a sports club?',
    a: 'Yes. Family membership plans are available allowing multiple family members to access all sports club facilities under a single plan.',
  },
  {
    q: 'Is there a corporate membership option at Alchemy 360?',
    a: 'Yes. Corporate membership packages are available for companies wanting to provide their employees with sports club access in Rohtak.',
  },
  {
    q: 'What facilities are included in Alchemy 360 sports club membership?',
    a: 'Club membership includes badminton, pickleball, and gym access. Food court, sports accessories shop, and coaching programs are available as add-ons.',
  },
  {
    q: 'Can I try the sports club before committing to membership?',
    a: 'Yes. One-time access bookings are available for all sports. This lets you experience the facilities before joining as a full club member.',
  },
];

const schema = [
  sportsClubSchema,
  breadcrumbSchema([
    { name: 'Sports Complex', path: '/sports-complex-rohtak' },
    { name: 'Sports Club Rohtak', path: '/sports-club-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function SportsClubRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Club in Rohtak | Multi-Sport Membership | Alchemy 360"
        description="Alchemy 360 is Rohtak's premier sports club — badminton, gym, pickleball, and football with flexible membership plans. Join today."
        canonical="/sports-club-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/sports-club-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sports Club · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Club in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 is Rohtak's most complete sports club — offering membership access across badminton, pickleball, gym, and football under one roof. As a club member, you get priority booking, discounted rates, and access to all facilities at Rohtak's most active multi-sport complex.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/buy-membership" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join the Sports Club
            </Link>
            <Link to="/sports-complex-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              View All Sports
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Alchemy 360 — Rohtak's #1 Multi-Sport Club
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          A great sports club does more than provide a playing surface — it builds a community. Alchemy 360 in Rohtak is where serious athletes, weekend warriors, and families come together through sport. The club offers structured memberships, professional coaching, online booking, QR-based entry, and an on-site restaurant, making it the most complete sports club membership in Rohtak, Haryana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Multi-Sport Access', desc: 'One membership gives you access to badminton, pickleball, and gym. The most comprehensive sports club value in Rohtak.' },
            { title: 'Priority Booking', desc: 'Club members get priority access to slot bookings, court reservations, and coaching program enrollments before open availability.' },
            { title: 'Community Events', desc: 'Regular cricket tournaments, badminton leagues events, and social sports gatherings exclusive to Alchemy 360 club members.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>Club Facilities</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Sports Complex', to: '/sports-complex-rohtak' },
              { label: 'Badminton Court', to: '/badminton-court-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
              { label: 'Pickleball', to: '/pickleball-court-rohtak' },
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
