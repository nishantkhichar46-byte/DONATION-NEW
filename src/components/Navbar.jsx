import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import QuickRoleSwitcher from './QuickRoleSwitcher';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  Building,
  Shield,
  Layers,
  Search,
  Gift
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, isDonor, isOrganisation, isAdmin } = useAuth();
  const { notifications } = useDonation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (isAdmin) return '/admin';
    if (isOrganisation) return '/org-dashboard';
    return '/donor-dashboard';
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* Brand Header */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon">
            <HeartHandshake size={24} />
          </div>
          <div className="brand-text">
            <h1>DONATION CONNECT</h1>
            <span>Verified NGO Matching • DTI</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/organisations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Explore Organisations
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Donate
          </NavLink>
          <NavLink to="/campaigns" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Campaigns
          </NavLink>
          <NavLink to="/roles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            How It Works
          </NavLink>
          {currentUser && (
            <NavLink to={getDashboardLink()} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Quick Demo Role Switcher */}
          <QuickRoleSwitcher />

          {/* Notifications Bell */}
          <Link 
            to="/notifications" 
            className="nav-link" 
            style={{ position: 'relative', padding: '0.5rem' }}
            title="Notifications"
          >
            <Bell size={20} color="#475569" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 17,
                height: 17,
                background: '#EF4444',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}>
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User Auth Controls */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <img 
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                  alt={currentUser.name} 
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--primary-light)'
                  }}
                />
              </button>

              {userDropdownOpen && (
                <>
                  <div 
                    style={{ position: 'fixed', inset: 0, zIndex: 1100 }} 
                    onClick={() => setUserDropdownOpen(false)} 
                  />
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border-subtle)',
                    width: '230px',
                    padding: '0.5rem',
                    zIndex: 1200
                  }}>
                    <div style={{ padding: '0.6rem 0.8rem', borderBottom: '1px solid #F1F5F9' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {currentUser.email}
                      </div>
                      <div style={{ marginTop: '0.35rem' }}>
                        <span className="badge badge-role" style={{ fontSize: '0.7rem' }}>
                          {currentUser.role.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.4rem 0' }}>
                      <Link 
                        to={getDashboardLink()} 
                        className="nav-link" 
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>

                      <Link 
                        to="/profile" 
                        className="nav-link" 
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={16} />
                        Profile Settings
                      </Link>

                      {isDonor && (
                        <Link 
                          to="/history" 
                          className="nav-link" 
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Gift size={16} />
                          My Donations
                        </Link>
                      )}

                      <button 
                        type="button"
                        onClick={handleLogout}
                        className="nav-link"
                        style={{ border: 'none', background: 'none', width: '100%', color: '#EF4444' }}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button 
            type="button" 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--secondary)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/organisations" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Explore Organisations
          </Link>
          <Link to="/categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Donate Now
          </Link>
          <Link to="/campaigns" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Campaigns
          </Link>
          <Link to="/roles" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            How It Works / Roles
          </Link>
          {currentUser ? (
            <>
              <Link to={getDashboardLink()} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <button 
                type="button" 
                onClick={handleLogout} 
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Log Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
