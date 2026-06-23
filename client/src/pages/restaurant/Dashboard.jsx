import { useEffect, useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import socket, { connectSocket } from '../../lib/socket';
import StatCard from '../../components/shared/StatCard';
import { ClipboardList, IndianRupee, AlertTriangle, Timer, ShoppingBag, ChefHat, Bike, Package, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/shared/PageHeader';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'sonner';

const KITCHEN_STATES = [
  { value: 'open',        label: 'Open',        dot: 'bg-green-500',  ring: 'ring-green-500/30', bar: 'bg-green-500/10 border-green-500/30 text-green-800'  },
  { value: 'busy',        label: 'Busy',        dot: 'bg-amber-500',  ring: 'ring-amber-500/30', bar: 'bg-amber-500/10 border-amber-500/30 text-amber-800'  },
  { value: 'closed',      label: 'Closed',      dot: 'bg-red-500',    ring: 'ring-red-500/30',   bar: 'bg-red-500/10 border-red-500/30 text-red-800'        },
  { value: 'maintenance', label: 'Maintenance', dot: 'bg-gray-500',   ring: 'ring-gray-500/30',  bar: 'bg-gray-500/10 border-gray-500/30 text-gray-800'     },
];

export default function RestaurantDashboard() {
  const qc = useQueryClient();
  const [statusLoading, setStatusLoading] = useState(false);

  const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: () => api.get('/orders').then(r => r.data) });
  const { data: menuData } = useQuery({ queryKey: ['menu'], queryFn: () => api.get('/menu').then(r => r.data) });
  const { data: kitchenData, refetch: refetchKitchen } = useQuery({
    queryKey: ['kitchen-status'],
    queryFn: () => api.get('/kitchen/status').then(r => r.data),
    staleTime: 30000,
  });

  const kitchenStatus = kitchenData?.kitchenStatus || 'open';
  const currentState = KITCHEN_STATES.find(s => s.value === kitchenStatus) || KITCHEN_STATES[0];

  const kitchenMutation = useMutation({
    mutationFn: (status) => api.put('/kitchen/status', { status }),
    onMutate: () => setStatusLoading(true),
    onSuccess: (_, status) => {
      qc.setQueryData(['kitchen-status'], { kitchenStatus: status });
      setStatusLoading(false);
      toast.success(`Kitchen status set to ${status}.`);
    },
    onError: () => {
      setStatusLoading(false);
      toast.error('Failed to update kitchen status.');
    },
  });

  const invalidate = useCallback(() => {
    qc.invalidateQueries({ queryKey: ['orders'] });
  }, [qc]);

  useEffect(() => {
    connectSocket();
    socket.emit('join-managers', { token: localStorage.getItem('accessToken') });
    socket.on('order:new', invalidate);
    socket.on('order:updated', invalidate);
    socket.on('menu:updated', () => qc.invalidateQueries({ queryKey: ['menu'] }));
    socket.on('restaurant:kitchenStatus', ({ status }) => {
      qc.setQueryData(['kitchen-status'], { kitchenStatus: status });
    });
    return () => {
      socket.off('order:new', invalidate);
      socket.off('order:updated', invalidate);
      socket.off('menu:updated');
      socket.off('restaurant:kitchenStatus');
    };
  }, [invalidate, qc]);

  const isToday = (dateString) => {
    const today = new Date();
    const d = new Date(dateString);
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  const validOrders = (orders?.orders || []).filter(o => ['cash', 'upi', 'online'].includes(o.paymentMethod) || o.paymentStatus === 'paid');
  const todaysValidOrders = validOrders.filter(o => isToday(o.createdAt));
  const activeOrders = validOrders.filter(o => ['new', 'preparing'].includes(o.status));
  const todaySales = todaysValidOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.totalAmount, 0);
  const outOfStockCount = (menuData?.items || []).filter(item => !item.isAvailable).length;

  return (
    <div>
      <PageHeader title="Restaurant Dashboard" subtitle="Overview of today's operations" />

      {/* Kitchen Status Control */}
      <div className={`mb-6 rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${currentState.bar}`}>
        <div className="flex items-center gap-3">
          <div className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-2 ${currentState.ring}`}>
            <span className={`h-4 w-4 rounded-full ${currentState.dot} ${kitchenStatus === 'open' ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-60">Kitchen Status</p>
            <p className="text-base font-black">{currentState.label}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {KITCHEN_STATES.map(state => (
            <button
              key={state.value}
              disabled={statusLoading || state.value === kitchenStatus}
              onClick={() => kitchenMutation.mutate(state.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black border transition-all disabled:cursor-not-allowed ${
                state.value === kitchenStatus
                  ? `ring-2 ${state.ring} bg-white shadow-sm opacity-100`
                  : 'bg-white/60 border-transparent hover:bg-white hover:shadow-sm opacity-70 hover:opacity-100'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${state.dot}`} />
              {state.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Alerts Section */}
      {activeOrders.length > 0 && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <ChefHat size={20} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Kitchen Active</h4>
                <p className="text-xs text-blue-700 font-medium">{activeOrders.length} order(s) currently being prepared.</p>
              </div>
            </div>
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Active Orders" value={activeOrders.length} icon={<ClipboardList size={20} />} accent />
        <StatCard title="Today's Orders" value={todaysValidOrders.length} icon={<ShoppingBag size={20} />} accent />
        <StatCard title="Today's Sales" value={todaySales} icon={<IndianRupee size={20} />} subtitle={formatCurrency(todaySales)} />
        <StatCard title="Out of Stock" value={outOfStockCount} icon={<AlertTriangle size={20} />} accent />
        <StatCard title="Avg Prep Time" value={15} icon={<Timer size={20} />} subtitle="minutes" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#666666]">Active Orders</h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${socket.connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-[10px] text-[#888888]">Live</span>
          </div>
        </div>
        <div className="space-y-3">
          {activeOrders.slice(0, 8).map(o => (
            <div key={o._id} className="p-4 rounded-xl bg-[#F7F7F7] border border-[#EAEAEA] hover:border-[#D0D0D0] transition-colors">
              {/* Top row: Order number + Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-black text-sm font-bold">{o.orderNumber}</span>
                  <span className="text-[#888888] text-xs flex items-center gap-1">
                    {o.orderType === 'delivery' ? <><Bike size={12} /> Delivery</> : o.orderType === 'pickup' ? <><Package size={12} /> Pickup</> : o.tableId?.label || 'Dine-in'}
                  </span>
                </div>
                <span className={`badge ${o.status === 'new' ? 'badge-info' : 'badge-warning'}`}>{o.status}</span>
              </div>

              {/* Customer info */}
              <div className="flex items-center gap-4 mb-2 text-xs">
                {o.customerName && (
                  <span className="flex items-center gap-1 text-[#444]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span className="font-medium">{o.customerName}</span>
                  </span>
                )}
                {o.customerPhone && (
                  <span className="flex items-center gap-1 text-[#444]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{o.customerPhone}</span>
                  </span>
                )}
              </div>

              {/* Order items */}
              {o.items && o.items.length > 0 && (
                <div className="text-xs text-[#666] mb-2 bg-white rounded-lg px-3 py-2 border border-[#F0F0F0]">
                  {o.items.slice(0, 4).map((item, idx) => (
                    <span key={idx}>
                      {idx > 0 && <span className="text-[#ccc] mx-1">•</span>}
                      <span className="font-medium text-[#333]">{item.quantity}×</span> {item.name}{item.size ? ` (${item.size})` : ''}
                    </span>
                  ))}
                  {o.items.length > 4 && <span className="text-[#999] ml-1">+{o.items.length - 4} more</span>}
                </div>
              )}

              {/* Amount */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#888] flex items-center gap-1">
                  {o.paymentStatus === 'paid' ? <><CheckCircle2 size={12} className="text-green-500" /> Paid</> : o.paymentMethod === 'cash' ? <><Banknote size={12} /> Cash</> : o.paymentMethod === 'upi' ? <><Smartphone size={12} /> UPI</> : o.paymentMethod}
                </span>
                <span className="text-sm font-bold text-[#222]">{formatCurrency(o.totalAmount)}</span>
              </div>
            </div>
          ))}
          {activeOrders.length === 0 && <p className="text-[#888888] text-sm text-center py-4">No active orders</p>}
        </div>
      </div>
    </div>
  );
}
