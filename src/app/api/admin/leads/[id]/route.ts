import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const lead = await Lead.findById(params.id).populate('assignedPartnerId').lean();
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({ lead });
}

export async function PATCH(req: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  const lead = await Lead.findById(params.id);
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  // Handle status update
  if (body.status && body.status !== lead.status) {
    const oldStatus = lead.status;
    lead.status = body.status;
    lead.history.push({
      action: 'Status Change',
      from: oldStatus,
      to: body.status,
      note: body.statusNote || `Status changed from ${oldStatus} to ${body.status}`,
      createdAt: new Date(),
    });
  }

  // Handle new note addition
  if (body.newNote && body.newNote.trim()) {
    lead.notes.push({
      text: body.newNote.trim(),
      author: session.user?.name || 'Admin',
      createdAt: new Date(),
    });
  }

  // Handle estimated value update
  if (body.estimatedValue !== undefined) {
    lead.estimatedValue = Number(body.estimatedValue);
  }

  // Handle assigned partner
  if (body.assignedPartnerId !== undefined) {
    lead.assignedPartnerId = body.assignedPartnerId || undefined;
  }

  // Handle follow up date
  if (body.followUpDate !== undefined) {
    lead.followUpDate = body.followUpDate ? new Date(body.followUpDate) : undefined;
  }

  await lead.save();

  return NextResponse.json({ success: true, lead });
}

export async function DELETE(req: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  await Lead.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true, message: 'Lead deleted' });
}

