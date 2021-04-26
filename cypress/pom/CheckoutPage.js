import Page from "./Page";

export class CheckoutPage extends Page {
    constructor() {
        super();
        this.name = "checkout page";
        this.url = "/checkout";
    }

    checkPageSpecificElements() {}
}
