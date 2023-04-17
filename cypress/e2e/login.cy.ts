describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('displays login page with email form', () => {
    cy.get('h1').contains('Log in')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('button').contains('Next').should('be.visible')
    cy.get('button').contains('Signup for free').should('be.visible')
  })

  it('enters an email and proceeds to password form', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('button').contains('Next').click()
    cy.get('h1').contains('Log in with')
    cy.get('p').contains('test@example.com')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button').contains('Login').should('be.visible')
    cy.get('span').contains('Forgot password?').should('be.visible')
  })

  it('handles empty email', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('button').contains('Next').click()
    cy.get('a').contains('Change').click()
    cy.get('input[type="email"]').should('be.visible')
  })

  it('handles invalid email format', () => {
    cy.get('input[type="email"]').type('invalid_email')
    cy.get('button').contains('Next').click()
    cy.get('span[role="alert"]').contains('Please provide a valid email').should('be.visible')
  })

  it('handles failed login with incorrect password', () => {
    cy.intercept('POST', 'https://auth.us-east-2.dev.propeldata.com/cognito').as('signIn')

    cy.get('input[type="email"]').type('test@example.com')
    cy.get('button').contains('Next').click()
    cy.get('input[type="password"]').type('wrong_password')
    cy.get('button').contains('Login').click()

    cy.wait('@signIn').its('response.statusCode').should('eq', 400)
  })

  it('handles successful login', () => {
    cy.intercept('POST', 'https://auth.us-east-2.dev.propeldata.com/cognito').as('signIn')

    cy.get('input[type="email"]').type('propel+development@propeldata.com')
    cy.get('button').contains('Next').click()
    cy.get('input[type="password"]').type('rfd=>dc23kT#}KznQPwfjx')
    cy.get('button').contains('Login').click()

    cy.wait('@signIn').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/')
  })
})

export {}
