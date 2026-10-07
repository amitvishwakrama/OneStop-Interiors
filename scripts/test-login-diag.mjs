import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function diag() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('response', resp => {
    if (resp.url().includes('api/auth')) {
      console.log('AUTH RESPONSE:', resp.status(), resp.url());
    }
  });

  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 4000));

  const content = await page.evaluate(() => {
    return {
      bodyText: document.body.innerText,
      url: window.location.href,
    };
  });
  console.log('DIAG RESULT:', content);
  await browser.close();
}

diag();

