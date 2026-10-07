import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';

async function testLogin() {
  const outputPath = path.join(ARTIFACT_DIR, 'phase1-admin-authenticated.png');
  console.log('Testing Admin Login flow in Edge...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    console.log('Clicking #admin-login-btn...');
    await page.click('#admin-login-btn');

    console.log('Waiting for URL to change to /admin...');
    await page.waitForFunction(() => window.location.pathname === '/admin', { timeout: 20000 });
    console.log('Navigated successfully to:', page.url());

    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: outputPath });
    console.log('✓ Successfully captured authenticated admin dashboard at:', outputPath);
  } catch (err) {
    console.error('Login test error:', err);
  } finally {
    await browser.close();
  }
}

testLogin();

