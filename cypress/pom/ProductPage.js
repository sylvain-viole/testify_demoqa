import Page from "./Page";

export class ProductPage extends Page {
    constructor() {
        super();
        this.url;
        this.productTitle = "h1.product_title";
        this.colorSelect = "#pa_color";
        this.sizeSelect = "#pa_size";
        this.quantityInput = "[id^=noo-quantity-]";
        this.addToCartBtn = ".single_add_to_cart_button";
    }
    checkProductTitle(expectedValue) {
        cy.get(this.productTitle).should("have.text", expectedValue);
    }

    checkPageSpecificElements() {
        cy.checkElements([
            this.colorSelect,
            this.sizeSelect,
            this.quantityInput,
            this.addToCartBtn,
        ]);
    }

    setOption(target) {
        let locator;
        switch (target) {
            case "color":
                locator = this.colorSelect;
                break;
            case "size":
                locator = this.sizeSelect;
                break;
            default:
                throw new Error("wrong parameter passed");
        }
        cy.get(locator)
            .children("option")
            .eq(1)
            .should("exist")
            .invoke("attr", "value")
            .then((value) => {
                cy.get(locator).select(value).should("have.value", value);
            });
    }
}