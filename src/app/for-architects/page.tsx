import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { Compass, CheckCircle2, Ruler, ShieldCheck, Phone, MessageSquare, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Execution Partner for Architects & Interior Designers | OneStop Interiors',
  description:
    'Are you an architect or designer looking for a reliable interior execution contractor in Mumbai? We execute your exact drawings with zero deviations, dedicated site supervision, and transparent billing.',
};

export default function ForArchitectsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            For Architects, Builders & Interior Designers
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Your Trusted On-Site Execution Partner
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            You design the vision. We execute the millwork, plumbing, electrical, and finishes with millimeter accuracy, transparent BOQ tracking, and zero client complaints.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Why Architects Choose Us */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-warm-sm space-y-6">
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">
                Why Top Mumbai Design Studios Partner With Us
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                As an architect or designer, the hardest part of your job is finding an execution team that respects your 2D CAD & 3D renders without making arbitrary site shortcuts. With 25+ years in Mumbai, Shobhnath Vishwakarma bridges design vision and craftsmanship reality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-gold-600" />
                    <span>Drawing Fidelity Guarantee</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    We follow your joinery details, shadow gaps, fluted spacings, and cove dimensions exactly as drawn on your blueprints.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gold-600" />
                    <span>Complete Multi-Trade Team</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    You deal with ONE point of contact for carpentry, false ceiling, painting, civil, electrical, and plumbing trades.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>Protected Client Relationship</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    We strictly represent your firm on-site. Any variations or change requests from the homeowner are routed back through you.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600" />
                    <span>Strict BOQ Adherence</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Itemized quantity measurements with clear rates. No surprise variations or hidden cost spikes during execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial from Architect */}
            <div className="bg-wood-900 text-white rounded-3xl p-6 sm:p-8 border border-wood-800 space-y-3">
              <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Architect Endorsement
              </div>
              <p className="text-sm text-cream-100 italic leading-relaxed">
                &quot;Finding a contractor in Mumbai who respects millimeters on CAD drawings and doesn&apos;t blame the plumber when a cabinet doesn&apos;t align is rare. Shobhnathji and OneStop Interiors have successfully executed four of our luxury residential projects in Andheri and Bandra with absolute perfection.&quot;
              </p>
              <div className="text-xs text-gold-300 font-bold pt-1">
                — Ar. Vikram Mehta, Principal Architect, Studio V Design Mumbai
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Partnership Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <QuickEnquiryForm
                defaultService="Full Home Turnkey Interior"
                source="architect_partner_form"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Architect Partnership" />
      <MobileStickyBar  />
    </div>
  );
}
