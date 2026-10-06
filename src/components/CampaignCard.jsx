import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Flame, ArrowRight, Heart } from 'lucide-react';
import { useDonation } from '../context/DonationContext';

export default function CampaignCard({ campaign, onPledgeClick }) {
  const navigate = useNavigate();
  const { updateDonationDraft } = useDonation();

  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100));

  const handleContribute = () => {
    if (onPledgeClick) {
      onPledgeClick(campaign);
    } else {
      updateDonationDraft({
        orgId: campaign.orgId,
        category: campaign.category,
        beneficiary: campaign.beneficiary,
        itemTitle: `Campaign Contribution: ${campaign.title}`
      });
      navigate(`/donation-request?orgId=${campaign.orgId}&category=${campaign.category}&campaignId=${campaign.id}`);
    }
  };

  return (
    <div className="campaign-card">
      <div className="campaign-image-wrap">
        <img 
          src={campaign.bannerImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'} 
          alt={campaign.title} 
          className="campaign-image"
        />
        {campaign.urgent && (
          <div className="campaign-badge-overlay">
            <span className="badge badge-urgent">
              <Flame size={13} />
              Urgent Drive
            </span>
          </div>
        )}
      </div>

      <div className="campaign-body">
        <span className="campaign-org-name">{campaign.orgName}</span>
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-desc">{campaign.description}</p>

        {/* Progress bar */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--primary-hover)' }}>{percent}% Collected</span>
            <span style={{ color: 'var(--text-muted)' }}>{campaign.currentAmount} / {campaign.goalAmount} {campaign.unit}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>

          <div className="campaign-meta-stats">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Users size={14} />
              <span>{campaign.donorCount} Donors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} />
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleContribute}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            <Heart size={14} />
            Support Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
