import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ userId: null, token: null });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken); // Correct usage
        setAuth({ userId: decodedToken.id, token: storedToken });
        console.log("Auth Loaded from LocalStorage:", decodedToken);
      } catch (error) {
        console.error("Invalid token in localStorage", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const updateAuth = (data) => {
    setAuth(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
