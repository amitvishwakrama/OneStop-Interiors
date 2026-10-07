import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Quotation } from '@/models/Quotation';
import { Lead } from '@/models/Lead';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const quotations = await Quotation.find({}).sort({ createdAt: -1 }).populate('leadId', 'name phone area').lean();

  return NextResponse.json({ quotations });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  const count = await Quotation.countDocuments();
  const quotationNumber = `OSI-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

  const items = body.items || [];
  const subtotal = items.reduce((sum: number, it: any) => sum + (Number(it.amount) || 0), 0);
  const discount = Number(body.discount) || 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const gstPercentage = Number(body.gstPercentage) || 0;
  const gstAmount = Math.round((taxableAmount * gstPercentage) / 100);
  const totalAmount = taxableAmount + gstAmount;

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (Number(body.validityDays) || 30));

  const quote = await Quotation.create({
    quotationNumber,
    leadId: body.leadId || undefined,
    clientName: body.clientName,
    clientPhone: body.clientPhone,
    clientEmail: body.clientEmail || undefined,
    clientAddress: body.clientAddress || '',
    projectTitle: body.projectTitle || 'Interior Execution Quotation',
    items,
    subtotal,
    discount,
    gstPercentage,
    gstAmount,
    totalAmount,
    terms: body.terms || [
      '50% Advance on project confirmation & material booking.',
      '40% Running payment during work execution at stage completion.',
      '10% Final payment upon handover and client satisfaction check.',
      'Rates include material, skilled master labour, and supervision.',
      'Quotation validity is 30 days from date of issue.',
    ],
    validityDays: body.validityDays || 30,
    validUntil,
    warrantyText: 'OneStop Interiors provides a 5-year workmanship warranty on all modular furniture & carpentry.',
    notes: body.notes || '',
    status: 'sent',
  });

  // If linked to lead, update lead status to quotation_sent and set estimated value
  if (body.leadId) {
    await Lead.findByIdAndUpdate(body.leadId, {
      status: 'quotation_sent',
      estimatedValue: totalAmount,
      $push: {
        notes: {
          text: `Quotation ${quotationNumber} for ₹${totalAmount.toLocaleString()} generated and sent.`,
          author: session.user?.name || 'Admin',
          createdAt: new Date(),
        },
      },
    });
  }

  return NextResponse.json({ success: true, quotation: quote });
}

