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

let chosenProductName = null;
let chosenProductPrice = null;

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    cy.url().should("be.eq", "http://shop.demoqa.com/");
    homePage.checkPageSpecificElements();
});

When("He chooses a product", () => {
    homePage.getProductPrice(0).then(productPrice => {
        chosenProductPrice = productPrice
    })
    homePage.getProductName(0).then((productName) => {
        homePage.clickProduct(0);
        productPage.checkPageSpecificElements();
        productPage.checkPageTitle(productName);
        productPage.checkProductTitle(productName);
        chosenProductName = productName;
    });
});

And("Sets product options", () => {
    productPage.setOption("color");
    productPage.setOption("size");
});

And("Adds to cart", () => {
    cy.get(productPage.addToCartBtn)
        .parent("div")
        .should("have.class", "woocommerce-variation-add-to-cart-enabled");
    cy.get(productPage.addToCartBtn).click();
    cy.get(productPage.cartCount).should("have.text", `Cart(1)${chosenProductPrice}`);
    cy.get(productPage.notifMsg).should(
        "contain.text",
        "has been added to your cart."
    );
});

And("Proceeds to checkout", () => {
    cy.get(productPage.viewCartBtn).should("be.visible").click();
    cartPage.checkPageSpecificElements();
    cartPage.checkPageTitle("Cart");
    cy.get(cartPage.cartCount).should(
        "have.text",
        `Cart(1)${chosenProductPrice}`
    );
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
