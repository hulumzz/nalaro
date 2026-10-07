import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const origin = process.env.TEST_URL || "http://127.0.0.1:4321";
await fs.mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: process.env.TEST_BROWSER || "msedge", headless: true });
const report = { widths: [], errors: [], checks: [] };
try {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("pageerror", error => report.errors.push(error.message));
  page.on("response", response => { if (response.url().startsWith(origin) && response.status() >= 400) report.errors.push(response.status() + " " + response.url()); });
  for (const width of [320, 390, 600, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const measurements = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelectorAll("h1").length,
      brokenImages: [...document.images].filter(image => image.loading !== "lazy" && (!image.complete || !image.naturalWidth)).map(image => image.src),
      badAnchors: [...document.querySelectorAll('a[href*="#"]')].filter(a => a.hash && !document.getElementById(a.hash.slice(1))).map(a => a.getAttribute("href")),
    }));
    assert.equal(measurements.scrollWidth, width, "Horizontal overflow at " + width);
    assert.equal(measurements.h1, 1);
    assert.deepEqual(measurements.brokenImages, []);
    assert.deepEqual(measurements.badAnchors, []);
    report.widths.push(measurements);
    if ([390, 1440].includes(width)) {
      await page.screenshot({ path: "artifacts/home-" + width + ".png", fullPage: true });
      if (width === 1440) await page.screenshot({ path: "artifacts/hero-desktop.png" });
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const violations = axe.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
      await fs.writeFile("artifacts/axe-" + width + ".json", JSON.stringify(violations, null, 2));
      assert.deepEqual(violations, [], "Accessibility violations at " + width);
    }
  }
  report.checks.push("Responsive layout, images, anchors and axe at desktop/mobile");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin);
  for (const link of await page.locator(".desktop-nav a").all()) {
    const href = await link.getAttribute("href");
    assert.ok(href);
    const id = new URL(href, origin).hash.slice(1);
    await link.click();
    const spacing = await page.evaluate((sectionId) => {
      const header = document.querySelector(".site-header");
      const section = document.getElementById(sectionId);
      const firstContent = section?.querySelector(".eyebrow, .section-heading, .solutions-intro");
      if (!header || !section || !firstContent) return Number.NaN;
      return Math.round(firstContent.getBoundingClientRect().top - header.getBoundingClientRect().bottom);
    }, id);
    assert.ok(spacing >= 28 && spacing <= 36, `Navigation spacing for ${id}: ${spacing}px`);
  }
  report.checks.push("Desktop navigation positions each section 32px below the header");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  await page.getByRole("button", { name: "Menu" }).click();
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator("#mobile-nav").isVisible(), false);
  await page.getByRole("button", { name: "Menu" }).click();
  await page.locator("#mobile-nav").getByRole("link", { name: /Solusi/ }).click();
  assert.equal(await page.locator("#mobile-nav").isVisible(), false);
  report.checks.push("Mobile menu, Escape, anchor navigation");
  await page.locator(".product-details summary").first().click();
  assert.equal(await page.locator(".product-details").first().getAttribute("open"), "");
  await page.locator(".solution-item summary").nth(2).click();
  assert.equal(await page.locator(".solution-item[open]").count(), 1);
  await page.locator('[data-scenario="1"]').click();
  assert.equal(await page.locator("[data-endpoint]").innerText(), "learning-workspace");
  assert.equal(await page.locator("[data-build-status]").innerText(), "Siap digunakan");
  report.checks.push("Native disclosures and reduced-motion scenario switch");
  await page.getByRole("button", { name: "Kirim lewat email" }).click();
  assert.equal(await page.locator("#name-error").isVisible(), true);
  await page.locator("#contact-name").fill("   ");
  await page.locator("#contact-message").fill("   ");
  await page.getByRole("button", { name: "Kirim lewat WhatsApp" }).click();
  assert.equal(await page.locator("#message-error").isVisible(), true);
  await page.locator("#contact-name").fill("Uji Nalaro");
  await page.locator("#contact-message").fill("Butuh aplikasi untuk tim & laporan.");
  await page.evaluate(() => { window.open = (url) => { window.__testOpenedUrl = String(url); return null; }; });
  await page.getByRole("button", { name: "Kirim lewat WhatsApp" }).click();
  const url = new URL(await page.evaluate(() => window.__testOpenedUrl));
  assert.equal(url.origin + url.pathname, "https://wa.me/6285771298582");
  assert.ok(url.searchParams.get("text").includes("Butuh aplikasi untuk tim & laporan."));
  // Capture email navigation before the browser can invoke an external app.
  const mailto = await page.locator('.contact-links a[href^="mailto:"]').getAttribute("href");
  assert.equal(mailto, "mailto:nalaro@skripzy.id");
  report.checks.push("Blank/whitespace validation and encoded WhatsApp draft; no message sent");
  await page.goto(origin);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://nalaro.digital/");
  assert.ok((await page.locator('meta[name="robots"]').getAttribute("content")).startsWith("index"));
  assert.equal(await page.locator('meta[property="og:image"]').getAttribute("content"), "https://nalaro.digital/og/nalaro-og.png");
  JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  assert.ok((await (await context.request.get(origin + "/sitemap.xml")).text()).includes("https://nalaro.digital/"));
  assert.ok((await (await context.request.get(origin + "/robots.txt")).text()).includes("https://nalaro.digital/sitemap.xml"));
  assert.equal((await context.request.get(origin + "/og/nalaro-og.png")).status(), 200);
  const errorPage = await context.newPage();
  await errorPage.goto(origin + "/404.html");
  assert.equal(await errorPage.locator('meta[name="robots"]').getAttribute("content"), "noindex, follow");
  report.checks.push("Canonical, robots, sitemap, structured data, social image and 404");
  const noJs = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const staticPage = await noJs.newPage();
  await staticPage.goto(origin);
  assert.ok((await staticPage.locator("[data-client]").innerText()).includes("Data pelanggan"));
  assert.equal(await staticPage.locator(".event-list li").count(), 8);
  await staticPage.locator(".solution-item summary").nth(1).click();
  assert.equal(await staticPage.locator(".solution-item").nth(1).getAttribute("open"), "");
  report.checks.push("Readable no-JavaScript content and native accordion");
  const motion = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
  const animatedPage = await motion.newPage();
  animatedPage.on("pageerror", error => report.errors.push(error.message));
  await animatedPage.goto(origin, { waitUntil: "networkidle" });
  await animatedPage.locator("[data-pause]").click();
  const pausedText = await animatedPage.locator("[data-client]").innerText();
  await animatedPage.waitForTimeout(300);
  assert.equal(await animatedPage.locator("[data-client]").innerText(), pausedText);
  await animatedPage.locator('[data-scenario="1"]').click();
  await animatedPage.locator('[data-scenario="2"]').click();
  await animatedPage.waitForFunction(() => {
    const tag = document.querySelector(".event-tag");
    const typed = tag?.firstElementChild?.textContent || "";
    return typed.length > 0 && typed.length < (tag?.getAttribute("data-full-text")?.length || 0);
  });
  await animatedPage.waitForFunction(() => {
    const text = document.querySelector(".event-message");
    const typed = text?.firstElementChild?.textContent || "";
    return typed.length > 0 && typed.length < (text?.getAttribute("data-full-text")?.length || 0);
  });
  await animatedPage.waitForFunction(() => document.querySelector("[data-build-status]")?.textContent === "Siap digunakan", undefined, { timeout: 20000 });
  assert.equal(await animatedPage.locator("[data-endpoint]").innerText(), "business-workspace");
  assert.equal(await animatedPage.locator("[data-event-count]").innerText(), "8 / 8");
  assert.equal(await animatedPage.locator("[data-replay]").count(), 0);
  const idleStarted = Date.now();
  await animatedPage.waitForFunction(() => document.querySelector("[data-event-count]")?.textContent === "0 / 8", undefined, { timeout: 8000 });
  assert.ok(Date.now() - idleStarted >= 3000, "Completed build must remain visible before looping");
  assert.equal(await animatedPage.locator("[data-endpoint]").innerText(), "business-workspace");
  await animatedPage.emulateMedia({ reducedMotion: "reduce" });
  await animatedPage.waitForFunction(() => document.querySelector("[data-build-status]")?.textContent === "Siap digunakan");
  assert.equal(await animatedPage.locator("[data-build-status]").innerText(), "Siap digunakan");
  report.checks.push("Typed event labels/messages, pause, rapid switching, 4.5-second idle, automatic loop, reduced-motion changes");
  assert.deepEqual(report.errors, []);
  await fs.writeFile("artifacts/ui-report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
