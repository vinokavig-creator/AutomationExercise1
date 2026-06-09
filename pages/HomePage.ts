import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private logo: Locator;
    private productsLink: Locator;
    private signupLoginLink: Locator;

    constructor(page: Page) {
        super(page);

        this.logo = page.locator(
            'img[alt="Website for automation practice"]'
        );

        this.productsLink = page.locator(
            'a[href="/products"]'
        );

        this.signupLoginLink = page.getByRole('link', {
            name: 'Signup / Login'
        });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async verifyHomePage() {

        await expect(this.logo)
            .toBeVisible();

        await expect(this.productsLink)
            .toBeVisible();
    }

    async clickSignupLogin() {

        await this.click(
            this.signupLoginLink
        );
    }
}