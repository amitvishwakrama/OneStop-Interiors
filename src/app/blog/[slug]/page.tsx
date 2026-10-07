import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { formatDate } from '@/lib/utils';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug: params.slug }).lean();
  if (!post) return { title: 'Article Not Found | OneStop Interiors' };

  return {
    title: `${(post as any).seoTitle || (post as any).title}`,
    description: (post as any).seoDesc || (post as any).excerpt,
    openGraph: {
      title: (post as any).title,
      description: (post as any).excerpt,
      images: [(post as any).coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug: params.slug }).lean();

  if (!post) {
    notFound();
  }

  const article = JSON.parse(JSON.stringify(post));

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-wood-700 hover:text-wood-900 transition mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 font-medium pb-6 border-b border-cream-300">
            <span className="flex items-center gap-1 text-charcoal-800 font-bold">
              <User className="w-3.5 h-3.5 text-gold-600" /> {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {formatDate(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-warm-lg mb-8 border border-cream-300">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-warm-sm space-y-6 text-charcoal-800 text-sm sm:text-base leading-relaxed">
          <div className="whitespace-pre-line font-sans space-y-4">
            {article.content}
          </div>
        </div>

        {/* Bottom CTA Form */}
        <div className="mt-12">
          <QuickEnquiryForm source={`blog_${article.slug}`} />
        </div>
      </article>

      <Footer />
      <FloatingWhatsApp pageName={article.title} />
      <MobileStickyBar  />
    </div>
  );
}
