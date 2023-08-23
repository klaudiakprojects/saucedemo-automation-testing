import { test, expect } from '@playwright/test';



test('verifies if the products details are visible on the main page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  const inventoryItems = await page.locator('.inventory_item').all()

  for await (const elem of inventoryItems) {
    const itemNameLocator = elem.locator('.inventory_item_name');
    await expect(itemNameLocator).toBeVisible();
    expect((await itemNameLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
    
    const itemPriceLocator = elem.locator('.inventory_item_price');
    await expect(itemPriceLocator).toBeVisible();
    expect((await itemPriceLocator.textContent())?.length ?? 0).toBeGreaterThan(0);

    const addToCartButtonLocator = elem.locator('.btn_inventory');
    await expect(addToCartButtonLocator).toBeVisible();
    expect((await addToCartButtonLocator.textContent())?.length ?? 0).toBeGreaterThan(0);

    const itemDescriptionLocator = elem.locator('.inventory_item_desc');
    await expect(itemDescriptionLocator).toBeVisible();
    expect((await itemDescriptionLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
  }
  
});

