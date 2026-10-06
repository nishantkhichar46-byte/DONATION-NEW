import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { MapPin, ArrowRight, Heart, Sparkles, Building2 } from 'lucide-react';
import { useDonation } from '../context/DonationContext';

export default function OrgCard({ org, highlightCategory }) {
  const navigate = useNavigate();
  const { updateDonationDraft } = useDonation();

  const handleDonateClick = (e) => {
    e.stopPropagation();
    updateDonationDraft({ orgId: org.id });
    navigate(`/donation-request?orgId=${org.id}`);
  };

  return (
    <div className="org-card">
      <div className="org-card-header">
        <img 
          src={org.logo || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80'} 
          alt={org.name} 
          className="org-avatar"
        />
        <div className="org-card-title">
          <h3>
            {org.name}
            <StatusBadge verified={org.verified} />
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
              {org.orgType}
            </span>
            <div className="org-location">
              <MapPin size={13} color="var(--primary)" />
              <span>{org.location}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="org-desc">
        {org.description}
      </p>

      {/* Current Needs Section as required by prompt */}
      <div className="org-needs-block">
        <div className="org-needs-title">
          <Sparkles size={13} />
          Current Needs:
        </div>
        <div className="org-needs-tags">
          {org.currentNeeds && org.currentNeeds.length > 0 ? (
            org.currentNeeds.map((need, idx) => {
              const isMatch = highlightCategory && need.category === highlightCategory;
              return (
                <span 
                  key={idx} 
                  className="org-need-tag"
                  style={isMatch ? { 
                    background: '#FEF3C7', 
                    color: '#92400E', 
                    borderColor: '#F59E0B', 
                    fontWeight: 700 
                  } : {}}
                >
                  {need.item || need} {isMatch ? '★ Matching Need' : ''}
                </span>
              );
            })
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>All essential categories welcome</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="org-card-actions">
        <Link 
          to={`/organisation/${org.id}`} 
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          View Profile
        </Link>
        <button 
          type="button" 
          onClick={handleDonateClick}
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
        >
          <Heart size={14} />
          Donate
        </button>
      </div>
    </div>
  );
}
