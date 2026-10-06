import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import { 
  ShieldCheck, 
  Clock, 
  Building2, 
  FileText, 
  Check, 
  X, 
  Users, 
  Package, 
  Truck, 
  Search, 
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Filter
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    organisations, 
    donations, 
    verifyOrganisation, 
    rejectOrganisation, 
    showToast 
  } = useDonation();

  const [activeTab, setActiveTab] = useState('pending'); // pending, allOrgs, donationsLog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  const pendingOrgs = organisations.filter(o => !o.verified && o.verificationStatus !== 'rejected');
  const verifiedOrgs = organisations.filter(o => o.verified);

  const handleApprove = (orgId, orgName) => {
    verifyOrganisation(orgId);
  };

  const handleReject = (orgId, orgName) => {
    rejectOrganisation(orgId, 'Additional PAN/80G documents requested');
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-urgent" style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' }}>
                <ShieldCheck size={14} />
                Platform Governance & Moderation
              </span>
            </div>
            <h1 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
              Administrator Control Center
            </h1>
            <p className="section-subtitle">
              Verify non-profit documentation, approve verified badges, audit logistics, and ensure donor safety.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>Audit Engine: Operational</span>
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#B45309' }}>
              <Clock size={24} />
            </div>
            <div className="metric-data">
              <h4>{pendingOrgs.length}</h4>
              <p>Pending Verifications</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
              <ShieldCheck size={24} />
            </div>
            <div className="metric-data">
              <h4>{verifiedOrgs.length}</h4>
              <p>Verified Active NGOs</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Package size={24} />
            </div>
            <div className="metric-data">
              <h4>{donations.length + 15200}</h4>
              <p>Total Items Distributed</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
              <Truck size={24} />
            </div>
            <div className="metric-data">
              <h4>{donations.filter(d => d.status !== 'delivered').length}</h4>
              <p>Active Pickups in Transit</p>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="card" style={{ padding: '0.75rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`btn btn-sm ${activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ position: 'relative' }}
            >
              Pending NGO Verifications
              {pendingOrgs.length > 0 && (
                <span style={{
                  background: '#EF4444',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  marginLeft: '0.35rem'
                }}>
                  {pendingOrgs.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('allOrgs')}
              className={`btn btn-sm ${activeTab === 'allOrgs' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Master NGO Directory ({organisations.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('donationsLog')}
              className={`btn btn-sm ${activeTab === 'donationsLog' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Platform Donation Oversight ({donations.length})
            </button>
          </div>
        </div>

        {/* TAB 1: PENDING NGO VERIFICATION WORKBENCH (Critical Prompt Feature) */}
        {activeTab === 'pending' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary)' }}>
                NGO Credentials Verification Queue
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Review legal registration documents, darpan IDs, and contact points. Clicking "Approve & Verify" immediately awards the verified trust badge across the entire platform.
              </p>
            </div>

            {pendingOrgs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {pendingOrgs.map((org) => (
                  <div key={org.id} className="card" style={{ padding: '2rem', border: '1.5px solid #FCD34D', background: '#FFFDF5' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                        <img 
                          src={org.logo || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80'} 
                          alt={org.name} 
                          style={{ width: 72, height: 72, borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary)' }}>
                              {org.name}
                            </h3>
                            <span className="badge badge-pending">
                              <Clock size={12} />
                              Pending Verification
                            </span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                            {org.orgType} • {org.location} • Est. {org.establishedYear || '2026'}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.4rem', maxWidth: '650px' }}>
                            {org.description}
                          </div>
                        </div>
                      </div>

                      {/* Approval Actions */}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          type="button" 
                          onClick={() => handleApprove(org.id, org.name)}
                          className="btn btn-primary"
                          style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
                        >
                          <Check size={18} />
                          Approve & Issue Verified Badge
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleReject(org.id, org.name)}
                          className="btn btn-secondary"
                          style={{ color: '#EF4444' }}
                        >
                          <X size={18} />
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Submitted Legal Documents Grid */}
                    <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FileText size={16} color="var(--primary)" />
                        Submitted Documents for Verification:
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>REGISTRATION NUMBER:</span>
                          <strong style={{ fontSize: '0.88rem', color: '#1E293B' }}>{org.regNumber || 'REG-WB-2026-904128'}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>NITI AAYOG DARPAN ID:</span>
                          <strong style={{ fontSize: '0.88rem', color: '#1E293B' }}>{org.darpanId || 'WB/2026/0019482'}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>CONTACT OFFICER:</span>
                          <strong style={{ fontSize: '0.88rem', color: '#1E293B' }}>{org.contactPerson} ({org.phone})</strong>
                        </div>
                      </div>

                      {/* Download / View Files */}
                      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {org.documentsSubmitted && org.documentsSubmitted.length > 0 ? (
                          org.documentsSubmitted.map((doc, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => showToast(`Previewing ${doc.name} (Verified Authenticity)`, 'info')}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: '#F8FAFC',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.4rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                color: 'var(--primary-hover)',
                                fontWeight: 600
                              }}
                            >
                              <FileText size={14} />
                              <span>{doc.name}</span>
                              <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>({doc.size})</span>
                            </button>
                          ))
                        ) : (
                          <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                            Standard Charitable Trust Deed & 80G Application uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verification Queue is Clear!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  All registered organisations have been audited and verified.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MASTER NGO DIRECTORY */}
        {activeTab === 'allOrgs' && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
              All Registered Organisations Master Directory ({organisations.length})
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Organisation</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Location</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Reg No.</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organisations.map((org) => (
                    <tr key={org.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={org.logo} alt={org.name} style={{ width: 34, height: 34, borderRadius: 6, objectFit: 'cover' }} />
                          <span>{org.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B' }}>{org.orgType}</td>
                      <td style={{ padding: '1rem', color: '#64748B' }}>{org.location}</td>
                      <td style={{ padding: '1rem' }}>
                        <StatusBadge verified={org.verified} />
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B', fontFamily: 'monospace' }}>{org.regNumber}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <Link to={`/organisation/${org.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PLATFORM DONATIONS OVERSIGHT */}
        {activeTab === 'donationsLog' && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
              Platform Donation Dispatch & Logistics Oversight ({donations.length})
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Tracking ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Donor</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Destination NGO</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Items</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--primary-hover)' }}>
                        {d.id}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>{d.donorName}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{d.donorPhone}</div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{d.orgName}</td>
                      <td style={{ padding: '1rem', color: '#475569' }}>
                        {d.itemTitle} ({d.quantity} {d.unit})
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <StatusBadge status={d.status} />
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <Link to={`/track/${d.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
