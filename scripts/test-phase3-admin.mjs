import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\vishw\\.gemini\\antigravity\\brain\\f1d5d8ac-fd9b-46c0-8cb7-d3c4a720f7a6';

async function testPhase3() {
  console.log('Testing Phase 3 Admin Panel in Edge...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // 1. Login
    console.log('Navigating to admin login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    console.log('Clicking login button...');
    await page.click('#admin-login-btn');
    console.log('Waiting for URL change to /admin...');
    await page.waitForFunction(
      () => window.location.pathname === '/admin' || (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')),
      { timeout: 30000 }
    );
    console.log('✓ Successfully logged into Admin Panel! Current URL:', page.url());

    // 2. Dashboard Screenshot
    await new Promise(r => setTimeout(r, 2500));
    const dashPath = path.join(ARTIFACT_DIR, 'phase3-admin-dashboard.png');
    await page.screenshot({ path: dashPath, fullPage: false });
    console.log('✓ Captured Admin Dashboard:', dashPath);

    // 3. Lead CRM Screenshot
    console.log('Navigating to Lead CRM (/admin/leads)...');
    await page.goto('http://localhost:3000/admin/leads', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));
    const leadsPath = path.join(ARTIFACT_DIR, 'phase3-admin-leads.png');
    await page.screenshot({ path: leadsPath, fullPage: false });
    console.log('✓ Captured Lead CRM Table:', leadsPath);

    // 4. Quotation Generator Screenshot & PDF test
    console.log('Navigating to Quotation Generator (/admin/quotations)...');
    await page.goto('http://localhost:3000/admin/quotations', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));

    // Fill in required client fields
    console.log('Filling in Quotation details...');
    await page.type('input[placeholder="e.g. Rajesh Sharma"]', 'Shree Rajesh Sharma');
    await page.type('input[placeholder="98XXXXXXXX"]', '9820123456');
    await page.type('input[placeholder="e.g. Oberoi Woods, Goregaon East"]', 'Oberoi Woods, Goregaon East, Mumbai');

    // Submit quotation
    console.log('Submitting quotation form...');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 4000));

    const quotePath = path.join(ARTIFACT_DIR, 'phase3-admin-quotation.png');
    await page.screenshot({ path: quotePath, fullPage: false });
    console.log('✓ Captured Quotation Generator with PDF Ready banner:', quotePath);

    // Test downloading PDF directly via fetch using the session cookies
    const cookies = await page.cookies();
    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

    // Fetch quotation list to get newly created ID
    const res = await fetch('http://localhost:3000/api/admin/quotations', {
      headers: { Cookie: cookieHeader },
    });
    const quoteData = await res.json();
    console.log(`Retrieved ${quoteData.quotations?.length || 0} quotations from API`);
    const firstQuote = quoteData.quotations?.[0];

    if (firstQuote) {
      console.log(`Downloading PDF for quote ${firstQuote.quotationNumber}...`);
      const pdfRes = await fetch(`http://localhost:3000/api/admin/quotations/${firstQuote._id}/pdf`, {
        headers: { Cookie: cookieHeader },
      });
      const pdfBuffer = await pdfRes.arrayBuffer();
      const pdfFilePath = path.join(ARTIFACT_DIR, `${firstQuote.quotationNumber}_Quotation.pdf`);
      fs.writeFileSync(pdfFilePath, Buffer.from(pdfBuffer));
      console.log(`✓ Branded PDF generated and saved successfully: ${pdfFilePath} (${pdfBuffer.byteLength} bytes)`);
    }

    // 5. Test Partners Directory
    console.log('Navigating to Partners Directory (/admin/partners)...');
    await page.goto('http://localhost:3000/admin/partners', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const partnersPath = path.join(ARTIFACT_DIR, 'phase3-admin-partners.png');
    await page.screenshot({ path: partnersPath, fullPage: false });
    console.log('✓ Captured Partners Directory:', partnersPath);

    console.log('--- Phase 3 Verification Complete! ---');
  } catch (err) {
    console.error('Phase 3 test error:', err);
  } finally {
    await browser.close();
  }
}

testPhase3();

