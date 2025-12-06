"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useServices } from "@/lib/hooks/useServices";
import { storage } from "@/lib/storage";
import { useSession } from "next-auth/react";
import AddServiceForm from "@/components/admin/AddServiceForm";
import EditServiceForm from "@/components/admin/EditServiceForm";
import ServicesList from "@/components/admin/ServicesList";

export default function ServicesPage() {
  const { data: session } = useSession();
  const { services, loading, fetchServices, toggleServiceStatus } =
    useServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [description, setDescription] = useState("View available services");

  useEffect(() => {
    const user = storage.getUser() || (session?.user as any);
    const userRole = user?.role || "guest";
    const admin = userRole === "admin" || userRole === "super-admin";
    setIsAdmin(admin);
    setDescription(
      admin ? "Manage and view all services" : "View available services"
    );
  }, [session]);

  const filteredServices = services.filter((service) => {
    const name = service.name.toLowerCase();
    const description = (service.description || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || description.includes(query);
  });

  const handleToggleStatus = async (service: any) => {
    try {
      await toggleServiceStatus(service._id, !service.active);
      await fetchServices();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setIsEditServiceModalOpen(true);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 bg-white min-h-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-lg sm:text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Services Management
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
            onClick={() => setIsAddServiceModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 border border-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span
              className="text-sm font-semibold leading-5"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Add Service
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717680]" />
          <input
            type="text"
            placeholder="Search services"
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
        <ServicesList
          services={filteredServices}
          onEdit={isAdmin ? handleEdit : undefined}
          onToggleStatus={isAdmin ? handleToggleStatus : undefined}
          showActions={isAdmin}
        />
      )}

      {isAdmin && (
        <>
          <AddServiceForm
            isOpen={isAddServiceModalOpen}
            onClose={() => setIsAddServiceModalOpen(false)}
            onSuccess={() => {
              fetchServices();
              setIsAddServiceModalOpen(false);
            }}
          />
          <EditServiceForm
            isOpen={isEditServiceModalOpen}
            onClose={() => {
              setIsEditServiceModalOpen(false);
              setSelectedService(null);
            }}
            onSuccess={() => {
              fetchServices();
              setIsEditServiceModalOpen(false);
              setSelectedService(null);
            }}
            service={selectedService}
          />
        </>
      )}
    </div>
  );
}
