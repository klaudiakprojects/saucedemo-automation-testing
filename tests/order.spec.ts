import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPagePOM } from '../pages/login-pom.spec';
import { BasketPagePOM } from '../pages/basket-pom.spec';
import { CheckoutPagePOM } from '../pages/checkout-pom.spec';
import { ProductPagePOM } from '../pages/product-page-pom.spec';



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


  // Given
  const login = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'Name';
  const lastName = 'Surname';
  const postalCode = '11-000';
  const item = 'Sauce Labs Backpack';
  const itemPrice = '$29.99';

  await loginPage.goto();
  await loginPage.loggingIn(login, password);
  await productPage.choosingItem(item, itemPrice);
  await basketPage.checkingCart(item, itemPrice);
  await checkoutPage.checkout(firstName, lastName, postalCode);
  await checkoutPage.checkoutVerifying(item, itemPrice);
});
