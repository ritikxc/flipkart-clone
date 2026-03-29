import React from 'react';

const SuperCoinPage = () => {
  return (
    <div className="account-card">
      <h2 className="account-card-title">SuperCoin Zone</h2>
      
      <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
        <div style={{flex: 1, background: '#f4f8ff', padding: '24px', borderRadius: '4px', border: '1px solid #cce0ff'}}>
          <p style={{fontSize: '14px', color: '#878787', marginBottom: '8px'}}>SuperCoin Balance</p>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#2874f0', display: 'flex', alignItems: 'center', gap: '8px'}}>
            🪙 250
          </div>
        </div>
        
        <div style={{flex: 1, background: '#fff9e6', padding: '24px', borderRadius: '4px', border: '1px solid #ffecb3'}}>
          <p style={{fontSize: '14px', color: '#878787', marginBottom: '8px'}}>Expiring Soon</p>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center', gap: '8px'}}>
            🪙 0
          </div>
        </div>
      </div>

      <h3 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '16px'}}>Recent Activity</h3>
      <div style={{textAlign: 'center', padding: '40px 0', border: '1px solid #e0e0e0', borderRadius: '4px'}}>
        <p style={{color: '#878787', fontSize: '14px'}}>No recent SuperCoin transactions found.</p>
      </div>
    </div>
  );
};

export default SuperCoinPage;
