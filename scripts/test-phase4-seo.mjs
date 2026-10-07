import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';

async function testPhase4() {
  console.log('Testing Phase 4 SEO & Local Landing Pages in Edge...');

  // 1. Test sitemap.xml via fetch
  console.log('Testing /sitemap.xml...');
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapText = await sitemapRes.text();
  console.log(`✓ /sitemap.xml responded with status ${sitemapRes.status}, length: ${sitemapText.length}`);
  if (!sitemapText.includes('<urlset') || !sitemapText.includes('onestopinteriors')) {
    console.warn('Warning: sitemap XML might be missing urlset tag or domain');
  } else {
    console.log('✓ Valid XML sitemap detected with dynamic routes!');
  }

  // 2. Test robots.txt via fetch
  console.log('Testing /robots.txt...');
  const robotsRes = await fetch('http://localhost:3000/robots.txt');
  const robotsText = await robotsRes.text();
  console.log(`✓ /robots.txt responded with status ${robotsRes.status}:`);
  console.log(robotsText.trim());

  // 3. Test Local SEO page in Edge
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const localUrl = 'http://localhost:3000/services/modular-kitchen/thane';
    console.log(`Navigating to Local SEO page: ${localUrl}...`);
    await page.goto(localUrl, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    // Check page title and headings
    const title = await page.title();
    console.log('Page title:', title);

    const h1Text = await page.$eval('h1', el => el.textContent);
    console.log('H1 text:', h1Text);

    // Capture Local SEO screenshot
    const seoScreenshotPath = path.join(ARTIFACT_DIR, 'phase4-local-seo-thane.png');
    await page.screenshot({ path: seoScreenshotPath, fullPage: false });
    console.log('✓ Captured Local SEO Thane Landing Page:', seoScreenshotPath);

    // Test JSON-LD schema on page
    const schemas = await page.$$eval('script[type="application/ld+json"]', scripts =>
      scripts.map(s => {
        try {
          return JSON.parse(s.textContent || '{}');
        } catch (e) {
          return null;
        }
      })
    );
    console.log(`✓ Found ${schemas.length} JSON-LD structured data blocks on page:`);
    schemas.forEach((s, idx) => {
      if (s) {
        console.log(`  [${idx + 1}] @type: ${s['@type']}, name: ${s.name || s['@id'] || 'N/A'}`);
      }
    });

    console.log('--- Phase 4 SEO Verification Complete! ---');
  } catch (err) {
    console.error('Phase 4 test error:', err);
  } finally {
    await browser.close();
  }
}

testPhase4();

