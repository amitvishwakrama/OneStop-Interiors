# OneStop Interiors — Production Website & Lead CRM Platform

> **"Ghar ka poora interior aur repair, ek hi jagah, ek hi contractor se."**  
> *One Contractor • One Quotation • One Responsibility*  
> Founded by **Shobhnath Vishwakarma** (25+ Years Experience) | Malad East, Mumbai

---

## 1. Executive Summary & Brand Positioning

**OneStop Interiors** is a complete, production-ready website and lead-management CRM engineered specifically for an Indian carpenter-contractor business based in **Kurar Village, Malad East, Mumbai**, serving all areas across **Mumbai, Thane, Mulund, Palghar, and the Mumbai Metropolitan Region (MMR)**.

### Core Value Proposition:
- **Direct Master Craftsman Execution**: Led by Shobhnath Vishwakarma with 25+ years of master wood joinery and structural carpentry lineage.
- **Single Contractor Responsibility**: Homeowners and commercial clients deal with only one accountable contractor instead of coordinating separate electricians, plumbers, painters, false ceiling workers, and tile masons.
- **Factory-Direct Workshop Pricing**: Fabricated directly at our Malad East facility, eliminating showroom commissions and middleman fees.
- **Guaranteed Durability**: 100% genuine IS:710 Marine Grade waterproof plywood, brand hardware (Hettich, Hafele, Blum), and up to 10 years of warranty.

---

## 2. Technical Stack & Architecture

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS with custom wood-and-gold design system (`wood-800`, `gold-500`, `cream-50`, `charcoal-900`)
- **Database**: MongoDB Atlas / Local MongoDB via Mongoose ODM (cached connection helper in `src/lib/mongodb.ts` for Vercel serverless)
- **Authentication**: NextAuth.js (Credentials Provider + `bcryptjs` password hashing, httpOnly session cookies, protected admin middleware)
- **PDF Engine**: `pdf-lib` for generating branded PDF quotations with company header, client BOQ, terms, warranty card, and digital signature
- **Language Localization**: Bilingual engine supporting instant English & Hindi toggling across all public pages
- **Analytics & Tracking**: Unified tracking helper (`src/lib/analytics.ts`) supporting Google Analytics 4, Google Tag Manager, and Meta Pixel
- **SEO & Structured Data**: Dynamic `sitemap.xml`, `robots.txt`, and rich JSON-LD schemas (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`)
- **Browser Automation & Quality Assurance**: `puppeteer-core` with Microsoft Edge for automated end-to-end regression testing and screenshot validation

---

## 3. Database Schema Architecture

The platform includes 12 production Mongoose models in `src/models/`:

1. **`AdminUser`**: Secure administrator accounts with bcrypt password hashes, roles, and timestamps.
2. **`Lead`**: Incoming client inquiries with 10-digit phone verification, status pipeline (`new`, `contacted`, `site_visit_scheduled`, `quote_sent`, `won`, `lost`), estimated value, notes, follow-up dates, assigned partners, and UTM source tracking.
3. **`Quotation`**: Itemized BOQ quotations with line items (service, description, qty, unit, rate, amount), discount, GST calculations, validity, terms, and PDF download links.
4. **`Partner`**: Verified trade directory (electricians, plumbers, painters, POP false ceiling workers, tile masons) with ratings, contact numbers, and service areas.
5. **`Project`**: Light project manager tracking won leads with start dates, target completion, status milestones, and payment schedules (advance, running, final).
6. **`PortfolioItem`**: Project case studies with before/after comparison images, category filters, location, duration, and video embeds.
7. **`Service`**: 11 interior trade definitions with scopes, included items, step-by-step process, pricing rates, and FAQs.
8. **`Testimonial`**: Real client reviews with ratings, project tags, and client photos.
9. **`BlogPost`**: DB-driven articles optimized for local interior search intent.
10. **`FAQ`**: Global frequently asked questions.
11. **`EstimatorRate`**: Live unit rates (Basic, Standard, Premium) used by the Mumbai Interior Cost Estimator.
12. **`ServiceArea`**: Target MMR locations (Thane, Mulund, Malad East, Kandivali, Andheri, Palghar, etc.).

---

## 4. Key Platform Features

### 🌟 Public Website
- **Hero Section**: Strong headline, trust badges (25+ yrs experience, 850+ projects, 10-yr warranty), and high-contrast CTAs ("Get Free Quotation" & "Chat on WhatsApp").
- **Services Showcase**: Detailed coverage for all 11 trades:
  1. Carpentry & Custom Furniture
  2. Modular Kitchen (Marine Ply + Acrylic / PU)
  3. Modular Wardrobes & Storage
  4. False Ceiling & POP Design
  5. Interior & Exterior Painting (Asian Paints Royale)
  6. Electrical Work & Concealed Wiring
  7. Plumbing & Sanitary Solutions
  8. Tiles, Marble & Italian Floor Polishing
  9. Full Home Turnkey Interior (1BHK, 2BHK, 3BHK)
  10. Office, Shop & Commercial Fit-outs
  11. Civil Repair & Society Demolition
- **Interactive Mumbai Cost Estimator**: Users pick trade, slider area (sq.ft / r.ft), and material quality tier (Basic, Standard, Luxury) to get instant price ranges and request a WhatsApp quote.
- **Before/After Interactive Slider**: Visual proof of bare-shell to finished luxury interiors.
- **Local SEO Landing Pages**: Dynamic `[service]/[area]` routes (e.g., `/services/modular-kitchen/thane`) with localized copy, landmarks, turnaround times, and FAQs.
- **Lead Generation Hooks**:
  - Sticky mobile bottom bar ("Call Now", "WhatsApp", "Get Quote")
  - Floating WhatsApp chat with pre-filled context messages
  - 10-digit Indian phone validation (`^[6-9]\d{9}$`)
  - Honeypot anti-spam protection
  - Instant WhatsApp click-to-chat link for the contractor to respond in 1 click
  - Exit-intent modal offering free laser measurement and quote

### 🛡️ Admin CRM Portal (`/admin`)
- **Dashboard**: Metrics for leads today, weekly/monthly volume, total inquiries, pipeline potential value (INR), and visual conversion funnel.
- **Lead Pipeline CRM**: Filter by status, search by phone/name, add internal notes, assign trade partners, update estimated project value, and export to CSV.
- **Quotation Generator**: Itemized BOQ builder, automatic subtotal/discount/GST computation, and instant branded PDF generation.
- **Trade Partner Directory**: Fast directory of vetted sub-trades with direct call and WhatsApp shortcuts.
- **Project Manager**: Track won projects with milestone stages and payment tracking.
- **Content & Rates Manager**: Edit estimator rates, service areas, and business details without code changes.

---

## 5. Environment Variables & Setup

Create a `.env.local` file based on `.env.example`:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/onestop_interiors
# For MongoDB Atlas (Production):
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/onestop_interiors?retryWrites=true&w=majority

# NextAuth Authentication
NEXTAUTH_SECRET=onestop-interiors-super-secret-key-32-chars-min
NEXTAUTH_URL=http://localhost:3000

# Initial Admin Credentials (Seeded)
ADMIN_EMAIL=amitvishwa1950@gmail.com
ADMIN_PASSWORD=Admin@OneStop2026
ADMIN_NAME=Shobhnath Vishwakarma

# Cloudinary (Optional media uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email Notifications (Optional Resend)
RESEND_API_KEY=
OWNER_NOTIFICATION_EMAIL=amitvishwa1950@gmail.com

# Analytics & Marketing Pixels
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PRIMARY_PHONE=9967302911
NEXT_PUBLIC_SECONDARY_PHONE=7039821535
NEXT_PUBLIC_WHATSAPP_NUMBER=919967302911
NEXT_PUBLIC_BUSINESS_ADDRESS=Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097
```

---

## 6. Local Development & Seeding

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database
Seeds 11 services, 6 portfolio items, 8 testimonials, 5 estimator rates, 5 MMR areas, FAQs, partners, and the default admin user:
```bash
npm run seed
node scripts/seed-blog.mjs
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `amitvishwa1950@gmail.com`
- **Password**: `Admin@OneStop2026`

---

## 7. Production Build & Deployment to Vercel

### Testing Production Build Locally
```bash
npm run build
npm start
```
The application compiles cleanly into 42 static & dynamic routes with only 87.3 kB shared client JavaScript.

### Vercel Deployment Steps:
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Under **Environment Variables**, paste the production variables from `.env.example`:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `NEXTAUTH_SECRET`: A secure 32+ character random secret string (e.g. `openssl rand -base64 32`).
   - `NEXTAUTH_URL`: Your production domain (e.g. `https://onestopinteriors.in`).
   - `NEXT_PUBLIC_SITE_URL`: `https://onestopinteriors.in`.
   - Contact numbers and address.
4. Click **Deploy**. Vercel will build and launch the application on its global Edge CDN.
5. In MongoDB Atlas, allow access from anywhere (`0.0.0.0/0`) under Network Access so Vercel serverless lambdas can query the cluster.

---

## 8. Verification Artifacts & Screenshots

Automated in-browser Edge tests verified every stage of development. The generated artifacts are located in the project's brain directory:

| Screenshot / Artifact | Description |
|---|---|
| `phase1-admin-login.png` | Admin authentication portal with branded security credentials |
| `phase1-admin-authenticated.png` | Authenticated session redirecting into the CRM |
| `phase2-desktop-home.png` | Full desktop home page with wood & gold palette, trust strip, and services |
| `phase2-mobile-home.png` | Mobile viewport with sticky bottom bar ("Call Now", "WhatsApp", "Get Quote") |
| `phase2-lead-submitted.png` | Real lead submission with 10-digit Indian validation and instant WhatsApp URL |
| `phase3-admin-dashboard.png` | Live CRM dashboard with lead counts, pipeline value, and funnel |
| `phase3-admin-leads.png` | Lead CRM table with status filters, search, CSV export, and quick dial |
| `phase3-admin-quotation.png` | Itemized BOQ quotation generator with GST and terms |
| `phase3-admin-partners.png` | Trade partner directory (electricians, painters, plumbers, POP, tile workers) |
| `OSI-2026-0001_Quotation.pdf` | Generated branded PDF quotation document ready for WhatsApp / email |
| `phase4-local-seo-thane.png` | Local SEO landing page (`/services/modular-kitchen/thane`) with schema & FAQs |
| `phase5-cost-estimator.png` | Interactive Mumbai Interior Cost Estimator with live calculation slider |
| `phase5-service-page.png` | Dynamic Service detail page with inclusions, pricing, and warranty |
| `phase5-portfolio-page.png` | Dynamic Portfolio case study with before/after slider and specifications |
| `phase5-about-page.png` | About page detailing Shobhnathji's 25+ year Vishwakarma craftsmanship lineage |
| `phase5-mobile-viewport.png` | Emulated mobile viewport on Android/iPhone screen size |

---

## 9. Business Contact & Workshop

- **Proprietor**: Shobhnath Vishwakarma
- **Primary Line**: +91-9967302911
- **Secondary Line**: +91-7039821535
- **Official Email**: amitvishwa1950@gmail.com
- **Workshop & Office**: Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097
- **Operating Hours**: Monday to Sunday: 8:00 AM – 9:00 PM

