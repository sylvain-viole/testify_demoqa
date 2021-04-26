import Form from "./Form";

export class CheckoutForm extends Form {
    constructor() {
        super();
        this.name = "checkout";
        this.fnInput = "#billing_first_name";
        this.lnInput = "#billing_last_name";
        this.companyInput = "#billing_company";
        this.countrySelect = "#billing_country";
        this.address1Input = "#billing_address_1";
        this.address2Input = "#billing_address_2";
        this.cityInput = "#billing_city";
        this.stateSelect = "#billing_state";
        this.pinInput = "#billing_postcode";
        this.phoneInput = "#billing_phone";
        this.emailInput = "#billing_email";
        this.termsCheckbox = "#terms";
        this.submitBtn = "#place_order";
    }

    checkFormSpecificElements() {
        cy.checkElements([
            this.fnInput,
            this.lnInput,
            this.companyInput,
            this.countrySelect,
            this.address1Input,
            this.address2Input,
            this.cityInput,
            this.stateSelect,
            this.pinInput,
            this.phoneInput,
            this.emailInput,
            this.termsCheckbox,
            this.submitBtn,
        ]);
    }

    fillForm(user) {
        this.setInput(this.fnInput, user.fn);
        this.setInput(this.lnInput, user.ln);
        this.setInput(this.companyInput, user.company);
        this.setSelect(this.countrySelect, user.country, true);
        this.setInput(this.address1Input, user.address1);
        this.setInput(this.address2Input, user.address2);
        this.setInput(this.cityInput, user.city);
        this.setSelect(this.stateSelect, user.state, true);
        this.setInput(this.pinInput, user.zip);
        this.setInput(this.phoneInput, user.phone);
        this.setInput(this.emailInput, user.email);
        this.checkCheckbox(this.termsCheckbox);
    }
}
