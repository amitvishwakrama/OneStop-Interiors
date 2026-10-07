import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuotationItem {
  service: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

export interface IQuotation extends Document {
  quotationNumber: string;
  leadId?: mongoose.Types.ObjectId;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientAddress: string;
  projectTitle: string;
  items: IQuotationItem[];
  subtotal: number;
  discount: number;
  gstPercentage: number;
  gstAmount: number;
  totalAmount: number;
  terms: string[];
  validityDays: number;
  validUntil: Date;
  warrantyText: string;
  notes?: string;
  pdfUrl?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const QuotationItemSchema = new Schema<IQuotationItem>(
  {
    service: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, default: 'sq.ft' },
    rate: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const QuotationSchema = new Schema<IQuotation>(
  {
    quotationNumber: { type: String, required: true, unique: true },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String },
    clientAddress: { type: String, default: '' },
    projectTitle: { type: String, required: true },
    items: [QuotationItemSchema],
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    gstPercentage: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, default: 0 },
    terms: {
      type: [String],
      default: [
        '50% Advance on project confirmation and material booking.',
        '40% Running payment during work execution at stage completion.',
        '10% Final payment upon handover and client satisfaction check.',
        'Rates include material, skilled labour, and contractor supervision.',
        'Quotation validity is 30 days from date of issue.',
      ],
    },
    validityDays: { type: Number, default: 30 },
    validUntil: { type: Date },
    warrantyText: {
      type: String,
      default:
        'OneStop Interiors provides a 5-year workmanship warranty on all modular furniture & carpentry, and 1-year service support on all related trades.',
    },
    notes: { type: String },
    pdfUrl: { type: String },
    status: {
      type: String,
      enum: ['draft', 'sent', 'accepted', 'rejected'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

QuotationSchema.index({ clientPhone: 1 });
QuotationSchema.index({ leadId: 1 });

export const Quotation: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>('Quotation', QuotationSchema);

export default Quotation;
