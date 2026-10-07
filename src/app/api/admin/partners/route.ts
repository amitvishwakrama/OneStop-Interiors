import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Partner } from '@/models/Partner';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const partners = await Partner.find({}).sort({ name: 1 }).lean();
  return NextResponse.json({ partners });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const partner = await Partner.create({
    name: body.name,
    trade: body.trade,
    phone: body.phone,
    rating: Number(body.rating) || 5,
    serviceAreas: body.serviceAreas || ['Mumbai'],
    availability: body.availability || 'available',
    notes: body.notes || '',
  });

  return NextResponse.json({ success: true, partner });
}

