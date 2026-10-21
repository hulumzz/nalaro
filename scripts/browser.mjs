import { chromium } from "@playwright/test";
export const launchBrowser = () => chromium.launch({
  headless: true,
  ...(process.env.TEST_BROWSER ? { channel: process.env.TEST_BROWSER } : {}),
  ...(process.env.TEST_BROWSER_PATH ? { executablePath: process.env.TEST_BROWSER_PATH } : {}),
});
