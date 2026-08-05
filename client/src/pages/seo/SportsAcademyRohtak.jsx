import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What sports does Alchemy 360 offer in Rohtak?',
    a: 'Alchemy 360 offers badminton, pickleball, gym & fitness training, and a dedicated kids sports academy in Rohtak, Haryana.',
  },
  {
    q: 'How do I book a session at the sports academy in Rohtak?',
    a: 'You can book online through our website by visiting the Book Slots page, or buy a membership for recurring access. Walk-ins are also welcome subject to availability.',
  },
  {
    q: 'Is there a kids sports academy at Alchemy 360?',
    a: 'Yes. Alchemy 360 runs a dedicated kids sports program for badminton, with structured coaching sessions and beginner-friendly batches.',
  },
  {
    q: 'What are the membership plans available?',
    a: 'We offer monthly, quarterly, and annual memberships for individuals and families, covering access to courts, pools, and gym facilities. View current plans on our Membership page.',
  },
  {
    q: 'Where is Alchemy 360 located in Rohtak?',
    a: 'We are located at Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001.',
  },
  {
    q: 'What are the operating hours?',
    a: 'Alchemy 360 is open 7 days a week, from 5:00 AM to 11:00 PM, to accommodate early-morning and evening sessions.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Sports Academy Rohtak', path: '/sports-academy-rohtak' }]),
  faqSchema(faqs),
];

export default function SportsAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Academy in Rohtak | Alchemy 360"
        description="Alchemy 360 in Rohtak, Haryana offers professional coaching in badminton, pickleball & gym. Memberships, slot bookings & kids programs available."
        canonical="/sports-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/sports-academy-rohtak" />

      {/* Hero */}
      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 is Rohtak's multi-sport complex built for players of all ages. Train with expert coaches, book courts anytime, and choose membership plans that fit your schedule.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Slots
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              View Memberships
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          What We Offer at Alchemy 360
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { sport: 'Badminton Courts', desc: 'Wooden-floored badminton courts with professional nets. Open to all skill levels.', link: '/badminton-court-rohtak' },
            { sport: 'Pickleball', desc: 'Dedicated pickleball courts — a growing sport now available right here in Rohtak.', link: '/pickleball-court-rohtak' },
            { sport: 'Gym & Fitness', desc: 'Modern gym with equipment for strength, cardio, and conditioning.', link: '/gym-in-rohtak' },
          ].map(item => (
            <Link key={item.sport} to={item.link} className="border border-black/10 rounded-xl p-5 hover:border-[#C5DB3B]/40 hover:shadow-sm transition-all group">
              <h3 className="font-bold text-[#0D0D0D] mb-2 group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.sport}</h3>
              <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F9F6F1] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Why Choose Alchemy 360 in Rohtak?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#0D0D0D]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {[
              'Professional-grade courts and equipment',
              'Expert coaches for multiple sports',
              'Flexible membership plans — monthly, quarterly, annual',
              'Online slot booking — no waiting, guaranteed access',
              'Kids academy with age-appropriate coaching',
              'On-site restaurant for post-match dining',
              'Secure QR-based entry and attendance',
              'Open 7 days a week, 5 AM to 11 PM',
            ].map(point => (
              <li key={point} className="flex items-start gap-2">
                <span className="text-[#C5DB3B] mt-0.5">✓</span>
                {point}
              </li>
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
