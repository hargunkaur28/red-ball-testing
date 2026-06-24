import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axios';
import PageHeader from '../../components/shared/PageHeader';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'sonner';
import socket from '../../lib/socket';
import {
  Clock, ChefHat, CheckCircle, Truck, X, DollarSign, FileText, User,
  LayoutGrid, List, MapPin, Timer, Ban, RefreshCw, ExternalLink,
  ChevronDown, Eye,
} from 'lucide-react';


const statusConfig = {
  new:       { label: 'New Orders',         color: 'border-blue-500 bg-blue-50/40',   headerBg: 'bg-blue-600 text-white',        icon: <Clock size={18} /> },
  preparing: { label: 'Preparing',           color: 'border-amber-500 bg-amber-50/40', headerBg: 'bg-amber-500 text-black',       icon: <ChefHat size={18} /> },
  ready:     { label: 'Ready for Table',     color: 'border-green-500 bg-green-50/40', headerBg: 'bg-green-600 text-white',       icon: <CheckCircle size={18} /> },
  delivered: { label: 'Delivered / Closed',  color: 'border-gray-300 bg-gray-50/40',   headerBg: 'bg-gray-700 text-white',        icon: <Truck size={18} /> },
};

const itemStatusStyle = {
  pending:    'text-gray-500',
  preparing:  'text-amber-600 font-bold',
  ready:      'text-green-600 font-bold',
  delivered:  'text-gray-400 line-through',
  cancelled:  'text-red-500 line-through',
  refunded:   'text-purple-500 line-through',
};

const PREP_OPTIONS = [10, 15, 20, 30, 45, 60];

const getTimeAgo = (mins) => {
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ${mins % 60}m ago`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h ago`;
};

const getReadyIn = (estimatedReadyAt) => {
  if (!estimatedReadyAt) return null;
  const diff = Math.ceil((new Date(estimatedReadyAt) - Date.now()) / 60000);
  if (diff <= 0) return 'Ready now';
  return `Ready in ${diff} min`;
};

export default function RestaurantOrders() {
  const qc = useQueryClient();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [viewMode, setViewMode] = useState('card');
  const [prepInputs, setPrepInputs] = useState({});
  const [prepValues, setPrepValues] = useState({});
  const [prepCustom, setPrepCustom] = useState({});
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [cancelDialog, setCancelDialog] = useState(null);
  const [cancelRemark, setCancelRemark] = useState('');
  const [viewingOrderDetails, setViewingOrderDetails] = useState(null);

  // Drag-and-drop state
  const [draggedOrderId, setDraggedOrderId] = useState(null);
  const [draggedFromStatus, setDraggedFromStatus] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [confirmDrag, setConfirmDrag] = useState(null); // { orderId, orderNumber, fromStatus, toStatus }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const { data } = useQuery({
    queryKey: ['restaurant-orders'],
    queryFn: () => api.get('/orders').then(r => r.data),
    refetchInterval: 10000,
  });

  // Socket subscriptions — use shared singleton (no new connection per mount)
  useEffect(() => {
    socket.emit('join-managers', { token: localStorage.getItem('accessToken') });

    const invalidateOrders = () => qc.invalidateQueries({ queryKey: ['restaurant-orders'] });

    const handleOrderNew = (payload) => {
      invalidateOrders();
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch {}
      const tableLbl = payload?.order?.tableId?.label || 'a Table';
      toast.success(`🔔 Incoming Order from ${tableLbl}!`, { description: 'Check New Orders column.' });
    };

    socket.on('order:new', handleOrderNew);
    socket.on('order:updated', invalidateOrders);
    socket.on('order:cancelled', invalidateOrders);
    socket.on('restaurant:orderUpdated', invalidateOrders);
    socket.on('restaurant:itemCancelled', invalidateOrders);
    socket.on('restaurant:itemRefunded', invalidateOrders);
    socket.on('dashboard:refresh', invalidateOrders);

    return () => {
      socket.off('order:new', handleOrderNew);
      socket.off('order:updated', invalidateOrders);
      socket.off('order:cancelled', invalidateOrders);
      socket.off('restaurant:orderUpdated', invalidateOrders);
      socket.off('restaurant:itemCancelled', invalidateOrders);
      socket.off('restaurant:itemRefunded', invalidateOrders);
      socket.off('dashboard:refresh', invalidateOrders);
    };
  }, [qc]);

  const statusMoveLabels = { preparing: 'Order moved to Preparing', ready: 'Order marked Ready', delivered: 'Order Delivered' };

  const updateMutation = useMutation({
    mutationFn: ({ id, status, paymentStatus }) => api.put(`/orders/${id}/status`, { status, paymentStatus }),
    onMutate: async ({ id, status, paymentStatus }) => {
      await qc.cancelQueries({ queryKey: ['restaurant-orders'] });
      const previous = qc.getQueryData(['restaurant-orders']);
      qc.setQueryData(['restaurant-orders'], (old) => {
        if (!old?.orders) return old;
        return {
          ...old,
          orders: old.orders.map(o =>
            o._id === id
              ? { ...o, ...(status && { status }), ...(paymentStatus && { paymentStatus }) }
              : o
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      qc.setQueryData(['restaurant-orders'], context.previous);
      toast.error('Failed to update order. Please try again.');
    },
    onSuccess: (_, { status }) => {
      if (status && statusMoveLabels[status]) toast.success(statusMoveLabels[status]);
    },
    onSettled: () => { qc.invalidateQueries({ queryKey: ['restaurant-orders'] }); },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }) => api.put(`/orders/${id}/cancel`, { reason, refund: false }),
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: ['restaurant-orders'] });
      const previous = qc.getQueryData(['restaurant-orders']);
      qc.setQueryData(['restaurant-orders'], (old) => {
        if (!old?.orders) return old;
        return { ...old, orders: old.orders.map(o => o._id === id ? { ...o, status: 'cancelled' } : o) };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      qc.setQueryData(['restaurant-orders'], context.previous);
      toast.error('Failed to cancel order.');
    },
    onSettled: () => { qc.invalidateQueries({ queryKey: ['restaurant-orders'] }); },
    onSuccess: () => toast.success('Order cancelled.'),
  });

  const prepTimeMutation = useMutation({
    mutationFn: ({ id, minutes }) => api.put(`/orders/${id}/prep-time`, { estimatedPrepMinutes: minutes }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['restaurant-orders'] });
      setPrepInputs(p => ({ ...p, [id]: false }));
      toast.success('Prep time set.');
    },
  });

  const cancelItemMutation = useMutation({
    mutationFn: ({ orderId, itemId, reason }) => api.put(`/orders/${orderId}/items/${itemId}/cancel`, { reason }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['restaurant-orders'] });
      setCancelDialog(null);
      setCancelRemark('');
      toast.success('Item cancelled.');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to cancel item.'),
  });

  const refundItemMutation = useMutation({
    mutationFn: ({ orderId, itemId }) => api.put(`/orders/${orderId}/items/${itemId}/refund`, { note: 'Manual refund by manager' }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['restaurant-orders'] }); toast.success('Item marked as refunded.'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to mark refund.'),
  });

  const rawOrders = data?.orders || [];
  const orders = rawOrders.filter(o => ['cash', 'upi', 'online'].includes(o.paymentMethod) || o.paymentStatus === 'paid');
  const kanbanColumns = ['new', 'preparing', 'ready', 'delivered'];
  const nextStatus = { new: 'preparing', preparing: 'ready', ready: 'delivered' };
  const actionLabels = { new: '✓ Accept & Start Prep', preparing: '🍽️ Mark Ready', ready: '🚚 Delivered' };

  const renderOrderCard = (order, index) => {
    const orderTimeMs = new Date(order.createdAt).getTime();
    const diffMins = Math.max(0, Math.floor((currentTime - orderTimeMs) / 60000));
    const isManualPending = ['cash', 'upi'].includes(order.paymentMethod) && order.paymentStatus === 'pending';
    const status = order.status;
    const readyIn = getReadyIn(order.estimatedReadyAt);
    const hasCancelledItems = order.items?.some(i => i.status === 'cancelled' || i.status === 'refunded');
    const isPrepOpen = prepInputs[order._id];

    const isDraggable = status !== 'cancelled';

    return (
      <motion.div
        key={order._id}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, delay: index * 0.04 }}
        draggable={isDraggable}
        onDragStart={(e) => {
          // Don't start drag if the user clicked a button or link
          if (e.target.closest('button, a, input, select, textarea')) { e.preventDefault(); return; }
          setDraggedOrderId(order._id);
          setDraggedFromStatus(status);
          e.dataTransfer.effectAllowed = 'move';
        }}
        onDragEnd={() => { setDraggedOrderId(null); setDraggedFromStatus(null); setDragOverColumn(null); }}
        className={`bg-white rounded-2xl p-4 border shadow-md flex flex-col gap-3 transition-all select-none ${
          isDraggable ? 'cursor-grab active:cursor-grabbing' : ''
        } ${
          status === 'new' ? 'border-l-8 border-l-blue-600' :
          status === 'preparing' ? 'border-l-8 border-l-amber-500' :
          status === 'ready' ? 'border-l-8 border-l-green-600' : ''
        } ${draggedOrderId === order._id ? 'opacity-50 scale-95' : ''}`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 flex-nowrap gap-2">
          <span className="font-mono font-black text-xs text-black shrink-0 whitespace-nowrap">{order.orderNumber}</span>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 inline-flex items-center gap-1 ${diffMins > 25 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            <span>⏱️</span>
            <span>{getTimeAgo(diffMins)}</span>
          </span>
        </div>

        {/* Table / Customer info */}
        <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-[#C8102E]">
              {order.orderType === 'delivery' ? '🛵 Delivery Order' : order.orderType === 'pickup' ? '🏃 Pickup Order' : (order.tableId?.label || `Table #${order.tableId?.tableNumber || 'Dine-in'}`)}
            </span>
            <span className="text-xs text-gray-500 font-semibold">{order.orderType || order.tableId?.section || 'Indoor'}</span>
          </div>
          {(order.customerName || order.customerId?.name) && (
            <p className="text-xs text-gray-600 flex items-center gap-1 font-medium min-w-0">
              <User size={12} className="shrink-0" />
              <span className="truncate">
                {order.customerName || order.customerId?.name}
                {order.customerPhone && <span className="text-gray-400"> ({order.customerPhone})</span>}
              </span>
            </p>
          )}

          {/* Delivery location */}
          {order.orderType === 'delivery' && (
            <div className="mt-1 space-y-1">
              {order.deliveryAddress && (
                <div className="text-xs font-medium">
                  <button
                    onClick={() => setExpandedAddresses(prev => ({ ...prev, [order._id]: !prev[order._id] }))}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors py-1 cursor-pointer outline-none w-full text-left"
                  >
                    <MapPin size={12} className="text-[#C8102E] shrink-0" />
                    <span className="text-xs font-bold text-gray-600">Delivery Address</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${expandedAddresses[order._id] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedAddresses[order._id] && (
                    <p className="mt-1 text-[11px] text-gray-600 bg-white border border-gray-100 rounded-lg p-2 leading-normal select-text break-words">
                      {order.deliveryAddress}
                    </p>
                  )}
                </div>
              )}
              {(order.deliveryLocation?.mapsUrl || (order.deliveryLocation?.lat && order.deliveryLocation?.lng) || order.deliveryAddress) && (
                <a
                  href={
                    order.deliveryLocation?.mapsUrl ||
                    (order.deliveryLocation?.lat && order.deliveryLocation?.lng
                      ? `https://maps.google.com/?q=${order.deliveryLocation.lat},${order.deliveryLocation.lng}`
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.deliveryAddress)}`)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-black text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full transition-all"
                >
                  <ExternalLink size={10} /> Open in Maps
                </a>
              )}
            </div>
          )}
        </div>

        {/* Prep time badge / setter */}
        {status === 'preparing' && (
          <div>
            {order.estimatedPrepMinutes && !isPrepOpen ? (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
                <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                  <Timer size={13} />
                  <span>{readyIn || `${order.estimatedPrepMinutes} min prep`}</span>
                </div>
                <button
                  onClick={() => setPrepInputs(p => ({ ...p, [order._id]: true }))}
                  className="text-[10px] text-amber-600 font-bold underline underline-offset-2"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 space-y-2">
                <p className="text-xs font-bold text-amber-800 flex items-center gap-1"><Timer size={12} /> Set Prep Time</p>
                <div className="flex flex-wrap gap-1.5">
                  {PREP_OPTIONS.map(m => (
                    <button
                      key={m}
                      onClick={() => { setPrepValues(p => ({ ...p, [order._id]: m })); setPrepCustom(p => ({ ...p, [order._id]: '' })); }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all border ${prepValues[order._id] === m && !prepCustom[order._id] ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-amber-200 text-amber-700 hover:bg-amber-100'}`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="180"
                    placeholder="Custom"
                    value={prepCustom[order._id] || ''}
                    onChange={e => { setPrepCustom(p => ({ ...p, [order._id]: e.target.value })); setPrepValues(p => ({ ...p, [order._id]: null })); }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-[11px] font-bold text-amber-800 placeholder:text-amber-300 outline-none focus:border-amber-500"
                  />
                  <span className="text-[11px] text-amber-600 font-bold shrink-0">min</span>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={(!prepValues[order._id] && !prepCustom[order._id]) || prepTimeMutation.isPending}
                    onClick={() => {
                      const mins = prepCustom[order._id] ? Number(prepCustom[order._id]) : prepValues[order._id];
                      if (!mins || mins < 1) return;
                      prepTimeMutation.mutate({ id: order._id, minutes: mins });
                    }}
                    className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black rounded-lg disabled:opacity-50 transition-all"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      if (order.estimatedPrepMinutes) {
                        setPrepInputs(p => ({ ...p, [order._id]: false }));
                      }
                      setPrepCustom(p => ({ ...p, [order._id]: '' }));
                      setPrepValues(p => ({ ...p, [order._id]: null }));
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[11px] font-black rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment status */}
        {isManualPending && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-700 animate-pulse flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1.5 font-bold">
              <DollarSign size={14} /> Collect Payment from Table
            </div>
            <button
              onClick={() => updateMutation.mutate({ id: order._id, paymentStatus: 'paid' })}
              className="px-2.5 py-1 bg-[#C8102E] text-white rounded-lg text-[10px] font-black shadow hover:bg-[#A00D24] transition-all cursor-pointer"
            >
              Mark Paid
            </button>
          </div>
        )}

        {/* Special instructions */}
        {order.specialInstructions && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-900 font-medium">
            <div className="flex items-center gap-1 font-bold text-amber-800 mb-0.5"><FileText size={12} /> Instructions:</div>
            <p className="italic">{order.specialInstructions}</p>
          </div>
        )}

        {/* Items list with per-item cancel */}
        <div className="space-y-1.5 border-t border-gray-100 pt-2">
          {order.items?.map((item) => {
            const isCancelled = item.status === 'cancelled' || item.status === 'refunded';
            const canCancel = !isCancelled && status !== 'delivered' && status !== 'cancelled';
            const needsRefund = item.refundStatus === 'pending';
            const isRefunded = item.refundStatus === 'refunded';

            return (
              <div key={item._id || item.name} className={`flex items-start justify-between gap-2 text-xs rounded-lg px-1.5 py-1 ${isCancelled ? 'bg-red-50' : ''}`}>
                <div className="flex-1 min-w-0">
                  <span className={`font-extrabold text-[#C8102E]`}>{item.quantity}×</span>
                  <span className={`ml-1 ${itemStatusStyle[item.status] || 'text-black font-semibold'}`}>
                    {item.name}{item.size && item.size !== 'Regular' ? ` (${item.size})` : ''}
                  </span>
                  {isCancelled && (
                    <span className="ml-1.5 text-[10px] font-black uppercase tracking-wider">
                      {item.status === 'refunded' || isRefunded ? (
                        <span className="text-purple-600">✓ Refunded</span>
                      ) : needsRefund ? (
                        <span className="text-orange-500">Refund Pending</span>
                      ) : (
                        <span className="text-red-500">Cancelled</span>
                      )}
                    </span>
                  )}
                  {item.kitchenNote && <p className="text-[10px] text-gray-400 italic">Note: {item.kitchenNote}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-mono text-gray-500 text-[11px]">{formatCurrency(item.price * item.quantity)}</span>
                  {canCancel && (
                    <button
                      onClick={() => { setCancelDialog({ orderId: order._id, itemId: item._id, itemName: item.name }); setCancelRemark(''); }}
                      title="Cancel this item"
                      className="p-0.5 rounded-md text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
                    >
                      <Ban size={12} />
                    </button>
                  )}
                  {needsRefund && !isRefunded && (
                    <button
                      onClick={() => refundItemMutation.mutate({ orderId: order._id, itemId: item._id })}
                      disabled={refundItemMutation.isPending}
                      title="Mark refunded"
                      className="px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 text-[9px] font-black transition-all"
                    >
                      Refund
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total & actions */}
        <div className="border-t border-gray-100 pt-2">
          <div className="flex justify-between items-center text-sm font-extrabold mb-3 text-black">
            <div className="flex items-center gap-2">
              <span className="shrink-0">Bill Total</span>
              {!isManualPending && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[9px] font-extrabold border border-green-200 uppercase tracking-wider shrink-0">
                  <CheckCircle size={10} /> Paid
                </span>
              )}
            </div>
            <span className="font-mono text-[#C8102E]">{formatCurrency(order.totalAmount)}</span>
          </div>

          {status !== 'delivered' && status !== 'cancelled' && (
            <div className="flex gap-2">
              {nextStatus[status] && (
                <button
                  onClick={() => updateMutation.mutate({ id: order._id, status: nextStatus[status] })}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    status === 'new' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    status === 'preparing' ? 'bg-[#F5A623] hover:bg-[#E09410] text-black font-black' :
                    'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {actionLabels[status]}
                </button>
              )}
              {status === 'new' && (
                <button
                  onClick={() => cancelMutation.mutate({ id: order._id, reason: 'Rejected by kitchen' })}
                  className="px-3 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-bold transition-all cursor-pointer"
                  title="Reject Order"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <PageHeader
          title="Live Kitchen Orders"
          subtitle={`${orders.filter(o => o.status === 'new').length} New • ${orders.filter(o => o.status === 'preparing').length} Preparing • ${orders.filter(o => o.status === 'ready').length} Ready`}
        />
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'card' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutGrid size={16} /> Card View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <List size={16} /> List View
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {kanbanColumns.map(colStatus => {
            const config = statusConfig[colStatus];
            const columnOrders = orders.filter(o => o.status === colStatus);

            const validDrop = draggedFromStatus && draggedFromStatus !== colStatus;
            const isOver = dragOverColumn === colStatus;

            return (
              <div
                key={colStatus}
                onDragOver={(e) => {
                  if (!draggedOrderId || draggedFromStatus === colStatus) return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  setDragOverColumn(colStatus);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setDragOverColumn(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverColumn(null);
                  if (!draggedOrderId || draggedFromStatus === colStatus) return;
                  const draggedOrder = orders.find(o => o._id === draggedOrderId);
                  setConfirmDrag({
                    orderId: draggedOrderId,
                    orderNumber: draggedOrder?.orderNumber || draggedOrderId,
                    fromStatus: draggedFromStatus,
                    toStatus: colStatus,
                  });
                  setDraggedOrderId(null);
                  setDraggedFromStatus(null);
                }}
                className={`rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[500px] transition-all duration-150 ${
                  isOver && validDrop
                    ? 'border-[#C8102E] ring-2 ring-[#C8102E]/40 scale-[1.01]'
                    : config.color
                }`}
              >
                <div className={`p-4 ${config.headerBg} flex items-center justify-between shadow-md shrink-0`}>
                  <div className="flex items-center gap-2 font-black tracking-wide uppercase text-sm">
                    {config.icon}<span>{config.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {draggedOrderId && validDrop && (
                      <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full animate-pulse">
                        Drop here
                      </span>
                    )}
                    <span className="text-xs font-black px-3 py-1 bg-black/30 rounded-full text-white">{columnOrders.length}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {columnOrders.length === 0 && (
                    <div className={`text-center py-16 font-medium text-xs transition-colors ${isOver && validDrop ? 'text-[#C8102E]' : 'text-gray-400'}`}>
                      {isOver && validDrop ? '↓ Drop to move here' : `No ${config.label.toLowerCase()}`}
                    </div>
                  )}
                  <AnimatePresence>
                    {columnOrders.map((order, index) => renderOrderCard(order, index))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="card p-0 overflow-hidden border border-gray-100 shadow-sm mt-4 w-full max-w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Time & Table</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Items</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Details</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Status / Prep</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-gray-400 italic text-sm">No live orders.</td>
                  </tr>
                ) : (
                  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => {
                    const orderTimeMs = new Date(order.createdAt).getTime();
                    const diffMins = Math.max(0, Math.floor((currentTime - orderTimeMs) / 60000));
                    const isManualPending = ['cash', 'upi'].includes(order.paymentMethod) && order.paymentStatus === 'pending';
                    const sConf = statusConfig[order.status];
                    const readyIn = getReadyIn(order.estimatedReadyAt);

                    return (
                      <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-nowrap">
                              <span className="font-mono text-xs font-bold bg-gray-100 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">{order.orderNumber}</span>
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 inline-flex items-center gap-1 ${diffMins > 25 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                <span>⏱️</span>
                                <span>{getTimeAgo(diffMins)}</span>
                              </span>
                            </div>
                            <div className="text-xs text-black font-black uppercase tracking-tighter">
                              {order.orderType === 'delivery' ? '🛵 Delivery' : order.orderType === 'pickup' ? '🏃 Pickup' : (order.tableId?.label || 'Dine-in')}
                            </div>
                            {order.orderType === 'delivery' && (order.deliveryLocation?.mapsUrl || order.deliveryLocation?.lat || order.deliveryAddress) && (
                              <a
                                href={
                                  order.deliveryLocation?.mapsUrl ||
                                  (order.deliveryLocation?.lat && order.deliveryLocation?.lng
                                    ? `https://maps.google.com/?q=${order.deliveryLocation.lat},${order.deliveryLocation.lng}`
                                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.deliveryAddress)}`)
                                }
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                              >
                                <ExternalLink size={9} /> Open in Maps
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {(order.customerName || order.customerId?.name || 'GU').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-xs">
                              <p className="font-bold">{order.customerName || order.customerId?.name || 'Guest'}</p>
                              <p className="text-[10px] text-gray-400">{order.customerPhone || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-[220px]">
                          <div className="text-xs space-y-1">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className={`flex items-center justify-between gap-2 ${item.status === 'cancelled' || item.status === 'refunded' ? 'opacity-60' : ''}`}>
                                <span className={item.status === 'cancelled' || item.status === 'refunded' ? 'line-through text-red-400' : ''}>
                                  <span className="font-extrabold text-[#C8102E]">{item.quantity}×</span> {item.name}
                                </span>
                                {item.status === 'cancelled' && item.refundStatus === 'pending' && (
                                  <button
                                    onClick={() => refundItemMutation.mutate({ orderId: order._id, itemId: item._id })}
                                    className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded shrink-0"
                                  >Refund</button>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => setViewingOrderDetails(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-all active:scale-95 cursor-pointer border border-gray-200 shadow-sm"
                          >
                            <Eye size={14} className="text-[#C8102E] shrink-0" />
                            <span>View Details</span>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${sConf?.color || 'bg-gray-100'} shadow-sm mb-1`}>
                            {sConf?.icon}
                            <span className="text-[10px] font-black uppercase tracking-wider">{sConf?.label || order.status}</span>
                          </div>
                          {readyIn && (
                            <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                              <Timer size={10} /> {readyIn}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-extrabold font-mono">{formatCurrency(order.totalAmount)}</p>
                          {isManualPending ? (
                            <button onClick={() => updateMutation.mutate({ id: order._id, paymentStatus: 'paid' })} className="text-[10px] font-bold text-white bg-[#C8102E] px-2 py-1 rounded shadow mt-1 cursor-pointer">Mark Paid</button>
                          ) : (
                            <span className="inline-flex text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 mt-1">
                              <CheckCircle size={10} className="mr-1" /> {order.paymentMethod}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <div className="flex items-center justify-center gap-2">
                              {nextStatus[order.status] && (
                                <button
                                  onClick={() => updateMutation.mutate({ id: order._id, status: nextStatus[order.status] })}
                                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
                                    order.status === 'new' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                                    order.status === 'preparing' ? 'bg-[#F5A623] hover:bg-[#E09410] text-black' :
                                    'bg-green-600 hover:bg-green-700 text-white'
                                  }`}
                                >
                                  {actionLabels[order.status].replace(/[^\w\s]/g, '').trim()}
                                </button>
                              )}
                              {order.status === 'new' && (
                                <button
                                  onClick={() => cancelMutation.mutate({ id: order._id, reason: 'Rejected by kitchen' })}
                                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all border border-red-100 cursor-pointer"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Item Cancel Dialog */}
      <AnimatePresence>
        {cancelDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => { setCancelDialog(null); setCancelRemark(''); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                  <Ban size={16} className="text-red-500" /> Cancel Item
                </h3>
                <button onClick={() => { setCancelDialog(null); setCancelRemark(''); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Cancelling <span className="font-black text-red-600">{cancelDialog.itemName}</span>. Add a reason (optional).
              </p>
              <textarea
                autoFocus
                rows={3}
                placeholder="e.g. Item unavailable, Customer requested, Out of stock…"
                value={cancelRemark}
                onChange={e => setCancelRemark(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-400 focus:bg-white resize-none transition-all placeholder:text-gray-400"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => cancelItemMutation.mutate({ orderId: cancelDialog.orderId, itemId: cancelDialog.itemId, reason: cancelRemark.trim() || undefined })}
                  disabled={cancelItemMutation.isPending}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-black transition-all disabled:opacity-60"
                >
                  {cancelItemMutation.isPending ? 'Cancelling…' : 'Confirm Cancel'}
                </button>
                <button
                  onClick={() => { setCancelDialog(null); setCancelRemark(''); }}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-all"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Status Change Confirmation Dialog */}
      <AnimatePresence>
        {confirmDrag && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setConfirmDrag(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setConfirmDrag(null);
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <RefreshCw size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">Change Order Status</h3>
                  <p className="text-xs text-gray-500">This action will update the order immediately</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                <p className="text-sm text-gray-700">
                  Are you sure you want to move <span className="font-black text-black">{confirmDrag.orderNumber}</span> from{' '}
                  <span className={`font-black ${
                    confirmDrag.fromStatus === 'new' ? 'text-blue-600' :
                    confirmDrag.fromStatus === 'preparing' ? 'text-amber-600' :
                    confirmDrag.fromStatus === 'ready' ? 'text-green-600' : 'text-gray-600'
                  }`}>{statusConfig[confirmDrag.fromStatus]?.label || confirmDrag.fromStatus}</span>{' '}
                  to{' '}
                  <span className={`font-black ${
                    confirmDrag.toStatus === 'new' ? 'text-blue-600' :
                    confirmDrag.toStatus === 'preparing' ? 'text-amber-600' :
                    confirmDrag.toStatus === 'ready' ? 'text-green-600' : 'text-gray-600'
                  }`}>{statusConfig[confirmDrag.toStatus]?.label || confirmDrag.toStatus}</span>?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  autoFocus
                  onClick={() => {
                    updateMutation.mutate({ id: confirmDrag.orderId, status: confirmDrag.toStatus });
                    setConfirmDrag(null);
                  }}
                  className="flex-1 py-2.5 bg-[#C8102E] hover:bg-[#A00D24] text-white rounded-xl text-sm font-black transition-all shadow-md"
                >
                  Yes, move it
                </button>
                <button
                  onClick={() => setConfirmDrag(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {viewingOrderDetails && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setViewingOrderDetails(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-black bg-gray-200 px-2.5 py-0.5 rounded-full">
                    {viewingOrderDetails.orderNumber}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">
                    Order Details
                  </span>
                </div>
                <button
                  onClick={() => setViewingOrderDetails(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Status and Method Banner */}
                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">Order Status</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
                      viewingOrderDetails.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                      viewingOrderDetails.status === 'preparing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      viewingOrderDetails.status === 'ready' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      viewingOrderDetails.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-100 text-gray-650 border-gray-200'
                    }`}>
                      {viewingOrderDetails.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">Payment Status</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
                      viewingOrderDetails.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {viewingOrderDetails.paymentMethod?.toUpperCase()} · {viewingOrderDetails.paymentStatus?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Details</h4>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2.5 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Name:</span>
                      <span className="font-bold text-black">{viewingOrderDetails.customerName || viewingOrderDetails.customerId?.name || 'Guest'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Phone:</span>
                      <span className="font-bold text-black">{viewingOrderDetails.customerPhone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Order Type:</span>
                      <span className="font-bold text-[#C8102E] uppercase">
                        {viewingOrderDetails.orderType === 'delivery' ? '🛵 Delivery' : viewingOrderDetails.orderType === 'pickup' ? '🏃 Pickup' : `🍽️ Dine-In (${viewingOrderDetails.tableId?.label || 'Table'})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address / Instructions */}
                {(viewingOrderDetails.deliveryAddress || viewingOrderDetails.specialInstructions) && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery & Instructions</h4>
                    
                    {viewingOrderDetails.deliveryAddress && (
                      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs text-blue-950 leading-relaxed shadow-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1 font-bold text-blue-800">
                            <MapPin size={13} className="text-[#C8102E] shrink-0" />
                            <span>Delivery Address:</span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(viewingOrderDetails.deliveryAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 hover:text-blue-850"
                          >
                            <ExternalLink size={10} /> Maps
                          </a>
                        </div>
                        <p className="text-gray-700 select-text break-words leading-normal">{viewingOrderDetails.deliveryAddress}</p>
                      </div>
                    )}

                    {viewingOrderDetails.specialInstructions && (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed shadow-sm">
                        <div className="flex items-center gap-1 font-bold text-amber-800 mb-1.5">
                          <FileText size={13} className="shrink-0 text-amber-700" />
                          <span>Special Instructions:</span>
                        </div>
                        <p className="italic font-semibold leading-normal">{viewingOrderDetails.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Items Summary</h4>
                  <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden bg-white shadow-sm">
                    {viewingOrderDetails.items?.map((item, idx) => {
                      const isCancelled = item.status === 'cancelled' || item.status === 'refunded';
                      return (
                        <div key={idx} className={`p-3 flex items-start justify-between gap-3 text-xs ${isCancelled ? 'bg-red-50/50' : 'hover:bg-gray-50/40'}`}>
                          <div>
                            <p className="font-bold text-black">
                              <span className="text-[#C8102E] font-black">{item.quantity}×</span> {item.name}
                              {item.size && item.size !== 'Regular' && <span className="text-gray-500 font-normal text-[11px]"> ({item.size})</span>}
                            </p>
                            {item.kitchenNote && <p className="text-[10px] text-gray-400 italic mt-0.5">Note: {item.kitchenNote}</p>}
                            {isCancelled && (
                              <span className="inline-flex text-[9px] font-black uppercase tracking-wider text-red-500 mt-1">
                                {item.status}
                              </span>
                            )}
                          </div>
                          <span className={`font-mono font-semibold ${isCancelled ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                    {/* Bill Summary */}
                    <div className="p-3.5 bg-gray-50 space-y-1.5 text-xs font-semibold border-t border-gray-100">
                      <div className="flex justify-between text-gray-500">
                        <span>Total Amount:</span>
                        <span className="font-mono font-bold text-[#C8102E] text-sm">
                          {formatCurrency(viewingOrderDetails.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => setViewingOrderDetails(null)}
                  className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-xs transition-all active:scale-95"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
