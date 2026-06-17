import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What makes Red Ball Sports Complex different from other venues in Rohtak?',
    a: 'Red Ball Sports Arena brings multiple sports under one roof — cricket, badminton, pickleball, swimming, and gym — along with digital booking, membership plans, and an on-site restaurant, making it a complete sports destination in Rohtak.',
  },
  {
    q: 'Can I bring my whole family to the sports complex?',
    a: 'Yes. The complex has something for every age group — kids academy, adult sports courts, swimming pool, and a gym. Family membership plans are available.',
  },
  {
    q: 'Are changing rooms and lockers available at the complex?',
    a: 'Yes, the facility has changing rooms. For locker availability, please check with staff on arrival.',
  },
  {
    q: 'Can I host a birthday party or sports event at the complex?',
    a: 'Yes. We welcome group events, birthday parties, and sports day gatherings. Contact us to plan your event.',
  },
  {
    q: 'Do you offer trial sessions before buying a membership?',
    a: 'Yes. You can use our one-time booking option to try any sport before committing to a membership.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Sports Complex Rohtak', path: '/sports-complex-rohtak' }]),
  faqSchema(faqs),
];

export default function SportsComplexRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Sports Complex in Rohtak | Red Ball Sports Arena"
        description="Red Ball Sports Complex in Rohtak, Haryana — cricket, badminton, pickleball, swimming & gym under one roof. Family-friendly with memberships and online slot booking."
        canonical="/sports-complex-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/sports-complex-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Sports Complex in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena is Rohtak's most complete sports complex — a single destination for cricket, badminton, pickleball, swimming, fitness, kids coaching, and post-game dining.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Slots
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              View Memberships
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          A Complete Sports Complex for Rohtak Families
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Rohtak needed a proper multi-sport complex. Red Ball Sports Arena fills that gap. Our facility brings together sports courts, aquatic facilities, fitness infrastructure, and structured coaching — creating a venue families can rely on for daily training and weekend recreation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { num: '5+', label: 'Sports Disciplines' },
            { num: '7 Days', label: 'Open Every Week' },
            { num: '5 AM', label: 'Early Opening' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#F9F6F1] rounded-xl p-6">
              <div className="text-3xl font-black text-[#C8102E] mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{stat.num}</div>
              <div className="text-xs text-[#0D0D0D]/60 font-semibold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Explore Our Facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak', desc: 'Professional cricket coaching and box cricket ground.' },
              { label: 'Badminton Court', to: '/badminton-court-rohtak', desc: 'Wooden-floored courts with coaching available.' },
              { label: 'Pickleball Court', to: '/pickleball-court-rohtak', desc: 'Dedicated pickleball courts — a growing sport now available in Rohtak.' },
              { label: 'Swimming Pool', to: '/swimming-pool-rohtak', desc: 'Clean, maintained pool open year-round.' },
              { label: 'Gym', to: '/gym-in-rohtak', desc: 'Modern gym for strength and cardio.' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak', desc: 'Structured youth coaching for cricket and badminton.' },
            ].map(item => (
              <Link key={item.label} to={item.to} className="bg-white border border-black/10 rounded-xl p-4 hover:border-[#C8102E]/40 transition-all group">
                <span className="font-semibold text-[#0D0D0D] group-hover:text-[#C8102E] transition-colors text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                <p className="text-xs text-[#0D0D0D]/50 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
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
