/// <reference types="cypress" />

describe('Login and Purchase Subscription', () => {
  let testEmail: string

  before(() => {
    // Create a user to login with
    const randomSuffix = Date.now()
    testEmail = `purchase${randomSuffix}@example.com`
    
    cy.visit('/register')
    cy.get('[data-testid="name-input"]').type('Purchase User')
    cy.get('[data-testid="username-input"]').type(`purchaseuser${randomSuffix}`)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="register-button"]').click()
    cy.clearCookies()
  })

  it('should login and purchase a subscription', () => {
    cy.visit('/login')
    
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type('Password123!')
    cy.get('[data-testid="login-button"]').click()
    
    // Go to plans page
    cy.get('[data-testid="view-plans-button"]').click()
    cy.url().should('include', '/plans')
    
    // Purchase basic plan
    cy.get('[data-testid="purchase-basic-button"]').click()
    
    // Should show success and redirect to dashboard
    cy.get('.subscription-card').should('contain', 'basic')
  })
})
