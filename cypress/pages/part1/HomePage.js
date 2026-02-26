class HomePage {

    // -----------------------LOCATORS------------------------
    // Header locators
    firstHeader = '.h1.home'
    secondHeader = '.h1.home.blue'

    // Stats locators
    statItem = '.div-block-24 h2.h2.green'
    statDescription = 'div.div-block-24 h4.h4'

    // Social media links locators
    socialLinks = {
        Facebook: 'a[href="https://www.facebook.com/AirportLabs"]',
        Instagram: 'a[href="https://www.instagram.com/airportlabspeople/"]',
        LinkedIn: 'a[href="https://www.linkedin.com/company/airportlabs/"]'
    }
  

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
        // Get a social media link by name (Facebook, Instagram, LinkedIn)
    getSocialLink(name) {
        return cy.get(this.socialLinks[name])
    }

}  
export default HomePage