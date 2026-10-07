import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { ShieldCheck, CheckCircle2, Clock, Award, Hammer, FileText, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Work & 5-Year Warranty Promise | OneStop Interiors',
  description:
    'Our transparent 4-step workflow, payment milestones, brand material pledges, and 5-year workmanship warranty by Shobhnath Vishwakarma.',
};

export default function HowWeWorkPage() {
  const steps = [
    {
      num: '01',
      title: 'Free Site Visit & Laser Measurement',
      desc: 'We visit your flat, office, or bungalow anywhere across Mumbai, Thane, Mulund, or Palghar. Shobhnathji personally inspects wall levels, moisture conditions, and electrical/plumbing points.',
      points: ['Laser measurement of every wall & room', 'Discussion of family storage habits & appliances', 'Material swatches review at your doorstep'],
    },
    {
      num: '02',
      title: 'Itemized Transparent BOQ Quotation',
      desc: 'No vague lump-sum numbers. You receive an item-by-item BOQ detailing plywood thickness (16mm/18mm 710 Marine), laminate brands, hardware specs, and unit rates.',
      points: ['Brand names explicitly written (Century/Greenply/Hettich)', 'Clear milestone payment schedule (50-40-10)', 'Zero hidden surprise charges during work'],
    },
    {
      num: '03',
      title: 'Synchronized Trade Execution Under 1 Master',
      desc: 'Carpentry, concealed wiring, CPVC plumbing, Gypsum false ceiling, and painting happen systematically with zero coordination gaps.',
      points: ['No blame games between different trades', 'Daily progress photo updates on WhatsApp', 'Clean site protocols & society noise compliance'],
    },
    {
      num: '04',
      title: 'Snag Checklist, Deep Cleaning & Handover',
      desc: 'Before handing over keys, we run through a 40-point snag checklist (drawer glides, hinge tightness, silicone seals) and perform deep cleaning.',
      points: ['Full vacuum & surface cleaning', 'Official 5-Year Workmanship Warranty Certificate', 'Continuous after-sales support whenever needed'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Our Commitment to Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            How We Work & Our Warranty Promise
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            The Vishwakarma artisan standard: uncompromising joinery, authentic branded materials, and 100% contractor responsibility.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Process & Warranty */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">
                Our 4-Stage Execution Methodology
              </h2>
              <div className="space-y-6">
                {steps.map((st) => (
                  <div
                    key={st.num}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-wood-800 text-gold-400 font-serif font-bold text-xl flex items-center justify-center shrink-0 shadow-warm-sm">
                      {st.num}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-serif font-bold text-charcoal-900">
                        {st.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                        {st.desc}
                      </p>
                      <ul className="space-y-1.5 pt-1">
                        {st.points.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Year Warranty Card */}
            <div className="bg-gradient-to-br from-wood-900 to-wood-950 text-white rounded-3xl p-8 border border-wood-800 shadow-warm-xl space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-gold-400" />
                <h3 className="text-2xl font-serif font-bold text-gold-400">
                  The OneStop 5-Year Workmanship Warranty
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
                We provide a written 5-Year Workmanship Warranty covering all modular kitchens, wardrobes, and custom carpentry woodwork against delamination, joint loosening, and hinge alignment issues.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-cream-100">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Free hinge & slider tune-ups</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>100% Genuine 710 Marine Ply guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Prompt 48-hour service visit if needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Direct contact with founder Shobhnathji</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <QuickEnquiryForm source="how_we_work_page" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="How We Work" />
      <MobileStickyBar  />
    </div>
  );
}
