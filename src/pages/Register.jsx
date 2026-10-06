import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { 
  HeartHandshake, 
  UserCheck, 
  Building2, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useDonation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Role toggle
  const initialRole = searchParams.get('role') === 'organisation' ? 'organisation' : 'donor';
  const [role, setRole] = useState(initialRole);

  // Common fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Mumbai');

  // Organisation specific fields (Prompt Section 4)
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Registered Charitable Trust');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState([
    { name: 'Registration_Certificate_2026.pdf', size: '2.4 MB' }
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocs(prev => [...prev, { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }]);
      showToast(`Uploaded ${file.name} for verification`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !mobileNumber) {
      showToast('Please fill in all mandatory fields', 'warning');
      return;
    }

    if (role === 'organisation') {
      if (!orgName || !address || !description) {
        showToast('Please provide organization details and verification documents', 'warning');
        return;
      }

      const orgData = {
        role: 'organisation',
        name: orgName,
        email,
        phone: contactPhone || mobileNumber,
        contactPerson: contactPerson || fullName,
        orgType,
        address,
        location,
        description,
        documentsSubmitted: uploadedDocs,
        verified: false, // Critical prompt requirement: Do NOT automatically display as verified!
        verificationStatus: 'pending'
      };

      register(orgData);
      showToast('Organisation registered! Status is "Pending Verification" until reviewed by admin.', 'info');
      navigate('/org-dashboard');
    } else {
      const donorData = {
        role: 'donor',
        name: fullName || 'Generous Donor',
        email,
        phone: mobileNumber,
        city: location,
        address: location,
        verified: true,
        verificationStatus: 'verified'
      };

      register(donorData);
      showToast('Donor profile created successfully! Welcome to Donation Connect.', 'success');
      navigate('/donor-dashboard');
    }
  };

  return (
    <div style={{ padding: '3.5rem 1.5rem', minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: role === 'organisation' ? '680px' : '520px', width: '100%', transition: 'all 0.3s ease' }}>
        <div className="card" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, var(--primary) 0%, #0F766E 100%)',
              borderRadius: 'var(--radius-lg)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '1rem',
              boxShadow: '0 8px 16px var(--primary-glow)'
            }}>
              <HeartHandshake size={28} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>Join Donation Connect</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Connect with verified causes and empower communities in need
            </p>
          </div>

          {/* Role Selection Toggle (Prompt Section 4) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem', background: '#F1F5F9', padding: '0.35rem', borderRadius: 'var(--radius-md)' }}>
            <button
              type="button"
              onClick={() => setRole('donor')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: role === 'donor' ? '#ffffff' : 'transparent',
                color: role === 'donor' ? 'var(--primary-hover)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: role === 'donor' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <UserCheck size={18} />
              I am a Donor
            </button>
            <button
              type="button"
              onClick={() => setRole('organisation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: role === 'organisation' ? '#ffffff' : 'transparent',
                color: role === 'organisation' ? 'var(--primary-hover)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: role === 'organisation' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Building2 size={18} />
              We are an Organisation (NGO)
            </button>
          </div>

          {/* Prompt Section 4 Warning Note for Organisations */}
          {role === 'organisation' && (
            <div style={{ background: '#FFFBEB', border: '1.5px solid #FCD34D', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400E' }}>
                  Important Verification Notice
                </div>
                <div style={{ fontSize: '0.8rem', color: '#B45309', marginTop: '0.2rem', lineHeight: 1.45 }}>
                  In accordance with platform safety guidelines, newly registered organisations are <strong>not automatically verified</strong>. Your profile will be marked <em>"Verification Pending"</em> until registration documents (80G/12A/Trust deed) are reviewed by our platform administrators.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{role === 'organisation' ? 'Contact Person Name' : 'Full Name'} *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Location (City / State) *</label>
              <select 
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="New Delhi, Delhi NCR">New Delhi, Delhi NCR</option>
                <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
                <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
              </select>
            </div>

            {/* Organisation Specific Fields (Prompt Section 4) */}
            {role === 'organisation' && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 size={18} color="var(--primary)" />
                  Organisation Verification Details
                </h4>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Organisation Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Care & Give Foundation"
                      required={role === 'organisation'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Organisation Type *</label>
                    <select 
                      className="form-select"
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                    >
                      <option value="Registered Charitable Trust">Registered Charitable Trust</option>
                      <option value="Non-Profit Society">Non-Profit Society</option>
                      <option value="Section 8 Company">Section 8 Company</option>
                      <option value="Animal Welfare Shelter">Animal Welfare Shelter</option>
                      <option value="Religious / Community Trust">Religious / Community Trust</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Office Address *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Complete street address, pin code"
                    required={role === 'organisation'}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Mission *</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your organisation's core mission, focus areas, and beneficiaries served..."
                    required={role === 'organisation'}
                  />
                </div>

                {/* Documents for verification (Prompt Section 4) */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Documents for Verification (80G, 12A, Trust Deed, Registration) *</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF, PNG, JPG</span>
                  </label>
                  
                  <div style={{
                    border: '2px dashed var(--border-strong)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: '#F8FAFC',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="file" 
                      id="doc-upload" 
                      style={{ display: 'none' }} 
                      onChange={handleFileUpload}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="doc-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                      <Upload size={24} color="var(--primary)" />
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--secondary)' }}>
                        Click to upload registration document
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Attach 80G certificate or Darpan registration proof
                      </span>
                    </label>
                  </div>

                  {/* Uploaded items list */}
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {uploadedDocs.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#F1F5F9', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <FileText size={14} color="var(--primary)" />
                          <span>{doc.name}</span>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{doc.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              {role === 'organisation' ? 'Submit for Verification' : 'Create Donor Account'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
