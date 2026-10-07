import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

function getMongoUri() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.startsWith('MONGODB_URI=')) {
        return line.substring('MONGODB_URI='.length).trim();
      }
    }
  }
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/onestop_interiors';
}

const MONGODB_URI = getMongoUri();

async function seedBlog() {
  await mongoose.connect(MONGODB_URI);
  const { Schema } = mongoose;

  const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', new Schema({
    title: String, slug: { type: String, unique: true }, excerpt: String, content: String,
    coverImage: String, author: String, tags: [String], readTime: String, published: Boolean,
    publishedAt: Date, seoTitle: String, seoDesc: String
  }, { timestamps: true }));

  await BlogPost.deleteMany({});

  const articles = [
    {
      title: 'Modular Kitchen Cost in Mumbai (2026 Price & Material Guide)',
      slug: 'modular-kitchen-cost-mumbai-guide',
      excerpt: 'Everything you need to know about calculating modular kitchen costs in Mumbai, L-shape vs parallel setups, acrylic vs PU shutters, and marine plywood grades.',
      content: `## How Much Does a Modular Kitchen Cost in Mumbai?

If you are planning to renovate or build a new modular kitchen in Mumbai, Thane, or nearby suburbs, budget estimation is often confusing. Quotations from large retail brands often seem inflated, while quotes from roadside carpenters lack clarity on hardware and warranty.

In Mumbai's high-humidity coastal climate, your kitchen must resist moisture, grease, cockroaches, and daily rigorous Indian cooking.

### Typical Price Ranges in Mumbai (2026):
1. **Basic Modular Kitchen (MR Plywood + Matt Laminate):** ₹1,40,000 - ₹1,90,000
2. **Standard Modular Kitchen (IS:710 BWP Marine Ply + 1mm Merino Laminate + Soft-close Tandem):** ₹2,00,000 - ₹2,90,000
3. **Luxury Modular Kitchen (Action TESA HDHMR / Marine Ply + Acrylic / PU Gloss + Blum Hardware):** ₹3,20,000 - ₹4,80,000+

### Key Material Recommendations from Shobhnath Vishwakarma:
- **Never use Particle Board (MDF) near sink areas**: Mumbai water quickly causes standard MDF to swell and warp within months.
- **Always specify IS:710 Marine Grade Plywood** for all carcass boxes beneath the sink and countertop.
- **Invest in branded soft-close tandem drawers** (Hettich, Hafele, or Ebco) rated for at least 45kg loads.

Call OneStop Interiors at 9967302911 for a free on-site kitchen measurement and transparent BOQ estimate.`,
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      author: 'Shobhnath Vishwakarma',
      tags: ['Modular Kitchen', 'Interior Cost', 'Mumbai Renovation'],
      readTime: '6 min read',
      published: true,
      publishedAt: new Date(),
      seoTitle: 'Modular Kitchen Cost in Mumbai (2026 Guide) | OneStop Interiors',
      seoDesc: 'Accurate breakdown of modular kitchen costs in Mumbai. Rates per sq.ft, acrylic vs laminate, BWP marine plywood guide by master contractor.',
    },
    {
      title: 'Marine Plywood vs Commercial Plywood: Why IS:710 Matters for Mumbai Humidity',
      slug: 'marine-plywood-vs-commercial-plywood-mumbai',
      excerpt: 'Learn the critical differences between MR (Commercial) and BWP (Boiling Water Proof) 710 marine plywood to protect your furniture from dampness and termites.',
      content: `## Why Plywood Selection Defines Your Furniture Life in Mumbai

Mumbai's unique coastal weather—characterised by extreme monsoon moisture and saline air—is the ultimate test for wooden furniture. Every year, thousands of homeowners face peeling laminates, bent wardrobe doors, and fungus inside kitchen cabinets.

### What is Commercial MR Plywood?
MR stands for Moisture Resistant. While it resists mild airborne humidity, it is bonded with urea-formaldehyde synthetic resin. If exposed to standing water from a plumbing pipe leak or wall seepage, it de-laminates within days.

### What is IS:710 BWP Marine Plywood?
BWP stands for Boiling Water Proof. It uses phenolic resins and passes rigorous 72-hour boiling water immersion tests without separation. It is also pressure-treated with anti-termite and borer chemical cocktails.

### Our Expert Rule of Thumb for Mumbai Flats:
- **Kitchen Under-Sink & Counter:** 100% IS:710 Marine Plywood mandatory.
- **Bathroom Vanity & Balcony Cabinets:** 100% IS:710 Marine Plywood mandatory.
- **Bedroom Wardrobes & Bed Storage:** High-grade MR plywood or Marine Ply for maximum peace of mind.

At OneStop Interiors, we verify all plywood sheets on-site in front of our clients before cutting.`,
      coverImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
      author: 'Shobhnath Vishwakarma',
      tags: ['Plywood Guide', 'Carpentry', 'Mumbai Homes'],
      readTime: '5 min read',
      published: true,
      publishedAt: new Date(),
      seoTitle: 'Marine Ply vs Commercial Plywood in Mumbai | OneStop Interiors',
      seoDesc: 'BWP 710 marine plywood vs commercial ply for Mumbai homes. Avoid water damage, dampness, and termites in your interior furniture.',
    },
    {
      title: 'Full 2BHK Interior Timeline and Execution Checklist',
      slug: 'full-2bhk-interior-timeline-checklist-mumbai',
      excerpt: 'A realistic week-by-week timeline for completing full 2BHK flat interiors in Mumbai without delays or unexpected budget blowouts.',
      content: `## How Long Does a 2BHK Interior Really Take in Mumbai?

When you buy a new flat or renovate an existing home in Mumbai or Thane, you need to plan your move-in date, rent lease termination, or society renovation permission windows accurately.

A realistic turnkey timeline with OneStop Interiors is **35 to 45 working days**. Here is our exact step-by-step breakdown:

### Week 1: Approvals, Dismantling & Civil Chasing
- Society NOC and security deposit submission
- Controlled demolition of old tile/fixtures
- Concealed electrical conduit wall chasing and CPVC plumbing lines

### Week 2: Gypsum False Ceiling & Workshop Framing
- GI channel grid installation and Gyproc gypsum board fixing
- Workshop fabrication of modular kitchen carcasses and wardrobe boxes

### Week 3: On-Site Carpentry & Tile Laying
- Fitting modular carcasses, drawer tandem channels, and bed frames
- Bathroom tile laying and Italian marble diamond polish

### Week 4: Putty, Sanding & Laminate Pressing
- 2 coats Birla White putty and motorized sanding
- Shutter laminate pressing and edge-banding

### Week 5: Painting, Fixture Mounting & Deep Cleaning
- 2 coats Asian Paints Royale luxury emulsion
- Switchboard dressing, diverters, lighting, and deep vacuum cleaning
- Handover with 5-year warranty card!`,
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      author: 'Shobhnath Vishwakarma',
      tags: ['Turnkey Interior', '2BHK Timeline', 'Checklist'],
      readTime: '7 min read',
      published: true,
      publishedAt: new Date(),
      seoTitle: '2BHK Interior Timeline & Checklist Mumbai | OneStop Interiors',
      seoDesc: 'Realistic 40-day timeline for full 2BHK interior work in Mumbai. Week-by-week breakdown for civil, carpentry, electrical, and painting.',
    },
  ];

  await BlogPost.insertMany(articles);
  console.log(`✓ Inserted ${articles.length} starter SEO blog articles.`);
  await mongoose.disconnect();
}

seedBlog().catch(console.error);

