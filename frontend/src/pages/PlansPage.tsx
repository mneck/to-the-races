import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { User, Plan } from '../types'

const PLANS: Plan[] = [
  { id: 'basic', name: 'Basic', price: 9.99, description: 'Access to basic race feeds' },
  { id: 'premium', name: 'Premium', price: 19.99, description: 'Live feeds + expert tips' },
  { id: 'elite', name: 'Elite', price: 29.99, description: 'All features + exclusive stats' }
]

export default function PlansPage({ user }: { user: User | null }) {
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handlePurchase = async (planType: string) => {
    if (!user) return

    setPurchasing(planType)
    setError('')

    try {
      await api.createSubscription({ planType })
      navigate('/dashboard')
    } catch (err) {
      setError('Subscription failed. Please try again.')
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <div className="page plans-page">
      <h1>Subscription Plans</h1>
      <p>Choose the plan that's right for you</p>

      {error && <div className="error-message" data-testid="plans-error-message">{error}</div>}

      <div className="plans-grid">
        {PLANS.map(plan => (
          <div key={plan.id} className={`plan-card ${plan.id}`}>
            <h3>{plan.name}</h3>
            <p className="price">${plan.price}/month</p>
            <p>{plan.description}</p>
            <button
              onClick={() => handlePurchase(plan.id)}
              disabled={!!purchasing || !user}
              data-testid={`purchase-${plan.id}-button`}
            >
              {purchasing === plan.id ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
