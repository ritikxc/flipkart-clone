import React from 'react';

const PlusZonePage = () => {
  return (
    <div className="account-card">
      <h2 className="account-card-title">Flipkart Plus Zone</h2>
      
      <div style={{background: 'linear-gradient(135deg, #2874f0, #0a4bba)', color: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h3 style={{fontSize: '24px', margin: '0 0 10px 0', fontStyle: 'italic'}}>Flipkart <span style={{color: '#ffe500'}}>Plus</span></h3>
          <p style={{margin: 0, opacity: 0.9}}>You are currently a non-Plus member.</p>
        </div>
        <div style={{textAlign: 'right'}}>
          <div style={{fontSize: '14px', opacity: 0.9, marginBottom: '5px'}}>Earn 200 more SuperCoins to upgrade.</div>
          <div style={{background: 'rgba(255,255,255,0.2)', height: '6px', borderRadius: '3px', width: '200px', overflow: 'hidden'}}>
            <div style={{background: '#ffe500', height: '100%', width: '55%'}}></div>
          </div>
        </div>
      </div>

      <h3 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '16px'}}>Upcoming Benefits</h3>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <li style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px'}}>
          <span style={{fontSize: '24px'}}>🚚</span>
          <div>
            <h4 style={{margin: '0 0 4px 0', fontSize: '14px', color: '#212121'}}>Free Delivery</h4>
            <p style={{margin: 0, fontSize: '12px', color: '#878787'}}>Get unlimited free deliveries on Plus catalog.</p>
          </div>
        </li>
        <li style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px'}}>
          <span style={{fontSize: '24px'}}>⭐</span>
          <div>
            <h4 style={{margin: '0 0 4px 0', fontSize: '14px', color: '#212121'}}>Early Access</h4>
            <p style={{margin: 0, fontSize: '12px', color: '#878787'}}>Be the first to access major sales and events.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PlusZonePage;
