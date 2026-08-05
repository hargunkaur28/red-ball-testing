import { useEffect, useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, User, Mail, Phone, Crown, Check, Star, CalendarCheck, ChevronRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/axios';
import { formatCurrency } from '../lib/utils';
import { isComboPlan, stripTierSuffix } from '../lib/comboPlans';
import { planHasNoSlots } from '../lib/planSlots';
import useAuthStore from '../store/authStore';
import { queryClient } from '../lib/queryClient';
import PhoneCollectModal from '../components/shared/PhoneCollectModal';
import SportsCarousel from '../components/sports/SportsCarousel';
import MembershipSlotBookingModal from '../components/sports/MembershipSlotBookingModal';
import { getSportFallback } from '../components/sports/sportFallbacks';

const validPhone = (p) => /^[6-9]\d{9}$/.test(String(p || '').replace(/\D/g, '')) ? String(p).replace(/\D/g, '') : '';

// Same duration badges the sport-detail plan cards use, so a plan reads the
// same whether it's picked here or on /sports/:slug.
const DURATION_LABEL = {
  '1 Month': { short: '1 Month', badge: null },
  '3 Months': { short: '3 Month', badge: 'Popular' },
  '6 Months': { short: '6 Month', badge: 'Best Value' },
  '1 Year': { short: '1 Year', badge: 'Max Savings' },
};

// The page shows one plan family at a time — whichever the visitor arrived for.
// This is the family shown when the URL names none. '' falls through to the whole
// catalogue, which is what a bare "View Plans" link should show; naming a family
// here silently hides every other plan from anyone who arrives without ?sport=.
const DEFAULT_GROUP = '';

const slugify = (s = '') => String(s).trim().toLowerCase().replace(/\s+/g, '-');

const fmtBandTime = (hhmm) => {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

const MEMBERSHIP_PERKS = [
  { title: 'Unlimited Access', desc: 'Play as much as you want without hourly fees.' },
  { title: 'Priority Bookings', desc: 'Reserve courts and turf slots before non-members.' },
  { title: 'Member Events', desc: 'Exclusive invites to tournaments and social events.' },
  { title: 'Restaurant Discounts', desc: 'Enjoy 15% off at the academy café & restaurant.' },
];

// Which selector tab a plan belongs to. Combo packages get their own group —
// grouping them under sportsIncluded[0] would bury "Gym + Badminton" inside the
// plain "Gym" tab alongside unrelated durations.
function planGroupName(plan) {
  if (isComboPlan(plan)) return stripTierSuffix(plan.name);
  if (!plan.sportsIncluded?.length) return 'Other';
  const first = plan.sportsIncluded[0] || 'Other';
  const sportLabel = first.charAt(0).toUpperCase() + first.slice(1);
  // Court plans are their own product, and each sport gets its own group — one
  // combined "Court Memberships" list put badminton and pickleball prices in the
  // same column, which reads as though they'd been mixed up.
  if (plan.isCourtMembership) return `${sportLabel} Court Memberships`;
  return sportLabel;
}

const isCourtGroup = (group) => group.plans?.some((p) => p.isCourtMembership);

export default function MembershipPortal({ embedded = false }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user, isAuthenticated, checkAuth, googleAuth } = useAuthStore();

  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [bookingMembership, setBookingMembership] = useState(null);

  const googleButtonRef = useCallback((node) => {
    if (!node) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !node) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          if (!credential) return;
          try {
            await googleAuth(credential);
            toast.success('Signed in with Google.');
            if (!embedded) {
              navigate('/user/buy-memberships');
            }
          } catch (err) {
            toast.error(err.response?.data?.message || 'Google sign-in failed');
          }
        },
      });
      node.innerHTML = '';
      window.google.accounts.id.renderButton(node, {
        theme: 'filled_black',
        size: 'large',
        type: 'standard',
      });
    };

    if (window.google?.accounts?.id) {
      renderGoogleButton();
    } else {
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existing) {
        existing.addEventListener('load', renderGoogleButton);
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = renderGoogleButton;
        document.body.appendChild(script);
      }
    }
  }, [googleAuth]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ['public-membership-plans'],
    queryFn: () => api.get('/plans').then((r) => r.data),
  });

  // Memberships this visitor already holds — they get a "Book Now" entry point
  // instead of having to go via /user/membership to use what they've paid for.
  const { data: myMembershipsData } = useQuery({
    queryKey: ['my-memberships', user?.id],
    queryFn: () => api.get(`/memberships/${user.id}`).then((r) => r.data),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const activeMemberships = useMemo(() => {
    const now = new Date();
    return (myMembershipsData?.memberships || []).filter(
      (m) => m.status === 'active' && (!m.endDate || new Date(m.endDate) >= now)
    );
  }, [myMembershipsData]);

  const activePlans = useMemo(() => {
    return (plansData?.plans || []).filter(p => ['1 Month', '3 Months', '6 Months', '1 Year'].includes(p.duration));
  }, [plansData]);

  // Group plans by sport
  const groupedPlans = useMemo(() => {
    const groups = {};
    activePlans.forEach(plan => {
      const groupName = planGroupName(plan);
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(plan);
    });

    // Sort plans in each group by duration/price
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.price - b.price);
    });

    return groups;
  }, [activePlans]);

  // Only the family the visitor arrived for is shown: the combo cards on the home
  // page and /sports/:slug deep-link ?plan=<id>, the dashboard tiles link ?sport=.
  const planParam = searchParams.get('plan');
  const sportParam = searchParams.get('sport');

  const planGroups = useMemo(() => {
    const all = Object.keys(groupedPlans)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ name, plans: groupedPlans[name] }));

    const byPlan = planParam && all.find((g) => g.plans.some((p) => p._id === planParam));
    if (byPlan) return [byPlan];

    // ?sport=court-memberships is the catch-all the homepage strip links to —
    // it shows every sport's court groups rather than one specific sport's.
    if (sportParam && slugify(sportParam) === 'court-memberships') {
      const courtGroups = all.filter(isCourtGroup);
      if (courtGroups.length) return courtGroups;
    }

    const bySport = sportParam && all.find((g) => slugify(g.name) === slugify(sportParam));
    if (bySport) return [bySport];

    const byDefault = all.filter((g) => slugify(g.name) === DEFAULT_GROUP);
    // Fall through to the full catalogue if the URL names nothing we recognise and
    // the default family has been renamed, so this page can't end up empty.
    return byDefault.length ? byDefault : all;
  }, [groupedPlans, planParam, sportParam]);

  const visiblePlans = useMemo(() => planGroups.flatMap((g) => g.plans), [planGroups]);

  // Within the shown family, ?plan= picks the exact tier; otherwise the cheapest.
  useEffect(() => {
    if (visiblePlans.length === 0) return;
    if (selectedPlanId && visiblePlans.some((p) => p._id === selectedPlanId)) return;

    const target = planParam && visiblePlans.find((p) => p._id === planParam);
    setSelectedPlanId(target ? target._id : visiblePlans[0]._id);
  }, [visiblePlans, selectedPlanId, planParam]);

  const selectedPlan = useMemo(() => {
    return visiblePlans.find((p) => p._id === selectedPlanId);
  }, [visiblePlans, selectedPlanId]);

  // The selected plan's group drives the hero art and accent colour, the same way
  // the sport slug does on /sports/:slug. Combo groups fall through to the default.
  const activeGroup = selectedPlan ? planGroupName(selectedPlan) : planGroups[0]?.name || '';
  // A single-sport package ("Badminton Coaching") has no fallback entry of its own,
  // so borrow its sport's art rather than dropping to the generic default. Multi-sport
  // packages have no one sport to represent them and keep the default.
  const heroKey = (selectedPlan?.sportsIncluded?.length === 1
    ? selectedPlan.sportsIncluded[0]
    : activeGroup) || '';
  const fallback = getSportFallback(heroKey);
  const accentColor = fallback.color || '#C5DB3B';
  const heroImage = fallback.heroImage;
  const heroChips = fallback.chips?.length
    ? fallback.chips
    : ['Unlimited Access', 'Priority Booking', 'Member Perks'];
  const backHref = embedded ? '/user/book-slots' : '/book-slots';

  const relevantActiveMemberships = useMemo(() => {
    if (!activeMemberships.length) return [];

    return activeMemberships.filter((m) => {
      const p = m.planId;
      if (!p) return false;

      // Gym-only plans are walk-in — a "Book Now" button would dead-end on an
      // empty slot list. Combos containing gym still qualify via their other sport.
      if (planHasNoSlots(p)) return false;

      // 1. If explicit ?plan= parameter exists in URL
      if (planParam && (String(p._id) === String(planParam) || String(p.id) === String(planParam))) {
        return true;
      }

      // 2. If explicit ?sport= parameter exists in URL (e.g. ?sport=pickleball)
      if (sportParam) {
        const sSlug = slugify(sportParam);
        const pGroup = slugify(planGroupName(p));
        const pSports = (p.sportsIncluded || []).map((s) => slugify(s));
        if (pGroup === sSlug || pSports.includes(sSlug) || (p.name || '').toLowerCase().includes(sSlug)) {
          return true;
        }
      }

      // 3. Match against the currently selected plan or plan group
      if (selectedPlanId && (String(p._id) === String(selectedPlanId) || String(p.id) === String(selectedPlanId))) {
        return true;
      }

      const pGroup = planGroupName(p).toLowerCase().trim();
      const currentGroup = (activeGroup || '').toLowerCase().trim();

      if (pGroup && currentGroup && pGroup === currentGroup) {
        return true;
      }

      if (selectedPlan?.name && p.name && p.name.toLowerCase().trim() === selectedPlan.name.toLowerCase().trim()) {
        return true;
      }

      return false;
    });
  }, [activeMemberships, planParam, sportParam, selectedPlanId, selectedPlan, activeGroup]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!selectedPlanId) {
      toast.error('Please select a membership plan.');
      return;
    }
    // Sign-in required for every membership type — the API rejects anonymous buyers,
    // so stop here rather than opening Razorpay on a purchase that cannot complete.
    if (!isAuthenticated) {
      toast.error('Please sign in to buy a membership.');
      return;
    }
    if (!user?.phone) {
      setShowPhoneModal(true);
      return;
    }
    if (!scriptLoaded || !window.Razorpay) {
      toast.error('Payment gateway is still loading. Please try again.');
      return;
    }

    setSubmitting(true);
    try {
      const { data: orderRes } = await api.post('/memberships/public-purchase', {
        planId: selectedPlanId,
        customerDetails: { name: user.name, email: user.email, phone: user.phone },
      });

      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Failed to initialize order.');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.rzpOrder.amount,
        currency: orderRes.rzpOrder.currency,
        name: 'Alchemy 360',
        description: `Membership: ${selectedPlan.name}`,
        order_id: orderRes.rzpOrder.id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: validPhone(user.phone),
        },
        theme: { color: '#C5DB3B' },
        handler: async (response) => {
          try {
            const { data: verifyRes } = await api.post('/memberships/public-verify', {
              paymentId: orderRes.paymentId,
              planId: selectedPlanId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              customerDetails: { name: user.name, email: user.email, phone: user.phone },
            });

            if (verifyRes.success) {
              if (verifyRes.token) {
                localStorage.setItem('token', verifyRes.token);
                await checkAuth();
              }
              queryClient.invalidateQueries({ queryKey: ['my-membership'] });
              // Surfaces the "Book Now" card for the plan just bought
              queryClient.invalidateQueries({ queryKey: ['my-memberships'] });
              toast.success('Membership purchased successfully!');
              navigate('/user');
            } else {
              toast.error(verifyRes.message || 'Payment verification failed');
            }
          } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed. Contact support.');
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(response.error.description || 'Payment failed.');
        setSubmitting(false);
      });
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setSubmitting(false);
    }
  };

  if (plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0D0D' }}>
        <div className="flex flex-col items-center gap-4 text-white/30">
          <Loader2 size={32} className="animate-spin" />
          <p className="text-sm">Loading membership plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#0A0D0D' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <MembershipSlotBookingModal
        membership={bookingMembership}
        isOpen={!!bookingMembership}
        onClose={() => setBookingMembership(null)}
      />

      <PhoneCollectModal
        open={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={() => setShowPhoneModal(false)}
      />

      {/* Back button */}
      <div className="absolute left-4 top-4 sm:top-6 z-40">
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white/70 hover:text-white transition-all backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={15} />
          All Sports
        </Link>
      </div>

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(360px, 60vh, 580px)' }}>
        <img
          src={heroImage}
          alt={activeGroup || 'Memberships'}
          loading="eager"
          onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0D] via-[#0A0D0D]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D0D]/60 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-5 sm:pb-8 pt-20 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-[2px] uppercase mb-3"
            style={{ background: `${accentColor}1F`, border: `1px solid ${accentColor}45`, color: accentColor }}
          >
            <Crown size={12} />
            <span>Memberships</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Wraps rather than truncates — group names like "Badminton Court
                Memberships" lose their last word to an ellipsis on a phone. */}
            <h1
              className="text-white font-black pr-4"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.1rem, 7vw, 5.5rem)',
                lineHeight: 1.02,
                letterSpacing: '1px',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {activeGroup || 'Join the Club'}
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pr-14 sm:pr-24">
            {heroChips.map((chip) => (
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — what a membership gets you: below the picker on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 space-y-8"
          >
            <div className="space-y-2">
              <p className="uppercase text-xs tracking-[4px] font-semibold" style={{ color: accentColor }}>
                Alchemy 360
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <h2
                  className="text-white text-3xl font-black leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
                >
                  {activeGroup ? `${activeGroup} Membership` : 'Membership Plans'}
                </h2>
                <a
                  href="#booking"
                  className="lg:hidden inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-wide transition-all hover:opacity-90 hover:scale-105 shrink-0"
                  style={{ background: accentColor }}
                >
                  Choose Plan ↑
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill={s <= 4 ? '#F5A623' : 'none'} color={s <= 4 ? '#F5A623' : 'rgba(255,255,255,0.2)'} />
              ))}
              <span className="text-sm text-white/50 ml-1">4.8 · Loved by our members</span>
            </div>

            <p className="text-white/65 leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {fallback.description}
            </p>

            {/* Perks */}
            <div>
              <h3 className="text-white/40 text-xs uppercase tracking-[3px] font-bold mb-4">Membership Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MEMBERSHIP_PERKS.map((perk) => (
                  <div key={perk.title} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
                    >
                      <Check size={12} style={{ color: accentColor }} />
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <p className="text-white/85 text-sm font-bold">{perk.title}</p>
                      <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility highlights for the selected group */}
            {fallback.features?.length > 0 && (
              <div>
                <h3 className="text-white/40 text-xs uppercase tracking-[3px] font-bold mb-4">What's Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fallback.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
                      >
                        <CheckCircle2 size={13} style={{ color: accentColor }} />
                      </div>
                      <span className="text-white/75 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-white/[0.06]" />

            <div
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)' }}
            >
              <span className="text-2xl mt-0.5">🏅</span>
              <div>
                <p className="text-[#F5A623] font-bold text-sm">Members Get More</p>
                <p className="text-white/55 text-xs mt-0.5 leading-relaxed">
                  Unlimited access, priority entry, and attendance tracking — all included with any membership plan.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — the picker: first on mobile, sticky on desktop */}
          <motion.div
            id="booking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2 rounded-3xl p-6 sm:p-8 space-y-8"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <p
              className="text-white/40 text-xs uppercase tracking-[3px] font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Build Your Membership
            </p>

            {/* Already a member — book an included slot instead of buying again */}
            {relevantActiveMemberships.length > 0 && (
              <div
                className="rounded-2xl p-5 space-y-4"
                style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <CalendarCheck size={15} className="text-green-500" />
                  <h3 className="text-white/40 text-xs uppercase tracking-[3px] font-bold">
                    Your Membership{relevantActiveMemberships.length > 1 ? 's' : ''}
                  </h3>
                </div>

                {relevantActiveMemberships.map((m) => (
                  <div key={m._id} className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-white font-black text-sm truncate">{m.planId?.name || 'Active membership'}</p>
                      <p className="text-white/45 text-xs mt-0.5">
                        Slots are included — no payment needed
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingMembership(m)}
                      className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] hover:gap-3"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}BB)`,
                        boxShadow: `0 6px 20px ${accentColor}25`,
                      }}
                    >
                      Book Now
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Every plan, grouped by sport — no picker step */}
            <div className="space-y-10">
              <div className="flex items-center gap-2">
                <span className="text-base">🏅</span>
                <h3 className="text-white/40 text-xs uppercase tracking-[3px] font-bold">Choose Your Plan</h3>
              </div>

              {planGroups.map((group) => (
                <div key={group.name} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h4
                      className="text-white font-black text-xl leading-none shrink-0"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
                    >
                      {group.name}
                    </h4>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.plans.map((plan) => {
                      const meta = DURATION_LABEL[plan.duration] || { short: plan.duration, badge: null };
                      const isSelected = plan._id === selectedPlanId;
                      // Unselected cards keep the neutral gold accent so the page
                      // doesn't turn into a wall of the selected sport's colour.
                      const cardAccent = isSelected ? accentColor : '#F5A623';
                      return (
                        <button
                          key={plan._id}
                          type="button"
                          onClick={() => setSelectedPlanId(plan._id)}
                          className="relative rounded-2xl p-5 text-left flex flex-col gap-3 transition-all duration-300 h-full active:scale-[0.99]"
                          style={{
                            background: isSelected
                              ? `linear-gradient(135deg, ${accentColor}1A 0%, #111515 100%)`
                              : '#111515',
                            border: isSelected ? `1px solid ${accentColor}` : '1px solid rgba(255,255,255,0.06)',
                            boxShadow: isSelected ? `0 8px 32px ${accentColor}20` : '0 4px 16px rgba(0,0,0,0.3)',
                          }}
                        >
                          {meta.badge && (
                            <div
                              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 whitespace-nowrap text-white"
                              style={{ background: meta.badge === 'Popular' ? accentColor : '#F5A623' }}
                            >
                              {meta.badge === 'Popular' && <Sparkles size={9} />}
                              {meta.badge}
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Crown size={13} style={{ color: cardAccent }} />
                              <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-bold">
                                {plan.duration}
                              </span>
                            </div>
                            <p className="text-white font-black text-lg leading-tight pr-6">
                              {/* The group heading already names the sport, so a court
                                  card only needs its band ("Happy Hours") */}
                              {plan.isCourtMembership && plan.courtBand?.label
                                ? plan.courtBand.label
                                : plan.name}
                            </p>
                            {/* Court plans all read "1 Month" — the band is what tells them apart */}
                            {plan.isCourtMembership && plan.courtBand?.startTime && (
                              <div
                                className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-lg"
                                style={{ background: `${cardAccent}1A`, border: `1px solid ${cardAccent}38` }}
                              >
                                <Clock size={10} style={{ color: cardAccent }} />
                                <span className="text-[10px] font-bold" style={{ color: cardAccent }}>
                                  {fmtBandTime(plan.courtBand.startTime)} – {fmtBandTime(plan.courtBand.endTime)}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="font-black text-[26px] leading-none" style={{ color: cardAccent }}>
                            {formatCurrency(plan.price)}
                          </p>

                          {plan.features?.length > 0 && (
                            <ul className="space-y-1.5 mt-auto">
                              {plan.features.slice(0, 3).map((f) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-white/55">
                                  <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                    style={{
                                      background: `${cardAccent}26`,
                                      border: `1px solid ${cardAccent}4D`,
                                    }}
                                  >
                                    <Check size={9} style={{ color: cardAccent }} />
                                  </div>
                                  {f}
                                </li>
                              ))}
                            </ul>
                          )}

                          {isSelected && (
                            <div
                              className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: accentColor }}
                            >
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Details + checkout */}
            <form onSubmit={handlePurchase} className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <User size={15} style={{ color: accentColor }} />
                <h3 className="text-white/40 text-xs uppercase tracking-[3px] font-bold">Your Details</h3>
              </div>

              {isAuthenticated ? (
                <div
                  className="rounded-2xl p-4 flex items-center gap-3 mb-6"
                  style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-green-500" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">Logged in: {user?.name}</p>
                    <p className="text-xs text-white/50 truncate">{user?.email}</p>
                  </div>
                </div>
              ) : (
                /* Sign-in required — guest checkout is not supported for any plan type,
                   so collect an identity here rather than contact fields the API rejects. */
                <div className="space-y-3 mb-6">
                  <div
                    className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-sm font-bold text-white mb-1">Sign in to continue</p>
                    <p className="text-xs text-white/55 leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Memberships are tied to your account so your QR entry, bookings and renewals all stay in one place.
                    </p>
                    <div ref={googleButtonRef} className="w-full flex justify-center" />
                    <Link
                      to={`/login?redirectTo=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                      className="mt-4 inline-block text-xs font-bold text-[#C5DB3B] hover:underline"
                    >
                      Sign in with email instead
                    </Link>
                  </div>
                </div>
              )}

              {selectedPlan && (
                <div
                  className="rounded-2xl p-5 space-y-3 text-sm mb-4"
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-white/50 font-bold">Plan</span>
                    <span className="text-white text-right">{selectedPlan.name} ({selectedPlan.duration})</span>
                  </div>
                  <div className="flex justify-between items-center font-black text-lg pt-3 border-t border-white/5">
                    <span className="text-white">Total</span>
                    <span style={{ color: accentColor }}>{formatCurrency(selectedPlan.price)}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedPlanId}
                className="w-full py-4 rounded-xl flex flex-col items-center justify-center text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}BB)`,
                  boxShadow: `0 6px 20px ${accentColor}25`,
                }}
              >
                {submitting ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <div className="flex items-center gap-3 font-black text-sm uppercase tracking-wider">
                      <Sparkles size={16} />
                      <span>Pay &amp; Subscribe</span>
                    </div>
                    <span className="text-[10px] text-white/70 mt-1 uppercase tracking-[0.2em] font-bold">
                      Secured by Razorpay
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom explore section */}
      <ExploreFacilitiesSection embedded={embedded} />
    </div>
  );
}

function ExploreFacilitiesSection({ embedded }) {
  const { data: sportsData } = useQuery({
    queryKey: ['public-sports'],
    queryFn: () => api.get('/sports/public').then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });

  const sports = useMemo(
    () => (sportsData?.sports || []).filter((s) => s.name?.toLowerCase() !== 'coaching'),
    [sportsData]
  );

  if (!sports.length) return null;

  const sportLinkPrefix = embedded ? '/user/sports' : '/sports';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="mb-6">
        <p className="text-white/30 text-xs uppercase tracking-[4px] font-bold mb-1">Explore More</p>
        <h3
          className="text-white font-black text-2xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
        >
          Our Facilities
        </h3>
        <p className="text-white/45 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Every facility your membership can unlock.
        </p>
      </div>
      <SportsCarousel sports={sports} linkPrefix={sportLinkPrefix} showArrows />
    </section>
  );
}