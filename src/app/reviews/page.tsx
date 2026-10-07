import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import connectToDatabase from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { Star, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Reviews & Ratings | OneStop Interiors Mumbai',
  description:
    'Read verified client testimonials and Google reviews for Shobhnath Vishwakarma and OneStop Interiors from homeowners across Mumbai, Thane and Mulund.',
};

export const revalidate = 60;

export default async function ReviewsPage() {
  await connectToDatabase();
  const reviews = await Testimonial.find({}).sort({ rating: -1, createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center gap-1 text-gold-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold-400" />
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Client Reviews & Feedback
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Honest feedback from Mumbai families, architects, and business owners who entrusted their homes and spaces to us.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href="https://g.page/r/onestop-interiors/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-charcoal-900 font-bold text-xs shadow-warm-sm hover:bg-cream-100 transition"
            >
              <span>View & Rate on Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-cream-300 shadow-warm-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-gold-500 mb-3">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed mb-4">
                      &quot;{rev.reviewText}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-charcoal-900">{rev.clientName}</div>
                      <div className="text-[11px] text-charcoal-500">
                        {rev.location} • {rev.projectTitle}
                      </div>
                    </div>
                    {rev.googleReview && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" /> Google Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <QuickEnquiryForm source="reviews_page" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Reviews" />
      <MobileStickyBar  />
    </div>
  );
}
