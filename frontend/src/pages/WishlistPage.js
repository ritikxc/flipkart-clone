import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchWishlist, toggleWishlist } from '../utils/api';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const ratingTone = (r) => {
  if (r >= 4) return 'green';
  if (r >= 3) return 'mid';
  return 'low';
};

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const load = () => {
    fetchWishlist()
      .then(({ data }) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (product_id) => {
    try {
      await toggleWishlist(product_id);
      setItems((prev) => prev.filter((i) => i.product_id !== product_id));
    } catch {
      toast.error('Could not update wishlist');
    }
  };

  const handleMoveToCart = async (item) => {
    const ok = await addToCart(item.product_id);
    if (ok) await handleRemove(item.product_id);
  };

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  return (
    <div className="wlp-page">
      <div className="wlp-container">
        <h1>My Wishlist <span className="wl-count">({items.length} {items.length === 1 ? 'item' : 'items'})</span></h1>
        {items.length === 0 ? (
          <div className="wlp-empty">
            <span>🤍</span>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love to your wishlist and find them here anytime.</p>
            <Link to="/" className="wl-shop-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div className="wl-grid">
            {items.map(item => {
              const discount = item.original_price
                ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
                : 0;
              return (
                <div key={item.id} className="wl-card">
                  <button className="wl-remove-btn" onClick={() => handleRemove(item.product_id)} title="Remove from wishlist">
                    ✕
                  </button>
                  <Link to={`/products/${item.product_id}`} className="wl-img-link">
                    <img src={item.image} alt={item.name} className="wl-img" />
                  </Link>
                  <div className="wl-card-body">
                    <Link to={`/products/${item.product_id}`} className="wl-name">{item.name}</Link>
                    <p className="wl-brand">{item.brand}</p>
                    {item.rating > 0 && (
                      <div className="wl-rating">
                        <span className={`rating-badge rating-badge--card ${ratingTone(item.rating)}`}>
                          <span className="rating-badge__value">{item.rating}</span>
                          <span className="rating-badge__star" aria-hidden="true">★</span>
                        </span>
                        <span className="wl-rating-count">({item.rating_count?.toLocaleString()})</span>
                      </div>
                    )}
                    <div className="wl-price-row">
                      <span className="wl-price">₹{Number(item.price).toLocaleString('en-IN')}</span>
                      {discount > 0 && (
                        <>
                          <span className="wl-orig">₹{Number(item.original_price).toLocaleString('en-IN')}</span>
                          <span className="wl-off">{discount}% off</span>
                        </>
                      )}
                    </div>
                    {item.stock === 0 && <p className="wl-out-of-stock">Out of Stock</p>}
                    <button
                      className="wl-add-cart-btn"
                      onClick={() => handleMoveToCart(item)}
                      disabled={item.stock === 0}
                    >
                      🛒 Move to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
