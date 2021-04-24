import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const { HomePage } = require("../../pom/HomePage");
const { ProductPage } = require("../../pom/ProductPage");

const homePage = new HomePage();
const productPage = new ProductPage();

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    cy.url().should("be.eq", "http://shop.demoqa.com/");
});

When("He chooses a product", () => {
    homePage.getProductName(0).then((productName) => {
        homePage.clickProduct(0);
        productPage.checkPageTitle(productName);
        productPage.checkProductTitle(productName);
    });
});

And("Sets product options", () => {
    cy.get(productPage.colorSelect).should('be.visible');
    cy.get(productPage.sizeSelect).should('be.visible');
    cy.get(productPage.quantityInput).should('be.visible');
    cy.get(productPage.quantityInput).should("have.value", "1");
    cy.get(productPage.addToCartBtn).should("have.class","disabled");
    productPage.setOption("color");
    productPage.setOption("size");
});

And("adds to cart", () => {
    cy.get(productPage.addToCartBtn)
        .parent("div")
        .should("have.class", "woocommerce-variation-add-to-cart-enabled")
    cy.get(productPage.addToCartBtn).click();
    cy.get(productPage.cartCount).should('have.text', '1');
    cy.get(productPage.notifAdd).should(
        "contain.text",
        "has been added to your cart."
        );
    });
    
And("confirms order with valid info", () => {});
    cy.get(productPage.viewCartBtn).should('be.visible').click();
    

Then("He should be able to order product", () => {});
