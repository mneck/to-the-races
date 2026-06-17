import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { User } from './types'
import { getAuthToken, clearAuthToken } from './services/api'
import { api } from './services/api'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PlansPage from './pages/PlansPage'

// Components
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      api.getMe()
        .then(res => setUser(res.data))
        .catch(() => clearAuthToken())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div className="loading">Loading...</div>

  return (
    <Router>
      <Navbar user={user} onLogout={() => { clearAuthToken(); setUser(null) }} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage onLogin={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <RegisterPage onLogin={setUser} /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={user
              ? <DashboardPage
                  user={user}
                  onUserUpdate={(updates) => setUser(prev => prev ? { ...prev, ...updates } : prev)}
                />
              : <Navigate to="/login" />
            }
          />
          <Route path="/plans" element={<PlansPage user={user} />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
