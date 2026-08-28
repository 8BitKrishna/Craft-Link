import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('karigar_user');
    return saved ? JSON.parse(saved) : {
      id: 'artisan-ramesh-01',
      name: 'Ramesh Kumawat',
      email: 'artisan@karigarsetu.in',
      role: 'artisan',
      craft_type: 'Blue Pottery',
      state: 'Rajasthan',
      region: 'Jaipur'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('karigar_token') || 'demo-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('karigar_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('karigar_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('karigar_token', res.data.token);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authApi.register(userData);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('karigar_token', res.data.token);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    setLoading(true);
    try {
      const res = await authApi.demoLogin(role);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('karigar_token', res.data.token);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('karigar_user');
    localStorage.removeItem('karigar_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, demoLogin, logout, isArtisan: user?.role === 'artisan', isBuyer: user?.role === 'buyer' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
