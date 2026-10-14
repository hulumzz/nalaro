import type { APIRoute } from "astro";

// Publish canonical pages belonging to this hostname only.
const routes = ["/", "/faq/", "/privacy-policy/", "/terms-of-use/"];
const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const GET: APIRoute = ({ site }) => {
  if (!site) return new Response("Sitemap unavailable", { status: 503 });
  const urls = routes.map(route => "  <url><loc>" + escapeXml(new URL(route, site).toString()) + "</loc></url>").join("\n");
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n';
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
