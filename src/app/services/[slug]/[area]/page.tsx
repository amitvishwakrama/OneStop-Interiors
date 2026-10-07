import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import ServiceArea from '@/models/ServiceArea';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { QuickEnquiryForm } from '@/components/forms/QuickEnquiryForm';
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import {
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  Star,
  Sparkles,
  Hammer,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
    area: string;
  };
}

// Fallback area formatter if area not found in DB
function formatAreaName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const service = await Service.findOne({ slug: params.slug }).lean();
  const areaDoc = await ServiceArea.findOne({ slug: params.area }).lean();

  const serviceName = service ? (service as any).name : formatAreaName(params.slug);
  const areaName = areaDoc ? (areaDoc as any).name : formatAreaName(params.area);

  const title = `${serviceName} Contractor in ${areaName} | OneStop Interiors`;
  const description = `Looking for trusted ${serviceName} services in ${areaName}? Shobhnath Vishwakarma brings 25+ years carpenter contracting experience to ${areaName}. Direct workshop rates & 10-yr warranty. Free site inspection.`;

  return {
    title,
    description,
    keywords: [
      `${serviceName.toLowerCase()} in ${areaName.toLowerCase()}`,
      `${serviceName.toLowerCase()} contractor ${areaName.toLowerCase()}`,
      `carpenter in ${areaName.toLowerCase()}`,
      `interior renovation ${areaName.toLowerCase()}`,
      `interior contractor ${areaName.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/services/${params.slug}/${params.area}`,
    },
  };
}

export default async function LocalServiceAreaPage({ params }: Props) {
  await dbConnect();
  const service = await Service.findOne({ slug: params.slug }).lean() as any;
  const areaDoc = await ServiceArea.findOne({ slug: params.area }).lean() as any;

  if (!service) {
    notFound();
  }

  const areaName = areaDoc ? areaDoc.name : formatAreaName(params.area);
  const regionName = areaDoc ? areaDoc.region : 'Mumbai Metropolitan Region';
  const landmarks = areaDoc?.landmarks?.length
    ? areaDoc.landmarks.join(', ')
    : 'residential societies, commercial towers, and retail markets';

  const localFaqs = [
    {
      question: `How fast can you visit our site in ${areaName} for measurements?`,
      answer: `Because our team operates across ${regionName} daily, we can usually arrange an on-site visit in ${areaName} within 2 to 4 hours or at your preferred weekend slot.`,
    },
    {
      question: `Do you bring samples and catalogs when visiting sites in ${areaName}?`,
      answer: `Yes! Our supervisor visits your site with physical laminate catalogs (Merino, Century, Greenlam), acrylic swatch cards, hardware samples (Hettich, Hafele), and photos of completed work in nearby areas.`,
    },
    {
      question: `Are you a contractor or do you sub-contract to third parties?`,
      answer: `Shobhnath Vishwakarma personally supervises all projects. We have our own master carpentry team and our trusted trade specialists (electricians, painters, plumbers, POP workers) work directly under our single contractor responsibility.`,
    },
    {
      question: `What warranty do you provide for ${service.name} work in ${areaName}?`,
      answer: `We provide up to a 10-year warranty against termite and delamination on IS:710 Marine Grade plywood woodwork, along with manufacturer warranties on brand hardware.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-charcoal-800">
      <Navbar />

      {/* SEO Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` },
          { name: `${service.name} in ${areaName}`, url: `/services/${service.slug}/${params.area}` },
        ]}
      />
      <ServiceJsonLd
        name={`${service.name} Contractor in ${areaName}`}
        description={`Professional ${service.name} execution and contracting in ${areaName}, ${regionName} by OneStop Interiors.`}
        url={`/services/${service.slug}/${params.area}`}
        image={service.heroImage}
      />
      <FaqJsonLd faqs={localFaqs} />

      {/* Breadcrumb Bar */}
      <div className="bg-cream-100 border-b border-cream-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-600 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-gold-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
          <Link href="/services" className="hover:text-gold-600 transition">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
          <Link href={`/services/${service.slug}`} className="hover:text-gold-600 transition">{service.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
          <span className="font-semibold text-charcoal-900">{areaName}</span>
        </div>
      </div>

      {/* Localized Hero */}
      <section className="relative bg-gradient-to-b from-wood-900 via-wood-800 to-charcoal-900 text-cream-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-xs font-bold tracking-wide">
                <MapPin className="w-3.5 h-3.5" /> Serving {areaName} & Nearby Zones
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight">
                Top Rated <span className="text-gold-400">{service.name}</span> in {areaName}
              </h1>

              <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed font-sans">
                Direct contractor execution by <strong>Shobhnath Vishwakarma</strong> (25+ years craftsmanship). Zero middleman commissions, factory workshop rates, and premium marine plywood furniture designed specifically for homes and offices in {areaName}.
              </p>

              {/* Local Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-cream-100">Same-Day Visit</div>
                    <div className="text-cream-300/70">In {areaName}</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-cream-100">10-Year Warranty</div>
                    <div className="text-cream-300/70">IS:710 Marine Ply</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400 flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-cream-100">4.9 / 5 Rating</div>
                    <div className="text-cream-300/70">85+ Mumbai Clients</div>
                  </div>
                </div>
              </div>

              {/* Local Area CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`https://wa.me/919967302911?text=${encodeURIComponent(`Hi Shobhnathji, I am looking for ${service.name} in ${areaName}. Please schedule a site visit.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] transition shadow-warm-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> WhatsApp for {areaName} Visit
                </a>
                <a
                  href="tel:9967302911"
                  className="px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-cream-50 font-bold text-sm hover:bg-white/20 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gold-400" /> Call 9967302911
                </a>
              </div>
            </div>

            {/* Local Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-cream-300">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold mb-2">
                    {areaName} Priority Booking
                  </div>
                  <h3 className="text-xl font-serif font-bold text-charcoal-900">
                    Get Free Site Visit & Quote
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Direct inspection in {areaName} within 24 hours. No obligation.
                  </p>
                </div>

                <QuickEnquiryForm
                  defaultService={service.name}
                  defaultArea={areaName}
                  source={`local_seo_${params.area}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Work & Scope */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-warm-xl h-[400px]">
            <Image
              src={service.heroImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'}
              alt={`${service.name} in ${areaName}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-xs font-mono uppercase tracking-wider text-gold-300">Execution Hub</div>
                <div className="text-lg font-serif font-bold">Malad East Workshop → Delivered Across {areaName}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-wood-800 text-xs font-bold">
              <Hammer className="w-3.5 h-3.5" /> What Is Included
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              Complete {service.name} Scope in {areaName}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-sans">
              Whether you are renovating an apartment in {areaName} or setting up a new commercial office near {landmarks}, we handle every phase from raw timber selection to the final coat of polish.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(service.includedItems || [
                'On-site laser measurements and space optimization',
                'IS:710 Marine Grade Plywood and anti-termite treatment',
                'Soft-close hinges and hydraulic tandem drawers (Hettich / Hafele)',
                'Scratch-resistant 1mm acrylic and textured mica laminates',
                'Concealed lighting troughs and profile LEDs',
                '100% on-time handover guaranteed with zero mess left behind',
              ]).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-cream-200 shadow-warm-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-charcoal-700 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/cost-estimator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-wood-800 text-gold-300 font-bold text-xs hover:bg-wood-700 transition"
              >
                Estimate {service.name} Cost <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cream-200 text-charcoal-800 font-bold text-xs hover:bg-cream-300 transition"
              >
                See Mumbai Photos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose OneStop in this Area */}
      <section className="py-16 bg-cream-100/60 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              Why {areaName} Residents Choose OneStop Interiors
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Unlike online aggregator apps that assign random third-party vendors, we are genuine master craftsmen with our own permanent workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-warm-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal-900">
                Direct Contractor Responsibility
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                One point of contact from start to finish. Shobhnathji personally oversees every measurement, joint, and fitting so you never have to deal with coordination hassles between trades.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-warm-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-wood-100 text-wood-800 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal-900">
                Workshop-Direct Factory Pricing
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                We fabricate modules, carcass units, and custom furniture directly at our Malad East facility, saving you showroom commissions and unnecessary agency markups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-warm-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal-900">
                100% Genuine Branded Materials
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Zero duplicates or counterfeit hardware. We use certified CenturyPly, Greenlam, Merino, Hettich, Hafele, and Asian Paints with material inspection invites for clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localized FAQ Accordion */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
            Frequently Asked Questions for {areaName} Clients
          </h2>
          <p className="text-xs text-charcoal-500 mt-2">
            Clear answers on turnaround times, measurements, and pricing.
          </p>
        </div>

        <div className="space-y-4">
          {localFaqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-cream-200 shadow-warm-xs">
              <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal-900 mb-2">
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Service Areas Links */}
      <section className="py-12 bg-cream-50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">
            We Also Provide {service.name} in Other Key MMR Locations:
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {['mumbai', 'thane', 'mulund', 'malad-east', 'kandivali', 'borivali', 'andheri', 'goregaon', 'palghar', 'navi-mumbai'].map((a) => (
              <Link
                key={a}
                href={`/services/${service.slug}/${a}`}
                className={`px-3 py-1.5 rounded-full border transition ${
                  a === params.area
                    ? 'bg-wood-800 text-gold-300 border-wood-800 font-bold'
                    : 'bg-white text-charcoal-600 border-cream-300 hover:border-gold-500 hover:text-wood-800'
                }`}
              >
                {formatAreaName(a)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
      <FloatingWhatsApp serviceName={`${service.name} in ${areaName}`} />
    </div>
  );
}
