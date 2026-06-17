import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { productData } from '../testData/productData';


test('Register user and validate products', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    const timestamp = Date.now();

    const username = `testuser${timestamp}`;
    const email = `testuser_${timestamp}@example.com`;


    await homePage.navigate();

    await homePage.verifyHomePage();

    await homePage.clickSignupLogin();


    await loginPage.signup(
        username,
        email
    );


    await loginPage.fillRegistrationForm();


    await loginPage.verifyAccountCreated();


    await loginPage.closePopupIfPresent();


    await loginPage.verifyLoggedIn(username);



    await productsPage.goToProducts();


    await productsPage.searchProduct(
        productData.validSearchProduct
    );


    await productsPage.verifySearchResultsContain(
        productData.validSearchProduct
    );



    await productsPage.searchProduct(
        productData.invalidSearchProduct
    );


    await productsPage.verifyNoResults();



    await productsPage.selectWomenDress();


    await productsPage.verifyWomenDressPage();



    await productsPage.selectPoloBrand();


    await productsPage.verifyPoloBrandPage();

});




// NEW TEST

test('Validate product price between search, PDP and cart', async ({ page }) => {


    const homePage = new HomePage(page);

    const productsPage = new ProductsPage(page);



    await homePage.navigate();



    await productsPage.goToProducts();



    await productsPage.searchProduct(
        productData.validSearchProduct
    );



    const searchPagePrice =
        await productsPage.getSearchPagePrice();



    console.log(
        'Search Page Price:',
        searchPagePrice
    );



    await productsPage.openProduct();



    const pdpPrice =
        await productsPage.getPDPPrice();



    console.log(
        'PDP Price:',
        pdpPrice
    );



    expect(
        pdpPrice
    ).toContain(
        searchPagePrice
    );



    await productsPage.addProductToCart();



    await productsPage.openCart();



    const cartPrice = await productsPage.getCartProductPrice();



    console.log(
        'Cart Price:',
        cartPrice
    );



    expect(
        cartPrice
    ).toContain(
        searchPagePrice
    );

});