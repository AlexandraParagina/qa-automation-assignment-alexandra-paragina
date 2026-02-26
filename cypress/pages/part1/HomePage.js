class HomePage {

    // -----------------------LOCATORS------------------------
    // Header locators
    firstHeader = '.h1.home'
    secondHeader = '.h1.home.blue'

    // Stats locators
    statItem = '.div-block-24 h2.h2.green'
    statDescription = 'div.div-block-24 h4.h4'
  

    // -----------------------NAVIGATION------------------------
    visitHomePage() {
        cy.visit(Cypress.env('siteBaseUrl1'));
    }

    // -----------------------GETTERS------------------------

        // Get the first header element
    getFirstHeader() {
        return cy.get(this.firstHeader);
    }
        // Get the second header element
    getSecondHeader() {
        return cy.get(this.secondHeader);
    }
        // Get a statistic value by index
    getStatValue(index) {
        return cy.get(this.statItem).eq(index);
    }
        // Get a statistic label by index
    getStatLabel(index) {
        return cy.get(this.statDescription).eq(index);
    }

}  
export default HomePage;