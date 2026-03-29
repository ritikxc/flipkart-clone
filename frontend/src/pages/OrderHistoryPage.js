import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrderHistory } from '../utils/api';
import './OrderHistoryPage.css';

const STATUS_COLORS = {
  placed: '#2874f0', confirmed: '#388e3c', shipped: '#f9a825',
  delivered: '#388e3c', cancelled: '#ff6161'
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderHistory()
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  return (
    <div className="ohp-page">
      <div className="ohp-container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <div className="ohp-empty">
            <span>📦</span>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start shopping!</p>
            <Link to="/" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <Link key={order.id} to={`/order-confirmation/${order.id}`} className="order-card">
                <div className="order-card-left">
                  {order.preview?.product_image && (
                    <img src={order.preview.product_image} alt={order.preview.product_name} className="order-preview-img" />
                  )}
                  <div className="order-info">
                    <p className="order-preview-name">{order.preview?.product_name}{order.item_count > 1 ? ` + ${order.item_count - 1} more` : ''}</p>
                    <p className="order-id-text">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="order-date">{new Date(order.placed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p className="order-payment">{order.payment_method}</p>
                  </div>
                </div>
                <div className="order-card-right">
                  <p className="order-total">₹{Number(order.total).toLocaleString('en-IN')}</p>
                  <span
                    className="order-status-badge"
                    style={{ background: STATUS_COLORS[order.status] || '#ccc' }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  <p className="order-view-details">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
