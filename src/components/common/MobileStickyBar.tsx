'use client';

import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { trackEvent } from '@/lib/analytics';

interface MobileStickyBarProps {
  onOpenQuoteModal?: () => void;
  serviceName?: string;
}

export function MobileStickyBar({ onOpenQuoteModal, serviceName }: MobileStickyBarProps) {
  const { t } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    serviceName
      ? `Namaste Shobhnathji, I want a quotation for ${serviceName} for my home/office.`
      : `Namaste Shobhnathji, I want a free site visit & interior quotation for my property.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-cream-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-3 py-2">
      <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
        {/* Call Button */}
        <a
          href="tel:9967302911"
          onClick={() => trackEvent('phone_call_clicked', { source: 'mobile_sticky_bar', serviceName })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-wood-800 active:bg-wood-950 text-white font-bold text-xs shadow-warm-sm min-h-[48px] transition active:scale-95"
          aria-label="Call Shobhnath Vishwakarma directly"
        >
          <Phone className="w-4 h-4 text-gold-400 mb-0.5" />
          <span>{t.bottomBar.call}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/919967302911?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_chat_clicked', { source: 'mobile_sticky_bar', serviceName })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-warm-sm min-h-[48px] transition active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white mb-0.5" />
          <span>{t.bottomBar.whatsapp}</span>
        </a>

        {/* Get Quote Button */}
        <button
          onClick={() => {
            trackEvent('quote_modal_opened', { source: 'mobile_sticky_bar', serviceName });
            if (onOpenQuoteModal) {
              onOpenQuoteModal();
            } else {
              const formEl = document.querySelector('form');
              if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/contact';
              }
            }
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gold-600 active:bg-gold-700 text-white font-bold text-xs shadow-warm-sm min-h-[48px] transition active:scale-95"
          aria-label="Get Free Quotation"
        >
          <Sparkles className="w-4 h-4 text-white mb-0.5" />
          <span>{t.bottomBar.quote}</span>
        </button>
      </div>
    </div>
  );
}
