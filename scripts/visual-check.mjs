import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:process.env.TEST_BROWSER || 'msedge',headless:true});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',err=>errors.push(err.message));
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321',{waitUntil:'networkidle'});
  await page.screenshot({path:'artifacts/hero-desktop.png'});
  await page.locator('#products').screenshot({path:'artifacts/products-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321',{waitUntil:'networkidle'});
  await page.screenshot({path:'artifacts/hero-mobile.png'});
  await page.locator('.build-terminal').screenshot({path:'artifacts/terminal-mobile.png'});
  console.log(JSON.stringify({title:await page.title(),errors}));
} finally { await browser.close(); }
