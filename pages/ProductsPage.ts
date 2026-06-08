import { Page, expect } from '@playwright/test';

export class ProductsPage {

    constructor(private page: Page) {}

    async goToProducts() {

        await this.page.getByRole('link', {
            name: 'Products'
        }).click();
    }

    async searchProduct(productName: string) {

        await this.page.locator('#search_product')
            .fill(productName);

        await this.page.locator('#submit_search')
            .click();
    }

    async verifySearchResultsContain(searchText: string) {

        const products =
            this.page.locator('.productinfo p');

        const count = await products.count();

        for (let i = 0; i < count; i++) {

            const text =
                await products.nth(i).textContent();

            expect(
                text?.toLowerCase()
            ).toContain(searchText.toLowerCase());
        }
    }

    async verifyNoResults() {

        await expect(
            this.page.locator(
                '.features_items .product-image-wrapper'
            )
        ).toHaveCount(0);
    }

    async selectWomenDress() {

        await this.page.locator('a[href="#Women"]')
            .click();

        await this.page.getByRole('link', {
            name: 'Dress'
        }).click();
    }

    async verifyWomenDressPage() {

        await expect(
            this.page.locator('.title.text-center')
        ).toContainText('Women - Dress Products');

        await expect(
            this.page.locator(
                '.product-image-wrapper'
            ).first()
        ).toBeVisible();
    }

    async selectPoloBrand() {

        await this.page.locator(
            'a[href="/brand_products/Polo"]'
        ).click();
    }

    async verifyPoloBrandPage() {

        await expect(
            this.page.locator('.title.text-center')
        ).toContainText('Brand - Polo Products');

        await expect(
            this.page.locator(
                '.product-image-wrapper'
            ).first()
        ).toBeVisible();
    }
}