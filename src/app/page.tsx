import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import connectToDatabase from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { PortfolioItem } from '@/models/PortfolioItem';
import { Testimonial } from '@/models/Testimonial';
import { EstimatorRate } from '@/models/EstimatorRate';
import { FAQ } from '@/models/FAQ';
import { SiteSettings } from '@/models/SiteSettings';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { ExitIntentModal } from '@/components/common/ExitIntentModal';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { CostEstimatorWidget } from '@/components/estimator/CostEstimatorWidget';
import { HomeClientWrapper } from '@/components/home/HomeClientWrapper';
import {
  Hammer,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  Star,
  Award,
  Users,
  Building2,
  ChevronRight,
  Check,
  BadgeCheck,
} from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation every 60s for lightning speed

async function getHomePageData() {
  await connectToDatabase();

  const [services, portfolio, testimonials, estimatorRates, faqs, settings] = await Promise.all([
    Service.find({}).sort({ order: 1 }).lean(),
    PortfolioItem.find({ featured: true }).sort({ order: 1 }).limit(4).lean(),
    Testimonial.find({ featured: true }).sort({ rating: -1 }).limit(6).lean(),
    EstimatorRate.find({}).lean(),
    FAQ.find({ featured: true }).sort({ order: 1 }).limit(6).lean(),
    SiteSettings.findOne({}).lean(),
  ]);

  return {
    services: JSON.parse(JSON.stringify(services)),
    portfolio: JSON.parse(JSON.stringify(portfolio)),
    testimonials: JSON.parse(JSON.stringify(testimonials)),
    estimatorRates: JSON.parse(JSON.stringify(estimatorRates)),
    faqs: JSON.parse(JSON.stringify(faqs)),
    settings: JSON.parse(JSON.stringify(settings || {})),
  };
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <HomeClientWrapper
      services={data.services}
      portfolio={data.portfolio}
      testimonials={data.testimonials}
      estimatorRates={data.estimatorRates}
      faqs={data.faqs}
      settings={data.settings}
    />
  );
}

