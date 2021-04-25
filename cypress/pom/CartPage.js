import Page from "./Page";

export class CartPage extends Page {
    constructor() {
        super();
        this.url = "/cart";
        this.shopTable = "table.shop_table";
        this.proceedToCOBtn = ".wc-proceed-to-checkout";
    }

    checkPageSpecificElements() {
        cy.checkElements([
            this.shopTable,
            this.proceedToCOBtn,
            this.cartCount
        ]);
    }

    checkProductTable(product) {
        cy.get(this.shopTable).contains(product.name).should('exist').and('be.visible');
        cy.get(this.shopTable).contains(product.price).should('exist').and('be.visible');
        cy.get(this.shopTable).contains(product.quantity).should('exist').and('be.visible');
    }
}
