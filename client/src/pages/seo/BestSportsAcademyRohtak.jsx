import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'What makes Red Ball the best sports academy in Rohtak?',
    a: 'Red Ball Sports Arena combines professional infrastructure, expert coaching across multiple sports, flexible membership options, digital booking, and a kids sports academy — making it the most complete sports facility in Rohtak.',
  },
  {
    q: 'Which sports can I learn at Red Ball Academy Rohtak?',
    a: 'You can train in cricket (box cricket), badminton, pickleball, swimming, and fitness/gym. Kids programs are available for cricket and badminton.',
  },
  {
    q: 'Is Red Ball Academy good for beginners?',
    a: 'Yes. Our coaches work with all skill levels, from first-timers to competitive players. We offer beginner batches for kids and adults in multiple sports.',
  },
  {
    q: 'What membership options are available?',
    a: "We offer monthly, quarterly, and annual memberships, as well as one-time slot bookings for those who don't want a commitment.",
  },
  {
    q: 'Is there parking available at Red Ball Sports Arena?',
    a: 'Yes, parking is available at the facility. Our location on Jhajjar Road, Sector 22-D, Rohtak provides easy road access.',
  },
];

const schema = [
  localBusinessSchema,
  breadcrumbSchema([{ name: 'Best Sports Academy Rohtak', path: '/best-sports-academy-rohtak' }]),
  faqSchema(faqs),
];

export default function BestSportsAcademyRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Best Sports Academy in Rohtak | Red Ball Sports Arena"
        description="Red Ball Sports Arena is the best sports academy in Rohtak, Haryana. Multi-sport facility with cricket, badminton, pickleball, swimming, gym & kids programs. Book online."
        canonical="/best-sports-academy-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/best-sports-academy-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rohtak's Top Sports Destination</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Best Sports Academy in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena stands out as Rohtak's most comprehensive sports facility. With multi-sport infrastructure, expert coaches, digital access, and a family-friendly environment, it's the clear choice for serious players and casual enthusiasts alike.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports-academy-rohtak" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Explore Academy
            </Link>
            <Link to="/buy-membership" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Now
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          What Sets Red Ball Apart
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🏟️', title: 'Multi-Sport Infrastructure', desc: 'Cricket, badminton, pickleball, swimming, and gym — all in one location in Rohtak.' },
            { icon: '👨‍🏫', title: 'Expert Coaching', desc: 'Experienced coaches across disciplines for both kids and adults, beginner to advanced.' },
            { icon: '📱', title: 'Digital Booking', desc: 'Book any court or slot online in minutes. No phone calls, no waiting.' },
            { icon: '🎓', title: "Kids' Academy", desc: 'Dedicated youth programs for cricket and badminton with age-appropriate coaching.' },
            { icon: '💳', title: 'Flexible Memberships', desc: 'Monthly, quarterly, and annual plans to suit any budget and schedule.' },
            { icon: '🍽️', title: 'On-Site Restaurant', desc: 'Refuel after your session at our in-house restaurant.' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4 p-5 border border-black/10 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-bold text-[#0D0D0D] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-[#0D0D0D]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F6F1] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            Explore All Sports at Red Ball Academy Rohtak
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cricket Academy', to: '/cricket-academy-rohtak' },
              { label: 'Box Cricket', to: '/box-cricket-rohtak' },
              { label: 'Badminton', to: '/badminton-court-rohtak' },
              { label: 'Pickleball', to: '/pickleball-court-rohtak' },
              { label: 'Swimming', to: '/swimming-pool-rohtak' },
              { label: 'Gym', to: '/gym-in-rohtak' },
              { label: "Kids' Academy", to: '/kids-sports-academy-rohtak' },
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
