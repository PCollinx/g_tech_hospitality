import axios from "axios";
import { storage } from "./storage";

// Helper function to get the API URL consistently
const getApiUrl = () => {
  // First check environment variable (highest priority)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // If running in browser, detect based on current hostname
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Production domain - use ktech-api subdomain
    if (
      hostname === "ktech.sydeestack.com" ||
      hostname.includes("sydeestack.com")
    ) {
      return `${protocol}//ktech-api.sydeestack.com/api/v1`;
    }
  }

  // Server-side or development fallback
  if (process.env.NODE_ENV === "production") {
    return "https://ktech-api.sydeestack.com/api/v1";
  }

  // Default to localhost for local development
  return "http://localhost:3000/api/v1";
};

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
});

axiosInstance.defaults.withCredentials = false;

// Helper function to show toast notification
const showErrorToast = (message: string) => {
  if (typeof window !== "undefined") {
    const { toast } = require("react-toastify");
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for token refresh and error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't intercept 401 errors from login, signup, or password reset endpoints
    const isAuthEndpoint =
      originalRequest.url?.includes("/login") ||
      originalRequest.url?.includes("/signup") ||
      originalRequest.url?.includes("/forgot-password") ||
      originalRequest.url?.includes("/reset-password");

    // Handle 401 Unauthorized (but not for auth endpoints)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Attempt to refresh token - use the same baseURL
        const baseURL = getApiUrl();
        const response = await axios.post(
          `${baseURL}/users/refresh-token`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Backend returns { status: "success", token: "..." }
        const { token: accessToken } = response.data;

        // Update tokens in storage
        if (accessToken) {
          storage.setAccessToken(accessToken);
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("No access token in refresh response");
        }
      } catch (refreshError) {
        // Refresh failed, clear auth and redirect to login
        storage.clearAuth();
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // Show error toast notification for all errors (except auth endpoints which handle their own)
    // Auth endpoints will show toast manually in their catch blocks
    if (!isAuthEndpoint) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          `Request failed with status ${error.response.status}`;
        showErrorToast(errorMessage);
      } else if (error.request) {
        showErrorToast("Network error. Please check your connection.");
      } else {
        showErrorToast(error.message || "An unexpected error occurred");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
