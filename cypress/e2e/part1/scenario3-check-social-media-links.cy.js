import HomePage from "../../pages/part1/HomePage"

describe('Scenario 3: Check the social media links on the home page', () => {

    const homePage = new HomePage()

    // Test data for social media links
    const socialLinks = [
        { name: 'Facebook', href: 'https://www.facebook.com/AirportLabs', hostname: 'www.facebook.com' },
        { name: 'Instagram', href: 'https://www.instagram.com/airportlabspeople/', hostname: 'www.instagram.com' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/airportlabs/', hostname: 'www.linkedin.com' }
    ]

    beforeEach(() => {
        homePage.visitHomePage()
    })

    // Loop through each social media link and run the same assertions
    socialLinks.forEach((social) => {
        it(`Should verify the ${social.name} link is visible, correct and opens proper domain`, () => {
            // Scroll to the link and verify visibility, href and target attributes
            homePage.getSocialLink(social.name)
                .scrollIntoView()
                .should('be.visible')
                .and('have.attr', 'href', social.href)
                .and('have.attr', 'target', '_blank')
                // Remove target="_blank" to open in the same tab
                .invoke('removeAttr', 'target')
                .click()

            // Verify the browser navigated to the correct domain
            cy.location('hostname').should('eq', social.hostname)
        })
    })
})