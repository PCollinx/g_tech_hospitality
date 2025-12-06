"use client";

import { useState, useEffect } from "react";
import { X, Search, Bed, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Room } from "@/lib/hooks/useRooms";
import { formatPrice, getRoomDisplayName } from "@/lib/utils/roomUtils";
import { toast } from "react-toastify";

interface RoomSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (room: Room) => void;
  startDate: string;
  endDate: string;
}

export default function RoomSelectionModal({
  isOpen,
  onClose,
  onSelectRoom,
  startDate,
  endDate,
}: RoomSelectionModalProps) {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen && startDate && endDate) {
      fetchAvailableRooms();
    }
  }, [isOpen, startDate, endDate]);

  useEffect(() => {
    filterRooms();
  }, [availableRooms, categoryFilter, searchQuery]);

  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/rooms/available", {
        params: {
          startDate,
          endDate,
        },
      });
      const rooms = response.data.data?.rooms || [];
      setAvailableRooms(rooms);
      setFilteredRooms(rooms);
    } catch (error: any) {
      console.error("Error fetching available rooms:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch available rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    let filtered = [...availableRooms];

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (room) => room.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.number.toString().includes(query) ||
          room.alphabet.toLowerCase().includes(query) ||
          getRoomDisplayName(room).toLowerCase().includes(query)
      );
    }

    setFilteredRooms(filtered);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-[800px] w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2
              className="text-lg font-semibold leading-7 text-[#181d27]"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              Select Room
            </h2>
            <p
              className="text-sm text-gray-600 mt-1"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Choose an available room for the guest
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#181d27] hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by room number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-2 block"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Room Type
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <option value="all">All Types</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No available rooms found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRooms.map((room) => (
                <button
                  key={room._id}
                  onClick={() => {
                    onSelectRoom(room);
                    onClose();
                  }}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Room Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {room.images && room.images.length > 0 ? (
                        <img
                          src={room.images[0]}
                          alt={getRoomDisplayName(room)}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=200&h=200&fit=crop";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <Bed className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Room Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className="font-semibold text-lg text-gray-900"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {getRoomDisplayName(room)}
                          </h3>
                          <p
                            className="text-sm text-gray-600 mt-1"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            {room.bedType} bed • {room.maxGuest} guests
                            {room.oceanView && " • Ocean view"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-semibold text-lg text-blue-600"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            ${formatPrice(room.price)}
                          </p>
                          <p
                            className="text-sm text-gray-600"
                            style={{ fontFamily: "Geist, sans-serif" }}
                          >
                            per night
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

