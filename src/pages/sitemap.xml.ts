import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) => {
  const location = site?.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${location ? `<url><loc>${location}</loc></url>` : ""}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
