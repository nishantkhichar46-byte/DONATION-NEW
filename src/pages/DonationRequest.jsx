import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import DonorFlowStepper from '../components/DonorFlowStepper';
import { 
  Heart, 
  ArrowRight, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Info, 
  CheckCircle2, 
  Truck, 
  Building2,
  Calendar
} from 'lucide-react';

export default function DonationRequest() {
  const { organisations, categories, beneficiaries, donationDraft, updateDonationDraft, showToast } = useDonation();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Resolve prefilled org or category from query params or draft
  const initialOrgId = searchParams.get('orgId') || donationDraft?.orgId || organisations[0].id;
  const initialCat = searchParams.get('category') || donationDraft?.category || 'clothes';

  const [selectedOrgId, setSelectedOrgId] = useState(initialOrgId);
  const [category, setCategory] = useState(initialCat);
  const [itemTitle, setItemTitle] = useState(donationDraft?.itemTitle || '');
  const [quantity, setQuantity] = useState(donationDraft?.quantity || 5);
  const [unit, setUnit] = useState(donationDraft?.unit || 'sets');
  const [condition, setCondition] = useState(donationDraft?.condition || 'Gently Used / Good');
  const [description, setDescription] = useState(donationDraft?.description || '');
  const [estimatedValue, setEstimatedValue] = useState(donationDraft?.estimatedValue || '1500');
  const [deliveryType, setDeliveryType] = useState(donationDraft?.deliveryType || 'pickup');
  
  // Sample photo gallery / uploaded photos
  const [images, setImages] = useState(donationDraft?.images?.length ? donationDraft.images : [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80'
  ]);

  const selectedOrg = organisations.find(o => o.id === selectedOrgId) || organisations[0];

  const handleAddSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80'
    ];
    const nextImg = samples[images.length % samples.length];
    setImages(prev => [...prev, nextImg]);
    showToast('Photo attached to donation item!', 'info');
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemTitle.trim()) {
      showToast('Please specify the donation item name', 'warning');
      return;
    }

    updateDonationDraft({
      orgId: selectedOrgId,
      category,
      itemTitle,
      quantity,
      unit,
      condition,
      description,
      estimatedValue,
      deliveryType,
      images
    });

    if (deliveryType === 'pickup') {
      navigate('/pickup-request');
    } else {
      navigate('/pickup-request?dropoff=true');
    }
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Step 4 in Donor Flow */}
        <DonorFlowStepper currentStep={4} />

        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Step 4 of 5 • Item Details</span>
          <h1 className="section-title">Create Donation Request</h1>
          <p className="section-subtitle">
            Provide details of the items you wish to donate to ensure proper handling and rapid NGO confirmation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Target NGO Selection Summary */}
          <div style={{ background: '#F0FDFA', border: '1.5px solid var(--primary-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={selectedOrg.logo || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80'} 
                alt={selectedOrg.name} 
                style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                  RECIPIENT ORGANISATION
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  {selectedOrg.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  {selectedOrg.location} • {selectedOrg.verified ? '✓ Verified Partner' : 'Verification In Review'}
                </div>
              </div>
            </div>

            <div style={{ minWidth: '180px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.2rem' }}>
                Change Recipient NGO:
              </label>
              <select 
                className="form-select"
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              >
                {organisations.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section A: Item Particulars */}
          <h3 style={{ fontSize: '1.15rem', color: 'var(--secondary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={18} color="var(--primary)" />
            Donation Particulars
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select 
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Specific Item Title *</label>
              <input 
                type="text" 
                className="form-input" 
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="e.g. 15 Children Storybooks, 8 Winter Jackets"
                required
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <input 
                type="number" 
                className="form-input" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Unit of Measure</label>
              <select 
                className="form-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="sets">Sets</option>
                <option value="pieces">Pieces / Units</option>
                <option value="pairs">Pairs</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="boxes">Boxes / Cartons</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Item Condition *</label>
              <select 
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Brand New (With Tags / Unopened)">Brand New (Unopened)</option>
                <option value="Like New / Excellent">Like New / Excellent</option>
                <option value="Gently Used / Good">Gently Used / Good</option>
                <option value="Functional / Working">Functional / Working</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Item Description & Dimensions</span>
              <span className="form-hint">Brief details to help the logistics driver plan transport</span>
            </label>
            <textarea 
              className="form-textarea" 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Packed into 2 cardboard cartons. Textbooks for Grade 6-10 students in English and Marathi..."
            />
          </div>

          {/* Section B: Photos Upload Simulation */}
          <div className="form-group" style={{ marginTop: '1.5rem', marginBottom: '1.75rem' }}>
            <label className="form-label">
              <span>Item Photographs (Helps NGO Verify Condition in Advance)</span>
              <span className="form-hint">Up to 4 images</span>
            </label>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: 90, height: 90, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={img} alt={`Item ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)}
                    style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(239, 68, 68, 0.9)', color: '#ffffff', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    title="Remove image"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <button 
                  type="button" 
                  onClick={handleAddSampleImage}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 'var(--radius-md)',
                    border: '2px dashed var(--primary)',
                    background: 'var(--primary-subtle)',
                    color: 'var(--primary-hover)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  <Upload size={20} />
                  Attach Photo
                </button>
              )}
            </div>
          </div>

          {/* Section C: Fulfillment Preference */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Fulfillment & Handover Method *
            </label>

            <div className="grid-2">
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: deliveryType === 'pickup' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: deliveryType === 'pickup' ? 'var(--primary-subtle)' : '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <input 
                  type="radio" 
                  name="deliveryType" 
                  value="pickup" 
                  checked={deliveryType === 'pickup'} 
                  onChange={() => setDeliveryType('pickup')}
                />
                <Truck size={24} color="var(--primary)" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--secondary)' }}>
                    Free Doorstep Pickup
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Volunteer driver will collect from your address
                  </span>
                </div>
              </label>

              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: deliveryType === 'dropoff' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: deliveryType === 'dropoff' ? 'var(--primary-subtle)' : '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <input 
                  type="radio" 
                  name="deliveryType" 
                  value="dropoff" 
                  checked={deliveryType === 'dropoff'} 
                  onChange={() => setDeliveryType('dropoff')}
                />
                <Building2 size={24} color="var(--primary)" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--secondary)' }}>
                    Self Drop-off at NGO Centre
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Drop off items directly at the partner facility
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              Back
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
            >
              Proceed to Schedule Pickup
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
