import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a pickleball court in Rohtak?',
    a: 'Yes. Alchemy 360 has dedicated pickleball courts in Rohtak. Pickleball is a growing sport in India and Alchemy 360 is one of the few venues in Rohtak where you can play it.',
  },
  {
    q: 'What is pickleball?',
    a: 'Pickleball is a paddle sport combining elements of tennis, badminton, and ping pong. It is played on a smaller court with a perforated plastic ball and is suitable for all ages and fitness levels.',
  },
  {
    q: 'Do I need prior experience to play pickleball at Alchemy 360?',
    a: 'No. Pickleball is easy to learn and welcoming to beginners. Our staff can give you a quick introduction to get started.',
  },
  {
    q: 'Can I rent pickleball equipment at Alchemy 360?',
    a: 'Contact us to check equipment availability. We recommend calling ahead to confirm gear availability for your session.',
  },
  {
    q: 'How do I book a pickleball court in Rohtak?',
    a: 'Book online through our Book Slots page or use the one-time booking option. Walk-ins are welcome based on court availability.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    sport: 'Pickleball',
  },
  breadcrumbSchema([
    { name: 'Sports Arena', path: '/sports-arena-rohtak' },
    { name: 'Pickleball Court Rohtak', path: '/pickleball-court-rohtak' },
  ]),
  faqSchema(faqs),
];

export default function PickleballCourtRohtak() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Pickleball Court in Rohtak | Alchemy 360 Haryana"
        description="Play pickleball in Rohtak at Alchemy 360. Dedicated pickleball courts available for booking. A growing sport now accessible right here in Rohtak, Haryana."
        canonical="/pickleball-court-rohtak"
        schema={schema}
      />

      <SportsNav activePath="/pickleball-court-rohtak" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pickleball · Rohtak, Haryana</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Pickleball Court in Rohtak
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 has dedicated pickleball courts in Rohtak. Pickleball is one of the fastest-growing sports in India — and now you can play it right here without travelling far. Perfect for all ages and fitness levels.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/sports/pickleball" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book Pickleball Court
            </Link>
            <Link to="/buy-membership?sport=pickleball" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Get a Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          What is Pickleball?
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Pickleball combines the best elements of tennis, badminton, and table tennis. Played on a smaller court with a paddle and a perforated plastic ball, it's fast, social, and accessible. It's taking off across India — and Rohtak now has a proper venue for it at Alchemy 360.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Easy to Learn', desc: 'Pickleball is one of the fastest sports to pick up, making it great for players of all backgrounds.' },
            { title: 'All Ages Welcome', desc: 'From teenagers to seniors, pickleball is a low-impact, high-fun sport for everyone.' },
            { title: 'Great for Fitness', desc: 'Short rallies, quick movements — pickleball is a surprisingly good cardio workout.' },
            { title: 'Growing Community', desc: 'Join a growing community of pickleball players in Rohtak and Haryana.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More Sports at Alchemy 360, Rohtak</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Badminton Courts', to: '/badminton-court-rohtak' },
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
