import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('User Profile same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'User Profile';

  test.beforeAll(async ({ browser }, testInfo) => {
    context = await browser.newContext();
    page = await context.newPage();
    shop = new ShopPage(page);
    locators = createPageFactory(page);
    browserName = testInfo.project.name;
    await shop.open();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await shop.login('profile@example.com', 'Password123');
  });

  test.afterAll(async () => {
    await context?.close();
  });

  const caseTest = (topicName, id, title, action) => {
    test(`User Profile > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`User Profile > ${id} ${title}`, async () => {});
    test.info;
  };

const profile = 'User Profile';
  caseTest(topic, 'PROF-01', 'Profile page opens', async () => {
    await shop.section('profile-view');
    await expect(page.locator('#profile-view')).toBeVisible();
  });
  caseTest(topic, 'PROF-02', 'Name field is editable', async () => {
    await page.locator('#profile-name').fill('Simmi Kumari Tester');
    await expect(page.locator('#profile-name')).toHaveValue('Simmi Kumari Tester');
  });
  caseTest(topic, 'PROF-03', 'Phone field is editable', async () => {
    await page.locator('#profile-phone').fill('9876543210');
    await expect(page.locator('#profile-phone')).toHaveValue('9876543210');
  });
  caseTest(topic, 'PROF-04', 'Email field is editable', async () => {
    await page.locator('#profile-email').fill('tester@example.com');
    await expect(page.locator('#profile-email')).toHaveValue('tester@example.com');
  });
  caseTest(topic, 'PROF-05', 'Profile saves successfully', async () => {
    await page.locator('#save-profile').click();
    await expect(page.locator('#profile-message')).toContainText('Profile saved');
  });
  caseTest(topic, 'PROF-06', 'Greeting updates after profile save', async () => {
    await expect(page.locator('#user-display-name')).toHaveText('Simmi Kumari Tester');
  });
  caseTest(topic, 'PROF-07', 'Load profile button restores saved values', async () => {
    await page.locator('#profile-name').fill('Temporary');
    await page.locator('#load-profile').click();
    await expect(page.locator('#profile-name')).toHaveValue('Simmi Kumari Tester');
  });
  caseTest(topic, 'PROF-08', 'Profile storage has phone number', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('userProfile')).phone)).toBe('9876543210');
  });
  caseTest(topic, 'PROF-09', 'Profile storage has email', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('userProfile')).email)).toBe('tester@example.com');
  });
  caseTest(topic, 'PROF-10', 'Profile remains visible after save', async () => {
    await expect(page.locator('#profile-view')).toBeVisible();
  });
  caseTest(topic, 'PROF-11', 'Profile link remains available', async () => {
    await expect(page.locator('#nav-profile')).toBeVisible();
  });
  caseTest(topic, 'PROF-12', 'Profile values survive reload', async () => {
    await page.reload();
    await shop.section('profile-view');
    await expect(page.locator('#profile-email')).toHaveValue('tester@example.com');
  });
  caseTest(topic, 'PROF-13', 'Profile page contains logout button', async () => {
    await expect(page.locator('#logout-button')).toBeVisible();
  });
  caseTest(topic, 'PROF-14', 'Empty name saves as User fallback', async () => {
    await page.locator('#profile-name').fill('');
    await page.locator('#save-profile').click();
    await expect(page.locator('#user-display-name')).toHaveText('User');
  });
  caseTest(topic, 'PROF-15', 'Profile can be updated again', async () => {
    await page.locator('#profile-name').fill('Simmi Kumari Tester');
    await page.locator('#save-profile').click();
    await expect(page.locator('#user-display-name')).toHaveText('Simmi Kumari Tester');
  });

  
});
