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
  const { searchParams } = new URL(req.url);

  const status = searchParams.get('status');
  const service = searchParams.get('service');
  const search = searchParams.get('search');

  const query: any = {};
  if (status && status !== 'all') {
    query.status = status;
  }
  if (service && service !== 'all') {
    query.serviceType = service;
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { area: { $regex: search, $options: 'i' } },
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 }).populate('assignedPartnerId', 'name trade phone').lean();

  return NextResponse.json({ leads });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  const newLead = await Lead.create({
    name: body.name,
    phone: body.phone,
    email: body.email,
    serviceType: body.serviceType || 'General Interior',
    area: body.area || 'Mumbai',
    message: body.message,
    estimatedValue: body.estimatedValue || 0,
    source: body.source || 'admin_manual',
    status: body.status || 'new',
    notes: [
      {
        text: 'Lead created manually by admin.',
        author: session.user?.name || 'Admin',
        createdAt: new Date(),
      },
    ],
  });

  return NextResponse.json({ success: true, lead: newLead });
}

