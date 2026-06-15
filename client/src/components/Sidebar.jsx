import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  WandSparkles,
  LogOut,
  GraduationCap,
  UserCheck,
  ClipboardList,
  User,
  BarChart3,
  Settings,
} from "lucide-react";
import { AppContent } from "../../context/api";
import logo from "../assets/logo.png";
import LogOutDialog from "./LogoutDialog";
import { createPortal } from "react-dom";

export default function Sidebar() {
  const location = useLocation();

  const { backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData } =
    useContext(AppContent);

  const [openDialog, setOpenDialog] = useState(false);

  const [scholarshipOpen, setScholarshipOpen] = useState(true); // scholarship dropdown

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-md md:hidden">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-xl font-bold">Apex AI</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-200 text-black flex flex-col p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
        md:translate-x-0 md:static md:h-screen`}
      >
        <div className="flex items-center mb-6">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className="text-2xl font-bold ml-2">Apex AI</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {/* AI Tools */}
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
              location.pathname === "/admin/dashboard" ? "bg-gray-50" : ""
            }`}
          >
            <WandSparkles />
            <span>AI Tools</span>
          </Link>

          {/* Scholarship Menu */}
          <div>
            <button
              onClick={() => setScholarshipOpen(!scholarshipOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <GraduationCap />
                <span>Scholarships</span>
              </div>

              <span>{scholarshipOpen ? "▼" : "▶"}</span>
            </button>

            {scholarshipOpen && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <Link
                  to="/admin/scholarships"
                  className={`px-3 py-2 rounded hover:bg-gray-50 ${
                    location.pathname === "/admin/scholarships"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  All Scholarships
                </Link>

                <Link
                  to="/admin/scholarships/tracker"
                  className={`px-3 py-2 rounded hover:bg-gray-50 ${
                    location.pathname === "/admin/scholarships/tracker"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  📋 My Tracker
                </Link>

                <Link
                  to="/admin/scholarships/profile"
                  className={`px-3 py-2 rounded hover:bg-gray-50 ${
                    location.pathname === "/admin/scholarships/profile"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/admin/scholarships/analytics"
                  className={`px-3 py-2 rounded hover:bg-gray-50 ${
                    location.pathname === "/admin/scholarships/analytics"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  📊 Analytics
                </Link>

                <Link
                  to="/admin/scholarships/admin"
                  className={`px-3 py-2 rounded hover:bg-gray-50 ${
                    location.pathname === "/admin/scholarships/admin"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  ⚙️ Admin
                </Link>
              </div>
            )}
          </div>

          {/* Career Guide */}
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition ${
              location.pathname === "/admin/users" ? "bg-gray-50" : ""
            }`}
          >
            <UserCheck />
            <span>Career Guide</span>
          </Link>

          {/* Logout */}
          <Link
            onClick={(e) => {
              e.preventDefault();
              setOpenDialog(true);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-50 transition cursor-pointer"
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
