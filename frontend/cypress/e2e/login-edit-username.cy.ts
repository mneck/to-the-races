/// <reference types="cypress" />

describe('Login and Edit Username', () => {
  let testEmail: string

  before(() => {
    // Create a user to login with
    const randomSuffix = Date.now()
    testEmail = `username${randomSuffix}@example.com`
    
    cy.visit('/register')
    cy.get('[data-testid="name-input"]').type('Username User')
    cy.get('[data-testid="username-input"]').type(`origuser${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="register-button"]').click()
    cy.clearCookies()
  })

  it('should login and edit username', () => {
    cy.visit('/login')
    
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="login-button"]').click()
    
    // On dashboard, check original username
    cy.get('.profile-view').should('contain', 'origuser')
    
    // Edit profile
    cy.get('[data-testid="edit-profile-button"]').click()
    cy.get('[data-testid="edit-username-input"]').clear().type('newusername')
    cy.get('[data-testid="save-profile-button"]').click()
    
    // Verify username was updated
    cy.get('.profile-view').should('contain', 'newusername')
  })
})
