import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'site_visit_scheduled'
  | 'quotation_sent'
  | 'won'
  | 'lost';

export interface ILeadNote {
  text: string;
  author: string;
  createdAt: Date;
}

export interface ILeadHistory {
  action: string;
  from?: string;
  to?: string;
  note?: string;
  createdAt: Date;
}

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  area: string;
  address?: string;
  message?: string;
  photoUrl?: string;
  source: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  status: LeadStatus;
  estimatedValue?: number;
  notes: ILeadNote[];
  assignedPartnerId?: mongoose.Types.ObjectId;
  followUpDate?: Date;
  history: ILeadHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    serviceType: { type: String, required: true, default: 'General Interior' },
    area: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    message: { type: String, trim: true },
    photoUrl: { type: String },
    source: { type: String, default: 'website_enquiry' },
    utmParams: {
      source: { type: String },
      medium: { type: String },
      campaign: { type: String },
      term: { type: String },
      content: { type: String },
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'site_visit_scheduled', 'quotation_sent', 'won', 'lost'],
      default: 'new',
    },
    estimatedValue: { type: Number, default: 0 },
    notes: [
      {
        text: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    assignedPartnerId: { type: Schema.Types.ObjectId, ref: 'Partner' },
    followUpDate: { type: Date },
    history: [
      {
        action: { type: String, required: true },
        from: { type: String },
        to: { type: String },
        note: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Indexes required by spec: status, createdAt, phone
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ phone: 1 });
LeadSchema.index({ serviceType: 1 });
LeadSchema.index({ status: 1, createdAt: -1 });

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;

