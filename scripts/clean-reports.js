import fs from 'node:fs';

[
  'allure-results',
  'allure-report',
  'playwright-report',
  'test-results'
].forEach(folder => {
  fs.rmSync(folder, { recursive: true, force: true });
});

console.log('Cleaned previous Playwright and Allure report output.');
