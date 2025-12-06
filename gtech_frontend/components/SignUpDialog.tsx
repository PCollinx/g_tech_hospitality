"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VerificationDialog from "@/components/VerificationDialog";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export default function SignUpDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
}: SignUpDialogProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open && isMobile) {
      router.push("/signup");
      onOpenChange(false);
    }
  }, [open, isMobile, router, onOpenChange]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nin: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign up with:", formData);
    // Close sign up dialog and show verification
    onOpenChange(false);
    setTimeout(() => setShowVerification(true), 300);
  };



  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-[450px] md:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="bg-white flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="luxehaven"
                className="h-12 w-auto"
              />
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <h2 className="font-semibold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[38px] text-[#181d27]">
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
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
            >
              Get started
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-[#535862]">Already have an account?</span>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSwitchToLogin?.();
              }}
              className="text-[#19429d] font-semibold hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Verification Dialog */}
    <VerificationDialog
      open={showVerification}
      onOpenChange={setShowVerification}
      onContinue={() => {
        console.log("Continue to check-in");
        // Navigate to dashboard or booking page
      }}
      userData={{
        name: `${formData.firstName} ${formData.lastName}`,
        idNumber: formData.nin,
        idType: "NIN",
        expires: "15/03/2030",
      }}
    />
    </>
  );
}
