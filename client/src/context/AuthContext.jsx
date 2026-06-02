import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response.data;
  };

  const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const newData = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(newData));
    setUser(newData);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
