import { useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import socket, { connectSocket } from '../../lib/socket';
import StatCard from '../../components/shared/StatCard';
import { ClipboardList, IndianRupee, AlertTriangle, Timer, ShoppingBag, ChefHat, Bike, Package, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/shared/PageHeader';
import { formatCurrency } from '../../lib/utils';

export default function RestaurantDashboard() {
  const qc = useQueryClient();

  const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: () => api.get('/orders').then(r => r.data) });
  const { data: menuData } = useQuery({ queryKey: ['menu'], queryFn: () => api.get('/menu').then(r => r.data) });

  const invalidate = useCallback(() => {
    qc.invalidateQueries({ queryKey: ['orders'] });
  }, [qc]);

  useEffect(() => {
    connectSocket();
    socket.emit('join-managers', { token: localStorage.getItem('accessToken') });
    socket.on('order:new', invalidate);
    socket.on('order:updated', invalidate);
    socket.on('order:cancelled', invalidate);
    socket.on('menu:updated', () => qc.invalidateQueries({ queryKey: ['menu'] }));
    return () => {
      socket.off('order:new', invalidate);
      socket.off('order:updated', invalidate);
      socket.off('order:cancelled', invalidate);
      socket.off('menu:updated');
    };
  }, [invalidate, qc]);

  const isToday = (dateString) => {
    const today = new Date();
    const d = new Date(dateString);
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  const validOrders = (orders?.orders || []).filter(o => ['cash', 'upi', 'online'].includes(o.paymentMethod) || o.paymentStatus === 'paid');
  const todaysValidOrders = validOrders.filter(o => isToday(o.createdAt));
  const activeOrders = validOrders.filter(o => ['new', 'preparing', 'cancelled'].includes(o.status));
  const todaySales = todaysValidOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.totalAmount, 0);
  const outOfStockCount = (menuData?.items || []).filter(item => !item.isAvailable).length;

  return (
    <div>
      <PageHeader title="Restaurant Dashboard" subtitle="Overview of today's operations" />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Orders" value={activeOrders.length} icon={<ClipboardList size={20} />} accent />
        <StatCard title="Today's Orders" value={todaysValidOrders.length} icon={<ShoppingBag size={20} />} accent />
        <StatCard title="Today's Sales" value={todaySales} icon={<IndianRupee size={20} />} subtitle={formatCurrency(todaySales)} />
        <StatCard title="Out of Stock" value={outOfStockCount} icon={<AlertTriangle size={20} />} accent />
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
            <div key={o._id} className={`p-4 rounded-xl transition-colors border ${o.status === 'cancelled' ? 'bg-red-50/10 border-red-200 shadow-sm' : 'bg-[#F7F7F7] border-[#EAEAEA] hover:border-[#D0D0D0]'}`}>
              {/* Top row: Order number + Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-black text-sm font-bold">{o.orderNumber}</span>
                  <span className="text-[#888888] text-xs flex items-center gap-1">
                    {o.orderType === 'delivery' ? <><Bike size={12} /> Delivery</> : o.orderType === 'pickup' ? <><Package size={12} /> Pickup</> : o.tableId?.label || 'Dine-in'}
                  </span>
                </div>
                <span className={`badge ${o.status === 'cancelled' ? 'badge-danger bg-red-600 text-white font-black border border-red-700' : o.status === 'new' ? 'badge-info' : 'badge-warning'}`}>{o.status}</span>
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
                <div className="text-xs text-[#666] mb-2 bg-white rounded-lg px-3 py-2 border border-[#F0F0F0] flex flex-wrap gap-y-1">
                  {o.items.slice(0, 4).map((item, idx) => {
                    const isCancelled = item.status === 'cancelled' || item.status === 'refunded' || o.status === 'cancelled';
                    return (
                      <span key={idx} className={`inline-flex items-center gap-1 mr-2 ${isCancelled ? 'line-through text-red-500/70 font-medium' : ''}`}>
                        {idx > 0 && <span className="text-[#ccc] mr-1">•</span>}
                        <span className="font-semibold text-[#333]">{item.quantity}×</span>
                        <span>{item.name}{item.size ? ` (${item.size})` : ''}</span>
                        {isCancelled && <span className="text-[9px] font-black text-red-600 uppercase tracking-wider bg-red-50 px-1 py-0.2 rounded border border-red-200/50 no-underline inline-block">(Cancelled)</span>}
                      </span>
                    );
                  })}
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
