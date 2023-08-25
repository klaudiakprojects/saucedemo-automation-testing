import { Locator, Page, expect } from "@playwright/test";

export class LoginPagePOM {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loggingInButton: Locator;
    readonly item: Locator;
    readonly errorMessageLockedOutUser: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loggingInButton = page.locator('#login-button');
        this.item = page.locator('#item_4_title_link');
        this.errorMessageLockedOutUser = page.locator('.error-message-container h3');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loggingIn(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loggingInButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async loggingInWithLockedOutUser(lockedOutUser: string, password: string): Promise<void> {
        await this.username.fill(lockedOutUser);
        await this.password.fill(password);
        await this.loggingInButton.click();
        const errorMessageLockedOutUserText = await this.errorMessageLockedOutUser.textContent();
        expect(errorMessageLockedOutUserText).toContain('this user has been locked out')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithGlitchedUser(performanceGlitchUser: string, password: string): Promise<void> {
        await this.username.fill(performanceGlitchUser);
        await this.password.fill(password);
        await this.loggingInButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }
}

