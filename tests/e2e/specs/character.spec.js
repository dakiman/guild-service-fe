/// <reference types="Cypress" />

describe('Character lookup tests', () => {

    it('Looks up a character', () => {
        cy.visit('/characters');
        cy.get('#realm').clear().type('the maelstrom');
        cy.get('#character').clear().type('sernaos');
        cy.get('#region').select('EU');
        cy.get('#findCharacterButton').click();
        cy.get('#characterContainer').should('visible');
    })

    it('Can see more about a character', () => {
        cy.visit('/characters');
        cy.get('#realm').clear().type('the maelstrom');
        cy.get('#character').clear().type('sernaos');
        cy.get('#region').select('EU');
        cy.get('#findCharacterButton').click();
        cy.get('#seeMoreCharacterButton').click();
        cy.url().should('match', RegExp('/characters/EU/the%20maelstrom/sernaos$'))
    })

})
