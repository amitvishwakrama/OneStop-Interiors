import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();

  const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Service', 'Area', 'Status', 'Estimated Value (INR)', 'Source', 'Date'];
  const rows = leads.map((l: any) => [
    l._id.toString(),
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.email || ''}"`,
    `"${(l.serviceType || '').replace(/"/g, '""')}"`,
    `"${(l.area || '').replace(/"/g, '""')}"`,
    l.status,
    l.estimatedValue || 0,
    l.source || '',
    new Date(l.createdAt).toLocaleDateString('en-IN'),
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="onestop_leads_${Date.now()}.csv"`,
    },
  });
}

