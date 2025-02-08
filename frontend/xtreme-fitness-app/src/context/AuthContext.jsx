import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, adminId: null, user: null });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdminId = localStorage.getItem("adminId");
    const storedUser = localStorage.getItem("user");

    setAuth({
      token: storedToken || null,
      adminId: storedAdminId || null,
      user: storedUser ? JSON.parse(storedUser) : null, // Parse user object if available
    });

    console.log("Auth Loaded from LocalStorage:", { storedToken, storedAdminId, storedUser });
  }, []);

  const updateAuth = (data) => {
    setAuth((prevAuth) => ({ ...prevAuth, ...data })); // Merge new data
  
    if (data.token) {
      localStorage.setItem("token", data.token);
    } else {
      localStorage.removeItem("token");
    }
  
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user)); // Store full user object
    } else {
      localStorage.removeItem("user");
    }
  };
  

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
