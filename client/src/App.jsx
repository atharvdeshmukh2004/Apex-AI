import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./pages/Admin/Admin";
import Dashboard from "./pages/Admin/Dashboard";
import User from "./pages/Admin/Career Guide";
import { AppContent } from "../context/api";
import ProtectedRoute from "./components/Protected";
import NeedLoginMessage from "./components/NeedLoginMessage";
import RoadmapGenerator from "./pages/Admin/AI Tools/Roadmap";
// import ScholarshipsPage from "./pages/Admin/ScholarshipsPage";
// import Profileform from "./pages/Admin/Profileform";
// import LogOutDialog from "./components/LogoutDialog";
import QnAChatBot from "./pages/Admin/AI Tools/AcademicChat";
import SkillGap from "./pages/Admin/AI Tools/Skillgap";

//Scholarship Feature

import ScholarshipsPage from "@/features/scholarships/pages/ScholarshipsPage";
import TrackerPage from "@/features/scholarships/pages/TrackerPage";
import ProfilePage from "@/features/scholarships/pages/ProfilePage";
import AnalyticsPage from "@/features/scholarships/pages/AnalyticsPage";
import AdminPage from "@/features/scholarships/pages/AdminPage";
import { useScholarships, useProfile } from "@/features/scholarships";

import "@/features/scholarships/scholarships.css";
const App = () => {
  const { isLoggedIn, loading } = useContext(AppContent);

  const scholarshipState = useScholarships(); // all scholarship data + actions
  const { profile, setProfile } = useProfile(); // student profile with localStorag

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-cyan-100">
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl px-12 py-10 flex flex-col items-center space-y-8 border border-white/30">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide drop-shadow-sm">
              Checking Authentication
            </h1>
            <p className="text-gray-600 text-sm">
              Please wait while we securely verify your account...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Home />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<User />} />
          <Route path="roadmap_generator" element={<RoadmapGenerator />} />
          <Route
            path="/admin/roadmap_generator"
            element={<RoadmapGenerator />}
          />

          {/* Scholarship routes */}
          <Route
            path="scholarships"
            element={
              <ScholarshipsPage {...scholarshipState} profile={profile} />
            }
          />

          <Route
            path="scholarships/tracker"
            element={<TrackerPage {...scholarshipState} />}
          />
          <Route
            path="scholarships/profile"
            element={<ProfilePage profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="scholarships/analytics"
            element={
              <AnalyticsPage scholarships={scholarshipState.scholarships} />
            }
          />
          <Route
            path="scholarships/admin"
            element={<AdminPage {...scholarshipState} />}
          />
          {/* Scholarship routes End */}
          <Route path="/admin/qna-chatbot" element={<QnAChatBot />} />
          <Route path="/admin/skill-gap" element={<SkillGap />} />
        </Route>
        <Route path="*" element={<NeedLoginMessage />} />
      </Routes>
    </div>
  );
};

export default App;
