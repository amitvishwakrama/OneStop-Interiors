import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';

export const metadata: Metadata = {
  title: 'OneStop Interiors | Master Carpenter & Turnkey Contractor Mumbai & Thane',
  description:
    'One-Stop Interior & Renovation Solution by Shobhnath Vishwakarma (25+ yrs experience). One Contractor, One Quotation, One Responsibility for Mumbai, Thane, Mulund & Palghar.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  keywords: [
    'carpenter contractor mumbai',
    'interior contractor thane',
    'modular kitchen mumbai',
    'full home interior contractor',
    'carpenter in malad',
    'furniture contractor mulund',
    'renovation contractor palghar',
  ],
  authors: [{ name: 'Shobhnath Vishwakarma' }],
  openGraph: {
    title: 'OneStop Interiors | Master Carpenter & Turnkey Contractor',
    description: 'Ghar ka poora interior aur repair, ek hi jagah, ek hi contractor se.',
    siteName: 'OneStop Interiors',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#7B3317',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FDFBF7] text-charcoal-800 antialiased selection:bg-gold-200 selection:text-charcoal-900">
        <LocalBusinessJsonLd />
        <AnalyticsTracker />
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
