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
}
