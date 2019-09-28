describe('Testing the homepage news articles', function () {
    it('Checking the top story', function () {
        // visitng bbc homepage
        cy.visit('https://www.bbc.co.uk')

        // finding and storing it as a variable
        beforeEach(function() {
            cy.get('[data-x-bbc-element-id="el-0"]')
                .invoke('attr', 'data-bbc-content-id')
                .as('correctUrl')
        })

        cy.url()
            .should('equal', correctUrl)
    })
});