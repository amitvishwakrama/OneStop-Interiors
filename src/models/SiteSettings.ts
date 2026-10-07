import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  businessName: string;
  tagline: string;
  positioning: string;
  ownerName: string;
  ownerExperienceYears: number;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapEmbedUrl?: string;
  googleReviewUrl?: string;
  trustStrip: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
    warrantyYears: number;
  };
  workingHours: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'OneStop Interiors' },
    tagline: {
      type: String,
      default: 'Ghar ka poora interior aur repair, ek hi jagah, ek hi contractor se.',
    },
    positioning: {
      type: String,
      default: 'One-Stop Interior & Renovation Solution. One contractor, one quotation, one responsibility.',
    },
    ownerName: { type: String, default: 'Shobhnath Vishwakarma' },
    ownerExperienceYears: { type: Number, default: 25 },
    primaryPhone: { type: String, default: '9967302911' },
    secondaryPhone: { type: String, default: '7039821535' },
    whatsappNumber: { type: String, default: '9967302911' },
    email: { type: String, default: 'amitvishwa1950@gmail.com' },
    address: {
      type: String,
      default: 'Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097',
    },
    googleMapEmbedUrl: { type: String, default: '' },
    googleReviewUrl: { type: String, default: 'https://g.page/r/onestop-interiors/review' },
    trustStrip: {
      yearsExperience: { type: Number, default: 25 },
      projectsCompleted: { type: Number, default: 550 },
      happyClients: { type: Number, default: 480 },
      warrantyYears: { type: Number, default: 5 },
    },
    workingHours: { type: String, default: 'Mon - Sun: 8:00 AM - 9:00 PM' },
    instagramUrl: { type: String, default: 'https://instagram.com/onestopinteriors' },
    youtubeUrl: { type: String, default: 'https://youtube.com' },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;

