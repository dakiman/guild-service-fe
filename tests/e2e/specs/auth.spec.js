/// <reference types="Cypress" />

describe('Authentication tests', () => {

    it('Logs in succesfully and is redirected', () => {
        cy.visit('/#/login');
        cy.get('#email').clear().type('daki@daki.com');
        cy.get('#password').clear().type('password');
        cy.get('#loginButton').click();
        cy.url().should('match', RegExp('/#/$'));
        cy.get('#userDropdown').should('visible');
    })

    it('Can access profile if authenticated (auth middleware)', () => {
        cy.login('daki@daki.com', 'password');
        cy.visit('/#/profile');
        cy.url().should('match', RegExp('/#/profile$'));
    })

    it('Cannot access login page again (guest middleware)', () => {
        cy.login('daki@daki.com', 'password');
        cy.visit('/#/login');
        cy.url().should('match', RegExp('/#/$'));
        cy.get('#userDropdown').should('visible');
    })

    it('Registers a new user', () => {
        cy.visit('/#/register');
        cy.get('#name').clear().type(Math.random().toString(36).substr(2, 7));
        cy.get('#email').clear().type(Math.random().toString(36).substr(2, 7) + '@email.com');
        cy.get('#password').clear().type('password');
        cy.get('#registerButton').click();

        cy.url().should('match', RegExp('/#/$'));
        cy.get('#userDropdown').should('visible');
    })

})
