import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { checkoutApi } from '../api/client';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { user, logout } = useAuth();
  const [productName, setProductName] = useState('Test Product');
  const [amount, setAmount] = useState('9.99');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const amountInCents = Math.round(parseFloat(amount) * 100);
      if (isNaN(amountInCents) || amountInCents < 50) {
        setError('Amount must be at least $0.50');
        return;
      }
      const { url } = await checkoutApi.createSession(
        productName,
        amountInCents,
        'usd'
      );
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>To The Races</h1>
        <div className="user-menu">
          <span className="user-email">{user?.displayName || user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="checkout-main">
        <div className="checkout-card">
          <h2>Checkout</h2>
          <p className="checkout-desc">
            Complete your purchase using Stripe test checkout. Use card 4242 4242 4242 4242 for successful payment.
          </p>

          <form onSubmit={handleCheckout} className="checkout-form">
            {error && (
              <div className="error-message" data-testid="checkout-error">
                {error}
              </div>
            )}

            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              data-testid="checkout-product-name"
            />

            <label htmlFor="amount">Amount (USD)</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              data-testid="checkout-amount"
            />

            <button
              type="submit"
              disabled={isLoading}
              data-testid="checkout-submit"
            >
              {isLoading ? 'Redirecting...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
