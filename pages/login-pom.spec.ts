import { Locator, Page, expect } from "@playwright/test";

export class LoginPagePOM {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loggingInButton: Locator;
    readonly item: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loggingInButton = page.locator('#login-button');
        this.item = page.locator('#item_4_title_link');
        this.errorMessage = page.locator('.error-message-container h3');
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
        const errorMessageLockedOutUserText = await this.errorMessage.textContent();
        expect(errorMessageLockedOutUserText).toContain('this user has been locked out')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithGlitchedUser(performanceGlitchUser: string, password: string): Promise<void> {
        await this.username.fill(performanceGlitchUser);
        await this.password.fill(password);
        await this.loggingInButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async loggingInWithIncorrectUsername(incorrectUsername: string, password: string): Promise<void> {
        await this.username.fill(incorrectUsername);
        await this.password.fill(password);
        await this.loggingInButton.click();
        const errorMessageIncorrectUsername = await this.errorMessage.textContent();
        expect(errorMessageIncorrectUsername).toContain('Username and password do not match any user in this service')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithIncorrectPassword(username: string, incorrectPassword: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(incorrectPassword);
        await this.loggingInButton.click();
        const errorMessageIncorrectPassword = await this.errorMessage.textContent();
        expect(errorMessageIncorrectPassword).toContain('Username and password do not match any user in this service')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithoutAnyCredentials(): Promise<void> {
        await this.loggingInButton.click();
        const errorMessageWithoutAnyCredentials = await this.errorMessage.textContent();
        expect(errorMessageWithoutAnyCredentials).toContain('Username is required')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithUsernameOnly(username: string): Promise<void> {
        await this.username.fill(username);
        await this.loggingInButton.click();
        const errorMessageUsernameOnly = await this.errorMessage.textContent();
        expect(errorMessageUsernameOnly).toContain('Password is required')
        expect(URL).not.toContain('inventory');
    }

    async loggingInWithPasswordOnly(password: string): Promise<void> {
        await this.password.fill(password);
        await this.loggingInButton.click();
        const errorMessagePasswordOnly = await this.errorMessage.textContent();
        expect(errorMessagePasswordOnly).toContain('Username is required')
        expect(URL).not.toContain('inventory');
    }
}

