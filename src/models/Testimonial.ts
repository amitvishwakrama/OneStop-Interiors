import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  projectTitle: string;
  location: string;
  rating: number;
  reviewText: string;
  photoUrl?: string;
  verified: boolean;
  googleReview: boolean;
  featured: boolean;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    projectTitle: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    reviewText: { type: String, required: true },
    photoUrl: { type: String },
    verified: { type: Boolean, default: true },
    googleReview: { type: Boolean, default: true },
    featured: { type: Boolean, default: true },
    date: { type: String, default: 'Recent Client' },
  },
  { timestamps: true }
);

TestimonialSchema.index({ featured: 1 });
TestimonialSchema.index({ rating: -1 });

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;

