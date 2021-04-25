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
const orderReceivedPage = new OrderReceivedPage();
const user = new User("US");

let chosenProductName = null;
let chosenProductPrice = null;

Given('A visitor on the home page', () => {
    cy.visit(homePage.url);
    homePage.checkPageSpecificElements()
});

When("He picks a product", () => {
    homePage.getProductPrice(0).then((productPrice) => {
        chosenProductPrice = productPrice;
    });
    homePage.getProductName(0).then((productName) => {
        chosenProductName = productName;
    });
    homePage.clickProduct(0);
});

Then("He should be shown the product page", () => {
    productPage.checkPageSpecificElements();
    productPage.checkPageTitle(chosenProductName);
    productPage.checkProductTitle(chosenProductName);
});

Given("A visitor on the product page", () => {
    cy.visit(productPage.url);
    productPage.checkPageSpecificElements();
});