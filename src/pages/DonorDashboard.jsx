import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import StatusBadge from '../components/StatusBadge';
import OrgCard from '../components/OrgCard';
import { 
  Heart, 
  Truck, 
  Building2, 
  Award, 
  PlusCircle, 
  ArrowRight, 
  Clock, 
  Search, 
  CheckCircle2, 
  FileText,
  MapPin,
  Calendar
} from 'lucide-react';

export default function DonorDashboard() {
  const { currentUser } = useAuth();
  const { donations, organisations, advanceTrackingStatus } = useDonation();
  const navigate = useNavigate();

  const userDonations = donations.filter(d => d.donorId === (currentUser?.id || 'user-donor-1')) || donations;
  const activeDonations = userDonations.filter(d => d.status !== 'delivered' && d.status !== 'declined');
  const pastDonations = userDonations.filter(d => d.status === 'delivered');

  const verifiedOrgs = organisations.filter(o => o.verified);

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #ffffff 0%, #F0FDFA 100%)', borderColor: 'var(--primary-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img 
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'} 
                alt="Donor Avatar" 
                style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '3px solid #ffffff', boxShadow: 'var(--shadow-md)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)' }}>
                    Welcome back, {currentUser?.name || 'Priya Sharma'}!
                  </h1>
                  <span className="badge badge-role">
                    <Award size={13} />
                    {currentUser?.donorLevel || 'Gold Philanthropist'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.35rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--primary)" />
                    <span>{currentUser?.city || 'Mumbai, Maharashtra'}</span>
                  </div>
                  <span>•</span>
                  <span>Member since Oct 2024</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/categories" className="btn btn-primary">
                <PlusCircle size={18} />
                Make New Donation
              </Link>
              <Link to="/organisations" className="btn btn-secondary">
                <Search size={18} />
                Find NGOs
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Heart size={24} />
            </div>
            <div className="metric-data">
              <h4>{userDonations.length}</h4>
              <p>Total Donations</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
              <Truck size={24} />
            </div>
            <div className="metric-data">
              <h4>{activeDonations.length}</h4>
              <p>Active Pickups</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <Building2 size={24} />
            </div>
            <div className="metric-data">
              <h4>{new Set(userDonations.map(d => d.orgId)).size || 3}</h4>
              <p>NGOs Supported</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
              <Award size={24} />
            </div>
            <div className="metric-data">
              <h4>850 pts</h4>
              <p>Community Impact Score</p>
            </div>
          </div>
        </div>

        {/* Active Donations In Progress */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)' }}>
              Active Donations & Pickups ({activeDonations.length})
            </h2>
            <Link to="/history" style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600 }}>
              View Complete History →
            </Link>
          </div>

          {activeDonations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activeDonations.map((donation) => (
                <div key={donation.id} className="card" style={{ padding: '1.75rem', borderLeft: '5px solid var(--primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
                          {donation.itemTitle}
                        </span>
                        <StatusBadge status={donation.status} />
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Tracking ID: <strong style={{ color: '#1E293B' }}>{donation.id}</strong> • Destination: <strong style={{ color: 'var(--primary-hover)' }}>{donation.orgName}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button
                        type="button"
                        onClick={() => advanceTrackingStatus(donation.id)}
                        className="btn btn-secondary btn-sm"
                        title="Simulate driver pickup / milestone completion"
                      >
                        ⚡ Simulate Progress
                      </button>
                      <Link to={`/track/${donation.id}`} className="btn btn-primary btn-sm">
                        <Truck size={14} />
                        Track Live
                      </Link>
                    </div>
                  </div>

                  {/* Quick Pickup Schedule Info */}
                  <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>SCHEDULED DATE & SLOT</span>
                      <strong style={{ color: '#1E293B' }}>{donation.pickupDate} ({donation.pickupSlot.split(' ')[0]})</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>COURIER / VOLUNTEER</span>
                      <strong style={{ color: '#1E293B' }}>{donation.courier?.name || 'Assigning volunteer'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>PICKUP ADDRESS</span>
                      <span style={{ color: '#475569' }}>{donation.pickupAddress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <Truck size={42} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Active Pickups Right Now</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Have useful items lying around? Donate them to an NGO with a current requirement!
              </p>
              <Link to="/categories" className="btn btn-primary">
                Start a Donation
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Verified NGOs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--secondary)' }}>
                Recommended Verified NGOs in Your Area
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Matched based on your preferred donation history and active community requirements.
              </p>
            </div>
            <Link to="/organisations" style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600 }}>
              Browse All →
            </Link>
          </div>

          <div className="grid-3">
            {verifiedOrgs.slice(0, 3).map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
