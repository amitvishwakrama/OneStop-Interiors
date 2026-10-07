import React from 'react';
import type { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import { PortfolioItem } from '@/models/PortfolioItem';
import { PortfolioClient } from '@/components/portfolio/PortfolioClient';

export const metadata: Metadata = {
  title: 'Our Completed Interior Projects in Mumbai & Thane | OneStop Interiors',
  description:
    'Browse 20+ completed residential flats, modular kitchens, wardrobes and commercial office interior projects executed by Shobhnath Vishwakarma in Mumbai and Thane.',
};

export const revalidate = 60;

export default async function PortfolioPage() {
  await connectToDatabase();
  const items = await PortfolioItem.find({}).sort({ order: 1, createdAt: -1 }).lean();

  return <PortfolioClient initialItems={JSON.parse(JSON.stringify(items))} />;
}

