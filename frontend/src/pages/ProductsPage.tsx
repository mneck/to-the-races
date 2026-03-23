import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import './pages.css';

export default function ProductsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Open Loupe Concepts</h1>
        <div className="user-menu">
          <span className="user-email">{user?.displayName || user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="products-main">
        <h2 className="products-title">Our Magnifiers</h2>
        <p className="products-subtitle">
          Precision optics for every need. Click a product to learn more.
        </p>

        <div className="products-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
              data-testid={`product-card-${product.id}`}
            >
              <div className="product-card-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="26" cy="26" r="18" stroke="#6366f1" strokeWidth="4" />
                  <line x1="39" y1="39" x2="56" y2="56" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-desc">{product.shortDescription}</p>
              <span className="product-card-price">€{product.price}</span>
              <span className="product-card-cta">View Details →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
