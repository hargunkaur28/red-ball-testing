import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is there a kids sports academy accessible from Panipat?',
    a: 'Alchemy 360 Sports Arena in Rohtak is a top-tier kids sports academy approximately 95 km from Panipat — about 90 minutes by road. Families from Panipat make the journey for weekend sessions and special programmes.',
  },
  {
    q: 'What sports does Alchemy 360 teach children who come from Panipat?',
    a: 'Alchemy 360\'s kids programme covers cricket (on the Box 360 circular ground), badminton, pickleball, and swimming. Children from Panipat can enrol in one or multiple sports depending on interest and schedule.',
  },
  {
    q: 'Are weekend batches available for Panipat families at Alchemy 360?',
    a: 'Yes. Weekend batches are specifically popular with families travelling from farther cities like Panipat. A weekend visit allows children to cover multiple sports in one trip.',
  },
  {
    q: 'How do I register my child for the kids sports academy from Panipat?',
    a: 'Call +91 93500 76653 or book online. Alchemy 360\'s team will suggest the best programme and weekend batch to match your schedule and your child\'s age and interest.',
  },
  {
    q: 'Is the 90-minute drive from Panipat to Alchemy 360 worthwhile for a children\'s academy?',
    a: 'Families who make this trip say yes consistently. Alchemy 360 offers a professional, safe, multi-sport environment for children that is genuinely hard to find in the Panipat area. A weekly or fortnightly visit becomes a sports ritual the whole family looks forward to.',
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Multi-Sport',
    areaServed: [
      { '@type': 'City', name: 'Panipat' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Kids Sports Academy Rohtak', path: '/kids-sports-academy-rohtak' },
    { name: 'Kids Sports Academy Panipat', path: '/kids-sports-academy-panipat' },
  ]),
  faqSchema(faqs),
];

export default function KidsSportsAcademyPanipat() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Kids Sports Academy Near Panipat | Alchemy 360 Sports Arena Rohtak"
        description="Kids sports academy near Panipat — Alchemy 360 Sports Arena Rohtak, 95 km / 90 minutes. Weekend batches available. Cricket, badminton, swimming for children. Enrol today."
        canonical="/kids-sports-academy-panipat"
        schema={schema}
      />

      <SportsNav activePath="/kids-sports-academy-panipat" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Kids Sports Academy · Near Panipat</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Kids Sports Academy Near Panipat
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena in Rohtak is 95 km from Panipat — a 90-minute drive that Panipat families make to give their children access to professional sports coaching. Cricket on the Box 360 circular ground, badminton, swimming, and pickleball — all in one place, with coaches who know how to work with young athletes. Weekend batches make it practical even for the longer distance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Enrol Your Child
            </Link>
            <Link to="/sports-academy-panipat" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Sports Academy Near Panipat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Panipat Parents Choose Alchemy 360 for Their Children
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Parents in Panipat who are serious about their children's sports development make the 90-minute drive to Alchemy 360 Sports Arena in Rohtak because the standard of coaching and facilities simply isn't replicated locally. Children train on a unique Box 360 circular cricket ground — open 24/7 and the first of its kind in Rohtak — and develop their swimming, badminton, and pickleball skills in a safe, professional environment. Weekend batches are designed for families travelling from cities like Panipat, allowing children to cover an entire training session — or even multiple sports — in one full-day visit. The journey becomes a family sports outing, not just a drop-off.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Weekend Batches for Long-Distance Families', desc: 'Panipat families make the 90-minute trip worthwhile with full-day weekend visits. Children train in the morning and afternoon, covering multiple sports in a single trip.' },
            { title: 'Box 360 Cricket for Kids', desc: 'The circular Box 360 format teaches fielding, reflexes, and batting skills differently from traditional formats — making it one of the most exciting training environments for young cricketers.' },
            { title: 'Relax After Training + Restaurant', desc: 'After a full day of sport, families eat together at Alchemy 360\'s on-site restaurant before the drive back to Panipat. It turns a training trip into a proper day out.' },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360 Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Kids Sports Academy Rohtak', to: '/kids-sports-academy-rohtak' },
              { label: 'Sports Academy Panipat', to: '/sports-academy-panipat' },
              { label: 'Cricket Academy Rohtak', to: '/cricket-academy-rohtak' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
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
