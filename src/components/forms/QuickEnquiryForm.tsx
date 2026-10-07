'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  User,
  MapPin,
  Wrench,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface QuickEnquiryFormProps {
  source?: string;
  defaultService?: string;
  defaultArea?: string;
  className?: string;
  onSuccess?: () => void;
}

const servicesList = [
  'Full Home Turnkey Interior',
  'Modular Kitchen',
  'Modular Wardrobes & Storage',
  'Carpentry & Custom Furniture',
  'False Ceiling & POP Design',
  'Interior & Exterior Painting',
  'Electrical Work & Lighting',
  'Plumbing & Sanitary Solutions',
  'Tiles, Marble & Flooring',
  'Office, Shop & Commercial Interior',
  'Civil Repair & Renovation',
];

export function QuickEnquiryForm({
  source = 'website_enquiry',
  defaultService,
  defaultArea = '',
  className = '',
  onSuccess,
}: QuickEnquiryFormProps) {
  const { language, t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(defaultService || 'Full Home Turnkey Interior');
  const [area, setArea] = useState(defaultArea);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    leadId: string;
    clientWhatsAppUrl: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate phone number (10 digits starting with 6, 7, 8, or 9)
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setError(
        language === 'hi'
          ? 'कृपया 10 अंकों का सही भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)'
          : 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)'
      );
      return;
    }

    if (!area.trim()) {
      setError(
        language === 'hi'
          ? 'कृपया अपनी लोकेशन/एरिया (जैसे मलाड, ठाणे, अंधेरी) बताएं'
          : 'Please specify your area or locality in Mumbai/Thane'
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanedPhone,
          serviceType,
          area: area.trim(),
          message: message.trim(),
          source,
          hp: honeypot, // Honeypot field
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry');
      }

      setIsSuccess(true);
      setSubmittedLead({
        leadId: json.leadId,
        clientWhatsAppUrl: json.clientWhatsAppUrl,
      });

      trackEvent('lead_form_submitted', {
        serviceType,
        area,
        source,
        leadId: json.leadId,
      });

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call directly at 9967302911.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && submittedLead) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-emerald-500 shadow-warm-lg animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900 mb-2">
          {t.form.successTitle}
        </h3>
        <p className="text-charcoal-600 text-sm mb-6 leading-relaxed">
          {t.form.successDesc}
        </p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-left">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
            Reference ID: #{submittedLead.leadId.slice(-6).toUpperCase()}
          </div>
          <div className="text-xs text-charcoal-700">
            <strong>Service:</strong> {serviceType} • <strong>Location:</strong> {area}
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={submittedLead.clientWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-warm-md transition"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Chat on WhatsApp Directly</span>
          </a>

          <a
            href="tel:9967302911"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-800 font-semibold text-xs transition"
          >
            <Phone className="w-4 h-4 text-gold-600" />
            <span>Or Call Shobhnathji: 9967302911</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-cream-300 shadow-warm-lg ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <Sparkles className="w-5 h-5 text-gold-600" />
        <h3 className="text-lg sm:text-xl font-serif font-bold text-charcoal-900">
          {language === 'hi' ? 'फ्री साइट विज़िट व कोटेशन बुक करें' : 'Book Free Site Inspection & Quote'}
        </h3>
      </div>
      <p className="text-xs text-charcoal-500 mb-5 font-medium">
        {t.form.freeVisitNotice}
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Honeypot field for bot detection (hidden from real users) */}
      <input
        type="text"
        name="website_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            {t.form.name} <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Sharma"
              className="block w-full pl-9 pr-3 py-2.5 bg-cream-50/50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
            />
          </div>
        </div>

        {/* 10-Digit Phone */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            {t.form.phone} <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-500 font-bold text-xs">
              +91
            </div>
            <input
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98XXXXXXXX"
              className="block w-full pl-11 pr-3 py-2.5 bg-cream-50/50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white font-medium"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            {t.form.service} <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
              <Wrench className="h-4 w-4" />
            </div>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="block w-full pl-9 pr-8 py-2.5 bg-cream-50/50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white appearance-none cursor-pointer font-medium"
            >
              {servicesList.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Area / Location */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            {t.form.area} <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
              <MapPin className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Malad East, Thane, Mulund, Andheri..."
              className="block w-full pl-9 pr-3 py-2.5 bg-cream-50/50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Optional Message */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            {t.form.message} (Optional)
          </label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. 2BHK flat renovation, need wardrobe & kitchen work"
            className="block w-full p-2.5 bg-cream-50/50 border border-cream-300 rounded-xl text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white resize-none"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold bg-gold-600 hover:bg-gold-700 active:bg-gold-800 shadow-warm-md hover:shadow-warm-lg transition transform active:scale-95 disabled:opacity-60 text-sm min-h-[48px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>{t.form.submitting}</span>
              </>
            ) : (
              <>
                <span>{t.form.submit}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
