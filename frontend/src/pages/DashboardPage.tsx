import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { User, Subscription } from '../types'

interface DashboardPageProps {
  user: User
  onUserUpdate: (updates: { name: string; username: string }) => void
}

export default function DashboardPage({ user, onUserUpdate }: DashboardPageProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.getSubscription()
      .then(res => setSubscription(res.data))
      .catch(() => setSubscription(null))
  }, [])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await api.updateMe({ name, username })
      onUserUpdate({ name, username })
      setEditing(false)
    } catch (err) {
      console.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      await api.cancelSubscription()
      setSubscription(null)
    }
  }

  return (
    <div className="page dashboard-page">
      <h1>Welcome, {user.name}!</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card profile-card">
          <h2>Your Profile</h2>
          {editing ? (
            <div className="profile-edit">
              <div className="form-group">
                <label>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="edit-name-input"
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="edit-username-input"
                />
              </div>
              <button onClick={handleSaveProfile} disabled={loading} data-testid="save-profile-button">
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
              <button onClick={() => setEditing(false)} data-testid="cancel-edit-button">Cancel</button>
            </div>
          ) : (
            <div className="profile-view">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <button onClick={() => setEditing(true)} data-testid="edit-profile-button">Edit Profile</button>
            </div>
          )}
        </div>

        <div className="dashboard-card subscription-card">
          <h2>Your Subscription</h2>
          {subscription ? (
            <div>
              <p><strong>Plan:</strong> {subscription.planType}</p>
              <p><strong>Status:</strong> {subscription.status}</p>
              <button
                onClick={handleCancelSubscription}
                className="cancel-button"
                data-testid="cancel-subscription-button"
              >
                Cancel Subscription
              </button>
            </div>
          ) : (
            <div>
              <p>No active subscription</p>
              <Link to="/plans" className="cta-button" data-testid="view-plans-button">View Plans</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
