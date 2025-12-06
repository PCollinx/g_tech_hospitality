import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export interface StaffMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "staff" | "admin" | "super-admin";
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStaffData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "staff" | "admin";
  phone?: string;
}

export interface UpdateStaffData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: "staff" | "admin";
}

export function useStaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/staff");
      const staffData = response.data.data?.staff || [];
      setStaff(staffData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch staff";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (staffData: CreateStaffData) => {
    try {
      const response = await axiosInstance.post("/staff", staffData);
      const newStaff = response.data.data?.staff || response.data.data;
      setStaff((prev) => [...prev, newStaff]);
      toast.success("Staff member created successfully");
      return newStaff;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create staff";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateStaff = async (staffId: string, staffData: UpdateStaffData) => {
    try {
      const response = await axiosInstance.patch(`/staff/${staffId}`, staffData);
      const updatedStaff = response.data.data?.staff || response.data.data;
      setStaff((prev) =>
        prev.map((s) => (s._id === staffId ? updatedStaff : s))
      );
      toast.success("Staff member updated successfully");
      return updatedStaff;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update staff";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const disableStaff = async (staffId: string) => {
    try {
      const response = await axiosInstance.patch(`/staff/${staffId}/disable`);
      const updatedStaff = response.data.data?.staff;
      setStaff((prev) =>
        prev.map((s) => (s._id === staffId ? updatedStaff : s))
      );
      toast.success("Staff member disabled successfully");
      return updatedStaff;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to disable staff";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const changeStaffRole = async (staffId: string, role: "staff" | "admin") => {
    try {
      const response = await axiosInstance.patch(`/staff/${staffId}/role`, {
        role,
      });
      const updatedStaff = response.data.data?.staff;
      setStaff((prev) =>
        prev.map((s) => (s._id === staffId ? updatedStaff : s))
      );
      toast.success("Staff role updated successfully");
      return updatedStaff;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to change staff role";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return {
    staff,
    loading,
    error,
    fetchStaff,
    createStaff,
    updateStaff,
    disableStaff,
    changeStaffRole,
  };
}

