import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { CheckoutPage } from "../../pom/CheckoutPage";
import { HomePage } from "../../pom/HomePage";
import { ProductPage } from "../../pom/ProductPage";
import { CartPage } from "../../pom/CartPage";
import { CheckoutForm } from "../../pom/CheckoutForm";
import { User } from "../../fixtures/User";
import { OrderReceivedPage } from "../../pom/OrderReceivedPage";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutForm = new CheckoutForm();
const orderReceivedPage = new OrderReceivedPage()
const user = new User("US");

let chosenProductName;
let chosenProductPrice = null;
let chosenProductQuantity = null;

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    cy.url().should("be.eq", "http://shop.demoqa.com/");
    homePage.checkPageSpecificElements();
});

When("He chooses a product", () => {
    homePage.getProductName(0).then((productName) => {
        chosenProductName = productName;
    });
    homePage.getProductPrice(0).then(productPrice => {
        chosenProductPrice = productPrice
    })
    homePage.clickProduct(0);
    productPage.checkPageSpecificElements();
    cy.log(chosenProductName)
    productPage.checkPageTitle(chosenProductName);
    productPage.checkProductTitle(chosenProductName);
});

And("Sets product options", () => {
    productPage.setOption("color", 1);
    productPage.setOption("size", 1);
});

And("Adds to cart", () => {
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

And("Confirms order with valid info", () => {
    cy.intercept("/?wc-ajax=checkout").as("checkout");
    checkoutPage.checkPageSpecificElements();
    checkoutForm.checkFormSpecificElements();
    checkoutPage.checkPageTitle("Checkout");
    checkoutForm.fillForm(user);
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

// SC002

But("Doesn't set options", () => {
    productPage.setOption("color", 0);
    productPage.setOption("size", 0);
});

Then("He should NOT be able to add to cart", () => {
    cy.get(productPage.addToCartBtn).should('have.class', 'disabled')
});
