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

test('verifies if user cant login using incorrect username and valid password', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithIncorrectUsername(testData.incorrectUsername, testData.password);
})

test('verifies if user cant login using valid username and incorrect password', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithIncorrectPassword(testData.incorrectUsername, testData.incorrectPassword);
})

test('verifies if user cant login without entering any credentials', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithoutAnyCredentials();
})

test('verifies if user cant login when entering only username', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);

    await loginPage.goto();
    await loginPage.loggingInWithUsernameOnly(testData.login);
})