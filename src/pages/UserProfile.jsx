import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Save, 
  Bell, 
  Upload, 
  FileCheck2,
  CheckCircle2,
  Building2
} from 'lucide-react';

export default function UserProfile() {
  const { currentUser, updateProfile, isDonor, isOrganisation, isAdmin } = useAuth();
  const { showToast } = useDonation();

  const [name, setName] = useState(currentUser?.name || 'Priya Sharma');
  const [email, setEmail] = useState(currentUser?.email || 'priya.sharma@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai, Maharashtra');
  const [address, setAddress] = useState(currentUser?.address || 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053');

  // Preferences
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [monthlyNewsletter, setMonthlyNewsletter] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      city,
      address
    });
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Account & Settings</span>
          <h1 className="section-title">User Profile</h1>
          <p className="section-subtitle">
            Manage your personal credentials, default pickup address, and notification preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)', marginBottom: '2rem' }}>
          {/* Avatar and Role Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
              alt={currentUser?.name} 
              style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)', boxShadow: 'var(--shadow-md)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  {currentUser?.name}
                </h2>
                <span className="badge badge-role">
                  {currentUser?.role?.toUpperCase()}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
                {currentUser?.email}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Award size={15} color="#F59E0B" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B45309' }}>
                  {currentUser?.donorLevel || 'Community Partner Level'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name / Representative Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input 
                type="tel" 
                className="form-input" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">City / State</label>
              <input 
                type="text" 
                className="form-input" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Default Doorstep Pickup Address</label>
            <input 
              type="text" 
              className="form-input" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat number, building, street, postal code"
              required
            />
          </div>

          {/* Preferences Section */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} color="var(--primary)" />
              Real-Time Tracking & Alert Preferences
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input 
                  type="checkbox" 
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                />
                <span>Receive WhatsApp status updates when volunteer is dispatched</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input 
                  type="checkbox" 
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                />
                <span>SMS confirmation on pickup completion & delivery</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input 
                  type="checkbox" 
                  checked={monthlyNewsletter}
                  onChange={(e) => setMonthlyNewsletter(e.target.checked)}
                />
                <span>Email copy of 80G Tax Exemption receipts and annual impact reports</span>
              </label>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
