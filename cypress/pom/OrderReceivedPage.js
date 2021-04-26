import Page from "./Page";

export class OrderReceivedPage extends Page {
    constructor() {
        super();
        this.name = "order-received page";
        this.url = "/order-received";
        this.totalPrice = "span.woocommerce-Price-amount";
        this.thankYouMsg = "p.woocommerce-thankyou-order-received";
    }

    checkPageSpecificElements() {
        cy.checkElements([this.thankYouMsg, this.totalPrice, this.cartCount]);
    }

    checkConfirmationMsg() {
        cy.get(orderReceivedPage.thankYouMsg).should(
            "have.text",
            "Thank you. Your order has been received."
        );
    }
}
