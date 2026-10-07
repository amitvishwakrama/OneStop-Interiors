import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Complete Interior & Renovation Services Mumbai & Thane | OneStop Interiors',
  description:
    'Explore all 11 turnkey interior trades: Carpentry, Modular Kitchen, Wardrobes, Painting, False Ceiling, Electrical, Plumbing, Flooring and Civil Repairs under one master contractor.',
};

export const revalidate = 60;

export default async function ServicesOverviewPage() {
  await connectToDatabase();
  const services = await Service.find({}).sort({ order: 1 }).lean();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-wood-950 text-white py-16 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            One Contractor • One Quotation • Total Responsibility
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Our Interior & Renovation Services
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            From single custom wardrobe fabrication to complete turnkey 2BHK/3BHK flats and commercial showrooms across Mumbai, Thane, Mulund and Palghar.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc: any) => (
            <div
              key={svc.slug}
              className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={svc.heroImage}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-wood-900/90 text-gold-300 text-xs font-bold px-3 py-1 rounded-lg">
                    from {svc.startingPrice}/{svc.unit}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-2 group-hover:text-wood-800 transition">
                    {svc.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-3 mb-4 leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <div className="space-y-1.5 border-t border-cream-200 pt-3">
                    {svc.includedItems?.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/services/${svc.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-wood-50 hover:bg-wood-100 text-wood-900 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-wood-200"
                >
                  <span>Explore Inclusions & Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Services Overview" />
      <MobileStickyBar  />
    </div>
  );
}
