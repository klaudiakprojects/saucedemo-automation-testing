import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPagePOM } from '../pages/login-pom.spec';
import { BasketPagePOM } from '../pages/basket-pom.spec';
import { CheckoutPagePOM } from '../pages/checkout-pom.spec';
import { ProductPagePOM } from '../pages/product-page-pom.spec';
import { testData } from '../pages/test-data.spec';

export class MakingAnOrder {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

test('Order flow testing', async ({ page }) => {
  const loginPage = new LoginPagePOM(page);
  const basketPage = new BasketPagePOM(page);
  const checkoutPage = new CheckoutPagePOM(page);
  const productPage = new ProductPagePOM(page);

  await loginPage.goto();
  await loginPage.loggingIn(testData.login, testData.password);
  await productPage.choosingItem(testData.item, testData.itemPrice);
  await basketPage.checkingCart(testData.item, testData.itemPrice);
  await checkoutPage.checkout(testData.firstName, testData.lastName, testData.postalCode);
  await checkoutPage.checkoutVerifying(testData.item, testData.itemPrice);
});
