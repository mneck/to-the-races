/// <reference types="cypress" />

describe('Login and Cancel Subscription', () => {
  let testEmail: string

  before(() => {
    // Create a user and purchase a subscription
    const randomSuffix = Date.now()
    testEmail = `cancel${randomSuffix}@example.com`
    
    cy.visit('/register')
    cy.get('[data-testid="name-input"]').type('Cancel User')
    cy.get('[data-testid="username-input"]').type(`canceluser${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="register-button"]').click()
    
    // Purchase subscription
    cy.get('[data-testid="view-plans-button"]').click()
    cy.get('[data-testid="purchase-basic-button"]').click()
    
    cy.clearCookies()
  })

  it('should login and cancel subscription', () => {
    cy.visit('/login')
    
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="login-button"]').click()
    
    // On dashboard with subscription
    cy.get('.subscription-card').should('contain', 'basic')
    
    // Cancel subscription
    cy.get('[data-testid="cancel-subscription-button"]').click()
    cy.on('window:confirm', () => true)
    
    // Verify subscription was cancelled
    cy.get('.subscription-card').should('contain', 'No active subscription')
  })
})
