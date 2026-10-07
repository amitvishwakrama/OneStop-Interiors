/**
 * Client-Side Analytics Event Tracker
 * Supports Google Analytics 4 (gtag), Google Tag Manager (dataLayer), and Meta Pixel (fbq)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

export type AnalyticsEvent =
  | 'phone_call_clicked'
  | 'whatsapp_chat_clicked'
  | 'lead_form_submitted'
  | 'estimator_calculated'
  | 'quotation_pdf_downloaded'
  | 'service_viewed'
  | 'portfolio_viewed';

export function trackEvent(
  eventName: AnalyticsEvent | string,
  params: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    ...params,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, eventPayload);
    } catch (e) {
      console.warn('[Analytics GA4] error:', e);
    }
  }

  // Google Tag Manager
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...eventPayload,
      });
    } catch (e) {
      console.warn('[Analytics GTM] error:', e);
    }
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    try {
      if (eventName === 'lead_form_submitted') {
        window.fbq('track', 'Lead', eventPayload);
      } else if (eventName === 'phone_call_clicked' || eventName === 'whatsapp_chat_clicked') {
        window.fbq('track', 'Contact', eventPayload);
      } else {
        window.fbq('trackCustom', eventName, eventPayload);
      }
    } catch (e) {
      console.warn('[Analytics Pixel] error:', e);
    }
  }

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event: ${eventName}]`, eventPayload);
  }
}

