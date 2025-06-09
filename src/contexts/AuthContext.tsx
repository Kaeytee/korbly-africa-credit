
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('korbly_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('korbly_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo credentials mapping
    const demoCredentials = [
      { 
        email: 'demo.pension@korbly.com', 
        password: 'PensionDemo123!',
        user: {
          id: '1',
          email: 'demo.pension@korbly.com',
          name: 'Sarah Johnson',
          role: 'Portfolio Manager',
          organization: 'State Pension Fund'
        }
      },
      { 
        email: 'demo.insurance@korbly.com', 
        password: 'InsureDemo123!',
        user: {
          id: '2',
          email: 'demo.insurance@korbly.com',
          name: 'Michael Chen',
          role: 'Investment Director',
          organization: 'Global Insurance Group'
        }
      },
      { 
        email: 'demo.hnwi@korbly.com', 
        password: 'HnwiDemo123!',
        user: {
          id: '3',
          email: 'demo.hnwi@korbly.com',
          name: 'Alexandra Rodriguez',
          role: 'Family Office Manager',
          organization: 'Private Wealth Solutions'
        }
      },
      { 
        email: 'demo.dfi@korbly.com', 
        password: 'DfiDemo123!',
        user: {
          id: '4',
          email: 'demo.dfi@korbly.com',
          name: 'David Kim',
          role: 'Chief Investment Officer',
          organization: 'Development Finance Corp'
        }
      },
      { 
        email: 'demo.asset@korbly.com', 
        password: 'AssetDemo123!',
        user: {
          id: '5',
          email: 'demo.asset@korbly.com',
          name: 'Emma Thompson',
          role: 'Senior Analyst',
          organization: 'Alternative Asset Management'
        }
      },
      { 
        email: 'admin@korbly.com', 
        password: 'AdminKorbly2025!',
        user: {
          id: '6',
          email: 'admin@korbly.com',
          name: 'James Wilson',
          role: 'Platform Administrator',
          organization: 'Korbly Technologies'
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('korbly_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('korbly_user', JSON.stringify(updatedUser));
    }
  };

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
