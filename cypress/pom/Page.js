export default class Page {
    constructor() {
        this.pageTitle = "h1.page-title";
        this.cartCount = "span.cart-count";
        this.notifAdd = "div.woocommerce-message";
        this.viewCartBtn = ".wc-forward";
    }

    checkPageTitle(expectedValue) {
        cy.get(this.pageTitle).should("have.text", expectedValue);
    }

    checkCartCount(count, price) {
        cy.get(this.cartCount).should("have.text", `Cart(${count})${price}`);
    }
}