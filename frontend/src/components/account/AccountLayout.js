import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AccountLayout.css';

const AccountLayout = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        {/* Left Sidebar */}
        <div className="account-sidebar">
          {/* Profile Quick Summary */}
          <div className="sidebar-profile-card">
            <div className="profile-img-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="profile-info-mini">
              <span className="welcome-text">Hello,</span>
              <span className="user-name">Rahul Sharma</span>
            </div>
          </div>

          <nav className="sidebar-nav-menu">
            <div className="nav-section">
              <h3 className="nav-section-title">
                <span className="nav-icon">📦</span> MY ORDERS
              </h3>
              <NavLink to="/account/orders" className="nav-item">
                <span className="chevron-icon">›</span> Orders
              </NavLink>
            </div>

            <div className="nav-section">
              <h3 className="nav-section-title">
                <span className="nav-icon">👤</span> ACCOUNT SETTINGS
              </h3>
              <NavLink to="/account/profile" className="nav-item">Profile Information</NavLink>
              <NavLink to="/account/addresses" className="nav-item">Manage Addresses</NavLink>
              <NavLink to="/account/saved-cards" className="nav-item">Saved Cards</NavLink>
            </div>

            <div className="nav-section">
              <h3 className="nav-section-title">
                <span className="nav-icon">👛</span> PAYMENTS
              </h3>
              <NavLink to="/account/giftcards" className="nav-item">Gift Cards</NavLink>
              <NavLink to="/account/supercoin" className="nav-item">SuperCoin Zone</NavLink>
              <NavLink to="/account/plus" className="nav-item">Flipkart Plus</NavLink>
            </div>

            <div className="nav-section">
              <h3 className="nav-section-title">
                <span className="nav-icon">📁</span> MY STUFF
              </h3>
              <NavLink to="/account/coupons" className="nav-item">My Coupons</NavLink>
              <NavLink to="/account/wishlist" className="nav-item">My Wishlist</NavLink>
              <NavLink to="/account/notifications" className="nav-item">All Notifications</NavLink>
            </div>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="account-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
