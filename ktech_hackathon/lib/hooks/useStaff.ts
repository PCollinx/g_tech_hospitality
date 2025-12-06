import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export interface StaffRegisterGuestData {
  firstName: string;
  lastName: string;
  NIN: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface CreateBookingData {
  room: string;
  startDate: string;
  endDate: string;
  totalPrice: number; // in cents
  paymentMethod: "cash" | "transfer" | "card" | "POS" | "online payment";
  paymentName?: string;
}

export function useStaff() {
  const [loading, setLoading] = useState(false);

  const registerGuest = async (guestData: StaffRegisterGuestData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/users/staff-register",
        guestData
      );
      const newGuest = response.data.data?.user || response.data.data;
      toast.success("Guest registered successfully");
      return newGuest;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to register guest";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createBookingForGuest = async (
    guestId: string,
    bookingData: CreateBookingData
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/bookings", {
        ...bookingData,
        user: guestId,
      });
      const newBooking = response.data.data?.booking || response.data.data;
      toast.success("Booking created successfully");
      return newBooking;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create booking";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerGuest,
    createBookingForGuest,
  };
}
