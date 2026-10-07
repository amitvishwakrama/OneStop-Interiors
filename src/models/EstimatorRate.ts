import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEstimatorRate extends Document {
  serviceType: string;
  serviceName: string;
  unit: string;
  basicRate: number;
  basicLabel: string;
  basicFeatures: string[];
  standardRate: number;
  standardLabel: string;
  standardFeatures: string[];
  premiumRate: number;
  premiumLabel: string;
  premiumFeatures: string[];
  minArea: number;
  defaultArea: number;
  description: string;
  disclaimer: string;
  createdAt: Date;
  updatedAt: Date;
}

const EstimatorRateSchema = new Schema<IEstimatorRate>(
  {
    serviceType: { type: String, required: true, unique: true, trim: true },
    serviceName: { type: String, required: true },
    unit: { type: String, default: 'sq.ft' },
    basicRate: { type: Number, required: true },
    basicLabel: { type: String, default: 'Basic (Commercial Ply + 0.8mm Laminate)' },
    basicFeatures: { type: [String], default: [] },
    standardRate: { type: Number, required: true },
    standardLabel: { type: String, default: 'Standard (BWP/BWR Marine Ply + 1mm Laminate)' },
    standardFeatures: { type: [String], default: [] },
    premiumRate: { type: Number, required: true },
    premiumLabel: { type: String, default: 'Premium (HDHMR/Boiling Water Marine + Acrylic/PU)' },
    premiumFeatures: { type: [String], default: [] },
    minArea: { type: Number, default: 50 },
    defaultArea: { type: Number, default: 200 },
    description: { type: String, default: '' },
    disclaimer: {
      type: String,
      default:
        'Estimates are indicative for Mumbai/Thane region and include branded materials and master carpenter workmanship. Exact quotation provided after free site inspection.',
    },
  },
  { timestamps: true }
);

export const EstimatorRate: Model<IEstimatorRate> =
  mongoose.models.EstimatorRate ||
  mongoose.model<IEstimatorRate>('EstimatorRate', EstimatorRateSchema);

export default EstimatorRate;
