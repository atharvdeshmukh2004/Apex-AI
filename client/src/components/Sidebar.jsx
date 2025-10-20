import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WandSparkles, History, LogOut} from "lucide-react";
import { toast } from "react-toastify";
import { AppContent } from "../../context/api";
import axios from "axios";
import logo from "../assets/logo.png"
export default function Sidebar() {
  const location = useLocation();
  const { backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData } =
    useContext(AppContent);
  const navigate = useNavigate();

    const Logout = async () => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.post(`${backendURL}/api/auth/logout`);

        if (data.success) {
          // Clear context
          setIsLoggedIn(false);
          setUserData(null);

          toast.success("Logged out successfully!");
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
    <div className="w-64 h-screen bg-gray-200 text-black flex flex-col p-4">
      <div className="text-2xl font-bold mb-6">
        <img
          src={logo}
          alt="logo"
          className="w-14 inline-block"
        />
        <h1 className="inline-block text-2xl font-bold ml-1">Apex Ai</h1>
      </div>
      <nav className="flex flex-col gap-2">

        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
            location.pathname === "/admin/dashboard" ? "bg-gray-50" : ""
          }`}
        >
          <WandSparkles />
          <span>AI Tools</span>
        </Link>
        <Link
          to="/admin/users"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
            location.pathname === "/admin/users" ? "bg-gray-50" : ""
          }`}
        >
          <History />
          <span>My History</span>
        </Link>

        <Link
          onClick={Logout}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
            location.pathname === "/admin/logout" ? "bg-gray-50" : ""
          }`}
        >
          <LogOut />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
}
