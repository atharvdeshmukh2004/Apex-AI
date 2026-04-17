import React from "react";
import { Link } from "react-router-dom";

function NeedLoginMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 text-center max-w-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
          alt="Not Found or Not Logged In"
          className="w-24 mx-auto mb-4 animate-bounce"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found or Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like the page you’re trying to visit doesn’t exist — or
          you’re not signed in yet. Please log in to access your dashboard and
          features.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NeedLoginMessage;
