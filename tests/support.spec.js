import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Customer Support same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Customer Support';

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
    test(`Customer Support > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Customer Support > ${id} ${title}`, async () => {});
    test.info;
  };

const support = 'Customer Support';
  caseTest(topic, 'SUP-01', 'Support page opens', async () => {
    await shop.section('support-view');
    await expect(page.locator('#support-view')).toBeVisible();
  });
  caseTest(topic, 'SUP-02', 'Support name field is visible', async () => {
    await expect(page.locator('#support-name')).toBeVisible();
  });
  caseTest(topic, 'SUP-03', 'Support email field is visible', async () => {
    await expect(page.locator('#support-email')).toBeVisible();
  });
  caseTest(topic, 'SUP-04', 'Support subject field is visible', async () => {
    await expect(page.locator('#support-subject')).toBeVisible();
  });
  caseTest(topic, 'SUP-05', 'Support message field is visible', async () => {
    await expect(page.locator('#support-message')).toBeVisible();
  });
  caseTest(topic, 'SUP-06', 'Support priority can be high', async () => {
    await page.locator('#support-priority').selectOption('high');
    await expect(page.locator('#support-priority')).toHaveValue('high');
  });
  caseTest(topic, 'SUP-07', 'Incomplete support ticket validates', async () => {
    await page.locator('#support-submit').click();
    await expect(page.locator('#support-result')).toContainText('complete all support fields');
  });
  caseTest(topic, 'SUP-08', 'Support name accepts text', async () => {
    await page.locator('#support-name').fill('Support User');
    await expect(page.locator('#support-name')).toHaveValue('Support User');
  });
  caseTest(topic, 'SUP-09', 'Support email accepts text', async () => {
    await page.locator('#support-email').fill('support@example.com');
    await expect(page.locator('#support-email')).toHaveValue('support@example.com');
  });
  caseTest(topic, 'SUP-10', 'Support subject accepts text', async () => {
    await page.locator('#support-subject').fill('Need help with order');
    await expect(page.locator('#support-subject')).toHaveValue('Need help with order');
  });
  caseTest(topic, 'SUP-11', 'Support message accepts text', async () => {
    await page.locator('#support-message').fill('My order needs manual review today.');
    await expect(page.locator('#support-message')).toHaveValue('My order needs manual review today.');
  });
  caseTest(topic, 'SUP-12', 'Support ticket submits', async () => {
    await page.locator('#support-submit').click();
    await expect(page.locator('#support-result')).toContainText('Ticket');
  });
  caseTest(topic, 'SUP-13', 'Support ticket is stored', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('supportTickets') || '[]').length)).toBeGreaterThan(0);
  });
  caseTest(topic, 'SUP-14', 'Stored support ticket has priority', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('supportTickets') || '[]').at(-1).priority)).toBe('high');
  });
  caseTest.skip(topic, 'SUP-15', 'Support navigation keeps single page app active', 'Intentional skipped case for report validation');
  // Original SUP-15 kept below as documentation of the skipped flow.
  if (false) caseTest(topic, 'SUP-15-DOC', 'Support navigation keeps single page app active', async () => {
    await shop.section('products');
    await shop.section('support-view');
    await expect(page.locator('#site-footer')).toBeVisible();
  });

  
});
