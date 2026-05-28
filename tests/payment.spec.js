import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page.js';
import { createPageFactory } from '../pages/pageFactory.js';
import { runCase } from '../utils/caseLogger.js';

test.describe('Payment same-tab tests', () => {
  let context;
  let page;
  let shop;
  let locators;
  let browserName;
  const topic = 'Payment';

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
    test(`Payment > ${id} ${title}`, async () => {
      await runCase({ page, browserName, topic: topicName, id, title, action });
    });
  };

  caseTest.skip = (topicName, id, title, reason) => {
    test.skip(`Payment > ${id} ${title}`, async () => {});
    test.info;
  };

const payment = 'Payment';
  caseTest(topic, 'PAY-01', 'Payment opens after valid shipping', async () => {
    await shop.addProduct(1);
    await shop.openCart();
    await page.locator('#checkout-button').click();
    await shop.fillShipping();
    await page.locator('#to-payment').click();
    await expect(page.locator('#payment-view')).toBeVisible();
  });
  caseTest(topic, 'PAY-02', 'Card name accepts text', async () => {
    await page.locator('#card-name').fill('Simmi Kumari Student');
    await expect(page.locator('#card-name')).toHaveValue('Simmi Kumari Student');
  });
  caseTest(topic, 'PAY-03', 'Card number accepts text', async () => {
    await page.locator('#card-number').fill('4111111111111111');
    await expect(page.locator('#card-number')).toHaveValue('4111111111111111');
  });
  caseTest(topic, 'PAY-04', 'Expiry accepts text', async () => {
    await page.locator('#card-expiry').fill('12/30');
    await expect(page.locator('#card-expiry')).toHaveValue('12/30');
  });
  caseTest(topic, 'PAY-05', 'CVV accepts text', async () => {
    await page.locator('#card-cvv').fill('123');
    await expect(page.locator('#card-cvv')).toHaveValue('123');
  });
  caseTest(topic, 'PAY-06', 'Payment method defaults to card', async () => {
    await expect(page.locator('#payment-method')).toHaveValue('card');
  });
  caseTest(topic, 'PAY-07', 'Invalid card is rejected', async () => {
    await page.locator('#card-number').fill('123');
    await page.locator('#pay-button').click();
    await expect(page.locator('#payment-message')).toContainText('valid 16 digit');
  });
  caseTest(topic, 'PAY-08', 'Valid card payment succeeds', async () => {
    await shop.fillPayment();
    await page.locator('#pay-button').click();
    await expect(page.locator('#payment-message')).toContainText('Payment successful');
  });
  caseTest(topic, 'PAY-09', 'Payment stores last order', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('lastOrder')).status)).toBe('paid');
  });
  caseTest(topic, 'PAY-10', 'Payment clears cart', async () => {
    await expect(page.locator('#cart-count')).toHaveText('0');
  });
  caseTest(topic, 'PAY-11', 'Cash on delivery option can be selected', async () => {
    await shop.addProduct(2);
    await shop.openCart();
    await page.locator('#checkout-button').click();
    await shop.fillShipping();
    await page.locator('#to-payment').click();
    await page.locator('#payment-method').selectOption('cod');
    await expect(page.locator('#payment-method')).toHaveValue('cod');
  });
  caseTest(topic, 'PAY-12', 'Cash on delivery payment succeeds without card number', async () => {
    await page.locator('#card-number').fill('');
    await page.locator('#pay-button').click();
    await expect(page.locator('#payment-message')).toContainText('Payment successful');
  });
  caseTest(topic, 'PAY-13', 'COD order stores method', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('lastOrder')).method)).toBe('cod');
  });
  caseTest(topic, 'PAY-14', 'Order id is generated', async () => {
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('lastOrder')).id.startsWith('ORD-'))).toBe(true);
  });
  caseTest(topic, 'PAY-15', 'Payment page remains readable after submit', async () => {
    await expect(page.locator('#payment-view h2')).toHaveText('Payment');
  });

});
