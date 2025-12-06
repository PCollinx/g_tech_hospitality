"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerificationDialog from "@/components/VerificationDialog";
import Link from "next/link";
import { storage } from "@/lib/storage";
import axiosInstance from "@/lib/axios";

export default function SignUpPage() {
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nin: "",
    password: "",
    passwordConfirm: "",
    address: "",
  });

  const validateForm = (): string | null => {
    if (!formData.firstName || !formData.lastName) {
      return "First name and last name are required";
    }
    if (!formData.email) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address";
    }
    if (!formData.nin) {
      return "NIN is required";
    }
    if (!formData.password) {
      return "Password is required";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.passwordConfirm) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // Signup API call
      const response = await axiosInstance.post("/users/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        NIN: formData.nin,
        address: formData.address || undefined,
      });

      // Backend returns: { status, accessToken, refreshToken, data: { data: user } }
      const { accessToken, refreshToken, data: responseData } = response.data;
      const user = responseData?.data || responseData || response.data.user;

      // Store tokens in localStorage
      storage.setAccessToken(accessToken);
      if (refreshToken) {
        storage.setRefreshToken(refreshToken);
      }
      if (user) {
        storage.setUser(user);
      }

      // Sign in with NextAuth for session management
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      toast.success("Account created successfully!");

      // Prepare verification data
      const maskedNIN =
        formData.nin.length > 4
          ? "*".repeat(formData.nin.length - 4) + formData.nin.slice(-4)
          : "*".repeat(formData.nin.length);

      setVerificationData({
        name: `${user.firstName} ${user.lastName}`,
        idNumber: maskedNIN,
        idType: "NIN",
        expires: "15/03/2030",
        riskScore: user.verificationFlags?.riskScore || 0,
        ninVerified: user.verificationFlags?.ninVerified || false,
      });

      // Show verification dialog
      setShowVerification(true);
    } catch (err: any) {
      // Show toast for API errors (axios interceptor doesn't show for auth endpoints)
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Google sign up functionality to be implemented
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
                Create an account
              </h2>
              <p className="text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                Join our platform and enjoy fast bookings, secure check-ins, and
                a smarter hospitality experience.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstName"
                  className="font-medium text-sm text-[#414651]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter your first name"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastName"
                  className="font-medium text-sm text-[#414651]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter your last name"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

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

              {/* NIN */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="nin"
                  className="font-medium text-sm text-[#414651]"
                >
                  NIN
                </label>
                <input
                  type="text"
                  id="nin"
                  value={formData.nin}
                  onChange={(e) =>
                    setFormData({ ...formData, nin: e.target.value })
                  }
                  placeholder="Enter your NIN number"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <p className="text-sm text-[#535862]">
                  Your ID will be verified using AI. All data is encrypted and
                  processed securely.
                </p>
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
                <p className="text-xs text-[#717680]">
                  Must be at least 8 characters long
                </p>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="passwordConfirm"
                  className="font-medium text-sm text-[#414651]"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Address (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address"
                  className="font-medium text-sm text-[#414651]"
                >
                  Address <span className="text-[#717680]">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter your address"
                  className="w-full bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Get started"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-[#e9eaeb]" />
              <span className="text-sm text-[#717680]">OR</span>
              <div className="flex-1 h-px bg-[#e9eaeb]" />
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignUp}
              className="w-full bg-white border border-[#d5d7da] text-[#414651] hover:bg-gray-50 font-semibold text-sm sm:text-base px-4 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] flex items-center justify-center gap-2 sm:gap-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-[#535862]">Already have an account?</span>
            <Link
              href="/login"
              className="text-[#19429d] font-semibold hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Verification Dialog */}
      <VerificationDialog
        open={showVerification}
        onOpenChange={setShowVerification}
        onContinue={() => {
          const user = storage.getUser();
          const userRole = user?.role || "guest";
          const isAdmin = userRole === "admin" || userRole === "super-admin";
          const redirectPath = isAdmin ? "/admin" : "/dashboard";
          router.push(redirectPath);
        }}
        userData={
          verificationData || {
            name: `${formData.firstName} ${formData.lastName}`,
            idNumber:
              formData.nin.length > 4
                ? "*".repeat(formData.nin.length - 4) + formData.nin.slice(-4)
                : "*".repeat(formData.nin.length),
            idType: "NIN",
            expires: "15/03/2030",
          }
        }
      />
    </>
  );
}
