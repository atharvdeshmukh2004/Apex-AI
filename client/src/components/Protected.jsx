import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../context/api";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { backendURL, setIsLoggedIn, setUserData } = useContext(AppContent);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(backendURL + "/api/auth/isAuth");
        if (data.success) {
          setUserData(data.data);
          setIsLoggedIn(true);
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [backendURL, setIsLoggedIn, setUserData]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!authorized) {
    toast.warn("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
