"use client";

import { AlertCircle, Info, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const insightCards = [
    {
      type: "warning",
      title: "Peak Booking Pattern",
      badge: "high",
      description:
        "Bookings increase by 34% on weekends. Consider dynamic pricing strategy.",
      recommendation: "Implement weekend premium pricing (+15-20%)",
    },
    {
      type: "warning",
      title: "Peak Booking Pattern",
      badge: "high",
      description:
        "Bookings increase by 34% on weekends. Consider dynamic pricing strategy.",
      recommendation: "Implement weekend premium pricing (+15-20%)",
    },
    {
      type: "warning",
      title: "Service Request Patterns",
      badge: "high",
      description:
        "Room service requests peak between 7-9 AM and 6-8 PM. Staff allocation should reflect this.",
      recommendation: "Increase room service staff by 40% during peak hours",
    },
    {
      type: "error",
      title: "Churn Risk Alert",
      badge: "high",
      description:
        "100 guests (10%) show high churn risk based on reduced engagement and complaint patterns.",
      recommendation:
        "Launch personalized retention campaign with exclusive offers",
    },
  ];

  const repeatGuestData = [
    { label: "First Time", value: "420 guests", progress: 70 },
    { label: "Return (2-3)", value: "280 guests", progress: 40 },
    { label: "Frequent (4+)", value: "180 guests", progress: 30 },
    { label: "VIP (10+)", value: "120 guests", progress: 20 },
  ];

  const servicePatternData = [
    {
      label: "Peak Hours (7-9 AM)",
      value: "34%",
      progress: 70,
      color: "#dc6803",
    },
    {
      label: "Peak Hours (6-8 PM)",
      value: "42%",
      progress: 30,
      color: "#dc6803",
    },
    { label: "Regular Hours", value: "24%", progress: 20, color: "#2563eb" },
  ];

  const dataSources = [
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
    {
      title: "Booking Source",
      description: "Corporate accounts vs. personal bookings",
    },
  ];

  return (
    <div className="p-3 sm:p-5 lg:p-6 bg-white min-h-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h2
          className="text-lg sm:text-xl font-semibold leading-[30px] text-[#181d27]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Analytics & Insights
        </h2>
        <p
          className="text-sm sm:text-base leading-6 text-[#535862]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          AI-powered analytics for guest behavior and business intelligence
        </p>
      </div>

      {/* AI-Powered Insights Section */}
      <div className="bg-neutral-50 border border-[#e9eaeb] rounded-[24px] p-4 mb-6">
        <p
          className="text-base font-medium leading-6 text-[#181d27] mb-6"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          AI-Powered Insights
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insightCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-[#d5d7da] rounded-[24px] p-6 flex gap-2"
            >
              <div
                className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                  card.type === "error" ? "bg-[#fef3f2]" : "bg-[#fffaeb]"
                }`}
              >
                {card.type === "error" ? (
                  <AlertCircle className="w-5 h-5 text-[#d92d20]" />
                ) : index === 2 ? (
                  <Info className="w-5 h-5 text-[#dc6803]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#dc6803]" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-medium leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {card.title}
                    </p>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-2xl text-sm font-medium ${
                        card.type === "error"
                          ? "bg-[#fef3f2] text-[#b42318]"
                          : "bg-[#fffaeb] text-[#b54708]"
                      }`}
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-[18px] text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {card.description}
                  </p>
                </div>
                <div
                  className="bg-[#f0f5fe] p-3 rounded-[10px] flex flex-col gap-0.5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  <p className="text-xs leading-[18px] text-[#717680]">
                    Recommendation:
                  </p>
                  <p className="text-xs leading-[18px] text-[#414651]">
                    {card.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Occupancy Rate Trend */}
        <div className="border border-[#d3e0fb] rounded-2xl p-6 h-[441px]">
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-base font-medium leading-6 text-[#181d27]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Occupancy Rate Trend
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#039855]" />
              <p
                className="text-base font-normal text-[#039855]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                +8.5%
              </p>
            </div>
          </div>
          <div className="h-[320px] bg-neutral-50 rounded-lg flex items-center justify-center">
            <p className="text-sm text-[#717680]">
              Chart visualization placeholder
            </p>
          </div>
        </div>

        {/* Revenue & Bookings */}
        <div className="border border-[#d3e0fb] rounded-2xl p-6 h-[441px]">
          <p
            className="text-base font-medium leading-6 text-[#181d27] mb-4"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Revenue & Bookings
          </p>
          <div className="h-[320px] bg-neutral-50 rounded-lg flex items-center justify-center">
            <p className="text-sm text-[#717680]">
              Chart visualization placeholder
            </p>
          </div>
        </div>
      </div>

      {/* Repeat Guest & Service Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Repeat Guest Analysis */}
        <div className="bg-white border border-[#d3e0fb] rounded-2xl p-6">
          <p
            className="text-base font-medium leading-6 text-[#181d27] mb-4"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Repeat Guest Analysis
          </p>
          <div className="flex flex-col gap-4">
            {repeatGuestData.map((item, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <p
                    className="text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-medium text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item.value}
                  </p>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Request Patterns */}
        <div className="bg-white border border-[#d3e0fb] rounded-2xl p-6">
          <p
            className="text-base font-medium leading-6 text-[#181d27] mb-4"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Service Request Patterns
          </p>
          <div className="flex flex-col gap-4">
            {servicePatternData.map((item, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <p
                    className="text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-medium text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item.value}
                  </p>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Churn Risk Prediction */}
      <div className="bg-white border border-[#d3e0fb] rounded-2xl p-6 mb-6">
        <p
          className="text-base font-medium leading-6 text-[#181d27] mb-4"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Churn Risk Prediction
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-2xl p-4 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-1">
              <p
                className="text-4xl font-medium leading-[44px] text-[#039855] tracking-[-0.72px]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                65%
              </p>
              <div className="flex flex-col items-center gap-0.5">
                <p
                  className="text-sm leading-5 text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Low Risk
                </p>
                <p
                  className="text-xs leading-[18px] text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  650 guests
                </p>
              </div>
            </div>
            <TrendingUp className="absolute -top-8 right-4 w-[219px] h-[219px] text-[#039855] opacity-[0.06]" />
          </div>

          <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-2xl p-4 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-1">
              <p
                className="text-4xl font-medium leading-[44px] text-[#dc6803] tracking-[-0.72px]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                25%
              </p>
              <div className="flex flex-col items-center gap-0.5">
                <p
                  className="text-sm leading-5 text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Medium Risk
                </p>
                <p
                  className="text-xs leading-[18px] text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  250 guests
                </p>
              </div>
            </div>
            <TrendingUp className="absolute -top-8 right-4 w-[219px] h-[219px] text-[#dc6803] opacity-[0.06]" />
          </div>

          <div className="bg-[#f0f5fe] border border-[#d3e0fb] rounded-2xl p-4 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-1">
              <p
                className="text-4xl font-medium leading-[44px] text-[#d92d20] tracking-[-0.72px]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                10%
              </p>
              <div className="flex flex-col items-center gap-0.5">
                <p
                  className="text-sm leading-5 text-[#535862]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  High Risk
                </p>
                <p
                  className="text-xs leading-[18px] text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  100 guests
                </p>
              </div>
            </div>
            <TrendingUp className="absolute -top-8 right-4 w-[219px] h-[219px] text-[#d92d20] opacity-[0.06]" />
          </div>
        </div>
      </div>

      {/* AI Behavior Analysis */}
      <div className="border border-[#d3e0fb] rounded-2xl p-6">
        <div className="flex flex-col gap-2 mb-6">
          <p
            className="text-base font-medium leading-6 text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            AI Behavior Analysis - Data Sources
          </p>
          <p
            className="text-sm leading-5 text-[#717680]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Guest behavior segmentation is powered by AI analysis of multiple
            data points collected throughout the guest journey:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {dataSources.map((source, index) => (
            <div
              key={index}
              className="bg-slate-50 border-l-4 border-blue-600 rounded-[10px] p-4 flex flex-col gap-1"
            >
              <p
                className="text-sm font-medium leading-5 text-[#181d27]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {source.title}
              </p>
              <p
                className="text-xs leading-[18px] text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {source.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f5fe] p-4 rounded-[10px] mb-2">
          <div className="flex flex-col gap-2">
            <p
              className="text-sm font-medium leading-5 text-[#133276]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              How Segmentation Works
            </p>
            <div className="flex flex-col gap-2 text-blue-600">
              <div className="flex gap-1 items-start">
                <p
                  className="text-xs font-bold leading-[18px]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Business (45%):
                </p>
                <p
                  className="text-sm leading-5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Identified by corporate email domains, weekday bookings, early
                  check-ins, business center usage, and minimal leisure amenity
                  usage
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <p
                  className="text-xs font-bold leading-[18px]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Leisure (35%):
                </p>
                <p
                  className="text-sm leading-5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Detected through weekend stays, spa/pool bookings, late
                  checkouts, tour requests, and extended room service orders
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <p
                  className="text-xs font-bold leading-[18px]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Events (15%):
                </p>
                <p
                  className="text-sm leading-5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Grouped bookings, conference center reservations, banquet hall
                  usage, and synchronized check-in/out times
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <p
                  className="text-xs font-bold leading-[18px]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Other (5%):
                </p>
                <p
                  className="text-sm leading-5"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Mixed patterns, extended stays (30+ days), or insufficient
                  data for classification
                </p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="text-xs leading-[18px] text-[#717680]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="font-bold">Note: </span>
          This segmentation is continuously updated in real-time as guests
          interact with hotel services. The AI model learns from booking
          patterns, room service orders, amenity usage, check-in/out times, and
          guest feedback to improve accuracy.
        </p>
      </div>
    </div>
  );
}
