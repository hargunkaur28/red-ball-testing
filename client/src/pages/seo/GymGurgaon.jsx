import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is Alchemy 360 in Rohtak worth visiting for gym from Gurgaon?',
    a: 'For Gurgaon fitness enthusiasts who want a multi-sport experience beyond a city gym, yes. Alchemy 360 is 90 km and 90 minutes from Gurgaon — a full sports complex with gym, badminton, and an on-site restaurant.',
  },
  {
    q: 'How do I drive from Gurgaon to Alchemy 360?',
    a: 'From Gurgaon, take NH-48 towards Delhi and connect to NH-148B or NH-352 towards Rohtak. Alchemy 360 is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — around 90 minutes.',
  },
  {
    q: 'What kind of gym does Alchemy 360 have?',
    a: "Alchemy 360's gymnasium is part of a dedicated sports complex in Rohtak — equipped for strength and fitness training as part of a multi-sport facility. It's designed for athletes and serious gym-goers, not a general commercial fitness chain.",
  },
  {
    q: 'Can Gurgaon gym-goers book a session online before making the drive?',
    a: 'Yes. Online booking is available for gym sessions and sports at Alchemy 360. Gurgaon visitors who book ahead can plan their full day at the complex without walk-in uncertainty.',
  },
  {
    q: 'Is Alchemy 360\'s gym suitable for Gurgaon corporate teams or group fitness trips?',
    a: "Alchemy 360 accommodates group bookings and corporate sports days. Gurgaon companies looking for a fitness and sports outing outside the city find Alchemy 360's multi-sport setup well-suited for team events.",
  },
];

const schema = [
  {
    ...localBusinessSchema,
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    sport: 'Fitness',
    areaServed: [
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Rohtak' },
    ],
  },
  breadcrumbSchema([
    { name: 'Gym Rohtak', path: '/gym-rohtak' },
    { name: 'Gym Gurgaon', path: '/gym-gurgaon' },
  ]),
  faqSchema(faqs),
];

export default function GymGurgaon() {
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Gym Near Gurgaon | Alchemy 360 Rohtak"
        description="Gym near Gurgaon — Alchemy 360, Rohtak, 90 km / 90 min away. Sports-complex gym, online booking, coaching."
        canonical="/gym-gurgaon"
        schema={schema}
      />
      <SportsNav activePath="/gym-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C5DB3B] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gurgaon (Gurugram) has no shortage of gyms, but Alchemy 360 in Rohtak offers something they can't — a gymnasium embedded in a full multi-sport complex, 90 km and 90 minutes away. For Gurgaon fitness and sports enthusiasts who want to swap the city gym for a real sports environment, this drive is one of the best decisions you'll make on a weekend.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C5DB3B] text-[#0A1628] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#96AC2E] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join Gym
            </Link>
            <Link to="/gym-rohtak" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full text-sm hover:border-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Gym Details
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Trade Your City Gym for a Sports Complex Weekend
        </h2>
        <p className="text-[#0D0D0D]/70 text-sm md:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Gurgaon gym-goers who visit Alchemy 360 in Rohtak consistently describe it as a reset from the corporate fitness routine. The gym is in a real sports facility — Box 360 circular badminton and pickleball are all available on the same visit. The 90-minute highway run from Gurgaon on NH-148B is smooth on weekend mornings, and by the time you're done training and eating at the on-site restaurant, you'll understand why Gurgaon visitors make this a regular trip.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Escape the City Gym', desc: "Gurgaon's commercial gyms are fine, but Alchemy 360's gymnasium inside a live sports complex offers a completely different training energy." },
            { title: 'Multi-Sport on One Visit', desc: 'Train in the gym, then play badminton or pickleball. Gurgaon visitors who plan ahead can pack all of it into one Alchemy 360 day.' },
            { title: 'Eat Well, Drive Back', desc: "Alchemy 360's on-site restaurant ensures Gurgaon visitors don't spend time hunting for food after a training session before the 90-minute return drive." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Alchemy 360</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
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
