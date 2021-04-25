import Page from "./Page";

export class OrderReceivedPage extends Page {
    constructor() {
        super();
        this.url = "/order-received";
        this.totalPrice = "span.woocommerce-Price-amount";
        this.thankYouMsg = "p.woocommerce-thankyou-order-received";
    }

    checkPageSpecificElements() {
        cy.checkElements([this.thankYouMsg, this.totalPrice, this.cartCount]);
    }
}
