function returnToHome() {
    it('Navigating to BBC homepage', function() {
        // visiting BBC homepage
        cy.visit('https://www.bbc.co.uk');
    });
}

// for testing the navigation buttons
function testNavButton(navName, pageName){
    it('Check the ' + navName + ' button', function() {
        // finding the news navbar element
        cy.get('.orb-nav-' + navName.toLowerCase())
            .contains(navName).click();
        // checking it navigated to the right page
        cy.url().should('include', '/' + pageName);
    });
}

// for testing the navigation buttons hidden under the 'More' tab
function testNavMoreSection(navName, pageName){
    it('Check ' + navName + ' button', function() {
        // clicking on more button
        cy.get('#orb-nav-more')
            .contains('More').click();
        // returning to home page as the navigation bar changes on the CBBC section
        cy.get('#orb-panel-more')
            .contains(navName).click();
        cy.url().should('include', '/' + pageName);
    });
}

describe('Testing that the navigation bar buttons navigate to the correct sites', function() {
    returnToHome();

    testNavButton('News', 'news');
    testNavButton('Sport', 'sport');
    testNavButton('Weather', 'weather');
    testNavButton('iPlayer', 'iplayer');
    testNavButton('Sounds', 'sounds');
    testNavButton('CBBC', 'cbbc');

    // returning to home page as the navigation bar changes on the CBBC section
    returnToHome();
    it('Check More button', function() {
        // clicking on more button
        cy.get('#orb-nav-more')
            .contains('More').click();
        // checking the panel has expanded
        cy.get('.orb-panel')
            .invoke('css', 'display')
            .should('not.equal', 'none');
        // closing it down again
        cy.get('#orb-nav-more')
            .contains('More').click();
    });

    testNavMoreSection('CBeebies', 'cbeebies');
    // returning to home page as the navigation bar changes on the CBeebies section
    returnToHome();

    testNavMoreSection('Food', 'food');
    testNavMoreSection('Bitesize', 'bitesize');
    testNavMoreSection('Arts', 'arts');
    testNavMoreSection('Taster', 'taster');
    testNavMoreSection('Local', 'news/localnews');
    testNavMoreSection('TV', 'iplayer/guide');
    testNavMoreSection('Radio', 'sounds');
    testNavMoreSection('Three', 'bbcthree');
});

describe('Testing the search bar functionality to find something on the site', function() {
    returnToHome();

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
    returnToHome();

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
