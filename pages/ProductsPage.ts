import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    private productsLink: Locator;
    private searchBox: Locator;
    private searchButton: Locator;

    private productNames: Locator;
    private productCards: Locator;
    private pageTitle: Locator;

    private womenCategory: Locator;
    private dressCategory: Locator;
    private poloBrand: Locator;

    // New price validation locators
    private productPrice: Locator;
    private viewProductButton: Locator;
    private pdpPrice: Locator;
    private addToCartButton: Locator;
    private viewCartButton: Locator;
    private cartPrice: Locator;


    constructor(page: Page) {
        super(page);


        this.productsLink = page.getByRole('link', {
            name: 'Products'
        });


        this.searchBox = page.locator('#search_product');


        this.searchButton = page.locator('#submit_search');


        this.productNames = page.locator('.productinfo p');


        this.productCards = page.locator('.product-image-wrapper');


        this.pageTitle = page.locator('.title.text-center');


        this.womenCategory = page.locator(
            'a[href="#Women"]'
        );


        this.dressCategory = page.getByRole('link', {
            name: 'Dress'
        });


        this.poloBrand = page.locator(
            'a[href="/brand_products/Polo"]'
        );


        // Price flow

        this.productPrice =
    page.locator('.productinfo h2').first();


        this.viewProductButton =
            page.getByRole('link', {
                name:'View Product'
            }).first();


        this.pdpPrice =
            page.locator(
                '.product-information span span');


        this.addToCartButton =
            page.getByRole('button', {
                name:'Add to cart'
            });


        this.viewCartButton =
            page.getByRole('link', {
                name:'View Cart'
            });


        this.cartPrice =
            page.locator(
                '.cart_price'
            ).first();

    }



    async goToProducts() {

        await this.click(
            this.productsLink
        );
    }



    async searchProduct(productName:string) {

        await this.fill(
            this.searchBox,
            productName
        );


        await this.click(
            this.searchButton
        );
    }



    async verifySearchResultsContain(searchText:string) {

        const count =
            await this.productNames.count();


        for(let i=0;i<count;i++){

            const text =
                await this.productNames
                .nth(i)
                .textContent();


            expect(
                text?.toLowerCase()
            ).toContain(
                searchText.toLowerCase()
            );
        }
    }



    async verifyNoResults(){

        await expect(
            this.productCards
        ).toHaveCount(0);
    }



    // New methods

    async getSearchPagePrice(){

        return await this.productPrice.innerText();
    }



    async openProduct(){

        await this.click(
            this.viewProductButton
        );
    }



    async getPDPPrice(){

        return await this.pdpPrice.innerText();
    }



    async addProductToCart(){

        await this.click(
            this.addToCartButton
        );
    }



    async openCart(){

        await this.click(
            this.viewCartButton
        );
    }



    async getCartProductPrice(){

        return await this.cartPrice.innerText();
    }



    async selectWomenDress() {

        await this.click(
            this.womenCategory
        );

        await this.click(
            this.dressCategory
        );
    }



    async verifyWomenDressPage() {

        await expect(
            this.pageTitle
        ).toContainText(
            'Women - Dress Products'
        );


        await expect(
            this.productCards.first()
        ).toBeVisible();
    }



    async selectPoloBrand() {

        await this.click(
            this.poloBrand
        );
    }



    async verifyPoloBrandPage(){

        await expect(
            this.pageTitle
        ).toContainText(
            'Brand - Polo Products'
        );


        await expect(
            this.productCards.first()
        ).toBeVisible();
    }

async openProductInNewTab(): Promise<Page> {

    const productLink =
        this.page.locator('a[href*="product_details"]').first();


    await productLink.waitFor({
        state: 'visible'
    });


    const href =
        await productLink.getAttribute('href');


    const newPage =
        await this.page.context().newPage();


    await newPage.goto(
        'https://automationexercise.com' + href
    );


    await newPage.waitForLoadState('domcontentloaded');


    return newPage;

}



async getNewTabProductTitle(newPage: Page) {

    const title =
        await newPage
            .locator('.product-information h2')
            .innerText();

    return title.trim();
}



async validateOriginalPage() {

    await expect(this.page)
        .toHaveURL(/products/);

}

}