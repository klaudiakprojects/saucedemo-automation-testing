import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPagePOM {
    readonly page: Page;
    readonly goToCheckoutButton: Locator;
    readonly checkoutName: Locator;
    readonly checkoutLastName: Locator;
    readonly checkoutPostalCode: Locator;
    readonly finishCheckoutButton: Locator;
    readonly checkoutItemName: Locator;
    readonly checkoutItemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.goToCheckoutButton = page.locator('#checkout');
        this.checkoutName = page.locator('#first-name');
        this.checkoutLastName = page.locator('#last-name');
        this.checkoutPostalCode = page.locator('#postal-code');
        this.finishCheckoutButton = page.locator('#continue');
        this.checkoutItemName = page.locator('#item_4_title_link');
        this.checkoutItemPrice = page.locator('.inventory_item_price');
    }

    async checkout(checkoutName: string, checkoutLastName: string, checkoutPostalCode: string): Promise<void> {
        await this.goToCheckoutButton.click();
    
        await this.checkoutName.fill(checkoutName);
        await this.checkoutLastName.fill(checkoutLastName);
        await this.checkoutPostalCode.fill(checkoutPostalCode);
        await this.finishCheckoutButton.click();
      }
    
      async getItemNameFromCheckout(): Promise<string> {
        const checkoutItemName = await this.checkoutItemName.innerText();
        return checkoutItemName;
      }
    
      async getPriceFromCheckout(): Promise<string> {
        const checkoutItemPrice = await this.checkoutItemPrice.innerText();
        return checkoutItemPrice;
      }
    
      async checkoutVerifying(itemName: string, itemPrice: string): Promise<void> {
        const checkoutItemName = await this.getItemNameFromCheckout();
        const checkoutItemPrice = await this.getPriceFromCheckout();
        expect(checkoutItemPrice).toEqual(itemPrice);
        expect(checkoutItemName).toEqual(itemName);
      }
}