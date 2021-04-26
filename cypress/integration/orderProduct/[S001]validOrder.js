import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

import { CheckoutPage } from "../../pom/CheckoutPage";
import { HomePage } from "../../pom/HomePage";
import { ProductPage } from "../../pom/ProductPage";
import { CartPage } from "../../pom/CartPage";
import { CheckoutForm } from "../../pom/CheckoutForm";
import { OrderReceivedPage } from "../../pom/OrderReceivedPage";
import { User } from "../../fixtures/User";
import { Product } from "../../fixtures/Product";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutForm = new CheckoutForm();
const orderReceivedPage = new OrderReceivedPage();
const user = new User("US");
let product = new Product();

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    homePage.checkUrl();
    homePage.checkPageSpecificElements();
});

When("He chooses a product", () => {
    homePage.getProductName(0).then((productName) => {
        product.name = productName;
    });
    homePage
        .getProductPrice(0)
        .then((productPrice) => {
            product.price = productPrice;
        })
        .then(() => {
            homePage.clickProduct(0);
            productPage.checkUrl();
            productPage.checkPageSpecificElements();
            productPage.checkPageTitle(product.name);
            productPage.checkProductTitle(product.name);
        });
});

And("Sets product options", () => {
    productPage.setOption("color", 1);
    productPage.setOption("size", 1);
});

And("Adds to cart", () => {
    productPage.checkAddToCartIsEnabled();
    productPage
        .getProductQuantity()
        .then((quantity) => {
            product.quantity = quantity;
        })
        .then(() => {
            cy.get(productPage.addToCartBtn).click();
            productPage.checkCartCount(product.quantity, product.price);
            productPage.checkNotifMsg(product.name);
        });
});

And("Proceeds to checkout", () => {
    cy.get(productPage.viewCartBtn).click();
    cartPage.checkUrl();
    cartPage.checkPageSpecificElements();
    cartPage.checkPageTitle("Cart");
    cartPage.checkCartCount(product.quantity, product.price);
    cartPage.checkProductTable(product);
    cy.get(cartPage.proceedToCOBtn).click();
});

And("Confirms order with valid info", () => {
    cy.intercept("/?wc-ajax=checkout").as("checkout");
    checkoutPage.checkUrl();
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
    cy.url().should("contain", orderReceivedPage.url);
    orderReceivedPage.checkUrl();
    orderReceivedPage.checkPageSpecificElements();
    cy.get(orderReceivedPage.thankYouMsg).should(
        "have.text",
        "Thank you. Your order has been received."
    );
});

And("Receives a confirmation email", () => {
    cy.request(
        "GET",
        "https://svioletest@mailo.xyz/api/emails?sender=nomail@toolsqa.com"
    ).then((response) => {
        expect(response.status).to.eq(200, {timeout: 50000});
        expect(response.body.data[0]).to.have.property(
            "subject",
            "Your ToolsQA Demo Site order has been received!"
        );
        let id = response.body.data[0].id
        cy.log('confirmation mail suppression')
        cy.request("DELETE", `https://svioletest@mailo.xyz/api/emails/${id}`);
    });
});
