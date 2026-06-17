/// <reference types="cypress" />

describe('Create New User', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should create a new user successfully', () => {
    const randomSuffix = Date.now()
    const email = `user${randomSuffix}@example.com`
    
    cy.get('[data-testid="name-input"]').type('John Doe')
    cy.get('[data-testid="username-input"]').type(`johndoe${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type('Password123!')
    
    cy.get('[data-testid="register-button"]').click()
    
    // Should redirect to dashboard after successful registration
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'Welcome')
  })
})
