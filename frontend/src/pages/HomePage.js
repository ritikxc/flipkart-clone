import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import './HomePage.css';

const BANNERS = [
  { link: '/products', image: '/images/banners/bbd.png', alt: 'Big Billion Days - Biggest Sale of the Year' },
  { link: '/products?category=electronics', image: '/images/banners/electronics.png', alt: 'Electronics Fest - Upto 70% Off' },
  { link: '/products?category=fashion', image: '/images/banners/fashion.png', alt: 'Fashion Week - New Arrivals' },
];

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchCategories().then((r) => r.data).catch(() => []),
      fetchProducts({ limit: 20, sort: 'popularity' }).then((r) => r.data).catch(() => ({ products: [] })),
    ])
      .then(([cats, prodData]) => {
        if (cancelled) return;
        setCategories(Array.isArray(cats) ? cats : []);
        setFeatured(prodData?.products ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const nextBanner = useCallback(() => setBannerIdx((i) => (i + 1) % BANNERS.length), []);
  const prevBanner = useCallback(() => setBannerIdx((i) => (i - 1 + BANNERS.length) % BANNERS.length), []);

  useEffect(() => {
    const t = setInterval(nextBanner, 4000);
    return () => clearInterval(t);
  }, [nextBanner]);

  const banner = BANNERS[bannerIdx];

  if (loading) {
    return (
      <div className="home-page home-page--loading">
        <div className="spinner-wrap" aria-busy="true" aria-label="Loading homepage">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-banner">
        <Link to={banner.link} className="hero-banner-link">
          <img src={banner.image} alt={banner.alt} className="hero-banner-img" />
        </Link>
        <div className="hero-banner-inner">
          <button type="button" onClick={prevBanner} className="banner-arrow banner-arrow-left" aria-label="Previous banner">‹</button>
          <div className="banner-dots">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot ${i === bannerIdx ? 'active' : ''}`}
                onClick={() => setBannerIdx(i)}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={nextBanner} className="banner-arrow banner-arrow-right" aria-label="Next banner">›</button>
        </div>
      </div>

      <section className="section category-section">
        <div className="container section-inner">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link to="/products" className="see-all">See All →</Link>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card">
                <div className="category-icon">
                  <img src={`/images/categories/${cat.slug}.png`} alt={cat.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/64?text=' + cat.name.substring(0, 1) }} />
                </div>
                <p className="category-name">{cat.name}</p>
                <p className="category-count">{cat.product_count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="deals-strip">
        <div className="container deals-strip-inner">
          {['Free Delivery on orders above ₹500 🚚', 'Easy 30-Day Returns 🔄', 'Secure Payments 🔒', '24/7 Customer Support 🎧', 'Flipkart Plus Rewards 🌟'].map((d, i) => (
            <React.Fragment key={i}>
              <span>{d}</span>
              {i < 4 && <span className="strip-divider">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container section-inner">
          <div className="section-header">
            <h2>Trending Products</h2>
            <Link to="/products" className="see-all">See All →</Link>
          </div>
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-section container">
        <div
          className="promo-card card"
          style={{ background: 'linear-gradient(135deg, #6a1b9a, #4a148c)' }}
          onClick={() => navigate('/products?category=electronics')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/products?category=electronics')}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true">📱</span>
          <div>
            <h3>Electronics Bonanza</h3>
            <p>Up to 60% off on phones & laptops</p>
            <span className="promo-link">Shop Now →</span>
          </div>
        </div>
        <div
          className="promo-card card"
          style={{ background: 'linear-gradient(135deg, #c62828, #b71c1c)' }}
          onClick={() => navigate('/products?category=fashion')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/products?category=fashion')}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true">👗</span>
          <div>
            <h3>Fashion Fiesta</h3>
            <p>Latest trends at unbeatable prices</p>
            <span className="promo-link">Explore →</span>
          </div>
        </div>
        <div
          className="promo-card card"
          style={{ background: 'linear-gradient(135deg, #1565c0, #0d47a1)' }}
          onClick={() => navigate('/products?category=home-furniture')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/products?category=home-furniture')}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true">🛋️</span>
          <div>
            <h3>Home Makeover</h3>
            <p>Transform your space for less</p>
            <span className="promo-link">Discover →</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
