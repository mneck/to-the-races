import { test, expect } from '@playwright/test'

test('Login and Edit Account Name', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-edit${randomSuffix}@example.com`
  
  // Create user
  await page.goto('/register')
  await page.getByTestId('name-input').fill('Original Name')
  await page.getByTestId('username-input').fill(`edituser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('register-button').click()
  
  // Clear and login
  await page.context().clearCookies()
  await page.goto('/login')
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('login-button').click()
  
  // On dashboard, edit profile
  await page.getByTestId('edit-profile-button').click()
  await page.getByTestId('edit-name-input').fill('Updated Name')
  await page.getByTestId('save-profile-button').click()
  
  // Verify update
  await expect(page.locator('.profile-view')).toContainText('Updated Name')
})
