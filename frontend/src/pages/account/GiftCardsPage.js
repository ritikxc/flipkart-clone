import React, { useState } from 'react';

const GiftCardsPage = () => {
  const [giftCard, setGiftCard] = useState('');
  const [pin, setPin] = useState('');

  return (
    <div className="account-card">
      <h2 className="account-card-title">Gift Cards</h2>
      
      <div style={{background: '#f4f8ff', padding: '24px', borderRadius: '4px', marginBottom: '30px', border: '1px solid #cce0ff'}}>
        <p style={{fontSize: '14px', color: '#878787', marginBottom: '8px'}}>Available Balance</p>
        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#2874f0'}}>₹0</div>
      </div>

      <h3 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '16px'}}>Add a Gift Card</h3>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        <input 
          type="text" 
          placeholder="Gift Card Number" 
          value={giftCard}
          onChange={(e) => setGiftCard(e.target.value)}
          style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', width: '250px'}} 
        />
        <input 
          type="password" 
          placeholder="Gift Card PIN" 
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', width: '150px'}} 
        />
        <button style={{padding: '0 32px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: 600}}>
          Redeem
        </button>
      </div>
    </div>
  );
};

export default GiftCardsPage;
