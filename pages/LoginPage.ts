import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    async signup(name: string, email: string) {

        await this.page.locator('[data-qa="signup-name"]')
            .fill(name);

        await this.page.locator('[data-qa="signup-email"]')
            .fill(email);

        await this.page.locator('[data-qa="signup-button"]')
            .click();
    }

    async fillRegistrationForm() {

        await this.page.locator('#id_gender1').check();

        await this.page.locator('#password')
            .fill('Test@123');

        await this.page.locator('#days')
            .selectOption('10');

        await this.page.locator('#months')
            .selectOption('5');

        await this.page.locator('#years')
            .selectOption('1995');

        await this.page.locator('#first_name')
            .fill('Test');

        await this.page.locator('#last_name')
            .fill('User');

        await this.page.locator('#address1')
            .fill('Chennai');

        await this.page.locator('#country')
            .selectOption('India');

        await this.page.locator('#state')
            .fill('Tamil Nadu');

        await this.page.locator('#city')
            .fill('Chennai');

        await this.page.locator('#zipcode')
            .fill('600001');

        await this.page.locator('#mobile_number')
            .fill('9876543210');

        await this.page.locator('[data-qa="create-account"]')
            .click();
    }

    async verifyAccountCreated() {

        await expect(
            this.page.locator('[data-qa="account-created"]')
        ).toContainText('Account Created!');

        await this.page.locator('[data-qa="continue-button"]')
            .click();

            
    }
     async closePopupIfPresent() {

        try {

            const popup = this.page.locator('.modal-content');

            if (await popup.isVisible({ timeout: 3000 })) {

                await this.page.locator('.close-modal').click();
            }

        } catch {

            console.log('Popup not displayed');
        }
    }

    async verifyLoggedIn(username: string) {

        await expect(
            this.page.locator(`text=Logged in as ${username}`)
        ).toBeVisible();
    }
}