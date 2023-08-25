import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPagePOM } from '../pages/login-pom.spec';
import { testData } from '../pages/test-data.spec';
import { MainPageAfterLoginPOM } from '../pages/main-page-after-login-pom.spec';

export class MakingAnOrder {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
test('verifies if the products details are visible on the main page', async ({ page }) => {
  const loginPage = new LoginPagePOM(page);
  const mainPageAfterLogin = new MainPageAfterLoginPOM(page);

  await loginPage.goto();
  await loginPage.loggingIn(testData.login, testData.password);
  await mainPageAfterLogin.verifyingMainPageProductsDetails();

});

test('verifies if sorting works correctly', async ({ page }) => {
  const loginPage = new LoginPagePOM(page);
  const mainPageAfterLogin = new MainPageAfterLoginPOM(page)

  await loginPage.goto();
  await loginPage.loggingIn(testData.login, testData.password);
  await mainPageAfterLogin.sortLowToHighPrices();
  await mainPageAfterLogin.sortHighToLowPrices();

});

