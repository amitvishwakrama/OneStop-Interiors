import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import { Quotation } from '@/models/Quotation';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const quote = await Quotation.findById(params.id).lean();
  if (!quote) {
    return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
  }

  const q = quote as any;

  // Create PDF Document with pdf-lib
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 points

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const margin = 40;
  let y = height - margin;

  // Colors
  const woodBrown = rgb(0.24, 0.09, 0.04);
  const goldAccent = rgb(0.85, 0.47, 0.02);
  const charcoal = rgb(0.12, 0.16, 0.24);
  const lightGray = rgb(0.95, 0.94, 0.92);
  const borderGray = rgb(0.85, 0.83, 0.80);

  // 1. BRAND HEADER
  page.drawText('ONESTOP INTERIORS', {
    x: margin,
    y: y - 10,
    size: 22,
    font: boldFont,
    color: woodBrown,
  });

  page.drawText('One Contractor • One Quotation • One Responsibility', {
    x: margin,
    y: y - 26,
    size: 10,
    font: boldFont,
    color: goldAccent,
  });

  page.drawText(
    'Founder: Shobhnath Vishwakarma (25+ Yrs Master Experience) | Ph: 9967302911 / 7039821535',
    {
      x: margin,
      y: y - 40,
      size: 9,
      font,
      color: charcoal,
    }
  );

  page.drawText(
    'Workshop & Base: Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097 | amitvishwa1950@gmail.com',
    {
      x: margin,
      y: y - 52,
      size: 8.5,
      font,
      color: charcoal,
    }
  );

  // Divider Line
  page.drawLine({
    start: { x: margin, y: y - 62 },
    end: { x: width - margin, y: y - 62 },
    thickness: 2,
    color: woodBrown,
  });

  y -= 78;

  // 2. QUOTATION & CLIENT META BOX
  page.drawRectangle({
    x: margin,
    y: y - 75,
    width: width - margin * 2,
    height: 75,
    color: lightGray,
    borderColor: borderGray,
    borderWidth: 1,
  });

  // Left Column: Client Info
  page.drawText('QUOTATION TO:', {
    x: margin + 12,
    y: y - 16,
    size: 9,
    font: boldFont,
    color: goldAccent,
  });

  page.drawText(`Client: ${q.clientName || 'Valued Client'}`, {
    x: margin + 12,
    y: y - 30,
    size: 10,
    font: boldFont,
    color: charcoal,
  });

  page.drawText(`Phone: ${q.clientPhone || 'N/A'}`, {
    x: margin + 12,
    y: y - 44,
    size: 9,
    font,
    color: charcoal,
  });

  page.drawText(`Project: ${q.projectTitle || 'Interior Execution'}`, {
    x: margin + 12,
    y: y - 58,
    size: 9,
    font,
    color: charcoal,
  });

  // Right Column: Quote Number & Date
  const rightColX = width / 2 + 20;
  page.drawText('QUOTATION DETAILS:', {
    x: rightColX,
    y: y - 16,
    size: 9,
    font: boldFont,
    color: goldAccent,
  });

  page.drawText(`Quote #: ${q.quotationNumber}`, {
    x: rightColX,
    y: y - 30,
    size: 10,
    font: boldFont,
    color: charcoal,
  });

  page.drawText(`Date: ${new Date(q.createdAt).toLocaleDateString('en-IN')}`, {
    x: rightColX,
    y: y - 44,
    size: 9,
    font,
    color: charcoal,
  });

  page.drawText(
    `Valid Until: ${new Date(q.validUntil || Date.now()).toLocaleDateString('en-IN')} (30 Days)`,
    {
      x: rightColX,
      y: y - 58,
      size: 9,
      font,
      color: charcoal,
    }
  );

  y -= 95;

  // 3. TABLE OF LINE ITEMS
  const colX = {
    no: margin + 8,
    service: margin + 35,
    qty: width - margin - 210,
    rate: width - margin - 130,
    amount: width - margin - 60,
  };

  // Header background
  page.drawRectangle({
    x: margin,
    y: y - 22,
    width: width - margin * 2,
    height: 22,
    color: woodBrown,
  });

  page.drawText('#', { x: colX.no, y: y - 16, size: 9, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('SERVICE & ITEM DESCRIPTION', { x: colX.service, y: y - 16, size: 9, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('QTY / UNIT', { x: colX.qty, y: y - 16, size: 9, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('RATE (INR)', { x: colX.rate, y: y - 16, size: 9, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText('TOTAL (INR)', { x: colX.amount, y: y - 16, size: 9, font: boldFont, color: rgb(1, 1, 1) });

  y -= 24;

  // Render items
  const items = q.items || [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const rowHeight = 26;

    // Alternating row background
    if (i % 2 === 1) {
      page.drawRectangle({
        x: margin,
        y: y - rowHeight,
        width: width - margin * 2,
        height: rowHeight,
        color: rgb(0.98, 0.98, 0.96),
      });
    }

    page.drawText(String(i + 1), { x: colX.no, y: y - 16, size: 8.5, font, color: charcoal });

    // Item title & description
    const titleText = `${item.service}: ${item.description}`.slice(0, 48);
    page.drawText(titleText, { x: colX.service, y: y - 16, size: 8.5, font: boldFont, color: charcoal });

    page.drawText(`${item.quantity} ${item.unit}`, { x: colX.qty, y: y - 16, size: 8.5, font, color: charcoal });
    page.drawText(`Rs. ${Number(item.rate).toLocaleString('en-IN')}`, { x: colX.rate, y: y - 16, size: 8.5, font, color: charcoal });
    page.drawText(`Rs. ${Number(item.amount).toLocaleString('en-IN')}`, { x: colX.amount, y: y - 16, size: 8.5, font: boldFont, color: charcoal });

    page.drawLine({
      start: { x: margin, y: y - rowHeight },
      end: { x: width - margin, y: y - rowHeight },
      thickness: 0.5,
      color: borderGray,
    });

    y -= rowHeight;
  }

  y -= 15;

  // 4. TOTALS & CALCULATIONS (Right-aligned)
  const calcBoxX = width - margin - 220;
  const calcBoxW = 220;

  page.drawRectangle({
    x: calcBoxX,
    y: y - 85,
    width: calcBoxW,
    height: 85,
    color: lightGray,
    borderColor: borderGray,
    borderWidth: 1,
  });

  page.drawText(`Subtotal: Rs. ${Number(q.subtotal || 0).toLocaleString('en-IN')}`, {
    x: calcBoxX + 12,
    y: y - 18,
    size: 9,
    font,
    color: charcoal,
  });

  page.drawText(`Discount: Rs. ${Number(q.discount || 0).toLocaleString('en-IN')}`, {
    x: calcBoxX + 12,
    y: y - 34,
    size: 9,
    font,
    color: charcoal,
  });

  page.drawText(`GST (${q.gstPercentage || 0}%): Rs. ${Number(q.gstAmount || 0).toLocaleString('en-IN')}`, {
    x: calcBoxX + 12,
    y: y - 50,
    size: 9,
    font,
    color: charcoal,
  });

  page.drawText(`GRAND TOTAL: Rs. ${Number(q.totalAmount || 0).toLocaleString('en-IN')}`, {
    x: calcBoxX + 12,
    y: y - 72,
    size: 11,
    font: boldFont,
    color: woodBrown,
  });

  y -= 105;

  // 5. PAYMENT TERMS & 5-YEAR WARRANTY
  page.drawText('TERMS & PAYMENT STAGES:', {
    x: margin,
    y: y,
    size: 9,
    font: boldFont,
    color: goldAccent,
  });

  const terms = q.terms || [];
  let termY = y - 14;
  terms.slice(0, 4).forEach((t: string) => {
    page.drawText(`• ${t}`.slice(0, 85), {
      x: margin,
      y: termY,
      size: 8,
      font,
      color: charcoal,
    });
    termY -= 12;
  });

  // Warranty Box
  page.drawRectangle({
    x: margin,
    y: termY - 26,
    width: width - margin * 2,
    height: 24,
    color: rgb(0.93, 0.98, 0.93),
    borderColor: rgb(0.2, 0.6, 0.2),
    borderWidth: 0.8,
  });

  page.drawText(
    'GUARANTEE: 5-Year Workmanship Warranty on all carpentry, modular kitchen, and wardrobes.',
    {
      x: margin + 8,
      y: termY - 18,
      size: 8.5,
      font: boldFont,
      color: rgb(0.1, 0.45, 0.1),
    }
  );

  // 6. SIGNATURE BLOCK
  const sigY = margin + 50;
  page.drawLine({
    start: { x: width - margin - 180, y: sigY },
    end: { x: width - margin, y: sigY },
    thickness: 1,
    color: charcoal,
  });

  page.drawText('For OneStop Interiors', {
    x: width - margin - 180,
    y: sigY - 14,
    size: 9,
    font: boldFont,
    color: charcoal,
  });

  page.drawText('Shobhnath Vishwakarma (Authorized Signatory)', {
    x: width - margin - 180,
    y: sigY - 26,
    size: 8,
    font,
    color: charcoal,
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${q.quotationNumber}_OneStop_Interiors.pdf"`,
    },
  });
}

