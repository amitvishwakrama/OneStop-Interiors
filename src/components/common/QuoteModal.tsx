'use client';

import React from 'react';
import { X } from 'lucide-react';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export function QuoteModal({ isOpen, onClose, serviceName }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-warm-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 flex items-center justify-center transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <QuickEnquiryForm
          source="header_quote_modal"
          defaultService={serviceName}
          className="border-0 shadow-none"
          onSuccess={() => {
            // keep open for client to see thank you state
          }}
        />
      </div>
    </div>
  );
}

