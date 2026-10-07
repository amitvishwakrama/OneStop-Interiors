import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  readTime: string;
  published: boolean;
  publishedAt: Date;
  seoTitle?: string;
  seoDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, default: 'Shobhnath Vishwakarma' },
    tags: { type: [String], default: [] },
    readTime: { type: String, default: '5 min read' },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String },
    seoDesc: { type: String },
  },
  { timestamps: true }
);

BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ published: 1, publishedAt: -1 });

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;

