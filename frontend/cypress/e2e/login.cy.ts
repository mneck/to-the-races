/// <reference types="cypress" />

describe('Login', () => {
  let testEmail: string

  before(() => {
    // Create a user to login with
    const randomSuffix = Date.now()
    testEmail = `login${randomSuffix}@example.com`
    
    cy.visit('/register')
    cy.get('[data-testid="name-input"]').type('Login User')
    cy.get('[data-testid="username-input"]').type(`loginuser${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="register-button"]').click()
    cy.clearCookies()
  })

  it('should login successfully', () => {
    cy.visit('/login')
    
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="login-button"]').click()
    
    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'Welcome')
  })
})
