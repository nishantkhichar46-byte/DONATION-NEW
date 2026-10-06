import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  donor: {
    id: 'user-donor-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'donor',
    city: 'Mumbai',
    address: 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053',
    donorLevel: 'Gold Philanthropist',
    donationsCount: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  verifiedOrg: {
    id: 'org-1',
    name: 'Hope Children Foundation',
    email: 'contact@hopechildren.org',
    phone: '+91 98201 44521',
    role: 'organisation',
    orgType: 'Registered Charitable Trust',
    city: 'Mumbai',
    address: '42, Vidya Vihar Road, Near Dadar Central, Mumbai - 400014',
    verified: true,
    verificationStatus: 'verified',
    contactPerson: 'Sunita Deshmukh',
    regNumber: 'REG-MH-2018-847291',
    avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80'
  },
  pendingOrg: {
    id: 'org-6',
    name: 'Green Earth Relief Shelter',
    email: 'help@greenearthshelter.org',
    phone: '+91 98300 66192',
    role: 'organisation',
    orgType: 'Non-Profit Society',
    city: 'Kolkata',
    address: '14/2 Park Circus Avenue, Near Quest Mall, Kolkata - 700017',
    verified: false,
    verificationStatus: 'pending',
    contactPerson: 'Debanjan Chatterjee',
    regNumber: 'REG-WB-2026-904128',
    avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80'
  },
  admin: {
    id: 'admin-1',
    name: 'Platform Administrator',
    email: 'admin@donationconnect.org',
    phone: '+91 99999 00000',
    role: 'admin',
    city: 'National Operations Hub',
    address: 'Central Secretariat, Ministry & NGO Coordination Cell',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_current_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.donor; // default to Demo Donor for instant browsing
    } catch {
      return DEMO_USERS.donor;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dc_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dc_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (email, password, asRole) => {
    // Check demo matches
    if (email === DEMO_USERS.donor.email || asRole === 'donor') {
      setCurrentUser(DEMO_USERS.donor);
      return { success: true, user: DEMO_USERS.donor };
    }
    if (email === DEMO_USERS.verifiedOrg.email || asRole === 'verifiedOrg') {
      setCurrentUser(DEMO_USERS.verifiedOrg);
      return { success: true, user: DEMO_USERS.verifiedOrg };
    }
    if (email === DEMO_USERS.pendingOrg.email || asRole === 'pendingOrg') {
      setCurrentUser(DEMO_USERS.pendingOrg);
      return { success: true, user: DEMO_USERS.pendingOrg };
    }
    if (email === DEMO_USERS.admin.email || asRole === 'admin') {
      setCurrentUser(DEMO_USERS.admin);
      return { success: true, user: DEMO_USERS.admin };
    }

    // Check newly registered users
    const matched = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      return { success: true, user: matched };
    }

    // Default friendly login
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: asRole || 'donor',
      city: 'Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (userData) => {
    const newUser = {
      id: userData.role === 'organisation' ? `org-${Date.now()}` : `user-${Date.now()}`,
      ...userData,
      // Organizations register as pending by default!
      verified: false,
      verificationStatus: userData.role === 'organisation' ? 'pending' : 'verified',
      createdAt: new Date().toISOString(),
      avatar: userData.role === 'organisation' 
        ? 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const quickSwitchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setCurrentUser(DEMO_USERS[roleKey]);
      return DEMO_USERS[roleKey];
    }
    return null;
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      quickSwitchRole,
      updateProfile,
      isDonor: currentUser?.role === 'donor',
      isOrganisation: currentUser?.role === 'organisation',
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
