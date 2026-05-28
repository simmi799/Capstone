export function createPageFactory(page) {
  const locatorById = id => page.locator(`#${id}`);
  const locatorByClassName = className => page.locator(`.${className}`);
  const locatorByTagName = tagName => page.locator(tagName);
  const locatorByCss = cssSelector => page.locator(cssSelector);
  const locatorByAttribute = (attributeName, attributeValue) => page.locator(`[${attributeName}="${attributeValue}"]`);
  const locatorByMultipleAttributes = attributes => {
    const selector = Object.entries(attributes)
      .map(([name, value]) => `[${name}="${value}"]`)
      .join('');
    return page.locator(selector);
  };

  return {
    header: {
      title: locatorByTagName('h1'),
      loginLink: locatorById('nav-login'),
      profileLink: locatorById('nav-profile'),
      cartCount: locatorById('cart-count'),
      nav: sectionId => locatorByAttribute('data-nav', sectionId)
    },
    products: {
      section: locatorById('products'),
      heading: locatorByCss('#products h2'),
      search: locatorById('search'),
      categoryFilter: locatorById('category-filter'),
      searchButton: locatorById('search-button'),
      clearSearch: locatorById('clear-search'),
      list: locatorById('product-list'),
      cards: locatorByClassName('product-card'),
      productImage: locatorByCss('.product-card img'),
      names: locatorByCss('.product-card h3'),
      metaText: locatorByCss('.product-card .meta'),
      detail: locatorById('product-detail'),
      addButton: id => locatorByMultipleAttributes({ 'data-action': 'add', 'data-id': id }),
      detailsButton: id => locatorByMultipleAttributes({ 'data-action': 'details', 'data-id': id }),
      stock: id => locatorByAttribute('data-stock', id)
    },
    auth: {
      section: locatorById('auth-view'),
      email: locatorById('login-email'),
      password: locatorById('login-password'),
      loginButton: locatorById('login-button'),
      signupButton: locatorById('signup-button'),
      message: locatorById('auth-message')
    },
    cart: {
      section: locatorById('cart-view'),
      emptyMessage: locatorById('empty-cart-message'),
      table: locatorById('cart-table'),
      tableRows: locatorByCss('#cart-table tr'),
      items: locatorById('cart-items'),
      subtotal: locatorById('cart-subtotal'),
      continueShopping: locatorById('continue-shopping'),
      checkoutButton: locatorById('checkout-button'),
      clearCart: locatorById('clear-cart'),
      qty: id => locatorByAttribute('data-qty', id),
      removeButton: id => locatorByMultipleAttributes({ 'data-action': 'remove', 'data-id': id })
    },
    shipping: {
      section: locatorById('shipping-view'),
      name: locatorById('ship-name'),
      address: locatorById('address'),
      city: locatorById('city'),
      state: locatorById('state'),
      zip: locatorById('zip'),
      method: locatorById('shipping-method'),
      saveAddress: locatorById('save-address'),
      toPayment: locatorById('to-payment'),
      message: locatorById('shipping-message')
    },
    payment: {
      section: locatorById('payment-view'),
      heading: locatorByCss('#payment-view h2'),
      cardName: locatorById('card-name'),
      cardNumber: locatorById('card-number'),
      expiry: locatorById('card-expiry'),
      cvv: locatorById('card-cvv'),
      method: locatorById('payment-method'),
      payButton: locatorById('pay-button'),
      message: locatorById('payment-message')
    },
    profile: {
      section: locatorById('profile-view'),
      displayName: locatorById('user-display-name'),
      name: locatorById('profile-name'),
      phone: locatorById('profile-phone'),
      email: locatorById('profile-email'),
      saveProfile: locatorById('save-profile'),
      loadProfile: locatorById('load-profile'),
      logoutButton: locatorById('logout-button'),
      message: locatorById('profile-message')
    },
    support: {
      section: locatorById('support-view'),
      name: locatorById('support-name'),
      email: locatorById('support-email'),
      subject: locatorById('support-subject'),
      message: locatorById('support-message'),
      priority: locatorById('support-priority'),
      submit: locatorById('support-submit'),
      result: locatorById('support-result')
    },
    footer: locatorById('site-footer')
  };
}
