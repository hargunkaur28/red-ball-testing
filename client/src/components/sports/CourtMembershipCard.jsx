import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { getSportFallback } from './sportFallbacks';

const fmtBandTime = (hhmm) => {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

// Poster order, not price order — Happy Hours is the odd one out and reads last
const BAND_ORDER = ['morning', 'evening', 'happy-hours'];

// One card per sport, listing that sport's own bands. Splitting per band instead
// put Badminton and Pickleball prices next to each other, which read as mixed up.
export default function CourtMembershipCard({ sport, plans = [], membershipPath = '/buy-membership' }) {
  const slug = sport?.slug || plans[0]?.sportsIncluded?.[0] || '';
  const fallback = getSportFallback(slug);
  const accent = fallback.color || '#C5DB3B';
  const sportName = sport?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
  const thumbnail = sport?.thumbnail || fallback.thumbnail;

  const ordered = [...plans].sort(
    (a, b) => BAND_ORDER.indexOf(a.courtBand?.key) - BAND_ORDER.indexOf(b.courtBand?.key)
  );

  // The header opens this one sport's court page — MembershipPortal groups court
  // plans as "<Sport> Court Memberships", which is what ?sport= matches on.
  const sportHref = `${membershipPath}?sport=${slug}-court-memberships`;

  return (
    <div
      className="rounded-2xl overflow-hidden h-full flex flex-col"
      style={{ background: '#111515', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
    >
      {/* Sport header — opens this sport's court memberships */}
      <Link
        to={sportHref}
        className="group/head relative h-24 sm:h-28 bg-cover bg-center shrink-0 block cursor-pointer"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div className="absolute inset-0 transition-opacity duration-300 group-hover/head:opacity-90" style={{ background: 'linear-gradient(to top, #111515 4%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 px-3.5 pb-2.5 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3
              className="text-white font-black text-lg sm:text-xl leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
            >
              {sportName}
            </h3>
            <p className="text-white/55 text-[10px] sm:text-[11px] font-semibold mt-0.5">
              Whole court · 1 hour a day
            </p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full transition-all duration-300 group-hover/head:gap-1.5"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
          >
            View
            <ChevronRight size={10} />
          </span>
        </div>
      </Link>

      {/* Bands */}
      <div className="p-2.5 sm:p-3 space-y-2 flex-1">
        {ordered.map((plan) => (
          <Link
            key={plan._id}
            to={`${membershipPath}?plan=${plan._id}`}
            className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer active:scale-[0.99] hover:bg-white/[0.07]"
            style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accent}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            }}
          >
            <div className="min-w-0">
              <p className="text-white text-[11px] sm:text-xs font-bold flex items-center gap-1 truncate">
                <Clock size={10} className="shrink-0" style={{ color: accent }} />
                {plan.courtBand?.label}
              </p>
              <p className="text-white/45 text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap">
                {fmtBandTime(plan.courtBand?.startTime)} – {fmtBandTime(plan.courtBand?.endTime)}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <div className="text-right">
                <p className="font-black text-sm sm:text-base leading-none" style={{ color: accent }}>
                  {formatCurrency(plan.price)}
                </p>
                <p className="text-white/30 text-[9px] font-bold uppercase tracking-wider mt-0.5">/month</p>
              </div>
              <ChevronRight
                size={14}
                className="text-white/25 transition-all duration-200 group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
