# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product.spec.js >> Product same-tab tests >> Product > PROD-14 No-result search renders empty list
- Location: tests\product.spec.js:30:5

# Error details

```
Error: Product PROD-14 failed: expect(locator).toHaveCount(expected) failed

Locator:  locator('.product-card')
Expected: 1
Received: 0
Timeout:  500ms

Call log:
  - Expect "toHaveCount" with timeout 500ms
  - waiting for locator('.product-card')
    6 × locator resolved to 0 elements
      - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - heading "SimpleShop" [level=1] [ref=e3]
    - navigation "Main navigation" [ref=e4]:
      - link "Home" [ref=e5] [cursor=pointer]:
        - /url: "#"
      - link "Login" [ref=e6] [cursor=pointer]:
        - /url: "#"
      - link "Support" [ref=e7] [cursor=pointer]:
        - /url: "#"
      - link "Cart (0)" [ref=e8] [cursor=pointer]:
        - /url: "#"
  - main [ref=e9]:
    - generic [ref=e10]:
      - heading "Products" [level=2] [ref=e11]
      - generic [ref=e12]:
        - searchbox "Search products" [ref=e13]: No Such Product
        - combobox "Filter category" [ref=e14]:
          - option "All categories" [selected]
          - option "Electronics"
          - option "Accessories"
          - option "Home"
        - button "Search" [active] [ref=e15] [cursor=pointer]
        - button "Clear" [ref=e16] [cursor=pointer]
      - generic [ref=e17]: "Product 1 by Simmi: $19.99, 9 in stock, 4.2 rating."
  - contentinfo [ref=e18]: SimpleShop test store for Playwright automation.
```

# Test source

```ts
  1  | import fs from 'node:fs';
  2  | import path from 'node:path';
  3  | 
  4  | const resultsDir = path.resolve('automation-results');
  5  | const screenshotsDir = path.resolve('screenshots', 'failed');
  6  | const resultsFile = path.join(resultsDir, 'case-results.jsonl');
  7  | 
  8  | export function resetResults() {
  9  |   fs.rmSync(resultsDir, { recursive: true, force: true });
  10 |   fs.rmSync(screenshotsDir, { recursive: true, force: true });
  11 |   fs.mkdirSync(resultsDir, { recursive: true });
  12 |   fs.mkdirSync(screenshotsDir, { recursive: true });
  13 |   fs.writeFileSync(resultsFile, '', 'utf8');
  14 | }
  15 | 
  16 | export async function runCase({ page, browserName, topic, id, title, action }) {
  17 |   const startedAt = Date.now();
  18 |   const record = {
  19 |     browser: browserName,
  20 |     topic,
  21 |     id,
  22 |     title,
  23 |     status: 'passed',
  24 |     durationMs: 0,
  25 |     screenshot: '',
  26 |     error: ''
  27 |   };
  28 | 
  29 |   try {
  30 |     await action();
  31 |   } catch (error) {
  32 |     record.status = 'failed';
  33 |     record.error = error.message;
  34 |     if (!page.isClosed()) {
  35 |       const safeName = `${browserName}-${topic}-${id}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  36 |       const screenshotPath = path.join(screenshotsDir, `${safeName}.png`);
  37 |       try {
  38 |         await page.screenshot({ path: screenshotPath, fullPage: true });
  39 |         record.screenshot = path.relative(process.cwd(), screenshotPath).replace(/\\/g, '/');
  40 |       } catch (screenshotError) {
  41 |         record.error = `${record.error} | screenshot failed: ${screenshotError.message}`;
  42 |       }
  43 |     }
  44 |   } finally {
  45 |     record.durationMs = Date.now() - startedAt;
  46 |     fs.appendFileSync(resultsFile, `${JSON.stringify(record)}\n`, 'utf8');
  47 |   }
  48 | 
  49 |   if (record.status === 'failed') {
> 50 |     throw new Error(`${topic} ${id} failed: ${record.error}`);
     |           ^ Error: Product PROD-14 failed: expect(locator).toHaveCount(expected) failed
  51 |   }
  52 | }
  53 | 
```