import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Shobhnath Vishwakarma | OneStop Interiors Mumbai & Thane',
  description:
    'Get in touch with master contractor Shobhnath Vishwakarma. Call 9967302911, chat on WhatsApp, or visit our workshop in Kurar Village Malad East.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Let&apos;s Build Together
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Contact OneStop Interiors
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Speak directly with Shobhnath Vishwakarma. Book a 100% free site inspection and laser measurement anywhere in Mumbai, Thane, Mulund & Palghar.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Call Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
                <div className="w-12 h-12 rounded-2xl bg-wood-100 text-wood-800 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-wood-800" />
                </div>
                <div className="text-xs font-bold text-charcoal-400 uppercase tracking-wide">
                  Phone Numbers
                </div>
                <div className="text-lg font-bold text-charcoal-900 mt-1">
                  9967302911
                </div>
                <div className="text-sm font-semibold text-charcoal-700">
                  7039821535
                </div>
                <a
                  href="tel:9967302911"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-wood-700 hover:text-wood-950 underline"
                >
                  Click to Call Now →
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-emerald-800" />
                </div>
                <div className="text-xs font-bold text-charcoal-400 uppercase tracking-wide">
                  WhatsApp Support
                </div>
                <div className="text-lg font-bold text-emerald-700 mt-1">
                  9967302911
                </div>
                <div className="text-xs text-charcoal-500 mt-0.5">
                  Send site photos / floor plans
                </div>
                <a
                  href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20want%20interior%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                >
                  Open WhatsApp Chat →
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-amber-800" />
                </div>
                <div className="text-xs font-bold text-charcoal-400 uppercase tracking-wide">
                  Email Address
                </div>
                <div className="text-sm font-bold text-charcoal-900 mt-1 break-all">
                  amitvishwa1950@gmail.com
                </div>
                <div className="text-xs text-charcoal-500 mt-0.5">
                  For architect drawings & BOQs
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm">
                <div className="w-12 h-12 rounded-2xl bg-cream-200 text-charcoal-800 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-charcoal-800" />
                </div>
                <div className="text-xs font-bold text-charcoal-400 uppercase tracking-wide">
                  Working Hours
                </div>
                <div className="text-sm font-bold text-charcoal-900 mt-1">
                  Monday – Sunday
                </div>
                <div className="text-xs text-charcoal-600 mt-0.5">
                  8:00 AM – 9:00 PM (Every day)
                </div>
              </div>
            </div>

            {/* Address & Google Maps Embed */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-serif font-bold text-charcoal-900">
                    Workshop & Headquarters
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
                    Laxman Nagar, Kurar Village, Malad East, Mumbai, Maharashtra 400097
                  </p>
                </div>
              </div>

              {/* Google Map Iframe */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-cream-200">
                <iframe
                  title="OneStop Interiors Workshop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6186989408665!2d72.859664!3d19.182479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b719463b2f5d%3A0x6796328a6f30f9a2!2sKurar%20Village%2C%20Malad%20East%2C%20Mumbai%2C%20Maharashtra%20400097!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <QuickEnquiryForm source="contact_page" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Contact" />
      <MobileStickyBar  />
    </div>
  );
}
