"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";

interface BookingAlert {
  id: string;
  name: string;
  riskScore: number;
  status: "pending" | "approved" | "rejected";
  room: string;
  checkIn: string;
  checkOut: string;
  nationalId: string;
  alerts: {
    level: "critical" | "high" | "medium";
    message: string;
  }[];
  aiAnalysis?: string;
  expanded?: boolean;
}

export default function FraudDetectionPage() {
  const [bookings, setBookings] = useState<BookingAlert[]>([
    {
      id: "1",
      name: "John Smith",
      riskScore: 85,
      status: "pending",
      room: "A01",
      checkIn: "2025-12-06",
      checkOut: "2025-12-08",
      nationalId: "***-**-7834",
      alerts: [
        {
          level: "critical",
          message: "ID verification failed - Document appears altered",
        },
        {
          level: "high",
          message: "IP address associated with multiple fraudulent bookings",
        },
        {
          level: "medium",
          message: "Payment card from different country than ID",
        },
      ],
      aiAnalysis:
        "The submitted National ID shows signs of digital manipulation in the photo area. Cross-reference with known fraud patterns indicates 78% similarity to previously flagged cases. Recommend manual verification.",
      expanded: true,
    },
    {
      id: "2",
      name: "Maria Garcia",
      riskScore: 62,
      status: "approved",
      room: "A19",
      checkIn: "2025-12-06",
      checkOut: "2025-12-08",
      nationalId: "***-**-7834",
      alerts: [
        {
          level: "medium",
          message:
            "Unusual booking pattern - Multiple bookings in short timeframe",
        },
        {
          level: "medium",
          message: "Email domain flagged in previous incidents",
        },
      ],
      expanded: false,
    },
    {
      id: "3",
      name: "John Smith",
      riskScore: 15,
      status: "approved",
      room: "A11",
      checkIn: "2025-12-06",
      checkOut: "2025-12-08",
      nationalId: "***-**-7834",
      alerts: [],
      expanded: false,
    },
  ]);

  const toggleDetails = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, expanded: !booking.expanded }
          : booking
      )
    );
  };

  const approveBooking = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking
      )
    );
  };

  const rejectBooking = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "rejected" } : booking
      )
    );
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return "bg-[#fef3f2] text-[#b42318]";
    if (score >= 40) return "bg-[#fffaeb] text-[#b54708]";
    return "bg-[#ecfdf3] text-[#027a48]";
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-[#ecfdf3] text-[#027a48]";
    if (status === "rejected") return "bg-[#fef3f2] text-[#b42318]";
    return "bg-[#fffaeb] text-[#b54708]";
  };

  const getAlertBadgeColor = (level: string) => {
    if (level === "critical") return "bg-[#fef3f2] text-[#b42318]";
    if (level === "high") return "bg-[#fffaeb] text-[#b54708]";
    if (level === "medium") return "bg-[#fff6ed] text-[#c4320a]";
    return "bg-neutral-100 text-[#414651]";
  };

  const getCardBorderColor = (riskScore: number) => {
    if (riskScore >= 70) return "border-[#d92d20] bg-[#fffbfa]";
    if (riskScore >= 40) return "border-[#dc6803] bg-[#fffcf5]";
    return "border-[#039855] bg-[#f6fef9]";
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 bg-white min-h-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h2
          className="text-xl font-semibold leading-[30px] text-[#181d27]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Fraud Detection
        </h2>
        <p
          className="text-base leading-6 text-[#535862]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          AI-powered booking risk analysis and anomaly detection
        </p>
      </div>

      {/* Stats Cards */}
      <div className="bg-neutral-100 border border-[#e9eaeb] rounded-3xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[18px] p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <p
                className="text-base leading-6 text-[#535862]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Total Bookings
              </p>
              <p
                className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                246
              </p>
            </div>
            <div className="bg-[#1570ef] p-3 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <p
                className="text-base leading-6 text-[#535862]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                High Risk
              </p>
              <p
                className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                87
              </p>
            </div>
            <div className="bg-[#d92d20] p-3 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <p
                className="text-base leading-6 text-[#535862]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Medium Risk
              </p>
              <p
                className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                23
              </p>
            </div>
            <div className="bg-[#ff9b00] p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <p
                className="text-base leading-6 text-[#535862]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Flagged Today
              </p>
              <p
                className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                7
              </p>
            </div>
            <div className="bg-[#d92d20] p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Alerts */}
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`border overflow-hidden rounded-2xl ${getCardBorderColor(
              booking.riskScore
            )}`}
          >
            <div className="p-3 sm:p-4 lg:p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex flex-col gap-4 flex-1">
                  {/* Header */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                      <p
                        className="text-sm sm:text-base leading-6 text-[#181d27] font-medium"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {booking.name}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-2xl text-xs sm:text-sm font-medium leading-5 ${getRiskScoreColor(
                            booking.riskScore
                          )}`}
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Risk Score: {booking.riskScore}%
                        </span>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-[#717680]" />
                        <span
                          className={`px-2.5 py-0.5 rounded-2xl text-xs sm:text-sm font-medium leading-5 capitalize ${getStatusColor(
                            booking.status
                          )}`}
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.status === "pending"
                            ? "Pending Review"
                            : booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Room number:
                        </p>
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#252b37] font-medium"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.room}
                        </p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Check-in:
                        </p>
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#252b37] font-medium"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.checkIn}
                        </p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Check-out:
                        </p>
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#252b37] font-medium"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.checkOut}
                        </p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          National ID:
                        </p>
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#252b37] font-medium"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.nationalId}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {booking.alerts.length > 0 && booking.expanded && (
                    <div className="flex flex-col gap-2">
                      {booking.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-start gap-2"
                        >
                          <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px] w-fit ${getAlertBadgeColor(
                              alert.level
                            )}`}
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            {alert.level}
                          </span>
                          <p
                            className="text-xs sm:text-sm leading-5 text-[#717680] flex-1"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {alert.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => toggleDetails(booking.id)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#d5d7da] rounded-full shadow-sm hover:bg-gray-50 transition-colors w-full lg:w-auto lg:ml-4 shrink-0"
                >
                  {booking.expanded ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#414651]" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#414651]" />
                  )}
                  <span
                    className="text-xs sm:text-sm font-semibold leading-5 text-[#414651] whitespace-nowrap"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {booking.expanded ? "Hide Details" : "View Details"}
                  </span>
                </button>
              </div>

              {/* AI Analysis */}
              {booking.expanded && booking.aiAnalysis && (
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="bg-[#f0f5fe] rounded-[10px] p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <p
                          className="text-xs sm:text-sm leading-5 text-[#133276] font-medium"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          AI Risk Analysis
                        </p>
                        <p
                          className="text-xs sm:text-sm leading-5 text-blue-600"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {booking.aiAnalysis}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {booking.status === "pending" && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                      <button
                        onClick={() => approveBooking(booking.id)}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#039855] border border-[#039855] text-white rounded-full shadow-sm hover:bg-[#027a48] transition-colors"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span
                          className="text-xs sm:text-sm font-semibold leading-5"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Approve Booking
                        </span>
                      </button>
                      <button
                        onClick={() => rejectBooking(booking.id)}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#d92d20] border border-[#d92d20] text-white rounded-full shadow-sm hover:bg-[#b42318] transition-colors"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span
                          className="text-xs sm:text-sm font-semibold leading-5"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          Reject Booking
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
