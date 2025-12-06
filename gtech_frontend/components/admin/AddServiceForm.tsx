"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useServices, CreateServiceData } from "@/lib/hooks/useServices";
import { toast } from "react-toastify";

interface AddServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddServiceForm({
  isOpen,
  onClose,
  onSuccess,
}: AddServiceFormProps) {
  const { createService } = useServices();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateServiceData>({
    name: "",
    description: "",
    category: "other",
    estimatedDuration: 30,
    active: true,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name) {
        toast.error("Service name is required");
        setLoading(false);
        return;
      }

      await createService(formData);
      onSuccess?.();
      onClose();
      setFormData({
        name: "",
        description: "",
        category: "other",
        estimatedDuration: 30,
        active: true,
      });
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
            Add New Service
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
              Service Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter service name"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="Enter service description"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as any,
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <option value="housekeeping">Housekeeping</option>
              <option value="room-service">Room Service</option>
              <option value="maintenance">Maintenance</option>
              <option value="concierge">Concierge</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Estimated Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={formData.estimatedDuration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedDuration: parseInt(e.target.value) || 30,
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
              placeholder="30"
            />
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
                  Add Service
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

