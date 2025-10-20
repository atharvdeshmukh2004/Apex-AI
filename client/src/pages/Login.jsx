import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/api.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.png"

function Login() {
  const { userData,backendURL, setIsLoggedIn,getUserData} = useContext(AppContent);
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendURL + "/api/auth/register", { name, email, password })
        
        if (data.success) {
          setIsLoggedIn(true);
          Navigate("/admin");
        } else {
          toast.error(data.message);
        } 
      } else {
        const { data } = await axios.post(backendURL + "/api/auth/login", { email, password })
        if (data.success) {
          setIsLoggedIn(true);
          Navigate("/admin")
          
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className=" bg-gradient-to-t from-blue-300 via-purple-300 p-2">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="w-12 inline-block"
        />
        <h1 className="inline-block text-2xl font-bold ml-1">Apex Ai</h1>
      </Link>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {state === "Sign Up"
              ? "Sign up to get started with your career journey!"
              : "Sign in to continue your career guidance experience."}
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-300  text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {state === "Sign Up" ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setState("login")}
                  className="text-green-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setState("Sign Up")}
                  className="text-green-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
