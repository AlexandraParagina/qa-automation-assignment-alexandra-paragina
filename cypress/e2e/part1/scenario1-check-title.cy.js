import HomePage from "../../pages/part1/HomePage"

describe('Scenario 1: Check the title of the home page', () => {

    const homePage = new HomePage()

    context('Desktop view', () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
            homePage.visitHomePage()
        })
        it('Should display headers with correct text and visibility', () => {
            // check the first header
            homePage.getFirstHeader()
            .should('be.visible')
            .and('contain.text', 'Digital Innovation.') 

            // check the second header
            homePage.getSecondHeader()
            .should('be.visible')
            .and('contain.text', 'Efficient Aviation.')
        })

        it('Should apply the correct styles to the headers', () => {
            // check the first header styles
            homePage.getFirstHeader()
            .should('have.css', 'font-weight', '300') 
            .and('have.css', 'font-size', '72px')

            // check the second header styles
            homePage.getSecondHeader()
            .should('have.css', 'font-weight', '300') 
            .and('have.css', 'font-size', '72px')
        })

    })

    context('Mobile view', () => {
        beforeEach(() => {
            cy.viewport('iphone-x')
            homePage.visitHomePage()
        })

        it('Should display headers with correct text and visibility', () => {
            // check the first header
            homePage.getFirstHeader()
            .should('be.visible')
            .and('contain.text', 'Digital Innovation.')

            // check the second header
            homePage.getSecondHeader()
            .should('be.visible')
            .and('contain.text', 'Efficient Aviation.')
        })

        it('Should apply the correct styles to the headers', () => {
            // check the first header styles
            homePage.getFirstHeader()
            .should('have.css', 'font-weight', '300') 
            .and('have.css', 'font-size', '48px')

            // check the second header styles
            homePage.getSecondHeader()
            .should('have.css', 'font-weight', '300') 
            .and('have.css', 'font-size', '48px')    
        })
    })
})