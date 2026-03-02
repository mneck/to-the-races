import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>To The Races</h1>
        <div className="nav">
          <span className="user-info">Welcome, {user?.displayName || user?.email}</span>
          <Link to="/checkout" className="nav-link">
            Checkout
          </Link>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="hero">
          <h2>E2E Testing Practice</h2>
          <p>Use this app to practice end-to-end testing with login and Stripe checkout flows.</p>
          <Link to="/checkout" className="cta-button" data-testid="go-to-checkout">
            Go to Checkout
          </Link>
        </div>
      </main>
    </div>
  );
}
