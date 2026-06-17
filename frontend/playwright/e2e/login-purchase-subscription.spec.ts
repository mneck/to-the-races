import { test, expect } from '@playwright/test'

test('Login and Purchase Subscription', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-purchase${randomSuffix}@example.com`
  
  // Create user
  await page.goto('/register')
  await page.getByTestId('name-input').fill('Purchase User')
  await page.getByTestId('username-input').fill(`purchaseuser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('register-button').click()
  
  // Clear and login
  await page.context().clearCookies()
  await page.goto('/login')
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('login-button').click()
  
  // Go to plans and purchase
  await page.getByTestId('view-plans-button').click()
  await page.getByTestId('purchase-basic-button').click()
  
  // Verify subscription
  await expect(page.locator('.subscription-card')).toContainText('basic')
})
