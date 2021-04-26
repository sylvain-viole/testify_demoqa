export default class Form {
    constructor() {
        this.submitBtn = null;
    }

    setInput(locator, content, forceState = false) {
        cy.get(locator)
            .type(content, { force: forceState })
            .should("have.value", content);
    }
    setSelect(locator, content, forceState = false) {
        cy.get(locator)
            .select(content, { force: forceState })
            .should("have.value", content);
    }
    checkCheckbox(locator, forceState = false) {
        cy.get(locator).check({ force: forceState }).should("be.checked");
    }
    submit(forceState = false) {
        cy.get(this.submitBtn).should("exist").click({ force: forceState });
    }
}
