import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentMilestone {
  name: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate?: Date;
  paidDate?: Date;
}

export interface IPhotoUpdate {
  url: string;
  caption: string;
  date: Date;
}

export interface IProject extends Document {
  leadId?: mongoose.Types.ObjectId;
  title: string;
  clientName: string;
  clientPhone: string;
  serviceType: string;
  area: string;
  address?: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  totalBudget: number;
  advancePaid: number;
  paymentMilestones: IPaymentMilestone[];
  startDate: Date;
  expectedCompletionDate?: Date;
  actualCompletionDate?: Date;
  assignedPartners: { partnerId: mongoose.Types.ObjectId; trade: string }[];
  photoUpdates: IPhotoUpdate[];
  reviewRequested: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    serviceType: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String },
    status: {
      type: String,
      enum: ['planning', 'in_progress', 'completed', 'on_hold'],
      default: 'planning',
    },
    totalBudget: { type: Number, required: true, default: 0 },
    advancePaid: { type: Number, default: 0 },
    paymentMilestones: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
        dueDate: { type: Date },
        paidDate: { type: Date },
      },
    ],
    startDate: { type: Date, default: Date.now },
    expectedCompletionDate: { type: Date },
    actualCompletionDate: { type: Date },
    assignedPartners: [
      {
        partnerId: { type: Schema.Types.ObjectId, ref: 'Partner' },
        trade: { type: String },
      },
    ],
    photoUpdates: [
      {
        url: { type: String, required: true },
        caption: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    reviewRequested: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

ProjectSchema.index({ status: 1 });
ProjectSchema.index({ clientPhone: 1 });
ProjectSchema.index({ createdAt: -1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;

