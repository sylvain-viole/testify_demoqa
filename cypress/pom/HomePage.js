import Page from "./Page";

export class HomePage extends Page {
    constructor() {
        super()
        this.url = "/"
        this.productLink = "div.noo-product-inner";
    }

    clickProduct(index) {
        cy.get(this.productLink).eq(index).children('h3').click()
    }
    
    getProductName(index) {
<<<<<<< HEAD
       return cy.get(this.productLink).eq(index).children('h3').invoke('text')
=======
        return cy.get(this.productLink).eq(index).children("h3").invoke("text")
    }

    getProductPrice(index) {
        return cy
            .get(this.productLink)
            .eq(index)
            .children("div.shop-loo-after-item")
            .children("span.price")
            .children("span.woocommerce-Price-amount")
            .invoke("text");
>>>>>>> essai
    }
}