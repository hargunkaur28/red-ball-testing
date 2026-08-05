import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CreditCard, CheckCircle2, Loader2, User, Mail, Phone,
  Sparkles, ShieldCheck, Check, Zap, Crown, Dumbbell, Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { formatCurrency } from '../../lib/utils';
import useAuthStore from '../../store/authStore';
import PhoneCollectModal from '../shared/PhoneCollectModal';

const validPhone = (p) => /^[6-9]\d{9}$/.test(String(p || '').replace(/\D/g, '')) ? String(p).replace(/\D/g, '') : '';

export default function MembershipBookingModal({ plan, sport, isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, checkAuth, googleAuth } = useAuthStore();

  const [withTraining, setWithTraining] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingVerify, setPendingVerify] = useState(null); // saved if 502, allows retry

  const trainingAvailable = plan?.trainingAvailable && plan?.trainingPrice > 0;
  const basePrice = plan?.price || 0;
  const trainingPrice = plan?.trainingPrice || 0;

  const totalPrice = basePrice + (withTraining ? trainingPrice : 0);

  // Reset training option when modal opens/plan changes
  useEffect(() => {
    if (isOpen) setWithTraining(false);
  }, [isOpen, plan?._id]);

  // Load Razorpay script once
  useEffect(() => {
    if (document.getElementById('rzp-script')) {
      setScriptLoaded(true);
      return;
    }
    const s = document.createElement('script');
    s.id = 'rzp-script';
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => setScriptLoaded(true);
    document.body.appendChild(s);
  }, []);

  // Google Sign-In button
  const googleButtonRef = useCallback(
    (node) => {
      if (!node || isAuthenticated) return;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) return;
      const render = () => {
        if (!window.google?.accounts?.id) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            if (!credential) return;
            try {
              await googleAuth(credential);
              toast.success('Signed in with Google.');
            } catch (err) {
              toast.error(err.response?.data?.message || 'Google sign-in failed');
            }
          },
        });
        node.innerHTML = '';
        window.google.accounts.id.renderButton(node, { theme: 'filled_black', size: 'large', type: 'standard' });
      };
      if (window.google?.accounts?.id) render();
      else {
        const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (existing) existing.addEventListener('load', render);
        else {
          const s = document.createElement('script');
          s.src = 'https://accounts.google.com/gsi/client';
          s.async = true;
          s.defer = true;
          s.onload = render;
          document.body.appendChild(s);
        }
      }
    },
    [isAuthenticated, googleAuth]
  );

  const handlePurchase = async () => {
    if (!plan?._id) return toast.error('Plan not selected.');
    // Sign-in required for every membership type — the API rejects anonymous buyers,
    // so stop before Razorpay opens on a purchase that cannot complete.
    if (!isAuthenticated) {
      return toast.error('Please sign in to buy a membership.');
    }
    if (!user?.phone) {
      setShowPhoneModal(true);
      return;
    }
    if (!scriptLoaded || !window.Razorpay) {
      return toast.error('Payment gateway loading. Please retry.');
    }

    setSubmitting(true);
    try {
      const { data: orderRes } = await api.post('/memberships/public-purchase', {
        planId: plan._id,
        withTraining: trainingAvailable && withTraining,
        customerDetails: { name: user.name, email: user.email, phone: user.phone },
      });

      if (!orderRes.success) throw new Error(orderRes.message);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.rzpOrder.amount,
        currency: orderRes.rzpOrder.currency,
        name: 'Alchemy 360',
        description: `Membership: ${plan.name}${withTraining ? ' + Training' : ''}`,
        order_id: orderRes.rzpOrder.id,
        theme: { color: '#C5DB3B' },
        prefill: {
          name: user.name,
          email: user.email,
          contact: validPhone(user.phone),
        },
        handler: async (response) => {
          setSubmitting(true);
          const verifyPayload = {
            paymentId: orderRes.paymentId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            customerDetails: { name: user.name, email: user.email, phone: user.phone },
          };
          try {
            const { data: verifyRes } = await api.post('/memberships/public-verify', verifyPayload);

            if (verifyRes.success) {
              setPendingVerify(null);
              if (verifyRes.token) {
                localStorage.setItem('token', verifyRes.token);
                await checkAuth();
              }
              setSuccess(true);
              toast.success('Membership confirmed! Redirecting to dashboard...');
              setTimeout(() => {
                navigate('/user');
              }, 2800);
            } else {
              toast.error(verifyRes.message || 'Verification failed.');
            }
          } catch (err) {
            const status = err.response?.status;
            if (status === 502 || status === 503 || status === 504) {
              setPendingVerify(verifyPayload);
              toast.error('Payment went through but verification timed out. Use the Retry button below.');
            } else {
              toast.error(err.response?.data?.message || 'Verification failed. Contact reception.');
            }
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled.');
            setSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(response.error.description || 'Payment failed.');
        setSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Could not initialize payment.');
      setSubmitting(false);
    }
  };

  return (
    <>
    <PhoneCollectModal
      open={showPhoneModal}
      onClose={() => setShowPhoneModal(false)}
      onSuccess={() => setShowPhoneModal(false)}
    />
    {createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl pointer-events-auto hide-scrollbar"
              style={{
                background: '#0E1313',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, #C5DB3B, #C5DB3B88)` }} />

              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `#C5DB3B20`, border: `1px solid #C5DB3B40` }}
                  >
                    <Crown size={20} className="text-[#C5DB3B]" />
                  </div>
                  <div>
                    <p className="text-white font-black text-base leading-tight">{plan?.name}</p>
                    <p className="text-white/40 text-xs">{plan?.duration} Membership</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 pb-6 space-y-5">
                {success ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                      <Check className="text-green-500" size={32} />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-xl">Payment Confirmed!</h3>
                      <p className="text-white/50 text-sm mt-1">Your membership is now active.</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-xs text-white/40">
                      <Loader2 size={12} className="animate-spin" />
                      Redirecting to dashboard...
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Pricing summary */}
                    <div
                      className="rounded-2xl p-4 space-y-2"
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/50">{plan?.duration} Pass</span>
                        <span className="text-white font-semibold">{formatCurrency(basePrice)}</span>
                      </div>
                      {withTraining && trainingAvailable && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-white/50 flex items-center gap-1.5"><Dumbbell size={12} className="text-[#C5DB3B]" /> Training Add-on</span>
                          <span className="text-white font-semibold">+{formatCurrency(trainingPrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="text-white font-black">Total</span>
                        <span className="font-black text-lg" style={{ color: '#C5DB3B' }}>{formatCurrency(totalPrice)}</span>
                      </div>
                    </div>

                    {/* Training Add-on Toggle */}
                    {trainingAvailable && (
                      <button
                        onClick={() => setWithTraining((v) => !v)}
                        className="w-full rounded-2xl p-4 flex items-center justify-between text-left transition-all"
                        style={{
                          background: withTraining ? 'rgba(197, 219, 59,0.08)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${withTraining ? 'rgba(197, 219, 59,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: withTraining ? 'rgba(197, 219, 59,0.15)' : 'rgba(255,255,255,0.05)' }}>
                            <Dumbbell size={16} className={withTraining ? 'text-[#C5DB3B]' : 'text-white/40'} />
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">Add Training Sessions</p>
                            <p className="text-white/40 text-xs">+{formatCurrency(trainingPrice)} · Personal coaching included</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: withTraining ? '#C5DB3B' : 'rgba(255,255,255,0.1)' }}>
                          {withTraining ? <Check size={12} className="text-white" /> : <Plus size={12} className="text-white/40" />}
                        </div>
                      </button>
                    )}

                    {/* Account details */}
                    {isAuthenticated ? (
                      <div
                        className="rounded-2xl p-4 flex items-center gap-3"
                        style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
                      >
                        <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <CheckCircle2 className="text-green-500" size={16} />
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{user?.name}</p>
                          <p className="text-white/40 text-xs">{user?.email}</p>
                        </div>
                      </div>
                    ) : (
                      /* Sign-in required — guest checkout is not supported for any plan
                         type, so collect an identity instead of contact fields. */
                      <div className="space-y-3">
                        <div
                          className="rounded-2xl p-5 text-center"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <p className="text-white text-sm font-semibold mb-1">Sign in to continue</p>
                          <p className="text-white/50 text-xs leading-relaxed mb-4">
                            Memberships are tied to your account so your QR entry, bookings and renewals stay in one place.
                          </p>
                          <div ref={googleButtonRef} className="flex justify-center" />
                        </div>
                      </div>
                    )}

                    {/* Retry verification button — shown only after a 502/timeout */}
                    {pendingVerify && (
                      <button
                        onClick={async () => {
                          setSubmitting(true);
                          try {
                            const { data: verifyRes } = await api.post('/memberships/public-verify', pendingVerify);
                            if (verifyRes.success) {
                              setPendingVerify(null);
                              if (verifyRes.token) {
                                localStorage.setItem('token', verifyRes.token);
                                await checkAuth();
                              }
                              setSuccess(true);
                              toast.success('Membership confirmed! Redirecting to dashboard...');
                              setTimeout(() => navigate('/user'), 2800);
                            } else {
                              toast.error(verifyRes.message || 'Verification failed.');
                            }
                          } catch (err) {
                            const status = err.response?.status;
                            if (status === 502 || status === 503 || status === 504) {
                              toast.error('Server still unreachable. Wait a moment and try again.');
                            } else {
                              toast.error(err.response?.data?.message || 'Verification failed. Contact reception.');
                            }
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                        disabled={submitting}
                        className="w-full py-3 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff' }}
                      >
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : '⟳ Retry Verification'}
                      </button>
                    )}

                    {/* Pay button */}
                    <button
                      onClick={handlePurchase}
                      disabled={submitting || !plan?._id || !!pendingVerify}
                      className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(135deg, #C5DB3B, #96AC2E)`,
                        boxShadow: `0 8px 24px rgba(197, 219, 59,0.3)`,
                      }}
                    >
                      {submitting ? (
                        <Loader2 size={20} className="animate-spin text-white" />
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-white">
                            <Sparkles size={16} />
                            Pay {formatCurrency(totalPrice)} & Get Pass
                          </div>
                          <span className="text-[10px] text-white/60 font-semibold normal-case tracking-normal">
                            Secured by Razorpay
                          </span>
                        </>
                      )}
                    </button>

                    {/* Security note */}
                    <div className="flex items-center gap-2 text-white/30 text-xs justify-center">
                      <ShieldCheck size={12} />
                      <span>256-bit encrypted · PCI-DSS compliant</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )}
    </>
  );
}
