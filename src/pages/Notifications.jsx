import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Info, 
  ShieldAlert, 
  Trash2, 
  ArrowRight, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';

export default function Notifications() {
  const { notifications, markNotificationRead, clearAllNotifications, showToast } = useDonation();
  const { currentUser } = useAuth();

  const [filterType, setFilterType] = useState('all'); // all, unread, pickups

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'unread' && n.read) return false;
    if (filterType === 'pickups' && !n.title.toLowerCase().includes('pickup') && !n.title.toLowerCase().includes('scheduled')) return false;
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10B981" />;
      case 'warning':
        return <ShieldAlert size={20} color="#F59E0B" />;
      case 'certificate':
        return <CheckCircle2 size={20} color="#7C3AED" />;
      case 'info':
      default:
        return <Info size={20} color="#3B82F6" />;
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', background: 'var(--bg-main)', minHeight: 'calc(100vh - 150px)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag">Activity Feed</span>
            <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>Notification Center</h1>
            <p className="section-subtitle">
              Live updates regarding your pickups, NGO approvals, and platform status.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              type="button" 
              onClick={clearAllNotifications}
              className="btn btn-secondary btn-sm"
              style={{ color: '#EF4444' }}
            >
              <Trash2 size={15} />
              Clear All
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Notifications ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('unread')}
              className={`btn btn-sm ${filterType === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('pickups')}
              className={`btn btn-sm ${filterType === 'pickups' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Pickups
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time synchronization active
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredNotifs.map((notif) => (
              <div 
                key={notif.id}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  background: notif.read ? '#ffffff' : '#F0FDFA',
                  borderColor: notif.read ? 'var(--border-subtle)' : 'var(--primary-light)',
                  borderLeft: notif.read ? '1px solid var(--border-subtle)' : '4px solid var(--primary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                    {getNotifIcon(notif.type)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)' }} />
                      )}
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.2rem', lineHeight: 1.5 }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
                      {notif.timestamp}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {!notif.read && (
                    <button 
                      type="button" 
                      onClick={() => markNotificationRead(notif.id)}
                      className="btn btn-secondary btn-sm"
                      title="Mark as read"
                      style={{ padding: '0.35rem 0.65rem' }}
                    >
                      <Check size={14} />
                    </button>
                  )}
                  {notif.link && (
                    <Link to={notif.link} className="btn btn-primary btn-sm" style={{ padding: '0.35rem 0.75rem' }}>
                      View
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
            <Bell size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Notifications Right Now</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              You will receive real-time notifications when NGOs confirm donations or when your volunteer is en route.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
