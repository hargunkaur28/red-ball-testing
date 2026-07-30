import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Users, CreditCard, CalendarDays, ArrowRight, Star } from 'lucide-react';
import api from '../lib/axios';
import CinematicIntro from '../components/CinematicIntro';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import FacilityRentals from '../components/home/FacilityRentals';

import AboutSection from '../components/home/AboutSection';
import ValuesMarquee from '../components/home/ValuesMarquee';
import FeaturedMenu from '../components/home/FeaturedMenu';
import RestaurantTeaser from '../components/home/RestaurantTeaser';
import MembershipPlans from '../components/home/MembershipPlans';
import Testimonials from '../components/home/Testimonials';
import HomeBlogSection from '../components/home/HomeBlogSection';
import MotivationalBanner from '../components/home/MotivationalBanner';
import ContactSection from '../components/home/ContactSection';
import Footer from '../components/home/Footer';
import ScrollToTop from '../components/home/ScrollToTop';
import WhatsAppFloat from '../components/home/WhatsAppFloat';
import FloatingScanButton from '../components/home/FloatingScanButton';
import DiscountBanner from '../components/home/DiscountBanner';

function FlowSection({ children, theme = 'dark', id }) {
  return (
    <motion.div
      id={id}
      data-theme={theme}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// ── Kids Academy Banner ───────────────────────────────────────────────────────
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#14532d,#166534)',
  'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
  'linear-gradient(135deg,#4a1942,#7e22ce)',
  'linear-gradient(135deg,#7c2d12,#c2410c)',
  'linear-gradient(135deg,#164e63,#0891b2)',
];

const FEATURE_CHIPS = [
  { Icon: Users,       label: 'Coach included' },
  { Icon: CreditCard,  label: 'Admission fee' },
  { Icon: CalendarDays,label: 'Monthly plans' },
];

function KidsSportCard({ sport, fallbackBg }) {
  const img = sport?.heroImage || sport?.thumbnail;
  const name = sport?.name || '';

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl h-36 sm:h-44 lg:w-[210px] lg:h-[280px]"
      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {img ? (
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: fallbackBg }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 25%, transparent 70%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
        <p className="text-white text-[11px] font-black uppercase tracking-wider">{name}</p>
      </div>
    </div>
  );
}

function KidsAcademyBanner() {
  const { data: kidsData } = useQuery({
    queryKey: ['kids-academy-public'],
    queryFn: () => api.get('/sports/kids-academy/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const kidsSports = kidsData?.sports || [];

  const sportNames = kidsSports.map((s) => s.name);
  const descSports = sportNames.length > 0
    ? sportNames.join(' & ') + ' coaching with a dedicated coach — built for kids and beginners.'
    : 'Multi-sport coaching with a dedicated coach — built for kids and beginners.';

  if (kidsSports.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0C0F0F 0%, #101414 100%)' }}
    >
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197, 219, 59,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">

        {/* ── Desktop: side-by-side ── Mobile: stacked ── */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24">

          {/* Cards — 2-col grid on mobile, side by side on desktop */}
          <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:w-auto lg:gap-4 shrink-0">
            {kidsSports.map((sport, i) => (
              <KidsSportCard
                key={sport._id || sport.slug}
                sport={sport}
                fallbackBg={FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length]}
              />
            ))}
          </div>

          {/* Text + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <span
              className="inline-block text-[10px] font-black uppercase tracking-[0.25em] mb-4 px-3 py-1 rounded-full"
              style={{ background: 'rgba(197, 219, 59,0.13)', color: '#D6E86B', border: '1px solid rgba(197, 219, 59,0.28)' }}
            >
              For Kids &amp; Beginners
            </span>

            <h2
              className="text-white mb-3 leading-[0.95]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                letterSpacing: '1.5px',
              }}
            >
              Kids Academy
            </h2>

            <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed mb-5">
              {descSports}
            </p>

            {/* Chips */}
            <div className="flex flex-row gap-2 justify-center lg:justify-start mb-6 flex-wrap">
              {FEATURE_CHIPS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-white/55 whitespace-nowrap"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={10} className="text-white/35 shrink-0" />
                  {label}
                </span>
              ))}
            </div>

            <Link
              to="/book-slots?program=kids-academy"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black text-sm text-white shadow-lg shadow-[#C5DB3B]/30 transition-all hover:scale-[1.02] active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #C5DB3B 0%, #96AC2E 100%)' }}
            >
              Explore Kids Academy
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function KidsAcademyStrip() {
  return (
    <section className="relative overflow-hidden bg-[#0C0F0F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(197, 219, 59,0.12) 0%, rgba(197, 219, 59,0.04) 60%, transparent 100%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-xl"
            style={{ background: 'rgba(197, 219, 59,0.15)', border: '1px solid rgba(197, 219, 59,0.3)' }}
          >
            🧒
          </div>
          <div>
            <p className="text-white font-black text-base sm:text-lg leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
              Want to train your kids too?
            </p>
            <p className="text-white/45 text-xs sm:text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cricket, swimming, badminton &amp; more — with dedicated coaches for kids.
            </p>
          </div>
        </div>
        <Link
          to="/kids-sports-academy-rohtak"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white whitespace-nowrap shrink-0 transition-all hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #C5DB3B 0%, #96AC2E 100%)', boxShadow: '0 4px 16px rgba(197, 219, 59,0.3)' }}
        >
          Explore Kids Academy <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

let hasPlayedIntroThisSession = false;

export default function Home() {
  const [showIntro, setShowIntro] = useState(!hasPlayedIntroThisSession);
  const location = useLocation();

  const handleIntroComplete = () => {
    hasPlayedIntroThisSession = true;
    setShowIntro(false);
  };

  useEffect(() => {
    if (showIntro || !location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timer);
  }, [location.hash, showIntro]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {!showIntro && <DiscountBanner />}

      {!showIntro && <Navbar />}
      <motion.div
        initial={showIntro ? { opacity: 0, filter: 'blur(20px)', scale: 1.04 } : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: showIntro ? 0.15 : 0 }}
      >
        <HeroSection />
        <FlowSection id="section-sports">
          <FacilityRentals />
        </FlowSection>

        {/* Kids Academy highlight — between sports grid and featured menu */}
        <FlowSection id="section-kids-academy">
          <KidsAcademyBanner />
        </FlowSection>

        <FlowSection id="section-featured-menu" theme="light">
          <FeaturedMenu />
        </FlowSection>
        <FlowSection id="section-restaurant" theme="dark">
          <RestaurantTeaser />
        </FlowSection>

        <div id="section-about" data-theme="light">
          <AboutSection />
        </div>
        <ValuesMarquee />
        <FlowSection id="section-membership" theme="dark">
          <MembershipPlans />
        </FlowSection>
        <Testimonials />
        <HomeBlogSection />
        <MotivationalBanner />
        <ContactSection />
        <Footer />
        <ScrollToTop />
        <WhatsAppFloat />

      </motion.div>
      <FloatingScanButton />
    </div>
  );
}
