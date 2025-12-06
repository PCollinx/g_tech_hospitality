"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useStaffManagement, StaffMember, UpdateStaffData } from "@/lib/hooks/useStaffManagement";
import { toast } from "react-toastify";

interface EditStaffFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  staff: StaffMember | null;
}

export default function EditStaffForm({
  isOpen,
  onClose,
  onSuccess,
  staff,
}: EditStaffFormProps) {
  const { updateStaff } = useStaffManagement();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateStaffData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "staff",
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        firstName: staff.firstName || "",
        lastName: staff.lastName || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role === "admin" || staff.role === "super-admin" ? "admin" : "staff",
      });
    }
  }, [staff]);

  if (!isOpen || !staff) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.firstName || !formData.lastName) {
        toast.error("First name and last name are required");
        setLoading(false);
        return;
      }

      if (!formData.email) {
        toast.error("Email is required");
        setLoading(false);
        return;
      }

      await updateStaff(staff._id, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            className="text-lg font-semibold text-[#181d27]"
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            Edit Staff Member
          </h2>
          <button
            onClick={onClose}
            className="text-[#181d27] hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "staff" | "admin",
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              <span
                className="text-base font-semibold text-gray-700"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Cancel
              </span>
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span
                  className="text-base font-semibold"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Save Changes
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

