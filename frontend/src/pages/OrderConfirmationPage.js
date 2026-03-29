import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrder } from '../utils/api';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id)
      .then(({ data }) => setOrder(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" style={{ marginTop: '80px' }} />;
  if (!order) return <div style={{ textAlign: 'center', padding: '80px' }}><h2>Order not found</h2></div>;

  return (
    <div className="ocp-page">
      <div className="ocp-container">
        {/* Success banner */}
        <div className="ocp-success-banner">
          <div className="success-icon">✅</div>
          <div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you! Your order has been confirmed and will be delivered soon.</p>
          </div>
        </div>

        {/* Order ID card */}
        <div className="ocp-order-id-card">
          <div className="order-id-info">
            <span className="order-id-label">Order ID</span>
            <span className="order-id-value">{order.id}</span>
          </div>
          <div className="order-id-info">
            <span className="order-id-label">Placed On</span>
            <span className="order-id-value">{new Date(order.placed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="order-id-info">
            <span className="order-id-label">Payment</span>
            <span className="order-id-value">{order.payment_method}</span>
          </div>
          <div className="order-id-info">
            <span className="order-id-label">Status</span>
            <span className="status-badge">{order.status.toUpperCase()}</span>
          </div>
        </div>

        {/* Delivery tracking steps */}
        <div className="ocp-tracking">
          <h2>Delivery Status</h2>
          <div className="tracking-steps">
            {[
              { label: 'Order Placed', icon: '🛍️', done: true },
              { label: 'Confirmed', icon: '✅', done: true },
              { label: 'Shipped', icon: '📦', done: false },
              { label: 'Out for Delivery', icon: '🚚', done: false },
              { label: 'Delivered', icon: '🎉', done: false },
            ].map((step, i) => (
              <div key={i} className={`tracking-step ${step.done ? 'done' : ''}`}>
                <div className="step-icon">{step.icon}</div>
                <div className="step-label">{step.label}</div>
                {i < 4 && <div className={`step-connector ${step.done ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="ocp-grid">
          {/* Order items */}
          <div className="ocp-section">
            <h2>Order Items ({order.items.length})</h2>
            {order.items.map(item => (
              <div key={item.id} className="ocp-item">
                <img src={item.product_image} alt={item.product_name} className="ocp-item-img" />
                <div className="ocp-item-info">
                  <p className="ocp-item-name">{item.product_name}</p>
                  <p className="ocp-item-qty">Qty: {item.quantity}</p>
                  <p className="ocp-item-price">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & payment */}
          <div>
            <div className="ocp-section">
              <h2>Delivery Address</h2>
              <div className="ocp-address">
                <p className="addr-name">{order.full_name}</p>
                <p>{order.address_line1}</p>
                {order.address_line2 && <p>{order.address_line2}</p>}
                <p>{order.city}, {order.state} - {order.pincode}</p>
                <p className="addr-phone">📞 {order.phone}</p>
              </div>
            </div>

            <div className="ocp-section">
              <h2>Price Breakdown</h2>
              <div className="ocp-price-rows">
                <div className="ocp-price-row">
                  <span>Subtotal</span>
                  <span>₹{Number(parseFloat(order.subtotal) + parseFloat(order.discount)).toLocaleString('en-IN')}</span>
                </div>
                {order.discount > 0 && (
                  <div className="ocp-price-row green">
                    <span>Discount</span>
                    <span>− ₹{Number(order.discount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="ocp-price-row">
                  <span>Delivery</span>
                  <span className={Number(order.delivery_charge) === 0 ? 'green' : ''}>
                    {Number(order.delivery_charge) === 0 ? 'FREE' : `₹${order.delivery_charge}`}
                  </span>
                </div>
                <div className="ocp-price-row total">
                  <span>Total Paid</span>
                  <span>₹{Number(order.total).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="ocp-ctas">
          <Link to="/orders" className="ocp-btn-secondary">View All Orders</Link>
          <Link to="/" className="ocp-btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
