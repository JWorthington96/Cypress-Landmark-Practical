describe('Testing the homepage news articles', function () {
    it('Checking the top story', function () {
        // viisitng bbc homepage
        cy.visit('https://www.bbc.co.uk');
        // finding and carrying it
        cy.get('.top-story__wrapper')
            .get('.top-story').click();
        cy.url()
            .should('include', '/news');
    })
});