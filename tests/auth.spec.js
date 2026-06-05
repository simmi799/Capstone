import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Authentication same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Authentication';

  test.beforeAll(async ({ browser }, testInfo) => {
    context = await browser.newContext();
    page = await context.newPage();
    shop = new ShopPage(page);
    locators = createPageFactory(page);
    browserName = testInfo.project.name;
    await shop.open();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.afterAll(async () => {
    await context?.close();
  });

  const caseTest = (topicName, id, title, action) => {
    test(`Authentication > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Authentication > ${id} ${title}`, async () => {});
    test.info;
  };

const auth = 'Authentication';
  caseTest(topic, 'AUTH-01', 'Login page opens from navigation', async () => {
    await shop.section('auth-view');
    await expect(page.locator('#auth-view')).toBeVisible();
  });
  caseTest(topic, 'AUTH-02', 'Email field is visible', async () => {
    await expect(page.locator('#login-email')).toBeVisible();
  });
  caseTest(topic, 'AUTH-03', 'Password field is visible', async () => {
    await expect(page.locator('#login-password')).toBeVisible();
  });
  caseTest(topic, 'AUTH-04', 'Invalid login shows validation message', async () => {
    await page.locator('#login-email').fill('wrong');
    await page.locator('#login-password').fill('123');
    await page.locator('#login-button').click();
    await expect(page.locator('#auth-message')).toContainText('valid email');
  });
  caseTest(topic, 'AUTH-05', 'Valid login succeeds', async () => {
    await shop.login('student@example.com', 'Password123');
    await expect(page.locator('#auth-message')).toContainText('Login successful');
  });
  caseTest(topic, 'AUTH-06', 'Login hides login navigation link', async () => {
    await expect(page.locator('#nav-login')).toBeHidden();
  });
  caseTest(topic, 'AUTH-07', 'Login shows profile navigation link', async () => {
    await expect(page.locator('#nav-profile')).toBeVisible();
  });
  caseTest(topic, 'AUTH-08', 'Login flag is stored', async () => {
    await expect.poll(() => page.evaluate(() => localStorage.getItem('isLoggedIn'))).toBe('true');
  });
  caseTest(topic, 'AUTH-09', 'Current user is stored', async () => {
    await expect.poll(() => page.evaluate(() => localStorage.getItem('currentUser'))).toBeTruthy();
  });
  caseTest(topic, 'AUTH-10', 'Profile greeting uses stored user', async () => {
    await shop.section('profile-view');
    await expect(page.locator('#user-display-name')).not.toHaveText('');
  });
  caseTest(topic, 'AUTH-11', 'Signup path creates account', async () => {
    await page.locator('#logout-button').click();
    await shop.signup('created@example.com', 'Password123');
    await expect(page.locator('#auth-message')).toContainText('Account created');
  });
  caseTest(topic, 'AUTH-12', 'Session remains after reload', async () => {
    await page.reload();
    await expect(page.locator('#nav-profile')).toBeVisible();
  });
  caseTest(topic, 'AUTH-13', 'Logout button is available in profile', async () => {
    await shop.section('profile-view');
    await expect(page.locator('#logout-button')).toBeVisible();
  });
  caseTest(topic, 'AUTH-14', 'Logout clears login flag', async () => {
    await page.locator('#logout-button').click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('isLoggedIn'))).toBeNull();
  });
  caseTest(topic, 'AUTH-15', 'Logout returns user to product section', async () => {
    await expect(page.locator('#products')).toBeVisible();
  });
});
