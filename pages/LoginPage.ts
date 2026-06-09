import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private signupName: Locator;
    private signupEmail: Locator;
    private signupButton: Locator;

    private gender: Locator;
    private password: Locator;
    private days: Locator;
    private months: Locator;
    private years: Locator;

    private firstName: Locator;
    private lastName: Locator;
    private address: Locator;
    private country: Locator;
    private state: Locator;
    private city: Locator;
    private zipcode: Locator;
    private mobileNumber: Locator;

    private createAccountButton: Locator;
    private accountCreatedMessage: Locator;
    private continueButton: Locator;

    private popup: Locator;
    private closePopupButton: Locator;

    constructor(page: Page) {
        super(page);

        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        this.gender = page.locator('#id_gender1');
        this.password = page.locator('#password');

        this.days = page.locator('#days');
        this.months = page.locator('#months');
        this.years = page.locator('#years');

        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.address = page.locator('#address1');

        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipcode = page.locator('#zipcode');

        this.mobileNumber = page.locator('#mobile_number');

        this.createAccountButton = page.locator(
            '[data-qa="create-account"]'
        );

        this.accountCreatedMessage = page.locator(
            '[data-qa="account-created"]'
        );

        this.continueButton = page.locator(
            '[data-qa="continue-button"]'
        );

        this.popup = page.locator('.modal-content');

        this.closePopupButton = page.locator(
            '.close-modal'
        );
    }

    async signup(name: string, email: string) {

        await this.fill(this.signupName, name);

        await this.fill(this.signupEmail, email);

        await this.click(this.signupButton);
    }

    async fillRegistrationForm() {

        await this.gender.check();

        await this.fill(
            this.password,
            process.env.PASSWORD!
        );

        await this.select(
            this.days,
            process.env.DAY!
        );

        await this.select(
            this.months,
            process.env.MONTH!
        );

        await this.select(
            this.years,
            process.env.YEAR!
        );

        await this.fill(
            this.firstName,
            process.env.FIRST_NAME!
        );

        await this.fill(
            this.lastName,
            process.env.LAST_NAME!
        );

        await this.fill(
            this.address,
            process.env.ADDRESS!
        );

        await this.select(
            this.country,
            process.env.COUNTRY!
        );

        await this.fill(
            this.state,
            process.env.STATE!
        );

        await this.fill(
            this.city,
            process.env.CITY!
        );

        await this.fill(
            this.zipcode,
            process.env.ZIPCODE!
        );

        await this.fill(
            this.mobileNumber,
            process.env.PHONE!
        );

        await this.click(
            this.createAccountButton
        );
    }

    async verifyAccountCreated() {

        await expect(
            this.accountCreatedMessage
        ).toContainText('Account Created!');

        await this.click(
            this.continueButton
        );
    }

    async closePopupIfPresent() {

        try {

            if (
                await this.popup.isVisible({
                    timeout: 3000
                })
            ) {

                await this.click(
                    this.closePopupButton
                );
            }

        } catch {

            console.log(
                'Popup not displayed'
            );
        }
    }

    async verifyLoggedIn(
        username: string
    ) {

        await expect(
            this.page.locator(
                `text=Logged in as ${username}`
            )
        ).toBeVisible();
    }
}