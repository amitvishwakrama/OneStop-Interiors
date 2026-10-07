import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { QuoteModal } from '@/components/common/QuoteModal';
import { ServiceDetailClient } from '@/components/services/ServiceDetailClient';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectToDatabase();
  const service = await Service.findOne({ slug: params.slug }).lean();
  if (!service) return { title: 'Service Not Found | OneStop Interiors' };

  return {
    title: `${(service as any).seoTitle || (service as any).name} | OneStop Interiors`,
    description: (service as any).seoDesc || (service as any).shortDesc,
    openGraph: {
      title: `${(service as any).name} in Mumbai & Thane | OneStop Interiors`,
      description: (service as any).shortDesc,
      images: [(service as any).heroImage],
    },
  };
}

export async function generateStaticParams() {
  await connectToDatabase();
  const services = await Service.find({}, 'slug').lean();
  return services.map((s: any) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  await connectToDatabase();
  const service = await Service.findOne({ slug: params.slug }).lean();

  if (!service) {
    notFound();
  }

  const cleanService = JSON.parse(JSON.stringify(service));

  return <ServiceDetailClient service={cleanService} />;
}

