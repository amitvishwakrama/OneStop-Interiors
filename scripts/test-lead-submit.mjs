import puppeteer from 'puppeteer-core';
import path from 'path';
import mongoose from 'mongoose';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';
const MONGODB_URI = 'mongodb://127.0.0.1:27017/onestop_interiors';

async function testLead() {
  const outputPath = path.join(ARTIFACT_DIR, 'phase2-lead-submitted.png');
  console.log('Testing Lead Submission in Edge...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    page.on('console', msg => console.log('BROWSER:', msg.text()));

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    // Fill the quick enquiry form
    console.log('Filling form fields...');
    await page.type('input[placeholder="e.g. Rajesh Sharma"]', 'Rohan Verma');
    await page.type('input[placeholder="98XXXXXXXX"]', '9820123456');
    await page.select('select', 'Modular Kitchen');
    await page.type('input[placeholder="e.g. Malad East, Thane, Mulund, Andheri..."]', 'Kandivali East, Mumbai');
    await page.type('textarea', 'Need L-shape modular kitchen with acrylic finish and Hettich fittings.');

    // Submit the form
    console.log('Submitting lead form...');
    await page.click('button[type="submit"]');

    // Wait for success screen
    await page.waitForFunction(
      () => document.body.innerText.includes('Quotation Request Received') || document.body.innerText.includes('Thank You'),
      { timeout: 15000 }
    );
    console.log('✓ Success state detected on screen!');

    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: outputPath });
    console.log('✓ Captured lead submission confirmation screenshot:', outputPath);

    // Verify in MongoDB
    await mongoose.connect(MONGODB_URI);
    const Lead = mongoose.models.Lead || mongoose.model('Lead', new mongoose.Schema({
      name: String, phone: String, serviceType: String, area: String, status: String, source: String
    }, { timestamps: true }));

    const saved = await Lead.findOne({ phone: '9820123456' }).sort({ createdAt: -1 });
    if (saved) {
      console.log('✓ VERIFIED IN MONGODB:');
      console.log(`  Lead ID: ${saved._id}`);
      console.log(`  Name: ${saved.name}`);
      console.log(`  Phone: ${saved.phone}`);
      console.log(`  Service: ${saved.serviceType}`);
      console.log(`  Area: ${saved.area}`);
      console.log(`  Status: ${saved.status}`);
      console.log(`  Source: ${saved.source}`);
    } else {
      console.error('❌ Lead was not found in MongoDB!');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Lead submission test error:', err);
  } finally {
    await browser.close();
  }
}

testLead();

