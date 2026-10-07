import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';
import { EstimatorRate } from '@/models/EstimatorRate';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ContentManagerClient } from '@/components/admin/ContentManagerClient';

export const revalidate = 0;

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();
  const [settings, rates] = await Promise.all([
    SiteSettings.findOne({}).lean(),
    EstimatorRate.find({}).lean(),
  ]);

  return (
    <AdminLayout user={session.user}>
      <ContentManagerClient
        initialSettings={JSON.parse(JSON.stringify(settings || {}))}
        initialRates={JSON.parse(JSON.stringify(rates))}
      />
    </AdminLayout>
  );
}

