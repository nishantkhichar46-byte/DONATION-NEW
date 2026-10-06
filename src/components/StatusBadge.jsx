import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Truck, ShieldCheck, XCircle } from 'lucide-react';

export default function StatusBadge({ status, verified }) {
  if (verified !== undefined) {
    if (verified) {
      return (
        <span className="badge badge-verified">
          <CheckCircle2 size={13} />
          Verified NGO
        </span>
      );
    }
    return (
      <span className="badge badge-pending">
        <Clock size={13} />
        Verification Pending
      </span>
    );
  }

  switch (status) {
    case 'delivered':
      return (
        <span className="badge badge-verified">
          <ShieldCheck size={13} />
          Delivered & Verified
        </span>
      );
    case 'out_for_pickup':
    case 'in_transit':
      return (
        <span className="badge badge-role">
          <Truck size={13} />
          Out for Pickup
        </span>
      );
    case 'pickup_scheduled':
      return (
        <span className="badge" style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>
          <Clock size={13} />
          Pickup Scheduled
        </span>
      );
    case 'accepted':
      return (
        <span className="badge badge-verified">
          <CheckCircle2 size={13} />
          Approved by NGO
        </span>
      );
    case 'declined':
    case 'rejected':
      return (
        <span className="badge badge-urgent">
          <XCircle size={13} />
          Declined
        </span>
      );
    case 'requested':
    default:
      return (
        <span className="badge badge-pending">
          <Clock size={13} />
          Request Placed
        </span>
      );
  }
}
