import React from 'react';

const NotificationsPage = () => {
  return (
    <div className="account-card">
      <h2 className="account-card-title">All Notifications</h2>
      
      <div style={{textAlign: 'center', padding: '60px 0'}}>
        <div style={{fontSize: '48px', marginBottom: '16px'}}>🔔</div>
        <h3 style={{fontSize: '18px', color: '#212121', marginBottom: '8px'}}>No new notifications!</h3>
        <p style={{color: '#878787', fontSize: '14px'}}>We will let you know when we have something new for you.</p>
      </div>
    </div>
  );
};

export default NotificationsPage;
