import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import api from '../../lib/axios';
import SportsCarousel from '../sports/SportsCarousel';
import ComboCarousel from '../sports/ComboCarousel';
import { groupComboFamilies } from '../../lib/comboPlans';
import useAuthStore from '../../store/authStore';

export default function FacilityRentals() {
  const { isAuthenticated } = useAuthStore();

  const { data: sportsData } = useQuery({
    queryKey: ['public-sports'],
    queryFn: () => api.get('/sports/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const { data: plansData } = useQuery({
    queryKey: ['public-membership-plans'],
    queryFn: () => api.get('/plans').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const sports = useMemo(
    () => (sportsData?.sports || []).filter((s) => s.name?.toLowerCase() !== 'coaching'),
    [sportsData]
  );

  const comboFamilies = useMemo(
    () => groupComboFamilies(plansData?.plans || []),
    [plansData]
  );

  const sportsBySlug = useMemo(
    () => Object.fromEntries((sportsData?.sports || []).map((s) => [s.slug, s])),
    [sportsData]
  );

  const membershipPath = isAuthenticated ? '/user/buy-memberships' : '/book-slots';

  return (
    <section id="sports" className="bg-[#0D0D0D] pt-20 md:pt-28 pb-4 md:pb-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p
              className="uppercase tracking-[5px] text-[12px] text-[#F5A623] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              One-Time Play
            </p>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              }}
            >
              Facility Rentals
            </h2>
            <p
              className="text-white/45 text-base mt-3 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book world-class facilities by the hour. No membership needed — just show up and play.
            </p>
          </div>

          <Link
            to={isAuthenticated ? '/user/book-slots' : '/book-slots'}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-[#0A1628] transition-all duration-200 hover:gap-3 shrink-0 group"
            style={{
              background: '#C5DB3B',
              boxShadow: '0 6px 20px rgba(197, 219, 59,0.25)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#96AC2E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#C5DB3B'; }}
          >
            View All Sports
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Sports carousel */}
        {sports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SportsCarousel sports={sports} linkPrefix="/sports" showArrows isMarquee={true} />
          </motion.div>
        )}

        {/* Skeleton placeholders while loading */}
        {!sportsData && (
          <div className="flex gap-5 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-96 rounded-2xl animate-pulse"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
            ))}
          </div>
        )}

        {/* Combo memberships */}
        {comboFamilies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16"
          >
            <div className="mb-6">
              <p
                className="uppercase tracking-[5px] text-[12px] text-[#F5A623] mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Save More
              </p>
              <h3
                className="text-white leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                }}
              >
                Combo Memberships
              </h3>
              <p
                className="text-white/45 text-sm mt-2 max-w-lg"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Bundle multiple facilities into a single membership — cheaper than paying for each one separately.
              </p>
            </div>

            <ComboCarousel
              comboFamilies={comboFamilies}
              sportsBySlug={sportsBySlug}
              membershipPath={membershipPath}
              showArrows
              isMarquee={true}
            />
          </motion.div>
        )}

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5"
          style={{
            background: 'rgba(197, 219, 59,0.06)',
            border: '1px solid rgba(197, 219, 59,0.15)',
          }}
        >
          <div>
            <p className="text-white font-black text-lg">We also offer Court Memberships</p>
            <p className="text-white/45 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Get the whole court to yourself for one hour every day — one flat monthly price, morning, evening or happy hours.
            </p>
          </div>
          <Link
            to={isAuthenticated ? '/user/buy-memberships?sport=court-memberships' : '/buy-membership?sport=court-memberships'}
            className="px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap"
            style={{
              background: 'rgba(245,166,35,0.1)',
              border: '1px solid rgba(245,166,35,0.25)',
              color: '#F5A623',
            }}
          >
            View Court Memberships →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
