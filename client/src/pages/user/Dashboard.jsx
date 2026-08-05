import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../lib/axios';
import useAuthStore from '../../store/authStore';
import { formatCurrency, DISPLAY_SESSION_MINUTES } from '../../lib/utils';
import socket from '../../lib/socket';
import { Trophy, Calendar, Utensils, Clock, AlertTriangle, CheckCircle, QrCode, TimerReset, User, Star, ShieldCheck, Zap, X } from 'lucide-react';
import { toast } from 'sonner';

const formatSessionClock = (milliseconds) => {
  const abs = Math.abs(milliseconds);
  const totalSeconds = Math.max(0, Math.floor(abs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (milliseconds < 0) {
    return `${minutes}m ${String(seconds).padStart(2, '0')}s overtime`;
  }
  if (totalSeconds <= 60) return `${seconds} secs remaining`;
  return `${Math.ceil(totalSeconds / 60)} mins remaining`;
};

export default function UserDashboard() {
  const { user } = useAuthStore();
  const qc = useQueryClient();
  const [now, setNow] = useState(Date.now());
  const [searchParams] = useSearchParams();
  const focus = searchParams.get('focus');

  const { data: membership } = useQuery({
    queryKey: ['my-membership'],
    queryFn: () => api.get(`/memberships/${user.id}`).then(r => r.data),
    enabled: !!user?.id,
  });

  // RESTAURANT DISABLED — see README "Restaurant module (disabled)"
  // const { data: orders } = useQuery({
  //   queryKey: ['my-orders'],
  //   queryFn: () => api.get('/orders/my-orders').then(r => r.data),
  //   enabled: !!user?.id,
  // });

  const { data: sessionData } = useQuery({
    queryKey: ['attendance', 'active-session', user?.id],
    queryFn: () => api.get('/attendance/active-sessions').then(r => r.data),
    enabled: !!user?.id,
    refetchInterval: 5000,
  });

  const { data: passesData, isLoading: passesLoading } = useQuery({
    queryKey: ['my-passes'],
    queryFn: () => api.get('/onetimeaccess/my-passes').then(r => r.data),
    enabled: !!user?.id,
  });

  const { data: slotBookingsData, isLoading: slotBookingsLoading } = useQuery({
    queryKey: ['my-slot-bookings'],
    queryFn: () => api.get('/slots/bookings/my-bookings').then(r => r.data),
    enabled: !!user?.id,
    refetchInterval: 15000,
  });

  const { data: membershipBookingsData, isLoading: membershipBookingsLoading } = useQuery({
    queryKey: ['my-membership-slot-bookings'],
    queryFn: () => api.get('/slots/membership/my-bookings').then(r => r.data),
    enabled: !!user?.id,
    refetchInterval: 30000,
  });

  const passesList = useMemo(() => passesData?.passes || [], [passesData]);
  const slotBookingsList = useMemo(() => {
    const all = slotBookingsData?.bookings || [];
    
    const getBookingSortScore = (booking) => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
      
      const slotDateStr = booking.slotId?.date
        ? new Date(booking.slotId.date).toISOString().slice(0, 10)
        : new Date(booking.createdAt).toISOString().slice(0, 10);
        
      let isPast = false;
      if (slotDateStr < todayStr) {
        isPast = true;
      } else if (slotDateStr === todayStr) {
        const [endH, endM] = (booking.endTime || '0:0').split(':').map(Number);
        if (endH * 60 + endM < nowMin) {
          isPast = true;
        }
      }

      const isUpcoming = !isPast && booking.status === 'confirmed';
      const isCheckedIn = !isPast && booking.status === 'checked-in';
      
      if (isUpcoming) return 1;
      if (isCheckedIn) return 2;
      if (!isPast) return 3;
      return 4;
    };

    return [...all].sort((a, b) => {
      const scoreA = getBookingSortScore(a);
      const scoreB = getBookingSortScore(b);
      if (scoreA !== scoreB) return scoreA - scoreB;
      
      const dateA = a.slotId?.date ? new Date(a.slotId.date) : new Date(a.createdAt);
      const dateB = b.slotId?.date ? new Date(b.slotId.date) : new Date(b.createdAt);
      
      if (scoreA === 4) {
        if (dateA.getTime() !== dateB.getTime()) return dateB - dateA;
        const [ah, am] = (a.startTime || '0:0').split(':').map(Number);
        const [bh, bm] = (b.startTime || '0:0').split(':').map(Number);
        return (bh * 60 + bm) - (ah * 60 + am);
      } else {
        if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
        const [ah, am] = (a.startTime || '0:0').split(':').map(Number);
        const [bh, bm] = (b.startTime || '0:0').split(':').map(Number);
        return (ah * 60 + am) - (bh * 60 + bm);
      }
    });
  }, [slotBookingsData]);
  const hasReferenceBooking = useMemo(() => slotBookingsList.some(b => b.isReference), [slotBookingsList]);

  // Cancelling an upcoming membership slot — same endpoint the membership page uses,
  // allowed right up until the slot's start time.
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const cancelBookingMutation = useMutation({
    mutationFn: (id) => api.delete(`/slots/membership/bookings/${id}/cancel`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-membership-slot-bookings'] });
      setConfirmCancelId(null);
      toast.success('Booking cancelled');
    },
    onError: (e) => {
      setConfirmCancelId(null);
      toast.error(e?.response?.data?.message || 'Cancellation failed');
    },
  });

  const canCancelBooking = (b) => {
    if (b.status !== 'confirmed') return false;
    const slotDate = b.slotId?.date;
    if (!slotDate) return false;
    const [sh, sm] = (b.startTime || '00:00').split(':').map(Number);
    const slotStart = new Date(slotDate);
    slotStart.setHours(sh, sm, 0, 0);
    return new Date() < slotStart;
  };

  const upcomingMembershipBookings = useMemo(() => {
    const all = membershipBookingsData?.bookings || [];
    const todayStr = new Date().toISOString().slice(0, 10);
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    return all
      .filter(b => {
        if (b.status === 'cancelled') return false;
        const slotDate = b.slotId?.date ? new Date(b.slotId.date).toISOString().slice(0, 10) : null;
        if (!slotDate) return false;
        if (slotDate > todayStr) return true;
        if (slotDate === todayStr) {
          const [h, m] = (b.startTime || '0:0').split(':').map(Number);
          return h * 60 + m >= nowMin;
        }
        return false;
      })
      .sort((a, b) => {
        const da = a.slotId?.date || '';
        const db = b.slotId?.date || '';
        if (da !== db) return da < db ? -1 : 1;
        const [ah, am] = (a.startTime || '0:0').split(':').map(Number);
        const [bh, bm] = (b.startTime || '0:0').split(':').map(Number);
        return ah * 60 + am - (bh * 60 + bm);
      });
  }, [membershipBookingsData]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (focus === 'passes' && !passesLoading) {
      setTimeout(() => {
        const element = document.getElementById('my-passes-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast.info('Viewing your purchased access passes.', { id: 'focus-passes-toast' });
        }
      }, 500);
    }
  }, [focus, passesLoading]);

  useEffect(() => {
    const refreshSession = () => {
      qc.invalidateQueries({ queryKey: ['attendance', 'active-session'] });
      qc.invalidateQueries({ queryKey: ['my-passes'] });
      qc.invalidateQueries({ queryKey: ['my-slot-bookings'] });
      qc.invalidateQueries({ queryKey: ['my-membership-slot-bookings'] });
    };
    socket.on('session:started', refreshSession);
    socket.on('session:ended', refreshSession);
    socket.on('attendance:check-in', refreshSession);
    socket.on('attendance:check-out', refreshSession);
    socket.on('attendance:auto-checkout', refreshSession);
    socket.on('dashboard:refresh', refreshSession);
    socket.on('booking:checked-in', refreshSession);
    socket.on('booking:checked-out', refreshSession);
    return () => {
      socket.off('session:started', refreshSession);
      socket.off('session:ended', refreshSession);
      socket.off('attendance:check-in', refreshSession);
      socket.off('attendance:check-out', refreshSession);
      socket.off('attendance:auto-checkout', refreshSession);
      socket.off('dashboard:refresh', refreshSession);
      socket.off('booking:checked-in', refreshSession);
      socket.off('booking:checked-out', refreshSession);
    };
  }, [qc]);

  const activeMemberships = membership?.memberships || (membership?.membership ? [membership.membership] : []);
  const activeSessions = sessionData?.activeSessions || [];
  const activeSession = activeSessions[0];
  const sessionState = useMemo(() => {
    if (!activeSession?.checkInTime) return null;
    
    // Members are always told one hour, regardless of the configured allowance —
    // see DISPLAY_SESSION_MINUTES. The server keeps billing on the real config.
    const displayMinutes = DISPLAY_SESSION_MINUTES;
    const checkInMs = new Date(activeSession.checkInTime).getTime();
    let endsAt;

    if (activeSession.slotBooking && activeSession.slotBooking.endTime) {
      // Booked slot: the court is only theirs until the slot's end time
      const [hours, minutes] = activeSession.slotBooking.endTime.split(':').map(Number);
      const sessionDate = new Date(activeSession.date || activeSession.checkInTime);
      sessionDate.setHours(hours, minutes, 0, 0);
      endsAt = sessionDate.getTime();
    } else {
      // Walk-in (gym): the hour runs from the moment of check-in
      endsAt = checkInMs + displayMinutes * 60000;
    }

    const remainingMs = endsAt - now;
    const remainingMinutes = Math.ceil(Math.max(0, remainingMs) / 60000);
    const overtimeMinutes = Math.max(0, Math.floor((now - endsAt) / 60000));
    const tone = remainingMs <= 0
      ? 'border-red-500/35 bg-red-500/10 text-red-200'
      : remainingMinutes <= 5
        ? 'border-orange-500/35 bg-orange-500/10 text-orange-200'
        : remainingMinutes <= 15
          ? 'border-amber-500/35 bg-amber-500/10 text-amber-200'
          : 'border-green-500/35 bg-green-500/10 text-green-200';
    const message = remainingMs <= 0
      ? 'Overtime charges now active'
      : remainingMinutes <= 5
        ? 'Session ending very soon'
        : remainingMinutes <= 15
          ? 'Session ending soon'
          : 'Session running normally';

    return {
      allowedMinutes: displayMinutes,
      remainingMs,
      overtimeMinutes,
      label: formatSessionClock(remainingMs),
      tone,
      message,
      checkInLabel: new Date(activeSession.checkInTime).toLocaleString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }),
    };
  }, [activeSession, now]);

  const statusConfig = {
    active: { color: 'border-green-500/25 bg-green-500/8 text-green-300', icon: <CheckCircle size={20} />, text: 'Active' },
    pending: { color: 'border-amber-500/25 bg-amber-500/8 text-amber-300', icon: <Clock size={20} />, text: 'Payment Pending' },
    expired: { color: 'border-red-500/25 bg-red-500/8 text-red-300', icon: <AlertTriangle size={20} />, text: 'Expired' },
    frozen: { color: 'border-blue-500/25 bg-blue-500/8 text-blue-300', icon: <Clock size={20} />, text: 'Frozen' },
  };

  return (
    <div className="ota-user-root min-h-screen text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .ota-user-root { font-family: 'Outfit', sans-serif; }
        .ota-card {
          background: #111515;
          border: 1px solid #222A2A;
          border-radius: 24px;
          box-shadow: 0 26px 70px rgba(0,0,0,0.28);
        }
        .ota-soft-card {
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.075);
          border-radius: 18px;
        }
      `}</style>

      <div className="mb-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C5DB3B]">Alchemy 360</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Welcome, {user?.name?.split(' ')[0] || 'Player'}
          </h1>
          {hasReferenceBooking && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
              style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', color: '#fbbf24' }}>
              <ShieldCheck size={12} />
              Reference Guest
            </span>
          )}
        </div>
        <p className="mt-2 text-sm md:text-base text-white/50">Your sport access, passes, sessions, and orders in one place.</p>
      </div>

      {/* Premium Scan QR Entry Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl text-white p-6 md:p-7 mb-8 border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
          activeSession
            ? 'bg-gradient-to-r from-[#2a050b] to-black border-[#C5DB3B]/45'
            : 'bg-gradient-to-r from-[#111515] to-black border-[#222A2A]'
        }`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${
            activeSession
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-[#C5DB3B]/10 border-[#C5DB3B]/30 text-[#C5DB3B] animate-pulse'
          }`}>
            {activeSession ? <TimerReset size={28} /> : <QrCode size={28} />}
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">
              {activeSession ? 'Checkout Required' : 'Smart Sport Entry'}
            </h3>
            <p className="text-sm text-white/50 mt-1">
              {activeSession
                ? `You're checked in for ${activeSession.sport || 'this sport'}. Scan the same sport QR when you leave to check out.`
                : 'Scan the QR code at any sport court (Badminton, Pickleball, Gym) for instant entry validation and automated check-in.'}
            </p>
          </div>
        </div>
        <Link
          to="/user/scan"
          className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all text-center flex items-center justify-center gap-2 ${
            activeSession
              ? 'bg-white/12 border border-white/20 hover:bg-white/18 text-white'
              : 'bg-[#C5DB3B] hover:bg-[#96AC2E] text-[#0A1628]'
          }`}
        >
          <QrCode size={16} /> {activeSession ? 'Scan to Check Out' : 'Scan QR Now'}
        </Link>
      </motion.div>

      {/* Active Sport Session (Standalone - only if not linked to a membership/pass) */}
      {activeSession && sessionState && 
        !activeMemberships.some(m => 
          m._id === activeSession.relatedBookingId || 
          (activeSession.relatedBookingType === 'membership-slot' && activeSession.slotBooking?.membershipId?.toString() === m._id.toString())
        ) && 
        !passesList.some(p => p._id === activeSession.relatedBookingId) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border p-5 mb-8 transition-colors ${sessionState.tone}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <TimerReset size={24} />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider opacity-75">Active Sport Session</p>
                <h3 className="text-xl font-extrabold text-white mt-1">{activeSession.sport || 'Sport'}</h3>
                <p className="text-sm font-semibold mt-1">Checked in: {sessionState.checkInLabel}</p>
                <p className="text-sm mt-1">{sessionState.message}</p>
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-2xl font-black tabular-nums">{sessionState.label}</p>
              <p className="text-xs font-semibold opacity-75 mt-1">Allowed: {sessionState.allowedMinutes} mins</p>
              <Link
                to="/user/scan"
                className="mt-3 inline-flex w-full md:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white/15 transition-colors"
              >
                <QrCode size={15} /> Scan Same QR to Check Out
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Membership — Prominent Action Cards */}
      {activeMemberships.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/40 mb-4">Get Started</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/user/buy-memberships" className="group">
              <div className="ota-card p-5 flex flex-col gap-3 hover:border-[#C5DB3B]/40 transition-all cursor-pointer h-full">
                <div className="w-11 h-11 rounded-xl bg-[#C5DB3B]/10 border border-[#C5DB3B]/25 flex items-center justify-center text-[#C5DB3B] group-hover:bg-[#C5DB3B]/20 transition-colors">
                  <Trophy size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base leading-tight">Buy Sport Membership</h3>
                  <p className="text-xs text-white/45 mt-1">Monthly, quarterly &amp; yearly plans for one or more sports</p>
                </div>
                <span className="mt-auto text-xs font-bold text-[#C5DB3B] group-hover:underline">View Plans →</span>
              </div>
            </Link>
            <Link to="/user/book-slots" className="group">
              <div className="ota-card p-5 flex flex-col gap-3 hover:border-green-500/40 transition-all cursor-pointer h-full">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                  <Calendar size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base leading-tight">Book One-Time Play</h3>
                  <p className="text-xs text-white/45 mt-1">Pay per session — no commitment needed</p>
                </div>
                <span className="mt-auto text-xs font-bold text-green-400 group-hover:underline">Book Now →</span>
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Membership Cards */}
      {activeMemberships.length > 0 && activeMemberships.map((m) => {
          const plan = m?.planId;
          if (!plan) return null;
          const daysLeft = m?.endDate ? Math.max(0, Math.ceil((new Date(m.endDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0;
          const isExpired = m?.status === 'expired' || daysLeft <= 0;
          const isPending = m?.status === 'pending';
          const sc = statusConfig[m?.status] || statusConfig.pending;
          
          return (
            <motion.div key={m._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-6 mb-4 ${sc.color}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
                    <div className="flex items-center gap-1.5 shrink-0">
                      {sc.icon}
                      <span className="text-sm font-bold uppercase">{sc.text}</span>
                    </div>
                    {activeSessions.some(s => s.relatedBookingId === m._id || (s.relatedBookingType === 'membership-slot' && s.slotBooking?.membershipId?.toString() === m._id.toString())) && (
                      <span className={`px-2 py-0.5 shrink-0 whitespace-nowrap rounded text-[10px] font-extrabold uppercase tracking-wider ${sessionState?.tone?.split(' ')[1] || 'bg-green-500/10'} ${sessionState?.tone?.split(' ')[2] || 'text-green-200'} border ${sessionState?.tone?.split(' ')[0] || 'border-green-500/35'} animate-pulse`}>
                        {sessionState?.message === 'Overtime charges now active' ? 'Overtime Active' : 'Currently Checked In'}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-white">{plan?.name || 'No Plan'}</h2>
                    {m.withTraining && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 uppercase tracking-wider font-[Inter] shrink-0">
                        Training Included
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-75 mt-1">
                    {plan?.sportsIncluded?.join(' • ') || 'No sports assigned'}
                  </p>
                </div>
                <div className="text-right">
                  {!isPending && !isExpired && (
                    <>
                      <p className="text-3xl font-bold">{daysLeft}</p>
                      <p className="text-xs opacity-75">days left</p>
                    </>
                  )}
                </div>
              </div>

              {m.endDate && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span>Valid until: {new Date(m.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  {(isExpired || daysLeft <= 7) && (
                    <Link to="/user/membership" className="font-bold underline">Renew Now →</Link>
                  )}
                </div>
              )}

              {isPending && (
                <div className="mt-4 p-3 bg-white/10 rounded-xl">
                  <p className="text-sm font-medium">⚠ Your membership is pending payment. Please contact the reception to complete payment.</p>
                </div>
              )}

              {activeSessions.some(s => s.relatedBookingId === m._id || (s.relatedBookingType === 'membership-slot' && s.slotBooking?.membershipId?.toString() === m._id.toString())) && (
                <div className={`mt-5 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <TimerReset size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">Active Session</p>
                      <h3 className="text-lg font-extrabold text-white leading-tight">{activeSession?.sport || 'Sport'}</h3>
                      <p className="text-xs font-semibold mt-0.5">Checked in: {sessionState?.checkInLabel}</p>
                    </div>
                  </div>
                  <div className="md:text-right w-full md:w-auto">
                    <p className={`text-xl font-black tabular-nums ${sessionState?.tone?.split(' ')[2] || ''}`}>{sessionState?.label}</p>
                    <p className="text-[11px] font-semibold opacity-75 mt-0.5">{sessionState?.message} (Allowed: {sessionState?.allowedMinutes}m)</p>
                    <Link
                      to="/user/scan"
                      className="mt-2 inline-flex w-full md:w-auto items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                    >
                      <QrCode size={14} /> Scan QR to Check Out
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

      {/* Upcoming Membership Slot Bookings */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-extrabold text-white/70 uppercase tracking-wider min-w-0">Upcoming Membership Bookings</h3>
          {upcomingMembershipBookings.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' }}>
              {upcomingMembershipBookings.length} upcoming
            </span>
          )}
        </div>
        {membershipBookingsLoading ? (
          <div className="text-sm text-white/45 py-2">Loading...</div>
        ) : upcomingMembershipBookings.length === 0 ? (
          <div className="ota-card text-center py-7 px-6 border-dashed">
            <p className="text-white/55 text-sm">No upcoming membership bookings.</p>
            <Link to="/user/book-slots" className="text-xs text-violet-400 font-bold mt-1 inline-block hover:underline">
              Book a Slot via Membership →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingMembershipBookings.map((booking) => {
              const slotDate = booking.slotId?.date
                ? new Date(booking.slotId.date).toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })
                : '—';
              const isToday = booking.slotId?.date
                ? new Date(booking.slotId.date).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
                : false;
              const statusColors = {
                confirmed: 'text-green-400',
                'checked-in': 'text-blue-400',
                completed: 'text-white/40',
              };
              const planName = booking.membershipId?.planId?.name || booking.membershipPlanSnapshot || 'Membership';
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ota-soft-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}>
                      <ShieldCheck size={16} className="text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-white truncate">
                          {booking.sportNameSnapshot || 'Sport'}{booking.courtNameSnapshot ? ` · ${booking.courtNameSnapshot}` : ''}
                        </p>
                        <span className="inline-block max-w-full truncate px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}>
                          {planName}
                        </span>
                      </div>
                      <p className="text-xs text-white/45">
                        {isToday ? <span className="text-amber-400 font-semibold">Today</span> : slotDate} · {booking.startTime}–{booking.endTime}
                      </p>
                    </div>
                  </div>
                  {/* Mobile: a wrapped row under the details, separated by a rule.
                      sm+: a right-aligned column beside them. */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5 sm:flex-col sm:items-end sm:justify-center sm:gap-2 sm:pt-0 sm:border-t-0 sm:shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }}>
                      Free
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide shrink-0 ${statusColors[booking.status] || 'text-white/40'}`}>
                      {booking.status}
                    </span>
                    {canCancelBooking(booking) && (
                      confirmCancelId === booking._id ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => cancelBookingMutation.mutate(booking._id)}
                            disabled={cancelBookingMutation.isPending}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-400/25 hover:bg-red-500/25 transition-colors disabled:opacity-60"
                          >
                            {cancelBookingMutation.isPending ? 'Cancelling…' : 'Yes, cancel'}
                          </button>
                          <button
                            onClick={() => setConfirmCancelId(null)}
                            disabled={cancelBookingMutation.isPending}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmCancelId(booking._id)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-white/5 text-white/45 border border-white/10 hover:text-red-300 hover:border-red-400/25 transition-colors shrink-0 ml-auto sm:ml-0"
                        >
                          <X size={10} /> Cancel
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* One-Time Access + Slot Bookings (merged) */}
      <div id="my-passes-section" className="mb-8">
        <h3 className="text-sm font-extrabold text-white/70 uppercase tracking-wider mb-4">My One-Time Bookings</h3>
        {(passesLoading || slotBookingsLoading) ? (
          <div className="text-sm text-white/45 py-2">Loading bookings...</div>
        ) : passesList.length === 0 && slotBookingsList.length === 0 ? (
          <div className="ota-card text-center py-7 px-6 border-dashed">
            <p className="text-white/55 text-sm">No one-time bookings yet.</p>
            <Link to="/user/book-slots" className="text-xs text-[#C5DB3B] font-bold mt-1 inline-block hover:underline">
              Book a Sport Slot →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
          {passesList.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passesList.map((pass) => {
              const sportName = pass.sportId?.name || 'Sport';
              const sportSlug = pass.sportId?.qrSlug || pass.sportId?.slug || '';
              const expiresAtDate = new Date(pass.expiresAt);
              const msRemaining = expiresAtDate.getTime() - now;
              const isPassExpired = msRemaining <= 0 || pass.accessStatus === 'expired';

              const hoursLeft = Math.floor(msRemaining / (1000 * 60 * 60));
              const minutesLeft = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));

              const countdownLabel = msRemaining > 0
                ? `${hoursLeft}h ${minutesLeft}m left`
                : 'Expired';

              if (pass.accessStatus === 'unused') {
                return (
                  <motion.div
                    key={pass._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 p-5 shadow-lg flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/10 border-b border-l border-green-500/20 rounded-bl-xl text-[10px] font-extrabold text-green-400 uppercase tracking-wider">
                      Access Ready
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-tight">{sportName} Pass</h4>
                      <p className="text-xs text-neutral-400 mt-1">1-Hour Prepaid Walk-In Entry</p>

                      <div className="mt-4 flex items-center gap-2 text-xs">
                        <Clock size={13} className="text-amber-400" />
                        <span className="text-neutral-400">Expires in:</span>
                        <span className="font-semibold text-amber-400">{countdownLabel}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        to="/user/scan"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#C5DB3B] hover:bg-[#96AC2E] text-[#0A1628] text-xs font-extrabold text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <QrCode size={14} /> Scan QR to Start Session
                      </Link>
                      <button
                        onClick={() => {
                          toast.info(`Sport QR slug: ${sportSlug}`);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
                        title="View Sport QR Slug"
                        type="button"
                      >
                        View QR Slug
                      </button>
                    </div>
                  </motion.div>
                );
              }

              if (pass.accessStatus === 'active') {
                const sessionStartMs = pass.usedAt ? new Date(pass.usedAt).getTime() : now;
                const endsAtMs = sessionStartMs + 60 * 60000; // UI always shows 60 min limit
                const passRemainingMs = endsAtMs - now;
                const isPassOvertime = passRemainingMs < 0;
                const passTimerColor = isPassOvertime
                  ? 'text-red-400'
                  : passRemainingMs < 5 * 60000
                    ? 'text-orange-400'
                    : passRemainingMs < 15 * 60000
                      ? 'text-amber-400'
                      : 'text-green-400';
                const passBorderColor = isPassOvertime
                  ? 'border-red-500/30 bg-red-500/5'
                  : passRemainingMs < 5 * 60000
                    ? 'border-orange-500/30 bg-orange-500/5'
                    : 'border-[#C5DB3B]/30 bg-[#2a050b]/20';

                return (
                  <motion.div
                    key={pass._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg flex flex-col justify-between ${passBorderColor}`}
                  >
                    <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider animate-pulse ${
                      isPassOvertime
                        ? 'bg-red-500/20 border-red-500/30 text-red-400'
                        : 'bg-[#C5DB3B]/20 border-[#C5DB3B]/30 text-[#C5DB3B]'
                    }`}>
                      {isPassOvertime ? 'Overtime' : 'Session Active'}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-tight">{sportName} Pass</h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        Checked in at {pass.usedAt ? new Date(pass.usedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '-'}
                      </p>

                      <div className={`mt-4 text-3xl font-black tabular-nums ${passTimerColor}`}>
                        {formatSessionClock(passRemainingMs)}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        60 min allowed
                        {isPassOvertime ? ' · Overtime charges active' : ''}
                      </p>
                    </div>

                    <div className="mt-5">
                      <Link
                        to="/user/scan"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#C5DB3B] hover:bg-[#96AC2E] text-[#0A1628] text-xs font-extrabold text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <QrCode size={14} /> Scan QR to Check Out
                      </Link>
                    </div>
                  </motion.div>
                );
              }

              if (pass.accessStatus === 'completed' || pass.accessStatus === 'expired') {
                const isExpired = pass.accessStatus === 'expired';
                const sessionDate = pass.usedAt || pass.updatedAt;
                return (
                  <motion.div
                    key={pass._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl bg-white/3 border border-white/10 p-5 shadow-lg flex flex-col justify-between"
                  >
                    <div className={`absolute top-0 right-0 px-3 py-1 border-b border-l rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider ${
                      isExpired
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-green-500/10 border-green-500/20 text-green-400'
                    }`}>
                      {isExpired ? 'Expired' : 'Session Over'}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-tight">{sportName} Pass</h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        {isExpired ? 'Pass expired unused' : '1-Hour Prepaid Session Completed'}
                      </p>

                      {!isExpired && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                          <CheckCircle size={13} className="text-green-500 shrink-0" />
                          <span>
                            {sessionDate
                              ? `Played on ${new Date(sessionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} at ${new Date(sessionDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`
                              : 'Session completed'}
                          </span>
                        </div>
                      )}
                    </div>

                    {!isExpired && (
                      <div className="mt-5 flex items-center gap-2">
                        <Link
                          to="/user/reviews"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white text-xs font-extrabold text-center transition-colors hover:bg-white/12 flex items-center justify-center gap-1.5"
                        >
                          <Star size={13} /> Rate Your Session
                        </Link>
                      </div>
                    )}
                  </motion.div>
                );
              }

              return null;
            })}
          </div>}

          {slotBookingsList.length > 0 && (
            <div className="space-y-3">
              {slotBookingsList.slice(0, 10).map((booking) => {
                const slotDate = booking.slotId?.date
                  ? new Date(booking.slotId.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                  : new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

                const isPast = (() => {
                  const todayStr = new Date().toISOString().slice(0, 10);
                  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
                  
                  const slotDateStr = booking.slotId?.date
                    ? new Date(booking.slotId.date).toISOString().slice(0, 10)
                    : new Date(booking.createdAt).toISOString().slice(0, 10);
                    
                  if (slotDateStr < todayStr) return true;
                  if (slotDateStr === todayStr) {
                    const [endH, endM] = (booking.endTime || '0:0').split(':').map(Number);
                    return endH * 60 + endM < nowMin;
                  }
                  return false;
                })();

                const isUpcoming = !isPast && booking.status === 'confirmed';

                let displayStatus = booking.status;
                let statusColorClass = 'text-white/40';

                if (isPast) {
                  if (booking.status === 'confirmed' || booking.status === 'pending') {
                    displayStatus = 'missed';
                    statusColorClass = 'text-red-400/60';
                  } else if (booking.status === 'completed') {
                    displayStatus = 'passed';
                    statusColorClass = 'text-white/45';
                  } else if (booking.status === 'no-show') {
                    displayStatus = 'no show';
                    statusColorClass = 'text-red-400';
                  } else if (booking.status === 'checked-in') {
                    displayStatus = 'checked in';
                    statusColorClass = 'text-blue-400';
                  }
                } else {
                  const statusColors = {
                    confirmed: 'text-green-400',
                    'checked-in': 'text-blue-400',
                    completed: 'text-white/40',
                    'no-show': 'text-red-400',
                    pending: 'text-amber-400',
                  };
                  displayStatus = booking.status;
                  statusColorClass = statusColors[booking.status] || 'text-white/40';
                }

                const amountToShow = booking.isReference
                  ? (booking.displayAmount ?? booking.amountPaid ?? 0)
                  : (booking.displayAmount ?? booking.totalAmount ?? 0);

                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`ota-soft-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isPast ? 'opacity-60 bg-white/[0.015] border-white/5' : 
                      isUpcoming ? 'border-blue-500/25 bg-blue-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                        style={isPast ? {
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)'
                        } : isUpcoming ? {
                          background: 'rgba(59,130,246,0.12)',
                          border: '1px solid rgba(59,130,246,0.25)'
                        } : {
                          background: 'rgba(197, 219, 59,0.1)',
                          border: '1px solid rgba(197, 219, 59,0.2)'
                        }}>
                        <Zap size={16} className={isPast ? 'text-white/30' : isUpcoming ? 'text-blue-400' : 'text-[#C5DB3B]'} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className={`text-sm font-bold truncate ${isPast ? 'text-white/70' : 'text-white'}`}>
                            {booking.sportNameSnapshot || 'Sport'}{booking.courtNameSnapshot ? ` · ${booking.courtNameSnapshot}` : ''}
                          </p>
                          {isUpcoming && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shrink-0"
                              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
                              Upcoming
                            </span>
                          )}
                          {booking.isReference && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                              style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.25)', color: '#fbbf24' }}>
                              <ShieldCheck size={9} /> Reference
                            </span>
                          )}
                          {booking.isManualEntry && !booking.isReference && (
                            <span className="text-[10px] font-semibold text-white/30">Manual</span>
                          )}
                        </div>
                        <p className={`text-xs ${isPast ? 'text-white/30' : 'text-white/45'}`}>
                          {slotDate} · {booking.startTime}–{booking.endTime}
                        </p>
                        {booking.isReference && (
                          <p className="text-[10px] text-amber-400/60 mt-0.5">Reference rate applied</p>
                        )}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      <div className="text-right">
                        {booking.isReference ? (
                          <>
                            <p className={`text-sm font-extrabold ${isPast ? 'text-white/60' : 'text-white'}`}>
                              Paid: ₹{Number(amountToShow).toLocaleString('en-IN')}
                            </p>
                            {(booking.waivedAmount ?? 0) > 0 && (
                              <p className="text-[10px] text-white/30">₹{booking.waivedAmount.toLocaleString('en-IN')} waived</p>
                            )}
                          </>
                        ) : (
                          <p className={`text-sm font-extrabold ${isPast ? 'text-white/60' : 'text-white'}`}>
                            ₹{Number(amountToShow).toLocaleString('en-IN')}
                          </p>
                        )}
                        {booking.paymentId?.paymentMode && (
                          <p className="text-[10px] text-white/30 capitalize">{booking.paymentId.paymentMode}</p>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${statusColorClass}`}>
                        {displayStatus}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          </div>
        )}
      </div>

      {/* Explore More Sports — shown below active memberships */}
      {activeMemberships.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/40 mb-4">Explore More Sports</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/user/book-slots" className="group">
              <div className="ota-card p-5 flex flex-col gap-3 hover:border-white/15 transition-all cursor-pointer h-full">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/55 group-hover:text-white transition-colors">
                  <Calendar size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">Book Sports</h3>
                  <p className="text-xs text-white/40 mt-1">Browse courts and book by the hour</p>
                </div>
              </div>
            </Link>
            <Link to="/user/buy-memberships" className="group">
              <div className="ota-card p-5 flex flex-col gap-3 hover:border-white/15 transition-all cursor-pointer h-full">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/55 group-hover:text-white transition-colors">
                  <Trophy size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">Add Another Plan</h3>
                  <p className="text-xs text-white/40 mt-1">Upgrade or add a new sport membership</p>
                </div>
              </div>
            </Link>
            <Link to="/user/membership" className="group">
              <div className="ota-card p-5 flex flex-col gap-3 hover:border-white/15 transition-all cursor-pointer h-full">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/55 group-hover:text-white transition-colors">
                  <Star size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">Manage Membership</h3>
                  <p className="text-xs text-white/40 mt-1">View invoices, renew or upgrade</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link to="/user/membership">
          <motion.div whileHover={{ scale: 1.02 }} className="ota-card flex items-center gap-4 cursor-pointer p-5 hover:border-white/15 transition-all h-full">
            <Trophy size={28} strokeWidth={1.5} className="text-[#C5DB3B] shrink-0" />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Membership</h3>
              <p className="text-[10px] sm:text-xs text-white/45">View plan, sports & invoices</p>
            </div>
          </motion.div>
        </Link>
        {/* RESTAURANT DISABLED — see README "Restaurant module (disabled)"
        <Link to="/user/table-portal">
          <motion.div whileHover={{ scale: 1.02 }} className="ota-card flex items-center gap-4 cursor-pointer p-5 hover:border-white/15 transition-all h-full">
            <Utensils size={28} strokeWidth={1.5} className="text-[#C5DB3B] shrink-0" />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Order Food</h3>
              <p className="text-[10px] sm:text-xs text-white/45">Browse menu & place orders</p>
            </div>
          </motion.div>
        </Link>
        <Link to="/user/orders">
          <motion.div whileHover={{ scale: 1.02 }} className="ota-card flex items-center gap-4 cursor-pointer p-5 hover:border-white/15 transition-all h-full">
            <Calendar size={28} strokeWidth={1.5} className="text-[#C5DB3B] shrink-0" />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Order History</h3>
              <p className="text-[10px] sm:text-xs text-white/45">{orders?.orders?.length || 0} orders</p>
            </div>
          </motion.div>
        </Link>
        */}
        <Link to="/user/profile">
          <motion.div whileHover={{ scale: 1.02 }} className="ota-card flex items-center gap-4 cursor-pointer p-5 hover:border-white/15 transition-all h-full">
            <User size={28} strokeWidth={1.5} className="text-[#C5DB3B] shrink-0" />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Profile</h3>
              <p className="text-[10px] sm:text-xs text-white/45">Manage photo & password</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* RESTAURANT DISABLED — Recent Food Orders. See README "Restaurant module (disabled)"
      <div className="ota-card p-6">
        <h3 className="text-sm font-extrabold text-white/70 uppercase tracking-wider mb-4">Recent Food Orders</h3>
        <div className="space-y-2">
          {(!orders?.orders || orders.orders.length === 0) ? (
            <p className="text-sm text-white/45 text-center py-6">No orders yet. Try ordering from the restaurant.</p>
          ) : (
            orders.orders.slice(0, 5).map(order => (
              <div key={order._id} className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/7 gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{order.orderNumber}</p>
                  <p className="text-xs text-white/40 mb-2">{order.items?.length} items • {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  
                  // List order items
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-1 mt-1 border-t border-white/5 pt-1.5">
                      {order.items.map((item, idx) => {
                        const isCancelled = item.status === 'cancelled' || item.status === 'refunded' || order.status === 'cancelled';
                        const isRefunded = item.status === 'refunded' || item.refundStatus === 'completed';
                        const statusLabel = isRefunded ? 'Refunded' : isCancelled ? 'Cancelled' : null;
                        return (
                          <div key={idx} className="flex items-center gap-1.5 flex-wrap text-[11px] text-white/70">
                            <span className={isCancelled ? 'line-through text-red-400/50' : ''}>
                              <span className="font-semibold text-white/90">{item.quantity}×</span> {item.name}{item.size ? ` (${item.size})` : ''}
                            </span>
                            {statusLabel && (
                              <span className={`text-[8px] font-black px-1 rounded uppercase tracking-wider border ${
                                isRefunded
                                  ? 'text-blue-400 border-blue-400/20 bg-blue-500/10'
                                  : 'text-red-400 border-red-400/20 bg-red-500/10'
                              }`}>
                                {statusLabel}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">{formatCurrency(order.totalAmount)}</p>
                  <span className={`text-[10px] font-bold uppercase ${
                    order.status === 'delivered' ? 'text-green-600' :
                    order.status === 'cancelled' ? 'text-red-600' : 'text-amber-600'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      */}
    </div>
  );
}
