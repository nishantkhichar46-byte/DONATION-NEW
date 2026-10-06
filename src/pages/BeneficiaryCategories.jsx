import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import DonorFlowStepper from '../components/DonorFlowStepper';
import CategoryIcon from '../components/CategoryIcon';
import { ArrowRight, CheckCircle2, ArrowLeft, Heart, Sparkles } from 'lucide-react';

export default function BeneficiaryCategories() {
  const { beneficiaries, categories, donationDraft, updateDonationDraft } = useDonation();
  const navigate = useNavigate();

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(donationDraft?.beneficiary || 'children');

  const selectedCategoryObj = categories.find(c => c.id === donationDraft.category) || categories[0];

  const handleSelect = (benId) => {
    setSelectedBeneficiary(benId);
    updateDonationDraft({ beneficiary: benId });
  };

  const handleFindOrganisations = () => {
    updateDonationDraft({ beneficiary: selectedBeneficiary });
    navigate(`/organisations?category=${donationDraft.category || 'clothes'}&beneficiary=${selectedBeneficiary}`);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Step 2 in Donor Flow */}
        <DonorFlowStepper currentStep={2} />

        {/* Selected Donation Category Indicator */}
        <div style={{ maxWidth: '650px', margin: '0 auto 2rem', background: '#ffffff', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>DONATING:</span>
            <span className="badge badge-tag" style={{ background: selectedCategoryObj.bgColor, color: selectedCategoryObj.color, fontWeight: 700 }}>
              {selectedCategoryObj.title}
            </span>
          </div>
          <Link to="/categories" style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Change Category
          </Link>
        </div>

        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Step 2 of 5 • Donor Flow</span>
          <h1 className="section-title">Who would you like to support?</h1>
          <p className="section-subtitle">
            Choose the community or cause you want your donation to directly reach.
          </p>
        </div>

        {/* Clickable Cards Grid (Prompt Section 7) */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          {beneficiaries.map((b) => {
            const isSelected = selectedBeneficiary === b.id;

            return (
              <div 
                key={b.id}
                className={`beneficiary-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(b.id)}
                style={{
                  position: 'relative',
                  borderWidth: isSelected ? '2.5px' : '1.5px',
                  cursor: 'pointer'
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px var(--primary-glow)'
                  }}>
                    <CheckCircle2 size={16} />
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--primary-light)' : 'var(--primary-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? 'var(--primary-hover)' : 'var(--primary)'
                  }}>
                    <CategoryIcon name={b.icon} size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: isSelected ? 'var(--primary-hover)' : 'var(--secondary)' }}>
                      {b.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {b.beneficiaryCount}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {b.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Common Urgent Needs:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {b.urgentNeeds.map((need, idx) => (
                      <span 
                        key={idx} 
                        className="category-pill"
                        style={isSelected ? { background: '#ffffff', color: 'var(--primary-hover)', fontWeight: 600 } : {}}
                      >
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons (Prompt Section 7: "Find Organisations") */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <button 
            type="button" 
            onClick={() => navigate('/categories')}
            className="btn btn-secondary btn-lg"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <button 
            type="button" 
            onClick={handleFindOrganisations}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '220px' }}
          >
            Find Organisations
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
