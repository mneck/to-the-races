import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductById } from '../data/products';
import './pages.css';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="product-detail-page">
        <header className="detail-header">
          <h1>Open Loupe Concepts</h1>
          <div className="user-menu">
            <span className="user-email">{user?.displayName || user?.email}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </header>
        <main className="detail-main">
          <p className="detail-not-found">Product not found.</p>
          <Link to="/products" className="back-link">← Back to Products</Link>
        </main>
      </div>
    );
  }

  function handleBuyNow() {
    navigate(`/checkout?product=${encodeURIComponent(product!.name)}`);
  }

  return (
    <div className="product-detail-page">
      <header className="detail-header">
        <h1>Open Loupe Concepts</h1>
        <div className="user-menu">
          <span className="user-email">{user?.displayName || user?.email}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="detail-main">
        <Link to="/products" className="back-link" data-testid="back-to-products">
          ← Back to Products
        </Link>

        <div className="detail-card">
          <div className="detail-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="18" stroke="#6366f1" strokeWidth="4" />
              <line x1="39" y1="39" x2="56" y2="56" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="detail-content">
            <h2 className="detail-name" data-testid="product-name">{product.name}</h2>
            <p className="detail-description" data-testid="product-description">
              {product.description}
            </p>
            <div className="detail-price" data-testid="product-price">€{product.price}</div>
            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              data-testid="buy-now-btn"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
