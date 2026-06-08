import { Page, expect } from '@playwright/test';

export class HomePage {

    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://automationexercise.com');
    }

    async verifyHomePage() {
        await expect(
            this.page.locator('img[alt="Website for automation practice"]')
        ).toBeVisible();

        await expect(
            this.page.locator('a[href="/products"]')
        ).toBeVisible();
    }

    async clickSignupLogin() {
        await this.page.getByRole('link', {
            name: 'Signup / Login'
        }).click();
    }
}