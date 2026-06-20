// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    if (role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const login = (email, password, role) => {
    sessionStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};