import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('API Internal same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'API Internal';

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
    test(`API Internal > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`API Internal > ${id} ${title}`, async () => {});
    test.info;
  };

const api = 'API Internal';
  caseTest(topic, 'API-01', 'Product list API returns status 200', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.listProducts().then(r => r.status))).toBe(200);
  });
  caseTest(topic, 'API-02', 'Product list API returns three products', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.listProducts().then(r => r.data.length))).toBe(3);
  });
  caseTest(topic, 'API-03', 'Product detail API returns Product 1', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getProduct(1).then(r => r.data.name))).toBe('Product 1');
  });
  caseTest(topic, 'API-04', 'Missing product API returns null', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getProduct(999).then(r => r.data))).toBeNull();
  });
  caseTest(topic, 'API-05', 'Cart API returns current cart array', async () => {
    await shop.addProduct(2);
    await expect.poll(() => page.evaluate(() => window.shopApi.getCart().then(r => Array.isArray(r.data)))).toBe(true);
  });
  caseTest(topic, 'API-06', 'Cart API includes product id', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getCart().then(r => r.data.some(i => i.id === 2)))).toBe(true);
  });
  caseTest(topic, 'API-07', 'Ticket API returns 201', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.createTicket({ subject: 'API ticket' }).then(r => r.status))).toBe(201);
  });
  caseTest(topic, 'API-08', 'Ticket API returns generated id', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.createTicket({ subject: 'API ticket' }).then(r => r.data.id))).toBe('API-TICKET-1');
  });
  caseTest(topic, 'API-09', 'Payment API approves positive amount', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.createPayment({ amount: 10 }).then(r => r.data.approved))).toBe(true);
  });
  caseTest(topic, 'API-10', 'Payment API rejects zero amount', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.createPayment({ amount: 0 }).then(r => r.status))).toBe(400);
  });
  caseTest(topic, 'API-11', 'API product shape has price', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getProduct(2).then(r => typeof r.data.price))).toBe('number');
  });
  caseTest(topic, 'API-12', 'API product shape has category', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getProduct(2).then(r => r.data.category))).toBe('accessories');
  });
  caseTest(topic, 'API-13', 'API product shape has stock', async () => {
    await expect.poll(() => page.evaluate(() => window.shopApi.getProduct(3).then(r => r.data.stock))).toBe(4);
  });
  caseTest(topic, 'API-14', 'API can be called after page navigation', async () => {
    await shop.section('cart-view');
    await expect.poll(() => page.evaluate(() => window.shopApi.listProducts().then(r => r.status))).toBe(200);
  });
  caseTest(topic, 'API-15', 'API remains available after reload', async () => {
    await page.reload();
    await expect.poll(() => page.evaluate(() => typeof window.shopApi.listProducts)).toBe('function');
  });

  
});
