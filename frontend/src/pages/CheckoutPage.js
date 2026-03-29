import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../utils/api';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh','Chandigarh','Puducherry'];

const INITIAL = {
  full_name: '', phone: '', pincode: '', address_line1: '',
  address_line2: '', city: '', state: '', address_type: 'home'
};

const CheckoutPage = () => {
  const [address, setAddress] = useState(INITIAL);
  const [payment, setPayment] = useState('COD');
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});
  const { cart, reloadCart, ready } = useCart();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!address.full_name.trim()) e.full_name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone = 'Enter valid 10-digit mobile number';
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = 'Enter valid 6-digit pincode';
    if (!address.address_line1.trim()) e.address_line1 = 'Address is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.state) e.state = 'State is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    try {
      const { data } = await placeOrder({ address, payment_method: payment });
      await reloadCart();
      navigate(`/order-confirmation/${data.orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const set = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (!ready) {
    return (
      <div className="checkout-page">
        <div className="spinner-wrap" aria-busy="true" aria-label="Loading checkout">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (cart.itemCount === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add products to your cart before checkout.</p>
          <Link to="/" className="btn-primary checkout-empty-cta">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Secure Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <div className="checkout-left">
            {/* Delivery address */}
            <div className="checkout-section">
              <div className="section-title-bar">
                <span className="step-badge">1</span>
                <h2>Delivery Address</h2>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={address.full_name}
                    onChange={e => set('full_name', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.full_name ? 'error' : ''}
                  />
                  {errors.full_name && <span className="error-msg">{errors.full_name}</span>}
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={e => set('pincode', e.target.value)}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
                </div>
                <div className="form-group full-width">
                  <label>Address (House No., Street, Area) *</label>
                  <input
                    type="text"
                    value={address.address_line1}
                    onChange={e => set('address_line1', e.target.value)}
                    placeholder="House no., Building, Street, Area"
                    className={errors.address_line1 ? 'error' : ''}
                  />
                  {errors.address_line1 && <span className="error-msg">{errors.address_line1}</span>}
                </div>
                <div className="form-group full-width">
                  <label>Locality / Town (Optional)</label>
                  <input
                    type="text"
                    value={address.address_line2}
                    onChange={e => set('address_line2', e.target.value)}
                    placeholder="Locality, Town"
                  />
                </div>
                <div className="form-group">
                  <label>City / District *</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => set('city', e.target.value)}
                    placeholder="City or district"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    value={address.state}
                    onChange={e => set('state', e.target.value)}
                    className={errors.state ? 'error' : ''}
                  >
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <span className="error-msg">{errors.state}</span>}
                </div>
                <div className="form-group full-width">
                  <label>Address Type</label>
                  <div className="radio-group">
                    {['home', 'work', 'other'].map(t => (
                      <label key={t} className="radio-label">
                        <input
                          type="radio"
                          name="address_type"
                          value={t}
                          checked={address.address_type === t}
                          onChange={e => set('address_type', e.target.value)}
                        />
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <div className="section-title-bar">
                <span className="step-badge">2</span>
                <h2>Payment Method</h2>
              </div>
              <div className="payment-options">
                {[
                  { value: 'COD', label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
                  { value: 'UPI', label: '📱 UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                  { value: 'CARD', label: '💳 Credit / Debit Card', desc: 'All major cards accepted' },
                  { value: 'NETBANKING', label: '🏦 Net Banking', desc: 'All major banks supported' },
                ].map(opt => (
                  <label key={opt.value} className={`payment-option ${payment === opt.value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={payment === opt.value}
                      onChange={e => setPayment(e.target.value)}
                    />
                    <div>
                      <span className="pay-label">{opt.label}</span>
                      <span className="pay-desc">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="checkout-right">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cart.items.map(item => (
                  <div key={item.id} className="order-item-row">
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <div className="order-item-info">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-qty">Qty: {item.quantity}</p>
                      <p className="order-item-price">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{Number(cart.subtotal + cart.discount).toLocaleString('en-IN')}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="summary-row green">
                    <span>Discount</span>
                    <span>− ₹{Number(cart.discount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className={cart.deliveryCharge === 0 ? 'green' : ''}>
                    {cart.deliveryCharge === 0 ? 'FREE' : `₹${cart.deliveryCharge}`}
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{Number(cart.total).toLocaleString('en-IN')}</span>
                </div>
              </div>
              {cart.discount > 0 && (
                <p className="summary-savings">🎉 You save ₹{Number(cart.discount).toLocaleString('en-IN')}!</p>
              )}
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={placing}
            >
              {placing ? '⏳ Placing Order...' : `🛍️ PLACE ORDER · ₹${Number(cart.total).toLocaleString('en-IN')}`}
            </button>

            <p className="checkout-safe">
              🔒 Safe and Secure Payments. Easy returns.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
