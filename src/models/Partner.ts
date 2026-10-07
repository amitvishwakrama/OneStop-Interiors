import mongoose, { Schema, Document, Model } from 'mongoose';

export type PartnerTrade =
  | 'carpenter'
  | 'electrician'
  | 'plumber'
  | 'painter'
  | 'tiles_flooring'
  | 'pop_false_ceiling'
  | 'civil'
  | 'fabrication'
  | 'glass_aluminium'
  | 'modular_fittings'
  | 'other';

export interface IPartner extends Document {
  name: string;
  trade: PartnerTrade;
  phone: string;
  alternatePhone?: string;
  rating: number;
  serviceAreas: string[];
  availability: 'available' | 'busy' | 'unavailable';
  dailyRate?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    trade: {
      type: String,
      required: true,
      enum: [
        'carpenter',
        'electrician',
        'plumber',
        'painter',
        'tiles_flooring',
        'pop_false_ceiling',
        'civil',
        'fabrication',
        'glass_aluminium',
        'modular_fittings',
        'other',
      ],
    },
    phone: { type: String, required: true, trim: true },
    alternatePhone: { type: String, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    serviceAreas: { type: [String], default: ['Mumbai', 'Thane', 'Mulund'] },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    dailyRate: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

PartnerSchema.index({ trade: 1 });
PartnerSchema.index({ phone: 1 });

export const Partner: Model<IPartner> =
  mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

export default Partner;

