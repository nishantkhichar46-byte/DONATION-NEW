import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import StatusBadge from '../components/StatusBadge';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  PlusCircle, 
  Check, 
  X, 
  FileText, 
  Sparkles, 
  HeartHandshake, 
  Users, 
  Package, 
  Calendar,
  Layers,
  Upload
} from 'lucide-react';

export default function OrganisationDashboard() {
  const { currentUser } = useAuth();
  const { 
    organisations, 
    donations, 
    acceptDonation, 
    declineDonation, 
    addOrgRequirement, 
    createCampaign,
    showToast 
  } = useDonation();

  // Find org representation
  const activeOrg = organisations.find(o => o.id === (currentUser?.id || 'org-1')) || organisations[0];
  const isVerified = activeOrg?.verified;

  // Incoming requests for this NGO
  const orgDonations = donations.filter(d => d.orgId === activeOrg?.id) || [];
  const pendingRequests = orgDonations.filter(d => d.status === 'requested' || d.status === 'pickup_scheduled');

  // Modal / Form state for Adding a Need
  const [showAddNeedModal, setShowAddNeedModal] = useState(false);
  const [newNeedItem, setNewNeedItem] = useState('');
  const [newNeedCategory, setNewNeedCategory] = useState('clothes');
  const [newNeedQuantity, setNewNeedQuantity] = useState(50);
  const [newNeedUnit, setNewNeedUnit] = useState('sets');
  const [newNeedUrgency, setNewNeedUrgency] = useState('high');

  // Modal for new campaign
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignGoal, setCampaignGoal] = useState(500);
  const [campaignUnit, setCampaignUnit] = useState('kits');
  const [campaignDesc, setCampaignDesc] = useState('');

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (!newNeedItem) return;

    const requirementObj = {
      item: newNeedItem,
      category: newNeedCategory,
      needed: Number(newNeedQuantity),
      received: 0,
      unit: newNeedUnit,
      urgency: newNeedUrgency
    };

    addOrgRequirement(activeOrg.id, requirementObj);
    setShowAddNeedModal(false);
    setNewNeedItem('');
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!campaignTitle) return;

    createCampaign({
      title: campaignTitle,
      orgId: activeOrg.id,
      orgName: activeOrg.name,
      category: 'other',
      beneficiary: 'children',
      goalAmount: Number(campaignGoal),
      unit: campaignUnit,
      description: campaignDesc,
      urgent: true,
      bannerImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80'
    });

    setShowCampaignModal(false);
    setCampaignTitle('');
    setCampaignDesc('');
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Verification Status Warning / Verified Banner */}
        {!isVerified ? (
          <div style={{ background: '#FFFBEB', border: '2px solid #FCD34D', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#92400E', fontWeight: 800 }}>
                  Verification Status: Under Administrator Review ⏳
                </h3>
                <p style={{ color: '#B45309', fontSize: '0.88rem', marginTop: '0.2rem', maxWidth: '750px' }}>
                  Your NGO documents (80G certificate, registration number <strong>{activeOrg.regNumber}</strong>) have been submitted. Our compliance team is verifying legal credentials. You can publish internal requirements, but public donation cards will display a "Verification Pending" notice until approved.
                </p>
              </div>
            </div>
            <Link to="/admin" className="btn btn-secondary btn-sm" style={{ background: '#ffffff', borderColor: '#F59E0B', color: '#92400E', fontWeight: 700 }}>
              Review in Admin Portal 🛡️
            </Link>
          </div>
        ) : (
          <div style={{ background: '#ECFDF5', border: '1.5px solid #86EFAC', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803D' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#166534', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {activeOrg.name} — Verified Organisation ✓
                </div>
                <div style={{ color: '#15803D', fontSize: '0.82rem' }}>
                  Registration ID: {activeOrg.regNumber} • Darpan ID: {activeOrg.darpanId} • {activeOrg.taxExempt}
                </div>
              </div>
            </div>
            <span className="badge badge-verified" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              Compliant & Audited
            </span>
          </div>
        )}

        {/* NGO Header */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img 
                src={activeOrg.logo || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80'} 
                alt={activeOrg.name} 
                style={{ width: 68, height: 68, borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
              />
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  {activeOrg.name}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  {activeOrg.tagline || activeOrg.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => setShowAddNeedModal(true)}
                className="btn btn-primary"
              >
                <PlusCircle size={18} />
                Post Item Requirement
              </button>
              <button 
                type="button" 
                onClick={() => setShowCampaignModal(true)}
                className="btn btn-secondary"
              >
                <Sparkles size={18} />
                Launch Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Package size={24} />
            </div>
            <div className="metric-data">
              <h4>{orgDonations.length}</h4>
              <p>Donations Received</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <Clock size={24} />
            </div>
            <div className="metric-data">
              <h4>{pendingRequests.length}</h4>
              <p>Pending Review</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
              <Sparkles size={24} />
            </div>
            <div className="metric-data">
              <h4>{activeOrg.currentNeeds?.length || 0}</h4>
              <p>Active Live Needs</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
              <Users size={24} />
            </div>
            <div className="metric-data">
              <h4>{activeOrg.impactNumbers?.childrenEducated || activeOrg.impactNumbers?.seniorsSheltered || '1,200+'}</h4>
              <p>Beneficiaries Impacted</p>
            </div>
          </div>
        </div>

        {/* Incoming Donation Requests Section */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)' }}>
              Incoming Donation Requests ({orgDonations.length})
            </h2>
          </div>

          {orgDonations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orgDonations.map((donation) => (
                <div key={donation.id} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <img 
                      src={donation.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80'} 
                      alt="Item preview" 
                      style={{ width: 70, height: 70, borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>
                          {donation.itemTitle}
                        </span>
                        <StatusBadge status={donation.status} />
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Quantity: <strong>{donation.quantity} {donation.unit}</strong> • Condition: <strong>{donation.condition}</strong>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.35rem' }}>
                        Donor: <strong>{donation.donorName}</strong> ({donation.donorPhone}) • Pickup: {donation.pickupAddress}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {donation.status !== 'delivered' && donation.status !== 'accepted' && (
                      <>
                        <button 
                          type="button" 
                          onClick={() => acceptDonation(donation.id)}
                          className="btn btn-primary btn-sm"
                        >
                          <Check size={16} />
                          Accept Request
                        </button>
                        <button 
                          type="button" 
                          onClick={() => declineDonation(donation.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#EF4444' }}
                        >
                          <X size={16} />
                          Decline
                        </button>
                      </>
                    )}
                    <Link to={`/track/${donation.id}`} className="btn btn-secondary btn-sm">
                      Track Status
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Package size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.15rem' }}>No Requests Currently Pending</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Post your urgent requirements below to match with donors near you.
              </p>
            </div>
          )}
        </div>

        {/* Current Organisation Requirements / Urgent Needs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)' }}>
                Current Needs Published to Donors
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Donors searching for these categories are immediately matched with your centre.
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => setShowAddNeedModal(true)}
              className="btn btn-secondary btn-sm"
            >
              <PlusCircle size={15} />
              Add Requirement
            </button>
          </div>

          <div className="grid-3">
            {activeOrg.currentNeeds?.map((need, idx) => (
              <div key={idx} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-tag" style={{ textTransform: 'capitalize' }}>
                    {need.category}
                  </span>
                  <span className={`badge ${need.urgency === 'urgent' ? 'badge-urgent' : 'badge-role'}`}>
                    {need.urgency?.toUpperCase() || 'HIGH'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                  {need.item}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Target: <strong>{need.needed} {need.unit}</strong>
                </div>
                <div className="progress-track" style={{ height: 6 }}>
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(100, Math.round(((need.received || 0) / need.needed) * 100))}%` }} 
                  />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.4rem' }}>
                  {need.received || 0} / {need.needed} {need.unit} collected
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Add Requirement */}
      {showAddNeedModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
              Publish an Urgent Item Requirement
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Donors looking to donate this category will immediately see your need on matching pages.
            </p>

            <form onSubmit={handleAddRequirement}>
              <div className="form-group">
                <label className="form-label">Item Name / Description *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newNeedItem}
                  onChange={(e) => setNewNeedItem(e.target.value)}
                  placeholder="e.g. Science Laboratory Kits, Winter Sweaters"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select 
                    className="form-select"
                    value={newNeedCategory}
                    onChange={(e) => setNewNeedCategory(e.target.value)}
                  >
                    <option value="clothes">Clothes</option>
                    <option value="books">Books & Educational</option>
                    <option value="food">Food & Rations</option>
                    <option value="toys">Toys & Games</option>
                    <option value="furniture">Furniture</option>
                    <option value="electronics">Electronics</option>
                    <option value="medical">Medical Items</option>
                    <option value="other">Other Useful Items</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Quantity *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newNeedQuantity}
                    onChange={(e) => setNewNeedQuantity(e.target.value)}
                    min={1}
                    required
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={newNeedUnit}
                    onChange={(e) => setNewNeedUnit(e.target.value)}
                    placeholder="sets, kg, pieces"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Urgency Level</label>
                  <select 
                    className="form-select"
                    value={newNeedUrgency}
                    onChange={(e) => setNewNeedUrgency(e.target.value)}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddNeedModal(false)}
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
                  Publish Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Campaign */}
      {showCampaignModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
              Create a Community Campaign
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Launch an urgent drive to mobilize community donations for special causes.
            </p>

            <form onSubmit={handleCreateCampaign}>
              <div className="form-group">
                <label className="form-label">Campaign Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. Winter Clothes for 500 Village Families"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Goal Target Amount / Units *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    min={1}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Unit Type</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={campaignUnit}
                    onChange={(e) => setCampaignUnit(e.target.value)}
                    placeholder="kits, blankets, sets"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Campaign Description & Appeal *</label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={campaignDesc}
                  onChange={(e) => setCampaignDesc(e.target.value)}
                  placeholder="Explain why this drive is urgent and who will receive the items..."
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowCampaignModal(false)}
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
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
