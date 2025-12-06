"use client";

import { useState, useEffect } from "react";
import { UserPlus, Search, Loader2 } from "lucide-react";
import { useStaffManagement } from "@/lib/hooks/useStaffManagement";
import { storage } from "@/lib/storage";
import { useSession } from "next-auth/react";
import AddStaffForm from "@/components/admin/AddStaffForm";
import EditStaffForm from "@/components/admin/EditStaffForm";
import StaffList from "@/components/admin/StaffList";

export default function StaffPage() {
  const { data: session } = useSession();
  const { staff, loading, fetchStaff, disableStaff, updateStaff } =
    useStaffManagement();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [description, setDescription] = useState("View staff members");

  useEffect(() => {
    const user = storage.getUser() || (session?.user as any);
    const userRole = user?.role || "guest";
    const admin = userRole === "admin" || userRole === "super-admin";
    setIsAdmin(admin);
    setDescription(
      admin ? "Manage and view all staff members" : "View staff members"
    );
  }, [session]);

  const filteredStaff = staff.filter((member) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    const email = member.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleDisable = async (member: any) => {
    if (
      !confirm(
        `Are you sure you want to ${
          member.active !== false ? "disable" : "enable"
        } ${member.firstName} ${member.lastName}?`
      )
    ) {
      return;
    }

    try {
      await disableStaff(member._id);
      await fetchStaff();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (member: any) => {
    setSelectedStaff(member);
    setIsEditStaffModalOpen(true);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 bg-white min-h-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-lg sm:text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Staff Management
          </h2>
          <p
            className="text-sm sm:text-base leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            {description}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span
              className="text-sm font-semibold leading-5"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Add Staff
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717680]" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            style={{ fontFamily: "Geist, sans-serif", fontSize: "16px" }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <StaffList
          staff={filteredStaff}
          onEdit={isAdmin ? handleEdit : undefined}
          onDisable={isAdmin ? handleDisable : undefined}
          showActions={isAdmin}
        />
      )}

      {isAdmin && (
        <>
          <AddStaffForm
            isOpen={isAddStaffModalOpen}
            onClose={() => setIsAddStaffModalOpen(false)}
            onSuccess={() => {
              fetchStaff();
              setIsAddStaffModalOpen(false);
            }}
          />
          <EditStaffForm
            isOpen={isEditStaffModalOpen}
            onClose={() => {
              setIsEditStaffModalOpen(false);
              setSelectedStaff(null);
            }}
            onSuccess={() => {
              fetchStaff();
              setIsEditStaffModalOpen(false);
              setSelectedStaff(null);
            }}
            staff={selectedStaff}
          />
        </>
      )}
    </div>
  );
}
