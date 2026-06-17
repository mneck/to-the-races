import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PlansPage from '../pages/PlansPage'

describe('PlansPage', () => {
  it('renders subscription plans', () => {
    render(<BrowserRouter><PlansPage user={null} /></BrowserRouter>)
    
    expect(screen.getByText(/subscription plans/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /basic/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /premium/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /elite/i })).toBeInTheDocument()
  })

  it('shows purchase buttons', () => {
    render(<BrowserRouter><PlansPage user={null} /></BrowserRouter>)
    
    expect(screen.getByTestId('purchase-basic-button')).toBeInTheDocument()
    expect(screen.getByTestId('purchase-premium-button')).toBeInTheDocument()
    expect(screen.getByTestId('purchase-elite-button')).toBeInTheDocument()
  })
})
