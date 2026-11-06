import axios from "axios";

// Determine the API base URL with safe fallbacks
const isDevelopment = import.meta.env.MODE === "development";
const envLocal = import.meta.env.VITE_API_BASE_URL_LOCAL;
const envDeploy = import.meta.env.VITE_API_BASE_URL_DEPLOY;

// In dev mode, prefer local if defined, otherwise fallback to deploy
const selectedBase = isDevelopment
  ? (envLocal || envDeploy || "http://127.0.0.1:8000")
  : (envDeploy || envLocal || "https://food-ordering-backend-83vq.onrender.com");

// Strip any trailing slash for consistent endpoint joining
export const API_BASE_URL = String(selectedBase).trim().replace(/\/+$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.defaults.baseURL = API_BASE_URL;

// Request Interceptor: Attach JWT Access Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Ensure URL has leading slash if missing to avoid relative resolution quirks
    if (config.url && !config.url.startsWith("http://") && !config.url.startsWith("https://") && !config.url.startsWith("/")) {
      config.url = `/${config.url}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Authentication Expiration and Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Access token expired or invalid
      const hadToken = !!localStorage.getItem("access");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      if (hadToken) {
        window.dispatchEvent(new Event("authChange"));
      }
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Extracts a user-friendly error message from Axios / DRF response
 */
export function extractErrorMessage(error, defaultMsg = "An unexpected error occurred. Please try again.") {
  if (!error) return defaultMsg;
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return "Server request timed out. Please check your connection and try again.";
  }
  if (!error.response) {
    return "Unable to connect to the server. Please check your internet connection or verify the backend is online.";
  }

  const data = error.response.data;
  if (!data) return error.response.statusText || defaultMsg;

  if (typeof data === "string") {
    // If backend returned HTML (e.g. Django debug page or 500 error page)
    if (data.includes("<html") || data.includes("<!DOCTYPE")) {
      return `Backend server error (${error.response.status}). The database or service might be temporarily unavailable.`;
    }
    return data;
  }

  if (data.detail && typeof data.detail === "string") {
    return data.detail;
  }

  if (data.message && typeof data.message === "string") {
    return data.message;
  }

  if (data.error && typeof data.error === "string") {
    return data.error;
  }

  // Handle DRF validation error objects: { username: ["..."], password: ["..."] }
  if (typeof data === "object") {
    const messages = [];
    for (const [field, val] of Object.entries(data)) {
      if (Array.isArray(val)) {
        messages.push(`${field}: ${val.join(", ")}`);
      } else if (typeof val === "string") {
        messages.push(`${field}: ${val}`);
      }
    }
    if (messages.length > 0) {
      return messages.join(" | ");
    }
  }

  return defaultMsg;
}

export default API;
