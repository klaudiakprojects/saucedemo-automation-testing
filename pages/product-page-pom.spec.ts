import { Locator, Page, expect } from "@playwright/test";

export class ProductPagePOM {
    readonly page: Page;
    readonly item: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly addToCartButton: Locator;
    readonly basket: Locator;

    constructor(page: Page) {
        this.page = page;
        this.item = page.locator('#item_4_title_link'); //first product on main products page
        this.itemName = page.locator('.inventory_details_name'); //title on details product page
        this.itemPrice = page.locator('.inventory_details_price'); //price on details product page
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack'); //add to cart buttton everywhere
        this.basket = page.locator('#shopping_cart_container'); //basket icon everywhere
    }

    async choosingItem(productName: string, productPrice: string): Promise<void> {
        const chosenProductName = this.page.getByText(productName);
        const chosenProductPrice = this.page.getByText(productPrice);
        expect(await chosenProductName.innerText()).toContain(productName);
        expect(await chosenProductPrice.innerText()).toContain(productPrice);
        await this.item.click();
        await this.addToCartButton.click();
    }
    async getPriceFromProductPage(): Promise<string> {
        const itemPrice = await this.itemPrice.innerText();
        return itemPrice;
    }

}