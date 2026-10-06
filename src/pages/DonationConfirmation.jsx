import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Truck, 
  Download, 
  Share2, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Building2, 
  ShieldCheck,
  PackageCheck,
  Printer
} from 'lucide-react';

export default function DonationConfirmation() {
  const { id } = useParams();
  const { donations, showToast } = useDonation();
  const navigate = useNavigate();

  const donation = donations.find(d => d.id === id) || donations[0];

  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback if browser suppresses
    }
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Donation tracking link copied to clipboard!', 'success');
    } else {
      showToast('Link ready to share: ' + window.location.href, 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '3.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Celebration Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 72,
            height: 72,
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 12px 24px rgba(16, 185, 129, 0.35)',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle2 size={40} />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
            Donation Scheduled Successfully!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
            Thank you for connecting your surplus resources with a verified cause. Your contribution creates tangible impact.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-subtle)', position: 'relative' }}>
          {/* Tracking ID Header Pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                UNIQUE TRACKING ID
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-hover)', letterSpacing: '0.02em' }}>
                {donation?.id || 'DC-2026-89421'}
              </div>
            </div>
            <span className="badge badge-verified" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              <ShieldCheck size={14} />
              Status: Pickup Scheduled
            </span>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', marginBottom: '2rem' }}>
            {/* Recipient NGO */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                RECIPIENT ORGANISATION
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.2rem' }}>
                {donation?.orgName}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.15rem' }}>
                Verified Partner Hub
              </div>
            </div>

            {/* Donated Items */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                ITEM PARTICULARS
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.2rem' }}>
                {donation?.itemTitle}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.15rem' }}>
                Quantity: {donation?.quantity} {donation?.unit} ({donation?.condition})
              </div>
            </div>

            {/* Pickup Date & Slot */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                SCHEDULED PICKUP TIME
              </span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '0.2rem' }}>
                {donation?.pickupDate}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.15rem' }}>
                {donation?.pickupSlot}
              </div>
            </div>

            {/* Assigned Logistics Fleet */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                ASSIGNED LOGISTICS AGENT
              </span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '0.2rem' }}>
                {donation?.courier?.name || 'Express Logistics Partner'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.15rem' }}>
                Vehicle: {donation?.courier?.vehicle || 'Green EV Van'}
              </div>
            </div>
          </div>

          {/* Pickup Address Box */}
          <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>
                Pickup Location Address:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.1rem' }}>
                {donation?.pickupAddress}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            <Link 
              to={`/track/${donation?.id}`} 
              className="btn btn-primary btn-lg"
            >
              <Truck size={18} />
              Track Live Delivery
            </Link>

            <button 
              type="button" 
              onClick={handlePrint}
              className="btn btn-secondary btn-lg"
            >
              <Printer size={18} />
              Print / Save Pass
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button 
              type="button" 
              onClick={handleShare}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 600 }}
            >
              <Share2 size={16} />
              Share Donation Reference
            </button>
            <Link 
              to="/donor-dashboard"
              style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 600 }}
            >
              Return to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
