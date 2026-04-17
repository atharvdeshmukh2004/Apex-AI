import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const backendURL = "http://localhost:3000"; 

const LogOutDialog = ({ onClose, onConfirm, setIsLoggedIn, setUserData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendURL}/api/auth/logout`);

      if (data.success) {
        if (setIsLoggedIn) setIsLoggedIn(false);
        if (setUserData) setUserData(null);

        toast.success("Logged out successfully!");
        onConfirm();
        navigate("/"); 
      } else {
        toast.error("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Are you sure you want to logout?
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutDialog;
