import React, { useState } from 'react';

const AddressesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '9876543210',
      pincode: '400001',
      locality: 'Colaba',
      address_line1: '12, Sea View Apartments, Apollo Bunder',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'HOME'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '', phone: '', pincode: '', locality: '', address_line1: '', city: '', state: '', type: 'HOME'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { ...formData, id: Date.now() }]);
    setShowForm(false);
    setFormData({ name: '', phone: '', pincode: '', locality: '', address_line1: '', city: '', state: '', type: 'HOME' });
  };

  return (
    <div className="account-card">
      <h2 className="account-card-title">Manage Addresses</h2>
      
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          style={{width: '100%', padding: '16px', background: 'white', border: '1px solid #e0e0e0', color: '#2874f0', fontWeight: 'bold', textAlign: 'left', marginBottom: '24px', cursor: 'pointer'}}
        >
          + ADD A NEW ADDRESS
        </button>
      ) : (
        <div style={{background: '#f5faff', padding: '24px', marginBottom: '24px', border: '1px solid #d4e5ff'}}>
          <h3 style={{fontSize: '14px', color: '#2874f0', fontWeight: 'bold', marginBottom: '16px'}}>ADD A NEW ADDRESS</h3>
          <form onSubmit={handleSave} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <input required placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
            <input required placeholder="10-digit mobile number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
            <input required placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} style={inputStyle} />
            <input required placeholder="Locality" value={formData.locality} onChange={e => setFormData({...formData, locality: e.target.value})} style={inputStyle} />
            <textarea required placeholder="Address (Area and Street)" value={formData.address_line1} onChange={e => setFormData({...formData, address_line1: e.target.value})} style={{...inputStyle, gridColumn: '1 / -1', height: '80px'}} />
            <input required placeholder="City/District/Town" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={inputStyle} />
            <input required placeholder="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={inputStyle} />
            
            <div style={{gridColumn: '1 / -1', display: 'flex', gap: '16px', marginTop: '16px'}}>
              <button type="submit" style={{padding: '12px 32px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '2px', fontWeight: 'bold', cursor: 'pointer'}}>SAVE</button>
              <button type="button" onClick={() => setShowForm(false)} style={{padding: '12px 32px', background: 'transparent', color: '#2874f0', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>CANCEL</button>
            </div>
          </form>
        </div>
      )}

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {addresses.map(addr => (
          <div key={addr.id} style={{border: '1px solid #e0e0e0', padding: '20px', borderRadius: '4px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
              <span style={{background: '#f0f0f0', color: '#878787', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '2px'}}>{addr.type}</span>
              <button style={{background: 'none', border: 'none', color: '#2874f0', fontWeight: 'bold', cursor: 'pointer'}}>EDIT</button>
            </div>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px'}}>
              <h4 style={{margin: 0, fontSize: '14px'}}>{addr.name}</h4>
              <span style={{fontWeight: 'bold', fontSize: '14px'}}>{addr.phone}</span>
            </div>
            <p style={{margin: 0, color: '#212121', fontSize: '14px', lineHeight: '1.5'}}>
              {addr.address_line1}, {addr.locality}, {addr.city}, {addr.state} - <span style={{fontWeight: 'bold'}}>{addr.pincode}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  outline: 'none'
};

export default AddressesPage;
