import React, { useState } from 'react';

const CouponsPage = () => {
  const [coupon, setCoupon] = useState('');

  return (
    <div className="account-card">
      <h2 className="account-card-title">My Coupons</h2>
      
      <div style={{marginBottom: '30px', display: 'flex', gap: '10px'}}>
        <input 
          type="text" 
          placeholder="Enter coupon code" 
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', flex: 1, maxWidth: '300px'}} 
        />
        <button style={{padding: '0 24px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: 600}}>
          Apply
        </button>
      </div>

      <div style={{textAlign: 'center', padding: '60px 0'}}>
        <div style={{fontSize: '48px', marginBottom: '16px'}}>🏷️</div>
        <h3 style={{fontSize: '18px', color: '#212121', marginBottom: '8px'}}>You have no coupons available</h3>
        <p style={{color: '#878787', fontSize: '14px'}}>Coupons won during promotions will appear here.</p>
      </div>
    </div>
  );
};

export default CouponsPage;
