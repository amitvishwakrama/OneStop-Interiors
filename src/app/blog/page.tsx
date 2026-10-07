import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interior Tips, Pricing & Guides for Mumbai Homeowners | OneStop Interiors',
  description:
    'Expert interior renovation guides, modular kitchen cost breakdowns, plywood grades comparison, and practical advice by master contractor Shobhnath Vishwakarma.',
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  await connectToDatabase();
  const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <section className="bg-wood-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-400/30">
            Expert Interior Guides
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 mb-4">
            Interior Insights & Cost Guides
          </h1>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto">
            Practical advice from 25+ years of contractor experience in Mumbai to help you make informed decisions about your home interior.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <div
              key={post.slug}
              className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-wood-950/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase">
                    {post.tags?.[0] || 'Guide'}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-charcoal-400 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <h2 className="text-lg font-serif font-bold text-charcoal-900 group-hover:text-wood-800 transition line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full py-2.5 rounded-xl bg-wood-50 hover:bg-wood-100 text-wood-900 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-wood-200"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Blog" />
      <MobileStickyBar  />
    </div>
  );
}
