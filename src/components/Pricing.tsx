import React, { useState } from 'react';
import { Check, Sparkles, CreditCard, ShieldCheck, HelpCircle, X, HelpCircle as QuestionIcon, ArrowRight, Star, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PricingProps {
  currentPlan: 'free' | 'pro';
  onUpgradeSuccess: () => void;
}

export default function Pricing({ currentPlan, onUpgradeSuccess }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [discountCode, setDiscountCode] = useState('');
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated credit card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const monthlyPrice = 12;
  const annualPrice = 8; // Per month

  const activePrice = billingPeriod === 'monthly' ? monthlyPrice : annualPrice;

  const features = [
    { name: 'Access to all standard utilities', free: true, pro: true },
    { name: 'Unlimited Daily operations', free: false, pro: true },
    { name: 'Zero Advertisement placements', free: false, pro: true },
    { name: 'Gemini AI intelligent assistant', free: '5 queries/day', pro: 'Unlimited' },
    { name: 'Priority cloud pipeline processing', free: false, pro: true },
    { name: 'Early access to sandbox utilities', free: false, pro: true },
    { name: 'API custom edge hooks integration', free: false, pro: true },
  ];

  const handleApplyDiscount = () => {
    if (!discountCode) return;
    setIsApplyingCode(true);
    setTimeout(() => {
      setIsApplyingCode(false);
    }, 800);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3);
    }, 2000);
  };

  const handleCheckoutClose = () => {
    if (checkoutStep === 3) {
      onUpgradeSuccess();
    }
    setShowCheckout(false);
    setCheckoutStep(1);
    setCardNumber('');
    setCardExpiry('');
    setCardCVC('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="pricing-root">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Flexible licensing. <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">No commitment.</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          Unlock unlimited daily runs, zero advertisements, and lightning-fast developer capabilities. Cancel at any time.
        </p>

        {/* Toggler */}
        <div className="pt-4 flex justify-center items-center gap-3">
          <span className={`text-xs ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-800 transition-colors duration-200 ease-in-out focus:outline-hidden"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-blue-500 shadow-sm ring-0 transition duration-200 ease-in-out ${
                billingPeriod === 'annual' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs ${billingPeriod === 'annual' ? 'text-white' : 'text-gray-500'}`}>Annual billing</span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-400 uppercase tracking-wide">
              Save 33%
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-12 items-stretch">
        {/* Free Plan Card */}
        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-8 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Free Account</span>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="ml-1 text-sm text-gray-500">/ forever</span>
            </div>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              Standard access to all web-based offline utilities with comfortable daily allowances and simple ad support.
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-gray-900/60 pt-6">
              <li className="flex items-center gap-2.5 text-xs text-gray-300">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100 total operations per day</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-300">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Standard conversion speeds</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-300">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Basic customer service channels</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6">
            <button
              disabled={currentPlan === 'free'}
              className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 disabled:opacity-50 border border-gray-800 py-3.5 text-xs font-bold text-white transition-all active:scale-98"
            >
              {currentPlan === 'free' ? 'Currently Active' : 'Basic Tier'}
            </button>
          </div>
        </div>

        {/* Pro Plan Card - Highly Styled */}
        <div className="rounded-2xl border-2 border-blue-500/30 bg-[#1F2937]/35 p-8 flex flex-col justify-between backdrop-blur-md shadow-2xl shadow-blue-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 rounded-bl-xl bg-blue-500 px-3 py-1 text-[9px] font-extrabold text-white uppercase tracking-wider">
            Premium Choice
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Developer Pro</span>
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-black text-white">${activePrice}</span>
              <span className="ml-1 text-sm text-gray-400">/ per month</span>
            </div>
            <p className="mt-4 text-xs text-gray-300 leading-relaxed">
              Unrestricted high-speed operations, zero ads, priority processing queues, and direct custom Webhooks.
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-blue-500/10 pt-6">
              <li className="flex items-center gap-2.5 text-xs text-gray-200">
                <Check className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-white">Unlimited daily runs</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-200">
                <Check className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Zero interstitial ads</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-200">
                <Check className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Priority processing lines</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-200">
                <Check className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Early access preview features</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6">
            <button
              onClick={() => {
                if (currentPlan === 'free') {
                  setShowCheckout(true);
                  setCheckoutStep(1);
                }
              }}
              disabled={currentPlan === 'pro'}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:translate-y-[-1px]"
              id="upgrade-to-pro-billing-btn"
            >
              {currentPlan === 'pro' ? 'Lifetime Pro Active' : 'Upgrade to Pro Account'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Comparison */}
      <div className="mt-16 border-t border-white/5 pt-16 max-w-4xl mx-auto">
        <h2 className="text-center text-lg font-bold text-white mb-8">Detailed Feature Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-3 text-slate-400 font-semibold uppercase tracking-wider">Features</th>
                <th className="py-3 text-slate-400 font-semibold uppercase tracking-wider text-center w-28">Free Plan</th>
                <th className="py-3 text-slate-400 font-semibold uppercase tracking-wider text-center w-28">Pro Plan</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feat, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <th className="py-4 font-normal text-gray-300">{feat.name}</th>
                  <td className="py-4 text-center">
                    {typeof feat.free === 'boolean' ? (
                      feat.free ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-gray-600">—</span>
                    ) : (
                      <span className="text-gray-400">{feat.free}</span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {typeof feat.pro === 'boolean' ? (
                      feat.pro ? <Check className="h-4 w-4 text-blue-400 mx-auto" /> : <span className="text-gray-600">—</span>
                    ) : (
                      <span className="text-blue-400 font-bold">{feat.pro}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Realistic Interactive Checkout Overlays */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111827]/90 p-6 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-2xl"
              id="checkout-portal-card"
            >
              {/* Confetti glow effect on Step 3 */}
              {checkoutStep === 3 && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
              )}

              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Secure Stripe Payment Gateway</span>
                </div>
                <button
                  onClick={handleCheckoutClose}
                  className="rounded-lg p-1 text-gray-500 hover:text-white hover:bg-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Step 1: Summary */}
              {checkoutStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Review subscription details</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Licensed to edge server containers</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 border border-white/5 space-y-2.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Developer Pro Account ({billingPeriod})</span>
                      <span className="font-semibold text-white">${activePrice}/mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Recurrent billing interval</span>
                      <span>Every {billingPeriod === 'monthly' ? 'month' : '12 months'}</span>
                    </div>
                    {billingPeriod === 'annual' && (
                      <div className="flex justify-between text-[11px] text-emerald-400">
                        <span>Annual Savings</span>
                        <span>-$48.00 USD</span>
                      </div>
                    )}
                    <div className="border-t border-white/5 pt-2.5 flex justify-between text-xs font-bold text-white">
                      <span>Total due today</span>
                      <span>{billingPeriod === 'monthly' ? '$12.00' : '$96.00'} USD</span>
                    </div>
                  </div>

                  {/* Discount input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Apply Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. EARLYBIRD"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white uppercase focus:border-blue-500/50 outline-hidden"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors"
                      >
                        {isApplyingCode ? '...' : 'Apply'}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-colors mt-6"
                  >
                    <span>Proceed to Card Information</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment forms */}
              {checkoutStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Enter billing details</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">SSL Secured TLS 1.3 Encryption</p>
                  </div>

                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white focus:border-blue-500 outline-hidden font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white focus:border-blue-500 outline-hidden font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Security CVC</label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="•••"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white focus:border-blue-500 outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleProcessPayment}
                      disabled={isProcessing || !cardNumber || !cardExpiry || !cardCVC}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-3 text-xs font-bold text-white transition-colors"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Authorizing Card...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Submit Payment</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="w-full text-center text-[11px] text-gray-500 hover:text-white"
                    >
                      Go back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success Celebration */}
              {checkoutStep === 3 && (
                <div className="text-center py-6 space-y-5">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <Check className="h-6 w-6 text-emerald-400 animate-bounce" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
                      <span>Upgrade successful!</span>
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Your container has been upgraded to Developer Pro status. Enjoy unlimited operations and priority channels.
                    </p>
                  </div>

                  <button
                    onClick={handleCheckoutClose}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-colors"
                  >
                    Launch Developer Portal
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
