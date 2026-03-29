import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProduct, toggleWishlist, checkWishlist } from '../utils/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [addingCart, setAddingCart] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');
  const [mainImgError, setMainImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setLoadError(false);
    setMainImgError(false);
    fetchProduct(id)
      .then(({ data }) => {
        setProduct(data);
        setSelectedImg(0);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
    checkWishlist(id)
      .then(({ data }) => setWishlisted(data.wishlisted))
      .catch(() => {});
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const fromApi = Array.isArray(product.images) ? product.images.filter((x) => x?.image_url) : [];
    if (fromApi.length) return fromApi;
    const fallback = product.primary_image || product.image;
    return fallback ? [{ image_url: fallback }] : [];
  }, [product]);

  useEffect(() => {
    setMainImgError(false);
  }, [selectedImg, galleryImages]);

  const handlePrevImg = () => {
    setSelectedImg((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setSelectedImg((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = async () => {
    setAddingCart(true);
    await addToCart(product.id);
    setAddingCart(false);
  };

  const handleBuyNow = async () => {
    const ok = await addToCart(product.id);
    if (ok) navigate('/cart');
  };

  const handleWishlist = async () => {
    try {
      const { data } = await toggleWishlist(product.id);
      setWishlisted(data.wishlisted);
    } catch {
      /* toast could be added */
    }
  };

  if (loading) {
    return (
      <div className="pdp-page">
        <div className="spinner-wrap" aria-busy="true">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (loadError || !product) {
    return (
      <div className="pdp-page page-surface">
        <div className="pdp-container">
          <div className="empty-state-msg">
            <h2>Product unavailable</h2>
            <p>We couldn&apos;t load this product. It may have been removed or the link is invalid.</p>
            <Link to="/products" className="btn-primary">
              Browse products
            </Link>
            <Link to="/" className="see-all pdp-error-back">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const highlights = (() => {
    try {
      return typeof product.highlights === 'string' ? JSON.parse(product.highlights) : product.highlights;
    } catch {
      return [];
    }
  })();

  const specs = (() => {
    try {
      return typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications;
    } catch {
      return {};
    }
  })();

  const mainSrc = galleryImages[selectedImg]?.image_url || '';
  const breadcrumbTitle = product.name.length > 52 ? `${product.name.slice(0, 52)}…` : product.name;

  return (
    <div className="pdp-page">
      <div className="pdp-container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to={`/products?category=${product.category_slug}`}>{product.category_name}</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{breadcrumbTitle}</span>
        </nav>

        <div className="pdp-main card">
          <div className="pdp-images">
            {galleryImages.length > 1 && (
              <div className="img-thumbnails" role="list">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`img-thumb ${selectedImg === i ? 'active' : ''}`}
                    onMouseEnter={() => setSelectedImg(i)}
                    onClick={() => setSelectedImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img.image_url} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            <div className="img-main-wrap">
              <div className="img-main-frame">
                {galleryImages.length > 1 && (
                  <button type="button" className="slider-btn prev-btn" onClick={handlePrevImg} aria-label="Previous image">‹</button>
                )}
                {mainSrc && !mainImgError ? (
                  <img src={mainSrc} alt={product.name} className="img-main" onError={() => setMainImgError(true)} />
                ) : (
                  <div className="img-main-placeholder" role="img" aria-label="No image">
                    📦
                  </div>
                )}
                {galleryImages.length > 1 && (
                  <button type="button" className="slider-btn next-btn" onClick={handleNextImg} aria-label="Next image">›</button>
                )}
              </div>
              <div className="pdp-actions-sticky">
                <button
                  type="button"
                  className="btn-add-cart"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingCart}
                >
                  {addingCart ? 'Adding…' : 'Add to Cart'}
                </button>
                <button type="button" className="btn-buy-now" onClick={handleBuyNow} disabled={product.stock === 0}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="pdp-details">
            {product.brand && <p className="pdp-brand">{product.brand}</p>}
            <h1 className="pdp-name">{product.name}</h1>

            {(product.rating ?? 0) > 0 && (
              <div className="pdp-rating-row">
                <span
                  className={`rating-badge rating-badge--card ${product.rating >= 4 ? 'green' : product.rating >= 3 ? 'mid' : 'low'}`}
                >
                  <span className="rating-badge__value">{product.rating}</span>
                  <span className="rating-badge__star" aria-hidden="true">★</span>
                </span>
                <span className="rating-count-text">{product.rating_count?.toLocaleString()} Ratings</span>
                <span className="rating-divider">|</span>
                <span className="rating-count-text">Trusted reviews</span>
              </div>
            )}

            <div className="pdp-price-section">
              <span className="pdp-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
              {discount > 0 && (
                <>
                  <span className="pdp-original-price">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
                  <span className="pdp-discount">{discount}% off</span>
                </>
              )}
            </div>

            <div className="pdp-offers">
              <h3>Available Offers</h3>
              <ul>
                <li>
                  <strong>Bank Offer</strong> 10% off on select cards, up to ₹1500
                </li>
                <li>
                  <strong>No Cost EMI</strong> from ₹{Math.round(product.price / 12).toLocaleString('en-IN')}/month
                </li>
                <li>
                  <strong>Partner Offer</strong> Extra savings on exchange
                </li>
              </ul>
            </div>

            <div className="pdp-delivery">
              <span className="pdp-delivery-ic" aria-hidden="true">
                🚚
              </span>
              <div>
                <p>
                  <strong>Free delivery</strong> on orders above ₹500
                </p>
                <p className="delivery-sub">Usually delivered in 3–5 business days</p>
              </div>
            </div>

            {product.stock === 0 ? (
              <div className="out-of-stock-banner">Out of Stock</div>
            ) : product.stock < 10 ? (
              <div className="low-stock-banner">Only {product.stock} left in stock</div>
            ) : (
              <div className="in-stock-banner">In Stock</div>
            )}

            <button type="button" className={`pdp-wishlist-btn ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            <div className="pdp-seller">
              <span className="seller-label">Seller:</span>
              <span className="seller-name">RetailNet</span>
              <span className="seller-rating">4.8 ★</span>
            </div>

            <div className="pdp-tabs" role="tablist">
              {['highlights', 'specifications', 'description'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'highlights' && (
                <ul className="highlights-list">
                  {Array.isArray(highlights) && highlights.length ? (
                    highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))
                  ) : (
                    <li className="tab-empty">No highlights listed for this product.</li>
                  )}
                </ul>
              )}
              {activeTab === 'specifications' && (
                <table className="specs-table">
                  <tbody>
                    {specs && Object.keys(specs).length ? (
                      Object.entries(specs).map(([k, v]) => (
                        <tr key={k}>
                          <td>{k}</td>
                          <td>{v}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="tab-empty">
                          No specifications available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {activeTab === 'description' && (
                <p className="pdp-description">{product.description || 'No description available.'}</p>
              )}
            </div>
          </div>
        </div>

        {product.related?.length > 0 && (
          <div className="related-section card">
            <div className="section-header">
              <h2>Similar Products</h2>
              <Link to={`/products?category=${product.category_slug}`} className="see-all">
                See All →
              </Link>
            </div>
            <div className="related-grid">
              {product.related.slice(0, 5).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
