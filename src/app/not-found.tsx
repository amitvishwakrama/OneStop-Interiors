import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hammer, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-wood-800 text-gold-400 flex items-center justify-center font-bold text-2xl mb-4 shadow-warm-md">
          <Hammer className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-charcoal-600 max-w-md mb-6 leading-relaxed">
          The interior page you are looking for does not exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-sm shadow-warm-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-bold text-sm shadow-warm-sm"
          >
            <span>Explore All 11 Services</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

