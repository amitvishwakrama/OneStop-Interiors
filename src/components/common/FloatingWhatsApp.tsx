'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface FloatingWhatsAppProps {
  pageName?: string;
  serviceName?: string;
}

export function FloatingWhatsApp({ pageName, serviceName }: FloatingWhatsAppProps) {
  const contextText = serviceName
    ? `Namaste Shobhnathji, I am looking for ${serviceName} interior work in Mumbai/Thane. Please share quotation details.`
    : pageName
    ? `Namaste Shobhnathji, I was checking ${pageName} on your website OneStop Interiors and want to discuss my interior project.`
    : `Namaste Shobhnathji, I want a free site visit & interior quotation for my flat/office in Mumbai.`;

  const whatsappUrl = `https://wa.me/919967302911?text=${encodeURIComponent(contextText)}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 bg-charcoal-900 text-white text-xs font-semibold rounded-lg shadow-warm-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with Shobhnathji on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_chat_clicked', { serviceName, pageName, source: 'floating_button' })}
        aria-label="Direct WhatsApp Chat with Shobhnath Vishwakarma"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white relative focus:outline-none focus:ring-4 focus:ring-emerald-400"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white text-white" />
      </a>
    </aside>
  );
}
