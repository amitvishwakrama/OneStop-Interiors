'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { ExitIntentModal } from '@/components/common/ExitIntentModal';
import { QuoteModal } from '@/components/common/QuoteModal';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { CostEstimatorWidget, EstimatorRateData } from '@/components/estimator/CostEstimatorWidget';
import {
  Hammer,
  UtensilsCrossed,
  DoorClosed,
  LampCeiling,
  Paintbrush,
  Zap,
  Wrench,
  Grid3x3,
  Home,
  Building2,
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
  ChevronDown,
  Check,
  BadgeCheck,
} from 'lucide-react';

interface HomeClientWrapperProps {
  services: any[];
  portfolio: any[];
  testimonials: any[];
  estimatorRates: EstimatorRateData[];
  faqs: any[];
  settings: any;
}

export function HomeClientWrapper({
  services,
  portfolio,
  testimonials,
  estimatorRates,
  faqs,
  settings,
}: HomeClientWrapperProps) {
  const { language, t } = useLanguage();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Map service icons to lucide components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-gold-600" />;
      case 'DoorClosed':
        return <DoorClosed className="w-6 h-6 text-gold-600" />;
      case 'LampCeiling':
        return <LampCeiling className="w-6 h-6 text-gold-600" />;
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-gold-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-gold-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-gold-600" />;
      case 'Grid3x3':
        return <Grid3x3 className="w-6 h-6 text-gold-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-gold-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-gold-600" />;
      default:
        return <Hammer className="w-6 h-6 text-gold-600" />;
    }
  };

  const sampleBeforeAfter = portfolio[0]?.beforeAfterImages?.before
    ? {
        before: portfolio[0].beforeAfterImages.before,
        after: portfolio[0].beforeAfterImages.after,
        title: portfolio[0].title,
        location: portfolio[0].location,
      }
    : {
        before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        title: '3BHK Living Room & Woodwork Transformation',
        location: 'Oberoi Woods, Goregaon East, Mumbai',
      };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-wood-950 via-wood-900 to-wood-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Subtle wood texture background overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs sm:text-sm font-semibold tracking-wide">
                <Award className="w-4 h-4 text-gold-400" />
                <span>
                  {language === 'hi'
                    ? 'शोभनाथ विश्वकर्मा • 25+ वर्षों का मास्टर अनुभव'
                    : 'Shobhnath Vishwakarma • 25+ Years Experience'}
                </span>
              </div>

              {/* Tagline */}
              <div className="text-gold-400 text-sm sm:text-base font-bold tracking-wide uppercase">
                {t.hero.tagline}
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight tracking-tight">
                {t.hero.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-cream-200 leading-relaxed font-normal max-w-2xl">
                {t.hero.subheadline}
              </p>

              {/* Key Bullet Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-cream-100 font-medium">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>One contractor for all 11 trades</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5-Year Workmanship Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Genuine 710 Marine Plywood</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Site Inspection across Mumbai</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-6 py-4 rounded-xl bg-gold-600 hover:bg-gold-500 active:bg-gold-700 text-white font-bold text-sm sm:text-base shadow-warm-lg hover:shadow-warm-xl transition transform active:scale-95 flex items-center gap-2 min-h-[48px]"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{t.hero.getFreeQuote}</span>
                </button>

                <a
                  href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20want%20a%20free%20site%20visit%20and%20interior%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-warm-md hover:shadow-warm-lg transition transform active:scale-95 flex items-center gap-2 min-h-[48px]"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>{t.hero.chatWhatsapp}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Quick Enquiry Form */}
            <div className="lg:col-span-5 relative">
              <QuickEnquiryForm
                source="hero_embedded_form"
                className="shadow-2xl ring-1 ring-gold-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-wood-800 text-white border-y border-wood-700 py-6 sm:py-8 shadow-warm-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-wood-700/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
                25+
              </div>
              <div className="text-xs sm:text-sm text-cream-200 font-medium mt-1">
                {t.trustStrip.yearsExp}
              </div>
            </div>

            <div className="border-r border-wood-700/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
                550+
              </div>
              <div className="text-xs sm:text-sm text-cream-200 font-medium mt-1">
                {t.trustStrip.projectsDone}
              </div>
            </div>

            <div className="border-r border-wood-700/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
                480+
              </div>
              <div className="text-xs sm:text-sm text-cream-200 font-medium mt-1">
                {t.trustStrip.happyClients}
              </div>
            </div>

            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
                5 Years
              </div>
              <div className="text-xs sm:text-sm text-cream-200 font-medium mt-1">
                {t.trustStrip.warranty}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL 11 SERVICES GRID */}
      <section className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              One Contractor • Complete Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900 tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-600">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc: any) => (
              <div
                key={svc.slug}
                className="group bg-white rounded-2xl border border-cream-300 p-6 shadow-warm-sm hover:shadow-warm-lg hover:border-gold-400 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cream-100 group-hover:bg-gold-50 flex items-center justify-center mb-4 transition border border-cream-200 group-hover:border-gold-300">
                    {getServiceIcon(svc.icon)}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-charcoal-900 group-hover:text-wood-800 transition">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-2 line-clamp-3 leading-relaxed">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-charcoal-500 block">
                      {t.services.startingFrom}
                    </span>
                    <span className="text-sm font-extrabold text-wood-800">
                      {svc.startingPrice}{' '}
                      <span className="text-[11px] font-normal text-charcoal-500">
                        /{svc.unit}
                      </span>
                    </span>
                  </div>

                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 group-hover:text-gold-800 group-hover:translate-x-1 transition"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-wood-800 hover:bg-wood-900 text-white font-semibold text-sm shadow-warm-md transition"
            >
              <span>{t.services.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (4 Pillars) */}
      <section className="py-16 sm:py-20 bg-cream-100 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900">
              {t.whyChooseUs.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-600">
              {t.whyChooseUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-warm-sm">
              <div className="w-12 h-12 rounded-xl bg-wood-100 text-wood-800 flex items-center justify-center font-bold text-lg mb-4">
                <Users className="w-6 h-6 text-wood-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">
                {t.whyChooseUs.p1Title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {t.whyChooseUs.p1Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-warm-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-4">
                <Clock className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">
                {t.whyChooseUs.p2Title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {t.whyChooseUs.p2Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-warm-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">
                {t.whyChooseUs.p3Title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {t.whyChooseUs.p3Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-warm-sm">
              <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold text-lg mb-4">
                <Award className="w-6 h-6 text-gold-800" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">
                {t.whyChooseUs.p4Title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {t.whyChooseUs.p4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE/AFTER TRANSFORMATION */}
      <section className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider">
                Proof of Craftsmanship
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900 tracking-tight">
                See How We Transform Old Mumbai Flats
              </h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                From peeling plaster and termite-damaged cabinets to modern BWP Marine ply modular interiors with concealed warm lighting. Drag the slider to witness our real job site handover quality.
              </p>
              <div className="space-y-3 pt-2 text-xs text-charcoal-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dismantling of old woodwork & society debris haulage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Crystalline damp-proofing barrier before painting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Heavy-gauge Gyproc false ceiling & Saint-Gobain hardware</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-bold text-wood-800 hover:text-wood-950 underline underline-offset-4"
                >
                  <span>Explore 20+ Real Mumbai Portfolio Projects →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage={sampleBeforeAfter.before}
                afterImage={sampleBeforeAfter.after}
                title={sampleBeforeAfter.title}
                location={sampleBeforeAfter.location}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (4 Steps) */}
      <section className="py-16 sm:py-24 bg-wood-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1 block">
              Transparent Work Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cream-50">
              {t.howWeWork.title}
            </h2>
            <p className="mt-2 text-sm text-cream-300">
              {t.howWeWork.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                title: t.howWeWork.step1Title,
                desc: t.howWeWork.step1Desc,
              },
              {
                step: '02',
                title: t.howWeWork.step2Title,
                desc: t.howWeWork.step2Desc,
              },
              {
                step: '03',
                title: t.howWeWork.step3Title,
                desc: t.howWeWork.step3Desc,
              },
              {
                step: '04',
                title: t.howWeWork.step4Title,
                desc: t.howWeWork.step4Desc,
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-wood-950/60 rounded-2xl p-6 border border-wood-800 relative hover:border-gold-500/50 transition"
              >
                <div className="text-3xl font-serif font-extrabold text-gold-500/40 mb-3">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-cream-300 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm shadow-warm-lg transition transform active:scale-95"
            >
              <span>Schedule Your Free Site Visit Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE COST ESTIMATOR SECTION */}
      <section id="cost-estimator" className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider mb-2">
              Instant Price Calculator
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900">
              {t.estimator.title}
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              {t.estimator.subtitle}
            </p>
          </div>

          <CostEstimatorWidget rates={estimatorRates} />
        </div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL / GRID */}
      <section className="py-16 sm:py-24 bg-cream-100 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-1 text-gold-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-500" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900">
              Trusted by 480+ Homeowners & Architects
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Read real feedback from clients in Malad, Kandivali, Andheri, Thane, Mulund & Palghar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-cream-300 shadow-warm-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-gold-500 mb-3">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-charcoal-700">5.0</span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed mb-4">
                    &quot;{test.reviewText}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-charcoal-900">
                      {test.clientName}
                    </div>
                    <div className="text-[11px] text-charcoal-500">
                      {test.location} • {test.projectTitle}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-bold text-wood-800 hover:text-wood-950 underline underline-offset-4"
            >
              <span>View All Customer Reviews & Google Rating →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-gold-700 text-xs font-bold uppercase tracking-wider mb-1 block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Everything you need to know about our interior contracting work and pricing.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-cream-300 overflow-hidden shadow-warm-sm transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-charcoal-900 hover:text-wood-800 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-cream-200 bg-cream-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="bg-wood-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
              Ready to Upgrade Your Space?
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 leading-tight">
              One Contractor. One Quotation. Total Responsibility.
            </h2>
            <p className="text-sm sm:text-base text-cream-200 max-w-xl mx-auto">
              Call Shobhnath Vishwakarma directly or book a free site inspection anywhere in Mumbai, Thane, Mulund & Palghar.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="tel:9967302911"
                className="px-8 py-4 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-base shadow-warm-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call 9967302911</span>
              </a>

              <a
                href="https://wa.me/919967302911?text=Namaste%20Shobhnathji%2C%20I%20want%20to%20discuss%20my%20interior%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-warm-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>WhatsApp Shobhnathji</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp pageName="Home" />
      <MobileStickyBar onOpenQuoteModal={() => setQuoteModalOpen(true)} />
      <ExitIntentModal />
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

