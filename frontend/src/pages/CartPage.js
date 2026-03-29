import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeItem, ready } = useCart();
  const navigate = useNavigate();

  if (!ready) {
    return (
      <div className="cart-page">
        <div className="spinner-wrap" aria-busy="true" aria-label="Loading cart">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" alt="empty cart" />
          <h2>Your cart is empty!</h2>
          <p>Add items to it now.</p>
          <Link to="/" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          <div className="cart-header-bar">
            <h2>My Cart ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})</h2>
          </div>

          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <Link to={`/products/${item.product_id}`} className="cart-item-img-link">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </Link>
              <div className="cart-item-details">
                <Link to={`/products/${item.product_id}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-brand">{item.brand}</p>
                {item.stock < 5 && item.stock > 0 && (
                  <p className="cart-item-stock-warn">⚠️ Only {item.stock} left</p>
                )}
                <div className="cart-item-price-row">
                  <span className="cart-price">₹{Number(item.price).toLocaleString('en-IN')}</span>
                  {item.original_price && item.original_price > item.price && (
                    <>
                      <span className="cart-original">₹{Number(item.original_price).toLocaleString('en-IN')}</span>
                      <span className="cart-discount">
                        {Math.round(((item.original_price - item.price) / item.original_price) * 100)}% Off
                      </span>
                    </>
                  )}
                </div>
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                      className="qty-btn"
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                      disabled={item.quantity >= item.stock}
                    >+</button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>REMOVE</button>
                  <button className="cart-save-btn">SAVE FOR LATER</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-place-bar">
            <button className="btn-place-order" onClick={() => navigate('/checkout')}>
              PLACE ORDER
            </button>
          </div>
        </div>

        {/* Price details */}
        <div className="cart-right">
          <div className="price-details-card">
            <h3 className="price-details-title">PRICE DETAILS</h3>
            <div className="price-row">
              <span>Price ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})</span>
              <span>₹{Number(cart.subtotal + cart.discount).toLocaleString('en-IN')}</span>
            </div>
            {cart.discount > 0 && (
              <div className="price-row discount">
                <span>Discount</span>
                <span>− ₹{Number(cart.discount).toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className={cart.deliveryCharge === 0 ? 'free-text' : ''}>
                {cart.deliveryCharge === 0 ? '🎉 FREE' : `₹${cart.deliveryCharge}`}
              </span>
            </div>
            <div className="price-divider" />
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{Number(cart.total).toLocaleString('en-IN')}</span>
            </div>
            {cart.discount > 0 && (
              <p className="savings-text">🎉 You will save ₹{Number(cart.discount).toLocaleString('en-IN')} on this order</p>
            )}
          </div>

          {/* Safe shopping */}
          <div className="safe-shopping">
            <span>🔒</span>
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
