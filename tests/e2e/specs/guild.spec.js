/// <reference types="Cypress" />

describe('Character lookup tests', () => {

    it('Looks up a guild', () => {
        cy.visit('/#/guilds');
        cy.get('#realm').clear().type('the maelstrom');
        cy.get('#guildName').clear().type('starlight');
        cy.get('#region').select('EU');
        cy.get('#findGuildButton').click();
        cy.get('#seeMoreGuildButton').should('visible');
    })

    it('Can see more about a guild', () => {
        cy.visit('/#/guilds');
        cy.get('#realm').clear().type('the maelstrom');
        cy.get('#guildName').clear().type('starlight');
        cy.get('#region').select('EU');
        cy.get('#findGuildButton').click();
        cy.get('#seeMoreGuildButton').click();
        cy.url().should('match', RegExp('/#/guilds/EU/the%20maelstrom/starlight$'))
    })

})
