import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPagePOM } from '../pages/login-pom.spec';
import { testData } from '../pages/test-data.spec';

export class MakingAnOrder {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
  }

  test('verifies if user can login using standard account', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingIn(testData.login, testData.password);
})

  test('verifies if user cant login using locked out account', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithLockedOutUser(testData.lockedOutUser, testData.password);
})

test('verifies if user can login using glitched account', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithGlitchedUser(testData.performanceGlitchUser, testData.password);
})