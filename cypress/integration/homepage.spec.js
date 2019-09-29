function testStory(storyNum) {
    it('Checking the story with index ' + storyNum, function() {
        // visitng bbc homepage
        cy.visit('https://www.bbc.co.uk');

        // finding and storing it as a variable
        cy.get('[data-x-bbc-element-id="el-' + storyNum + '"]')
            .as('story');

        cy.get('@story').invoke('attr', 'data-bbc-content-id').then((contentId) => {
            cy.get('@story').click();
            cy.url()
                .should('equal', contentId);
        });
    });
}

describe.skip('Testing the homepage articles', function() {
    for (var i = 0; i <= 20; i++){
        testStory(i);
    }
});

