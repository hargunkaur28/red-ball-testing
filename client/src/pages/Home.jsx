import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CinematicIntro from '../components/CinematicIntro';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import FacilityRentals from '../components/home/FacilityRentals';

import AboutSection from '../components/home/AboutSection';
import ValuesMarquee from '../components/home/ValuesMarquee';
// RESTAURANT DISABLED — see README "Restaurant module (disabled)"
// import FeaturedMenu from '../components/home/FeaturedMenu';
// import RestaurantTeaser from '../components/home/RestaurantTeaser';
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

        {/* RESTAURANT DISABLED — see README "Restaurant module (disabled)"
        <FlowSection id="section-featured-menu" theme="light">
          <FeaturedMenu />
        </FlowSection>
        <FlowSection id="section-restaurant" theme="dark">
          <RestaurantTeaser />
        </FlowSection>
        */}

        <div id="section-about" data-theme="light">
          <AboutSection />
        </div>
        <ValuesMarquee />
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
