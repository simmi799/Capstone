import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Product same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Product';

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
    test(`Product > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Product > ${id} ${title}`, async () => {});
    test.info;
  };

const product = 'Product';
  caseTest(topic, 'PROD-01', 'Product page shows heading', async () => {
    await shop.section('products');
    await expect(page.locator('#products h2')).toHaveText('Products');
  });
  caseTest(topic, 'PROD-02', 'Product list has three items', async () => {
    await expect(page.locator('.product-card')).toHaveCount(3);
  });
  caseTest(topic, 'PROD-03', 'Product names are visible', async () => {
    await expect(page.locator('.product-card h3')).toContainText(['Product 1', 'Product 2', 'Product 3']);
  });
  caseTest(topic, 'PROD-04', 'Product prices are visible', async () => {
    await expect(page.locator('#product-list')).toContainText('$19.99');
  });
  caseTest(topic, 'PROD-05', 'Product categories are visible', async () => {
    await expect(page.locator('#product-list')).toContainText('electronics');
  });
  caseTest(topic, 'PROD-06', 'Search finds Product 2', async () => {
    await page.locator('#search').fill('Product 2');
    await page.locator('#search-button').click();
    await expect(page.locator('.product-card')).toHaveCount(1);
    await expect(page.locator('.product-card')).toContainText('Product 2');
  });
  caseTest(topic, 'PROD-07', 'Clear search restores products', async () => {
    await page.locator('#clear-search').click();
    await expect(page.locator('.product-card')).toHaveCount(3);
  });
  caseTest(topic, 'PROD-08', 'Category filter works', async () => {
    await page.locator('#category-filter').selectOption('home');
    await page.locator('#search-button').click();
    await expect(page.locator('.product-card')).toHaveCount(1);
    await expect(page.locator('.product-card')).toContainText('Product 3');
  });
  caseTest(topic, 'PROD-09', 'Product detail opens', async () => {
    await page.locator('#clear-search').click();
    await page.locator('[data-action="details"][data-id="1"]').click();
    await expect(page.locator('#product-detail')).toContainText('Product 1 by Simmi');
  });
  caseTest(topic, 'PROD-10', 'Stock text is present', async () => {
    await expect(page.locator('[data-stock="1"]')).toHaveText('9');
  });
  caseTest(topic, 'PROD-11', 'Rating text is present', async () => {
    await expect(page.locator('#product-list')).toContainText('4.8');
  });
  caseTest(topic, 'PROD-12', 'Add to cart button is visible', async () => {
    await expect(page.locator('[data-action="add"][data-id="1"]')).toBeVisible();
  });
  caseTest(topic, 'PROD-13', 'Brand search works', async () => {
    await page.locator('#search').fill('Capstone');
    await page.locator('#search-button').click();
    await expect(page.locator('.product-card')).toContainText('Product 2');
  });
  caseTest(topic, 'PROD-14', 'No-result search renders empty list', async () => {
    await page.locator('#search').fill('No Such Product');
    await page.locator('#search-button').click();
    await expect(page.locator('.product-card')).toHaveCount(0, { timeout: 500 });
  });
  caseTest(topic, 'PROD-15', 'Product section can recover after no-result search', async () => {
    await page.locator('#clear-search').click();
    await expect(page.locator('.product-card')).toHaveCount(99);
  });

  
});
