import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles } from 'lucide-react';
import MembershipBookingModal from './MembershipBookingModal';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { formatCurrency } from '../../lib/utils';
import useAuthStore from '../../store/authStore';

const DURATION_LABEL = {
  '1 Month': { short: '1 Month', badge: null },
  '3 Months': { short: '3 Month', badge: 'Popular' },
  '6 Months': { short: '6 Month', badge: 'Best Value' },
  '1 Year': { short: '1 Year', badge: 'Max Savings' },
};

export default function MembershipPlanCard({ plan, index = 0 }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const meta = DURATION_LABEL[plan.duration] || { short: plan.duration, badge: null };
  const isPopular = meta.badge === 'Popular';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: membershipData } = useQuery({
    queryKey: ['my-memberships', user?.id],
    queryFn: () => api.get(`/memberships/${user.id}`).then((r) => r.data),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const activeMemberships = membershipData?.memberships || [];
  const matchingMembership = activeMemberships.find(
    m => (m.planId?._id === plan._id || m.planId === plan._id) && ['active', 'pending', 'frozen'].includes(m.status)
  );
  const isInUse = !!matchingMembership;

  const daysLeft = matchingMembership?.endDate
    ? Math.ceil((new Date(matchingMembership.endDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;
  const canRenew = isInUse && daysLeft !== null && daysLeft <= 7;

  const handleBuy = () => {
    if (isInUse && !canRenew) return;
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl p-5 flex flex-col gap-4 cursor-pointer transition-all duration-300 h-full"
      style={{
        background: isPopular
          ? 'linear-gradient(135deg, #1A0A0D 0%, #2D1215 100%)'
          : '#111515',
        border: isPopular ? '1px solid rgba(200,16,46,0.4)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isPopular ? '0 8px 32px rgba(200,16,46,0.15)' : '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Popular badge */}
      {meta.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
          style={{
            background: isPopular ? '#C8102E' : '#F5A623',
            color: '#fff',
          }}
        >
          {isPopular && <Sparkles size={9} />}
          {meta.badge}
        </div>
      )}

      {/* Top section */}
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={13} className={isPopular ? 'text-[#C8102E]' : 'text-[#F5A623]'} />
            <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-bold">
              {plan.duration}
            </span>
          </div>
          <p className="text-white font-black text-xl leading-tight pr-4">{plan.name}</p>
        </div>
        <div className="flex items-end gap-2">
          <p
            className="font-black text-[28px] leading-none"
            style={{ color: isPopular ? '#df1526' : '#F5A623' }}
          >
            {formatCurrency(plan.price)}
          </p>
        </div>
      </div>

      {/* Features */}
      {plan.features?.length > 0 && (
        <ul className="space-y-1.5">
          {plan.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-white/60">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: isPopular ? 'rgba(200,16,46,0.15)' : 'rgba(245,166,35,0.15)',
                  border: isPopular ? '1px solid rgba(200,16,46,0.3)' : '1px solid rgba(245,166,35,0.3)',
                }}
              >
                <Check size={9} style={{ color: isPopular ? '#C8102E' : '#F5A623' }} />
              </div>
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {isInUse && !canRenew && daysLeft !== null && (
        <p className="text-center text-[11px] font-semibold" style={{ color: isPopular ? '#C8102E' : '#F5A623' }}>
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining
        </p>
      )}
      {canRenew && (
        <p className="text-center text-[11px] font-semibold text-amber-400">
          Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''} — renew now
        </p>
      )}

      <button
        onClick={handleBuy}
        disabled={isInUse && !canRenew}
        className="w-full mt-auto py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: isInUse && !canRenew
            ? 'rgba(255,255,255,0.1)'
            : canRenew
            ? 'linear-gradient(90deg, #d97706, #b45309)'
            : isPopular
            ? 'linear-gradient(90deg, #df1526, #C8102E)'
            : 'rgba(255,255,255,0.06)',
          color: isInUse && !canRenew
            ? 'rgba(255,255,255,0.4)'
            : '#fff',
          border: (isPopular || isInUse) ? 'none' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {isInUse && !canRenew ? 'Currently Active' : canRenew ? `Renew ${meta.short} Plan` : `Buy ${meta.short} Plan`}
      </button>

      <MembershipBookingModal
        plan={plan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
