import { expect } from '@playwright/test';
import { createPageFactory } from './pageFactory.js';

export class ShopPage {
  constructor(page) {
    this.page = page;
    this.locators = createPageFactory(page);
  }

  async open() {
    await this.page.goto('./');
    await expect(this.locators.header.title).toHaveText('SimpleShop');
  }

  async section(id) {
    await this.locators.header.nav(id).click();
  }

  async login(email = 'student@example.com', password = 'Password123') {
    await this.section('auth-view');
    await this.locators.auth.email.fill(email);
    await this.locators.auth.password.fill(password);
    await this.locators.auth.loginButton.click();
  }

  async signup(email = 'new.student@example.com', password = 'Password123') {
    await this.section('auth-view');
    await this.locators.auth.email.fill(email);
    await this.locators.auth.password.fill(password);
    await this.locators.auth.signupButton.click();
  }

  async addProduct(id) {
    await this.section('products');
    await this.locators.products.addButton(id).click();
  }

  async openCart() {
    await this.section('cart-view');
  }

  async clearCart() {
    await this.openCart();
    await this.locators.cart.clearCart.click();
  }

  async fillShipping() {
    await this.locators.shipping.name.fill('Simmi Kumari');
    await this.locators.shipping.address.fill('221 Test Street');
    await this.locators.shipping.city.fill('Kolkata');
    await this.locators.shipping.state.fill('West Bengal');
    await this.locators.shipping.zip.fill('700001');
    await this.locators.shipping.method.selectOption('express');
  }

  async fillPayment() {
    await this.locators.payment.cardName.fill('Simmi Kumari');
    await this.locators.payment.cardNumber.fill('4111111111111111');
    await this.locators.payment.expiry.fill('12/30');
    await this.locators.payment.cvv.fill('123');
  }
}
