import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, GraduationCap, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { getSportFallback } from './sportFallbacks';

/**
 * Public card for a combo / specialty membership package.
 *
 * A combo isn't a sport, so it has no /sports/:slug page — the card links
 * straight into the membership portal with the package preselected.
 */
export default function ComboPlanCard({ family, sportsBySlug = {}, linkTo }) {
  const { baseName, slugs = [], fromPrice, monthlyPlan } = family;

  // Borrow the first included sport's artwork so combos look native alongside
  // the sport cards, preferring a real uploaded thumbnail over the fallback.
  const leadSlug = slugs[0];
  const fallback = getSportFallback(leadSlug || baseName);
  const thumbnail = family.image || sportsBySlug[leadSlug]?.thumbnail || fallback.thumbnail;
  const accentColor = fallback.color || '#C5DB3B';

  const sportName = (slug) => sportsBySlug[slug]?.name || slug;
  const priceValue = monthlyPlan
    ? `${formatCurrency(monthlyPlan.price)}/mo`
    : fromPrice
    ? formatCurrency(fromPrice)
    : 'View Plans';

  const isCoaching = baseName.toLowerCase().includes('coaching');
  const isMultiSportCombo = slugs.length > 1;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-full sm:w-72"
    >
      <Link
        to={linkTo}
        className="group block relative h-[270px] sm:h-96 rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer select-none"
        style={{
          backgroundImage: `url(${thumbnail})`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90 group-hover:to-black/80 transition-colors duration-500" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: `linear-gradient(to top, ${accentColor} 0%, transparent 60%)` }}
        />

        {/* Top row: badge + price */}
        <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-1 z-10 min-w-0">
          <div
            className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-md shrink-0"
            style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            {isMultiSportCombo ? (
              <>
                <Layers size={9} className="sm:w-2.5 sm:h-2.5" /> Combo
              </>
            ) : isCoaching ? (
              <>
                <GraduationCap size={9} className="sm:w-2.5 sm:h-2.5" /> Coaching
              </>
            ) : (
              <>
                <Sparkles size={9} className="sm:w-2.5 sm:h-2.5" /> Specialty
              </>
            )}
          </div>
          <div
            className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full shadow-lg backdrop-blur-md shrink-0 text-right leading-none flex flex-col sm:flex-row items-end sm:items-center"
            style={{ background: `#C5DB3B`, color: '#0A1628' }}
          >
            <span className="text-[6.5px] sm:text-[9px] opacity-75 font-bold uppercase tracking-wider leading-none mb-0.5 sm:mb-0 sm:mr-1">
              From
            </span>
            <span className="text-[9.5px] sm:text-[11px] font-black leading-none whitespace-nowrap">{priceValue}</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-5 z-10 flex flex-col justify-end">
          <p className="hidden sm:block text-white/50 text-[11px] uppercase tracking-[3px] mb-1 font-semibold">
            {slugs.length > 1 ? `${slugs.length} sports, one membership` : 'Specialty package'}
          </p>
          <h3
            className="text-white text-base sm:text-2xl font-black leading-tight mb-1.5 sm:mb-2 line-clamp-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.5px' }}
          >
            {baseName}
          </h3>

          {/* Included sports */}
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {slugs.map((slug) => (
              <span
                key={slug}
                className="text-[7px] sm:text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                {sportName(slug)}
              </span>
            ))}
          </div>

          <div
            className="inline-flex items-center justify-center sm:justify-start gap-1 text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-300 group-hover:gap-2.5 w-fit"
            style={{
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}50`,
              color: accentColor,
            }}
          >
            Get Plan
            <ArrowRight size={10} className="sm:w-3 sm:h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
