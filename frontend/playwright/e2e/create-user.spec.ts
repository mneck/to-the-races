import { test, expect } from '@playwright/test'

test('Create New User', async ({ page }) => {
  const randomSuffix = Date.now()
  const email = `pw-user${randomSuffix}@example.com`
  
  await page.goto('/register')
  
  await page.getByTestId('name-input').fill('Playwright User')
  await page.getByTestId('username-input').fill(`pwuser${randomSuffix}`)
  await page.getByTestId('email-input').fill(email)
  await page.getByTestId('password-input').fill('Password123!')
  
  await page.getByTestId('register-button').click()
  
  // Should redirect to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/)
  await expect(page.locator('h1')).toContainText('Welcome')
})
