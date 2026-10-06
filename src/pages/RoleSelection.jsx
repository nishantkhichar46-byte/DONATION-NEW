import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { 
  Heart, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  FileCheck2, 
  Users 
} from 'lucide-react';

export default function RoleSelection() {
  const { quickSwitchRole } = useAuth();
  const { showToast } = useDonation();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey, path) => {
    quickSwitchRole(roleKey);
    showToast(`Switched to ${roleKey} role profile`, 'success');
    navigate(path);
  };

  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: 'calc(100vh - 150px)', background: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Role Architecture • DTI Model</span>
          <h1 className="section-title">Select Your Role on Donation Connect</h1>
          <p className="section-subtitle">
            Donation Connect is an ecosystem designed with specialized workflows for donors, social organisations, and platform moderators.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {/* Card 1: Donor */}
          <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem 1.75rem', position: 'relative' }}>
            <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-lg)', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#2563EB' }}>
              <Heart size={32} />
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              Role 1
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.75rem' }}>
              Individual / Corporate Donor
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Have surplus clothes, books, food, toys, electronics, furniture, or funds you want to channel to verified beneficiaries.
            </p>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                Key Capabilities:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748B' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> 6-Step intelligent cause matching
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Free doorstep pickup scheduling
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Live tracking & 80G tax certificate
                </li>
              </ul>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={() => handleSelectRole('donor', '/donor-dashboard')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Enter as Demo Donor
                <ArrowRight size={16} />
              </button>
              <Link to="/register?role=donor" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                Register New Donor Account
              </Link>
            </div>
          </div>

          {/* Card 2: Organisation */}
          <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem 1.75rem', position: 'relative' }}>
            <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-lg)', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#059669' }}>
              <Building2 size={32} />
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              Role 2
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.75rem' }}>
              Social Organisation / NGO
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Registered charitable trusts, foundations, and community shelters seeking specific resources to fulfill daily beneficiary requirements.
            </p>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                Key Capabilities:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748B' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Post live item needs & target quantities
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Accept / decline incoming donations
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Launch emergency relief campaigns
                </li>
              </ul>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={() => handleSelectRole('verifiedOrg', '/org-dashboard')}
                className="btn btn-primary"
                style={{ width: '100%', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
              >
                Enter as Verified NGO
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleSelectRole('pendingOrg', '/org-dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                Enter as Pending NGO (Awaiting Review)
              </button>
            </div>
          </div>

          {/* Card 3: Platform Admin */}
          <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem 1.75rem', position: 'relative' }}>
            <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-lg)', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#DC2626' }}>
              <ShieldCheck size={32} />
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              Role 3
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.75rem' }}>
              Platform Administrator
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Platform governance authority reviewing legal documentation, awarding verified badges, and monitoring logistics integrity.
            </p>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                Key Capabilities:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748B' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> 1-Click NGO verification & audit
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Review legal 80G / 12A documents
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Real-time platform oversight & statistics
                </li>
              </ul>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={() => handleSelectRole('admin', '/admin')}
                className="btn btn-secondary"
                style={{ width: '100%', borderColor: '#EF4444', color: '#DC2626' }}
              >
                Enter Admin Portal
                <ArrowRight size={16} />
              </button>
              <Link to="/admin" className="btn btn-sm" style={{ width: '100%', background: '#F1F5F9', color: '#475569' }}>
                Governance & Verification Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
