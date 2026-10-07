import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { PortfolioItem } from '@/models/PortfolioItem';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { MapPin, Clock, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectToDatabase();
  const item = await PortfolioItem.findOne({ slug: params.slug }).lean();
  if (!item) return { title: 'Project Not Found | OneStop Interiors' };

  return {
    title: `${(item as any).title} | OneStop Interiors Portfolio`,
    description: (item as any).description,
    openGraph: {
      title: (item as any).title,
      description: (item as any).description,
      images: [(item as any).coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  await connectToDatabase();
  const item = await PortfolioItem.findOne({ slug: params.slug }).lean();

  if (!item) {
    notFound();
  }

  const project = JSON.parse(JSON.stringify(item));

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-wood-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs text-gold-400 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:underline">Our Work</Link>
            <span>/</span>
            <span className="text-cream-200 truncate">{project.title}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-cream-50 leading-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-cream-300">
            <div className="flex items-center gap-1.5 bg-wood-900 px-3 py-1.5 rounded-lg border border-wood-800">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-wood-900 px-3 py-1.5 rounded-lg border border-wood-800">
              <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
              <span>{project.areaSqFt} Sq. Ft.</span>
            </div>
            <div className="flex items-center gap-1.5 bg-wood-900 px-3 py-1.5 rounded-lg border border-wood-800">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Main Cover */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-warm-lg border border-cream-300">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            {/* Description & Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                Project Overview & Scope
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                {project.description}
              </p>

              {project.clientFeedback && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                    Client Testimonial:
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 italic">
                    &quot;{project.clientFeedback}&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Before / After Slider if present */}
            {project.beforeAfterImages?.before && (
              <div>
                <BeforeAfterSlider
                  beforeImage={project.beforeAfterImages.before}
                  afterImage={project.beforeAfterImages.after}
                  title="Before vs After View"
                  location={project.location}
                />
              </div>
            )}

            {/* Gallery Images */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-charcoal-900">
                  Site Execution Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-cream-300 shadow-warm-sm"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - photo ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <QuickEnquiryForm
                defaultService={project.category.replace(/-/g, ' ')}
                source={`project_page_${project.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName={project.title} />
      <MobileStickyBar  />
    </div>
  );
}
