import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={() => {}} />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByTestId('login-button')).toBeInTheDocument()
  })

  it('allows user to type in email and password fields', async () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={() => {}} />
      </BrowserRouter>
    )
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('shows link to register page', () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={() => {}} />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/register here/i)).toBeInTheDocument()
  })
})
