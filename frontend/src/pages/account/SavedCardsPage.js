import React from 'react';

const SavedCardsPage = () => {
  return (
    <div className="account-card">
      <h2 className="account-card-title">Saved Cards & Wallet</h2>
      
      <div style={{textAlign: 'center', padding: '60px 0'}}>
        <div style={{fontSize: '48px', marginBottom: '16px'}}>💳</div>
        <h3 style={{fontSize: '18px', color: '#212121', marginBottom: '8px'}}>No saved cards found.</h3>
        <p style={{color: '#878787', fontSize: '14px'}}>Save your credit/debit cards during checkout for faster payments.</p>
      </div>
    </div>
  );
};

export default SavedCardsPage;
