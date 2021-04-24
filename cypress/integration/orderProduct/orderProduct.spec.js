const { HomePage } = require("../../pom/HomePage");

const homePage = new HomePage()

describe('product order', () => {
    it('should open page', () => {
        cy.visit(homePage.url);
        cy.url().should("be.eq", 'http://shop.demoqa.com/');
        homePage.clickProduct(0)
    })
})