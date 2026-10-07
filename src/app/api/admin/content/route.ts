import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';
import { EstimatorRate } from '@/models/EstimatorRate';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const [settings, rates] = await Promise.all([
    SiteSettings.findOne({}).lean(),
    EstimatorRate.find({}).lean(),
  ]);

  return NextResponse.json({ settings, rates });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  if (body.settings) {
    await SiteSettings.findOneAndUpdate({}, body.settings, { upsert: true });
  }

  if (body.rates && Array.isArray(body.rates)) {
    for (const r of body.rates) {
      await EstimatorRate.findOneAndUpdate({ serviceType: r.serviceType }, r, { upsert: true });
    }
  }

  return NextResponse.json({ success: true, message: 'Settings updated' });
}

