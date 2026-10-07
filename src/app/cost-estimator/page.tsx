import React from 'react';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { EstimatorRate } from '@/models/EstimatorRate';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { CostEstimatorWidget } from '@/components/estimator/CostEstimatorWidget';

export const metadata: Metadata = {
  title: 'Interior Cost Estimator Mumbai & Thane | Real-Time Rates 2026',
  description:
    'Calculate modular kitchen, wardrobe, false ceiling and full flat interior renovation cost in Mumbai & Thane. Realistic INR rates based on 25+ years contractor experience.',
};

export const revalidate = 60;

export default async function CostEstimatorPage() {
  await connectToDatabase();
  const rates = await EstimatorRate.find({}).lean();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Mumbai Interior Cost Estimator
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Select your work type, dimensions, and preferred material finish to get an authentic market price estimate in seconds.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <CostEstimatorWidget rates={JSON.parse(JSON.stringify(rates))} />
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Cost Estimator" />
      <MobileStickyBar  />
    </div>
  );
}
