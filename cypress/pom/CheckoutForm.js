
import Form from "./Form"

export class CheckoutForm extends Form {
    constructor() {
        super();
        this.name = "checkout";
        this.fnInput = "input#billing_first_name";
    }

    fillForm(user) {
        this.setInput(this.fnInput, user.fn)
        this.setInput(this.lnInput, user.ln)
        this.setInput(this.companyInput, user.company)
        this.setSelect(this.countrySelect, user.country)
        this.setInput(this.address1Input, user.address1)
        this.setInput(this.address2Input, user.address2)
        this.setInput(this.cityInput, user.city)
        this.setSelect(this.stateSelect, user.state)
        this.setInput(this.pinInput, user.pin)
        this.setInput(this.phoneInput, user.phone)
        this.setInput(this.emailInput, user.email)
    }
}