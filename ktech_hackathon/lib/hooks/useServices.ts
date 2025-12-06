import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export interface Service {
  _id: string;
  name: string;
  description?: string;
  category:
    | "housekeeping"
    | "room-service"
    | "maintenance"
    | "concierge"
    | "other";
  estimatedDuration?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServiceData {
  name: string;
  description?: string;
  category:
    | "housekeeping"
    | "room-service"
    | "maintenance"
    | "concierge"
    | "other";
  estimatedDuration?: number;
  active?: boolean;
}

export interface UpdateServiceData {
  name?: string;
  description?: string;
  category?:
    | "housekeeping"
    | "room-service"
    | "maintenance"
    | "concierge"
    | "other";
  estimatedDuration?: number;
  active?: boolean;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/services");
      const servicesData =
        response.data.doc ||
        response.data.data?.services ||
        response.data.data ||
        [];
      setServices(servicesData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch services";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: CreateServiceData) => {
    try {
      const response = await axiosInstance.post("/services", serviceData);
      const newService = response.data.data?.service || response.data.data;
      setServices((prev) => [...prev, newService]);
      toast.success("Service created successfully");
      return newService;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to create service";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateService = async (
    serviceId: string,
    serviceData: UpdateServiceData
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/services/${serviceId}`,
        serviceData
      );
      const updatedService =
        response.data.data?.service ||
        response.data.data?.doc ||
        response.data.data;
      setServices((prev) =>
        prev.map((s) => (s._id === serviceId ? updatedService : s))
      );
      toast.success("Service updated successfully");
      return updatedService;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update service";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const toggleServiceStatus = async (serviceId: string, active: boolean) => {
    try {
      const response = await axiosInstance.patch(`/services/${serviceId}`, {
        active,
      });
      const updatedService =
        response.data.data?.service ||
        response.data.data?.doc ||
        response.data.data;
      setServices((prev) =>
        prev.map((s) => (s._id === serviceId ? updatedService : s))
      );
      toast.success(
        active
          ? "Service activated successfully"
          : "Service suspended successfully"
      );
      return updatedService;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update service status";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
    toggleServiceStatus,
  };
}
