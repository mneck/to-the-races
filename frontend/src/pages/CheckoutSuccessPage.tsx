import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CheckoutSuccessPage.css';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user, logout } = useAuth();

  return (
    <div className="success-page">
      <header className="checkout-header">
        <h1>Open Loupe Concepts</h1>
        <div className="user-menu">
          <span className="user-email">{user?.displayName || user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="success-main">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Your payment has been processed.</p>
          {sessionId && (
            <p className="session-id" data-testid="session-id">
              Session ID: {sessionId}
            </p>
          )}
          <Link to="/checkout" className="back-link">
            Back to Checkout
          </Link>
        </div>
      </main>
    </div>
  );
}
