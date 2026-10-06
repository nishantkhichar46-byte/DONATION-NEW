import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function DonorFlowStepper({ currentStep = 1 }) {
  const steps = [
    { number: 1, label: 'Donation Type', path: '/categories' },
    { number: 2, label: 'Beneficiary', path: '/beneficiaries' },
    { number: 3, label: 'Matching NGOs', path: '/organisations' },
    { number: 4, label: 'Donation Request', path: '/donation-request' },
    { number: 5, label: 'Pickup', path: '/pickup-request' },
    { number: 6, label: 'Tracking', path: '/track/DC-2026-89421' }
  ];

  return (
    <div style={{ padding: '1.25rem 0 2rem' }}>
      <div className="flow-progress-bar">
        {/* Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '19px',
          left: '30px',
          right: '30px',
          height: '3px',
          background: '#E2E8F0',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            background: 'var(--primary)',
            width: `${Math.min(100, Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100))}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Steps */}
        {steps.map((s) => {
          const isCompleted = s.number < currentStep;
          const isActive = s.number === currentStep;

          return (
            <Link 
              key={s.number} 
              to={s.path}
              className={`flow-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="flow-step-number">
                {isCompleted ? <Check size={18} strokeWidth={3} /> : s.number}
              </div>
              <span className="flow-step-label">{s.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
