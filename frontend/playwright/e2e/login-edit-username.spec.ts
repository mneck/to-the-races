import { test, expect } from '@playwright/test'

test('Login and Edit Username', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-username${randomSuffix}@example.com`
  
  // Create user
  await page.goto('/register')
  await page.getByTestId('name-input').fill('Username User')
  await page.getByTestId('username-input').fill(`origuser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('register-button').click()
  
  // Clear and login
  await page.context().clearCookies()
  await page.goto('/login')
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  await page.getByTestId('login-button').click()
  
  // On dashboard, verify original username
  await expect(page.locator('.profile-view')).toContainText(`origuser${randomSuffix}`)
  
  // Edit profile
  await page.getByTestId('edit-profile-button').click()
  await page.getByTestId('edit-username-input').fill('newusername')
  await page.getByTestId('save-profile-button').click()
  
  // Verify update
  await expect(page.locator('.profile-view')).toContainText('newusername')
})
