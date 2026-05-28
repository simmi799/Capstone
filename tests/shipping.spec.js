import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Address Shipping same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Address Shipping';

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
    test(`Address Shipping > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Address Shipping > ${id} ${title}`, async () => {});
    test.info;
  };

const shipping = 'Address Shipping';
  caseTest(topic, 'SHIP-01', 'Shipping page opens from checkout', async () => {
    await shop.addProduct(1);
    await shop.openCart();
    await page.locator('#checkout-button').click();
    await expect(page.locator('#shipping-view')).toBeVisible();
  });
  caseTest(topic, 'SHIP-02', 'Name field accepts text', async () => {
    await page.locator('#ship-name').fill('Simmi Kumari Student');
    await expect(page.locator('#ship-name')).toHaveValue('Simmi Kumari Student');
  });
  caseTest(topic, 'SHIP-03', 'Address field accepts text', async () => {
    await page.locator('#address').fill('221 Test Street');
    await expect(page.locator('#address')).toHaveValue('221 Test Street');
  });
  caseTest(topic, 'SHIP-04', 'City field accepts text', async () => {
    await page.locator('#city').fill('Kolkata');
    await expect(page.locator('#city')).toHaveValue('Kolkata');
  });
  caseTest(topic, 'SHIP-05', 'State field accepts text', async () => {
    await page.locator('#state').fill('West Bengal');
    await expect(page.locator('#state')).toHaveValue('West Bengal');
  });
  caseTest(topic, 'SHIP-06', 'Zip field accepts valid zip', async () => {
    await page.locator('#zip').fill('700001');
    await expect(page.locator('#zip')).toHaveValue('700001');
  });
  caseTest(topic, 'SHIP-07', 'Shipping method can be changed', async () => {
    await page.locator('#shipping-method').selectOption('express');
    await expect(page.locator('#shipping-method')).toHaveValue('express');
  });
  caseTest(topic, 'SHIP-08', 'Invalid address shows validation', async () => {
    await page.locator('#zip').fill('abc');
    await page.locator('#save-address').click();
    await expect(page.locator('#shipping-message')).toContainText('complete shipping address');
  });
  caseTest(topic, 'SHIP-09', 'Valid address saves', async () => {
    await page.locator('#zip').fill('700001');
    await page.locator('#save-address').click();
    await expect(page.locator('#shipping-message')).toContainText('Shipping address saved');
  });
  caseTest(topic, 'SHIP-10', 'Saved address is stored', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('shippingAddress')).address)).toBe('221 Test Street');
  });
  caseTest(topic, 'SHIP-11', 'Saved city is stored', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('shippingAddress')).city)).toBe('Kolkata');
  });
  caseTest(topic, 'SHIP-12', 'Continue to payment opens payment page', async () => {
    await page.locator('#to-payment').click();
    await expect(page.locator('#payment-view')).toBeVisible();
  });
  caseTest(topic, 'SHIP-13', 'Returning to cart from nav works', async () => {
    await shop.openCart();
    await expect(page.locator('#cart-view')).toBeVisible();
  });
  caseTest(topic, 'SHIP-14', 'Checkout can reopen saved shipping form', async () => {
    await page.locator('#checkout-button').click();
    await expect(page.locator('#shipping-view')).toBeVisible();
  });
  caseTest(topic, 'SHIP-15', 'Shipping form still contains selected method', async () => {
    await expect(page.locator('#shipping-method')).toHaveValue('express');
  });

  
});
