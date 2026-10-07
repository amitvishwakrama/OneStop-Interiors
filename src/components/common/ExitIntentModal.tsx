'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Gift } from 'lucide-react';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already saw this popup in the current session
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('onestop_exit_intent_seen');
      if (seen) return;
    }

    // 1. Timed popup after 30 seconds
    const timer = setTimeout(() => {
      triggerPopup();
    }, 30000);

    // 2. Mouse leave exit-intent trigger (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const triggerPopup = () => {
    const seen = sessionStorage.getItem('onestop_exit_intent_seen');
    if (!seen) {
      setIsOpen(true);
      sessionStorage.setItem('onestop_exit_intent_seen', 'true');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-warm-xl overflow-hidden border border-gold-300">
        {/* Banner strip */}
        <div className="bg-gradient-to-r from-wood-800 to-wood-900 text-white p-4 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-600 text-white text-xs font-bold uppercase tracking-wider mb-1">
            <Gift className="w-3.5 h-3.5" />
            <span>Limited Time Mumbai Offer</span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-bold text-cream-100">
            Book 100% Free Site Visit + 3D Layout Consultation
          </h4>
          <p className="text-xs text-cream-300 mt-0.5">
            Shobhnath Vishwakarma will personally inspect your site anywhere in Mumbai/Thane
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-wood-950/60 hover:bg-wood-950 text-cream-200 flex items-center justify-center transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <QuickEnquiryForm
            source="exit_intent_popup"
            className="border-0 shadow-none p-0"
            onSuccess={() => {
              // keep open so client can click whatsapp
            }}
          />
        </div>
      </div>
    </div>
  );
}

