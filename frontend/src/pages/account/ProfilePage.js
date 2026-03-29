import React from 'react';

const ProfilePage = () => {
  return (
    <div className="account-card">
      <h2 className="account-card-title">Personal Information</h2>
      <div className="profile-details" style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px'}}>
        
        <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label style={{fontSize: '14px', color: '#878787'}}>Full Name</label>
          <input type="text" value="Rahul Sharma" disabled style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', background: '#f9f9f9', color: '#333'}} />
        </div>

        <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label style={{fontSize: '14px', color: '#878787'}}>Email Address</label>
          <input type="email" value="rahul.sharma@example.com" disabled style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', background: '#f9f9f9', color: '#333'}} />
        </div>

        <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label style={{fontSize: '14px', color: '#878787'}}>Mobile Number</label>
          <input type="text" value="+91 9876543210" disabled style={{padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', background: '#f9f9f9', color: '#333'}} />
        </div>

        <button style={{padding: '12px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: 600, marginTop: '10px'}}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
