import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

describe('RegisterPage', () => {
  it('renders registration form', () => {
    render(
      <BrowserRouter>
        <RegisterPage onLogin={() => {}} />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByTestId('register-button')).toBeInTheDocument()
  })

  it('has all required input fields', () => {
    render(
      <BrowserRouter>
        <RegisterPage onLogin={() => {}} />
      </BrowserRouter>
    )
    
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThanOrEqual(3)
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
