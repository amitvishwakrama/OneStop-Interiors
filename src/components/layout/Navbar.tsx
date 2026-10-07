'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  Hammer,
  Calculator,
  Briefcase,
  Star,
  Users,
  Compass,
  FileText,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const servicesList = [
    { name: 'Carpentry & Furniture', slug: 'carpentry-furniture' },
    { name: 'Modular Kitchen', slug: 'modular-kitchen' },
    { name: 'Modular Wardrobes', slug: 'modular-wardrobes' },
    { name: 'False Ceiling & POP', slug: 'false-ceiling-pop' },
    { name: 'Painting & Polishing', slug: 'painting-polishing' },
    { name: 'Electrical Work', slug: 'electrical-work' },
    { name: 'Plumbing & Sanitary', slug: 'plumbing-sanitary' },
    { name: 'Tiles & Flooring', slug: 'tiles-flooring' },
    { name: 'Full Home Turnkey', slug: 'full-home-interior' },
    { name: 'Commercial Interior', slug: 'commercial-interior' },
    { name: 'Civil Repair & Renovation', slug: 'civil-repair-renovation' },
  ];

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.portfolio, href: '/portfolio' },
    { label: t.nav.estimator, href: '/cost-estimator' },
    { label: t.nav.howWeWork, href: '/how-we-work' },
    { label: t.nav.reviews, href: '/reviews' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.architects, href: '/for-architects' },
    { label: 'Blog', href: '/blog' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-warm-sm">
      {/* Top Utility Bar */}
      <div className="bg-wood-900 text-cream-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-flex items-center text-gold-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              {language === 'hi' ? '25+ वर्षों का भरोसेमंद अनुभव' : '25+ Years Experience • Mumbai, Thane, Mulund & Palghar'}
            </span>
            <span className="text-cream-300">
              {language === 'hi' ? 'एक कॉन्ट्रैक्टर, एक कोटेशन, पूरी जिम्मेदारी' : 'One Contractor • One Quotation • One Responsibility'}
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-wood-800 hover:bg-wood-700 text-gold-300 text-xs font-semibold border border-wood-700 transition"
              title="Toggle Language (English / हिन्दी)"
            >
              <span>{language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
            </button>

            <a
              href="tel:9967302911"
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-gold-300 transition"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>9967302911</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-wood-800 text-gold-400 flex items-center justify-center font-bold text-xl shadow-warm-sm group-hover:scale-105 transition-transform border border-wood-700">
              <Hammer className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900 tracking-tight leading-none group-hover:text-wood-700 transition">
                OneStop <span className="text-wood-600">Interiors</span>
              </div>
              <div className="text-[11px] font-medium text-charcoal-500 tracking-wide mt-0.5">
                Shobhnath Vishwakarma • 25+ Yrs
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === '/' ? 'text-wood-800 bg-cream-200' : 'text-charcoal-700 hover:text-wood-800 hover:bg-cream-100'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  pathname.startsWith('/services') ? 'text-wood-800 bg-cream-200' : 'text-charcoal-700 hover:text-wood-800 hover:bg-cream-100'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-warm-lg border border-cream-300 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold text-charcoal-400 uppercase tracking-wider border-b border-cream-200 mb-1">
                    All 11 Interior Trades
                  </div>
                  {servicesList.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block px-3 py-1.5 text-xs font-semibold text-charcoal-700 hover:text-wood-800 hover:bg-cream-100 transition"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                  <div className="border-t border-cream-200 mt-1 pt-1 px-3">
                    <Link
                      href="/services"
                      className="block py-1 text-xs font-bold text-gold-700 hover:underline"
                    >
                      View All Services Overview →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  pathname === item.href ? 'text-wood-800 bg-cream-200' : 'text-charcoal-700 hover:text-wood-800 hover:bg-cream-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20saw%20OneStop%20Interiors%20and%20want%20a%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-emerald-700 hover:bg-emerald-50 text-xs font-bold border border-emerald-300 transition"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-sm shadow-warm-md hover:shadow-warm-lg transition transform active:scale-95"
            >
              <span>{t.nav.getQuote}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-lg bg-cream-200 text-charcoal-800 text-xs font-bold border border-cream-300"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-charcoal-800 hover:bg-cream-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-cream-300 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-cream-200">
            <a
              href="tel:9967302911"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-wood-800 text-white rounded-xl text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" /> Call 9967302911
            </a>
            <a
              href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20want%20interior%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" /> WhatsApp Us
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-cream-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/services"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-cream-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.services} (All 11 Trades)
            </Link>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-cream-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal?.();
              }}
              className="w-full py-3 rounded-xl bg-gold-600 text-white font-bold text-sm shadow-warm-md text-center"
            >
              {t.nav.getQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

