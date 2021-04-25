import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { CheckoutPage } from "../../pom/CheckoutPage";
import { HomePage } from "../../pom/HomePage";
import { ProductPage } from "../../pom/ProductPage";
import { CartPage } from "../../pom/CartPage";
import { CheckoutForm } from "../../pom/CheckoutForm";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutForm = new CheckoutForm();


let chosenProductName;
let chosenProductPrice;
let chosenProductQuantity;

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    cy.url().should("be.eq", "http://shop.demoqa.com/");
});

When("He chooses a product", () => {
    homePage.getProductName(0).then((productName) => {
        chosenProductName = productName;
    });
    homePage.getProductPrice(0).then(productPrice => {
        chosenProductPrice = productPrice
    }).then(() => {
        homePage.clickProduct(0);
        productPage.checkPageSpecificElements();
        productPage.checkPageTitle(chosenProductName);
        productPage.checkProductTitle(chosenProductName);
    })
});

And("Sets product options", () => {
    productPage.setOption("color", 1);
    productPage.setOption("size", 1);
});

And("Adds to cart", () => {
    //TODO
    productPage.checkAddToCartIsEnabled();
    productPage.getProductQuantity().then(quantity => {
        chosenProductQuantity = quantity
    })
    cy.get(productPage.addToCartBtn).click();
    productPage.checkCartCount(chosenProductQuantity, chosenProductPrice)
    productPage.checkNotifMsg(chosenProductName)
});

And("Proceeds to checkout", () => {
    cy.get(productPage.viewCartBtn).click();
    cartPage.checkPageSpecificElements();
    cartPage.checkPageTitle("Cart");
    cartPage.checkCartCount(chosenProductQuantity, chosenProductPrice);
    cartPage.checkProductTable(chosenProductName, chosenProductPrice, chosenProductQuantity)
    cy.get(cartPage.shopTable).contains(chosenProductName);
    cy.get(cartPage.proceedToCOBtn).click();
});

Then("He should be able to order product", () => {
    checkoutForm.submit();
    cy.get("@checkout")
        .its("response.body")
        .should("have.property", "result", "success");
    cy.url().should('contain', orderReceivedPage.url);
    orderReceivedPage.checkPageSpecificElements()
    cy.get(orderReceivedPage.thankYouMsg).should(
        "have.text",
        "Thank you. Your order has been received."
    );
});
