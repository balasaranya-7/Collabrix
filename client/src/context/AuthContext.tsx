import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'brand' | 'creator' | 'admin';
  companyName?: string;
  avatar?: string;
  bio?: string;
  creatorProfileId?: string;
  creatorProfile?: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: any) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('collabrix_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('collabrix_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('collabrix_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('collabrix_user', JSON.stringify(res.data.user));
          }
        } catch (error) {
          console.error('Session expired or invalid token');
          localStorage.removeItem('collabrix_token');
          localStorage.removeItem('collabrix_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const res = await authAPI.login(credentials);
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('collabrix_token', res.data.token);
      localStorage.setItem('collabrix_user', JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const register = async (data: any) => {
    const res = await authAPI.register(data);
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('collabrix_token', res.data.token);
      localStorage.setItem('collabrix_user', JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('collabrix_token');
    localStorage.removeItem('collabrix_user');
    setUser(null);
    setToken(null);
    window.location.href = '/';
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('collabrix_user', JSON.stringify(res.data.user));
      }
    } catch (e) {
      console.error('Error refreshing user', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
