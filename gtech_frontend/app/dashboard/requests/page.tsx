"use client";

import { Clock, Check } from "lucide-react";

// Request data matching Figma design
const requests = [
  {
    id: 1,
    serviceType: "Room Service",
    description:
      "I have a slight injury on my lower right back from lifting luggage, so please avoid deep pressure in that area. Also, I have sensitive...",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 2,
    serviceType: "Housekeeping",
    description:
      "We accidentally spilled some soda on the rug near the bed. Could you please send someone to clean it up before it stains? We also need fresh towels.",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 3,
    serviceType: "Laundry",
    description:
      "The blue silk dress is very delicate. Please dry clean only and do not use high heat. It has a small sequin detail on the collar, please be careful.",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 4,
    serviceType: "Breakfast Order",
    description: "Continental breakfast for 2",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Completed",
    iconColor: "#039855",
    iconBg: "#ecfdf3",
    icon: "check",
  },
];

export default function RequestsPage() {
  return (
    <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
      {/* Page Header */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h2 className="font-['Geist'] font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight sm:leading-7 lg:leading-8">
          Your Requests
        </h2>
        <p className="font-['Geist'] font-normal text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
          Track and manage your service requests
        </p>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-[#e9eaeb] rounded-lg sm:rounded-xl overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#e9eaeb] bg-white">
                <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                  Service Type
                </th>
                <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                  Description
                </th>
                <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                  Time
                </th>
                <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`border-b border-[#e9eaeb] ${
                    index === requests.length - 1 ? "" : "bg-neutral-50"
                  }`}
                >
                  {/* Service Type */}
                  <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: request.iconBg }}
                      >
                        {request.icon === "clock" ? (
                          <Clock
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            style={{ color: request.iconColor }}
                          />
                        ) : (
                          <Check
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            style={{ color: request.iconColor }}
                          />
                        )}
                      </div>
                      <span className="font-['Geist'] font-medium text-xs sm:text-sm text-[#181d27] leading-5">
                        {request.serviceType}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                    <p className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5 line-clamp-2">
                      {request.description}
                    </p>
                  </td>

                  {/* Time */}
                  <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                    <div className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5">
                      <p>{request.time}</p>
                      <p className="mt-1">{request.estimatedTime}</p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                    {request.status === "Pending" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#fffaeb] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#b54708] leading-[18px]">
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#ecfdf3] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#027a48] leading-[18px]">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
