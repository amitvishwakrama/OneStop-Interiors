import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | OneStop Interiors',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex-1 text-charcoal-800">
        <h1 className="text-3xl font-serif font-bold text-charcoal-900 mb-6">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-cream-300 shadow-warm-sm space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            At OneStop Interiors (led by Shobhnath Vishwakarma, Malad East, Mumbai), we respect your privacy and are committed to safeguarding personal information you provide when requesting an interior quotation or site consultation.
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">1. Information We Collect</h2>
          <p>
            When you submit an inquiry form or use our cost estimator, we collect your name, phone number, location/area in Mumbai, and project requirements to provide accurate quotations and arrange site visits.
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">2. Use of Information</h2>
          <p>
            Your information is used solely for the purpose of communicating with you via phone call or WhatsApp regarding your interior project, delivering quotations, and fulfilling contractual services. We never sell or share your data with unauthorized third parties.
          </p>
          <h2 className="text-base font-bold text-charcoal-900 pt-2">3. Contact Us</h2>
          <p>
            For any queries regarding this policy, contact us at amitvishwa1950@gmail.com or 9967302911.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

