/// <reference types="cypress" />

describe('Login and Edit Account Name', () => {
  let testEmail: string

  before(() => {
    // Create a user to login with
    const randomSuffix = Date.now()
    testEmail = `edit${randomSuffix}@example.com`
    
    cy.visit('/register')
    cy.get('[data-testid="name-input"]').type('Original Name')
    cy.get('[data-testid="username-input"]').type(`edituser${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="register-button"]').click()
    cy.clearCookies()
  })

  it('should login and edit account name', () => {
    cy.visit('/login')
    
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="login-button"]').click()
    
    // On dashboard
    cy.url().should('include', '/dashboard')
    cy.get('[data-testid="edit-profile-button"]').click()
    
    // Edit profile
    cy.get('[data-testid="edit-name-input"]').clear().type('Updated Name')
    cy.get('[data-testid="save-profile-button"]').click()
    
    // Verify name was updated
    cy.get('.profile-view').should('contain', 'Updated Name')
  })
})
