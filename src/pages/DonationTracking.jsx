import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import StatusBadge from '../components/StatusBadge';
import { 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Search, 
  Download, 
  FileCheck2, 
  RefreshCw, 
  AlertCircle,
  Building2,
  Navigation
} from 'lucide-react';

export default function DonationTracking() {
  const { id } = useParams();
  const { donations, advanceTrackingStatus, showToast } = useDonation();

  const [searchId, setSearchId] = useState(id || 'DC-2026-89421');
  const [activeTrackingId, setActiveTrackingId] = useState(id || 'DC-2026-89421');

  // Resolve active donation
  const currentDonation = donations.find(d => d.id.toLowerCase() === activeTrackingId.toLowerCase()) || donations[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const found = donations.find(d => d.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveTrackingId(found.id);
      showToast(`Tracking record loaded for ${found.id}`, 'success');
    } else {
      showToast(`Tracking ID "${searchId}" not found. Displaying active donation demo.`, 'warning');
      setActiveTrackingId(donations[0].id);
    }
  };

  const handleAdvanceStep = () => {
    advanceTrackingStatus(currentDonation.id);
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Search Tracker Bar */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter Tracking ID (e.g. DC-2026-89421)..." 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button type="submit" className="btn btn-primary">
              Track ID
            </button>
            <button 
              type="button" 
              onClick={handleAdvanceStep}
              className="btn btn-secondary"
              title="Simulate status progression for live demo"
              style={{ borderColor: 'var(--accent)', color: '#B45309', background: '#FEF3C7' }}
            >
              ⚡ Advance Next Status Milestone
            </button>
          </form>
        </div>

        {/* Tracking Header Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  Tracking #{currentDonation.id}
                </span>
                <StatusBadge status={currentDonation.status} />
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Item: <strong>{currentDonation.itemTitle}</strong> ({currentDonation.quantity} {currentDonation.unit})
              </div>
            </div>

            {currentDonation.impactCertificateId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ECFDF5', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #86EFAC' }}>
                <FileCheck2 size={20} color="#15803D" />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#15803D' }}>80G IMPACT CERTIFICATE</div>
                  <div style={{ fontSize: '0.72rem', color: '#166534' }}>{currentDonation.impactCertificateId}</div>
                </div>
              </div>
            )}
          </div>

          {/* 6-Step Visual Timeline (Section 14 Requirement) */}
          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" />
              Live Milestone Timeline
            </h3>

            <div className="tracking-timeline">
              {currentDonation.statusHistory?.map((stepItem, idx) => {
                const isCompleted = stepItem.completed;
                const isCurrent = !isCompleted && (idx === 0 || currentDonation.statusHistory[idx - 1]?.completed);

                return (
                  <div 
                    key={idx} 
                    className={`tracking-step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                  >
                    <div className="tracking-step-icon">
                      {isCompleted ? <CheckCircle2 size={20} /> : <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</span>}
                    </div>

                    <div className="tracking-step-content">
                      <div className="tracking-step-title" style={{ color: isCompleted ? 'var(--secondary)' : isCurrent ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
                        {stepItem.step}
                        {isCompleted && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#10B981', marginLeft: '0.5rem' }}>
                            ✓ Done
                          </span>
                        )}
                        {isCurrent && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', marginLeft: '0.5rem' }}>
                            ● Current In-Progress
                          </span>
                        )}
                      </div>
                      <div className="tracking-step-time">
                        {stepItem.timestamp !== 'Pending' ? stepItem.timestamp : 'Awaiting confirmation'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2-Column Section: Map Visualizer + Volunteer Driver Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
          {/* Simulated Interactive Map */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Navigation size={18} color="var(--primary)" />
                Live Logistics Route
              </h3>
              <span className="badge badge-tag">Simulated GPS</span>
            </div>

            {/* Simulated Map Container */}
            <div style={{
              height: '240px',
              borderRadius: 'var(--radius-md)',
              background: '#E2E8F0',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-strong)',
              backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px'
            }}>
              {/* Route connecting line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20%',
                right: '20%',
                height: '4px',
                background: 'dashed 2px var(--primary)',
                borderTop: '3px dashed var(--primary)',
                zIndex: 1
              }} />

              {/* Donor Pin */}
              <div style={{ position: 'absolute', left: '16%', top: '35%', textAlign: 'center', zIndex: 2 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3B82F6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: 'var(--shadow-md)' }}>
                  <MapPin size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1E293B', background: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>
                  Donor Address
                </span>
              </div>

              {/* Driver Van Position */}
              <div style={{ position: 'absolute', left: '50%', top: '30%', textAlign: 'center', zIndex: 3, transform: 'translateX(-50%)' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 0 6px var(--primary-glow)' }}>
                  <Truck size={22} />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-hover)', background: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>
                  {currentDonation.courier?.liveLocation || 'En Route'}
                </span>
              </div>

              {/* Recipient NGO Pin */}
              <div style={{ position: 'absolute', right: '16%', top: '35%', textAlign: 'center', zIndex: 2 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#10B981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: 'var(--shadow-md)' }}>
                  <Building2 size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1E293B', background: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>
                  {currentDonation.orgName}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Destination: <strong>{currentDonation.orgName}</strong></span>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Estimated Transit: ~45 mins</span>
            </div>
          </div>

          {/* Assigned Driver / Volunteer Coordinator Card */}
          <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
              Assigned Logistics Partner
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Truck size={28} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--secondary)' }}>
                  {currentDonation.courier?.name || 'Sunil Pandey'}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Verified Logistics Volunteer
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600, marginTop: '0.2rem' }}>
                  {currentDonation.courier?.vehicle || 'Hero EV Van (MH-02-EE-1904)'}
                </div>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>DRIVER CONTACT:</div>
              <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.15rem' }}>
                {currentDonation.courier?.phone || '+91 98210 11442'}
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a 
                href={`tel:${currentDonation.courier?.phone || '+919821011442'}`} 
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={15} />
                Call Driver
              </a>

              <Link 
                to="/donor-dashboard" 
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
