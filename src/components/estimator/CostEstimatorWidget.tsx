'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatINR } from '@/lib/utils';
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export interface EstimatorRateData {
  serviceType: string;
  serviceName: string;
  unit: string;
  basicRate: number;
  basicLabel: string;
  basicFeatures: string[];
  standardRate: number;
  standardLabel: string;
  standardFeatures: string[];
  premiumRate: number;
  premiumLabel: string;
  premiumFeatures: string[];
  minArea: number;
  defaultArea: number;
  description: string;
  disclaimer: string;
}

interface CostEstimatorWidgetProps {
  rates: EstimatorRateData[];
}

export function CostEstimatorWidget({ rates }: CostEstimatorWidgetProps) {
  const { language, t } = useLanguage();

  const [selectedServiceSlug, setSelectedServiceSlug] = useState(
    rates[0]?.serviceType || 'modular-kitchen'
  );
  const activeRate = rates.find((r) => r.serviceType === selectedServiceSlug) || rates[0];

  const [area, setArea] = useState<number>(activeRate?.defaultArea || 120);
  const [qualityTier, setQualityTier] = useState<'basic' | 'standard' | 'premium'>('standard');

  // Lead modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientArea, setClientArea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [clientWhatsAppUrl, setClientWhatsAppUrl] = useState('');
  const [formError, setFormError] = useState('');

  if (!activeRate) {
    return <div className="p-8 text-center text-charcoal-500">Estimator rates loading...</div>;
  }

  // Calculate pricing
  const currentRatePerUnit =
    qualityTier === 'basic'
      ? activeRate.basicRate
      : qualityTier === 'standard'
      ? activeRate.standardRate
      : activeRate.premiumRate;

  const totalCalculated = Math.round(area * currentRatePerUnit);
  const minEstimated = Math.round(totalCalculated * 0.95);
  const maxEstimated = Math.round(totalCalculated * 1.08);

  const activeFeatures =
    qualityTier === 'basic'
      ? activeRate.basicFeatures
      : qualityTier === 'standard'
      ? activeRate.standardFeatures
      : activeRate.premiumFeatures;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanedPhone = clientPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setFormError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName.trim(),
          phone: cleanedPhone,
          serviceType: activeRate.serviceName,
          area: clientArea.trim() || 'Mumbai / Thane',
          message: `Estimator calculation: ${area} ${activeRate.unit} with ${qualityTier.toUpperCase()} finish. Calculated estimate: ₹${minEstimated.toLocaleString()} - ₹${maxEstimated.toLocaleString()}`,
          source: 'cost_estimator',
          estimatedValue: totalCalculated,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit');

      setLeadSubmitted(true);
      setClientWhatsAppUrl(json.clientWhatsAppUrl);

      trackEvent('estimator_calculated', {
        service: activeRate.serviceName,
        area,
        qualityTier,
        calculatedTotal: totalCalculated,
      });

      trackEvent('lead_form_submitted', {
        serviceType: activeRate.serviceName,
        source: 'cost_estimator',
        leadId: json.leadId,
      });
    } catch (err: any) {
      setFormError(err.message || 'Error saving estimate. Please call 9967302911.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-lg p-6 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Service Selection */}
          <div>
            <label className="block text-sm font-bold text-charcoal-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-wood-800 text-gold-400 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>{t.estimator.selectService}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {rates.map((r) => {
                const isSelected = r.serviceType === selectedServiceSlug;
                return (
                  <button
                    key={r.serviceType}
                    type="button"
                    onClick={() => {
                      setSelectedServiceSlug(r.serviceType);
                      setArea(r.defaultArea);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                      isSelected
                        ? 'border-gold-600 bg-gold-50/70 text-wood-900 ring-2 ring-gold-500/20 shadow-sm'
                        : 'border-cream-300 bg-cream-50/40 text-charcoal-700 hover:bg-cream-100'
                    }`}
                  >
                    <div className="font-bold">{r.serviceName.split('(')[0]}</div>
                    <div className="text-[11px] text-charcoal-500 mt-0.5 font-normal">
                      from ₹{r.basicRate}/{r.unit}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dimensions Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-charcoal-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-wood-800 text-gold-400 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>{t.estimator.enterArea} ({activeRate.unit})</span>
              </label>
              <div className="flex items-center gap-1.5 bg-cream-100 px-3 py-1 rounded-xl border border-cream-300 font-bold text-sm text-wood-900">
                <input
                  type="number"
                  min={activeRate.minArea}
                  max={5000}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value) || activeRate.minArea)}
                  className="w-20 bg-transparent text-right font-bold text-wood-900 focus:outline-none"
                />
                <span className="text-xs text-charcoal-500 font-normal">{activeRate.unit}</span>
              </div>
            </div>

            <input
              type="range"
              min={activeRate.minArea}
              max={selectedServiceSlug === 'full-home-interior' ? 2500 : selectedServiceSlug === 'painting-polishing' ? 3000 : 600}
              step={10}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              aria-label="Area in square feet"
              className="w-full h-2.5 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
            <div className="flex justify-between text-[11px] text-charcoal-500 mt-1 font-medium">
              <span>Min: {activeRate.minArea} {activeRate.unit}</span>
              <span>{activeRate.description}</span>
            </div>
          </div>

          {/* Step 3: Material Quality Tier */}
          <div>
            <label className="block text-sm font-bold text-charcoal-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-wood-800 text-gold-400 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>{t.estimator.selectQuality}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'basic',
                  title: 'Basic Quality',
                  rate: activeRate.basicRate,
                  label: activeRate.basicLabel,
                  desc: 'Cost-effective for rental or budget flats',
                },
                {
                  id: 'standard',
                  title: 'Standard (Recommended)',
                  rate: activeRate.standardRate,
                  label: activeRate.standardLabel,
                  desc: 'IS:710 Marine ply + 1mm Merino laminate',
                  badge: 'Most Popular',
                },
                {
                  id: 'premium',
                  title: 'Luxury / Premium',
                  rate: activeRate.premiumRate,
                  label: activeRate.premiumLabel,
                  desc: 'HDHMR / Acrylic + Blum soft-close fittings',
                },
              ].map((tier) => {
                const isSelected = qualityTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setQualityTier(tier.id as any)}
                    className={`p-3.5 rounded-2xl text-left border transition-all relative ${
                      isSelected
                        ? 'border-wood-800 bg-wood-50/50 ring-2 ring-wood-700/20 shadow-sm'
                        : 'border-cream-300 bg-white hover:bg-cream-50'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-2.5 right-3 bg-gold-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {tier.badge}
                      </span>
                    )}
                    <div className="font-bold text-xs text-charcoal-900">{tier.title}</div>
                    <div className="text-sm font-extrabold text-wood-800 mt-1">
                      ₹{tier.rate.toLocaleString()}
                      <span className="text-[11px] font-normal text-charcoal-500">/{activeRate.unit}</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 mt-1 line-clamp-2 leading-tight">
                      {tier.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Cost Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-wood-900 to-wood-950 text-white rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-wood-800 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Mumbai Estimate</span>
            </div>

            <div className="text-xs text-cream-300 font-medium uppercase tracking-wider">
              {t.estimator.estimatedCost}
            </div>

            <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400 mt-2 mb-1">
              ₹{minEstimated.toLocaleString('en-IN')} - ₹{maxEstimated.toLocaleString('en-IN')}
            </div>

            <div className="text-xs text-cream-300">
              Based on {area} {activeRate.unit} at ₹{currentRatePerUnit}/{activeRate.unit} ({qualityTier.toUpperCase()})
            </div>

            {/* Included Features Checklist */}
            <div className="mt-6 pt-6 border-t border-wood-800 space-y-2.5">
              <div className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">
                Included in this Estimate:
              </div>
              {activeFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-cream-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 text-xs text-cream-200">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>5-Year Workmanship Warranty by Shobhnath Vishwakarma</span>
              </div>
            </div>

            <p className="text-[11px] text-cream-400 italic mt-6 leading-relaxed bg-wood-900/60 p-3 rounded-xl border border-wood-800">
              {activeRate.disclaimer}
            </p>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => setShowLeadModal(true)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gold-600 hover:bg-gold-500 active:bg-gold-700 text-white font-bold text-sm shadow-warm-md hover:shadow-warm-lg transition transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Detailed Quotation to My WhatsApp</span>
            </button>
            <div className="text-center mt-2">
              <span className="text-[11px] text-cream-400">
                ✓ Free site measurement anywhere in Mumbai/Thane
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal on Estimator */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-cream-300">
            {leadSubmitted ? (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-bold text-charcoal-900 mb-2">
                  Estimate Sent!
                </h4>
                <p className="text-xs text-charcoal-600 mb-6">
                  Thank you {clientName}. Shobhnathji has received your project details (₹{minEstimated.toLocaleString()} - ₹{maxEstimated.toLocaleString()}) and will connect to confirm free site inspection.
                </p>
                <a
                  href={clientWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-warm-md mb-3"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <button
                  onClick={() => {
                    setShowLeadModal(false);
                    setLeadSubmitted(false);
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-charcoal-900">
                      Get Itemized Quotation
                    </h4>
                    <p className="text-xs text-charcoal-500">
                      Estimate: ₹{minEstimated.toLocaleString()} - ₹{maxEstimated.toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="text-charcoal-400 hover:text-charcoal-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {formError && (
                  <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                    {formError}
                  </div>
                )}

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sunil Patil"
                      className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      10-Digit Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98XXXXXXXX"
                      className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Area / Location in Mumbai or Thane *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientArea}
                      onChange={(e) => setClientArea(e.target.value)}
                      placeholder="e.g. Mulund West, Malad, Thane..."
                      className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-sm shadow-warm-md transition disabled:opacity-60 mt-2"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Detailed Quote to My Phone'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
