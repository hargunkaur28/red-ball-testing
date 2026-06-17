import { motion } from 'framer-motion';
import { getSportFallback } from './sportFallbacks';

export default function SportHeroGallery({ sport }) {
  const fallback = getSportFallback(sport?.slug || sport?.name || '');
  const heroImage = sport?.heroImage || fallback.heroImage;
  const chips = fallback.chips;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(360px, 60vh, 580px)' }}>
      {/* Single hero image */}
      <img
        src={heroImage}
        alt={sport?.name}
        loading="eager"
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0D] via-[#0A0D0D]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D0D]/60 via-transparent to-transparent" />

      {/* Bottom content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-5 sm:pb-8 pt-20 z-10"
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h1
            className="text-white font-black leading-none truncate pr-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              letterSpacing: '1px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {sport?.name}
          </h1>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pr-14 sm:pr-24">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm border"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
