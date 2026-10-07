import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';
import { Partner } from '@/models/Partner';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { LeadCrmClient } from '@/components/admin/LeadCrmClient';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();
  const [leads, partners] = await Promise.all([
    Lead.find({}).sort({ createdAt: -1 }).populate('assignedPartnerId', 'name trade phone').lean(),
    Partner.find({}).lean(),
  ]);

  return (
    <AdminLayout user={session.user}>
      <LeadCrmClient
        initialLeads={JSON.parse(JSON.stringify(leads))}
        partners={JSON.parse(JSON.stringify(partners))}
      />
    </AdminLayout>
  );
}

