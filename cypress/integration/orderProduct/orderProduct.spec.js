import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const { HomePage } = require("../../pom/HomePage");

const homePage = new HomePage()

Given("A visitor on the homepage", () => {
    cy.visit(homePage.url);
    cy.url().should("be.eq", 'http://shop.demoqa.com/');
})

When("He chooses a product", () => {
    homePage.clickProduct(0)
    console.log(homePage.getProductName(0))
});