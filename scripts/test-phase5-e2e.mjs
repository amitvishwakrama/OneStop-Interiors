import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';

async function runE2EVerification() {
  console.log('=== Starting Phase 5 End-to-End Browser Verification ===');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // 1. Visit Cost Estimator Page
    console.log('1. Testing Cost Estimator Page (/cost-estimator)...');
    await page.goto('http://localhost:3000/cost-estimator', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    // Interact with Quality Tier: Click 'Premium'
    console.log('Selecting Premium quality tier...');
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text.includes('Premium')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1000));

    const estimatorScreenshot = path.join(ARTIFACT_DIR, 'phase5-cost-estimator.png');
    await page.screenshot({ path: estimatorScreenshot });
    console.log('✓ Captured interactive Cost Estimator:', estimatorScreenshot);

    // 2. Visit dynamic service page (/services/carpentry-furniture)
    console.log('2. Testing dynamic Service Page (/services/carpentry-furniture)...');
    await page.goto('http://localhost:3000/services/carpentry-furniture', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const serviceScreenshot = path.join(ARTIFACT_DIR, 'phase5-service-page.png');
    await page.screenshot({ path: serviceScreenshot });
    console.log('✓ Captured Service Detail Page:', serviceScreenshot);

    // 3. Visit dynamic portfolio page (/portfolio/2bhk-turnkey-kandivali)
    console.log('3. Testing dynamic Portfolio Page (/portfolio/2bhk-turnkey-kandivali)...');
    await page.goto('http://localhost:3000/portfolio/2bhk-turnkey-kandivali', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const portfolioScreenshot = path.join(ARTIFACT_DIR, 'phase5-portfolio-page.png');
    await page.screenshot({ path: portfolioScreenshot });
    console.log('✓ Captured Portfolio Project Detail Page:', portfolioScreenshot);

    // 4. Visit About Us Page
    console.log('4. Testing About Us Page (/about)...');
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const aboutScreenshot = path.join(ARTIFACT_DIR, 'phase5-about-page.png');
    await page.screenshot({ path: aboutScreenshot });
    console.log('✓ Captured About Page:', aboutScreenshot);

    // 5. Mobile Emulation on Homepage
    console.log('5. Testing Mobile Viewport (390x844 iPhone/Android)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const mobileScreenshot = path.join(ARTIFACT_DIR, 'phase5-mobile-viewport.png');
    await page.screenshot({ path: mobileScreenshot });
    console.log('✓ Captured Mobile Viewport with sticky action bar:', mobileScreenshot);

    console.log('=== All Phase 5 Browser Verifications Completed Successfully! ===');
  } catch (err) {
    console.error('E2E Verification Error:', err);
  } finally {
    await browser.close();
  }
}

runE2EVerification();

