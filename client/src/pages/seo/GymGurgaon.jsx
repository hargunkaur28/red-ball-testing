import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { CTAStrip, FAQSection, ContactBand, SportsNav } from '../../components/seo/SEOLandingLayout';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../../components/seo/schemas';

const faqs = [
  {
    q: 'Is Red Ball Sports Arena in Rohtak worth visiting for gym from Gurgaon?',
    a: 'For Gurgaon fitness enthusiasts who want a multi-sport experience beyond a city gym, yes. Red Ball is 90 km and 90 minutes from Gurgaon — a full sports complex with gym, cricket, swimming, badminton, and an on-site restaurant.',
  },
  {
    q: 'How do I drive from Gurgaon to Red Ball Sports Arena?',
    a: 'From Gurgaon, take NH-48 towards Delhi and connect to NH-148B or NH-352 towards Rohtak. Red Ball Sports Arena is at Sector 22-D, Jhajjar Road (near Omaxe), Rohtak — around 90 minutes.',
  },
  {
    q: 'What kind of gym does Red Ball have?',
    a: "Red Ball's gymnasium is part of a dedicated sports complex in Rohtak — equipped for strength and fitness training as part of a multi-sport facility. It's designed for athletes and serious gym-goers, not a general commercial fitness chain.",
  },
  {
    q: 'Can Gurgaon gym-goers book a session online before making the drive?',
    a: 'Yes. Online booking is available for gym sessions and sports at Red Ball. Gurgaon visitors who book ahead can plan their full day at the complex without walk-in uncertainty.',
  },
  {
    q: 'Is Red Ball\'s gym suitable for Gurgaon corporate teams or group fitness trips?',
    a: "Red Ball accommodates group bookings and corporate sports days. Gurgaon companies looking for a fitness and sports outing outside the city find Red Ball's multi-sport setup well-suited for team events.",
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
        title="Gym Near Gurgaon | Red Ball Sports Arena Rohtak"
        description="Gym near Gurgaon — Red Ball Sports Arena, Rohtak, 90 km / 90 min away. Sports-complex gym, Box 360 cricket, swimming pool, online booking, on-site restaurant."
        canonical="/gym-gurgaon"
        schema={schema}
      />
      <SportsNav activePath="/gym-gurgaon" />

      <section className="bg-[#0D0D0D] text-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Gym · Near Gurgaon</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            Gym Near Gurgaon
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gurgaon (Gurugram) has no shortage of gyms, but Red Ball Sports Arena in Rohtak offers something they can't — a gymnasium embedded in a full multi-sport complex, 90 km and 90 minutes away. For Gurgaon fitness and sports enthusiasts who want to swap the city gym for a real sports environment, this drive is one of the best decisions you'll make on a weekend.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-slots" className="bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#a50d26] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          Gurgaon gym-goers who visit Red Ball Sports Arena in Rohtak consistently describe it as a reset from the corporate fitness routine. The gym is in a real sports facility — Box 360 circular cricket, open-air swimming, badminton, and pickleball are all available on the same visit. The 90-minute highway run from Gurgaon on NH-148B is smooth on weekend mornings, and by the time you're done training and eating at the on-site restaurant, you'll understand why Gurgaon visitors make this a regular trip.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Escape the City Gym', desc: "Gurgaon's commercial gyms are fine, but Red Ball's gymnasium inside a live sports complex offers a completely different training energy." },
            { title: 'Multi-Sport on One Visit', desc: 'Train in the gym, then play Box 360 cricket or badminton, or swim. Gurgaon visitors who plan ahead can pack all of it into one Red Ball day.' },
            { title: 'Eat Well, Drive Back', desc: "Red Ball's on-site restaurant ensures Gurgaon visitors don't spend time hunting for food after a training session before the 90-minute return drive." },
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
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>More at Red Ball Sports Arena</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Gym Rohtak', to: '/gym-rohtak' },
              { label: 'Cricket Ground Gurgaon', to: '/cricket-ground-gurgaon' },
              { label: 'Sports Complex Rohtak', to: '/sports-complex-rohtak' },
              { label: 'Swimming Pool Rohtak', to: '/swimming-pool-rohtak' },
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
