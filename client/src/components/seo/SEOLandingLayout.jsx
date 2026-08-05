import { Link } from 'react-router-dom';
import Footer from '../home/Footer';
import Navbar from '../home/Navbar';
import { useAcademyInfo } from '../../hooks/useAcademyInfo';

export function CTAStrip() {
  return (
    <div className="bg-[#C5DB3B] py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          Ready to Play? Book Your Slot Today.
        </h2>
        <p className="text-white/80 mb-6 text-sm md:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Alchemy 360 — Rohtak, Haryana. Walk-in welcome, online bookings preferred.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/book-slots" className="bg-white text-[#C5DB3B] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#F9F6F1] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Book Slots
          </Link>
          <Link to="/buy-membership" className="border-2 border-white text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Buy Membership
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FAQSection({ faqs }) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-[#0D0D0D]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {faqs.map((faq, i) => (
          <details key={i} className="border border-black/10 rounded-xl p-5 group open:bg-[#F9F6F1]">
            <summary className="font-semibold text-[#0D0D0D] cursor-pointer list-none flex justify-between items-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {faq.q}
              <span className="ml-4 text-[#C5DB3B] group-open:rotate-45 transition-transform inline-block text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-[#0D0D0D]/70 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactBand() {
  const academy = useAcademyInfo();
  return (
    <div className="bg-[#F9F6F1] border-t border-black/10 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#0D0D0D]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{academy.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📞</span>
          <a href={`tel:${academy.phone.replace(/\s/g, '')}`} className="hover:text-[#C5DB3B] transition-colors">{academy.phone}</a>
        </div>
        <div className="flex items-center gap-2">
          <span>✉️</span>
          <a href={`mailto:${academy.email}`} className="hover:text-[#C5DB3B] transition-colors">{academy.email}</a>
        </div>
      </div>
    </div>
  );
}

export function SportsNav({ activePath }) {
  const sports = [
    { label: 'Sports Academy', to: '/sports-academy-rohtak' },
    { label: 'Stadium', to: '/stadium-in-rohtak' },
    { label: 'Badminton', to: '/badminton-court-rohtak' },
    { label: 'Badminton Academy', to: '/badminton-academy-rohtak' },
    { label: 'Badminton Coaching', to: '/badminton-coaching-rohtak' },
    { label: 'Pickleball', to: '/pickleball-court-rohtak' },
    { label: 'Gym', to: '/gym-in-rohtak' },
    { label: 'Sports Club', to: '/sports-club-rohtak' },
    { label: 'Blog', to: '/blog' },
  ];
  return (
    <nav className="bg-white border-b border-black/10 sticky z-30" style={{ top: 'calc(var(--discount-banner-h, 0px) + 96px)' }} aria-label="Sports pages navigation">
      <div className="max-w-[1280px] mx-auto px-4 overflow-x-auto">
        <ul className="flex gap-1 py-2 min-w-max">
          <li>
            <Link to="/" className="px-3 py-2 rounded-lg text-xs font-semibold text-[#0D0D0D]/60 hover:text-[#C5DB3B] transition-colors whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              ← Home
            </Link>
          </li>
          {sports.map(s => (
            <li key={s.to}>
              <Link
                to={s.to}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${activePath === s.to ? 'bg-[#C5DB3B] text-white' : 'text-[#0D0D0D]/60 hover:text-[#C5DB3B]'}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function SEOLandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white" data-theme="light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div style={{ paddingTop: 'calc(var(--discount-banner-h, 0px) + 96px)' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

