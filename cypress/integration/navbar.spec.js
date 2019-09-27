describe('Testing that the navigation bar buttons navigate to the correct sites', function() {
    it('Navigating to BBC homepage', function() {
        // visiting BBC homepage
        cy.visit('https://www.bbc.co.uk');
    });

    it('Check the News button', function() {
        // finding the news navbar element
        cy.get('.orb-nav-news')
            .contains('News').click();
        // checking it navigated to the right page
        cy.url().should('include', '/news');
    });

    it('Check Sport button', function() {
        // finding the sport navbar element
        cy.get('.orb-nav-sport')
            .contains('Sport').click();
        // checking it navigated to the right page
        cy.url().should('include', '/sport');
    });

    it('Check Weather button', function() {
        // using this technique for the rest of the navigation bar
        cy.get('.orb-nav-weather')
            .contains('Weather').click();
        cy.url().should('include', '/weather');
    });

    it('Check iPlayer button', function() {
        cy.get('.orb-nav-iplayer')
            .contains('iPlayer').click();
        cy.url().should('include', '/iplayer');
    });

    it('Check Sounds button', function(){
        cy.get('.orb-nav-sounds')
            .contains('Sounds').click();
        cy.url().should('include', '/sounds');
    });

    it('Check CBBC button', function() {
        cy.get('.orb-nav-cbbc')
            .contains('CBBC').click();
        cy.url().should('include', '/cbbc');
    });

    it('Check More button', function() {
        // returning to home page as the navigation bar changes on the CBBC section
        cy.visit('https://www.bbc.co.uk');
        // clicking on more button
        cy.get('#orb-nav-more')
            .contains('More').click();
        // checking the panel has expanded
        cy.get('.orb-panel')
            .invoke('css', 'display')
            .should('not.equal', 'none')
    });

    it('Check CBeebies button', function() {
        // returning to home page as the navigation bar changes on the CBBC section
        cy.get('#orb-panel-more')
            .contains('CBeebies').click();
        cy.url().should('include', '/cbeebies');
    });

    it('Check Food button', function() {
        // returning to homepage as the CBeebies page changes the navigation bar
        cy.visit('https://www.bbc.co.uk');

        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Food').click();
        cy.url().should('include', '/food');
    });

    it('Check Bitesize button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Bitesize').click();
        cy.url().should('include', '/bitesize');
    });

    it('Check Arts button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Arts').click();
        cy.url().should('include', '/arts');
    });

    it('Check Taster button', function() {
        // the Taster navigation button seems to be throwing some sort of error some of the time
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Taster').click();
        cy.url().should('include', '/taster');
    });

    it('Check Local button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Local').click();
        cy.url().should('include', '/news/localnews');
    });

    it('Check TV button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('TV').click();
        cy.url().should('include', '/iplayer/guide');
    });

    it('Check Radio button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Radio').click();
        cy.url().should('include', '/sounds');
    });

    it('Check Three button', function() {
        cy.get('#orb-nav-more')
            .contains('More').click();
        cy.get('#orb-panel-more')
            .contains('Three').click();
        cy.url().should('include', '/bbcthree');
    });
});

describe('Testing the search bar functionality to find something on the site', function() {
    it('Going to BBC homepage', function() {
        // navigate to the bbc homepage
        cy.visit('https://www.bbc.co.uk');
    });

    it('Checking that the search bar has the field value expected', function() {
        // find the search bar element and typing a search query
        cy.get('#orb-search-q')
            .type('g');
        // the search bar is replaced by an extended one
        cy.get('#se-searchbox-input-field')
            .type('eneral election polls', {delay : 50})
            .should('have.value', 'general election polls');
    });

    it('Checking the search button leads to the right page', function() {
        // clicking the submit button
        cy.get('.se-searchbox__submit').click();

        // checking it lead to the correct page
        cy.url().should('include', '/search?q=general+election+polls');
    });
});

describe('Testing the account and BBC homepage buttons', function () {
    it('Navigating to BBC homepage', function () {
        cy.visit('https://www.bbc.co.uk')
    });

    it('Checking the account page button', function () {
        cy.get('#idcta-link').click();
        cy.url().should('include', '/account');
        // This throws an error, presumably because it changes website to 'account.bbc.co.uk'
    });

    it('Checking the homepage button', function () {
        // Going to news section to test homepage button
        cy.visit('https://www.bbc.co.uk/news');
        cy.get('.orb-nav-section')
            .contains('Homepage').click();
        cy.url()
            .should('equal', 'https://www.bbc.co.uk/');
    })
});
