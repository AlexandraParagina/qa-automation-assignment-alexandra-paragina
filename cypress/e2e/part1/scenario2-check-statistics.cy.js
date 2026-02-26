import HomePage from "../../pages/part1/HomePage";

describe('Scenario 2: Check the statistics on the home page', () => {

    const homePage = new HomePage()

    beforeEach(() => {
        cy.fixture('statistics').as('statsData')
        homePage.visitHomePage()
    })

    it('Should display the correct statistics with proper styling', () => {
        cy.get('@statsData').then((data) => {
            const stats = data.stats

            // check the first statistic value (18+ Years)
            homePage.getStatValue(0)
                .scrollIntoView()
                .should('be.visible')
                .and('contain.text', stats[0].statValue)
                .and('have.css', 'font-weight', stats[0].statValueFontWeight) 
                .and('have.css', 'font-size', stats[0].statValueFontSize)
                .and('have.css', 'color', stats[0].statValueColor)

            // check the first statistic label (of Industry Experience)
            homePage.getStatLabel(0)
                .should('be.visible')
                .and('contain.text', stats[0].statLabel)
                .and('have.css', 'font-weight', stats[0].statLabelFontWeight)
                .and('have.css', 'font-size', stats[0].statLabelFontSize)
                .and('have.css', 'color', stats[0].statLabelColor)
        })
    })    
})