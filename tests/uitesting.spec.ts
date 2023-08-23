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
  
  // const inventoryItems = await page.locator('.inventory_item').all()

  // for await (const elem of inventoryItems) {
  //   const itemNameLocator = elem.locator('.inventory_item_name');
  //   await expect(itemNameLocator).toBeVisible();
  //   expect((await itemNameLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
    
  //   const itemPriceLocator = elem.locator('.inventory_item_price');
  //   await expect(itemPriceLocator).toBeVisible();
  //   expect((await itemPriceLocator.textContent())?.length ?? 0).toBeGreaterThan(0);

  //   const addToCartButtonLocator = elem.locator('.btn_inventory');
  //   await expect(addToCartButtonLocator).toBeVisible();
  //   expect((await addToCartButtonLocator.textContent())?.length ?? 0).toBeGreaterThan(0);

  //   const itemImageLocator = elem.locator('img.inventory_item_img');
  //   const itemSourceAttribute = await itemImageLocator.getAttribute('src');
  //   expect(itemSourceAttribute).not.toBeNull();

  //   const itemDescriptionLocator = elem.locator('.inventory_item_desc');
  //   await expect(itemDescriptionLocator).toBeVisible();
  //   expect((await itemDescriptionLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
  // }
  
});

