import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import PortfolioItem from '@/models/PortfolioItem';
import BlogPost from '@/models/BlogPost';
import ServiceArea from '@/models/ServiceArea';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onestopinteriors.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cost-estimator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/for-architects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    await dbConnect();

    // 1. Dynamic Services
    const services = await Service.find({ isActive: true }).select('slug updatedAt').lean();
    const serviceRoutes: MetadataRoute.Sitemap = services.map((s: any) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    // 2. Dynamic Portfolio Items
    const portfolio = await PortfolioItem.find({ isActive: true }).select('slug updatedAt').lean();
    const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((p: any) => ({
      url: `${SITE_URL}/portfolio/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    // 3. Dynamic Blog Posts
    const blogs = await BlogPost.find({ isPublished: true }).select('slug updatedAt publishedAt').lean();
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((b: any) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.updatedAt || b.publishedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // 4. Local SEO Combination pages: [service]/[area]
    const areas = await ServiceArea.find({ isActive: true }).select('slug updatedAt').lean();
    const localSeoRoutes: MetadataRoute.Sitemap = [];
    for (const service of services) {
      for (const area of areas) {
        localSeoRoutes.push({
          url: `${SITE_URL}/services/${service.slug}/${area.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }

    return [
      ...staticRoutes,
      ...serviceRoutes,
      ...portfolioRoutes,
      ...blogRoutes,
      ...localSeoRoutes,
    ];
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err);
    return staticRoutes;
  }
}

