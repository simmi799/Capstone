import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Cart same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Cart';

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
    test(`Cart > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Cart > ${id} ${title}`, async () => {});
    test.info;
  };

const cart = 'Cart';
  caseTest(topic, 'CART-01', 'Cart opens from navigation', async () => {
    await shop.openCart();
    await expect(page.locator('#cart-view')).toBeVisible();
  });
  caseTest(topic, 'CART-02', 'Empty cart message is visible', async () => {
    await page.locator('#clear-cart').click();
    await expect(page.locator('#empty-cart-message')).toBeVisible();
  });
  caseTest(topic, 'CART-03', 'Adding one item updates cart count', async () => {
    await shop.addProduct(1);
    await expect(page.locator('#cart-count')).toHaveText('1');
  });
  caseTest(topic, 'CART-04', 'Adding second item updates cart count', async () => {
    await shop.addProduct(2);
    await expect(page.locator('#cart-count')).toHaveText('2');
  });
  caseTest(topic, 'CART-05', 'Cart table shows added items', async () => {
    await shop.openCart();
    await expect(page.locator('#cart-table')).toBeVisible();
    await expect(page.locator('#cart-items')).toContainText('Product 1');
  });
  caseTest(topic, 'CART-06', 'Subtotal is calculated', async () => {
    await expect(page.locator('#cart-subtotal')).toHaveText('49.98');
  });
  caseTest(topic, 'CART-07', 'Quantity can be updated', async () => {
    await page.locator('[data-qty="1"]').fill('3');
    await page.locator('[data-qty="1"]').dispatchEvent('change');
    await expect(page.locator('#cart-count')).toHaveText('4');
  });
  caseTest(topic, 'CART-08', 'Updated quantity changes subtotal', async () => {
    await expect(page.locator('#cart-subtotal')).toHaveText('89.96');
  });
  caseTest(topic, 'CART-09', 'Remove button removes an item', async () => {
    await page.locator('[data-action="remove"][data-id="2"]').click();
    await expect(page.locator('#cart-items')).not.toContainText('Product 2');
  });
  caseTest(topic, 'CART-10', 'Cart count reflects removal', async () => {
    await expect(page.locator('#cart-count')).toHaveText('3');
  });
  caseTest(topic, 'CART-11', 'Continue shopping returns to products', async () => {
    await page.locator('#continue-shopping').click();
    await expect(page.locator('#products')).toBeVisible();
  });
  caseTest(topic, 'CART-12', 'Checkout button opens shipping', async () => {
    await shop.openCart();
    await page.locator('#checkout-button').click();
    await expect(page.locator('#shipping-view')).toBeVisible();
  });
  caseTest(topic, 'CART-13', 'Cart data exists in localStorage', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '[]').length)).toBeGreaterThan(0);
  });
  caseTest(topic, 'CART-14', 'Clear cart removes items', async () => {
    await shop.clearCart();
    await expect(page.locator('#cart-count')).toHaveText('0');
  });
  caseTest(topic, 'CART-15', 'Cart table hides after clearing', async () => {
    await expect(page.locator('#cart-table')).toBeHidden();
  });

  
});
