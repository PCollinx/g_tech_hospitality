"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { storage } from "@/lib/storage";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      // Direct API call for immediate token access
      const response = await axiosInstance.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens in localStorage
      storage.setAccessToken(accessToken);
      if (refreshToken) {
        storage.setRefreshToken(refreshToken);
      }
      if (user) {
        storage.setUser(user);
      }

      // Also sign in with NextAuth for session management
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      toast.success("Login successful!");

      const userRole = user?.role || "guest";
      const isAdmin = userRole === "admin" || userRole === "super-admin";
      const redirectPath = isAdmin ? "/admin" : "/dashboard";
      router.push(redirectPath);
    } catch (err: any) {
      // Show toast for API errors (axios interceptor doesn't show for auth endpoints)
      const errorMessage =
        err.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Google sign in functionality to be implemented
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32">
        <div className="bg-white w-full max-w-[500px] flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <img src="/logo.svg" alt="luxehaven" className="h-12 w-auto" />
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <h2 className="font-semibold text-[24px] sm:text-[30px] leading-8 sm:leading-[38px] text-[#181d27]">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                Sign in to access your dashboard, bookings, and real-time
                updates.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-[#414651]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-[#414651]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 bg-white border border-[#d5d7da] rounded text-blue-600 focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-[#414651]">
                  Remember for 30 days
                </span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-[#19429d] hover:underline"
              >
                Forgot password
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-[#e9eaeb]" />
              <span className="text-sm text-[#717680]">OR</span>
              <div className="flex-1 h-px bg-[#e9eaeb]" />
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-[#535862]">Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="text-[#19429d] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
