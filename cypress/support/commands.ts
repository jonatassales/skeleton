/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<any>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')

  cy.intercept('POST', 'https://auth.us-east-2.dev.propeldata.com/cognito').as('signIn')

  cy.get('input[type="email"]').type(email)
  cy.get('button').contains('Next').click()
  cy.get('input[type="password"]').type(password)
  cy.get('button').contains('Login').click()

  cy.wait('@signIn').its('response.statusCode').should('eq', 200)
  cy.url().should('include', '/')
})
