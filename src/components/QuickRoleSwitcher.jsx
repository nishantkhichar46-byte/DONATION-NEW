import React, { useState } from 'react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { UserCheck, Building2, ShieldCheck, UserCog, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickRoleSwitcher() {
  const { currentUser, quickSwitchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = (roleKey, redirectPath) => {
    quickSwitchRole(roleKey);
    setIsOpen(false);
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  const getRoleLabel = () => {
    if (!currentUser) return 'Switch Demo Account';
    if (currentUser.role === 'admin') return 'Admin View';
    if (currentUser.role === 'organisation') {
      return currentUser.verified ? 'Verified NGO' : 'Pending NGO';
    }
    return 'Donor View';
  };

  const getRoleIcon = () => {
    if (!currentUser) return <UserCog size={15} />;
    if (currentUser.role === 'admin') return <ShieldCheck size={15} color="#EF4444" />;
    if (currentUser.role === 'organisation') return <Building2 size={15} color="#0D9488" />;
    return <UserCheck size={15} color="#3B82F6" />;
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        type="button"
        className="role-pill-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="1-Click Switch between Demo Donor, Verified NGO, Pending NGO & Admin"
      >
        {getRoleIcon()}
        <span>{getRoleLabel()}</span>
        <ChevronDown size={14} style={{ opacity: 0.7 }} />
      </button>

      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 1100 }} 
            onClick={() => setIsOpen(false)} 
          />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            background: '#ffffff',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-subtle)',
            width: '280px',
            padding: '0.6rem',
            zIndex: 1200,
            animation: 'fadeIn 0.15s ease-out'
          }}>
            <div style={{ padding: '0.4rem 0.6rem 0.6rem', borderBottom: '1px solid #F1F5F9', marginBottom: '0.4rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quick Demo Switcher
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                Test all 19 role-specific views in 1 click
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {/* Donor */}
              <button
                type="button"
                onClick={() => handleSelectRole('donor', '/donor-dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: currentUser?.role === 'donor' ? 'var(--primary-subtle)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={16} color="#3B82F6" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Donor Account</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Priya Sharma (Make & Track Donations)</div>
                  </div>
                </div>
                {currentUser?.role === 'donor' && <Check size={16} color="var(--primary)" />}
              </button>

              {/* Verified NGO */}
              <button
                type="button"
                onClick={() => handleSelectRole('verifiedOrg', '/org-dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: currentUser?.role === 'organisation' && currentUser?.verified ? 'var(--primary-subtle)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={16} color="#10B981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Verified NGO</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Hope Children Foundation (Accept Requests)</div>
                  </div>
                </div>
                {currentUser?.role === 'organisation' && currentUser?.verified && <Check size={16} color="var(--primary)" />}
              </button>

              {/* Pending NGO */}
              <button
                type="button"
                onClick={() => handleSelectRole('pendingOrg', '/org-dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: currentUser?.role === 'organisation' && !currentUser?.verified ? 'var(--primary-subtle)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Pending NGO</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Green Earth Relief (Awaiting Admin)</div>
                  </div>
                </div>
                {currentUser?.role === 'organisation' && !currentUser?.verified && <Check size={16} color="var(--primary)" />}
              </button>

              {/* Platform Admin */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin', '/admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: currentUser?.role === 'admin' ? 'var(--primary-subtle)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={16} color="#EF4444" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Platform Admin</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Verify NGOs, Manage System</div>
                  </div>
                </div>
                {currentUser?.role === 'admin' && <Check size={16} color="var(--primary)" />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
