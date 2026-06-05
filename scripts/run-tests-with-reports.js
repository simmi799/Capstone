// import { spawnSync } from 'node:child_process';
// import fs from 'node:fs';

// const args = new Set(process.argv.slice(2));
// const allureOnly = args.has('--allure-only');
// const openPlaywright = args.has('--open-playwright');

// const folders = allureOnly
//   ? ['allure-results', 'allure-report']
//   : ['allure-results', 'allure-report', 'playwright-report', 'test-results'];

// folders.forEach(folder => fs.rmSync(folder, { recursive: true, force: true }));
// console.log(`Cleaned ${allureOnly ? 'Allure' : 'Playwright and Allure'} report output.`);

// const testRun = spawnSync('npx', ['playwright', 'test'], {
//   stdio: 'inherit',
//   shell: true
// });

// const allureRun = spawnSync('npm', ['run', 'allure:generate'], {
//   stdio: 'inherit',
//   shell: true
// });

// if (openPlaywright && !allureOnly) {
//   spawnSync('node', ['scripts/open-playwright-report.js'], {
//     stdio: 'inherit',
//     shell: true
//   });
// }

// if (testRun.status !== 0) {
//   console.log(`Playwright finished with ${testRun.status}. Reports were still generated so failed/skipped cases are visible.`);
// }

// if (allureRun.status !== 0) {
//   process.exitCode = allureRun.status;
// }
