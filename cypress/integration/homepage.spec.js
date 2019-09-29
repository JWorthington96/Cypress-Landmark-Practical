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

function testNation(nationName) {
    it(nationName, function() {
        cy.visit('https://www.bbc.co.uk');
        cy.get('div .hp-dismissible-nations-links')
            .contains(nationName)
            .click();
        cy.url()
            .should('include', '/' + nationName.toLowerCase())
    });
}

describe('Testing some of the homepage articles', function() {
    // could easily be changed to a max of 20 for DOM elements that have the same format
    // after that they use href instead of the 'data-bbc-content-id' attribute
    for (var i = 0; i <= 10; i++){
        testStory(i);
    }
});

describe('Testing the other nations pages', function() {
    // these didn't work as it navigated to a separate site (bbc.com)
    testNation("Scotland");
    testNation("Wales");
});

describe('Testing the slides for stories', function() {
    it('Best of iPlayer slides', function() {
        cy.visit('https://www.bbc.co.uk');

        // getting the slide divider
        cy.get('.hp-tv-radio__title-text')
            .contains('Best of BBC iPlayer TV')
            // finding the div parent
            .parent().parent().parent()
            .as('slides');

        // getting and clicking the controls
        cy.get('@slides').within(() => {
            cy.get('.hp-slider-controls__btn-next')
                // waiting to make sure the animation plays
                .click().wait(200)
                .click().wait(200)
                .click().wait(200)
        });

        // checking that the slide buttons work and navigates to the expected link
        cy.get('[data-x-bbc-element-id="el-62"]')
            .as('displayed');
        cy.get('@displayed').invoke('attr', 'href').then((contentId) => {
            cy.get('@slides')
                .click(850, 330);
            cy.url()
                .should('include', contentId);
        });
    });

    it('Best of BBC Sounds slides', function() {
        cy.visit('https://www.bbc.co.uk');

        // getting the slide divider
        cy.get('.hp-tv-radio__title-text')
            .contains('Best of BBC Sounds')
            // finding the div parent
            .parent().parent().parent()
            .as('slides');

        // getting and clicking the controls
        cy.get('@slides').within(() => {
            cy.get('.hp-slider-controls__btn-next')
                .click().wait(200)
                .click().wait(200)
                .click().wait(200)
        });

        // checking that the slide buttons work and navigates to the expected link
        cy.get('[data-x-bbc-element-id="el-68"]')
            .as('displayed');
        cy.get('@displayed').invoke('attr', 'href').then((contentId) => {
            cy.get('@slides')
                .click(850, 330);
            cy.url()
                .should('include', contentId);
        });
    });
});