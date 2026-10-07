'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuoteModal } from '@/components/common/QuoteModal';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { useLanguage } from '@/context/LanguageContext';
import {
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';

export function ServiceDetailClient({ service }: { service: any }) {
  const { language } = useLanguage();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Hero Section */}
      <section className="bg-wood-950 text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="text-xs text-gold-400 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span>/</span>
            <span className="text-cream-200">{service.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
                Mumbai, Thane & Palghar
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight">
                {service.name}
              </h1>
              <p className="text-sm sm:text-base text-cream-200 leading-relaxed max-w-2xl">
                {service.shortDesc}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="bg-wood-900/80 px-4 py-2 rounded-xl border border-wood-800">
                  <div className="text-[11px] text-cream-400 uppercase font-bold tracking-wider">
                    Starting Price
                  </div>
                  <div className="text-xl font-serif font-bold text-gold-400">
                    {service.startingPrice}{' '}
                    <span className="text-xs font-normal text-cream-300">/{service.unit}</span>
                  </div>
                </div>

                <div className="bg-wood-900/80 px-4 py-2 rounded-xl border border-wood-800">
                  <div className="text-[11px] text-cream-400 uppercase font-bold tracking-wider">
                    Warranty
                  </div>
                  <div className="text-xl font-serif font-bold text-emerald-400">
                    5 Years
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm shadow-warm-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Free Inspection & Quote</span>
                </button>
                <a
                  href={`https://wa.me/919967302911?text=${encodeURIComponent(
                    `Namaste Shobhnathji, I want a quotation for ${service.name} in Mumbai/Thane.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-warm-md flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-xl border border-wood-800">
              <Image
                src={service.heroImage}
                alt={service.name}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10">
              {/* Detailed Intro */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                  About Our {service.name} Service
                </h2>
                <p className="text-sm text-charcoal-700 leading-relaxed">
                  {service.intro}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-wood-800">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Direct master contractor supervision with 25+ years experience in Mumbai.</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm">
                <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-4">
                  What&apos;s Included in {service.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includedItems?.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Execution Process */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm">
                <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-6">
                  Our 4-Step Execution Process
                </h3>
                <div className="space-y-4">
                  {service.processSteps?.map((p: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-3.5 rounded-xl bg-cream-50/70 border border-cream-200">
                      <div className="w-8 h-8 rounded-full bg-wood-800 text-gold-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {p.step}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-charcoal-900">{p.title}</div>
                        <div className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm">
                  <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-4">
                    Frequently Asked Questions about {service.name}
                  </h3>
                  <div className="space-y-3">
                    {service.faqs.map((f: any, idx: number) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="border border-cream-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-charcoal-900 flex justify-between items-center hover:bg-cream-50"
                          >
                            <span>{f.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-gold-600 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="p-4 bg-cream-50/50 text-xs text-charcoal-600 border-t border-cream-200 leading-relaxed">
                              {f.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Quote Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <QuickEnquiryForm
                  defaultService={service.name}
                  source={`service_page_${service.slug}`}
                />

                <div className="bg-wood-900 text-white rounded-2xl p-6 border border-wood-800 text-center space-y-3">
                  <h4 className="font-serif font-bold text-base text-gold-400">
                    Prefer to Speak Directly?
                  </h4>
                  <p className="text-xs text-cream-300">
                    Call Shobhnath Vishwakarma directly on mobile for instant site visit booking.
                  </p>
                  <a
                    href="tel:9967302911"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-wood-800 hover:bg-wood-700 text-white font-bold text-sm border border-wood-700"
                  >
                    <Phone className="w-4 h-4 text-gold-400" />
                    <span>Call 9967302911 / 7039821535</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp serviceName={service.name} />
      <MobileStickyBar
        serviceName={service.name}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        serviceName={service.name}
      />
    </div>
  );
}

