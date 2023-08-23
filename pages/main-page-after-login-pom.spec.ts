import { Locator, Page, expect } from "@playwright/test";

export class MainPageAfterLoginPOM {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly allInventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
    }

    async verifyingMainPageProductsDetails(): Promise<void> {
        const allInventoryItems = await this.inventoryItems.all();

    for await (const elem of allInventoryItems) {
        const itemNameLocator = elem.locator('.inventory_item_name');
        await expect(itemNameLocator).toBeVisible();
        expect((await itemNameLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
        
        const itemPriceLocator = elem.locator('.inventory_item_price');
        await expect(itemPriceLocator).toBeVisible();
        expect((await itemPriceLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
    
        const addToCartButtonLocator = elem.locator('.btn_inventory');
        await expect(addToCartButtonLocator).toBeVisible();
        expect((await addToCartButtonLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
    
        const itemImageLocator = elem.locator('img.inventory_item_img');
        const itemSourceAttribute = await itemImageLocator.getAttribute('src');
        expect(itemSourceAttribute).not.toBeNull();
    
        const itemDescriptionLocator = elem.locator('.inventory_item_desc');
        await expect(itemDescriptionLocator).toBeVisible();
        expect((await itemDescriptionLocator.textContent())?.length ?? 0).toBeGreaterThan(0);
      }
}}