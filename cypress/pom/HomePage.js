import Page from "./Page";

export class HomePage extends Page {
    constructor() {
        super();
        this.url = "/";
        this.productLink = "div.noo-product-inner";
    }

    checkPageSpecificElements() {
        cy.checkElements([this.productLink]);
    }

    clickProduct(index) {
        cy.get(this.productLink)
            .eq(index)
            .children("h3")
            .should("exist")
            .click();
    }

    getProductName(index) {
        cy.get(this.productLink).eq(index).children("h3").invoke("text").then(value => {
            return value
        });
    }

    getProductPrice(index) {
        return cy
            .get(this.productLink)
            .eq(index)
            .children("div.shop-loo-after-item")
            .children("span.price")
            .children("span.woocommerce-Price-amount")
            .invoke("text");
    }
}