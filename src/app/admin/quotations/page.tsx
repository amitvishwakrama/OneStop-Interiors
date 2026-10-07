import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import { Quotation } from '@/models/Quotation';
import { Lead } from '@/models/Lead';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { QuotationGeneratorClient } from '@/components/admin/QuotationGeneratorClient';

export const revalidate = 0;

export default async function AdminQuotationsPage({
  searchParams,
}: {
  searchParams: { leadId?: string; name?: string; phone?: string; area?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  await connectToDatabase();
  const [quotations, leads] = await Promise.all([
    Quotation.find({}).sort({ createdAt: -1 }).populate('leadId', 'name phone area').lean(),
    Lead.find({}).sort({ createdAt: -1 }).select('_id name phone area serviceType').lean(),
  ]);

  return (
    <AdminLayout user={session.user}>
      <QuotationGeneratorClient
        initialQuotations={JSON.parse(JSON.stringify(quotations))}
        leads={JSON.parse(JSON.stringify(leads))}
        prefillLeadId={searchParams.leadId}
        prefillName={searchParams.name}
        prefillPhone={searchParams.phone}
        prefillArea={searchParams.area}
      />
    </AdminLayout>
  );
}

