'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  UserCheck,
  Settings,
  LogOut,
  ExternalLink,
  Hammer,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: { name?: string | null; email?: string | null };
}

export function AdminLayout({ children, user }: AdminLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Lead CRM', href: '/admin/leads', icon: Users },
    { label: 'Quotations', href: '/admin/quotations', icon: FileText },
    { label: 'Projects', href: '/admin/projects', icon: Briefcase },
    { label: 'Partners Directory', href: '/admin/partners', icon: UserCheck },
    { label: 'Content & Rates', href: '/admin/content', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-cream-300 sticky top-0 z-30 shadow-warm-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-wood-800 text-gold-400 flex items-center justify-center font-bold text-lg shadow-warm-sm border border-wood-700">
                <Hammer className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <div className="text-base font-serif font-bold text-charcoal-900 leading-tight">
                  OneStop Interiors CRM
                </div>
                <div className="text-[11px] text-charcoal-500 font-medium">
                  Welcome, {user?.name || 'Shobhnath Vishwakarma'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-wood-800 hover:text-wood-950 px-3 py-1.5 rounded-lg border border-wood-200 bg-wood-50 transition"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-cream-200 no-scrollbar">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-wood-800 text-gold-300 shadow-warm-sm'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}

