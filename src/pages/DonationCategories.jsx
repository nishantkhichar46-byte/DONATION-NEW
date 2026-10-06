import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import DonorFlowStepper from '../components/DonorFlowStepper';
import CategoryIcon from '../components/CategoryIcon';
import { ArrowRight, CheckCircle2, Info, Sparkles } from 'lucide-react';

export default function DonationCategories() {
  const { categories, donationDraft, updateDonationDraft } = useDonation();
  const navigate = useNavigate();

  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(donationDraft?.category || 'clothes');

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    updateDonationDraft({ category: catId });
  };

  const handleNext = () => {
    updateDonationDraft({ category: selectedCategory });
    navigate('/beneficiaries');
  };

  const currentCatObj = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div style={{ padding: '2.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Step 1 in Donor Flow */}
        <DonorFlowStepper currentStep={1} />

        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Step 1 of 5 • Donor Flow</span>
          <h1 className="section-title">What would you like to donate?</h1>
          <p className="section-subtitle">
            Choose the category of items or resources you wish to give. Each category is verified against real-time NGO requests.
          </p>
        </div>

        {/* Clickable Cards Grid (Prompt Section 6) */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div 
                key={cat.id}
                className={`category-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(cat.id)}
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

                <div className="category-icon-wrapper" style={{ background: cat.bgColor }}>
                  <CategoryIcon name={cat.icon} size={28} color={cat.color} />
                </div>

                <h3 style={{ fontSize: '1.25rem', color: isSelected ? 'var(--primary-hover)' : 'var(--secondary)' }}>
                  {cat.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {cat.description}
                </p>

                <div className="category-examples" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  {cat.examples.map((ex, i) => (
                    <span 
                      key={i} 
                      className="category-pill" 
                      style={isSelected ? { background: '#ffffff', borderColor: 'var(--primary-light)', color: 'var(--primary-hover)', fontWeight: 600 } : {}}
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>
                  <span>{cat.urgentNeedCount} Verified NGO Needs</span>
                  <span>Select & Continue →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Tip / Guideline Box */}
        {currentCatObj && (
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto 2.5rem', background: '#F0FDFA', borderColor: 'var(--primary-light)', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Info size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-hover)' }}>
                Item Quality & Hygiene Guideline for {currentCatObj.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#0F766E', marginTop: '0.15rem' }}>
                {currentCatObj.conditionRequirement}
              </div>
            </div>
          </div>
        )}

        {/* Next Continue Button (Prompt Section 6) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            type="button" 
            onClick={handleNext}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '220px' }}
          >
            Next: Choose Beneficiary
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
