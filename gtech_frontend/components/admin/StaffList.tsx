"use client";

import { useState } from "react";
import { MoreVertical, Edit3, Power } from "lucide-react";
import { StaffMember } from "@/lib/hooks/useStaffManagement";

interface StaffListProps {
  staff: StaffMember[];
  onEdit?: (staff: StaffMember) => void;
  onDisable?: (staff: StaffMember) => void;
  showActions?: boolean;
}

export default function StaffList({
  staff,
  onEdit,
  onDisable,
  showActions = true,
}: StaffListProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getStatusColor = (active?: boolean) => {
    return active !== false
      ? "bg-[#ecfdf3] text-[#027a48]"
      : "bg-neutral-100 text-[#414651]";
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
              Staff Member
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Role
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
          {staff.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 4 : 3}
                className="px-6 py-12 text-center"
              >
                <p
                  className="text-sm text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  No staff members found
                </p>
              </td>
            </tr>
          ) : (
            staff.map((member) => (
              <tr key={member._id} className="border-b border-[#e9eaeb]">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p
                      className="text-sm font-medium text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {member.firstName} {member.lastName}
                    </p>
                    <p
                      className="text-sm text-[#535862]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      {member.email}
                    </p>
                    {member.phone && (
                      <p
                        className="text-xs text-[#717680]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {member.phone}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-[#535862]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.role === "admin" || member.role === "super-admin"
                      ? "Admin"
                      : "Staff"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-2xl text-xs font-medium ${getStatusColor(
                      member.active
                    )}`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {member.active !== false ? "Active" : "Inactive"}
                  </span>
                </td>
                {showActions && (
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === member._id ? null : member._id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-[#a4a7ae]" />
                    </button>
                    {activeDropdown === member._id && (
                      <div className="absolute right-0 top-12 bg-white border border-[#e9eaeb] rounded-lg shadow-lg p-2 z-10 w-48">
                        {onEdit && (
                          <button
                            onClick={() => {
                              onEdit(member);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit Details
                          </button>
                        )}
                        {onDisable && (
                          <button
                            onClick={() => {
                              onDisable(member);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#535862] hover:bg-gray-50 rounded transition-colors"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            <Power className="w-4 h-4" />
                            {member.active !== false ? "Suspend" : "Activate"}
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
