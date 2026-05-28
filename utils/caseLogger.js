import fs from 'node:fs';
import path from 'node:path';

const resultsDir = path.resolve('automation-results');
const screenshotsDir = path.resolve('screenshots', 'failed');
const resultsFile = path.join(resultsDir, 'case-results.jsonl');

export function resetResults() {
  fs.rmSync(resultsDir, { recursive: true, force: true });
  fs.rmSync(screenshotsDir, { recursive: true, force: true });
  fs.mkdirSync(resultsDir, { recursive: true });
  fs.mkdirSync(screenshotsDir, { recursive: true });
  fs.writeFileSync(resultsFile, '', 'utf8');
}

export async function runCase({ page, browserName, topic, id, title, action }) {
  const startedAt = Date.now();
  const record = {
    browser: browserName,
    topic,
    id,
    title,
    status: 'passed',
    durationMs: 0,
    screenshot: '',
    error: ''
  };

  try {
    await action();
  } catch (error) {
    record.status = 'failed';
    record.error = error.message;
    if (!page.isClosed()) {
      const safeName = `${browserName}-${topic}-${id}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
      const screenshotPath = path.join(screenshotsDir, `${safeName}.png`);
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        record.screenshot = path.relative(process.cwd(), screenshotPath).replace(/\\/g, '/');
      } catch (screenshotError) {
        record.error = `${record.error} | screenshot failed: ${screenshotError.message}`;
      }
    }
  } finally {
    record.durationMs = Date.now() - startedAt;
    fs.appendFileSync(resultsFile, `${JSON.stringify(record)}\n`, 'utf8');
  }

  if (record.status === 'failed') {
    throw new Error(`${topic} ${id} failed: ${record.error}`);
  }
}
