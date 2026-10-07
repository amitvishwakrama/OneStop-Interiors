import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceArea extends Document {
  name: string;
  slug: string;
  region: string;
  isPrimary: boolean;
  landmarks: string[];
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceAreaSchema = new Schema<IServiceArea>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    region: { type: String, default: 'Mumbai Metropolitan Region' },
    isPrimary: { type: Boolean, default: false },
    landmarks: { type: [String], default: [] },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ServiceAreaSchema.index({ slug: 1 }, { unique: true });
ServiceAreaSchema.index({ order: 1 });

export const ServiceArea: Model<IServiceArea> =
  mongoose.models.ServiceArea ||
  mongoose.model<IServiceArea>('ServiceArea', ServiceAreaSchema);

export default ServiceArea;

