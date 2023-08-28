import { Locator, Page, expect } from "@playwright/test";

export class BasketPagePOM {
    readonly page: Page;
    readonly basket: Locator;
    readonly basketItemName: Locator;
    readonly basketItemPrice: Locator;
    readonly goToCheckoutButton: Locator;
    readonly removeSauceLabsBackpack: Locator;
    readonly cartList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basket = page.locator('#shopping_cart_container');
        this.basketItemName = page.locator('#item_4_title_link');
        this.basketItemPrice = page.locator('.inventory_item_price');
        this.goToCheckoutButton = page.locator('#checkout');
        this.removeSauceLabsBackpack = page.locator('#remove-sauce-labs-backpack');
        this.cartList = page.locator('.cart_list')
    }

    async checkingCart(item: string, itemPrice: string): Promise<void> {
        await this.basket.click();

        const basketItemName = await this.basketItemName.innerText();
        expect(basketItemName).toEqual(item);

        const basketItemPrice = await this.basketItemPrice.innerText();
        expect(basketItemPrice).toEqual(itemPrice);
    }

    async removingFirstItemFromBasket(item: string): Promise<void> {
        await this.basket.click();

        await this.removeSauceLabsBackpack.click();
        expect(this.cartList).not.toContain(item)
    }

}