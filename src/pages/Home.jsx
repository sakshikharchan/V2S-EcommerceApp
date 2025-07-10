import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Home.css';
import Filters from '../components/Product/Filters.jsx'; // Adjust the import path as necessary

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data || []);
      } catch (error) {
        setError('Failed to fetch products. Please check the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="ecommerce-app">
      {/* Header */}
      <header className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container px-4 d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-brand fw-bold text-primary fs-4">
            <i className="fas fa-shopping-cart me-2 text-warning"></i>E-Shop
          </Link>

          <form className="d-flex flex-grow-1 mx-3" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2 rounded-pill px-4"
              type="search"
              placeholder="Search for products, brands and more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-primary rounded-pill px-3" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center gap-3">
            <Link to="/register" className="btn btn-outline-primary rounded-pill px-4">
              <i className="fas fa-user-plus me-2"></i>Register
            </Link>
            <Link to="/checkout" className="btn btn-outline-secondary rounded-pill px-4">
              <i className="fas fa-shopping-bag me-2"></i>Cart
            </Link>
          </div>
        </div>
      </header>

      {/* Category Navigation
      <nav className="bg-light py-2 shadow-sm border-top">
        <div className="container px-4 d-flex flex-wrap gap-3 justify-content-start">
          {['Electronics', 'Fashion', 'Home', 'Appliances', 'Toys'].map((cat) => (
            <Link
              key={cat}
              to={`/${cat.toLowerCase()}`}
              className="text-decoration-none text-dark fw-semibold nav-link"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav> */}

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-content">
          <h1 className="banner-title">Great Deals On Top Brands</h1>
          <p className="banner-subtitle">Up to 70% Off</p>
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>
      </section>
      <Filters
        onFilterChange={() => { }}
        onSortChange={() => { }}
      />

      {/* <Shop /> */}
      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`} className="product-link">
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-pricing">
                          <span className="current-price">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                          {product.discount && (
                            <span className="discount">{product.discount}% off</span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="product-actions d-flex justify-content-between px-3 pb-3">
                      <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm w-50 me-2">
                        Details
                      </Link>
                      <button
                        className="btn btn-primary btn-sm w-50"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">No products match your search.</div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/careers" className="footer-link">Careers</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Help</h4>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/returns" className="footer-link">Returns</Link>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Policy</h4>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Use</Link>
            <Link to="/security" className="footer-link">Security</Link>
          </div>
        </div>
        <div className="copyright">
          © 2023 E-Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
