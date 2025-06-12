import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isSessionValid, getSessionData, terminateSession, initializeSessionMonitoring, createSession } from '@/lib/session';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organization: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem('korbly_user');
    window.location.replace('/login'); // Always redirect to login after logout
  }, []);

  // Effect 1: Restore session and set up activity tracking (run once)
  React.useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('korbly_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // In production, we would validate the session token here
        console.log(`[AUTH] Restored session for ${parsedUser.email}`);
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem('korbly_user');
        console.log('[AUTH] Removed invalid session data');
      }
    }
    setIsLoading(false);

    // Activity listeners
    let inactivityTimer: number;
    const resetInactivityTimer = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (user) {
          console.log('[SECURITY] Session timeout due to inactivity');
          logout();
          window.location.href = '/login?timeout=true';
        }
      }, 30 * 60 * 1000); // 30 minutes
    };
    const trackActivity = () => {
      localStorage.setItem('last_activity', new Date().toISOString());
      resetInactivityTimer();
    };
    window.addEventListener('click', trackActivity);
    window.addEventListener('keypress', trackActivity);
    window.addEventListener('scroll', trackActivity);
    window.addEventListener('mousemove', trackActivity);
    resetInactivityTimer();
    // Clean up on unmount
    return () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      window.removeEventListener('click', trackActivity);
      window.removeEventListener('keypress', trackActivity);
      window.removeEventListener('scroll', trackActivity);
      window.removeEventListener('mousemove', trackActivity);
    };
    // eslint-disable-next-line
  }, []);

  // Effect 2: Reset inactivity timer when user changes
  React.useEffect(() => {
    // Optionally, you can reset the timer here if you want to log out on user change
    // (or just leave this empty if not needed)
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Security: Log login attempt without password
    console.log(`[AUTH] Login attempt for: ${email} at ${new Date().toISOString()}`);
    
    // Demo credentials mapping - using passwords from README.md
    const demoCredentials = [
      { 
        email: 'demo.pension@korbly.com', 
        password: 'PensionDemo123!', // Password from README
        user: {
          id: '1',
          email: 'demo.pension@korbly.com',
          name: 'Sarah Johnson',
          role: 'pension_fund', // Using USER_TYPES constant values
          organization: 'Ghana National Pension Fund'
        }
      },
      { 
        email: 'demo.insurance@korbly.com', 
        password: 'InsureDemo123!', // Password from README
        user: {
          id: '2',
          email: 'demo.insurance@korbly.com',
          name: 'Michael Chen',
          role: 'Chief Investment Officer',
          organization: 'African Re Insurance'
        }
      },
      { 
        email: 'demo.hnwi@korbly.com', 
        password: 'HnwiDemo123!', // Password from README
        user: {
          id: '3',
          email: 'demo.hnwi@korbly.com',
          name: 'Alexandra Rodriguez',
          role: 'Investment Advisor',
          organization: 'Private Family Office'
        }
      },
      { 
        email: 'demo.dfi@korbly.com', 
        password: 'DfiDemo123!', // Password from README
        user: {
          id: '4',
          email: 'demo.dfi@korbly.com',
          name: 'David Kim',
          role: 'Private Credit Analyst',
          organization: 'African Development Bank'
        }
      },
      { 
        email: 'demo.asset@korbly.com', 
        password: 'AssetDemo123!', // Password from README
        user: {
          id: '5',
          email: 'demo.asset@korbly.com',
          name: 'Emma Thompson',
          role: 'Fund Manager',
          organization: 'Actis Capital'
        }
      },
      { 
        email: 'admin@korbly.com', 
        password: 'AdminKorbly2025!', // Password from README
        user: {
          id: '6',
          email: 'admin@korbly.com',
          name: 'James Wilson',
          role: 'Platform Administrator',
          organization: 'Korbly Technologies'
        }
      },
      // Adding support for demo123 password for demo accounts as mentioned by the user
      { 
        email: 'demo.pension@korbly.com', 
        password: 'demo123',
        user: {
          id: '1',
          email: 'demo.pension@korbly.com',
          name: 'Sarah Johnson',
          role: 'pension_fund',
          organization: 'Ghana National Pension Fund'
        }
      },
      { 
        email: 'demo.insurance@korbly.com', 
        password: 'demo123',
        user: {
          id: '2',
          email: 'demo.insurance@korbly.com',
          name: 'Michael Chen',
          role: 'insurance',
          organization: 'African Re Insurance'
        }
      },
      { 
        email: 'demo.asset@korbly.com', 
        password: 'demo123',
        user: {
          id: '5',
          email: 'demo.asset@korbly.com',
          name: 'Emma Thompson',
          role: 'asset_manager',
          organization: 'Actis Capital'
        }
      }
    ];

    const validCredential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        if (validCredential) {
          setUser(validCredential.user);
          localStorage.setItem('korbly_user', JSON.stringify(validCredential.user));
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1500);
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('korbly_user', JSON.stringify(updatedUser));
    }
  };

  // Effect: Navigate to dashboard after successful login
  React.useEffect(() => {
    if (user && window.location.pathname === '/login') {
      const dashboardRoute =
        SECURE_ROUTES?.DASHBOARD?.[user.role] || '/dashboard';
      window.location.replace(dashboardRoute);
    }
  }, [user]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
