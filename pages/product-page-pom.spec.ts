import { Locator, Page, expect } from "@playwright/test";

export class ProductPagePOM {
    readonly page: Page;
    readonly item: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly addToCartButtonBackPack: Locator;
    readonly basket: Locator;
    readonly item2: Locator;
    readonly itemPrice2: Locator;
    readonly addToCartButtonBikeLight: Locator;

    constructor(page: Page) {
        this.page = page;
        this.item = page.locator('#item_4_title_link'); //first product on main products page
        this.itemName = page.locator('.inventory_details_name'); //title on details product page
        this.itemPrice = page.locator('.inventory_details_price'); //price on details product page
        this.addToCartButtonBackPack = page.locator('#add-to-cart-sauce-labs-backpack'); //add to cart buttton backpack
        this.basket = page.locator('#shopping_cart_container'); //basket icon everywhere
        this.item2 = page.locator('#item_0_title_link'); // second product on the main products page
        this.addToCartButtonBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light'); // add to cart button bike light
    }

    async choosingItem(productName: string, productPrice: string): Promise<void> {
        const chosenProductName = this.page.getByText(productName);
        const chosenProductPrice = this.page.getByText(productPrice);
        expect(await chosenProductName.innerText()).toContain(productName);
        expect(await chosenProductPrice.innerText()).toContain(productPrice);
        await this.item.click();
        await this.addToCartButtonBackPack.click();
    }

    async getPriceFromProductPage(): Promise<string> {
        const itemPrice = await this.itemPrice.innerText();
        return itemPrice;
    }

    async choosingTwoItems(productName: string, productPrice: string, productName2: string, productPrice2: string): Promise<void> {
        const chosenProductName = this.page.getByText(productName);
        const chosenProductPrice = this.page.getByText(productPrice);
        const chosenProductName2 = this.page.getByText(productName2);
        const chosenProductPrice2 = this.page.getByText(productPrice2);

        expect(await chosenProductName.innerText()).toContain(productName);
        expect(await chosenProductPrice.innerText()).toContain(productPrice);
        expect(await chosenProductName2.innerText()).toContain(productName2);
        expect(await chosenProductPrice2.innerText()).toContain(productPrice2);
        await this.item.click();
        await this.addToCartButtonBackPack.click();
        await this.page.goBack()
        await this.item2.click();
        await this.addToCartButtonBikeLight.click();
    }

}