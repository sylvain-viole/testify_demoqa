export default class Page {
    constructor() {
        this.url
        this.pageTitle = "h1.page-title";
        this.cartCount = ".cart-name-and-total";
        this.notifMsg = "div.woocommerce-message";
        this.viewCartBtn = ".wc-forward";
    }

    checkUrl() {
        cy.url().should("contain", this.url);
    }

    checkPageTitle(expectedValue) {
        cy.get(this.pageTitle).should("have.text", expectedValue);
    }

    checkCartCount(count, price) {
        cy.get(this.cartCount).should("have.text", `Cart(${count})${price}`);
    }
}