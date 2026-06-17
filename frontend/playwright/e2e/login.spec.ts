import { test, expect } from '@playwright/test'

test('Login', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-login${randomSuffix}@example.com`
  
  // First create a user
  await page.goto('/register')
  await page.getByTestId('name-input').fill('Login User')
  await page.getByTestId('username-input').fill(`loginuser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('register-button').click()
  
  // Clear storage and go to login
  await page.context().clearCookies()
  await page.goto('/login')
  
  // Login
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('login-button').click()
  
  // Should redirect to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/)
  await expect(page.locator('h1')).toContainText('Welcome')
})
