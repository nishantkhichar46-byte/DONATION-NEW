import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import CampaignCard from '../components/CampaignCard';
import { 
  Flame, 
  Sparkles, 
  Heart, 
  Filter, 
  PlusCircle, 
  Calendar, 
  Users, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export default function Campaigns() {
  const { campaigns, updateDonationDraft, showToast } = useDonation();
  const { currentUser, isOrganisation } = useAuth();
  const navigate = useNavigate();

  const [filterUrgent, setFilterUrgent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pledge modal state
  const [pledgeCampaign, setPledgeCampaign] = useState(null);
  const [pledgeQuantity, setPledgeQuantity] = useState(5);
  const [pledgeType, setPledgeType] = useState('items'); // items or money

  const filteredCampaigns = campaigns.filter(c => {
    if (filterUrgent && !c.urgent) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you! Your pledge of ${pledgeQuantity} ${pledgeCampaign.unit} for "${pledgeCampaign.title}" has been registered!`, 'success');
    
    updateDonationDraft({
      orgId: pledgeCampaign.orgId,
      category: pledgeCampaign.category,
      beneficiary: pledgeCampaign.beneficiary,
      itemTitle: `Campaign Pledge: ${pledgeCampaign.title}`,
      quantity: pledgeQuantity,
      unit: pledgeCampaign.unit
    });

    setPledgeCampaign(null);
    navigate(`/donation-request?orgId=${pledgeCampaign.orgId}&category=${pledgeCampaign.category}`);
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="section-tag">Targeted Impact Drives</span>
            <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>Active Community Campaigns</h1>
            <p className="section-subtitle">
              Join focused community mobilization drives addressing seasonal crises, school terms, and emergency animal welfare.
            </p>
          </div>

          {isOrganisation && (
            <Link to="/org-dashboard" className="btn btn-primary">
              <PlusCircle size={18} />
              Launch New Campaign
            </Link>
          )}
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--secondary)' }}>
              <input 
                type="checkbox" 
                checked={filterUrgent}
                onChange={(e) => setFilterUrgent(e.target.checked)}
              />
              <Flame size={16} color="#EF4444" />
              <span>Urgent Drives Only</span>
            </label>

            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '180px', height: '38px', fontSize: '0.85rem' }}
            >
              <option value="all">All Causes</option>
              <option value="clothes">Winter & Clothes</option>
              <option value="books">Education & Books</option>
              <option value="food">Food & Rations</option>
              <option value="electronics">Tech & Laptops</option>
            </select>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredCampaigns.length}</strong> active verified drives
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {filteredCampaigns.map((camp) => (
            <CampaignCard 
              key={camp.id} 
              campaign={camp} 
              onPledgeClick={(c) => setPledgeCampaign(c)} 
            />
          ))}
        </div>

        {/* Modal: Pledge / Contribute to Campaign */}
        {pledgeCampaign && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--secondary)', margin: 0 }}>
                  Support Campaign
                </h3>
                <button 
                  type="button" 
                  onClick={() => setPledgeCampaign(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{pledgeCampaign.orgName}</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--secondary)', marginTop: '0.2rem' }}>{pledgeCampaign.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.25rem' }}>{pledgeCampaign.description}</div>
              </div>

              <form onSubmit={handlePledgeSubmit}>
                <div className="form-group">
                  <label className="form-label">How would you like to contribute?</label>
                  <div className="grid-2">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: pledgeType === 'items' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)', background: pledgeType === 'items' ? 'var(--primary-subtle)' : '#ffffff', cursor: 'pointer' }}>
                      <input type="radio" name="pledgeType" value="items" checked={pledgeType === 'items'} onChange={() => setPledgeType('items')} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pledge Physical Items</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: pledgeType === 'money' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)', background: pledgeType === 'money' ? 'var(--primary-subtle)' : '#ffffff', cursor: 'pointer' }}>
                      <input type="radio" name="pledgeType" value="money" checked={pledgeType === 'money'} onChange={() => setPledgeType('money')} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Monetary 80G Grant</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {pledgeType === 'items' ? `Quantity (${pledgeCampaign.unit})` : 'Grant Amount (₹)'}
                  </label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={pledgeQuantity}
                    onChange={(e) => setPledgeQuantity(e.target.value)}
                    min={1}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setPledgeCampaign(null)} 
                    className="btn btn-secondary" 
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 1 }}
                  >
                    Proceed to Donation Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
