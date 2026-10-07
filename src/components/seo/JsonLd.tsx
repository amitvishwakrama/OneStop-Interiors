import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onestopinteriors.in';

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'OneStop Interiors',
    alternateName: 'OneStop Interiors Mumbai & Thane',
    description:
      'Turnkey interior contractor and master carpenter in Mumbai & Thane led by Shobhnath Vishwakarma with 25+ years experience. Specializing in modular kitchens, wardrobes, false ceilings, painting, civil repair, and turnkey home & commercial interiors.',
    url: SITE_URL,
    telephone: ['+919967302911', '+917039821535'],
    email: 'amitvishwa1950@gmail.com',
    founder: {
      '@type': 'Person',
      name: 'Shobhnath Vishwakarma',
      jobTitle: 'Master Carpenter Contractor',
      worksFor: {
        '@type': 'Organization',
        name: 'OneStop Interiors',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Laxman Nagar, Kurar Village, Malad East',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400097',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.186,
      longitude: 72.8485,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    priceRange: '₹₹ - ₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Cheque, Bank Transfer',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Thane' },
      { '@type': 'AdministrativeArea', name: 'Mulund' },
      { '@type': 'AdministrativeArea', name: 'Malad East' },
      { '@type': 'AdministrativeArea', name: 'Kandivali' },
      { '@type': 'AdministrativeArea', name: 'Borivali' },
      { '@type': 'AdministrativeArea', name: 'Andheri' },
      { '@type': 'AdministrativeArea', name: 'Goregaon' },
      { '@type': 'City', name: 'Palghar' },
      { '@type': 'City', name: 'Navi Mumbai' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Interior & Carpentry Contracting Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpentry & Custom Furniture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modular Kitchen Execution' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modular Wardrobes' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'False Ceiling & Gyproc POP' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Painting & Texture Polish' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Home Turnkey Interior' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial & Office Interior' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '85',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'OneStop Interiors',
      telephone: '+919967302911',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Mumbai, Thane & MMR',
    },
    url,
    image: image || `${SITE_URL}/logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

