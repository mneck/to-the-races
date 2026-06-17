import { test, expect } from '@playwright/test'

test('Login and Cancel Subscription', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-cancel${randomSuffix}@example.com`
  
  // Create user and purchase subscription
  await page.goto('/register')
  await page.getByTestId('name-input').fill('Cancel User')
  await page.getByTestId('username-input').fill(`canceluser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('register-button').click()
  
  // Purchase subscription
  await page.getByTestId('view-plans-button').click()
  await page.getByTestId('purchase-basic-button').click()
  
  // Clear and login
  await page.context().clearCookies()
  await page.goto('/login')
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('login-button').click()
  
  // Verify subscription exists
  await expect(page.locator('.subscription-card')).toContainText('basic')
  
  // Cancel subscription
  page.on('dialog', dialog => dialog.accept())
  await page.getByTestId('cancel-subscription-button').click()
  
  // Verify cancellation
  await expect(page.locator('.subscription-card')).toContainText('No active subscription')
})
