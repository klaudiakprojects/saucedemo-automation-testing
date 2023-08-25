import { Locator, Page, expect } from "@playwright/test";

export class MainPageAfterLoginPOM {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly allInventoryItems: Locator;
    readonly sortButton: Locator;
    readonly itemsPriceLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.sortButton = page.locator('.product_sort_container');
        this.itemsPriceLocator = page.locator('.inventory_item_price');
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
    }

    async sortLowToHighPrices(): Promise<void> {
        await this.sortButton.selectOption({ label: 'Price (low to high)' });
        const itemPriceElements = await this.itemsPriceLocator.all()
        const itemPrices: any[] = [];

        for (let i = 0; i < itemPriceElements.length; i++) {
            const itemPrice = await itemPriceElements[i].textContent();
            if (itemPrice !== null) {
                itemPrices.push(parseFloat(itemPrice.replace('$', '')));
            }
        }

        for (let i = 1; i < itemPrices.length; i++) {
            expect(itemPrices[i]).toBeGreaterThanOrEqual(itemPrices[i - 1]);
        }
    }

    async sortHighToLowPrices(): Promise<void> {
        await this.sortButton.selectOption({ label: 'Price (high to low)' });
        const itemPriceElements2 = await this.itemsPriceLocator.all()
        const itemPrices2: any[] = [];

        for (let i = 0; i < itemPriceElements2.length; i++) {
            const itemPrice = await itemPriceElements2[i].textContent();
            if (itemPrice !== null) {
                itemPrices2.push(parseFloat(itemPrice.replace('$', '')));
            }
        }

        for (let i = 1; i < itemPrices2.length; i++) {
            expect(itemPrices2[i]).toBeLessThanOrEqual(itemPrices2[i - 1]);
        }
    }

}