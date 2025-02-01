import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState({
    adminId: localStorage.getItem('adminId') || null,
    email: localStorage.getItem('adminEmail') || null,
  });

  const updateAdminAuth = (adminData) => {
    localStorage.setItem('adminId', adminData.adminId);
    localStorage.setItem('adminEmail', adminData.email);
    setAdminAuth(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    setAdminAuth({ adminId: null, email: null });
  };

  useEffect(() => {
    // If admin is logged in, initialize context with localStorage data
    if (adminAuth.adminId) {
      setAdminAuth({
        adminId: localStorage.getItem('adminId'),
        email: localStorage.getItem('adminEmail'),
      });
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminAuth, updateAdminAuth, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
