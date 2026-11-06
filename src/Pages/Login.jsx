import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import API, { extractErrorMessage } from "../axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedUsername = form.username.trim();
    if (!trimmedUsername || !form.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("api/v1/login/", {
        username: trimmedUsername,
        password: form.password,
      });

      if (response.data?.access) {
        localStorage.setItem("access", response.data.access);
        if (response.data.refresh) {
          localStorage.setItem("refresh", response.data.refresh);
        }

        window.dispatchEvent(new Event("authChange"));
        setSuccessMessage("Logged in successfully! Redirecting...");

        const destination = location.state?.from?.pathname || "/";
        setTimeout(() => {
          navigate(destination, { replace: true });
        }, 600);
      } else {
        setErrorMessage("Authentication succeeded, but no access token was returned by the server.");
      }
    } catch (error) {
      const parsedError = extractErrorMessage(error, "Invalid credentials. Please verify your username and password.");
      setErrorMessage(parsedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-white to-green-50 p-6">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <FaUtensils aria-hidden="true" className="text-5xl text-lime-500 mx-auto mb-2 block" />
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your EatyGo account</p>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2.5">
              <FaExclamationTriangle aria-hidden="true" className="text-base flex-shrink-0 mt-0.5" />
              <span className="flex-1 leading-snug">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
              <FaCheckCircle aria-hidden="true" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser aria-hidden="true" />
                </span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition text-sm text-gray-800"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock aria-hidden="true" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition text-sm text-gray-800"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-1 text-sm flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-300 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-none text-base mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-lime-600 font-semibold hover:text-lime-700 transition"
              >
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
