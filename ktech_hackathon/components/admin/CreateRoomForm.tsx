"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { CreateRoomData, useRooms } from "@/lib/hooks/useRooms";
import { toast } from "react-toastify";

interface CreateRoomFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateRoomForm({
  isOpen,
  onClose,
  onSuccess,
}: CreateRoomFormProps) {
  const { createRoom } = useRooms();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRoomData>({
    number: 0,
    alphabet: "",
    category: "standard",
    price: 0,
    maxGuest: 1,
    bedType: "queen",
    oceanView: false,
    images: [],
  });
  const [imageUrl, setImageUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.number || !formData.alphabet || !formData.category) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (formData.price <= 0) {
        toast.error("Price must be greater than 0");
        setLoading(false);
        return;
      }

      if (formData.maxGuest < 1) {
        toast.error("Max guests must be at least 1");
        setLoading(false);
        return;
      }

      // Convert price to cents
      const roomData = {
        ...formData,
        price: Math.round(formData.price * 100), // Convert dollars to cents
      };

      await createRoom(roomData);
      onSuccess?.();
      onClose();
      // Reset form
      setFormData({
        number: 0,
        alphabet: "",
        category: "standard",
        price: 0,
        maxGuest: 1,
        bedType: "queen",
        oceanView: false,
        images: [],
      });
      setImageUrl("");
    } catch (error) {
      // Error already handled in useRooms hook
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      try {
        new URL(imageUrl); // Validate URL
        if (formData.images && formData.images.length >= 5) {
          toast.error("Maximum 5 images allowed");
          return;
        }
        setFormData({
          ...formData,
          images: [...(formData.images || []), imageUrl.trim()],
        });
        setImageUrl("");
      } catch {
        toast.error("Please enter a valid URL");
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-semibold leading-7 text-[#181d27]"
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            Create New Room
          </h2>
          <button
            onClick={onClose}
            className="text-[#181d27] hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Room Number */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Room Number *
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.number || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  number: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            />
          </div>

          {/* Alphabet */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Alphabet (e.g., A, B, C) *
            </label>
            <input
              type="text"
              maxLength={1}
              required
              value={formData.alphabet}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  alphabet: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Price per Night ($) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            />
          </div>

          {/* Max Guests */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Max Guests *
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.maxGuest || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxGuest: parseInt(e.target.value) || 1,
                })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            />
          </div>

          {/* Bed Type */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Bed Type *
            </label>
            <select
              required
              value={formData.bedType}
              onChange={(e) =>
                setFormData({ ...formData, bedType: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <option value="queen">Queen</option>
              <option value="king">King</option>
              <option value="twin">Twin</option>
              <option value="double">Double</option>
            </select>
          </div>

          {/* Ocean View */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="oceanView"
              checked={formData.oceanView}
              onChange={(e) =>
                setFormData({ ...formData, oceanView: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="oceanView"
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Ocean View
            </label>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium leading-5 text-[#414651]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Images (URLs, max 5)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: "Geist, sans-serif" }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                Add
              </button>
            </div>
            {formData.images && formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded"
                  >
                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                      {img}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-5 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-[50px] shadow-sm hover:bg-[#d3e0fb] transition-colors"
              disabled={loading}
            >
              <span
                className="text-base font-semibold leading-6 text-[#19429d]"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Cancel
              </span>
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-blue-600 border border-blue-600 rounded-[50px] shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <span
                  className="text-base font-semibold leading-6 text-white"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Create Room
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
