export default class Form {
    constructor() {
    }

    setInput(locator, content) {
        cy.get(locator).should('exist').type(content).should('have.value', content)
    }
    setSelect(locator, content) {
        cy.get(locator).should('exist').select(content).should('have.value', content)
    }
}