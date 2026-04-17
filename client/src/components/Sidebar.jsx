import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  WandSparkles,
  History,
  LogOut,
  GraduationCap,
  Menu,
  UserCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { AppContent } from "../../context/api";
import axios from "axios";
import logo from "../assets/logo.png";
import LogOutDialog from "./LogoutDialog";
import { createPortal } from "react-dom";

export default function Sidebar() {
  const location = useLocation();
  const { backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData } =
  useContext(AppContent);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
  // const toggleSidebar = () => setIsOpen(!isOpen);

  // const Logout = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;

  //     const { data } = await axios.post(`${backendURL}/api/auth/logout`);

  //     if (data.success) {
  //       setIsLoggedIn(false);
  //       setUserData(null);

  //       toast.success("Logged out successfully!");
  //       navigate("/");
  //     } else {
  //       toast.error("Logout failed. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-md md:hidden">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-xl font-bold">Apex AI</h1>
        </div>
      </div>

      <div
        // className={`fixed top-0 left-0 h-full w-64 bg-gray-200 text-black flex flex-col p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        // md:translate-x-0 md:static md:h-screen`}
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-200 text-black flex flex-col p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
  md:translate-x-0 md:static md:h-screen`}
      >
        <div className="flex items-center mb-6">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className="text-2xl font-bold ml-2">Apex AI</h1>
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
            to="/admin/scholarships"
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
              location.pathname === "/admin/scholarships" ? "bg-gray-50" : ""
            }`}
          >
            <GraduationCap />
            <span>Scholarship</span>
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
              location.pathname === "/admin/users" ? "bg-gray-50" : ""
            }`}
          >
            <UserCheck />
            {/* <History /> */}
            <span>Career Guide</span>
          </Link>

          {/* <LogoutButton /> */}
          {/* <Link
            // onClick={Logout}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition`}
          >
            <LogOut />  

            <span>Logout</span>
          </Link>  */}

          <Link
            onClick={(e) => {
              e.preventDefault();
              setOpenDialog(true);
            }}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
              location.pathname === "/admin/logout" ? "bg-gray-50" : ""
            }`}
          >
            <LogOut />
            <span>Logout</span>
          </Link>

          {openDialog &&
            createPortal(
              <LogOutDialog
                onClose={() => setOpenDialog(false)}
                onConfirm={() => {
                  setOpenDialog(false);
                  localStorage.clear();
                  window.location.href = "/";
                }}
              />,
              document.body,
            )}
        </nav>
      </div>
    </>
  );
}
