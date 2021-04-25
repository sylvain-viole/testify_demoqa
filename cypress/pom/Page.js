export default class Page {
    constructor() {
        this.pageTitle = "h1.page-title";
        this.cartCount = "span.cart-name-and-total";
        this.notifMsg = "div.woocommerce-message";
        this.viewCartBtn = ".wc-forward";
    }

    checkPageTitle(expectedValue) {
        cy.get(this.pageTitle).should("exist").and("have.text", expectedValue);
    }
}