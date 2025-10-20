import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${backendURL}/api/user`);
        if (data.success) {
          setIsLoggedIn(true);
          setUserData(data.data);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    loading,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
