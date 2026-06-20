import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, Search, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../lib/axios';
import SportCard from '../components/sports/SportCard';
import useAuthStore from '../store/authStore';
import Navbar from '../components/home/Navbar';

export default function BookSlotsMarketplace({ embedded = false }) {
  const { isAuthenticated } = useAuthStore();
  const [searchParams] = useSearchParams();
  const program = searchParams.get('program'); // e.g. 'kids-academy'
  const isKidsMode = program === 'kids-academy';

  const { data, isLoading } = useQuery({
    queryKey: ['public-sports'],
    queryFn: () => api.get('/sports/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  // Fetch which sport slugs have active kids academy plans (only when needed)
  const { data: kidsData, isLoading: kidsLoading } = useQuery({
    queryKey: ['kids-academy-public-slugs'],
    queryFn: () => api.get('/sports/kids-academy/public').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
    enabled: isKidsMode,
  });

  const allSports = useMemo(
    () => (data?.sports || []).filter((s) => s.name?.toLowerCase() !== 'coaching'),
    [data]
  );

  const sports = useMemo(() => {
    if (!isKidsMode) return allSports;
    const slugs = new Set(kidsData?.slugs || []);
    return allSports.filter((s) => slugs.has(s.slug));
  }, [allSports, isKidsMode, kidsData]);

  const sportLinkPrefix = embedded ? '/user/sports' : '/sports';
  const loading = isLoading || (isKidsMode && kidsLoading);

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
          {isKidsMode ? (
            <>
              {/* Kids Academy mode header */}
              <Link
                to={embedded ? '/user/book-slots' : '/book-slots'}
                className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/60 text-xs font-semibold mb-5 transition-colors"
              >
                <ArrowLeft size={13} /> All Sports
              </Link>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-4 ml-3"
                style={{ background: 'rgba(200,16,46,0.13)', color: '#F87171', border: '1px solid rgba(200,16,46,0.28)' }}
              >
                <GraduationCap size={11} /> For Kids &amp; Beginners
              </div>
              <h1
                className="text-white leading-none mb-3"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  letterSpacing: '1px',
                }}
              >
                Kids Academy
              </h1>
              <p className="text-white/45 text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Structured coaching programmes with a dedicated coach. Select a sport below to get started.
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
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
            {isKidsMode ? (
              <>
                <p className="text-base font-semibold">No Kids Academy sports available yet.</p>
                <p className="text-sm mt-1">Check back soon — programmes are being set up.</p>
              </>
            ) : (
              <>
                <p className="text-base font-semibold">No active sports available right now.</p>
                <p className="text-sm mt-1">Check back soon — new facilities are being added.</p>
              </>
            )}
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
                  {isKidsMode ? 'Kids Academy' : 'All Facilities'}
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

        {/* Kids Academy strip — only in normal mode */}
        {!isKidsMode && !loading && sports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(200,16,46,0.12) 0%, rgba(200,16,46,0.04) 100%)',
              border: '1px solid rgba(200,16,46,0.2)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: '#C8102E' }}
            />
            <div className="relative z-10">
              <p className="text-[#C8102E] font-black text-xl leading-tight mb-1">
                Want to Train Your Kids Too?
              </p>
              <p className="text-white/50 text-sm">
                Cricket, swimming, badminton &amp; more — dedicated coaches for kids &amp; beginners.
              </p>
            </div>
            <Link
              to="/book-slots?program=kids-academy"
              className="relative z-10 px-7 py-3 rounded-xl bg-[#C8102E] text-white font-black text-sm uppercase tracking-wider hover:bg-[#a50d26] transition-colors shrink-0 whitespace-nowrap shadow-lg"
              style={{ boxShadow: '0 6px 20px rgba(200,16,46,0.25)' }}
            >
              Explore Kids Academy
            </Link>
          </motion.div>
        )}

        {/* Membership upsell banner — hide in kids mode (irrelevant) */}
        {!embedded && !isKidsMode && (
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
              to={isAuthenticated ? '/user/buy-memberships' : '/buy-membership'}
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
