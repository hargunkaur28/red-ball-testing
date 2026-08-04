import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axios';
import { formatCurrency, formatDate, getStatusColor, getInitials } from '../../lib/utils';
import {
  Search, ChevronLeft, ChevronRight, X, Plus,
  CreditCard, User, Loader2, Users, CheckCircle, AlertCircle, Clock, Pencil, Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

// ─── helpers ──────────────────────────────────────────────
function timeAgo(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── Skeleton rows ────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-[#F0F0F0]">
      {[...Array(9)].map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className={`skeleton h-4 ${i === 0 ? 'w-32' : i === 4 ? 'w-16' : 'w-20'}`} />
        </td>
      ))}
    </tr>
  );
}

// ─── Status options ───────────────────────────────────────
const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'just_bought', label: 'Just Bought' },
  { value: 'just_renewed', label: 'Just Renewed' },
  { value: 'bought_renewed', label: 'Both (Bought & Renewed)' },
];


// ═══════════════════════════════════════════════════════════
export default function Memberships() {
  const [activeTab, setActiveTab] = useState('memberships');

  const qc = useQueryClient();

  // ── Add Membership Modal state ──────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [userType, setUserType] = useState('existing'); // 'existing' | 'new'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', phone: '', email: '' });
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [withTraining, setWithTraining] = useState(false);
  const [paymentMode, setPaymentMode] = useState('cash');
  const [submitting, setSubmitting] = useState(false);

  // ── plans query (for adding membership) ─────────────────
  const { data: plansData } = useQuery({
    queryKey: ['membership-plans-list'],
    queryFn: () => api.get('/plans').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const plans = plansData?.plans || [];

  // ── user search helper ──────────────────────────────────
  const handleSearchUser = async (q) => {
    setSearchUserQuery(q);
    if (q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchingUsers(true);
      const res = await api.get(`/super-admin/users?search=${encodeURIComponent(q)}&limit=10`);
      setSearchResults(res.data?.users || []);
    } catch {
      // Search failed — handled silently
    } finally {
      setSearchingUsers(false);
    }
  };

  // ── manual membership creation submission ───────────────
  const handleAddMembershipSubmit = async (e) => {
    e.preventDefault();
    if (userType === 'existing' && !selectedUser) {
      toast.error('Please select an existing user.');
      return;
    }
    if (userType === 'new' && (!newUser.name || !newUser.phone || !newUser.email)) {
      toast.error('Please fill in all new user fields.');
      return;
    }
    if (!selectedPlanId) {
      toast.error('Please select a membership plan.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        planId: selectedPlanId,
        paymentMode,
        withTraining,
      };

      if (userType === 'existing') {
        payload.studentId = selectedUser._id;
      } else {
        payload.name = newUser.name;
        payload.phone = newUser.phone;
        payload.email = newUser.email;
      }

      const res = await api.post('/memberships/assign', payload);
      toast.success('Membership bought manually! User email has been sent.');
      
      // Invalidate queries to refresh the lists
      qc.invalidateQueries({ queryKey: ['super-admin-memberships'] });
      qc.invalidateQueries({ queryKey: ['super-admin-users'] });
      
      // Reset form
      setShowAddModal(false);
      setSelectedUser(null);
      setSearchUserQuery('');
      setSearchResults([]);
      setNewUser({ name: '', phone: '', email: '' });
      setSelectedPlanId('');
      setWithTraining(false);
      setPaymentMode('cash');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to assign membership.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── filter state ──────────────────────────────────────
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sport, setSport] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const limit = 10;

  // ── users tab state ───────────────────────────────────
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userMembershipFilter, setUserMembershipFilter] = useState('');
  const [userSport, setUserSport] = useState('');
  const [userPaymentStatus, setUserPaymentStatus] = useState('');
  const [paymentEditModal, setPaymentEditModal] = useState(null); // { paymentId, currentStatus, currentNote }
  const [expandedUser, setExpandedUser] = useState(null);
  const [debouncedUserSearch, setDebouncedUserSearch] = useState('');
  const userSearchTimer = useMemo(() => (val) => {
    const id = setTimeout(() => { setDebouncedUserSearch(val); setUserPage(1); }, 400);
    return () => clearTimeout(id);
  }, []);

  // debounced search term
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimer = useMemo(() => {
    return (val) => {
      const id = setTimeout(() => {
        setDebouncedSearch(val);
        setPage(1);
      }, 400);
      return () => clearTimeout(id);
    };
  }, []);

  // ── sports query (for filter dropdown) ────────────────
  const { data: sportsData } = useQuery({
    queryKey: ['sports-list'],
    queryFn: () => api.get('/sports').then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const sports = sportsData?.sports || sportsData || [];

  // ── memberships query ─────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ['super-admin-memberships', debouncedSearch, status, sport, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (status) params.set('status', status);
      if (sport) params.set('sport', sport);
      params.set('page', page);
      params.set('limit', limit);
      const res = await api.get(`/super-admin/memberships?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
    onError: () => toast.error('Failed to load memberships'),
  });

  // ── users query ───────────────────────────────────────
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['super-admin-users', debouncedUserSearch, userPage, userMembershipFilter, userSport, userPaymentStatus],
    queryFn: async () => {
      const params = new URLSearchParams({ page: userPage, limit: 20 });
      if (debouncedUserSearch) params.set('search', debouncedUserSearch);
      if (userMembershipFilter) params.set('membershipStatus', userMembershipFilter);
      if (userSport) params.set('sport', userSport);
      if (userPaymentStatus) params.set('paymentStatus', userPaymentStatus);
      const res = await api.get(`/super-admin/users?${params}`);
      return res.data;
    },
    enabled: activeTab === 'users',
    staleTime: 60 * 1000,
  });
  const users = usersData?.users || [];
  const userTotal = usersData?.total || 0;
  const userTotalPages = usersData?.totalPages || 1;

  const memberships = data?.memberships || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Compile check-ins and memberships, sorting by check-in date/time descending (latest on top)
  const displayRows = useMemo(() => {
    if (!memberships || memberships.length === 0) return [];
    const rows = [];
    memberships.forEach((m) => {
      const student = m.studentId || {};
      const plan = m.planId || {};
      const sportsIncluded = plan.sportsIncluded || [];
      const checkins = m.checkins || [];

      const hasCheckins = checkins.length > 0;

      // 1. Add the real check-ins
      if (hasCheckins) {
        checkins.forEach((c, idx) => {
          rows.push({
            ...c,
            _rowKey: `${m._id}-${c._id || idx}`,
            isFirst: idx === 0,
            membership: m,
            student,
            plan,
            sportsIncluded,
          });
        });
      }

      // 2. Add initial purchase event row (using createdAt or fallback to startDate)
      rows.push({
        _rowKey: `${m._id}-purchase`,
        isFirst: !hasCheckins,
        checkInTime: m.createdAt || m.startDate,
        checkOutTime: null,
        isPurchaseEvent: true,
        membership: m,
        student,
        plan,
        sportsIncluded,
      });

      // 3. Add renewal events from renewalHistory
      if (m.renewalHistory && m.renewalHistory.length > 0) {
        m.renewalHistory.forEach((r, rIdx) => {
          rows.push({
            _rowKey: `${m._id}-renewal-${rIdx}`,
            isFirst: false,
            checkInTime: r.date || r.renewedAt,
            checkOutTime: null,
            isRenewalEvent: true,
            membership: m,
            student,
            plan,
            sportsIncluded,
          });
        });
      }
    });

    // Sort by check-in date/time wise (latest first)
    const sortedRows = rows.sort((a, b) => {
      const timeA = a.checkInTime ? new Date(a.checkInTime).getTime() : 0;
      const timeB = b.checkInTime ? new Date(b.checkInTime).getTime() : 0;
      if (timeA !== timeB) {
        return timeB - timeA;
      }
      const createdA = a.membership?.createdAt ? new Date(a.membership.createdAt).getTime() : 0;
      const createdB = b.membership?.createdAt ? new Date(b.membership.createdAt).getTime() : 0;
      return createdB - createdA;
    });

    if (status === 'just_bought') {
      return sortedRows.filter(r => r.isPurchaseEvent);
    }
    if (status === 'just_renewed') {
      return sortedRows.filter(r => r.isRenewalEvent);
    }
    if (status === 'bought_renewed') {
      return sortedRows.filter(r => r.isPurchaseEvent || r.isRenewalEvent);
    }

    return sortedRows;
  }, [memberships, status]);

  // ── search handler ────────────────────────────────────
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    searchTimer(val);
  };

  const handleFilterReset = () => {
    setSearch('');
    setDebouncedSearch('');
    setStatus('');
    setSport('');
    setPage(1);
  };

  const hasActiveFilters = debouncedSearch || status || sport;

  // ═════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#111] font-[Inter]">Memberships</h1>
          <p className="text-sm text-text-muted mt-1">View and track all membership records and registered users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary gap-2 h-11"
        >
          <Plus size={18} /> Add Membership
        </button>
      </div>

      {/* ── Tabs ────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-dark-border mb-6">
        <button
          onClick={() => setActiveTab('memberships')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === 'memberships'
              ? 'text-primary border-primary'
              : 'text-[#666] border-transparent hover:text-[#111]'
          }`}
        >
          <CreditCard size={15} /> Memberships
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === 'users'
              ? 'text-primary border-primary'
              : 'text-[#666] border-transparent hover:text-[#111]'
          }`}
        >
          <Users size={15} /> Users
        </button>
      </div>

      {/* ── Filter bar ──────────────────────────────────── */}
      {activeTab === 'memberships' && (<>
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search by name, phone, or email…"
              value={search}
              onChange={handleSearchChange}
              className="input-field pl-9"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="input-field w-auto min-w-[150px]"
          >
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Sport */}
          <select
            value={sport}
            onChange={(e) => { setSport(e.target.value); setPage(1); }}
            className="input-field w-auto min-w-[140px]"
          >
            <option value="">All Sports</option>
            {(Array.isArray(sports) ? sports : []).map(s => (
              <option key={s._id} value={s.slug}>{s.name}</option>
            ))}
          </select>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={handleFilterReset}
              className="btn-ghost text-xs gap-1 shrink-0"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────── */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA]">
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Member</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Sport(s)</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Membership Status</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Start</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">End</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">In Time</th>
                <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Out Time</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : memberships.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <CreditCard size={28} className="text-text-muted" />
                      </div>
                      <p className="text-[#111] font-medium">
                        {hasActiveFilters ? 'No memberships match your filters' : 'No memberships found'}
                      </p>
                      <p className="text-xs text-text-muted max-w-xs">
                        {hasActiveFilters
                          ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                          : 'Memberships will appear here once students enroll in plans.'}
                      </p>
                      {hasActiveFilters && (
                        <button onClick={handleFilterReset} className="btn-ghost text-xs mt-1">
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                displayRows.map((row) => {
                  const m = row.membership;
                  const student = row.student;
                  const plan = row.plan;
                  const sportsIncluded = row.sportsIncluded;
                  return (
                    <motion.tr
                      key={row._rowKey}
                      onClick={() => setSelectedMembership(m)}
                      className={`border-b border-[#F0F0F0] table-row cursor-pointer transition-colors ${
                        row.sessionStatus === 'Active' ? 'bg-green-50/40' : ''
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Member */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                            {getInitials(student.name)}
                          </div>
                          <span className="font-medium text-[#111] truncate max-w-[160px]">
                            {student.name || 'Unknown'}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3 text-[#444]">{student.phone || '—'}</td>

                      {/* Plan */}
                      <td className="px-4 py-3 font-medium text-[#111]">
                        <div className="flex items-center gap-1.5">
                          <span>{plan.name || '—'}</span>
                          {m.withTraining && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wide shrink-0 font-[Inter]">
                              Training
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Sports */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {row.sport ? (
                            <span className="text-xs bg-[#e0f2fe] text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-100 capitalize">
                              {row.sport}
                            </span>
                          ) : sportsIncluded.length > 0 ? (
                            sportsIncluded.map((sp, idx) => (
                              <span key={idx} className="text-xs bg-[#F5F5F5] text-[#444] px-2 py-0.5 rounded">
                                {typeof sp === 'string' ? sp : sp.name || '—'}
                              </span>
                            ))
                          ) : (
                            <span className="text-text-muted">—</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`badge ${getStatusColor(m.status)}`}>
                          {m.status}
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="px-4 py-3 text-[#444]">{formatDate(m.startDate)}</td>

                      {/* End Date */}
                      <td className="px-4 py-3 text-[#444]">{formatDate(m.endDate)}</td>

                      {/* Check-in Time */}
                      <td className="px-4 py-3 text-[#444] text-xs leading-5 whitespace-nowrap">
                        {row.isPurchaseEvent ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide w-fit font-[Inter]">
                              Just Bought
                            </span>
                            <span className="text-[10px] text-[#888]">{formatDateTime(row.checkInTime)}</span>
                          </div>
                        ) : row.isRenewalEvent ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center text-purple-600 font-bold bg-purple-50 border border-purple-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide w-fit font-[Inter]">
                              Just Renewed
                            </span>
                            <span className="text-[10px] text-[#888]">{formatDateTime(row.checkInTime)}</span>
                          </div>
                        ) : (
                          formatDateTime(row.checkInTime)
                        )}
                      </td>

                      {/* Check-out Time */}
                      <td className="px-4 py-3 text-xs leading-5 whitespace-nowrap">
                        {row.isPurchaseEvent ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide w-fit font-[Inter]">
                              Just Bought
                            </span>
                            <span className="text-[10px] text-[#888]">{formatDateTime(row.checkInTime)}</span>
                          </div>
                        ) : row.isRenewalEvent ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center text-purple-600 font-bold bg-purple-50 border border-purple-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide w-fit font-[Inter]">
                              Just Renewed
                            </span>
                            <span className="text-[10px] text-[#888]">{formatDateTime(row.checkInTime)}</span>
                          </div>
                        ) : row.checkOutTime ? (
                          <span className="text-[#444]">{formatDateTime(row.checkOutTime)}</span>
                        ) : row.checkInTime ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[#444]">—</span>
                        )}
                      </td>

                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ──────────────────────────────── */}
        {!isLoading && total > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#EAEAEA]">
            <p className="text-xs text-text-muted">
              Showing <span className="font-medium text-[#111]">{from}–{to}</span> of{' '}
              <span className="font-medium text-[#111]">{total}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-1.5 rounded-lg hover:bg-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '...' ? (
                    <span key={`dots-${idx}`} className="px-1 text-text-muted text-xs">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                        page === p
                          ? 'bg-[#111] text-white'
                          : 'hover:bg-[#F5F5F5] text-[#444]'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-1.5 rounded-lg hover:bg-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Error state ─────────────────────────────────── */}
      {isError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center">
          Something went wrong while loading memberships. Please try again.
        </div>
      )}
      </>)}

      {/* ══════════════════════════════════════════════════
          Users Tab
         ══════════════════════════════════════════════════ */}
      {activeTab === 'users' && (
        <div>
          {/* Search + Filter */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
              <div className="relative flex-1 min-w-60">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone…"
                  value={userSearch}
                  onChange={e => { setUserSearch(e.target.value); userSearchTimer(e.target.value); }}
                  className="input-field pl-9"
                />
              </div>
              <select
                value={userMembershipFilter}
                onChange={e => { setUserMembershipFilter(e.target.value); setUserPage(1); }}
                className="input-field w-auto min-w-[150px]"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
                <option value="frozen">Frozen</option>
                <option value="cancelled">Cancelled</option>
                <option value="none">No Membership</option>
              </select>
              <select
                value={userSport}
                onChange={e => { setUserSport(e.target.value); setUserPage(1); }}
                className="input-field w-auto min-w-[140px]"
              >
                <option value="">All Sports</option>
                {(Array.isArray(sports) ? sports : []).map(s => (
                  <option key={s._id} value={s.slug}>{s.name}</option>
                ))}
              </select>
              <select
                value={userPaymentStatus}
                onChange={e => { setUserPaymentStatus(e.target.value); setUserPage(1); }}
                className="input-field w-auto min-w-40"
              >
                <option value="">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="partial">Partial</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {(userSearch || userMembershipFilter || userSport || userPaymentStatus) && (
                <button
                  onClick={() => { setUserSearch(''); setDebouncedUserSearch(''); setUserMembershipFilter(''); setUserSport(''); setUserPaymentStatus(''); setUserPage(1); }}
                  className="btn-ghost text-xs gap-1 shrink-0"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-[#FAFAFA]">
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">User</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Phone</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Membership Plan</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Payment</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Expires</th>
                    <th className="text-left px-4 py-3 font-medium text-[#666] text-xs uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    [...Array(8)].map((_, i) => (
                      <tr key={i} className="border-b border-dark-hover">
                        {[...Array(8)].map((__, j) => (
                          <td key={j} className="px-4 py-4"><div className="skeleton h-4 w-24" /></td>
                        ))}
                      </tr>
                    ))
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                            <Users size={28} className="text-text-muted" />
                          </div>
                          <p className="text-[#111] font-medium">No users found</p>
                          <p className="text-xs text-text-muted">Users will appear here once they register.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map(u => {
                      const mList = u.memberships || [];
                      const isMultiple = mList.length > 1;
                      const primaryM = mList.find(m => m.status === 'active') || mList[0] || null;
                      const isExpanded = expandedUser === u._id;

                      const statusColors = {
                        active: 'bg-green-50 text-green-700 border-green-200',
                        expired: 'bg-red-50 text-red-600 border-red-200',
                        pending: 'bg-amber-50 text-amber-700 border-amber-200',
                        frozen: 'bg-blue-50 text-blue-700 border-blue-200',
                        cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
                      };

                      const StatusBadge = ({ m }) => m ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors[m.status] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                          {m.status === 'active' ? <CheckCircle size={11} /> : m.status === 'expired' ? <AlertCircle size={11} /> : <Clock size={11} />}
                          {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                        </span>
                      ) : <span className="text-xs text-text-muted">—</span>;

                      return (
                        <>
                          <motion.tr
                            key={u._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => isMultiple && setExpandedUser(isExpanded ? null : u._id)}
                            className={`border-b border-dark-hover transition-colors ${isMultiple ? 'cursor-pointer hover:bg-blue-50/40' : 'hover:bg-[#FAFAFA]'}`}
                          >
                            {/* User */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {u.photo ? (
                                  <img src={u.photo} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                                    {getInitials(u.name)}
                                  </div>
                                )}
                                <span className="font-medium text-[#111] truncate max-w-35">{u.name || '—'}</span>
                              </div>
                            </td>
                            {/* Email */}
                            <td className="px-4 py-3 text-[#444] text-xs">{u.email || '—'}</td>
                            {/* Phone */}
                            <td className="px-4 py-3 text-[#444]">{u.phone || <span className="text-text-muted italic text-xs">Not set</span>}</td>
                            {/* Plan */}
                            <td className="px-4 py-3">
                              {isMultiple ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold cursor-pointer">
                                  <Users size={11} /> {mList.length} Memberships {isExpanded ? '▲' : '▼'}
                                </span>
                              ) : primaryM ? (
                                <div className="font-medium text-[#111] flex items-center gap-1.5">
                                  <span>{primaryM.planId?.name || '—'}</span>
                                  {primaryM.withTraining && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wide shrink-0 font-[Inter]">
                                      Training
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-text-muted text-xs">No membership</span>
                              )}
                            </td>
                            {/* Status */}
                            <td className="px-4 py-3">
                              {isMultiple ? (
                                <span className="text-xs text-text-muted">—</span>
                              ) : (
                                <StatusBadge m={primaryM} />
                              )}
                            </td>
                            {/* Payment Status */}
                            <td className="px-4 py-3">
                              {u.latestPayment ? (
                                <button
                                  onClick={e => { e.stopPropagation(); setPaymentEditModal({ paymentId: u.latestPayment._id, currentStatus: u.latestPayment.status, currentNote: u.latestPayment.adminNote || '' }); }}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border cursor-pointer hover:opacity-80 transition-opacity ${
                                    u.latestPayment.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
                                    u.latestPayment.status === 'failed' ? 'bg-red-50 text-red-600 border-red-200' :
                                    u.latestPayment.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    u.latestPayment.status === 'refunded' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                    'bg-gray-100 text-gray-500 border-gray-200'
                                  }`}
                                >
                                  {u.latestPayment.status.charAt(0).toUpperCase() + u.latestPayment.status.slice(1)}
                                  <Pencil size={9} />
                                </button>
                              ) : <span className="text-xs text-text-muted">—</span>}
                            </td>
                            {/* Expires */}
                            <td className="px-4 py-3 text-[#444] text-xs">
                              {isMultiple ? '—' : (primaryM?.endDate ? formatDate(primaryM.endDate) : '—')}
                            </td>
                            {/* Joined */}
                            <td className="px-4 py-3 text-[#444] text-xs">{formatDate(u.createdAt)}</td>
                          </motion.tr>

                          {/* Expanded memberships row */}
                          {isMultiple && isExpanded && (
                            <tr key={`${u._id}-expanded`} className="border-b border-dark-hover bg-blue-50/20">
                              <td colSpan={8} className="px-6 py-3">
                                <div className="space-y-2">
                                  {mList.map((m, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white border border-dark-border rounded-lg px-4 py-2.5 text-sm">
                                      <div className="font-medium text-[#111] flex-1 flex items-center gap-1.5">
                                        <span>{m.planId?.name || '—'}</span>
                                        {m.withTraining && (
                                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wide shrink-0 font-[Inter]">
                                            Training
                                          </span>
                                        )}
                                      </div>
                                      <StatusBadge m={m} />
                                      <span className="text-xs text-text-muted whitespace-nowrap">
                                        {formatDate(m.startDate)} → {formatDate(m.endDate)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!usersLoading && userTotal > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-dark-border">
                <p className="text-xs text-text-muted">
                  Showing <span className="font-medium text-[#111]">{Math.min((userPage - 1) * 20 + 1, userTotal)}–{Math.min(userPage * 20, userTotal)}</span> of{' '}
                  <span className="font-medium text-[#111]">{userTotal}</span> users
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setUserPage(p => Math.max(1, p - 1))}
                    disabled={userPage <= 1}
                    className="p-1.5 rounded-lg hover:bg-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setUserPage(p => Math.min(userTotalPages, p + 1))}
                    disabled={userPage >= userTotalPages}
                    className="p-1.5 rounded-lg hover:bg-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Status Edit Modal */}
      <AnimatePresence>
        {paymentEditModal && (
          <PaymentStatusModal
            data={paymentEditModal}
            onClose={() => setPaymentEditModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Add Membership Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto p-6 relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-[#EAEAEA] pb-3">
                  <h3 className="text-base font-bold text-[#111] font-[Inter]">Buy Membership (Manual)</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg hover:bg-[#F5F5F5] text-[#666] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleAddMembershipSubmit} className="space-y-4">
                  {/* User Type Toggle */}
                  <div className="flex bg-[#F5F5F5] p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('existing');
                        setSelectedUser(null);
                      }}
                      className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                        userType === 'existing'
                          ? 'bg-white text-[#111] shadow-sm'
                          : 'text-[#666] hover:text-[#111]'
                      }`}
                    >
                      Existing User
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('new');
                        setSelectedUser(null);
                      }}
                      className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                        userType === 'new'
                          ? 'bg-white text-[#111] shadow-sm'
                          : 'text-[#666] hover:text-[#111]'
                      }`}
                    >
                      Register New User
                    </button>
                  </div>

                  {/* Existing User Selection */}
                  {userType === 'existing' && (
                    <div>
                      {selectedUser ? (
                        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                          <div>
                            <p className="text-sm font-semibold text-green-850">{selectedUser.name}</p>
                            <p className="text-xs text-green-700">
                              {selectedUser.email} &middot; {selectedUser.phone}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="p-1 rounded-lg hover:bg-green-100 text-green-800 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <label className="block text-xs font-semibold text-[#666] mb-1">Search User</label>
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                              type="text"
                              placeholder="Type name, phone or email..."
                              value={searchUserQuery}
                              onChange={(e) => handleSearchUser(e.target.value)}
                              className="input-field pl-9"
                            />
                          </div>
                          {searchingUsers && (
                            <div className="absolute right-3 top-[30px]">
                              <Loader2 size={14} className="animate-spin text-[#888]" />
                            </div>
                          )}
                          {searchResults.length > 0 && (
                            <div className="absolute left-0 right-0 bg-white border border-[#EAEAEA] rounded-xl shadow-xl mt-1 max-h-48 overflow-y-auto z-50">
                              {searchResults.map((u) => (
                                <div
                                  key={u._id}
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setSearchResults([]);
                                  }}
                                  className="px-4 py-2 hover:bg-[#F5F5F5] cursor-pointer text-sm border-b border-[#F9F9F9] last:border-0"
                                >
                                  <p className="font-semibold text-[#111]">{u.name}</p>
                                  <p className="text-xs text-[#666]">
                                    {u.email} &middot; {u.phone}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Register New User Fields */}
                  {userType === 'new' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#666] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#666] mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          className="input-field"
                          placeholder="9876543210"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#666] mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          className="input-field"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  )}

                  {/* Plan Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666] mb-1">Select Plan</label>
                    <select
                      value={selectedPlanId}
                      onChange={(e) => {
                        setSelectedPlanId(e.target.value);
                        setWithTraining(false);
                      }}
                      className="input-field bg-white"
                      required
                    >
                      <option value="">-- Choose a Plan --</option>
                      {plans.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} (₹{p.price} &middot; {p.duration} days)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add Coaching/Training checkbox */}
                  {(() => {
                    const selectedPlan = plans.find((p) => p._id === selectedPlanId);
                    if (!selectedPlan?.trainingAvailable || !(selectedPlan.trainingPrice > 0)) return null;
                    return (
                      <div className="flex items-center justify-between bg-red-50/50 border border-red-100 rounded-xl p-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="withTraining"
                            checked={withTraining}
                            onChange={(e) => setWithTraining(e.target.checked)}
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 cursor-pointer"
                          />
                          <label htmlFor="withTraining" className="text-xs font-semibold text-[#111] cursor-pointer">
                            Add Coaching/Training
                          </label>
                        </div>
                        <span className="text-xs font-bold text-red-700">
                          +₹{selectedPlan.trainingPrice}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Pricing Breakdown */}
                  {(() => {
                    const selectedPlan = plans.find((p) => p._id === selectedPlanId);
                    if (!selectedPlan) return null;
                    const trainingPrice = withTraining && selectedPlan.trainingAvailable ? (selectedPlan.trainingPrice || 0) : 0;
                    return (
                      <div className="bg-[#FAFAFA] border border-dark-hover rounded-xl p-3 space-y-1.5 text-xs">
                        <div className="flex justify-between text-[#666]">
                          <span>Base Plan Price</span>
                          <span>₹{selectedPlan.price}</span>
                        </div>
                        {trainingPrice > 0 && (
                          <div className="flex justify-between text-[#666]">
                            <span>Training Add-on</span>
                            <span>+₹{trainingPrice}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-[#111] border-t border-[#EAEAEA] pt-1.5 text-sm">
                          <span>Total Price</span>
                          <span>₹{selectedPlan.price + trainingPrice}</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-semibold text-[#666] mb-1">Payment Method</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="input-field bg-white"
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI / QR Scan</option>
                      <option value="card">Debit/Credit Card</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setSelectedUser(null);
                        setSearchUserQuery('');
                        setSearchResults([]);
                        setNewUser({ name: '', phone: '', email: '' });
                        setSelectedPlanId('');
                        setWithTraining(false);
                        setPaymentMode('cash');
                      }}
                      className="btn-ghost flex-1 h-10 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary flex-1 h-10 text-sm gap-2"
                    >
                      {submitting && <Loader2 size={14} className="animate-spin" />}
                      Confirm Buy
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          Detail Drawer
         ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedMembership && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setSelectedMembership(null)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <DrawerContent
                membership={selectedMembership}
                onClose={() => setSelectedMembership(null)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Drawer content (extracted for readability)
// ═══════════════════════════════════════════════════════════
function DrawerContent({ membership: m, onClose }) {
  const student = m.studentId || {};
  const plan = m.planId || {};
  const sportsIncluded = plan.sportsIncluded || [];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-[#111] font-[Inter]">Membership Details</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* ── Member info ──────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center text-sm font-bold">
              {getInitials(student.name)}
            </div>
            <div>
              <p className="font-semibold text-[#111] text-base">{student.name || 'Unknown'}</p>
              <p className="text-xs text-text-muted">{student.email || '—'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={<User size={14} />} label="Phone" value={student.phone || '—'} />
            <InfoCard icon={<CreditCard size={14} />} label="Email" value={student.email || '—'} />
          </div>
        </section>

        {/* ── Plan details ─────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Plan Details</h3>
          <div className="bg-[#FAFAFA] border border-dark-hover rounded-xl p-4 space-y-2.5">
            <DetailRow
              label="Plan Name"
              value={
                <div className="flex items-center gap-1.5 justify-end">
                  <span>{plan.name || '—'}</span>
                  {m.withTraining && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wide shrink-0 font-[Inter]">
                      Training
                    </span>
                  )}
                </div>
              }
            />
            <DetailRow label="Duration" value={plan.duration ? `${plan.duration} days` : '—'} />
            <DetailRow label="Price" value={plan.price ? formatCurrency(plan.price) : '—'} />
            <DetailRow
              label="Sport(s)"
              value={
                sportsIncluded.length > 0
                  ? sportsIncluded.map(sp => (typeof sp === 'string' ? sp : sp.name)).join(', ')
                  : '—'
              }
            />
          </div>
        </section>

        {/* ── Membership dates ─────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Membership Period</h3>
          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={<Calendar size={14} />} label="Start Date" value={formatDate(m.startDate)} />
            <InfoCard icon={<Calendar size={14} />} label="End Date" value={formatDate(m.endDate)} />
          </div>
          <div className="mt-3">
            <span className={`badge ${getStatusColor(m.status)}`}>{m.status}</span>
          </div>
        </section>

        {/* ── Check-in stats ───────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Attendance</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Last Check-in" value={formatDateTime(m.lastCheckIn)} small />
            <StatCard label="Last Check-out" value={formatDateTime(m.lastCheckOut)} small />
          </div>
        </section>

        {/* ── Renewal history ──────────────────────────── */}
        {m.renewalHistory && m.renewalHistory.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Renewal History</h3>
            <div className="space-y-2">
              {m.renewalHistory.map((r, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#FAFAFA] border border-dark-hover rounded-lg px-4 py-2.5 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-text-muted" />
                    <span className="text-[#444]">{formatDate(r.renewedAt || r.date)}</span>
                  </div>
                  <span className="font-medium text-[#111]">
                    {r.amountPaid ? formatCurrency(r.amountPaid) : '—'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

// ─── Tiny reusable pieces ─────────────────────────────────
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#FAFAFA] border border-dark-hover rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-1 text-text-muted">
        {icon}
        <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <p className="text-sm font-medium text-[#111] truncate">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#888]">{label}</span>
      <span className="font-medium text-[#111] text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

function StatCard({ label, value, small }) {
  return (
    <div className="bg-[#FAFAFA] border border-dark-hover rounded-xl px-3 py-3 text-center">
      <p className={`font-bold text-[#111] ${small ? 'text-xs' : 'text-xl'}`}>{value}</p>
      <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

// ─── Payment Status Edit Modal ────────────────────────────
function PaymentStatusModal({ data, onClose }) {
  const qc = useQueryClient();
  const [status, setStatus] = useState(data.currentStatus);
  const [note, setNote] = useState(data.currentNote || '');

  const mutation = useMutation({
    mutationFn: () => api.patch(`/super-admin/payments/${data.paymentId}/status`, { status, adminNote: note }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['super-admin-users'] });
      toast.success('Payment status updated');
      onClose();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update'),
  });

  const statusOptions = [
    { value: 'paid',      cls: 'text-green-700 bg-green-50 border-green-200' },
    { value: 'pending',   cls: 'text-amber-700 bg-amber-50 border-amber-200' },
    { value: 'failed',    cls: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'partial',   cls: 'text-blue-700 bg-blue-50 border-blue-200' },
    { value: 'refunded',  cls: 'text-purple-700 bg-purple-50 border-purple-200' },
    { value: 'cancelled', cls: 'text-gray-500 bg-gray-100 border-gray-200' },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAEAEA]">
            <h3 className="text-sm font-bold text-[#111]">Update Payment Status</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F5] text-[#666]"><X size={16} /></button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs font-semibold text-[#666] mb-2 uppercase tracking-wider">Status</p>
              <div className="grid grid-cols-3 gap-2">
                {statusOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                      status === opt.value ? opt.cls + ' ring-2 ring-offset-1 ring-current' : 'border-[#EAEAEA] text-[#666] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#666] mb-2 uppercase tracking-wider">
                Admin Note <span className="text-[#AAA] font-normal normal-case">(optional)</span>
              </p>
              <textarea
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="e.g. Payment confirmed via bank transfer on 28 May"
                className="input-field resize-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 px-5 pb-5">
            <button onClick={onClose} className="btn-ghost flex-1 h-10 text-sm">Cancel</button>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="btn-primary flex-1 h-10 text-sm gap-2"
            >
              {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
