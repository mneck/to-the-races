import { Link } from 'react-router-dom'
import { User } from '../types'

export default function Navbar({ user, onLogout }: { user: User | null, onLogout: () => void }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">To The Races</Link>
        <div className="nav-links">
          <Link to="/plans">Plans</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={onLogout} data-testid="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" data-testid="login-nav-button">Login</Link>
              <Link to="/register" data-testid="register-nav-button">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
