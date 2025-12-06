import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export interface Room {
  _id: string;
  number: number;
  alphabet: string;
  category: string;
  price: number; // in cents
  maxGuest: number;
  bedType: string;
  oceanView: boolean;
  isBooked: boolean;
  status:
    | "available"
    | "occupied"
    | "maintenance"
    | "unserviceable"
    | "disabled";
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoomData {
  number: number;
  alphabet: string;
  category: string;
  price: number; // in cents
  maxGuest: number;
  bedType: string;
  oceanView?: boolean;
  images?: string[];
}

export interface UpdateRoomData {
  number?: number;
  alphabet?: string;
  category?: string;
  price?: number;
  maxGuest?: number;
  bedType?: string;
  oceanView?: boolean;
  images?: string[];
  status?: string;
}

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/rooms");
      const roomsData = response.data.data?.rooms || [];
      setRooms(roomsData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch rooms";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData: CreateRoomData) => {
    try {
      const response = await axiosInstance.post("/rooms", roomData);
      const newRoom = response.data.data?.room || response.data.data;
      setRooms((prev) => [...prev, newRoom]);
      toast.success("Room created successfully");
      return newRoom;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create room";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateRoom = async (roomId: string, roomData: UpdateRoomData) => {
    try {
      const response = await axiosInstance.patch(`/rooms/${roomId}`, roomData);
      const updatedRoom = response.data.data?.room || response.data.data;
      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? updatedRoom : room))
      );
      toast.success("Room updated successfully");
      return updatedRoom;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update room";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteRoom = async (roomId: string) => {
    try {
      await axiosInstance.delete(`/rooms/${roomId}`);
      setRooms((prev) => prev.filter((room) => room._id !== roomId));
      toast.success("Room deleted successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete room";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateRoomStatus = async (roomId: string, status: string) => {
    try {
      const response = await axiosInstance.patch(`/rooms/${roomId}/status`, {
        status,
      });
      const updatedRoom = response.data.data?.room;
      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? updatedRoom : room))
      );
      toast.success("Room status updated successfully");
      return updatedRoom;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update room status";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomStatus,
  };
}
