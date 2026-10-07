'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuoteModal } from '@/components/common/QuoteModal';
import {
  MapPin,
  Clock,
  Maximize2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

export function PortfolioClient({ initialItems }: { initialItems: any[] }) {
  const [items] = useState(initialItems);
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Hero */}
      <section className="bg-wood-950 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Real Mumbai Job Sites
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Our Work & Finished Interiors
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Discover how master contractor Shobhnath Vishwakarma transforms residences and commercial properties across Mumbai, Thane, Mulund and Palghar.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                filter === 'all'
                  ? 'bg-gold-600 text-white shadow-warm-sm'
                  : 'bg-wood-900 text-cream-300 hover:bg-wood-800'
              }`}
            >
              All Projects ({items.length})
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                filter === 'residential'
                  ? 'bg-gold-600 text-white shadow-warm-sm'
                  : 'bg-wood-900 text-cream-300 hover:bg-wood-800'
              }`}
            >
              Residential Flats & Villas
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                filter === 'commercial'
                  ? 'bg-gold-600 text-white shadow-warm-sm'
                  : 'bg-wood-900 text-cream-300 hover:bg-wood-800'
              }`}
            >
              Offices & Commercial
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-wood-950/80 backdrop-blur-sm text-gold-300 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {item.type.toUpperCase()}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-2 group-hover:text-wood-800 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-cream-200 text-[11px] text-charcoal-600 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">{item.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{item.areaSqFt} sq.ft</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {item.clientFeedback && (
                    <div className="mt-3 bg-cream-50 p-2.5 rounded-xl border border-cream-200 text-[11px] text-charcoal-700 italic">
                      &quot;{item.clientFeedback}&quot;
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="w-full py-2.5 rounded-xl bg-wood-50 hover:bg-wood-100 text-wood-900 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-wood-200"
                >
                  <span>View Full Photo Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Portfolio" />
      <MobileStickyBar onOpenQuoteModal={() => setQuoteModalOpen(true)} />
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

