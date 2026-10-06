import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import { 
  Package, 
  Search, 
  Download, 
  FileCheck2, 
  Calendar, 
  Building2, 
  Truck, 
  PlusCircle,
  Printer
} from 'lucide-react';

export default function DonationHistory() {
  const { donations, showToast } = useDonation();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('all'); // all, active, completed
  const [searchQuery, setSearchQuery] = useState('');

  const userDonations = donations.filter(d => d.donorId === (currentUser?.id || 'user-donor-1')) || donations;

  const filteredDonations = userDonations.filter(d => {
    // Tab filter
    if (activeTab === 'active' && d.status === 'delivered') return false;
    if (activeTab === 'completed' && d.status !== 'delivered') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = d.itemTitle?.toLowerCase().includes(q);
      const matchOrg = d.orgName?.toLowerCase().includes(q);
      const matchId = d.id?.toLowerCase().includes(q);
      if (!matchTitle && !matchOrg && !matchId) return false;
    }

    return true;
  });

  const handleDownloadCertificate = (donation) => {
    showToast(`Downloading 80G Tax Exemption Certificate for ${donation.id}...`, 'success');
    window.print();
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag">Audit & Impact Ledger</span>
            <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>Donation History</h1>
            <p className="section-subtitle">
              Review all past and ongoing contributions, download 80G certificates, and track live status.
            </p>
          </div>

          <Link to="/categories" className="btn btn-primary">
            <PlusCircle size={18} />
            Make New Donation
          </Link>
        </div>

        {/* Filter and Tabs Bar */}
        <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Donations ({userDonations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('active')}
              className={`btn btn-sm ${activeTab === 'active' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Active Pickups ({userDonations.filter(d => d.status !== 'delivered').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`btn btn-sm ${activeTab === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Delivered & Verified ({userDonations.filter(d => d.status === 'delivered').length})
            </button>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search items, NGOs, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', paddingRight: '0.75rem', height: '38px', fontSize: '0.85rem' }}
            />
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* History List */}
        {filteredDonations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredDonations.map((donation) => (
              <div key={donation.id} className="card" style={{ padding: '1.75rem', borderLeft: donation.status === 'delivered' ? '5px solid #10B981' : '5px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <img 
                      src={donation.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80'} 
                      alt={donation.itemTitle} 
                      style={{ width: 85, height: 85, borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
                          {donation.itemTitle}
                        </span>
                        <StatusBadge status={donation.status} />
                      </div>

                      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Tracking ID: <strong style={{ color: '#1E293B' }}>{donation.id}</strong> • Destination NGO: <strong style={{ color: 'var(--primary-hover)' }}>{donation.orgName}</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.82rem', color: '#64748B' }}>
                        <span>Quantity: <strong>{donation.quantity} {donation.unit}</strong></span>
                        <span>Condition: <strong>{donation.condition}</strong></span>
                        <span>Pickup Date: <strong>{donation.pickupDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '170px' }}>
                    <Link to={`/track/${donation.id}`} className="btn btn-primary btn-sm">
                      <Truck size={14} />
                      Track Status
                    </Link>

                    {donation.status === 'delivered' ? (
                      <button 
                        type="button" 
                        onClick={() => handleDownloadCertificate(donation)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#15803D', borderColor: '#86EFAC', background: '#ECFDF5' }}
                      >
                        <FileCheck2 size={14} />
                        Download 80G Certificate
                      </button>
                    ) : (
                      <Link to={`/confirmation/${donation.id}`} className="btn btn-secondary btn-sm">
                        <Printer size={14} />
                        View Pass / Receipt
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
            <Package size={44} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Donations Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              No contributions match the selected filter criteria.
            </p>
            <Link to="/categories" className="btn btn-primary">
              Make Your First Donation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
