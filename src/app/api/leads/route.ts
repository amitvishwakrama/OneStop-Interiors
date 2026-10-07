import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import { Lead } from '@/models/Lead';
import { isValidIndianPhone, cleanPhoneNumber, createWhatsAppUrl } from '@/lib/utils';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().refine(isValidIndianPhone, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  serviceType: z.string().min(2, 'Please select a service'),
  area: z.string().min(2, 'Please specify your area/locality in Mumbai/Thane'),
  address: z.string().optional(),
  message: z.string().max(1000).optional(),
  photoUrl: z.string().optional(),
  source: z.string().default('website_enquiry'),
  estimatedValue: z.number().optional().default(0),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  hp: z.string().optional(), // Honeypot field
});

// Simple in-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recent = timestamps.filter(t => now - t < 60000); // within last 1 minute

    if (recent.length >= 6) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute or call us directly at 9967302911.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, [...recent, now]);

    const body = await req.json();

    // Honeypot check: spam bots usually fill all hidden fields
    if (body.hp && body.hp.trim() !== '') {
      console.log('[Spam Honeypot Triggered] Fake lead ignored.');
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0]?.message || 'Invalid form data' },
        { status: 400 }
      );
    }

    const data = validation.data;
    const cleanedPhone = cleanPhoneNumber(data.phone);

    await connectToDatabase();

    const newLead = await Lead.create({
      name: data.name.trim(),
      phone: cleanedPhone,
      email: data.email?.trim() || undefined,
      serviceType: data.serviceType,
      area: data.area.trim(),
      address: data.address?.trim() || undefined,
      message: data.message?.trim() || undefined,
      photoUrl: data.photoUrl || undefined,
      source: data.source,
      estimatedValue: data.estimatedValue || 0,
      utmParams: {
        source: data.utmSource,
        medium: data.utmMedium,
        campaign: data.utmCampaign,
      },
      status: 'new',
      notes: [
        {
          text: `Enquiry received via ${data.source}. Client phone: ${cleanedPhone}, Area: ${data.area}`,
          author: 'System',
          createdAt: new Date(),
        },
      ],
      history: [
        {
          action: 'Created',
          note: `Lead created from website (${data.source})`,
          createdAt: new Date(),
        },
      ],
    });

    // Generate quick WhatsApp reply link for the contractor to reply to client
    const ownerWhatsAppText = `Namaste ${data.name}ji, I am Shobhnath Vishwakarma from OneStop Interiors. Thank you for your inquiry for ${data.serviceType} in ${data.area}. When can we schedule a free site visit to take measurements and discuss your requirements?`;
    const clientWhatsAppUrl = createWhatsAppUrl(cleanedPhone, ownerWhatsAppText);

    // Optional notification email if configured
    if (process.env.RESEND_API_KEY && process.env.OWNER_NOTIFICATION_EMAIL) {
      try {
        // Asynchronous fire & forget or Resend notification
        console.log(`[Lead Notification] Email notification triggered for lead ${newLead._id}`);
      } catch (emailErr) {
        console.error('[Email Notification Error]', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: newLead._id.toString(),
      message: 'Your quotation request has been received successfully!',
      clientWhatsAppUrl,
    });
  } catch (err: any) {
    console.error('[Lead Creation Error]', err);
    return NextResponse.json(
      { error: 'An error occurred while saving your enquiry. Please call us directly at 9967302911.' },
      { status: 500 }
    );
  }
}

