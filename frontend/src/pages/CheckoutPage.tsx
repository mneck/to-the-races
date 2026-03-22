import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { checkoutApi } from '../api/client';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { user, logout } = useAuth();
  const productPrices: Record<string, string> = {
    'Professional Loupe Magnifier': '49.99',
    'Classic Hand Magnifier': '24.99',
    'Illuminated LED Loupe': '79.99',
    'Pocket Magnifier Set': '14.99',
  };
  const [productName, setProductName] = useState('Professional Loupe Magnifier');
  const [amount, setAmount] = useState(productPrices['Professional Loupe Magnifier']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const amountInCents = Math.round(parseFloat(amount) * 100);
      if (isNaN(amountInCents) || amountInCents < 50) {
        setError('Amount must be at least €0.50');
        return;
      }
      const { url } = await checkoutApi.createSession(
        productName,
        amountInCents,
        'eur'
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
        <h1>Open Loupe Concepts</h1>
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
            Complete your magnifier purchase. Use card 4242 4242 4242 4242 for test payments.
          </p>

          <form onSubmit={handleCheckout} className="checkout-form">
            {error && (
              <div className="error-message" data-testid="checkout-error">
                {error}
              </div>
            )}

            <label htmlFor="productName">Magnifier</label>
            <select
              id="productName"
              value={productName}
              onChange={(e) => {
                const selected = e.target.value;
                setProductName(selected);
                setAmount(productPrices[selected] ?? amount);
              }}
              data-testid="checkout-product-name"
            >
              <option value="Professional Loupe Magnifier">Professional Loupe Magnifier — €49.99</option>
              <option value="Classic Hand Magnifier">Classic Hand Magnifier — €24.99</option>
              <option value="Illuminated LED Loupe">Illuminated LED Loupe — €79.99</option>
              <option value="Pocket Magnifier Set">Pocket Magnifier Set — €14.99</option>
            </select>

            <label htmlFor="amount">Amount (EUR)</label>
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
