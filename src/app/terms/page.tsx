import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | OneStop Interiors',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex-1 text-charcoal-800">
        <h1 className="text-3xl font-serif font-bold text-charcoal-900 mb-6">
          Terms & Conditions of Service
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-cream-300 shadow-warm-sm space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            Welcome to OneStop Interiors. By engaging our contracting services or requesting quotations, you agree to the following terms:
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">1. Quotations & Validity</h2>
          <p>
            All quotations provided by OneStop Interiors are valid for 30 days from the date of issue. Exact estimates are finalized after a physical site measurement and material specification confirmation.
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">2. Payment Milestones</h2>
          <p>
            Standard payment structure is stage-wise: 50% mobilization advance on contract signing and material order, 40% running payment based on physical progress at agreed milestones, and 10% final balance upon client inspection and key handover.
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">3. 5-Year Workmanship Warranty</h2>
          <p>
            OneStop Interiors provides a 5-year workmanship warranty on all modular carpentry and custom furniture against manufacturing defects, delamination, and loose joints, subject to standard non-abusive usage.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

