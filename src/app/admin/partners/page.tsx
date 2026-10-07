import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import { Partner } from '@/models/Partner';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PartnerDirectoryClient } from '@/components/admin/PartnerDirectoryClient';

export const revalidate = 0;

export default async function AdminPartnersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();
  const partners = await Partner.find({}).sort({ trade: 1, name: 1 }).lean();

  return (
    <AdminLayout user={session.user}>
      <PartnerDirectoryClient initialPartners={JSON.parse(JSON.stringify(partners))} />
    </AdminLayout>
  );
}

