import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { fetchProducts } from '../../utils/api';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const { cart } = useCart();
  const accountRef = useRef();
  const searchRef = useRef();
  const accountHoverTimeout = useRef(null);
  const searchTimeoutRef = useRef(null);

  const handleAccountMouseEnter = () => {
    if (accountHoverTimeout.current) clearTimeout(accountHoverTimeout.current);
    setShowAccountDropdown(true);
  };

  const handleAccountMouseLeave = () => {
    accountHoverTimeout.current = setTimeout(() => {
      setShowAccountDropdown(false);
    }, 200);
  };

  const handleLogout = () => {
    setShowAccountDropdown(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('recent_searches')) || [];
      setRecentSearches(saved);
    } catch {
      setRecentSearches([]);
    }
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    searchTimeoutRef.current = setTimeout(() => {
      fetchProducts({ search: searchQuery, limit: 5 })
        .then(({ data }) => setSuggestions(data.products || []))
        .catch(() => setSuggestions([]));
    }, 300);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setShowAccountDropdown(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addToRecentSearches = (term) => {
    if (!term.trim()) return;
    const updated = [term.trim(), ...recentSearches.filter(t => t.toLowerCase() !== term.trim().toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    if(e) e.preventDefault();
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery);
      setIsSearchFocused(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (product) => {
    addToRecentSearches(product.name);
    setSearchQuery(product.name);
    setIsSearchFocused(false);
    navigate(`/products/${product.id}`);
  };

  const handleRecentSearchClick = (term) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Flipkart</span>
          <span className="logo-tagline">
            Explore <span className="logo-plus">Plus</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus_aef861-7f0f70.png" alt="plus" />
          </span>
        </Link>

        {/* Search bar */}
        <div className="navbar-search-wrapper" ref={searchRef}>
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            <button type="submit" className="search-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>

          {isSearchFocused && (
            <div className="search-dropdown">
              {!searchQuery.trim() && recentSearches.length > 0 && (
                <div className="recent-searches">
                  <div className="search-dropdown-header">Discover More</div>
                  {recentSearches.map((term, i) => (
                    <div 
                      key={i} 
                      className="suggestion-item recent-search-item" 
                      onMouseDown={(e) => { e.preventDefault(); handleRecentSearchClick(term); }}
                    >
                      <span className="search-icon-small">🕒</span> <span className="suggestion-text">{term}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {searchQuery.trim() && suggestions.length > 0 && (
                <div className="search-suggestions">
                  {suggestions.map((p) => (
                    <div 
                      key={p.id} 
                      className="suggestion-item product-suggestion" 
                      onMouseDown={(e) => { e.preventDefault(); handleSuggestionClick(p); }}
                    >
                      <div className="suggestion-img-wrap">
                        <img src={p.primary_image || p.image} alt={p.name} className="suggestion-img" />
                      </div>
                      <div className="suggestion-details">
                        <div className="suggestion-name">{p.name}</div>
                        <div className="suggestion-in">in {p.category_name || 'Products'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {searchQuery.trim() && (
                <div className="suggestion-item fallback-search-item" onMouseDown={(e) => { e.preventDefault(); handleSearch(e); }}>
                  <span className="search-icon-small">🔍</span> Search for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Nav links */}
        <div className="navbar-links">
          {/* Account Dropdown */}
          <div 
            className="account-dropdown-wrap" 
            ref={accountRef} 
            onMouseEnter={handleAccountMouseEnter} 
            onMouseLeave={handleAccountMouseLeave}
          >
            <div className="nav-link account-nav-btn" onClick={() => setShowAccountDropdown(!showAccountDropdown)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Login / Account
              <svg className={`chevron ${showAccountDropdown ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{marginLeft: '2px', transition: 'transform 0.2s'}}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            {showAccountDropdown && (
              <div className="account-dropdown">
                <div className="account-dropdown-arrow"></div>
                <ul className="account-dropdown-menu">
                  <li><Link to="/account/profile" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">👤</span> My Profile</Link></li>
                  <li><Link to="/account/supercoin" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">🪙</span> SuperCoin Zone</Link></li>
                  <li><Link to="/account/plus" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">✨</span> Flipkart Plus Zone</Link></li>
                  <li><Link to="/account/orders" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">📦</span> Orders</Link></li>
                  <li><Link to="/account/wishlist" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">❤️</span> Wishlist</Link></li>
                  <li><Link to="/account/coupons" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">🏷️</span> Coupons</Link></li>
                  <li><Link to="/account/giftcards" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">🎁</span> Gift Cards</Link></li>
                  <li><Link to="/account/notifications" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">🔔</span> Notifications</Link></li>
                  <li><Link to="/account/saved-cards" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">💳</span> Saved Cards & Wallet</Link></li>
                  <li><Link to="/account/addresses" onClick={() => setShowAccountDropdown(false)}><span className="dd-icon">🏠</span> Saved Addresses</Link></li>
                  <li className="logout-item"><button className="dd-logout-btn" onClick={handleLogout}><span className="dd-icon">↩️</span> Logout</button></li>
                </ul>
              </div>
            )}
          </div>

          <Link to="/account/orders" className="nav-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="2"/>
            </svg>
            Orders
          </Link>
          <Link to="/account/wishlist" className="nav-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            Wishlist
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <div className="cart-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cart.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
            </div>
            Cart
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
