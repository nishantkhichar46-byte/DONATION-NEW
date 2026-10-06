import React from 'react';
import { useDonation } from '../context/DonationContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useDonation();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'warning':
        return <AlertCircle size={20} className="text-amber-400" color="#F59E0B" />;
      case 'info':
        return <Info size={20} className="text-blue-400" color="#3B82F6" />;
      case 'success':
      default:
        return <CheckCircle2 size={20} className="text-emerald-400" color="#10B981" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type || 'success'}`}>
        {getIcon()}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
      </div>
    </div>
  );
}
