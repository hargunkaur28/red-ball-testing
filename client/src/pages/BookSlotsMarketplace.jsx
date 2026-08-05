import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import SportCard from '../components/sports/SportCard';
import ComboPlanCard from '../components/sports/ComboPlanCard';
import CourtMembershipCard from '../components/sports/CourtMembershipCard';
import { groupComboFamilies } from '../lib/comboPlans';
import useAuthStore from '../store/authStore';
import Navbar from '../components/home/Navbar';

export default function BookSlotsMarketplace({ embedded = false }) {
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['public-sports'],
    queryFn: () => api.get('/sports/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const allSports = useMemo(
    () => (data?.sports || []).filter((s) => s.name?.toLowerCase() !== 'coaching'),
    [data]
  );

  const sports = allSports;

  const { data: plansData } = useQuery({
    queryKey: ['public-membership-plans'],
    queryFn: () => api.get('/plans').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const comboFamilies = useMemo(
    () => groupComboFamilies(plansData?.plans || []),
    [plansData]
  );

  // Court memberships get their own section — one card per sport, listing that
  // sport's own bands, so prices from two sports never sit side by side.
  const courtSports = useMemo(() => {
    const bySlug = {};
    (plansData?.plans || [])
      .filter((p) => p.isCourtMembership && p.isActive)
      .forEach((p) => {
        const slug = p.sportsIncluded?.[0];
        if (!slug) return;
        if (!bySlug[slug]) bySlug[slug] = { slug, plans: [] };
        bySlug[slug].plans.push(p);
      });
    return Object.values(bySlug);
  }, [plansData]);

  const sportsBySlug = useMemo(
    () => Object.fromEntries(allSports.map((s) => [s.slug, s])),
    [allSports]
  );

  const sportLinkPrefix = embedded ? '/user/sports' : '/sports';
  const membershipPath = embedded ? '/user/buy-memberships' : '/book-slots';
  const loading = isLoading;

  const wrapClass = embedded
    ? 'min-h-[60vh] py-8'
    : 'min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16';

  return (
    <div className={`${wrapClass} text-white`} style={{ background: embedded ? 'transparent' : '#0A0D0D' }}>
      {!embedded && <Navbar />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p
            className="uppercase tracking-[5px] text-[12px] text-[#F5A623] mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Facilities
          </p>
          <h1
            className="text-white leading-none mb-3"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              letterSpacing: '1px',
            }}
          >
            Choose Your Sport
          </h1>
          <p className="text-white/45 text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Book a facility by the hour or grab a membership for unlimited play.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-white/30 py-12">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading sports...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && sports.length === 0 && (
          <div className="text-center py-20 text-white/25">
            <Search size={36} className="mx-auto mb-4 opacity-40" />
            <p className="text-base font-semibold">No active sports available right now.</p>
            <p className="text-sm mt-1">Check back soon — new facilities are being added.</p>
          </div>
        )}

        {/* Sport grid */}
        {!loading && sports.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/30 text-xs uppercase tracking-[4px] font-bold mb-1">
                  All Facilities
                </p>
                <h2
                  className="text-white font-black text-xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
                >
                  {sports.length} Sport{sports.length !== 1 ? 's' : ''} Available
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sports.map((sport, i) => (
                <motion.div
                  key={sport._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <SportCard sport={sport} linkPrefix={sportLinkPrefix} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Combo packages */}
        {!loading && comboFamilies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-12"
          >
            <div className="mb-6">
              <p className="text-white/30 text-xs uppercase tracking-[4px] font-bold mb-1">
                Bundles
              </p>
              <h2
                className="text-white font-black text-xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
              >
                Combo Memberships
              </h2>
              <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                One membership, multiple facilities — for less than booking each separately.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {comboFamilies.map((family, i) => (
                <motion.div
                  key={family.baseName}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ComboPlanCard
                    family={family}
                    sportsBySlug={sportsBySlug}
                    linkTo={
                      family.entryPlan
                        ? `${membershipPath}?plan=${family.entryPlan._id}`
                        : membershipPath
                    }
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}


        {/* Court memberships */}
        {!loading && courtSports.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <div className="mb-6">
              <p className="text-white/30 text-xs uppercase tracking-[4px] font-bold mb-1">
                Private Court
              </p>
              <h2
                className="text-white font-black text-xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
              >
                Court Memberships
              </h2>
              <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Reserve the whole court to yourself for one hour a day, within your chosen time band — one flat monthly price, no hourly fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {courtSports.map((entry, i) => (
                <motion.div
                  key={entry.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <CourtMembershipCard
                    sport={sportsBySlug[entry.slug]}
                    plans={entry.plans}
                    membershipPath={membershipPath}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Membership upsell banner */}
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.04) 100%)',
              border: '1px solid rgba(245,166,35,0.2)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: '#F5A623' }}
            />
            <div className="relative z-10">
              <p className="text-[#F5A623] font-black text-xl leading-tight mb-1">
                Play Unlimited. Pay Once.
              </p>
              <p className="text-white/50 text-sm">
                Get a membership and enjoy unlimited access to all our world-class facilities.
              </p>
            </div>
            <Link
              to={isAuthenticated ? '/user/buy-memberships' : '/book-slots'}
              className="relative z-10 px-7 py-3 rounded-xl bg-[#F5A623] text-black font-black text-sm uppercase tracking-wider hover:bg-[#E09410] transition-colors shrink-0 whitespace-nowrap shadow-lg"
              style={{ boxShadow: '0 6px 20px rgba(245,166,35,0.25)' }}
            >
              View Memberships
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
