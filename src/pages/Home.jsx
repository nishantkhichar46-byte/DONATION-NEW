import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import CategoryIcon from '../components/CategoryIcon';
import OrgCard from '../components/OrgCard';
import CampaignCard from '../components/CampaignCard';
import StatusBadge from '../components/StatusBadge';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Compass, 
  PackageCheck, 
  Users2,
  Calendar,
  Award
} from 'lucide-react';

export default function Home() {
  const { categories, beneficiaries, organisations, campaigns, updateDonationDraft } = useDonation();
  const navigate = useNavigate();

  const verifiedOrgs = organisations.filter(o => o.verified);
  const featuredCampaigns = campaigns.slice(0, 3);

  const handleCategorySelect = (categoryId) => {
    updateDonationDraft({ category: categoryId });
    navigate('/beneficiaries');
  };

  const handleBeneficiarySelect = (beneficiaryId) => {
    updateDonationDraft({ beneficiary: beneficiaryId });
    navigate('/organisations');
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-pill">
                <span className="hero-pill-pulse" />
                <span>Verified NGO Network • Design Thinking Capstone</span>
              </div>

              <h1 className="hero-title">
                Connect the <span className="gradient-text">right donation</span> with the <span className="gradient-text">right cause</span>.
              </h1>

              <p className="hero-description">
                Find verified organisations that need the resources you want to donate. End scattered charity drives with intelligent need-matching, doorstep pickup, and live transparent tracking.
              </p>

              <div className="hero-actions">
                <Link to="/categories" className="btn btn-primary btn-lg">
                  <Heart size={20} fill="#ffffff" />
                  Donate Now
                </Link>
                <Link to="/organisations" className="btn btn-secondary btn-lg">
                  <Search size={20} />
                  Find Organisations
                </Link>
              </div>

              {/* Real-time platform counters */}
              <div className="hero-stats-bar">
                <div className="stat-item">
                  <h3>180+</h3>
                  <p>Verified NGOs</p>
                </div>
                <div className="stat-item">
                  <h3>15,200+</h3>
                  <p>Items Distributed</p>
                </div>
                <div className="stat-item">
                  <h3>48</h3>
                  <p>Cities Covered</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Doorstep Verified</p>
                </div>
              </div>
            </div>

            {/* Interactive Hero Visual */}
            <div className="hero-visual">
              {/* Floating Top Card */}
              <div className="hero-floating-card top-right">
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#15803D" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>100% Verified NGOs</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Govt. 80G / 12A Audited</div>
                </div>
              </div>

              {/* Main Visual Card */}
              <div className="hero-card-main">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
                  </div>
                  <span className="badge badge-verified">
                    <CheckCircle2 size={12} />
                    Live Need Match
                  </span>
                </div>

                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-hover)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Urgent Request Near You
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.2rem' }}>
                    Hope Children Foundation
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>
                    Needs 150 School Notebooks & Warm Sweaters in Mumbai
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-tag">Books</span>
                    <span className="badge badge-tag">Winter Clothes</span>
                    <span className="badge badge-tag">Tablets</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#F0FDFA', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Truck size={20} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-hover)' }}>Free Doorstep Pickup</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Assigned volunteer within 24h</div>
                    </div>
                  </div>
                  <Link to="/categories" className="btn btn-primary btn-sm" style={{ padding: '0.35rem 0.75rem' }}>
                    Match
                  </Link>
                </div>
              </div>

              {/* Floating Bottom Card */}
              <div className="hero-floating-card bottom-left">
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="#D97706" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>Real Impact Receipt</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Photo proof & 80G tax benefit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Section 3 Requirement) */}
      <section style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Systematic Donor Flow</span>
            <h2 className="section-title">How Donation Connect Works</h2>
            <p className="section-subtitle">
              From choosing your surplus items to doorstep collection and real-time delivery proof.
            </p>
          </div>

          <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {/* Step 1 */}
            <div className="card card-hover" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontWeight: 800, fontSize: '1.25rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Choose Donation</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Select what you want to give: clothes, books, food, toys, electronics, furniture, or funds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card card-hover" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontWeight: 800, fontSize: '1.25rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Choose Beneficiary</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Decide who you wish to support: children, elderly, orphanages, women, animals, or disaster relief.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card card-hover" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontWeight: 800, fontSize: '1.25rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Find Matching NGO</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Our algorithm matches your items directly with organisations that currently need them.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card card-hover" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontWeight: 800, fontSize: '1.25rem' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Schedule Pickup</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Choose your convenient date & time slot. Verified volunteer drivers collect from your doorstep.
              </p>
            </div>

            {/* Step 5 */}
            <div className="card card-hover" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FDF2F8', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontWeight: 800, fontSize: '1.25rem' }}>
                5
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Track & Certificate</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Follow live tracking from transit to delivery. Receive verified impact certificate and 80G tax receipt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DONATION CATEGORIES (Section 3 Requirement) */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore Donation Types</span>
            <h2 className="section-title">What Would You Like to Donate?</h2>
            <p className="section-subtitle">
              Every category is mapped to verified non-profits with current requirements.
            </p>
          </div>

          <div className="grid-3">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => handleCategorySelect(cat.id)}
              >
                <div className="category-icon-wrapper" style={{ background: cat.bgColor }}>
                  <CategoryIcon name={cat.icon} size={28} color={cat.color} />
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div className="category-examples">
                  {cat.examples.map((item, idx) => (
                    <span key={idx} className="category-pill">{item}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <span>{cat.urgentNeedCount} Urgent Needs Active</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/categories" className="btn btn-primary btn-lg">
              Start Donation Flow
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BENEFICIARY CATEGORIES (Section 3 Requirement) */}
      <section style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Impact Areas</span>
            <h2 className="section-title">Who Would You Like to Support?</h2>
            <p className="section-subtitle">
              Select a beneficiary group to view tailored social organisations in your community.
            </p>
          </div>

          <div className="grid-3">
            {beneficiaries.map((b) => (
              <div 
                key={b.id} 
                className="beneficiary-card card-hover"
                onClick={() => handleBeneficiarySelect(b.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CategoryIcon name={b.icon} size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--secondary)' }}>{b.title}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {b.beneficiaryCount}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {b.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Current Requirements:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {b.urgentNeeds.map((need, idx) => (
                      <span key={idx} className="category-pill" style={{ background: '#F1F5F9', color: '#1E293B', fontWeight: 600 }}>
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/beneficiaries" className="btn btn-secondary btn-lg">
              Explore All Beneficiary Groups
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. URGENT COMMUNITY CAMPAIGNS */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag">Urgent Drives</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Active Community Campaigns</h2>
            </div>
            <Link to="/campaigns" className="btn btn-outline btn-sm">
              View All Campaigns ({campaigns.length})
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredCampaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED VERIFIED ORGANISATIONS (Prompt Requirement) */}
      <section style={{ padding: '5.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag">Verified Non-Profits</span>
              <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Featured Verified Organisations</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Every organisation undergoes strict legal, operational, and physical audit before verification.
              </p>
            </div>
            <Link to="/organisations" className="btn btn-secondary btn-sm">
              Browse Directory ({organisations.length} Registered)
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {verifiedOrgs.slice(0, 3).map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. DTI PROBLEM & SOLUTION FRAMEWORK SHOWCASE */}
      <section style={{ padding: '5.5rem 0', background: '#0F172A', color: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="dti-badge" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} />
              Design Thinking & Ideation (DTI) Capstone
            </span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Solving the Core User Problem
            </h2>
            <p className="section-subtitle" style={{ color: '#94A3B8' }}>
              Addressing the critical frictions identified during donor and NGO field research.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* The Problem */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  ✕
                </div>
                <h3 style={{ color: '#F87171', fontSize: '1.25rem', margin: 0 }}>Identified User Pain Points</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#CBD5E1', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>•</span>
                  <span><strong>Scattered Requirements:</strong> Donors have usable clothes, electronics, or books but don't know who has an active demand for them right now.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>•</span>
                  <span><strong>Lack of Trust & Verification:</strong> Hesitation to donate due to fear of fraudulent collections or commercial resale.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>•</span>
                  <span><strong>Logistics Barrier:</strong> Transporting heavy cartons or furniture to NGO centres is inconvenient and costly.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>•</span>
                  <span><strong>Zero Feedback Loop:</strong> Donors never learn if their contribution reached a real beneficiary.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div style={{ background: 'rgba(13, 148, 136, 0.1)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid rgba(13, 148, 136, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  ✓
                </div>
                <h3 style={{ color: '#34D399', fontSize: '1.25rem', margin: 0 }}>The Donation Connect Solution</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#CBD5E1', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                  <span><strong>Multi-dimensional Matching:</strong> Donor → Donation Type → Beneficiary Category → Matching NGO real-time inventory.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                  <span><strong>Strict Admin Verification:</strong> Every NGO must submit government registration, Darpan ID, and 80G before receiving the Verified badge.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                  <span><strong>Free Doorstep Pickup:</strong> Integrated volunteer scheduling with slot selection, vehicle matching, and driver assignment.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                  <span><strong>Live Status Pipeline:</strong> 6-stage milestone tracker with impact certificates and transparent receipts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--primary) 0%, #0F766E 100%)', color: '#ffffff', textAlign: 'center' }}>
        <div className="container-narrow">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Make a Meaningful Difference?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#CCFBF1', lineHeight: 1.6, marginBottom: '2rem' }}>
            It takes less than 2 minutes to list surplus books, clothes, or support items. Connect directly with verified organisations today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/categories" className="btn btn-accent btn-lg">
              <Heart size={20} fill="#ffffff" />
              Donate Surplus Items
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg" style={{ background: '#ffffff', color: 'var(--secondary)' }}>
              Register Your NGO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
