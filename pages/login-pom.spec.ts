import { Locator, Page, expect } from "@playwright/test";

export class LoginPagePOM {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loggingInButton: Locator;
    readonly item: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loggingInButton = page.locator('#login-button');
        this.item = page.locator('#item_4_title_link');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loggingIn(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loggingInButton.click();
    }
}

