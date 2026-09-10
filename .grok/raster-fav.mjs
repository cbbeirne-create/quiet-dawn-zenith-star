import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const svg = readFileSync("/workspace/public/favicon.svg", "utf8");
const html = `<!doctype html>
<html>
<body style="margin:0;background:#9aa39a">
  <div style="display:flex;gap:16px;padding:16px;align-items:center">
    <img id="i16" width="16" height="16" src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}">
    <img id="i32" width="32" height="32" src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}">
    <img id="i64" width="64" height="64" src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}">
  </div>
</body>
</html>`;
writeFileSync("/workspace/.grok/fav.html", html);

const browser = await chromium.launch({
  executablePath:
    "/opt/pw-browsers/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 220, height: 120 }, deviceScaleFactor: 1 });
await page.goto("file:///workspace/.grok/fav.html");
await page.locator("#i16").screenshot({ path: "/workspace/.grok/favicon-16.png" });
await page.locator("#i32").screenshot({ path: "/workspace/.grok/favicon-32.png" });
await page.locator("#i64").screenshot({ path: "/workspace/.grok/favicon-64.png" });
await browser.close();
console.log("rasterized");
