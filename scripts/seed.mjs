import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

async function seed() {
  console.log('--- OneStop Interiors Database Seeder ---');
  let memoryServer = null;

  try {
    console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 4000 });
    console.log('Connected to direct MongoDB instance.');
  } catch (err) {
    console.log('Direct connection failed. Launching MongoMemoryServer for seeding demonstration...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    await mongoose.connect(uri);
    console.log(`Connected to MongoMemoryServer at ${uri}`);
  }

  const { Schema } = mongoose;

  // Define minimal inline models for the seeder
  const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', new Schema({
    name: String, email: { type: String, unique: true }, passwordHash: String, role: String
  }, { timestamps: true }));

  const Service = mongoose.models.Service || mongoose.model('Service', new Schema({
    name: String, slug: { type: String, unique: true }, icon: String, shortDesc: String,
    heroImage: String, intro: String, includedItems: [String],
    processSteps: [{ step: Number, title: String, desc: String }],
    faqs: [{ question: String, answer: String }], startingPrice: String, unit: String,
    seoTitle: String, seoDesc: String, order: Number, featured: Boolean
  }, { timestamps: true }));

  const PortfolioItem = mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', new Schema({
    title: String, slug: { type: String, unique: true }, category: String, type: String,
    location: String, areaSqFt: Number, duration: String, coverImage: String,
    galleryImages: [String], beforeAfterImages: { before: String, after: String, description: String },
    videoUrl: String, description: String, clientFeedback: String, featured: Boolean, order: Number
  }, { timestamps: true }));

  const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', new Schema({
    clientName: String, projectTitle: String, location: String, rating: Number,
    reviewText: String, photoUrl: String, verified: Boolean, googleReview: Boolean,
    featured: Boolean, date: String
  }, { timestamps: true }));

  const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', new Schema({
    question: String, answer: String, category: String, order: Number, featured: Boolean
  }, { timestamps: true }));

  const EstimatorRate = mongoose.models.EstimatorRate || mongoose.model('EstimatorRate', new Schema({
    serviceType: { type: String, unique: true }, serviceName: String, unit: String,
    basicRate: Number, basicLabel: String, basicFeatures: [String],
    standardRate: Number, standardLabel: String, standardFeatures: [String],
    premiumRate: Number, premiumLabel: String, premiumFeatures: [String],
    minArea: Number, defaultArea: Number, description: String, disclaimer: String
  }, { timestamps: true }));

  const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', new Schema({
    businessName: String, tagline: String, positioning: String, ownerName: String,
    ownerExperienceYears: Number, primaryPhone: String, secondaryPhone: String,
    whatsappNumber: String, email: String, address: String, googleMapEmbedUrl: String,
    googleReviewUrl: String, trustStrip: { yearsExperience: Number, projectsCompleted: Number, happyClients: Number, warrantyYears: Number },
    workingHours: String, instagramUrl: String, youtubeUrl: String
  }, { timestamps: true }));

  const ServiceArea = mongoose.models.ServiceArea || mongoose.model('ServiceArea', new Schema({
    name: String, slug: { type: String, unique: true }, region: String, isPrimary: Boolean,
    landmarks: [String], description: String, order: Number
  }, { timestamps: true }));

  const Partner = mongoose.models.Partner || mongoose.model('Partner', new Schema({
    name: String, trade: String, phone: String, rating: Number, serviceAreas: [String],
    availability: String, dailyRate: Number, notes: String
  }, { timestamps: true }));

  const Lead = mongoose.models.Lead || mongoose.model('Lead', new Schema({
    name: String, phone: String, email: String, serviceType: String, area: String,
    message: String, source: String, status: String, estimatedValue: Number,
    notes: [{ text: String, author: String, createdAt: Date }],
    history: [{ action: String, from: String, to: String, note: String, createdAt: Date }]
  }, { timestamps: true }));

  // 1. Seed Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || 'amitvishwa1950@gmail.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@OneStop2026';
  const adminName = process.env.ADMIN_NAME || 'Shobhnath Vishwakarma';

  await AdminUser.deleteMany({});
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await AdminUser.create({
    name: adminName,
    email: adminEmail,
    passwordHash,
    role: 'superadmin',
  });
  console.log(`✓ Admin user created: ${adminEmail} (Password: ${adminPassword})`);

  // 2. Seed Services
  await Service.deleteMany({});
  const services = [
    {
      name: 'Carpentry & Custom Furniture',
      slug: 'carpentry-furniture',
      icon: 'Hammer',
      shortDesc: 'Solid wood & ply master carpentry, custom sofa frames, temple mandir, beds & dining tables.',
      heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      intro: 'With over 25 years of master carpentry lineage, Shobhnath Vishwakarma and team craft bespoke, heavy-duty wooden furniture built to last decades in Mumbai’s coastal climate.',
      includedItems: [
        'Custom Hydraulic & Storage Beds',
        'Handcrafted Teakwood Temples (Pooja Mandir)',
        'Designer TV Units & Console Tables',
        'Dining Tables & Custom Cushioned Chairs',
        'Door & Window Frame Fitting with Premium Hardware',
        'Laminate & Veneer Pressing with German Adhesives',
      ],
      processSteps: [
        { step: 1, title: 'Measurement & Consultation', desc: 'Free site visit to inspect room layout and wood preferences.' },
        { step: 2, title: 'Design & 2D/3D Drafting', desc: 'Custom blueprints and storage optimization plan.' },
        { step: 3, title: 'Precision Fabrication', desc: 'Calibrated BWP Marine Ply cutting and joinery in our workshop.' },
        { step: 4, title: 'Finishing & On-site Installation', desc: 'Veneer polishing, laminate pressing, and heavy-duty fittings.' },
      ],
      faqs: [
        { question: 'Which wood or plywood is best for Mumbai flats?', answer: 'We recommend Century / Greenply 710 Boiling Water Proof (BWP) Marine Plywood to withstand humidity without warping.' },
        { question: 'Can you match custom Pinterest / Instagram furniture designs?', answer: 'Yes! Over 80% of our carpentry is bespoke matching exact client reference photos with perfect proportions.' },
      ],
      startingPrice: '₹1,250',
      unit: 'sq.ft',
      seoTitle: 'Carpenter Contractor in Mumbai & Thane | Custom Furniture',
      seoDesc: 'Master carpenter contractor in Mumbai, Thane, Mulund & Palghar. Bespoke furniture, beds, TV units, mandirs with 25+ years experience.',
      order: 1,
      featured: true,
    },
    {
      name: 'Modular Kitchen',
      slug: 'modular-kitchen',
      icon: 'UtensilsCrossed',
      shortDesc: 'Termite-proof, boiling waterproof L-shape, U-shape & parallel kitchens with soft-close tandem drawers.',
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      intro: 'Heavy-duty modular kitchens engineered for Indian cooking with high heat and oil resistance. Featuring marine-grade plywood and German hardware (Hettich / Hafele / Blum).',
      includedItems: [
        'Waterproof 710 Grade Marine Ply or HDHMR Carcasses',
        'Acrylic, PU Lacquered, or High-Gloss Laminate Shutters',
        'Soft-Close Tandem Boxes and Corner Carousels',
        'Quartz / Granite Countertop and Dado Tile Fitting',
        'Chimney, Hob & Built-in Oven Cabinetry',
        '10-Year Hardware & Workmanship Guarantee',
      ],
      processSteps: [
        { step: 1, title: 'Kitchen Audit & Layout Plan', desc: 'Ergonomic work-triangle measurement and plumbing points inspection.' },
        { step: 2, title: 'Material & Shutter Selection', desc: 'Physical swatch selection: Acrylic, PU, Merino Laminate, Blum fittings.' },
        { step: 3, title: 'Factory Machine Edge-Banding', desc: 'Laser-finish edge banding preventing water seepage.' },
        { step: 4, title: 'Rapid 3-Day Installation', desc: 'Modular assembly on site with zero disruption.' },
      ],
      faqs: [
        { question: 'How much does a modular kitchen cost in Mumbai?', answer: 'Standard 8x8 ft kitchen starts around ₹1.2 Lakhs to ₹2.5 Lakhs depending on shutter finishes and tandem drawer brands.' },
        { question: 'Do you arrange chimney ducting and electrical points?', answer: 'Yes, as a complete one-stop contractor, our electricians and plumbers handle all duct core-cutting and pipe routing under our supervision.' },
      ],
      startingPrice: '₹1,750',
      unit: 'sq.ft',
      seoTitle: 'Modular Kitchen Contractor Mumbai & Thane | Best Price',
      seoDesc: 'Custom modular kitchens in Mumbai, Thane & Mulund. Termite-proof marine ply, acrylic shutters, Hettich fittings with 10-year warranty.',
      order: 2,
      featured: true,
    },
    {
      name: 'Modular Wardrobes & Storage',
      slug: 'modular-wardrobes',
      icon: 'DoorClosed',
      shortDesc: 'Floor-to-ceiling sliding & hinged wardrobes with loft storage, dresser mirrors & integrated LED profiles.',
      heroImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      intro: 'Smart storage designs maximizing every inch of Mumbai bedroom spaces. Choose from sliding floor-to-ceiling shutters, tinted glass wardrobes, or classic hinged doors.',
      includedItems: [
        'Heavy-duty floor-to-ceiling aluminum slider tracks',
        'Concealed drawer locks and jewelry organizers',
        'Profile sensor LED internal lighting',
        'Full loft cabinetry to eliminate dust traps',
        'Soft-close hydraulic hinges with 10-year warranty',
      ],
      processSteps: [
        { step: 1, title: 'Space Measurement', desc: 'Check ceiling height, beam drops, and door clearances.' },
        { step: 2, title: 'Internal Layout Drafting', desc: 'Tailor hanging rods, trouser pullouts, and locker compartments.' },
        { step: 3, title: 'Workshop Construction', desc: 'Calibrated carcass manufacturing.' },
        { step: 4, title: 'Site Fitting & Polishing', desc: 'Smooth track alignment and edge perfection.' },
      ],
      faqs: [
        { question: 'Sliding vs Openable wardrobe: which is better for Mumbai apartments?', answer: 'Sliding wardrobes save crucial walking aisle space in compact bedrooms, while hinged doors allow 100% opening view simultaneously.' },
      ],
      startingPrice: '₹1,450',
      unit: 'sq.ft',
      seoTitle: 'Modular Wardrobe Contractor in Mumbai & Thane',
      seoDesc: 'Custom sliding and hinged wardrobes in Mumbai, Malad, Thane & Mulund. Floor-to-ceiling storage with 5-year warranty.',
      order: 3,
      featured: true,
    },
    {
      name: 'False Ceiling & POP Design',
      slug: 'false-ceiling-pop',
      icon: 'LampCeiling',
      shortDesc: 'Gyproc plasterboard false ceilings, cove ambient lighting, POP molding & acoustic insulation.',
      heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      intro: 'Modern Gypsum ceilings with hidden warm cove LED channels and architectural POP details that transform your living room ambiance and reduce room heat.',
      includedItems: [
        'Saint-Gobain Gyproc Gypsum Sheet Fitting',
        'Heavy-gauge GI framing and rust-resistant suspensions',
        'Warm white / RGB concealed cove lighting recesses',
        'POP cornices, beadings, and CNC jali inserts',
        'Crack-resistant fiber tape & joint compound finish',
      ],
      processSteps: [
        { step: 1, title: 'Level Marking', desc: 'Laser leveling to ensure 100% flat ceiling lines.' },
        { step: 2, title: 'Channel Grid Framing', desc: 'Rigid GI channel grid locked into RCC slab.' },
        { step: 3, title: 'Gypsum Board Screwing', desc: 'Precision board fastening and light cutouts.' },
        { step: 4, title: 'Jointing & Smooth Sanding', desc: 'Ready for primer and velvet paint finish.' },
      ],
      faqs: [
        { question: 'Will false ceiling reduce room height too much in Mumbai?', answer: 'We design slim perimeter cove ceilings that drop only 5 inches along walls, keeping 90% of the ceiling at original height.' },
      ],
      startingPrice: '₹110',
      unit: 'sq.ft',
      seoTitle: 'False Ceiling & POP Contractor in Mumbai, Thane & Mulund',
      seoDesc: 'Gypsum false ceiling, cove lighting, and POP plaster designs in Mumbai & Thane. Clean finish, Saint-Gobain materials.',
      order: 4,
      featured: true,
    },
    {
      name: 'Interior & Exterior Painting',
      slug: 'painting-polishing',
      icon: 'Paintbrush',
      shortDesc: 'Asian Paints Royale luxury emulsion, PU wood polish, waterproof damp-proofing & texture walls.',
      heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
      intro: 'Dust-minimized professional painting with mechanized wall sanders, double coat acrylic putty, and Asian Paints Royale / Apex Ultima finishes.',
      includedItems: [
        'Mechanized surface preparation and plaster crack repair',
        'Moisture-meter testing and Dr. Fixit damp-proofing',
        '2 coats Birla White Wall Putty + 1 coat primer',
        '2 coats Asian Paints Royale / Apcolite Premium Emulsion',
        'Italian PU & Melamine polish on doors and veneer',
        'Full masking tape protection and post-job vacuum cleaning',
      ],
      processSteps: [
        { step: 1, title: 'Surface Inspection & Moisture Audit', desc: 'Identify wall seepage and salt efflorescence.' },
        { step: 2, title: 'Floor & Furniture Protection', desc: 'Heavy plastic sheeting over floors and valuables.' },
        { step: 3, title: 'Machine Putty Sanding', desc: 'Mirror-smooth base without airborne dust clouds.' },
        { step: 4, title: 'Roller Application & Touch-up', desc: 'Flawless uniform color texture.' },
      ],
      faqs: [
        { question: 'How do you fix dampness and wall peeling in Mumbai monsoons?', answer: 'We strip damp plaster, apply chemical crystalline waterproofing barriers, and seal with specialized damp-block primers before painting.' },
      ],
      startingPrice: '₹28',
      unit: 'sq.ft',
      seoTitle: 'Professional Painting Contractor Mumbai & Thane',
      seoDesc: 'Home painting & wood polishing in Mumbai, Thane, Mulund. Asian Paints Royale, PU polish, and waterproof damp-proofing.',
      order: 5,
      featured: true,
    },
    {
      name: 'Electrical Work & Lighting',
      slug: 'electrical-work',
      icon: 'Zap',
      shortDesc: 'Concealed wiring, modular switches (Legrand/Schneider), MCB DB dressing & architectural lighting.',
      heroImage: 'https://images.unsplash.com/photo-1558211553-d9337598292b?auto=format&fit=crop&w=1200&q=80',
      intro: 'Licensed electricians ensuring fire-safe concealed wiring, phase load balancing, and smart home automation switches for flats and commercial spaces.',
      includedItems: [
        'Polycab / Finolex FRLS fire-retardant concealed copper wiring',
        'Legrand Arteor / Schneider modular switchboard fitting',
        'Separate heavy lines for ACs, Geysers & Microwave ovens',
        'Distribution Board dressing with ELCB / RCCB safety trips',
        'Magnetic track lights, profile LEDs, and chandelier hanging',
      ],
      processSteps: [
        { step: 1, title: 'Load Calculation', desc: 'Plan wattage per room and appliance circuits.' },
        { step: 2, title: 'Wall Chasing & Pipe Conduit', desc: 'Neat wall cutting with heavy PVC conduits.' },
        { step: 3, title: 'Wire Pulling & Continuity Test', desc: 'Zero loose connection testing with megger.' },
        { step: 4, title: 'Switch & Fixture Commissioning', desc: 'Testing all points, earthing, and safety trips.' },
      ],
      faqs: [
        { question: 'Do you provide copper earthing testing?', answer: 'Yes, every electrical job includes neutral-earth resistance verification to protect expensive home electronics.' },
      ],
      startingPrice: '₹850',
      unit: 'per point',
      seoTitle: 'Electrical Contractor in Mumbai & Thane | Licensed Electrician',
      seoDesc: 'Concealed electrical wiring, Legrand switchboards, LED lighting installation in Mumbai, Thane, Mulund & Palghar.',
      order: 6,
      featured: true,
    },
    {
      name: 'Plumbing & Sanitary Solutions',
      slug: 'plumbing-sanitary',
      icon: 'Wrench',
      shortDesc: 'Concealed CPVC/UPVC piping, diverter valve fitting, Jaquar/Kohler sanitaryware & leak detection.',
      heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      intro: 'Zero-leakage concealed bathroom plumbing using Astral CPVC pipes, thermostatic diverters, wall-hung WC frames, and pressure testing.',
      includedItems: [
        'Astral / Ashirvad CPVC hot & cold water concealed lines',
        'Wall-hung commode concealed flush tank (Geberit / Jaquar)',
        'Shower diverters, overhead rain showers & vanity basin mixers',
        'Hydrostatic pipe pressure testing to guarantee zero leaks',
        'Kitchen sink double-bowl drain connection & RO water lines',
      ],
      processSteps: [
        { step: 1, title: 'Sanitary Layout Plan', desc: 'Ergonomic slope and valve location planning.' },
        { step: 2, title: 'Solvent Welding & Chasing', desc: 'High-pressure CPVC jointing.' },
        { step: 3, title: '12-Hour Hydrostatic Test', desc: 'Pumping water at 10 bar pressure before closing walls.' },
        { step: 4, title: 'Final CP Fitting Installation', desc: 'Mounting faucets, mirrors, and accessories.' },
      ],
      faqs: [
        { question: 'Do you break bathroom tiles without damaging waterproofing?', answer: 'Our plumbing and tile teams coordinate directly so chemical waterproofing is reapplied before any tile is laid.' },
      ],
      startingPrice: '₹12,000',
      unit: 'per bathroom',
      seoTitle: 'Plumbing Contractor in Mumbai & Thane | Bathroom Plumbing',
      seoDesc: 'Concealed bathroom plumbing, leak-free pipe fitting, Jaquar/Kohler sanitaryware installation in Mumbai & Thane.',
      order: 7,
      featured: true,
    },
    {
      name: 'Tiles, Marble & Flooring',
      slug: 'tiles-flooring',
      icon: 'Grid3x3',
      shortDesc: 'Italian marble laying & diamond polish, large slab vitrified tiles (4x2, 6x4), epoxy grouting.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      intro: 'Laser-level tile and marble installation. From mirror-finish Italian marble polishing to anti-skid bathroom tiles and seamless epoxy joints.',
      includedItems: [
        'Large format vitrified tiles (4ft x 2ft, 6ft x 4ft) with tile spacers',
        'Italian & Indian marble laying with river sand and grey cement',
        '7-stage diamond mirror polish on marble and granite',
        'Stain-proof epoxy tile grouting (Roff / Laticrete)',
        'Granite door and window frame chamfering and moulding',
      ],
      processSteps: [
        { step: 1, title: 'Floor Levelling & Slope Check', desc: 'Establishing proper water drainage slope.' },
        { step: 2, title: 'Adhesive & Bedding Mortar', desc: 'Using polymer-modified adhesives to prevent hollow sounds.' },
        { step: 3, title: 'Spacer Alignment', desc: 'Ensuring 2mm uniform grout lines.' },
        { step: 4, title: 'Epoxy Grouting & Polish', desc: 'Durable, waterproof, stain-free floor protection.' },
      ],
      faqs: [
        { question: 'How do you prevent hollow sounds under tiles?', answer: 'We use high-grade polymer tile adhesives (Roff/Laticrete) with full back-buttering rather than plain cement powder.' },
      ],
      startingPrice: '₹55',
      unit: 'sq.ft',
      seoTitle: 'Tiles & Marble Contractor Mumbai & Thane | Flooring Work',
      seoDesc: 'Vitrified tiles laying, Italian marble polishing, bathroom flooring contractor in Mumbai, Thane, Mulund & Palghar.',
      order: 8,
      featured: true,
    },
    {
      name: 'Full Home Turnkey Interior',
      slug: 'full-home-interior',
      icon: 'Home',
      shortDesc: 'Complete 1BHK, 2BHK, 3BHK interior execution from bare shell to move-in ready under one master contractor.',
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      intro: 'The signature OneStop Interiors service: One Contractor, One Quotation, One Responsibility. We manage carpentry, painting, electrical, plumbing, ceiling, and cleaning from start to handover.',
      includedItems: [
        'Dedicated site supervisor on-site every day',
        'Complete modular kitchen and custom bedroom wardrobes',
        'False ceiling with architectural cove lighting',
        'Entire flat painting with Asian Paints Royale',
        'Living room TV unit, shoe rack, temple mandir & sofa framing',
        'Deep chemical cleaning before official key handover',
        '5-Year Workmanship Warranty Card',
      ],
      processSteps: [
        { step: 1, title: 'Site Inspection & Needs Analysis', desc: 'Detailed walkthrough with Shobhnath Vishwakarma.' },
        { step: 2, title: 'Transparent BOQ Quotation', desc: 'Item-by-item material brand and rate transparency.' },
        { step: 3, title: 'Synchronized Trade Execution', desc: 'Carpenters, plumbers, and painters working in harmony.' },
        { step: 4, title: 'Final Snagging & Grand Handover', desc: 'Zero-defect delivery on agreed timeline.' },
      ],
      faqs: [
        { question: 'How long does a 2BHK complete interior take in Mumbai?', answer: 'Typically 35 to 45 working days with our coordinated team of 15+ craftsmen.' },
        { question: 'What is the advantage over hiring separate workers?', answer: 'No blame games between carpenter and electrician. One point of contact, fixed agreed price, and guaranteed completion date.' },
      ],
      startingPrice: '₹3,50,000',
      unit: 'package',
      seoTitle: 'Full Home Interior Contractor in Mumbai & Thane | Turnkey 1BHK 2BHK 3BHK',
      seoDesc: 'Complete turnkey home interiors in Mumbai, Thane, Mulund, Malad. 1BHK, 2BHK, 3BHK interior contractor with 25+ years experience.',
      order: 9,
      featured: true,
    },
    {
      name: 'Office, Shop & Commercial Interior',
      slug: 'commercial-interior',
      icon: 'Building2',
      shortDesc: 'Turnkey retail showrooms, corporate offices, clinics & restaurant interiors delivered on tight timelines.',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      intro: 'Fast-track commercial fit-outs built for durability and high customer footfall. We work day and night shifts to meet mall and retail opening deadlines.',
      includedItems: [
        'Toughened glass partitions and acoustic cubicles',
        'Heavy-duty reception counters and display racks',
        'Server room rack electrical wiring and networking conduit',
        'Fire-retardant ceiling and sprinkler alignment',
        'Commercial vinyl / epoxy flooring for heavy foot traffic',
      ],
      processSteps: [
        { step: 1, title: 'Commercial Layout Plan', desc: 'Optimization of seating density and customer circulation.' },
        { step: 2, title: 'Fast-Track Material Sourcing', desc: 'Direct factory procurement for cost savings.' },
        { step: 3, title: 'Round-the-Clock Execution', desc: 'Night-shift execution to meet opening deadlines.' },
        { step: 4, title: 'Handover with Compliance', desc: 'Ready for business operation.' },
      ],
      faqs: [
        { question: 'Can you work during mall non-operating hours (night shift)?', answer: 'Yes! Our commercial teams are experienced in working from 10 PM to 8 AM in Mumbai malls and corporate towers.' },
      ],
      startingPrice: '₹1,100',
      unit: 'sq.ft',
      seoTitle: 'Office & Commercial Interior Contractor in Mumbai',
      seoDesc: 'Office, retail shop, clinic and restaurant interior fit-outs in Mumbai, Thane, BKC, Andheri. Rapid handover, high durability.',
      order: 10,
      featured: true,
    },
    {
      name: 'Civil Repair & Renovation',
      slug: 'civil-repair-renovation',
      icon: 'Hammer',
      shortDesc: 'Wall demolition, RCC structural repairs, bathroom remodeling, terrace waterproofing & plastering.',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      intro: 'Comprehensive civil renovation for older Mumbai society flats. We handle debris disposal, structural beam retrofitting, and society NOC coordination.',
      includedItems: [
        'Controlled wall knocking and lintel beam strengthening',
        'Brickwork, AAC block masonry, and sand-face plaster',
        'Terrace & bathroom membrane waterproofing',
        'Debris clearing and eco-friendly municipal dumping',
        'Society permissions support and safety netting',
      ],
      processSteps: [
        { step: 1, title: 'Structural Feasibility Audit', desc: 'Checking non-load-bearing walls and building safety.' },
        { step: 2, title: 'Society Safety Masking', desc: 'Elevator and common passage protection.' },
        { step: 3, title: 'Demolition & Rebuilding', desc: 'AAC block wall masonry and waterproofing.' },
        { step: 4, title: 'Ready for Finishes', desc: 'Plastered, primed, and waterproofed.' },
      ],
      faqs: [
        { question: 'Do you take care of society debris clearance?', answer: 'Yes, all debris is bagged, hauled down via stairs/lift with society protection, and trucked to authorized dumping grounds.' },
      ],
      startingPrice: '₹350',
      unit: 'sq.ft',
      seoTitle: 'Civil Repair & Renovation Contractor in Mumbai & Thane',
      seoDesc: 'Flat renovation, bathroom breaking, wall demolition and civil repair contractor in Mumbai, Thane, Mulund & Palghar.',
      order: 11,
      featured: true,
    },
  ];

  await Service.insertMany(services);
  console.log(`✓ Inserted ${services.length} comprehensive Services.`);

  // 3. Seed Portfolio Items (6 realistic projects)
  await PortfolioItem.deleteMany({});
  const portfolioItems = [
    {
      title: 'Luxury 3BHK Turnkey Interior at Oberoi Woods, Goregaon East',
      slug: 'luxury-3bhk-goregaon-east',
      category: 'full-home-interior',
      type: 'residential',
      location: 'Goregaon East, Mumbai',
      areaSqFt: 1450,
      duration: '42 Days',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
      ],
      beforeAfterImages: {
        before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        description: 'Complete bare shell to luxury warm-wood living room with fluted panelling and warm LED cove lighting.',
      },
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'End-to-end turnkey project featuring customized teakwood accents, marine-ply modular kitchen with acrylic shutters, master bedroom hydraulic bed, and automated ambient lighting.',
      clientFeedback: 'Shobhnathji and his team delivered the flat 5 days ahead of schedule. The finish on the carpentry and paint is top-tier!',
      featured: true,
      order: 1,
    },
    {
      title: 'Modern Modular Kitchen & Dining at Lodha Eternis, Andheri East',
      slug: 'modular-kitchen-andheri-east',
      category: 'modular-kitchen',
      type: 'residential',
      location: 'Andheri East, Mumbai',
      areaSqFt: 180,
      duration: '14 Days',
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1000&q=80',
      ],
      beforeAfterImages: {
        before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        description: 'Transformed an old dated kitchen into an open-plan parallel modular kitchen with Kalinga stone top.',
      },
      description: 'Parallel kitchen with matte-black profile acrylic shutters, Blum soft-close tandem drawers, concealed pantry pull-out, and quartz stone countertop with stainless steel under-mount sink.',
      clientFeedback: 'Best decision to give full kitchen and civil work to OneStop. No hassle of managing multiple workers.',
      featured: true,
      order: 2,
    },
    {
      title: 'Contemporary 2BHK Renovation at Runwal Greens, Mulund West',
      slug: '2bhk-renovation-mulund-west',
      category: 'full-home-interior',
      type: 'residential',
      location: 'Mulund West, Mumbai',
      areaSqFt: 920,
      duration: '32 Days',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      ],
      beforeAfterImages: {
        before: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        description: 'Complete dismantling of old damaged woodwork, fresh Gyproc ceiling and veneer polish.',
      },
      description: 'Full revamp of an 8-year-old apartment. Installed floor-to-ceiling sliding wardrobes, modern false ceiling with magnetic track lights, and complete Royale Luxury emulsion painting.',
      clientFeedback: 'Shobhnath uncle is genuine and honest. The quotation had no hidden surprises and quality was as promised.',
      featured: true,
      order: 3,
    },
    {
      title: 'Boutique Law Firm Corporate Office at Wagle Estate, Thane West',
      slug: 'corporate-office-thane-west',
      category: 'commercial-interior',
      type: 'commercial',
      location: 'Wagle Estate, Thane West',
      areaSqFt: 2200,
      duration: '28 Days',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
      ],
      description: 'Executive conference room with acoustic fluted paneling, 18-workstation modular cluster, toughened glass partner cabins, and networking electrical infrastructure.',
      clientFeedback: 'Delivered in under 30 days so we could start operations on auspicious day. Highly professional execution.',
      featured: true,
      order: 4,
    },
    {
      title: 'Master Bedroom Wardrobes & Bed Suite at Evershine Nagar, Malad West',
      slug: 'master-bedroom-malad-west',
      category: 'modular-wardrobes',
      type: 'residential',
      location: 'Malad West, Mumbai',
      areaSqFt: 350,
      duration: '18 Days',
      coverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      ],
      description: 'Custom fluted charcoal laminate sliding wardrobe with tinted mirror inserts, king size bed with pneumatic lift storage, and matching dresser unit.',
      clientFeedback: 'Superb carpentry craftsmanship. The drawers glide effortlessly and storage is doubled!',
      featured: false,
      order: 5,
    },
    {
      title: 'Complete Villa Interior & Civil Works at Palghar West',
      slug: 'villa-renovation-palghar',
      category: 'full-home-interior',
      type: 'residential',
      location: 'Palghar West, Maharashtra',
      areaSqFt: 2800,
      duration: '55 Days',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
      ],
      description: 'Independent bungalow renovation involving Italian marble laying, heavy teakwood entrance door with brass carving, modular kitchen, and full terrace waterproofing.',
      clientFeedback: 'They took total responsibility for civil, tile, wood, and painting. Great peace of mind.',
      featured: false,
      order: 6,
    },
  ];

  await PortfolioItem.insertMany(portfolioItems);
  console.log(`✓ Inserted ${portfolioItems.length} Portfolio Projects.`);

  // 4. Seed Testimonials (8 high-trust Mumbai/Thane reviews)
  await Testimonial.deleteMany({});
  const testimonials = [
    {
      clientName: 'Rajesh & Meena Sharma',
      projectTitle: '2BHK Turnkey Interior, Malad East',
      location: 'Malad East, Mumbai',
      rating: 5,
      reviewText: 'Shobhnathji has 25+ years experience and it shows in every detail. He managed the carpenter, painter, and electrician seamlessly. No extra hidden costs and delivered right on time.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: true,
      date: 'January 2026',
    },
    {
      clientName: 'Vikram Mehta (Architect)',
      projectTitle: 'Execution Partner for 4 Luxury Flats',
      location: 'Andheri West, Mumbai',
      rating: 5,
      reviewText: 'As an architect, finding a contractor who understands drawing precision without deviation is tough. OneStop Interiors is our go-to contractor team for all Mumbai projects.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: true,
      date: 'December 2025',
    },
    {
      clientName: 'Pooja Iyer',
      projectTitle: 'Modular Kitchen & False Ceiling, Mulund',
      location: 'Mulund West, Mumbai',
      rating: 5,
      reviewText: 'Their tagline is 100% true: Ek hi contractor, ek hi quotation, poori responsibility. My kitchen looks like an international showroom magazine photo!',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: true,
      date: 'February 2026',
    },
    {
      clientName: 'Sunil Patil',
      projectTitle: 'Flat Renovation & Painting, Thane',
      location: 'Majiwada, Thane West',
      rating: 5,
      reviewText: 'Fixed wall dampness that two previous contractors failed to solve. Re-did all wardrobe laminate pressing and Asian Paints Royale. Very polite and disciplined team.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: true,
      date: 'March 2026',
    },
    {
      clientName: 'Nitin Kulkarni',
      projectTitle: 'Commercial Dental Clinic Fit-out, Kandivali',
      location: 'Kandivali West, Mumbai',
      rating: 5,
      reviewText: 'Completed my clinic interior in just 18 days! The plumbing lines for dental chairs and partition glass were executed with zero hiccups. Great job Shobhnath uncle.',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: true,
      date: 'November 2025',
    },
    {
      clientName: 'Sneha Deshmukh',
      projectTitle: 'Wardrobes & Mandir Design, Borivali',
      location: 'Borivali East, Mumbai',
      rating: 5,
      reviewText: 'The teakwood mandir with intricate brass work and the sliding wardrobes are the talk of our society. Very trustworthy person and honest pricing.',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: false,
      date: 'October 2025',
    },
    {
      clientName: 'Anand Jaiswal',
      projectTitle: 'Full 1BHK Renovation, Palghar',
      location: 'Palghar, Maharashtra',
      rating: 5,
      reviewText: 'Reliable contractor who serves Palghar with Mumbai-grade finishing quality. Very transparent payment stages linked to work completion.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: false,
      date: 'September 2025',
    },
    {
      clientName: 'Kavita Joshi',
      projectTitle: 'Bathroom Plumbing & Tiles, Goregaon',
      location: 'Goregaon West, Mumbai',
      rating: 5,
      reviewText: 'Complete bathroom gut renovation with concealed Jaquar fittings and 4x2 vitrified tiles. Done in 10 days flat without water leakage issues.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      googleReview: true,
      featured: false,
      date: 'August 2025',
    },
  ];

  await Testimonial.insertMany(testimonials);
  console.log(`✓ Inserted ${testimonials.length} Testimonials.`);

  // 5. Seed Estimator Rates
  await EstimatorRate.deleteMany({});
  const estimatorRates = [
    {
      serviceType: 'modular-kitchen',
      serviceName: 'Modular Kitchen (Complete L-Shape / Parallel)',
      unit: 'sq.ft',
      basicRate: 1550,
      basicLabel: 'Commercial MR Ply + 0.8mm Laminate + Standard SS Baskets',
      basicFeatures: ['Commercial MR Grade Plywood', '0.8mm Matt Laminate', 'Standard Stainless Steel Drawers', 'PVC Edge Banding'],
      standardRate: 1950,
      standardLabel: 'IS:710 Marine Ply + 1mm Merino Laminate + Soft-Close Tandem',
      standardFeatures: ['710 BWP Marine Waterproof Plywood', '1mm Merino / Century Anti-Fingerprint Laminate', 'Hettich / Ebco Soft-close Tandem boxes', 'Laser Edge Banding'],
      premiumRate: 2650,
      premiumLabel: 'Action TESA HDHMR / Marine + High-Gloss Acrylic / PU + Blum Hinges',
      premiumFeatures: ['High Density Moisture Resistant / Marine Ply', 'German Acrylic or Italian PU Lacquered finish', 'Blum Soft-Close Systems & Servo-Drive', '10-Year Comprehensive Warranty'],
      minArea: 60,
      defaultArea: 120,
      description: 'Includes carcass, shutters, hardware, handles, and complete master carpenter fitting in Mumbai/Thane.',
      disclaimer: 'Countertop granite/quartz and chimney/hob appliances calculated separately.',
    },
    {
      serviceType: 'modular-wardrobes',
      serviceName: 'Modular Wardrobes (Floor to Ceiling)',
      unit: 'sq.ft',
      basicRate: 1350,
      basicLabel: 'Commercial Ply + 0.8mm Laminate (Hinged)',
      basicFeatures: ['Commercial Ply Carcass', '0.8mm Laminate Finish', 'Regular Hinges & Telescopic Channels', 'Basic Internal Drawers'],
      standardRate: 1750,
      standardLabel: 'BWP Marine Ply + 1mm Laminate (Sliding Tracks)',
      standardFeatures: ['710 Grade BWP Marine Plywood', '1mm Textured/Gloss Laminate', 'Heavy-duty Sliding Aluminum Tracks', 'Soft-close Drawer Hinges'],
      premiumRate: 2450,
      premiumLabel: 'Veneer / Tinted Profile Glass with Integrated Profile LED',
      premiumFeatures: ['Boiling Water Marine Ply + Natural Teak Veneer', 'Slim Fluted / Bronze Tinted Glass Shutters', 'Auto-Sensor Warm LED Profiles', 'Customized Jewelry & Tie Organizers'],
      minArea: 50,
      defaultArea: 90,
      description: 'Calculated by front elevation area (Width x Height in feet). Includes external shutters and internal shelves/drawers.',
      disclaimer: 'Loft storage above wardrobe included in measurement.',
    },
    {
      serviceType: 'painting-polishing',
      serviceName: 'Painting & Wall Damp-Proofing',
      unit: 'sq.ft',
      basicRate: 22,
      basicLabel: 'Asian Paints Tractor Emulsion (2 Coats + Touchup Putty)',
      basicFeatures: ['Tractor Emulsion Finish', 'Spot Putty Repair', 'Basic Masking Protection'],
      standardRate: 35,
      standardLabel: 'Asian Paints Apcolite Premium / Royale Luxury (2 Coats Putty + Primer)',
      standardFeatures: ['Full 2 Coats Birla White Putty', 'Asian Paints Damp-Block Primer', '2 Coats Apcolite / Royale Luxury Washable', 'Machine Wall Sanding'],
      premiumRate: 58,
      premiumLabel: 'Asian Paints Royale Aspira / PU Polishing + Anti-Crack Seal',
      premiumFeatures: ['Royale Aspira Ultra-Luxury Emulsion', 'Teflon Surface Protector', 'Italian PU polish on doors & frames', 'Post-painting Deep Cleaning'],
      minArea: 300,
      defaultArea: 1200,
      description: 'Calculated on total wall & ceiling surface area (approx 3.5x the carpet area of your Mumbai flat).',
      disclaimer: 'Severe structural leakage/exterior seepage rectification billed on actual civil inspection.',
    },
    {
      serviceType: 'false-ceiling-pop',
      serviceName: 'False Ceiling & Cove Lighting Box',
      unit: 'sq.ft',
      basicRate: 105,
      basicLabel: 'Gyproc Plain Sheet + GI Channel Framing',
      basicFeatures: ['Saint-Gobain Gyproc Gypsum', 'Standard GI Framing', 'Joint Paper Taping'],
      standardRate: 135,
      standardLabel: 'Gyproc with Cove Lighting Trough & Curtain Pelmet',
      standardFeatures: ['Saint-Gobain Gyproc Board', 'Concealed LED Cove Light Channel', 'Full Window Curtain Pelmet', 'Mirror Finish Putty Base'],
      premiumRate: 185,
      premiumLabel: 'Designer Multi-Level Ceiling + Wooden Rafters / CNC Jali',
      premiumFeatures: ['Multi-tier Architectural Ceiling', 'Natural Wood Veneer Rafter Accents', 'Backlit CNC Acrylic / WPC Jali Inserts', 'Acoustic Insulation Layer'],
      minArea: 100,
      defaultArea: 350,
      description: 'Calculated on ceiling surface area. Transforms the warmth and lighting of living and bedrooms.',
      disclaimer: 'LED strip lights and electrical wire cabling quoted as electrical points.',
    },
    {
      serviceType: 'full-home-interior',
      serviceName: 'Full Home Turnkey Interior (Carpet Area)',
      unit: 'sq.ft',
      basicRate: 1100,
      basicLabel: 'Essential Package (Kitchen + Wardrobe + Paint + Basic Lights)',
      basicFeatures: ['Standard Modular Kitchen', '1 Master Wardrobe', 'Complete Home Painting', 'Basic Switchboard Fitting'],
      standardRate: 1750,
      standardLabel: 'Elegance Package (BWP Kitchen + All Wardrobes + False Ceiling + Paint)',
      standardFeatures: ['Waterproof BWP Marine Kitchen', 'Wardrobes in All Bedrooms', 'Living & Master False Ceiling', 'Royale Paint + Bathroom CP fittings'],
      premiumRate: 2600,
      premiumLabel: 'Luxury Turnkey (Veneer/Acrylic + Marble/Tile + Automation + Furniture)',
      premiumFeatures: ['High-end Acrylic Kitchen & Tinted Glass Wardrobes', 'Designer Teakwood Temple & TV Console', 'Designer Ceilings throughout flat', 'Italian Marble Polish & Deep Cleaning'],
      minArea: 350,
      defaultArea: 750,
      description: 'All-inclusive turnkey rate based on carpet area of flat. Covers carpentry, paint, ceiling, plumbing, electrical, and site supervision.',
      disclaimer: 'Loose sofas and loose appliances not included unless specified.',
    },
  ];

  await EstimatorRate.insertMany(estimatorRates);
  console.log(`✓ Inserted ${estimatorRates.length} Estimator Rate models.`);

  // 6. Seed Service Areas (Mumbai, Thane, Mulund, Palghar, etc.)
  await ServiceArea.deleteMany({});
  const serviceAreas = [
    { name: 'Mumbai Western Suburbs', slug: 'mumbai-western-suburbs', region: 'Mumbai', isPrimary: true, landmarks: ['Malad', 'Kandivali', 'Borivali', 'Goregaon', 'Andheri', 'Bandra'], description: 'Our primary workshop base in Kurar Village, Malad East serving all western suburbs within 24-48 hr site visits.' },
    { name: 'Thane & Mulund', slug: 'thane-mulund', region: 'Thane', isPrimary: true, landmarks: ['Mulund West', 'Mulund East', 'Wagle Estate', 'Ghopbunder Road', 'Majiwada'], description: 'Serving high-rise gated societies and commercial hubs across Mulund and Thane with dedicated execution teams.' },
    { name: 'Palghar & Extended Suburbs', slug: 'palghar-extended', region: 'Palghar', isPrimary: true, landmarks: ['Palghar West', 'Boisar', 'Virar', 'Vasai', 'Nalasopara'], description: 'Providing Mumbai-grade interior craftsmanship for bungalows, villas, and renovation projects across Palghar district.' },
    { name: 'Mumbai South & Central', slug: 'mumbai-south-central', region: 'Mumbai', isPrimary: false, landmarks: ['Dadar', 'Prabhadevi', 'Lower Parel', 'Worli', 'Matunga'], description: 'Bespoke apartment renovations and heritage building carpentry.' },
    { name: 'Navi Mumbai', slug: 'navi-mumbai', region: 'Navi Mumbai', isPrimary: false, landmarks: ['Vashi', 'Nerul', 'Kharghar', 'Seawoods', 'Belapur'], description: 'Residential and commercial fit-outs across Navi Mumbai node.' },
  ];

  await ServiceArea.insertMany(serviceAreas);
  console.log(`✓ Inserted ${serviceAreas.length} Service Areas.`);

  // 7. Seed FAQs
  await FAQ.deleteMany({});
  const faqs = [
    { question: 'Who is Shobhnath Vishwakarma and what is his background?', answer: 'Shobhnath Vishwakarma is a master carpenter contractor with 25+ years of hands-on experience in Mumbai. Coming from the traditional Vishwakarma artisan lineage, he leads on-site teams directly without middleman layers.', category: 'About Us', order: 1, featured: true },
    { question: 'Why should I hire OneStop Interiors instead of separate workers?', answer: 'When you hire separate carpenters, plumbers, electricians, and painters, they constantly blame each other when something goes wrong (e.g., plumber blaming carpenter, painter blaming ceiling worker). With OneStop Interiors, you get ONE quotation, ONE contractor, and ONE 100% responsible point of contact.', category: 'General', order: 2, featured: true },
    { question: 'Is the initial site visit and quotation really free?', answer: 'Yes! We visit your site anywhere in Mumbai, Thane, Mulund, or nearby zones, take laser measurements, understand your needs, and deliver a detailed itemized estimate with zero obligation.', category: 'Pricing', order: 3, featured: true },
    { question: 'What warranty do you provide on your interior work?', answer: 'We provide a 5-Year Workmanship Warranty on all carpentry, modular kitchen, and wardrobes, and 1-Year comprehensive service warranty covering plumbing, electrical, and paint touch-ups.', category: 'Warranty', order: 4, featured: true },
    { question: 'How do you handle payment milestones?', answer: 'We follow a fair stage-wise payment structure: 50% advance for material procurement, 40% running payment as work reaches defined milestones, and the final 10% only after complete handover and your final satisfaction inspection.', category: 'Pricing', order: 5, featured: true },
    { question: 'Can you work on tight deadlines for commercial or tenant handover?', answer: 'Yes. For retail shops, offices, and urgent tenant handovers, we mobilize double shifts (including night work where permitted by society/mall management) to hit committed dates.', category: 'Execution', order: 6, featured: true },
  ];

  await FAQ.insertMany(faqs);
  console.log(`✓ Inserted ${faqs.length} FAQs.`);

  // 8. Seed Site Settings
  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    businessName: 'OneStop Interiors',
    tagline: 'Ghar ka poora interior aur repair, ek hi jagah, ek hi contractor se.',
    positioning: 'One-Stop Interior & Renovation Solution. One contractor, one quotation, one responsibility.',
    ownerName: 'Shobhnath Vishwakarma',
    ownerExperienceYears: 25,
    primaryPhone: '9967302911',
    secondaryPhone: '7039821535',
    whatsappNumber: '9967302911',
    email: 'amitvishwa1950@gmail.com',
    address: 'Laxman Nagar, Kurar Village, Malad East, Mumbai - 400097',
    googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6186989408665!2d72.859664!3d19.182479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b719463b2f5d%3A0x6796328a6f30f9a2!2sKurar%20Village%2C%20Malad%20East%2C%20Mumbai%2C%20Maharashtra%20400097!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    googleReviewUrl: 'https://g.page/r/onestop-interiors/review',
    trustStrip: {
      yearsExperience: 25,
      projectsCompleted: 550,
      happyClients: 480,
      warrantyYears: 5,
    },
    workingHours: 'Mon - Sun: 8:00 AM - 9:00 PM',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
  });
  console.log('✓ Initialized SiteSettings with official business data.');

  // 9. Seed Sample Partners
  await Partner.deleteMany({});
  const partners = [
    { name: 'Ramesh Sharma', trade: 'electrician', phone: '9820123456', rating: 5, serviceAreas: ['Malad', 'Kandivali', 'Goregaon'], availability: 'available', notes: 'Master in concealed wiring & DB dressing' },
    { name: 'Praveen Yadav', trade: 'plumber', phone: '9821987654', rating: 5, serviceAreas: ['Mumbai', 'Thane'], availability: 'available', notes: 'Astral CPVC specialist, diverter testing' },
    { name: 'Mukesh Prajapati', trade: 'painter', phone: '9833445566', rating: 4.8, serviceAreas: ['Mumbai', 'Thane', 'Mulund'], availability: 'available', notes: 'Mechanized putty & PU Italian polish' },
    { name: 'Dinesh Vishwakarma', trade: 'pop_false_ceiling', phone: '9867112233', rating: 4.9, serviceAreas: ['Mumbai', 'Palghar'], availability: 'available', notes: 'Saint-Gobain Gyproc ceiling framing' },
    { name: 'Sanjay Chauhan', trade: 'tiles_flooring', phone: '9892334455', rating: 4.8, serviceAreas: ['All Mumbai'], availability: 'available', notes: 'Italian marble diamond polish & large tiles' },
  ];
  await Partner.insertMany(partners);
  console.log(`✓ Inserted ${partners.length} trade partners.`);

  // 10. Seed Sample Leads
  await Lead.deleteMany({});
  const sampleLeads = [
    {
      name: 'Amitabh Joshi',
      phone: '9820551234',
      email: 'amitabh.j@gmail.com',
      serviceType: 'Full Home Turnkey Interior',
      area: 'Kandivali East, Mumbai',
      message: 'Need 2BHK complete interior work done. Looking for modular kitchen, wardrobes, false ceiling, and painting.',
      source: 'hero_form',
      status: 'new',
      estimatedValue: 450000,
      notes: [{ text: 'Lead submitted via Hero Form. Follow up scheduled for site visit.', author: 'System', createdAt: new Date() }],
      history: [{ action: 'Created', note: 'Lead captured from website hero form', createdAt: new Date() }],
    },
    {
      name: 'Priyanka Sen',
      phone: '9833221144',
      email: 'priyanka.sen@outlook.com',
      serviceType: 'Modular Kitchen',
      area: 'Thane West',
      message: 'Need urgent modular kitchen quotation. Current kitchen has water leakage issue.',
      source: 'cost_estimator',
      status: 'contacted',
      estimatedValue: 185000,
      notes: [{ text: 'Spoke on call. Client sent kitchen photo on WhatsApp. Free site visit fixed for Saturday 11 AM.', author: 'Shobhnath', createdAt: new Date() }],
      history: [{ action: 'Status change', from: 'new', to: 'contacted', createdAt: new Date() }],
    },
    {
      name: 'Ketan Parikh',
      phone: '9920887766',
      email: 'ketan@parikhassociates.in',
      serviceType: 'Office, Shop & Commercial Interior',
      area: 'Andheri East',
      message: '1500 sq ft office space needs partition glass, reception, and workstations.',
      source: 'architect_form',
      status: 'site_visit_scheduled',
      estimatedValue: 850000,
      notes: [{ text: 'Site visit confirmed at MIDC Andheri East.', author: 'Shobhnath', createdAt: new Date() }],
      history: [{ action: 'Status change', from: 'contacted', to: 'site_visit_scheduled', createdAt: new Date() }],
    },
  ];
  await Lead.insertMany(sampleLeads);
  console.log(`✓ Inserted ${sampleLeads.length} sample leads.`);

  console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
  if (!memoryServer) {
    await mongoose.disconnect();
  }
}

seed().catch(err => {
  console.error('Seed script error:', err);
  process.exit(1);
});

