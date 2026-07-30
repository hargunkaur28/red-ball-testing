import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axios';
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Ticket,
  Clock,
  Calendar,
  DollarSign,
  Loader2,
  User,
  CheckCircle,
  LayoutGrid,
} from 'lucide-react';

/* ─── helpers ─── */
function formatDuration(minutes) {
  if (!minutes && minutes !== 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const paymentStatusOptions = ['All', 'Paid', 'Pending', 'Partial'];
const bookingStatusOptions = [
  'All',
  'Confirmed',
  'Completed',
  'Cancelled',
  'Pending',
  'No-Show',
];

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusBadge(status) {
  switch (status) {
    case 'active': return 'badge-success';
    case 'completed': return 'badge-success';
    case 'expired': return 'badge-warning';
    case 'cancelled': return 'badge-danger';
    case 'unused': return 'badge-info';
    default: return 'badge-info';
  }
}

/* ─── session status badge ─── */
function SessionBadge({ status, overtimeMinutes }) {
  switch (status) {
    case 'active':
      return <span className="badge badge-info">Active</span>;
    case 'attended':
      return <span className="badge badge-success">Attended</span>;
    case 'overtime':
      return (
        <span className="badge badge-warning">
          Overtime{overtimeMinutes ? ` +${overtimeMinutes}m` : ''}
        </span>
      );
    case 'missed':
      return <span className="badge badge-danger">Missed</span>;
    case 'no-show':
      return <span className="badge badge-danger">No-show</span>;
    case 'cancelled':
      return <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280' }}>Cancelled</span>;
    case 'upcoming':
    default:
      return <span className="badge" style={{ background: '#f3f4f6', color: '#374151' }}>Upcoming</span>;
  }
}

/* ─── skeleton row ─── */
function SkeletonRow({ cols = 10 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/* ─── main page ─── */
export default function OneTime() {
  const [activeTab, setActiveTab] = useState('slots'); // 'slots' | 'passes'
  const qc = useQueryClient();

  const handleMarkCompleted = async (e, passId) => {
    e.stopPropagation();
    try {
      await api.patch(`/onetimeaccess/admin/passes/${passId}/mark-completed`);
      toast.success('Pass marked as completed.');
      qc.invalidateQueries({ queryKey: ['admin-flexible-passes'] });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update pass.');
    }
  };

  /* filter state */
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('All');
  const [bookingStatus, setBookingStatus] = useState('All');
  const [sessionStatus, setSessionStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 10;

  /* drawer */
  const [selectedEntry, setSelectedEntry] = useState(null);

  /* fetch sports */
  const { data: sportsData } = useQuery({
    queryKey: ['sports'],
    queryFn: () => api.get('/sports').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const sports = sportsData?.sports ?? sportsData ?? [];

  /* fetch prepaid passes */
  const { data: passesData, isLoading: isPassesLoading, isError: isPassesError } = useQuery({
    queryKey: ['admin-flexible-passes'],
    queryFn: () => api.get('/onetimeaccess/admin/passes').then((r) => r.data),
    enabled: activeTab === 'passes',
    onError: () => toast.error('Failed to load prepaid passes'),
  });

  /* fetch future slot bookings */
  const { data: futureSlotsData, isLoading: isFutureSlotsLoading, isError: isFutureSlotsError } = useQuery({
    queryKey: ['admin-future-slot-bookings'],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('timeframe', 'future');
      params.append('limit', '1000');
      return api.get(`/super-admin/slot-bookings?${params.toString()}`).then((r) => r.data);
    },
    enabled: activeTab === 'passes',
    onError: () => toast.error('Failed to load future slot bookings'),
  });

  const passes = passesData?.passes ?? [];
  const futureSlots = futureSlotsData?.bookings ?? [];

  const normalizedFutureSlots = futureSlots.map((sb) => ({
    _id: sb._id,
    isFutureSlot: true,
    bookingId: sb.bookingId,
    userId: {
      name: sb.playerName,
      phone: sb.playerPhone,
      email: sb.playerEmail || '',
    },
    sportId: {
      name: sb.sport,
    },
    paymentId: {
      status: sb.paymentStatus,
      amountPaid: sb.amountPaid,
    },
    accessStatus: sb.status === 'cancelled' ? 'cancelled' : 'unused',
    purchasedAt: sb.createdAt,
    expiresAt: sb.date || sb.createdAt,
    originalBooking: sb,
  }));

  const combinedPasses = [...passes, ...normalizedFutureSlots];

  // Filter passes client-side
  const filteredPasses = combinedPasses.filter((pass) => {
    if (search) {
      const q = search.toLowerCase();
      const name = pass.userId?.name?.toLowerCase() || '';
      const email = pass.userId?.email?.toLowerCase() || '';
      const phone = pass.userId?.phone || '';
      const id = pass._id?.toLowerCase() || '';
      const bid = pass.bookingId?.toLowerCase() || '';
      if (!name.includes(q) && !email.includes(q) && !phone.includes(q) && !id.includes(q) && !bid.includes(q)) {
        return false;
      }
    }
    if (sportFilter) {
      const sportName = pass.sportId?.name?.toLowerCase() || '';
      if (sportName !== sportFilter.toLowerCase()) {
        return false;
      }
    }
    if (paymentStatus !== 'All') {
      const payStatus = pass.paymentId?.status?.toLowerCase() || '';
      if (payStatus !== paymentStatus.toLowerCase()) {
        return false;
      }
    }
    if (bookingStatus !== 'All') {
      const accStatus = pass.accessStatus?.toLowerCase() || '';
      if (accStatus !== bookingStatus.toLowerCase()) {
        return false;
      }
    }
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (new Date(pass.purchasedAt) < start) return false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (new Date(pass.purchasedAt) > end) return false;
    }
    return true;
  });

  // Group and sort logic:
  // 1. Future slot bookings sorted ascending by slot play date (expiresAt)
  const futureSlotGroup = filteredPasses.filter((p) => p.isFutureSlot);
  futureSlotGroup.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));

  // 2. Prepaid passes sorted descending by purchase creation date (purchasedAt)
  const prepaidPassGroup = filteredPasses.filter((p) => !p.isFutureSlot);
  prepaidPassGroup.sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));

  const orderedPasses = [...futureSlotGroup, ...prepaidPassGroup];

  const passesTotal = orderedPasses.length;
  const passesTotalPages = Math.max(1, Math.ceil(passesTotal / limit));
  const passesFrom = passesTotal === 0 ? 0 : (page - 1) * limit + 1;
  const passesTo = Math.min(page * limit, passesTotal);
  const paginatedPasses = orderedPasses.slice((page - 1) * limit, page * limit);

  /* fetch slot bookings */
  const { data: slotsData, isLoading: isSlotsLoading, isError: isSlotsError } = useQuery({
    queryKey: [
      'admin-slot-bookings',
      search, sportFilter, paymentStatus, bookingStatus, sessionStatus, startDate, endDate, page,
    ],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sportFilter) params.append('sport', sportFilter);
      if (paymentStatus !== 'All') params.append('paymentStatus', paymentStatus.toLowerCase());
      if (bookingStatus !== 'All') params.append('status', bookingStatus.toLowerCase());
      if (sessionStatus !== 'All') params.append('sessionStatus', sessionStatus.toLowerCase());
      if (startDate) params.append('startDate', startDate);
      if (endDate)   params.append('endDate', endDate);
      params.append('timeframe', 'current_past');
      params.append('page', page);
      params.append('limit', limit);
      return api.get(`/super-admin/slot-bookings?${params.toString()}`).then((r) => r.data);
    },
    keepPreviousData: true,
    enabled: activeTab === 'slots',
    onError: () => toast.error('Failed to load slot bookings'),
  });

  const slotEntries = slotsData?.bookings ?? [];
  const slotsTotal = slotsData?.total ?? 0;
  const slotsTotalPages = slotsData?.totalPages ?? 1;
  const slotsFrom = slotsTotal === 0 ? 0 : (page - 1) * limit + 1;
  const slotsTo = Math.min(page * limit, slotsTotal);

  const displayTotal = activeTab === 'slots' ? slotsTotal : passesTotal;
  const displayTotalPages = activeTab === 'slots' ? slotsTotalPages : passesTotalPages;
  const displayFrom = activeTab === 'slots' ? slotsFrom : passesFrom;
  const displayTo = activeTab === 'slots' ? slotsTo : passesTo;
  const showLoading = activeTab === 'slots' ? isSlotsLoading : (isPassesLoading || isFutureSlotsLoading);
  const showError = activeTab === 'slots' ? isSlotsError : (isPassesError || isFutureSlotsError);

  const passesHeaders = [
    'Pass ID',
    'Customer Name',
    'Sport',
    'Purchased At',
    'Expiry Date',
    'Status',
    'Check In',
    'Check Out',
  ];

  const slotHeaders = [
    'Booking ID',
    'Source',
    'Player',
    'Phone',
    'Sport',
    'Date',
    'Slot Time',
    'Amount',
    'Payment',
    'Session',
  ];

  const currentBookingStatusOptions =
    activeTab === 'slots'
      ? ['All', 'Pending', 'Confirmed', 'Checked-in', 'Completed', 'Cancelled', 'No-show']
      : ['All', 'Unused', 'Active', 'Completed', 'Expired', 'Cancelled'];

  function handleTabChange(tab) {
    setActiveTab(tab);
    setPage(1);
    setBookingStatus('All');
    setPaymentStatus('All');
    setSessionStatus('All');
  }

  function handleSelectPass(pass) {
    const user = pass.userId || {};
    const sport = pass.sportId || {};
    const payment = pass.paymentId || {};
    const attendance = pass.attendanceId || {};
    
    const totalAmount = payment.amountPaid || (pass.hourlyRateSnapshot * (pass.allowedDurationMinutes / 60));
    const baseAmount = totalAmount / 1.18;
    const gstAmount = totalAmount - baseAmount;
    
    const normalized = {
      _id: pass._id,
      bookingId: pass._id?.slice(-8).toUpperCase(),
      type: 'prepaid',
      status: pass.accessStatus,
      paymentStatus: payment.status || 'pending',
      playerName: user.name || 'Walk-in User',
      playerPhone: user.phone || '—',
      sport: sport.name || '—',
      duration: attendance.actualDurationMinutes || attendance.duration || pass.allowedDurationMinutes,
      ratePerHour: pass.hourlyRateSnapshot,
      amount: baseAmount,
      gstAmount: gstAmount,
      totalAmount: totalAmount,
      date: pass.purchasedAt,
      checkInTime: attendance.checkInTime,
      checkOutTime: attendance.checkOutTime,
      notes: `Prepaid Pass Details:\n- Expiry: ${new Date(pass.expiresAt).toLocaleString('en-IN')}\n- Late fee rate: ₹${pass.lateFeePerMinuteSnapshot}/min\n- Late Amount accrued: ₹${attendance.lateAmount || 0}`,
    };
    setSelectedEntry(normalized);
  }

  /* reset page when filters change */
  function updateFilter(setter) {
    return (val) => {
      setter(val);
      setPage(1);
    };
  }

  const hasActiveFilters =
    sportFilter || paymentStatus !== 'All' || bookingStatus !== 'All' || sessionStatus !== 'All' || startDate || endDate;

  function clearFilters() {
    setSportFilter('');
    setPaymentStatus('All');
    setBookingStatus('All');
    setSessionStatus('All');
    setStartDate('');
    setEndDate('');
    setPage(1);
  }

  /* ─── render ─── */
  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#666666] uppercase mb-2">
            [ALCHEMY 360 ACADEMY]
          </p>
          <h1 className="text-5xl serif-heading text-[#111111] uppercase tracking-tight">
            One-Time Entries.
          </h1>
          <p className="text-sm text-[#666666] mt-3">
            All slot bookings — online and admin-created
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EAEAEA] mb-6">
        <button
          onClick={() => handleTabChange('slots')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-all ${
            activeTab === 'slots'
              ? 'border-black text-black'
              : 'border-transparent text-[#666666] hover:text-black'
          }`}
        >
          Slot Bookings
          {slotsTotal > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#111] text-white text-[10px]">{slotsTotal}</span>
          )}
        </button>
        <button
          onClick={() => handleTabChange('passes')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-all ${
            activeTab === 'passes'
              ? 'border-black text-black'
              : 'border-transparent text-[#666666] hover:text-black'
          }`}
        >
          Prepaid Passes
        </button>
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        {/* Top row: search + toggle filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
            />
            <input
              type="text"
              placeholder={
                activeTab === 'slots'
                  ? "Search by name, phone, booking ID, or court..."
                  : "Search by customer name, phone, email, or pass ID..."
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input-field pl-9"
            />
          </div>

          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`btn-ghost whitespace-nowrap ${
              hasActiveFilters ? 'border-[#111111] bg-[#FAFAFA]' : ''
            }`}
          >
            <Filter size={14} />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center">
                {[
                  sportFilter,
                  paymentStatus !== 'All' ? paymentStatus : '',
                  bookingStatus !== 'All' ? bookingStatus : '',
                  sessionStatus !== 'All' ? sessionStatus : '',
                  startDate,
                  endDate,
                ].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 pt-4 border-t border-[#EAEAEA]">
                {/* Sport */}
                <div>
                  <label className="block text-xs text-[#666] mb-1">Sport</label>
                  <select
                    className="input-field bg-white"
                    value={sportFilter}
                    onChange={(e) => updateFilter(setSportFilter)(e.target.value)}
                  >
                    <option value="">All Sports</option>
                    {Array.isArray(sports) &&
                      sports.map((s) => (
                        <option key={s._id || s.name} value={s.name || s}>
                          {(s.name || s).charAt(0).toUpperCase() +
                            (s.name || s).slice(1)}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-xs text-[#666] mb-1">
                    Payment Status
                  </label>
                  <select
                    className="input-field bg-white"
                    value={paymentStatus}
                    onChange={(e) =>
                      updateFilter(setPaymentStatus)(e.target.value)
                    }
                  >
                    {paymentStatusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Booking Status */}
                <div>
                  <label className="block text-xs text-[#666] mb-1">
                    {activeTab === 'slots' ? 'Booking Status' : 'Pass Status'}
                  </label>
                  <select
                    className="input-field bg-white"
                    value={bookingStatus}
                    onChange={(e) =>
                      updateFilter(setBookingStatus)(e.target.value)
                    }
                  >
                    {currentBookingStatusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Session Status — slots tab only */}
                {activeTab === 'slots' && (
                  <div>
                    <label className="block text-xs text-[#666] mb-1">Session</label>
                    <select
                      className="input-field bg-white"
                      value={sessionStatus}
                      onChange={(e) => updateFilter(setSessionStatus)(e.target.value)}
                    >
                      {['All', 'Upcoming', 'Active', 'Attended', 'Overtime', 'Missed', 'No-show', 'Cancelled'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Start Date */}
                <div>
                  <label className="block text-xs text-[#666] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={startDate}
                    onChange={(e) =>
                      updateFilter(setStartDate)(e.target.value)
                    }
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs text-[#666] mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={endDate}
                    onChange={(e) =>
                      updateFilter(setEndDate)(e.target.value)
                    }
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#888] hover:text-[#111] transition-colors underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-0 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#EAEAEA]">
                {(activeTab === 'slots' ? slotHeaders : passesHeaders).map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-semibold tracking-wider text-[#888888] uppercase px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'slots' ? (
                showLoading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={11} />)
                ) : showError ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-[#888]">
                      <p className="text-base font-medium text-[#111]">Something went wrong</p>
                      <p className="text-sm mt-1">Failed to load slot bookings. Please try again.</p>
                    </td>
                  </tr>
                ) : slotEntries.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16">
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="w-16 h-16 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto mb-4">
                          <LayoutGrid size={28} className="text-[#CCCCCC]" />
                        </div>
                        <p className="text-base font-medium text-[#111]">
                          {search || hasActiveFilters ? 'No slot bookings match your filters' : 'No slot bookings yet'}
                        </p>
                        <p className="text-sm text-[#888] mt-1 max-w-sm mx-auto">
                          {search || hasActiveFilters
                            ? 'Try adjusting your search or filter criteria.'
                            : 'When players book slots (online or manual admin entry), they\'ll appear here.'}
                        </p>
                        {hasActiveFilters && (
                          <button onClick={clearFilters} className="btn-ghost text-xs mt-4">Clear filters</button>
                        )}
                      </motion.div>
                    </td>
                  </tr>
                ) : (
                  slotEntries.map((sb, idx) => (
                    <motion.tr
                      key={sb._id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => setSelectedEntry({ ...sb, type: 'slot-booking', amount: sb.price, notes: sb.notes || `Court: ${sb.courtName || '—'}\nBooked by: ${sb.isManualEntry ? 'Admin (Manual)' : 'Online'}` })}
                      className="border-b border-[#F0F0F0] table-row cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-[#666]">{sb.bookingId}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${sb.isManualEntry ? 'badge-warning' : 'badge-info'}`}>
                          {sb.isManualEntry ? 'Manual' : 'Online'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#111]">{sb.playerName}</p>
                        {sb.playerEmail && sb.playerEmail !== '—' && (
                          <p className="text-xs text-[#888]">{sb.playerEmail}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#666] text-xs">{sb.playerPhone}</td>
                      <td className="px-4 py-3 text-[#111] capitalize font-medium">{sb.sport}</td>
                      <td className="px-4 py-3 text-[#666] whitespace-nowrap text-xs">{formatDate(sb.date)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#555] whitespace-nowrap">
                        {sb.startTime}–{sb.endTime}
                      </td>
                      <td className="px-4 py-3 font-medium text-[#111]">{formatCurrency(sb.totalAmount)}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${sb.paymentStatus === 'paid' ? 'badge-success' : sb.paymentStatus === 'partial' ? 'badge-warning' : 'badge-danger'}`}>
                          {sb.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <SessionBadge status={sb.sessionStatus} overtimeMinutes={sb.overtimeMinutes} />
                      </td>
                    </motion.tr>
                  ))
                )
              ) : (
                showLoading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={8} />)
                ) : showError ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-[#888]">
                      <p className="text-base font-medium text-[#111]">
                        Something went wrong
                      </p>
                      <p className="text-sm mt-1">
                        Failed to load prepaid passes. Please try again.
                      </p>
                    </td>
                  </tr>
                ) : paginatedPasses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto mb-4">
                          <Ticket size={28} className="text-[#CCCCCC]" />
                        </div>
                        <p className="text-base font-medium text-[#111]">
                          {search || hasActiveFilters
                            ? 'No passes match your filters'
                            : 'No prepaid passes yet'}
                        </p>
                        <p className="text-sm text-[#888] mt-1 max-w-sm mx-auto">
                          {search || hasActiveFilters
                            ? "Try adjusting your search or filter criteria to find what you're looking for."
                            : "When customers purchase flexible passes, they'll appear here."}
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="btn-ghost text-xs mt-4"
                          >
                            Clear filters
                          </button>
                        )}
                      </motion.div>
                    </td>
                  </tr>
                ) : (
                  paginatedPasses.map((pass, idx) => {
                    const user = pass.userId || {};
                    const sport = pass.sportId || {};
                    const payment = pass.paymentId || {};
                    const attendance = pass.attendanceId || {};
                    
                    return (
                      <motion.tr
                        key={pass._id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => {
                          if (pass.isFutureSlot) {
                            setSelectedEntry({
                              ...pass.originalBooking,
                              type: 'slot-booking',
                              amount: pass.originalBooking.price,
                              notes: pass.originalBooking.notes || `Court: ${pass.originalBooking.courtNameSnapshot || '—'}\nBooked by: ${pass.originalBooking.isManualEntry ? 'Admin (Manual)' : 'Online'}`
                            });
                          } else {
                            handleSelectPass(pass);
                          }
                        }}
                        className="border-b border-[#F0F0F0] table-row cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-[#666]">
                          {pass.isFutureSlot ? pass.bookingId : pass._id?.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#111]">{user.name || 'Walk-in User'}</p>
                          <p className="text-xs text-[#666]">{user.phone || 'No phone'}</p>
                        </td>
                        <td className="px-4 py-3 text-[#111] capitalize font-medium">
                          {sport.name || '—'}
                        </td>
                        <td className="px-4 py-3 text-[#666] whitespace-nowrap text-xs">
                          {formatDateTime(pass.purchasedAt)}
                        </td>
                        <td className="px-4 py-3 text-[#666] whitespace-nowrap text-xs">
                          {pass.isFutureSlot ? (
                            <span className="font-semibold text-blue-600">
                              {formatDate(pass.expiresAt)} ({pass.originalBooking.startTime}–{pass.originalBooking.endTime})
                            </span>
                          ) : (
                            formatDateTime(pass.expiresAt)
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`badge ${pass.isFutureSlot ? (pass.originalBooking.status === 'confirmed' ? 'badge-info' : 'badge-warning') : getStatusBadge(pass.accessStatus)} capitalize`}>
                              {pass.isFutureSlot ? `Scheduled: ${pass.originalBooking.status}` : pass.accessStatus}
                            </span>
                            {attendance.lateAmount > 0 && (
                              <span className="text-xs font-semibold text-red-600">+{formatCurrency(attendance.lateAmount)} OT</span>
                            )}
                            {!pass.isFutureSlot && (pass.accessStatus === 'unused' || pass.accessStatus === 'active') && (
                              <button
                                onClick={(e) => handleMarkCompleted(e, pass._id)}
                                className="text-[10px] font-bold text-[#666] border border-[#DDD] rounded px-1.5 py-0.5 hover:border-green-500 hover:text-green-600 transition-colors whitespace-nowrap"
                                title="Mark session as completed"
                              >
                                <CheckCircle size={10} className="inline mr-0.5" />Mark Used
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-[#555]">
                          {attendance.checkInTime ? formatTime(attendance.checkInTime) : '—'}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-[#555]">
                          {attendance.checkOutTime ? formatTime(attendance.checkOutTime) : (
                            pass.accessStatus === 'active'
                              ? <span className="text-amber-600 font-semibold">In session</span>
                              : '—'
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {displayTotal > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#EAEAEA]">
            <p className="text-xs text-[#888]">
              Showing{' '}
              <span className="font-medium text-[#111]">{displayFrom}</span>–
              <span className="font-medium text-[#111]">{displayTo}</span> of{' '}
              <span className="font-medium text-[#111]">{displayTotal}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: displayTotalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (displayTotalPages <= 5) return true;
                  if (p === 1 || p === displayTotalPages) return true;
                  return Math.abs(p - page) <= 1;
                })
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) {
                    acc.push('...');
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="px-2 text-xs text-[#888]"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                        page === p
                          ? 'bg-[#111] text-white'
                          : 'hover:bg-[#F0F0F0] text-[#666]'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(displayTotalPages, p + 1))}
                disabled={page >= displayTotalPages}
                className="p-2 rounded-lg hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Details Drawer */}
      <AnimatePresence>
        {selectedEntry && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="fixed inset-0 bg-black/30 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="sticky top-0 bg-white border-b border-[#EAEAEA] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-[#888] uppercase">
                    Booking Details
                  </p>
                  <h2 className="text-lg font-bold text-[#111] mt-0.5">
                    {selectedEntry.bookingId ||
                      `#${selectedEntry._id?.slice(-8)}`}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="p-2 rounded-lg hover:bg-[#F0F0F0] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer content */}
              <div className="p-6 space-y-6">
                {/* Type & Status */}
                <div className="flex items-center gap-2">
                  <span
                    className={`badge ${
                      selectedEntry.type === 'walk-in'
                        ? 'badge-success'
                        : 'badge-info'
                    }`}
                  >
                    {selectedEntry.type === 'walk-in' ? 'Walk-in' : 'Online'}
                  </span>
                  <span
                    className={`badge ${getStatusColor(
                      selectedEntry.status?.toLowerCase()
                    )}`}
                  >
                    {selectedEntry.status}
                  </span>
                  <span
                    className={`badge ${getStatusColor(
                      selectedEntry.paymentStatus?.toLowerCase()
                    )}`}
                  >
                    {selectedEntry.paymentStatus}
                  </span>
                </div>

                {/* Player Info */}
                <div className="rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-sm font-semibold">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111]">
                        {selectedEntry.playerName}
                      </p>
                      <p className="text-xs text-[#666]">
                        {selectedEntry.playerPhone || 'No phone'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sport & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#EAEAEA] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Ticket size={14} className="text-[#888]" />
                      <span className="text-xs text-[#888]">Sport</span>
                    </div>
                    <p className="text-sm font-semibold text-[#111] capitalize">
                      {selectedEntry.sport}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#EAEAEA] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-[#888]" />
                      <span className="text-xs text-[#888]">Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-[#111]">
                      {formatDuration(selectedEntry.duration)}
                    </p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="rounded-xl border border-[#EAEAEA] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign size={14} className="text-[#888]" />
                    <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">
                      Pricing Breakdown
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedEntry.ratePerHour != null && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#666]">Rate per hour</span>
                        <span className="text-[#111]">
                          {formatCurrency(selectedEntry.ratePerHour)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Base amount</span>
                      <span className="text-[#111]">
                        {formatCurrency(selectedEntry.amount)}
                      </span>
                    </div>
                    {selectedEntry.gstAmount != null && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#666]">GST (18%)</span>
                        <span className="text-[#111]">
                          {formatCurrency(selectedEntry.gstAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold border-t border-[#EAEAEA] pt-2">
                      <span className="text-[#111]">Total</span>
                      <span className="text-[#111]">
                        {formatCurrency(
                          selectedEntry.totalAmount ?? selectedEntry.amount
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="rounded-xl border border-[#EAEAEA] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-[#888]" />
                    <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">
                      Timestamps
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Date</span>
                      <span className="text-[#111]">
                        {formatDate(selectedEntry.date)}
                      </span>
                    </div>
                    {selectedEntry.startTime && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#666]">Start time</span>
                        <span className="text-[#111]">
                          {selectedEntry.startTime}
                        </span>
                      </div>
                    )}
                    {selectedEntry.endTime && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#666]">End time</span>
                        <span className="text-[#111]">
                          {selectedEntry.endTime}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Check-in</span>
                      <span className={`font-mono text-xs ${selectedEntry.checkInTime ? 'text-[#111]' : 'text-[#bbb]'}`}>
                        {selectedEntry.checkInTime ? formatTime(selectedEntry.checkInTime) : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Check-out</span>
                      <span className={`font-mono text-xs ${selectedEntry.checkOutTime ? 'text-[#111]' : selectedEntry.status === 'checked-in' ? 'text-amber-600 font-semibold' : 'text-[#bbb]'}`}>
                        {selectedEntry.checkOutTime
                          ? formatTime(selectedEntry.checkOutTime)
                          : selectedEntry.status === 'checked-in'
                          ? 'In session'
                          : '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Court / extra slot info */}
                {selectedEntry.courtName && selectedEntry.courtName !== '—' && (
                  <div className="rounded-xl border border-[#EAEAEA] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <LayoutGrid size={14} className="text-[#888]" />
                      <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Court</span>
                    </div>
                    <p className="text-sm font-semibold text-[#111]">{selectedEntry.courtName}</p>
                  </div>
                )}

                {/* Payment detail for manual bookings */}
                {selectedEntry.type === 'slot-booking' && (selectedEntry.amountDue > 0 || selectedEntry.amountPaid > 0) && (
                  <div className="rounded-xl border border-[#EAEAEA] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={14} className="text-[#888]" />
                      <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Payment Detail</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm"><span className="text-[#666]">Paid</span><span className="font-medium text-[#111]">{formatCurrency(selectedEntry.amountPaid)}</span></div>
                      {selectedEntry.totalAmount - selectedEntry.amountPaid > 0 && (
                        <div className="flex justify-between text-sm"><span className="text-[#666]">Due</span><span className="font-medium text-red-600">{formatCurrency(selectedEntry.totalAmount - selectedEntry.amountPaid)}</span></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedEntry.notes && (
                  <div className="rounded-xl border border-[#EAEAEA] p-4">
                    <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                      Notes
                    </p>
                    <p className="text-sm text-[#444] leading-relaxed whitespace-pre-line">
                      {selectedEntry.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
