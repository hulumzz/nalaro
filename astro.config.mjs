// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "PUBLIC_");
const configuredSite = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || "https://nalaro.digital";
if (configuredSite && !/^https?:\/\//.test(configuredSite)) throw new Error("PUBLIC_SITE_URL must be an absolute http(s) URL.");
export default defineConfig({
  output: "static",
  vite: { plugins: [tailwindcss()] },
  site: configuredSite,
  devToolbar: { enabled: false },
});
