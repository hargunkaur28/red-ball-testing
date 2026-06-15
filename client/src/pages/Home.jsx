import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Users, CreditCard, CalendarDays, ArrowRight } from 'lucide-react';
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
const KIDS_SPORTS = ['badminton', 'cricket'];

const FEATURE_CHIPS = [
  { Icon: Users, label: 'Dedicated coach included' },
  { Icon: CreditCard, label: 'One-time admission fee' },
  { Icon: CalendarDays, label: 'Flexible monthly plans' },
];

function SportCard({ sport }) {
  const img = sport?.imageUrl || sport?.heroImage || sport?.image || sport?.thumbnail;
  const name = sport?.name || '';

  return (
    <div
      className="relative w-[130px] h-[172px] sm:w-[148px] sm:h-[196px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 shrink-0"
      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {img ? (
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.04)' }} />
      )}
      {/* gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.18) 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-white text-[11px] font-black uppercase tracking-[0.14em] leading-tight">{name}</p>
      </div>
    </div>
  );
}

function KidsAcademyBanner() {
  const { data: sportsData } = useQuery({
    queryKey: ['public-sports'],
    queryFn: () => api.get('/sports/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const kidsSports = useMemo(() => {
    const all = sportsData?.sports || [];
    return KIDS_SPORTS.map(
      (slug) => all.find((s) => s.name?.toLowerCase().includes(slug)) ?? { name: slug, _id: slug }
    );
  }, [sportsData]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0C0F0F 0%, #101414 100%)' }}
    >
      {/* subtle red glow top-right */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,16,46,0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-22">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Sport image cards */}
          <div className="flex gap-4 shrink-0 order-2 lg:order-1">
            {kidsSports.map((sport) => (
              <SportCard key={sport._id || sport.name} sport={sport} />
            ))}
          </div>

          {/* Text + CTA */}
          <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <span
              className="inline-block text-[10px] font-black uppercase tracking-[0.28em] mb-5 px-3 py-1 rounded-full"
              style={{ background: 'rgba(200,16,46,0.13)', color: '#F87171', border: '1px solid rgba(200,16,46,0.28)' }}
            >
              For Kids &amp; Beginners
            </span>

            <h2
              className="text-white mb-4 leading-[0.95]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                letterSpacing: '1.5px',
              }}
            >
              Kids Academy
            </h2>

            <p className="text-white/52 text-[15px] max-w-md mx-auto lg:mx-0 leading-relaxed mb-7">
              Structured Badminton &amp; Cricket coaching programmes with a dedicated coach, designed for kids and beginners.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-9">
              {FEATURE_CHIPS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/65"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <Icon size={11} className="text-white/45 shrink-0" />
                  {label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/book-slots?program=kids-academy"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-white shadow-lg shadow-red-950/30 transition-all hover:scale-[1.02] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #C8102E 0%, #8B0B1E 100%)' }}
              >
                Explore Kids Academy
                <ArrowRight size={14} />
              </Link>
              <a
                href="#section-sports"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white/55 transition-all hover:text-white/80"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                View All Sports
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

let hasPlayedIntroThisSession = false;

export default function Home() {
  const [showIntro, setShowIntro] = useState(!hasPlayedIntroThisSession);

  const handleIntroComplete = () => {
    hasPlayedIntroThisSession = true;
    setShowIntro(false);
  };

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
