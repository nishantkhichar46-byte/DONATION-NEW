import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg, var(--primary) 0%, #0F766E 100%)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', margin: 0, fontWeight: 800 }}>DONATION CONNECT</h3>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              “Connect the right donation with the right cause.”
            </p>
            <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              A Design Thinking & Ideation (DTI) project bridging donors with verified NGOs, eliminating scattered donation requirements through intelligent need matching, doorstep pickup, and live transparent tracking.
            </p>
            <div className="dti-badge">
              <Sparkles size={13} />
              DTI Innovation Platform
            </div>
          </div>

          {/* Quick Flow & Pages */}
          <div className="footer-col">
            <h4>Application Flow</h4>
            <ul className="footer-links">
              <li><Link to="/categories">1. Choose Donation</Link></li>
              <li><Link to="/beneficiaries">2. Choose Beneficiary</Link></li>
              <li><Link to="/organisations">3. Matching Organisations</Link></li>
              <li><Link to="/donation-request">4. Donation Request</Link></li>
              <li><Link to="/pickup-request">5. Pickup Request</Link></li>
              <li><Link to="/track/DC-2026-89421">6. Live Donation Tracking</Link></li>
              <li><Link to="/history">7. Donation History & 80G</Link></li>
            </ul>
          </div>

          {/* Portals & Dashboards */}
          <div className="footer-col">
            <h4>Platform Portals</h4>
            <ul className="footer-links">
              <li><Link to="/donor-dashboard">Donor Dashboard</Link></li>
              <li><Link to="/org-dashboard">Organisation Dashboard</Link></li>
              <li><Link to="/admin">Admin Governance Panel</Link></li>
              <li><Link to="/campaigns">Urgent Live Campaigns</Link></li>
              <li><Link to="/roles">Role Selection Portal</Link></li>
              <li><Link to="/notifications">Notification Center</Link></li>
              <li><Link to="/profile">User / Org Profile</Link></li>
            </ul>
          </div>

          {/* Contact & Verification Trust */}
          <div className="footer-col">
            <h4>Trust & Verification</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#10B981" />
                <span>100% Admin Audited NGOs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#38BDF8" />
                <span>Operating across 48+ Cities</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="#A78BFA" />
                <span>support@donationconnect.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} color="#FBBF24" />
                <span>Toll-Free Helpline: 1800-419-HELP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 Donation Connect. Design Thinking & Ideation (DTI) Capstone Project.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/roles" style={{ color: '#94A3B8' }}>DTI Methodology</Link>
            <Link to="/organisations" style={{ color: '#94A3B8' }}>Verified Registry</Link>
            <Link to="/admin" style={{ color: '#94A3B8' }}>Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
