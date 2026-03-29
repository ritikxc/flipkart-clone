import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toggleWishlist } from '../../utils/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const getRatingColor = (r) => {
    if (r >= 4) return 'green';
    if (r >= 3) return 'mid';
    return 'low';
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleWishlist(product.id);
      setWishlisted(!wishlisted);
    } catch {}
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-img-wrap">
        {imgError ? (
          <div className="product-card-img-placeholder">📦</div>
        ) : (
          <img
            src={product.primary_image || product.image}
            alt={product.name}
            className="product-card-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <button className={`wishlist-btn ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>
          <svg viewBox="0 0 24 24" fill={wishlisted ? '#ff6161' : 'none'} stroke={wishlisted ? '#ff6161' : '#878787'} strokeWidth="2" width="20" height="20">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{product.name}</p>
        {(product.rating ?? 0) > 0 && (
          <div className="product-card-rating">
            <span className={`rating-badge rating-badge--card ${getRatingColor(product.rating)}`}>
              <span className="rating-badge__value">{product.rating}</span>
              <span className="rating-badge__star" aria-hidden="true">★</span>
            </span>
            <span className="rating-count">({product.rating_count?.toLocaleString()})</span>
          </div>
        )}
        <div className="product-card-price">
          <span className="price-main">₹{Number(product.price).toLocaleString('en-IN')}</span>
          {discount > 0 && (
            <>
              <span className="price-orig">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
              <span className="price-off">{discount}% off</span>
            </>
          )}
        </div>
        {product.brand && <p className="product-card-brand">{product.brand}</p>}
        {product.stock === 0 && <p className="out-of-stock-tag">Out of Stock</p>}
        <button
          className="add-to-cart-quick"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          + Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
