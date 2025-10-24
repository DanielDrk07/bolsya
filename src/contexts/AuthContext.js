import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, createUser } from '../database/queries';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      const userData = { id: result.user.id, email: result.user.email };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    return result;
  };

  const register = async (email, password) => {
    const result = await createUser(email, password);
    if (result.success) {
      const userData = { id: result.userId, email };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    return result;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};