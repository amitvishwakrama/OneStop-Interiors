import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';

async function capture() {
  const url = process.argv[2] || 'http://localhost:3000/admin/login';
  const filename = process.argv[3] || 'phase1-admin-login.png';
  const width = parseInt(process.argv[4] || '1280', 10);
  const height = parseInt(process.argv[5] || '800', 10);

  const outputPath = path.isAbsolute(filename) ? filename : path.join(ARTIFACT_DIR, filename);

  console.log(`Launching Edge headless to capture: ${url} -> ${outputPath}`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Optional delay to ensure all animations settle
    await new Promise((r) => setTimeout(r, 1000));

    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`✓ Screenshot captured successfully: ${outputPath}`);
  } catch (err) {
    console.error('Error taking screenshot:', err);
  } finally {
    await browser.close();
  }
}

capture();

