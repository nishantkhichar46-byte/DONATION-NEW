import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import StatusBadge from '../components/StatusBadge';
import CampaignCard from '../components/CampaignCard';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  ArrowLeft, 
  Sparkles, 
  FileCheck2, 
  Users, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function OrganisationProfile() {
  const { id } = useParams();
  const { organisations, campaigns, updateDonationDraft } = useDonation();
  const navigate = useNavigate();

  const org = organisations.find(o => o.id === id) || organisations[0];
  const orgCampaigns = campaigns.filter(c => c.orgId === org.id);

  const handleDonateNow = () => {
    updateDonationDraft({ orgId: org.id });
    navigate(`/donation-request?orgId=${org.id}`);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)', paddingBottom: '4rem' }}>
      {/* Cover Banner */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        <img 
          src={org.coverImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'} 
          alt={org.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.75) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '1.5rem' }}>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="btn btn-secondary btn-sm"
            style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255, 255, 255, 0.9)' }}
          >
            <ArrowLeft size={16} />
            Back to Directory
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        {/* Profile Card Header */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
              <img 
                src={org.logo || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80'} 
                alt={org.name} 
                style={{ width: 100, height: 100, borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '4px solid #ffffff', boxShadow: 'var(--shadow-md)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>
                    {org.name}
                  </h1>
                  <StatusBadge verified={org.verified} />
                  {org.taxExempt && (
                    <span className="badge badge-tag" style={{ background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
                      {org.taxExempt}
                    </span>
                  )}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem', maxWidth: '700px' }}>
                  {org.tagline}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={15} color="var(--primary)" />
                    <span>{org.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={15} color="var(--primary)" />
                    <span>Est. {org.establishedYear || '2018'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={15} color="var(--primary)" />
                    <span>{org.orgType}</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleDonateNow}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '220px' }}
            >
              <Heart size={20} fill="#ffffff" />
              Donate to this NGO
            </button>
          </div>
        </div>

        {/* 2-Column Profile Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Main Info */}
          <div>
            {/* About & Mission */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1rem' }}>
                About the Organisation
              </h2>
              <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {org.description}
              </p>

              {/* Impact Highlights */}
              <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-hover)' }}>
                    {org.impactNumbers?.childrenEducated || org.impactNumbers?.seniorsSheltered || org.impactNumbers?.animalsRescued || '2,500+'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Beneficiaries Impacted</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>
                    {org.impactNumbers?.donationsReceived || '450+'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Donations Received</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B' }}>
                    ★ {org.rating || '4.9'} ({org.reviewsCount || 85})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Audited Trust Score</div>
                </div>
              </div>
            </div>

            {/* Current Urgent Needs */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)' }}>
                    Current Live Inventory Requirements
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Items this organisation urgently requires to support their daily operations.
                  </p>
                </div>
                <span className="badge badge-urgent">
                  {org.currentNeeds?.length || 0} Needs Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {org.currentNeeds?.map((need, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--secondary)' }}>
                        {need.item}
                      </strong>
                      <span className={`badge ${need.urgency === 'urgent' ? 'badge-urgent' : 'badge-role'}`}>
                        {need.urgency?.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      <span>Target: {need.needed} {need.unit}</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary-hover)' }}>{need.received} {need.unit} received</span>
                    </div>

                    <div className="progress-track" style={{ height: 8 }}>
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min(100, Math.round(((need.received || 0) / need.needed) * 100))}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Campaigns If Any */}
            {orgCampaigns.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
                  Campaigns Run by {org.name}
                </h2>
                <div className="grid-2">
                  {orgCampaigns.map((camp) => (
                    <CampaignCard key={camp.id} campaign={camp} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Compliance, Contact & Location */}
          <div>
            {/* Accreditation / Compliance Box */}
            <div className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem', background: '#F0FDFA', borderColor: 'var(--primary-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <ShieldCheck size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-hover)', margin: 0 }}>
                  Verification & Legal Audit
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', fontWeight: 600 }}>REGISTRATION NUMBER</span>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{org.regNumber}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', fontWeight: 600 }}>NITI AAYOG DARPAN ID</span>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{org.darpanId}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', fontWeight: 600 }}>INCOME TAX STATUS</span>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{org.taxExempt}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', fontWeight: 600 }}>ADMIN VERIFICATION DATE</span>
                  <span style={{ color: '#15803D', fontWeight: 600 }}>{org.verificationDate || 'Verified Jan 2026'}</span>
                </div>
              </div>
            </div>

            {/* Contact & Location Details */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1rem' }}>
                Contact & Centre Address
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Head Office:</span>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>{org.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Contact:</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>{org.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Email:</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>{org.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Globe size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>Website:</span>
                    <a href={org.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', marginLeft: '0.4rem', textDecoration: 'underline' }}>
                      {org.website}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  type="button" 
                  onClick={handleDonateNow}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Heart size={16} fill="#ffffff" />
                  Donate Items Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
