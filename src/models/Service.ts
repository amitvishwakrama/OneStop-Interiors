import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IService extends Document {
  name: string;
  slug: string;
  icon: string;
  shortDesc: string;
  heroImage: string;
  intro: string;
  includedItems: string[];
  processSteps: IServiceProcessStep[];
  faqs: IServiceFAQ[];
  startingPrice: string;
  unit: string;
  seoTitle: string;
  seoDesc: string;
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: { type: String, required: true },
    shortDesc: { type: String, required: true },
    heroImage: { type: String, required: true },
    intro: { type: String, required: true },
    includedItems: { type: [String], default: [] },
    processSteps: [
      {
        step: { type: Number, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    startingPrice: { type: String, default: 'On Inspection' },
    unit: { type: String, default: 'sq.ft' },
    seoTitle: { type: String },
    seoDesc: { type: String },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 }, { unique: true });
ServiceSchema.index({ order: 1 });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;

