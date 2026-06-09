import { Page, Locator } from '@playwright/test';

export class BasePage {

    constructor(protected page: Page) {}

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async select(locator: Locator, value: string) {
        await locator.selectOption(value);
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }
}