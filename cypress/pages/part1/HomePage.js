class HomePage {

    // LOCATORS
    firstHeader = '.h1.home'
    secondHeader = '.h1.home.blue'

    // NAVIGATION
    visitHomePage() {
        cy.visit(Cypress.env('siteBaseUrl1'));
    }

    // GETTERS
        // Get the first header element
    getFirstHeader() {
        return cy.get(this.firstHeader);
    }
        // Get the second header element
    getSecondHeader() {
        return cy.get(this.secondHeader);
    }

}  
export default HomePage;