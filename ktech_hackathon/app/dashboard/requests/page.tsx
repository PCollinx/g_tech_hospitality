"use client";

import { Clock, Check } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface ServiceRequest {
  _id: string;
  type?: string;
  description: string;
  status: string;
  createdAt: string;
  service?: {
    name?: string;
    category?: string;
  };
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/service-requests/my-requests");
        const fetchedRequests = response.data.data?.requests || [];
        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Error fetching service requests:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);
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
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 text-center font-['Geist'] font-normal text-xs sm:text-sm text-[#535862]">
                    Loading requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 text-center font-['Geist'] font-normal text-xs sm:text-sm text-[#535862]">
                    No service requests found
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => {
                  const isCompleted = request.status === "completed";
                  const serviceName = request.service?.name || request.type || "Service";
                  const createdAt = new Date(request.createdAt);
                  const timeString = createdAt.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const iconBg = isCompleted ? "#ecfdf3" : "#fffaeb";
                  const iconColor = isCompleted ? "#039855" : "#dc6803";

                  return (
                    <tr
                      key={request._id}
                      className={`border-b border-[#e9eaeb] ${
                        index === requests.length - 1 ? "" : "bg-neutral-50"
                      }`}
                    >
                      {/* Service Type */}
                      <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: iconBg }}
                          >
                            {isCompleted ? (
                              <Check
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                style={{ color: iconColor }}
                              />
                            ) : (
                              <Clock
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                style={{ color: iconColor }}
                              />
                            )}
                          </div>
                          <span className="font-['Geist'] font-medium text-xs sm:text-sm text-[#181d27] leading-5">
                            {serviceName}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                        <p className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5 line-clamp-2">
                          {request.description || "No description"}
                        </p>
                      </td>

                      {/* Time */}
                      <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                        <div className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5">
                          <p>{timeString}</p>
                          <p className="mt-1">Est. 15-30 min</p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                        {isCompleted ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#ecfdf3] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#027a48] leading-[18px] capitalize">
                            {request.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#fffaeb] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#b54708] leading-[18px] capitalize">
                            {request.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
