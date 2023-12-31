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

test('order flow', async ({ page }) => {
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

test('deleting one and only product from basket', async ({ page }) => {
  const loginPage = new LoginPagePOM(page);
  const productPage = new ProductPagePOM(page);
  const basketPage = new BasketPagePOM(page);

  await loginPage.goto();
  await loginPage.loggingIn(testData.login, testData.password);
  await productPage.choosingItem(testData.item, testData.itemPrice);
  await basketPage.removingFirstItemFromBasket(testData.item);

});

test('deleting one of two products from the basket', async ({ page }) => {
  const loginPage = new LoginPagePOM(page);
  const productPage = new ProductPagePOM(page);
  const basketPage = new BasketPagePOM(page);

  await loginPage.goto();
  await loginPage.loggingIn(testData.login, testData.password);
  await productPage.choosingTwoItems(testData.item, testData.itemPrice, testData.item2, testData.itemPrice2);
  await basketPage.removingOneOfTwoItemsFromBasket(testData.item, testData.item2);

});


