"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  Brush,
  Hotel,
  Wrench,
  Dumbbell,
  ChefHat,
  Car,
  LucideIcon,
} from "lucide-react";

const iconMap: { [key: string]: LucideIcon } = {
  UtensilsCrossed,
  Shirt,
  Sparkles,
  Brush,
  Hotel,
  Wrench,
  Dumbbell,
  ChefHat,
  Car,
};

const services = [
  {
    id: 1,
    name: "Room Service",
    icon: "UtensilsCrossed",
    color: "bg-[#dc6803]",
  },
  {
    id: 2,
    name: "Laundry",
    icon: "Shirt",
    color: "bg-[#039855]",
  },
  {
    id: 3,
    name: "SPA & Amenities",
    icon: "Sparkles",
    color: "bg-[#1570ef]",
  },
  {
    id: 4,
    name: "Housekeeping",
    icon: "Brush",
    color: "bg-[#7e22ce]",
  },
  {
    id: 5,
    name: "Concierge",
    icon: "Hotel",
    color: "bg-[#ea580c]",
  },
  {
    id: 6,
    name: "Maintenance",
    icon: "Wrench",
    color: "bg-[#0891b2]",
  },
  {
    id: 7,
    name: "Gym & Fitness",
    icon: "Dumbbell",
    color: "bg-[#dc2626]",
  },
  {
    id: 8,
    name: "Restaurant",
    icon: "ChefHat",
    color: "bg-[#ca8a04]",
  },
  {
    id: 9,
    name: "Transportation",
    icon: "Car",
    color: "bg-[#16a34a]",
  },
];

function ServiceRequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceId = searchParams.get("service");
  const serviceName = searchParams.get("name");
  const service = services.find((s) => s.id === Number(serviceId));

  const [formData, setFormData] = useState({
    priority: "Normal",
    details: "",
  });

  // Get guest info from localStorage or session (in production, this would come from auth)
  const guestInfo = {
    roomNumber: "A01", // This would come from authenticated user session
    guestName: "Daniel Kyle", // This would come from authenticated user session
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create service request with guest info
    const request = {
      id: Date.now().toString(),
      service: serviceName || service?.name || "",
      roomNumber: guestInfo.roomNumber,
      guestName: guestInfo.guestName,
      priority: formData.priority,
      details: formData.details,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage (in production, this would be an API call)
    const existingRequests = JSON.parse(
      localStorage.getItem("serviceRequests") || "[]"
    );
    existingRequests.push(request);
    localStorage.setItem("serviceRequests", JSON.stringify(existingRequests));

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/dashboard/services");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-4 text-[#535862] hover:text-[#181d27] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span
          className="text-sm sm:text-base"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Back to Services
        </span>
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {service &&
            (() => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  className={`${service.color} p-2 sm:p-3 rounded-lg flex items-center justify-center`}
                >
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              );
            })()}
          <div>
            <h2
              className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Request {serviceName || service?.name}
            </h2>
            <p
              className="text-sm sm:text-base text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Fill in the details below
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-[#ecfdf3] border border-[#039855] rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#039855] rounded-full flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className="font-medium text-[#027a48] text-sm sm:text-base"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Request Submitted Successfully!
            </p>
            <p
              className="text-xs sm:text-sm text-[#039855]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Our team will respond shortly.
            </p>
          </div>
        </div>
      )}

      {/* Request Form */}
      <div className="bg-white border border-[#e9eaeb] rounded-2xl p-4 sm:p-6">
        {/* Guest Info Display */}
        <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-lg p-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className="text-sm text-[#717680]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Guest:
              </span>
              <span
                className="text-sm font-medium text-[#181d27]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {guestInfo.guestName}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#d3e0fb]" />
            <div className="flex items-center gap-2">
              <span
                className="text-sm text-[#717680]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Room:
              </span>
              <span
                className="text-sm font-medium text-[#181d27]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {guestInfo.roomNumber}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-[#414651]"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-[#414651]"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              Request Details
            </label>
            <textarea
              required
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Please provide details about your request..."
              rows={5}
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-5 py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-full shadow-sm hover:bg-[#d3e0fb] transition-colors"
            >
              <span
                className="text-base font-semibold text-[#19429d]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Cancel
              </span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-3 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Submitting...
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Submit Request
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServiceRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceRequestContent />
    </Suspense>
  );
}
