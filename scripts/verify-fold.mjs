import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { launchBrowser } from "./browser.mjs";
const origin = process.env.TEST_URL || "http://127.0.0.1:4321";
const browser = await launchBrowser();
const errors = [];
await fs.mkdir("artifacts", { recursive: true });
try {
  for (const [width, height] of [[320, 640], [390, 844], [844, 390], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector(".is-fold-ready"));
    assert.equal(await page.locator(".fold-page").count(), 6);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    const heights = await page.locator(".fold-page").evaluateAll(nodes => nodes.map(el => el.offsetHeight));
    const header = await page.locator(".site-header").evaluate(el => el.offsetHeight);
    const transition = header + heights[0] - (height - header) * 0.5;
    await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), transition);
    await page.waitForFunction(() => !!document.querySelector(".fold-page.is-folding"));
    assert.notEqual(await page.locator(".fold-sheet").first().evaluate(el => getComputedStyle(el).transform), "none");
    assert.equal(await page.locator(".fold-sheet").first().evaluate(el => getComputedStyle(el).filter), "none");
    await page.waitForFunction(() => document.querySelector("#products-title").classList.contains("revealed"));
    await page.waitForTimeout(850);
    await page.screenshot({ path: `artifacts/fold-${width}.png` });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForFunction(() => !document.querySelector(".fold-sheet").style.transform);
    for (const id of ["products", "solutions", "works", "about", "contact", "product-store", "index"]) {
      // Click actual same-page links; the delegated handler must also support nested product anchors.
      await page.evaluate(id => document.querySelector(`a[href="#${id}"], a[href="/#${id}"]`).click(), id);
      await page.waitForFunction(id => {
        const el = document.getElementById(id);
        const first = el.querySelector(".eyebrow, .section-heading, .solutions-intro") || el;
        const top = first.getBoundingClientRect().top;
        const head = document.querySelector(".site-header").getBoundingClientRect().bottom;
        return (top >= head + 28 && top < innerHeight - 40) || (id === "index" && scrollY === 0);
      }, id);
      if (id === "products") {
        // Every product must remain reachable even in a section taller than the viewport.
        for (const product of await page.locator(".product-open").all()) {
          await product.scrollIntoViewIfNeeded();
          const box = await product.boundingBox();
          assert.ok(box && box.y >= header - 2 && box.y + box.height <= height + 2, "Product CTA must be visible");
        }
      }
    }
    await page.goto(origin + "/#solutions", { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#solutions .eyebrow").getBoundingClientRect().top >= document.querySelector(".site-header").getBoundingClientRect().bottom + 28 && document.querySelector("#solutions .eyebrow").getBoundingClientRect().top < innerHeight - 40);
    await page.locator(".solution-item summary").nth(2).click();
    assert.equal(await page.locator(".solution-item[open]").count(), 1);
    // Resizing disclosures must not corrupt cached navigation positions.
    await page.evaluate(() => document.querySelector('a[href="/#about"]').click());
    await page.waitForFunction(() => document.querySelector("#about .eyebrow").getBoundingClientRect().top >= document.querySelector(".site-header").getBoundingClientRect().bottom + 28 && document.querySelector("#about .eyebrow").getBoundingClientRect().top < innerHeight - 40);
    await page.goBack();
    await page.waitForFunction(() => location.hash === "#solutions");
    await page.waitForFunction(() => document.querySelector("#solutions .eyebrow").getBoundingClientRect().top >= document.querySelector(".site-header").getBoundingClientRect().bottom + 28 && document.querySelector("#solutions .eyebrow").getBoundingClientRect().top < innerHeight - 40);
    await page.goForward();
    await page.waitForFunction(() => location.hash === "#about");
    await page.waitForFunction(() => document.querySelector(".fold-page").classList.contains("fold-covered"));
    assert.ok(await page.locator("[data-build-terminal]").evaluate(el => el.classList.contains("is-paused")), "Covered terminal must stop");
    const pausedCopy = await page.locator("[data-client]").innerText();
    await page.waitForTimeout(160);
    assert.equal(await page.locator("[data-client]").innerText(), pausedCopy);
    await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.locator(".hero-actions a").first().focus();
    await page.waitForFunction(() => document.querySelector(".hero-actions a").getBoundingClientRect().top > 0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => [...document.querySelectorAll(".fold-sheet")].every(el => !el.style.transform));
    assert.equal(await page.locator(".fold-page").first().evaluate(el => getComputedStyle(el).position), "relative");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForFunction(() => getComputedStyle(document.querySelector(".fold-page")).position === "sticky");
    await page.close();
    console.log(`Fold OK: ${width}×${height}, long content, anchors, deep link, back, accordion, focus, reduced motion`);
  }
  const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await page.goto(origin);
  assert.equal(await page.locator(".fold-page").first().evaluate(el => getComputedStyle(el).position), "relative");
  assert.equal(await page.locator(".product-open").count(), 4);
  await page.close();
  assert.deepEqual(errors, []);
  console.log("Fold checks passed; no JavaScript fallback readable; no browser errors.");
} finally { await browser.close(); }
