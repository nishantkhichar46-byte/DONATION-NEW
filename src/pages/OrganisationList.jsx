import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import DonorFlowStepper from '../components/DonorFlowStepper';
import OrgCard from '../components/OrgCard';
import { Search, Filter, ShieldCheck, MapPin, Sparkles, RefreshCw } from 'lucide-react';

export default function OrganisationList() {
  const { organisations, categories, beneficiaries, donationDraft, updateDonationDraft } = useDonation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL query params or draft state
  const paramCategory = searchParams.get('category') || donationDraft?.category || 'all';
  const paramBeneficiary = searchParams.get('beneficiary') || donationDraft?.beneficiary || 'all';

  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(paramBeneficiary);
  const [selectedCity, setSelectedCity] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 4-Dimensional Matching Algorithm (Section 8 Requirement)
  const matchedOrganisations = useMemo(() => {
    return organisations.filter(org => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = org.name.toLowerCase().includes(q);
        const matchesDesc = org.description.toLowerCase().includes(q);
        const matchesNeeds = org.currentNeeds?.some(n => n.item.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesNeeds) return false;
      }

      // 2. Verified Only Filter
      if (verifiedOnly && !org.verified) {
        return false;
      }

      // 3. Location / City Filter
      if (selectedCity !== 'all') {
        if (!org.location.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // 4. Donation Category Matching (matches accepted categories OR specific current needs)
      if (selectedCategory !== 'all') {
        const acceptsCategory = org.acceptedCategories?.includes(selectedCategory);
        const hasSpecificNeed = org.currentNeeds?.some(n => n.category === selectedCategory);
        if (!acceptsCategory && !hasSpecificNeed) return false;
      }

      // 5. Beneficiary Category Matching
      if (selectedBeneficiary !== 'all') {
        const matchesBeneficiary = org.beneficiaryCategories?.includes(selectedBeneficiary);
        if (!matchesBeneficiary) return false;
      }

      return true;
    });
  }, [organisations, searchQuery, verifiedOnly, selectedCity, selectedCategory, selectedBeneficiary]);

  // Unique cities list
  const cities = ['Mumbai', 'New Delhi', 'Bengaluru', 'Pune', 'Jaipur', 'Kolkata', 'Chennai'];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBeneficiary('all');
    setSelectedCity('all');
    setVerifiedOnly(false);
    setSearchQuery('');
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container">
        {/* Step 3 in Donor Flow */}
        <DonorFlowStepper currentStep={3} />

        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Step 3 of 5 • Matching Engine</span>
          <h1 className="section-title">Matching Verified Organisations</h1>
          <p className="section-subtitle">
            Showing non-profits matched based on your chosen donation type, beneficiary cause, and live organizational inventory needs.
          </p>
        </div>

        {/* Filter Bar (Prompt Section 8: 1. Category 2. Beneficiary 3. Current Needs 4. Location) */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search NGO name, item or need..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Donation Category Filter */}
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                if (e.target.value !== 'all') updateDonationDraft({ category: e.target.value });
              }}
            >
              <option value="all">All Donation Types</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>

            {/* Beneficiary Filter */}
            <select 
              className="form-select"
              value={selectedBeneficiary}
              onChange={(e) => {
                setSelectedBeneficiary(e.target.value);
                if (e.target.value !== 'all') updateDonationDraft({ beneficiary: e.target.value });
              }}
            >
              <option value="all">All Beneficiaries</option>
              {beneficiaries.map(b => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>

            {/* Location / City Filter */}
            <select 
              className="form-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Locations (National)</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Reset Button */}
            <button 
              type="button" 
              onClick={resetFilters}
              className="btn btn-secondary btn-sm"
              title="Reset all filters"
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>

          {/* Quick Checkbox: Verified Only */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--secondary)' }}>
              <input 
                type="checkbox" 
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)} 
              />
              <ShieldCheck size={16} color="#10B981" />
              <span>Show Verified Organisations Only</span>
            </label>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Found <strong>{matchedOrganisations.length}</strong> matching organisations
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {matchedOrganisations.length > 0 ? (
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {matchedOrganisations.map((org) => (
              <OrgCard 
                key={org.id} 
                org={org} 
                highlightCategory={selectedCategory !== 'all' ? selectedCategory : null} 
              />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
            <Sparkles size={44} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No direct matches for current criteria</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Try broadening your location filter or selecting "All Donation Types" to see other non-profits eager for community support.
            </p>
            <button type="button" onClick={resetFilters} className="btn btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
