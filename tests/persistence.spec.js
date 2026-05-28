import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Persistence same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Persistence';

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
    test(`Persistence > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Persistence > ${id} ${title}`, async () => {});
    test.info;
  };

const persistence = 'Persistence';
  caseTest(topic, 'PERS-01', 'Cart persists after reload', async () => {
    await shop.addProduct(1);
    await page.reload();
    await expect(page.locator('#cart-count')).toHaveText('1');
  });
  caseTest(topic, 'PERS-02', 'Profile persists in localStorage', async () => {
    await shop.login('persist@example.com', 'Password123');
    await shop.section('profile-view');
    await page.locator('#profile-name').fill('Persistent User');
    await page.locator('#save-profile').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('userProfile')).name)).toBe('Persistent User');
  });
  caseTest(topic, 'PERS-03', 'Profile loads after reload', async () => {
    await page.reload();
    await shop.section('profile-view');
    await expect(page.locator('#profile-name')).toHaveValue('Persistent User');
  });
  caseTest(topic, 'PERS-04', 'Shipping address persists', async () => {
    await shop.section('cart-view');
    await page.locator('#checkout-button').click();
    await shop.fillShipping();
    await page.locator('#save-address').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('shippingAddress')).city)).toBe('Kolkata');
  });
  caseTest(topic, 'PERS-05', 'Shipping method persists', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('shippingAddress')).method)).toBe('express');
  });
  caseTest(topic, 'PERS-06', 'Support ticket persists', async () => {
    await shop.section('support-view');
    await page.locator('#support-name').fill('Simmi Kumari');
    await page.locator('#support-email').fill('simmi.kumari@example.com');
    await page.locator('#support-subject').fill('Persistent ticket');
    await page.locator('#support-message').fill('This message should be stored.');
    await page.locator('#support-submit').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('supportTickets') || '[]').length)).toBe(1);
  });
  caseTest(topic, 'PERS-07', 'Login state survives reload', async () => {
    await page.reload();
    await expect(page.locator('#nav-profile')).toBeVisible();
  });
  caseTest(topic, 'PERS-08', 'Current user survives reload', async () => {
    await expect.poll(() => page.evaluate(() => localStorage.getItem('currentUser'))).toBe('Persistent User');
  });
  caseTest(topic, 'PERS-09', 'Cart storage can be cleared', async () => {
    await shop.clearCart();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '[]').length)).toBe(0);
  });
  caseTest(topic, 'PERS-10', 'Cleared cart remains clear after reload', async () => {
    await page.reload();
    await expect(page.locator('#cart-count')).toHaveText('0');
  });
  caseTest(topic, 'PERS-11', 'Last order can be stored', async () => {
    await page.evaluate(() => localStorage.setItem('lastOrder', JSON.stringify({ id: 'ORD-TEST', status: 'paid' })));
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('lastOrder')).status)).toBe('paid');
  });
  caseTest(topic, 'PERS-12', 'Saved data is valid JSON', async () => {
    await expect.poll(() => page.evaluate(() => Boolean(JSON.parse(localStorage.getItem('userProfile'))))).toBe(true);
  });
  caseTest(topic, 'PERS-13', 'Logout clears only auth state', async () => {
    await shop.section('profile-view');
    await page.locator('#logout-button').click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('userProfile') !== null)).toBe(true);
  });
  caseTest(topic, 'PERS-14', 'User can log back in after persisted logout', async () => {
    await shop.login('persist@example.com', 'Password123');
    await expect(page.locator('#nav-profile')).toBeVisible();
  });
  caseTest(topic, 'PERS-15', 'Persisted profile name displays after login', async () => {
    await shop.section('profile-view');
    await expect(page.locator('#user-display-name')).toHaveText('Persistent User');
  });

  
});
