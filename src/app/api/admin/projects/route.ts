import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 }).populate('leadId', 'name phone').lean();
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const project = await Project.create({
    leadId: body.leadId || undefined,
    title: body.title,
    clientName: body.clientName,
    clientPhone: body.clientPhone,
    serviceType: body.serviceType || 'Full Home Interior',
    area: body.area || 'Mumbai',
    status: body.status || 'planning',
    totalBudget: Number(body.totalBudget) || 0,
    advancePaid: Number(body.advancePaid) || 0,
    paymentMilestones: body.paymentMilestones || [
      { name: 'Advance on Booking (50%)', amount: Math.round((Number(body.totalBudget) || 0) * 0.5), status: 'paid' },
      { name: 'Running Work Stage (40%)', amount: Math.round((Number(body.totalBudget) || 0) * 0.4), status: 'pending' },
      { name: 'Handover & Warranty (10%)', amount: Math.round((Number(body.totalBudget) || 0) * 0.1), status: 'pending' },
    ],
    startDate: new Date(),
    reviewRequested: false,
  });

  return NextResponse.json({ success: true, project });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();
  const { id, ...updates } = body;

  const project = await Project.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json({ success: true, project });
}

