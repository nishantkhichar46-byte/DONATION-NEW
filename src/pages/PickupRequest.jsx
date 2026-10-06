import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import DonorFlowStepper from '../components/DonorFlowStepper';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function PickupRequest() {
  const { donationDraft, updateDonationDraft, submitDonation, showToast, organisations } = useDonation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDropoff = searchParams.get('dropoff') === 'true' || donationDraft.deliveryType === 'dropoff';

  const defaultDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [address, setAddress] = useState(donationDraft?.pickupAddress || currentUser?.address || 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053');
  const [city, setCity] = useState(donationDraft?.pickupCity || currentUser?.city || 'Mumbai');
  const [pickupDate, setPickupDate] = useState(donationDraft?.pickupDate || defaultDate);
  const [pickupSlot, setPickupSlot] = useState(donationDraft?.pickupSlot || 'Morning (09:00 AM - 12:00 PM)');
  const [alternatePhone, setAlternatePhone] = useState(donationDraft?.alternatePhone || '+91 98765 43210');
  const [vehicleType, setVehicleType] = useState(donationDraft?.vehicleType || 'Small Van / Car');
  const [hasLift, setHasLift] = useState(true);
  const [isFragile, setIsFragile] = useState(false);
  const [notes, setNotes] = useState(donationDraft?.notes || '');

  const selectedOrg = organisations.find(o => o.id === donationDraft.orgId) || organisations[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDropoff && !address) {
      showToast('Please provide your complete pickup address', 'warning');
      return;
    }

    updateDonationDraft({
      pickupAddress: isDropoff ? `Self Drop-off at: ${selectedOrg.address}` : address,
      pickupCity: city,
      pickupDate,
      pickupSlot,
      alternatePhone,
      vehicleType,
      notes
    });

    // Create the actual donation record in global state
    const created = submitDonation(currentUser);
    navigate(`/confirmation/${created.id}`);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Step 5 in Donor Flow */}
        <DonorFlowStepper currentStep={5} />

        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Step 5 of 5 • Logistics</span>
          <h1 className="section-title">
            {isDropoff ? 'Confirm NGO Drop-off Schedule' : 'Schedule Doorstep Pickup'}
          </h1>
          <p className="section-subtitle">
            {isDropoff 
              ? `Confirm the date and time when you will deliver items to ${selectedOrg.name}.`
              : 'Our verified logistics partner will arrive with appropriate transport to collect your donation.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Summary Box */}
          <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-hover)', textTransform: 'uppercase' }}>
                DONATION SUMMARY
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
                {donationDraft.itemTitle || 'Surplus Item Donation Package'}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Quantity: {donationDraft.quantity || 1} {donationDraft.unit || 'units'} • Destination: <strong>{selectedOrg.name}</strong>
              </div>
            </div>
            <span className="badge badge-verified">
              <ShieldCheck size={14} />
              Free Doorstep Logistics
            </span>
          </div>

          {!isDropoff ? (
            <>
              {/* Pickup Address */}
              <h3 style={{ fontSize: '1.15rem', color: 'var(--secondary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--primary)" />
                Pickup Address Details
              </h3>

              <div className="form-group">
                <label className="form-label">
                  <span>Street Address & Flat / House No. *</span>
                  <button 
                    type="button" 
                    onClick={() => setAddress(currentUser?.address || 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                  >
                    Use Saved Profile Address
                  </button>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, building, street, landmark, PIN code"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <select 
                    className="form-select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone for Pickup Coordinator *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: '#EFF6FF', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1.75rem', border: '1px solid #BFDBFE' }}>
              <div style={{ fontWeight: 700, color: '#1E40AF', fontSize: '1rem', marginBottom: '0.5rem' }}>
                NGO Drop-off Centre Location:
              </div>
              <div style={{ fontSize: '0.9rem', color: '#1E3A8A' }}>
                <strong>{selectedOrg.name}</strong><br />
                {selectedOrg.address}<br />
                Coordinator: {selectedOrg.contactPerson} ({selectedOrg.phone})
              </div>
            </div>
          )}

          {/* Schedule Date & Slot */}
          <h3 style={{ fontSize: '1.15rem', color: 'var(--secondary)', margin: '1.5rem 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--primary)" />
            Preferred Schedule Slot
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Preferred Date *</label>
              <input 
                type="date" 
                className="form-input" 
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time Slot *</label>
              <select 
                className="form-select"
                value={pickupSlot}
                onChange={(e) => setPickupSlot(e.target.value)}
              >
                <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
              </select>
            </div>
          </div>

          {!isDropoff && (
            <>
              {/* Vehicle Type Requirement */}
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">Required Logistics Vehicle Type</label>
                <select 
                  className="form-select"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="Two-wheeler / Bike">Two-wheeler / EV Scooter (Small parcel, books, toys)</option>
                  <option value="Small Van / Car">Small Van / Eco Van (Cartons of clothes, dry rations, electronics)</option>
                  <option value="Tempo / Mini-Truck">Tempo / Mini-Truck (Furniture, study tables, large cots)</option>
                </select>
              </div>

              {/* Access notes */}
              <div style={{ display: 'flex', gap: '2rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="checkbox" 
                    checked={hasLift} 
                    onChange={(e) => setHasLift(e.target.checked)} 
                  />
                  <span>Elevator / Lift Available at building</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="checkbox" 
                    checked={isFragile} 
                    onChange={(e) => setIsFragile(e.target.checked)} 
                  />
                  <span>Fragile / Delicate handling required</span>
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Special Delivery / Gate Instructions</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring doorbell 402, enter through Gate B, call on arrival"
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
            >
              Confirm & Schedule Pickup
              <CheckCircle2 size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
