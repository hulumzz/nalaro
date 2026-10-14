import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dist = "dist";
const canonicalRoutes = [
  ["/", "index.html"],
  ["/faq/", "faq/index.html"],
  ["/privacy-policy/", "privacy-policy/index.html"],
  ["/terms-of-use/", "terms-of-use/index.html"],
];
const read = filename => readFile(join(dist, filename), "utf8");
for (const [route, filename] of canonicalRoutes) {
  const html = await read(filename);
  assert.ok(html.includes('name="description"'), "Missing description " + route);
  assert.ok(html.includes('href="https://nalaro.digital' + route + '"'), "Missing canonical " + route);
  assert.ok(html.includes('type="application/ld+json"'), "Missing schema " + route);
  assert.ok(html.includes('https://nalaro.digital/og/nalaro-og.png'), "Missing OG " + route);
  assert.ok(html.includes('content="index, follow'), "Not indexable " + route);
  console.log("SEO OK:", route);
}
const homepage = await read("index.html");
for (const value of ["https://store.nalaro.digital", "https://class.nalaro.digital", "business@nalaro.digital", "BETTER"]) {
  assert.ok(homepage.includes(value), "Missing home content: " + value);
}
assert.equal((homepage.match(/<h1(?:\s|>)/g) || []).length, 1, "Home must have one H1");
const sitemap = await read("sitemap.xml");
const robots = await read("robots.txt");
for (const [route] of canonicalRoutes) assert.ok(sitemap.includes("<loc>https://nalaro.digital" + route + "</loc>"));
assert.ok(!sitemap.includes("store.nalaro.digital"), "Subdomain belongs to its own sitemap");
assert.ok(robots.includes("Sitemap: https://nalaro.digital/sitemap.xml"));
const notFound = await read("404.html");
assert.ok(notFound.includes('content="noindex, follow"'));
console.log("SEO checks passed for four canonical pages, robots, sitemap, schema and product links.");
