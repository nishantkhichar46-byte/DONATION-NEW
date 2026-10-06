import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { HeartHandshake, Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, Building2, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useDonation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('priya.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }

    const res = login(email, password);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else if (res.user.role === 'organisation') {
        navigate('/org-dashboard');
      } else {
        navigate('/donor-dashboard');
      }
    }
  };

  const handleDemoLogin = (roleKey, redirectPath) => {
    const user = DEMO_USERS[roleKey];
    if (user) {
      login(user.email, 'demoPassword', roleKey);
      showToast(`Logged in as ${user.name} (${roleKey})`, 'success');
      navigate(redirectPath);
    }
  };

  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        {/* Card */}
        <div className="card" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, var(--primary) 0%, #0F766E 100%)',
              borderRadius: 'var(--radius-lg)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '1rem',
              boxShadow: '0 8px 16px var(--primary-glow)'
            }}>
              <HeartHandshake size={28} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Sign in to manage donations, pickups, or organisation requirements
            </p>
          </div>

          {/* Quick 1-Click Demo Login Shortcuts */}
          <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem', textAlign: 'center' }}>
              ⚡ Quick Demo 1-Click Login
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => handleDemoLogin('donor', '/donor-dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <UserCheck size={14} color="#3B82F6" />
                Donor
              </button>
              <button 
                type="button"
                onClick={() => handleDemoLogin('verifiedOrg', '/org-dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Building2 size={14} color="#10B981" />
                Verified NGO
              </button>
              <button 
                type="button"
                onClick={() => handleDemoLogin('pendingOrg', '/org-dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Building2 size={14} color="#F59E0B" />
                Pending NGO
              </button>
              <button 
                type="button"
                onClick={() => handleDemoLogin('admin', '/admin')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <ShieldCheck size={14} color="#EF4444" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Password</span>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Demo password reset link simulated to your email', 'info'); }} style={{ fontSize: '0.78rem', color: 'var(--primary)' }}>
                  Forgot password?
                </a>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <label htmlFor="remember" style={{ fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                Remember me on this device
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
