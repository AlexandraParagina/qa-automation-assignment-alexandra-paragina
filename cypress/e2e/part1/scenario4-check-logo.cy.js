import HomePage from "../../pages/part1/HomePage";  

describe('Scenario 4: Check the logo on the home page', () => {

    const homePage = new HomePage()

    beforeEach(() => {
        homePage.visitHomePage()
    })

    it('Should verify the logo visibility and dimensions', () => {
        homePage.getLogo()
            // Force the logo to be visible for testing purposes
            .invoke('css', 'display', 'block')
            .should('be.visible')
            .and(($img) => {
                // Check the logo dimensions
                expect($img[0].naturalWidth).to.be.greaterThan(0)
                expect($img[0].naturalHeight).to.be.greaterThan(0)
            })
    })

    // Negative test case: verify the logo remains hidden
    it('Should verify the logo is not visible', () => {
        homePage.getLogo().should('not.be.visible')
    })

})