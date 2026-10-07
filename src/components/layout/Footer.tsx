import React from 'react';
import Link from 'next/link';
import { Hammer, Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Carpentry & Furniture', href: '/services/carpentry-furniture' },
    { name: 'Modular Kitchen', href: '/services/modular-kitchen' },
    { name: 'Modular Wardrobes', href: '/services/modular-wardrobes' },
    { name: 'False Ceiling & POP', href: '/services/false-ceiling-pop' },
    { name: 'Painting & Polishing', href: '/services/painting-polishing' },
    { name: 'Electrical Work', href: '/services/electrical-work' },
    { name: 'Plumbing & Sanitary', href: '/services/plumbing-sanitary' },
    { name: 'Tiles & Flooring', href: '/services/tiles-flooring' },
    { name: 'Full Home Interior', href: '/services/full-home-interior' },
    { name: 'Commercial Interior', href: '/services/commercial-interior' },
    { name: 'Civil Repair & Renovation', href: '/services/civil-repair-renovation' },
  ];

  const serviceAreas = [
    'Malad East & West',
    'Kandivali East & West',
    'Borivali & Dahisar',
    'Goregaon & Ram Mandir',
    'Andheri & Juhu',
    'Thane (Wagle, Majiwada, Ghodbunder)',
    'Mulund East & West',
    'Palghar & Extended Suburbs',
    'Bandra to Churchgate',
    'Navi Mumbai (Vashi & Nerul)',
  ];

  return (
    <footer className="bg-wood-950 text-cream-200 border-t border-wood-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-wood-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-600 text-white flex items-center justify-center font-bold">
                <Hammer className="w-5 h-5" />
              </div>
              <div className="text-xl font-serif font-bold text-white tracking-tight">
                OneStop <span className="text-gold-400">Interiors</span>
              </div>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Founder <strong className="text-white">Shobhnath Vishwakarma</strong> with 25+ years of master carpentry lineage. Complete turnkey interior and renovation contractor across Mumbai & Thane.
            </p>
            <div className="pt-2 text-xs text-gold-300 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>5-Year Workmanship Warranty on Furniture</span>
            </div>
            <p className="italic text-xs text-cream-400">
              &quot;Ghar ka poora interior aur repair, ek hi jagah, ek hi contractor se.&quot;
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2.5">
              Interior Services
            </h3>
            <ul className="space-y-2 text-xs">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-300 hover:text-gold-400 transition flex items-center gap-1.5"
                  >
                    <span className="text-gold-500">•</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2.5">
              Service Areas (Mumbai Region)
            </h3>
            <p className="text-xs text-cream-400 mb-3">
              Free site visit & laser measurement within 24-48 hours across:
            </p>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-cream-300">
              {serviceAreas.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2.5">
              Contact Shobhnathji
            </h3>
            <div className="space-y-3 text-xs text-cream-300">
              <a
                href="tel:9967302911"
                className="flex items-start gap-2.5 hover:text-gold-300 transition"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">9967302911 / 7039821535</div>
                  <div className="text-[11px] text-cream-400">Direct Contractor Line</div>
                </div>
              </a>

              <a
                href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20want%20interior%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-emerald-300 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">9967302911</div>
                  <div className="text-[11px] text-cream-400">Instant WhatsApp Quote & Photos</div>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Workshop & Base:</div>
                  <div>Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>Mon - Sun: 8:00 AM - 9:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
          <p>© {currentYear} OneStop Interiors. All rights reserved. Master Craftsmanship by Shobhnath Vishwakarma.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-gold-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="hover:text-gold-400 transition text-cream-500">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

