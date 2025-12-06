"use client";

import { useState } from "react";
import { MoreVertical, Edit3, Power } from "lucide-react";
import { Service } from "@/lib/hooks/useServices";

interface ServicesListProps {
  services: Service[];
  onEdit?: (service: Service) => void;
  onToggleStatus?: (service: Service) => void;
  showActions?: boolean;
}

export default function ServicesList({
  services,
  onEdit,
  onToggleStatus,
  showActions = true,
}: ServicesListProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getStatusColor = (active: boolean) => {
    return active
      ? "bg-[#ecfdf3] text-[#027a48]"
      : "bg-neutral-100 text-[#414651]";
  };

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      housekeeping: "Housekeeping",
      "room-service": "Room Service",
      maintenance: "Maintenance",
      concierge: "Concierge",
      other: "Other",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="bg-white border border-[#e9eaeb] rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-50 border-b border-[#e9eaeb]">
            <th
              className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Service Name
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Category
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Duration
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Status
            </th>
            {showActions && (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 5 : 4}
                className="px-6 py-12 text-center"
              >
                <p
                  className="text-sm text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  No services found
                </p>
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service._id} className="border-b border-[#e9eaeb]">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p
                      className="text-sm font-medium text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {service.name}
                    </p>
                    {service.description && (
                      <p
                        className="text-xs text-[#535862] mt-1"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {service.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {getCategoryName(service.category)}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {service.estimatedDuration || 30} min
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                      service.active
                    )}`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {service.active ? "Active" : "Suspended"}
                  </span>
                </td>
                {showActions && (
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === service._id ? null : service._id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                    </button>
                    {activeDropdown === service._id && (
                      <div className="absolute right-0 top-12 bg-white border border-[#e9eaeb] rounded-lg shadow-lg p-2 z-10 w-48">
                        {onToggleStatus && (
                          <button
                            onClick={() => {
                              onToggleStatus(service);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            <Power className="w-4 h-4" />
                            {service.active ? "Suspend" : "Activate"}
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => {
                              onEdit(service);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
