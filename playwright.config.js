import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: './utils/globalSetup.js',
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  fullyParallel: false,
  workers: 1,
  timeout: 300000,
  expect: { timeout: 8000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173',
    headless: !!process.env.CI,
    screenshot: 'off',
    trace: 'retain-on-failure',
    video: 'off'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
