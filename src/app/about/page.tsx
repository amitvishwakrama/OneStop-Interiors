import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { Award, Hammer, Users, ShieldCheck, CheckCircle2, MapPin, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Shobhnath Vishwakarma & OneStop Interiors | 25+ Years Experience',
  description:
    'Learn about founder Shobhnath Vishwakarma, master carpenter tradition, our Kurar Village Malad workshop, and why 480+ Mumbai families trust us.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Artisan Heritage Since 2001
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            About OneStop Interiors
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Traditional Vishwakarma wood craftsmanship combined with complete modern turnkey interior contracting across Mumbai & Thane.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Founder Story */}
          <div className="lg:col-span-8 space-y-10">
            {/* Founder Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-warm-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-wood-800 text-gold-400 flex items-center justify-center font-serif font-bold text-3xl shadow-warm-md shrink-0 border border-wood-700">
                  SV
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-1">
                    <Award className="w-3.5 h-3.5 text-gold-600" />
                    <span>Founder & Master Contractor</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-charcoal-900">
                    Shobhnath Vishwakarma
                  </h2>
                  <p className="text-xs text-charcoal-500">
                    25+ Years of Hands-on Execution in Mumbai Metropolitan Region
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed pt-2 border-t border-cream-200">
                <p>
                  Coming from the venerable <strong className="text-wood-900">Vishwakarma artisan community</strong>, woodwork and structural construction have been part of our lineage for generations. Over 25 years ago, I began crafting custom furniture and fitting doors, windows, and beds in Mumbai apartments.
                </p>
                <p>
                  As clients were repeatedly stressed by managing separate electricians, plumbers, painters, and false ceiling workers who constantly blamed each other for project delays and damage, I expanded our capabilities into a unified solution: <strong className="text-wood-900">&quot;One-Stop Interior & Renovation Solution. One contractor, one quotation, one responsibility.&quot;</strong>
                </p>
                <p>
                  Today, whether it is a compact 1BHK in Kurar Village, a luxury 3BHK in Goregaon, an office in Wagle Estate Thane, or a bungalow in Palghar, my promise remains personal: I personally visit the site, inspect the measurements, and ensure my trusted team delivers impeccable quality with zero compromises.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-cream-200 text-center">
                <div className="p-3 bg-cream-50 rounded-xl">
                  <div className="text-2xl font-serif font-bold text-wood-800">25+</div>
                  <div className="text-[11px] text-charcoal-500 font-medium">Years in Mumbai</div>
                </div>
                <div className="p-3 bg-cream-50 rounded-xl">
                  <div className="text-2xl font-serif font-bold text-wood-800">550+</div>
                  <div className="text-[11px] text-charcoal-500 font-medium">Homes Delivered</div>
                </div>
                <div className="p-3 bg-cream-50 rounded-xl">
                  <div className="text-2xl font-serif font-bold text-wood-800">11</div>
                  <div className="text-[11px] text-charcoal-500 font-medium">Trades Coordinated</div>
                </div>
                <div className="p-3 bg-cream-50 rounded-xl">
                  <div className="text-2xl font-serif font-bold text-wood-800">5 Yrs</div>
                  <div className="text-[11px] text-charcoal-500 font-medium">Direct Warranty</div>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
              <h3 className="text-xl font-serif font-bold text-charcoal-900">
                Our Core Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No Middleman Markups</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    You work directly with the contractor who cuts the wood and pours the paint. No fancy studio overheads added to your bill.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Genuine Materials</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    All plywood sheets (Century/Greenply 710), hardware (Hettich), and paints (Asian Paints) are delivered with official manufacturer stamps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Milestone Transparency</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Payments are tied strictly to verified completion stages. Final 10% paid only after your handover satisfaction.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="font-bold text-sm text-charcoal-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Speed Without Compromise</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    For commercial showrooms and urgent tenant handovers, our teams operate double shifts to meet promised inauguration dates.
                  </p>
                </div>
              </div>
            </div>

            {/* Workshop Address */}
            <div className="bg-wood-900 text-white rounded-3xl p-6 sm:p-8 border border-wood-800 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Our Base Workshop in Mumbai</span>
              </div>
              <p className="text-sm text-cream-200">
                Laxman Nagar, Kurar Village, Malad East, Mumbai, Maharashtra 400097
              </p>
              <p className="text-xs text-cream-400">
                Open for client material sample inspections by appointment: Monday - Sunday, 8 AM - 9 PM.
              </p>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <QuickEnquiryForm source="about_us_page" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="About Us" />
      <MobileStickyBar  />
    </div>
  );
}
