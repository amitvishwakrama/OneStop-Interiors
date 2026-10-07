import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPortfolioItem extends Document {
  title: string;
  slug: string;
  category: string;
  type: 'residential' | 'commercial';
  location: string;
  areaSqFt: number;
  duration: string;
  coverImage: string;
  galleryImages: string[];
  beforeAfterImages?: {
    before: string;
    after: string;
    description?: string;
  };
  videoUrl?: string;
  description: string;
  clientFeedback?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioItemSchema = new Schema<IPortfolioItem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['residential', 'commercial'], required: true, default: 'residential' },
    location: { type: String, required: true },
    areaSqFt: { type: Number, required: true },
    duration: { type: String, required: true },
    coverImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    beforeAfterImages: {
      before: { type: String },
      after: { type: String },
      description: { type: String },
    },
    videoUrl: { type: String },
    description: { type: String, required: true },
    clientFeedback: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PortfolioItemSchema.index({ slug: 1 }, { unique: true });
PortfolioItemSchema.index({ category: 1 });
PortfolioItemSchema.index({ type: 1 });
PortfolioItemSchema.index({ featured: 1 });

export const PortfolioItem: Model<IPortfolioItem> =
  mongoose.models.PortfolioItem || mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);

export default PortfolioItem;

