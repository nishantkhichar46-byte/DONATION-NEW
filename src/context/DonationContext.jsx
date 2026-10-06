import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DONATION_CATEGORIES, 
  BENEFICIARY_CATEGORIES, 
  INITIAL_ORGANISATIONS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_DONATIONS, 
  INITIAL_NOTIFICATIONS 
} from '../data/initialData';

const DonationContext = createContext();

export function DonationProvider({ children }) {
  // Organisations state
  const [organisations, setOrganisations] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_organisations');
      return saved ? JSON.parse(saved) : INITIAL_ORGANISATIONS;
    } catch {
      return INITIAL_ORGANISATIONS;
    }
  });

  // Campaigns state
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  // Donations list
  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Active donation draft in progress through donor flow
  const [donationDraft, setDonationDraft] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_donation_draft');
      return saved ? JSON.parse(saved) : {
        category: null,
        beneficiary: null,
        orgId: null,
        itemTitle: '',
        quantity: 1,
        unit: 'items',
        condition: 'Gently Used / Good',
        description: '',
        estimatedValue: '',
        deliveryType: 'pickup', // pickup or dropoff
        images: [],
        pickupAddress: '',
        pickupCity: 'Mumbai',
        pickupDate: '',
        pickupSlot: 'Morning (09:00 AM - 12:00 PM)',
        alternatePhone: '',
        vehicleType: 'Small Van / Car',
        notes: ''
      };
    } catch {
      return {};
    }
  });

  // Toast message state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('dc_organisations', JSON.stringify(organisations));
  }, [organisations]);

  useEffect(() => {
    localStorage.setItem('dc_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('dc_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('dc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dc_donation_draft', JSON.stringify(donationDraft));
  }, [donationDraft]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateDonationDraft = (fields) => {
    setDonationDraft(prev => ({
      ...prev,
      ...fields
    }));
  };

  const clearDonationDraft = () => {
    const emptyDraft = {
      category: null,
      beneficiary: null,
      orgId: null,
      itemTitle: '',
      quantity: 1,
      unit: 'items',
      condition: 'Gently Used / Good',
      description: '',
      estimatedValue: '',
      deliveryType: 'pickup',
      images: [],
      pickupAddress: '',
      pickupCity: 'Mumbai',
      pickupDate: '',
      pickupSlot: 'Morning (09:00 AM - 12:00 PM)',
      alternatePhone: '',
      vehicleType: 'Small Van / Car',
      notes: ''
    };
    setDonationDraft(emptyDraft);
    localStorage.removeItem('dc_donation_draft');
  };

  // Submit and create new donation
  const submitDonation = (donorUser) => {
    const trackingId = `DC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const matchedOrg = organisations.find(o => o.id === donationDraft.orgId) || organisations[0];

    const newDonation = {
      id: trackingId,
      donorId: donorUser?.id || 'guest-donor',
      donorName: donorUser?.name || 'Anonymous Donor',
      donorPhone: donorUser?.phone || '+91 98765 43210',
      donorEmail: donorUser?.email || 'donor@example.com',
      orgId: matchedOrg.id,
      orgName: matchedOrg.name,
      category: donationDraft.category || 'clothes',
      beneficiary: donationDraft.beneficiary || 'children',
      itemTitle: donationDraft.itemTitle || `${donationDraft.category?.toUpperCase() || 'Assorted'} Donation Package`,
      quantity: Number(donationDraft.quantity) || 1,
      unit: donationDraft.unit || 'units',
      condition: donationDraft.condition || 'Good',
      description: donationDraft.description || 'Donated with care for community support.',
      pickupAddress: donationDraft.pickupAddress || donorUser?.address || 'Pickup location not specified',
      pickupDate: donationDraft.pickupDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      pickupSlot: donationDraft.pickupSlot || 'Morning (09:00 AM - 12:00 PM)',
      vehicleType: donationDraft.vehicleType || 'Van',
      status: 'pickup_scheduled',
      statusHistory: [
        { step: 'Request Placed', timestamp: new Date().toLocaleString(), completed: true },
        { step: 'NGO Approved', timestamp: new Date().toLocaleString(), completed: true },
        { step: 'Logistics Assigned', timestamp: new Date().toLocaleString(), completed: true },
        { step: 'Pickup Scheduled', timestamp: new Date().toLocaleString(), completed: true },
        { step: 'Out for Pickup', timestamp: 'Pending', completed: false },
        { step: 'Delivered & Impact Verified', timestamp: 'Pending', completed: false }
      ],
      courier: {
        name: 'Sunil Pandey (Donation Connect Volunteer Fleet)',
        phone: '+91 98330 92811',
        vehicle: 'Green Logistics EV Van (MH-02-EE-1904)',
        liveLocation: 'Scheduled for dispatch'
      },
      images: donationDraft.images?.length > 0 
        ? donationDraft.images 
        : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80'],
      createdAt: new Date().toISOString(),
      receiptUrl: '#',
      estimatedValue: donationDraft.estimatedValue ? `₹${donationDraft.estimatedValue}` : '₹2,500'
    };

    setDonations(prev => [newDonation, ...prev]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: donorUser?.id || 'guest',
      role: 'donor',
      title: 'Donation Scheduled Successfully!',
      message: `Your donation request ${trackingId} for ${matchedOrg.name} has been confirmed.`,
      timestamp: 'Just now',
      type: 'success',
      read: false,
      link: `/track/${trackingId}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Update org received numbers
    setOrganisations(prev => prev.map(org => {
      if (org.id === matchedOrg.id) {
        return {
          ...org,
          impactNumbers: {
            ...org.impactNumbers,
            donationsReceived: `${parseInt(org.impactNumbers?.donationsReceived || '100') + 1}+`
          }
        };
      }
      return org;
    }));

    showToast(`Donation ${trackingId} created successfully!`, 'success');
    return newDonation;
  };

  // Status progression simulation for interactive demo / tracking testing
  const advanceTrackingStatus = (donationId) => {
    setDonations(prev => prev.map(d => {
      if (d.id !== donationId) return d;

      const steps = [
        'Request Placed',
        'NGO Approved',
        'Logistics Assigned',
        'Pickup Scheduled',
        'Out for Pickup',
        'Delivered & Impact Verified'
      ];

      const currentCompletedCount = d.statusHistory.filter(s => s.completed).length;
      if (currentCompletedCount >= steps.length) {
        showToast('Donation is already fully delivered and impact verified!', 'info');
        return d;
      }

      const nextIndex = currentCompletedCount;
      const updatedHistory = d.statusHistory.map((stepItem, idx) => {
        if (idx === nextIndex) {
          return {
            ...stepItem,
            timestamp: new Date().toLocaleString(),
            completed: true
          };
        }
        return stepItem;
      });

      const nextStatus = nextIndex === 4 
        ? 'out_for_pickup' 
        : nextIndex === 5 
        ? 'delivered' 
        : 'in_progress';

      showToast(`Status updated to: ${steps[nextIndex]}!`, 'success');

      return {
        ...d,
        status: nextStatus,
        statusHistory: updatedHistory,
        impactCertificateId: nextIndex === 5 ? `CERT-DC-${Math.floor(10000 + Math.random() * 90000)}` : d.impactCertificateId
      };
    }));
  };

  // Admin verifies an organisation
  const verifyOrganisation = (orgId) => {
    setOrganisations(prev => prev.map(org => {
      if (org.id === orgId) {
        return {
          ...org,
          verified: true,
          verificationStatus: 'verified',
          verificationDate: new Date().toISOString().split('T')[0]
        };
      }
      return org;
    }));

    showToast('Organisation verified and approved successfully! Badge awarded.', 'success');

    // Add alert notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: orgId,
        role: 'organisation',
        title: 'Organisation Verified! ✓',
        message: 'Your documents have been approved by the platform administrator. Your profile is now verified.',
        timestamp: 'Just now',
        type: 'success',
        read: false,
        link: '/org-dashboard'
      },
      ...prev
    ]);
  };

  // Admin rejects an organisation
  const rejectOrganisation = (orgId, reason = 'Additional document proofs required') => {
    setOrganisations(prev => prev.map(org => {
      if (org.id === orgId) {
        return {
          ...org,
          verified: false,
          verificationStatus: 'rejected',
          rejectionReason: reason
        };
      }
      return org;
    }));
    showToast(`Organisation registration rejected: ${reason}`, 'warning');
  };

  // NGO accepts incoming donation request
  const acceptDonation = (donationId) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'accepted',
          statusHistory: d.statusHistory.map(s => s.step === 'NGO Approved' ? { ...s, completed: true, timestamp: new Date().toLocaleString() } : s)
        };
      }
      return d;
    }));
    showToast(`Donation ${donationId} accepted! Logistics dispatched.`, 'success');
  };

  // NGO declines request
  const declineDonation = (donationId) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'declined'
        };
      }
      return d;
    }));
    showToast(`Donation ${donationId} has been declined.`, 'info');
  };

  // NGO adds or updates current requirement
  const addOrgRequirement = (orgId, requirement) => {
    setOrganisations(prev => prev.map(org => {
      if (org.id === orgId) {
        return {
          ...org,
          currentNeeds: [requirement, ...(org.currentNeeds || [])]
        };
      }
      return org;
    }));
    showToast('Requirement published to matching feed!', 'success');
  };

  // Create new campaign
  const createCampaign = (campaignData) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      ...campaignData,
      currentAmount: 0,
      donorCount: 0,
      daysLeft: 30
    };
    setCampaigns(prev => [newCamp, ...prev]);
    showToast('New community campaign created!', 'success');
  };

  // Notification management
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared.', 'info');
  };

  return (
    <DonationContext.Provider value={{
      categories: DONATION_CATEGORIES,
      beneficiaries: BENEFICIARY_CATEGORIES,
      organisations,
      campaigns,
      donations,
      notifications,
      donationDraft,
      toast,
      showToast,
      updateDonationDraft,
      clearDonationDraft,
      submitDonation,
      advanceTrackingStatus,
      verifyOrganisation,
      rejectOrganisation,
      acceptDonation,
      declineDonation,
      addOrgRequirement,
      createCampaign,
      markNotificationRead,
      clearAllNotifications
    }}>
      {children}
    </DonationContext.Provider>
  );
}

export const useDonation = () => useContext(DonationContext);
