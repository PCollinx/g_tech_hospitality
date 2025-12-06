"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  Bed,
  Users,
  AlertTriangle,
  AlertCircle,
  Check,
  X,
  User,
  Phone,
  Mail,
  Coffee,
  TrendingUp,
  Calendar,
  Key,
  Trash2,
  Edit3,
  Stars,
  Loader2,
} from "lucide-react";
import { useRooms, Room as BackendRoom } from "@/lib/hooks/useRooms";
import CreateRoomForm from "@/components/admin/CreateRoomForm";
import BookGuestForm from "@/components/admin/BookGuestForm";
import {
  mapBackendToFrontendStatus,
  getRoomDisplayName,
  formatPrice,
} from "@/lib/utils/roomUtils";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { storage } from "@/lib/storage";
import { useSession } from "next-auth/react";

interface DisplayRoom {
  id: string;
  roomNumber: string;
  roomType: string;
  status: "occupied" | "available" | "cleaning" | "maintenance";
  guestName?: string;
  checkIn?: string;
  checkOut?: string;
  pricePerNight: number;
  guests: number;
  bedType: string;
  view: string;
  image: string;
  backendRoom: BackendRoom;
}

export default function LiveMonitoringPage() {
  const { data: session } = useSession();
  const {
    rooms,
    loading,
    fetchRooms,
    updateRoom,
    deleteRoom,
    updateRoomStatus,
  } = useRooms();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<DisplayRoom | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBookGuestForm, setShowBookGuestForm] = useState(false);

  // Get user role
  const user = storage.getUser() || (session?.user as any);
  const userRole = user?.role || "guest";
  const isAdmin = userRole === "admin" || userRole === "super-admin";
  const isStaff = userRole === "staff" || isAdmin;
  const [editFormData, setEditFormData] = useState({
    number: 0,
    alphabet: "",
    category: "",
    price: 0,
    maxGuest: 0,
    bedType: "",
    oceanView: false,
    status: "",
    images: [] as string[],
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch bookings to get guest information
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings");
        const bookingsData = response.data.data?.bookings || [];
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    }

    if (showFilterDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterDropdown]);

  // Convert backend rooms to display rooms
  const displayRooms: DisplayRoom[] = rooms.map((room) => {
    // Find booking for this room
    const booking = bookings.find(
      (b) =>
        b.room?._id === room._id ||
        b.room === room._id ||
        (b.status !== "cancelled" && b.status !== "checked-out")
    );

    const frontendStatus = mapBackendToFrontendStatus(
      room.status,
      room.isBooked
    );
    const roomName = getRoomDisplayName(room);

    return {
      id: room._id,
      roomNumber: `${room.alphabet}${room.number}`,
      roomType:
        room.category === "suite"
          ? "Suite"
          : room.category === "deluxe"
          ? "Deluxe Room"
          : "Standard Room",
      status: frontendStatus,
      guestName: booking?.user
        ? `${booking.user.firstName || ""} ${
            booking.user.lastName || ""
          }`.trim()
        : undefined,
      checkIn: booking?.startDate,
      checkOut: booking?.endDate,
      pricePerNight: parseFloat(formatPrice(room.price)),
      guests: room.maxGuest,
      bedType: room.bedType,
      view: room.oceanView ? "Ocean view" : "City view",
      image:
        room.images && room.images.length > 0 && room.images[0]
          ? room.images[0]
          : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      backendRoom: room,
    };
  });

  // Mock data removed - using real data from backend

  // Calculate stats from real data
  const stats = {
    totalRooms: displayRooms.length,
    occupied: displayRooms.filter((r) => r.status === "occupied").length,
    available: displayRooms.filter((r) => r.status === "available").length,
    cleaning: displayRooms.filter((r) => r.status === "cleaning").length,
    maintenance: displayRooms.filter((r) => r.status === "maintenance").length,
  };

  const filterOptions = [
    { value: "all", label: "All Rooms" },
    { value: "occupied", label: "Occupied" },
    { value: "available", label: "Available" },
    { value: "cleaning", label: "Cleaning" },
    { value: "maintenance", label: "Maintenance" },
  ];

  // Count rooms by status for filter labels
  const roomCounts = {
    all: displayRooms.length,
    occupied: displayRooms.filter((r) => r.status === "occupied").length,
    available: displayRooms.filter((r) => r.status === "available").length,
    cleaning: displayRooms.filter((r) => r.status === "cleaning").length,
    maintenance: displayRooms.filter((r) => r.status === "maintenance").length,
  };

  const getFilterLabel = (value: string) => {
    const counts: Record<string, number> = roomCounts;
    return `${
      filterOptions.find((opt) => opt.value === value)?.label || "All Rooms"
    } (${counts[value] || 0})`;
  };

  const filteredRooms = displayRooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.guestName &&
        room.guestName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      selectedFilter === "all" || room.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      occupied: {
        bg: "bg-[#eff8ff]",
        text: "text-[#175cd3]",
        label: "Occupied",
      },
      available: {
        bg: "bg-[#ecfdf3]",
        text: "text-[#027a48]",
        label: "Available",
      },
      cleaning: {
        bg: "bg-[#fef3f2]",
        text: "text-[#b42318]",
        label: "Cleaning",
      },
      maintenance: {
        bg: "bg-[#fef3f2]",
        text: "text-[#b42318]",
        label: "Maintenance",
      },
    };
    return badges[status as keyof typeof badges] || badges.available;
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        setShowModal(false);
        setSelectedRoom(null);
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const handleUpdateRoom = async () => {
    if (!selectedRoom) return;

    try {
      const updateData: any = {};
      if (editFormData.number) updateData.number = editFormData.number;
      if (editFormData.alphabet) updateData.alphabet = editFormData.alphabet;
      if (editFormData.category) updateData.category = editFormData.category;
      if (editFormData.price)
        updateData.price = Math.round(editFormData.price * 100); // Convert to cents
      if (editFormData.maxGuest) updateData.maxGuest = editFormData.maxGuest;
      if (editFormData.bedType) updateData.bedType = editFormData.bedType;
      if (editFormData.oceanView !== undefined)
        updateData.oceanView = editFormData.oceanView;
      if (editFormData.images) updateData.images = editFormData.images;
      if (editFormData.status) {
        // Update status separately
        await updateRoomStatus(selectedRoom.id, editFormData.status);
      }

      if (Object.keys(updateData).length > 0) {
        await updateRoom(selectedRoom.id, updateData);
      }

      setShowEditModal(false);
      setShowModal(false);
      setSelectedRoom(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Create Room Form */}
      {isAdmin && (
        <CreateRoomForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            fetchRooms();
            setShowCreateForm(false);
          }}
        />
      )}

      {/* Book Guest Form */}
      {isStaff && (
        <BookGuestForm
          isOpen={showBookGuestForm}
          onClose={() => setShowBookGuestForm(false)}
          onSuccess={() => {
            fetchRooms();
            setShowBookGuestForm(false);
          }}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1
            className="text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Live Monitoring (Guests)
          </h1>
          <p
            className="text-base font-normal leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Live status of all rooms and guest activities with AI-powered
            insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isStaff && (
            <button
              onClick={() => setShowBookGuestForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-[50px] border border-green-600 shadow-sm hover:bg-green-700 transition-colors whitespace-nowrap shrink-0"
            >
              <User className="w-5 h-5 shrink-0" />
              <span
                className="text-sm font-semibold leading-5"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Book Guest
              </span>
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-[50px] border border-blue-600 shadow-sm hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Bed className="w-5 h-5 shrink-0" />
              <span
                className="text-sm font-semibold leading-5"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Add Room
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="bg-[#f5f5f5] border border-[#e9eaeb] rounded-3xl p-[15px] mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Rooms */}
          <div className="bg-white rounded-[18px] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-base font-normal leading-6 text-[#535862] mb-1"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Total Rooms
                </p>
                <p
                  className="text-[30px] font-semibold leading-[38px] text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  {stats.totalRooms}
                </p>
              </div>
              <div className="bg-[#535862] p-3 rounded-lg">
                <Bed className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Occupied */}
          <div className="bg-white rounded-[18px] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-base font-normal leading-6 text-[#535862] mb-1"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Occupied
                </p>
                <p
                  className="text-[30px] font-semibold leading-[38px] text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  {stats.occupied}
                </p>
              </div>
              <div className="bg-[#1570ef] p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="bg-white rounded-[18px] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-base font-normal leading-6 text-[#535862] mb-1"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Available
                </p>
                <p
                  className="text-[30px] font-semibold leading-[38px] text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  {stats.available}
                </p>
              </div>
              <div className="bg-[#039855] p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Cleaning */}
          <div className="bg-white rounded-[18px] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-base font-normal leading-6 text-[#535862] mb-1"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Cleaning
                </p>
                <p
                  className="text-[30px] font-semibold leading-[38px] text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  {stats.cleaning}
                </p>
              </div>
              <div className="bg-[#ff9b00] p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-[18px] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-base font-normal leading-6 text-[#535862] mb-1"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  Maintenance
                </p>
                <p
                  className="text-[30px] font-semibold leading-[38px] text-[#181d27]"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  {stats.maintenance}
                </p>
              </div>
              <div className="bg-[#d92d20] p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-[#717680]" />
          </div>
          <input
            type="text"
            placeholder="Search by room number or guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-12 pr-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base font-normal leading-6 text-[#717680] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{ fontFamily: "Geist, sans-serif" }}
          />
        </div>

        {/* Filter Dropdown */}
        <div ref={dropdownRef} className="relative z-50">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 h-11 px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <span
              className="text-base font-medium leading-6 text-[#181d27] whitespace-nowrap"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              {getFilterLabel(selectedFilter)}
            </span>
            <ChevronDown className="w-5 h-5 text-[#717680]" />
          </button>

          {/* Dropdown Menu */}
          {showFilterDropdown && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#e9eaeb] rounded-2xl shadow-lg z-100">
              {filterOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedFilter(option.value);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-[#f5f5f5] transition-colors ${
                    index === 0 ? "rounded-t-2xl" : ""
                  } ${
                    index === filterOptions.length - 1 ? "rounded-b-2xl" : ""
                  } ${selectedFilter === option.value ? "bg-[#f5f5f5]" : ""}`}
                >
                  <span
                    className={`text-base leading-6 ${
                      selectedFilter === option.value
                        ? "font-medium text-[#181d27]"
                        : "font-normal text-[#717680]"
                    }`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {option.label}
                  </span>
                  {selectedFilter === option.value && (
                    <Check className="w-5 h-5 text-[#181d27]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const statusBadge = getStatusBadge(room.status);
          return (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
            >
              {/* Room Image */}
              <div className="relative h-[193px] w-full rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={room.image}
                  alt={`Room ${room.roomNumber}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop";
                    target.onerror = null; // Prevent infinite loop
                  }}
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Status and Type Badges */}
                <div className="absolute top-4 left-3 right-3 flex items-center justify-between z-10">
                  <span
                    className={`${statusBadge.bg} ${statusBadge.text} px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px]`}
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {statusBadge.label}
                  </span>
                  <span
                    className="bg-[#f5f5f5]/80 text-[#414651] px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px] backdrop-blur-sm"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {room.roomType}
                  </span>
                </div>

                {/* Room Number Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 z-10">
                  <Bed className="w-4 h-4 text-white" />
                  <span
                    className="text-sm font-semibold leading-5 text-white"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Room {room.roomNumber} - {room.roomType}
                  </span>
                </div>

                {/* Available Room Icon - Only show if no image */}
                {room.status === "available" &&
                  (!room.image || room.image === "/placeholder-room.jpg") && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5f5f5] rounded-full p-3 z-10">
                      <Bed className="w-6 h-6 text-[#535862]" />
                    </div>
                  )}
              </div>

              {/* Room Details */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <h3
                    className="text-base font-semibold leading-6 text-black"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {room.guestName || "No Guest Assigned"}
                  </h3>
                  <p
                    className="text-sm font-normal leading-5 text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {room.checkIn && room.checkOut
                      ? `${room.checkIn} - ${room.checkOut}`
                      : "Ready for booking"}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-lg font-semibold leading-7 text-blue-600"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    ${room.pricePerNight}
                  </span>
                  <span
                    className="text-sm font-normal leading-5 text-blue-600"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    /night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-normal leading-[18px] text-[#717680]">
                  <span style={{ fontFamily: "Geist, sans-serif" }}>
                    {room.guests} guests
                  </span>
                  <span className="w-1 h-1 bg-[#a4a7ae] rounded-full" />
                  <span style={{ fontFamily: "Geist, sans-serif" }}>
                    {room.bedType}
                  </span>
                  <span className="w-1 h-1 bg-[#a4a7ae] rounded-full" />
                  <span style={{ fontFamily: "Geist, sans-serif" }}>
                    {room.view}
                  </span>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => {
                  setSelectedRoom(room);
                  setShowModal(true);
                }}
                className="w-full h-10 px-4 py-2.5 bg-[#e9f0fd] border border-[#e9f0fd] rounded-[50px] shadow-sm hover:bg-[#d3e0fb] transition-colors"
              >
                <span
                  className="text-sm font-semibold leading-5 text-[#19429d]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  View Details
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Room Details Modal */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-200 p-4">
          <div className="bg-white rounded-3xl p-4 max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#f0f5fe] p-4 rounded-lg mb-5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-blue-600" />
                <p
                  className="text-sm font-semibold leading-5 text-blue-600"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Room {selectedRoom.roomNumber} - {selectedRoom.roomType}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-4 h-4 text-blue-600 hover:text-blue-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Stage */}
            <div className="mb-5 px-4">
              <p
                className="text-sm font-normal leading-5 text-[#414651] mb-2"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Current Stage
              </p>
              <span
                className={`inline-flex ${
                  getStatusBadge(selectedRoom.status).bg
                } ${
                  getStatusBadge(selectedRoom.status).text
                } px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px]`}
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {getStatusBadge(selectedRoom.status).label}
              </span>
            </div>

            {/* Guest Information */}
            <div className="bg-[#fcfdff] border border-[#f0f5fe] rounded-lg p-4 mb-5">
              <div className="flex items-center gap-3 mb-0 h-11">
                <User className="w-5 h-5 text-[#717680] shrink-0" />
                <div>
                  <p
                    className="text-sm font-normal leading-5 text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Guest Name
                  </p>
                  <p
                    className="text-base font-normal leading-6 text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedRoom.guestName || "No Guest Assigned"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-0 h-11">
                <Phone className="w-5 h-5 text-[#717680] shrink-0" />
                <div>
                  <p
                    className="text-sm font-normal leading-5 text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Phone
                  </p>
                  <p
                    className="text-base font-normal leading-6 text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    +1 234-567-8901
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 h-11">
                <Mail className="w-5 h-5 text-[#717680] shrink-0" />
                <div>
                  <p
                    className="text-sm font-normal leading-5 text-[#717680]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-base font-normal leading-6 text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    sarah.miller@techcorp.com
                  </p>
                </div>
              </div>
            </div>

            {/* AI Guest Behavior Analysis */}
            <div className="border-2 border-[#e9f0fd] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-600 rounded-lg p-3 flex items-center justify-center">
                  <Stars className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="text-base font-medium leading-6 text-[#181d27] mb-1"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    AI Guest Behavior Analysis
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-white border border-[#d3e0fb] px-2 py-1 rounded text-sm leading-5 text-blue-600">
                      Business Traveler
                    </span>
                    <p
                      className="text-xs font-normal leading-[18px] text-[#717680]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      87% confidence
                    </p>
                  </div>
                </div>
              </div>

              {/* Analysis Details Grid */}
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <p
                      className="text-xs font-normal leading-[18px] text-[#717680] mb-1"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Booking Pattern
                    </p>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Weekday booking (Mon-Thu)
                    </p>
                  </div>
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <p
                      className="text-xs font-normal leading-[18px] text-[#717680] mb-1"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Check-in Time
                    </p>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Early morning (7:30 AM)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <p
                      className="text-xs font-normal leading-[18px] text-[#717680] mb-1"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Stay Duration
                    </p>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      4 nights - typical business trip
                    </p>
                  </div>
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <p
                      className="text-xs font-normal leading-[18px] text-[#717680] mb-1"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Email Type
                    </p>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Corporate (@techcorp.com)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Coffee className="w-4 h-4 text-[#717680]" />
                      <p
                        className="text-xs font-normal leading-[18px] text-[#717680]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        Booking Pattern
                      </p>
                    </div>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Business center (3x), Coffee bar (daily)
                    </p>
                  </div>
                  <div className="bg-white/80 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Coffee className="w-4 h-4 text-[#717680]" />
                      <p
                        className="text-xs font-normal leading-[18px] text-[#717680]"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        Room Service Pattern
                      </p>
                    </div>
                    <p
                      className="text-sm font-normal leading-5 text-[#181d27]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Early breakfast, minimal dinner orders
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#ecfdf3] border border-[#039855] rounded-lg p-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#039855]" />
                  <p
                    className="text-sm font-normal leading-5 text-[#05603a]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Room Service Pattern
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#f6fef9] border border-[#12b76a] px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px] text-[#027a48]">
                    Wake-up call at 6 AM
                  </span>
                  <span className="bg-[#f6fef9] border border-[#12b76a] px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px] text-[#027a48]">
                    Iron & ironing board
                  </span>
                  <span className="bg-[#f6fef9] border border-[#12b76a] px-2 py-0.5 rounded-2xl text-xs font-medium leading-[18px] text-[#027a48]">
                    Business center access
                  </span>
                </div>
              </div>

              {/* How we classify */}
              <div className="bg-white/50 border border-[#d3e0fb] rounded-lg px-4 py-2">
                <p
                  className="text-xs font-normal leading-[18px] text-[#717680]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  <span className="font-bold">How we classify: </span>
                  AI analyzes booking source, check-in times, stay duration,
                  amenity usage, email domain, and service patterns to segment
                  guests as Business, Leisure, or Events travelers.
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-6">
              <p
                className="text-sm font-normal leading-5 text-[#181d27] mb-4"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Booking Details
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#717680]" />
                    <p
                      className="text-sm font-normal leading-5 text-[#717680]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Check-in
                    </p>
                  </div>
                  <p
                    className="text-base font-normal leading-6 text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedRoom.checkIn || "N/A"}
                  </p>
                </div>
                <div className="bg-slate-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#717680]" />
                    <p
                      className="text-sm font-normal leading-5 text-[#717680]"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Check-out
                    </p>
                  </div>
                  <p
                    className="text-base font-normal leading-6 text-[#181d27]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {selectedRoom.checkOut || "N/A"}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 border border-blue-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#717680]" />
                  <div>
                    <p
                      className="text-sm font-normal leading-5 text-[#717680] mb-1"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Digital Key PIN
                    </p>
                    <p
                      className="text-base font-normal leading-6 text-[#181d27] text-center"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      ****-201
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDeleteRoom(selectedRoom.id)}
                className="flex items-center justify-center gap-2 h-12 px-5 py-3 bg-[#fef3f2] border border-[#fef3f2] rounded-[50px] shadow-sm hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-[#b42318]" />
                <span
                  className="text-base font-semibold leading-6 text-[#b42318]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Delete
                </span>
              </button>
              <button
                onClick={() => {
                  const backendRoom = selectedRoom.backendRoom;
                  setEditFormData({
                    number: backendRoom.number,
                    alphabet: backendRoom.alphabet,
                    category: backendRoom.category,
                    price: parseFloat(formatPrice(backendRoom.price)),
                    maxGuest: backendRoom.maxGuest,
                    bedType: backendRoom.bedType,
                    oceanView: backendRoom.oceanView,
                    status: backendRoom.status,
                    images: backendRoom.images || [],
                  });
                  setShowEditModal(true);
                }}
                className="flex items-center justify-center gap-2 h-12 px-5 py-3 bg-blue-600 border border-blue-600 rounded-[50px] shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-5 h-5 text-white" />
                <span
                  className="text-base font-semibold leading-6 text-white"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Edit
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-white rounded-xl max-w-[480px] w-full p-6 shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-lg font-semibold leading-7 text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Update room details
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#181d27] hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-5 mb-8">
              {/* Room Number */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Room Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={editFormData.number || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
<<<<<<< Updated upstream
                      number: parseInt(e.target.value) || 0,
=======
                      roomNumber: e.target.value,
>>>>>>> Stashed changes
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              {/* Alphabet */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Alphabet
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={editFormData.alphabet}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      alphabet: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
<<<<<<< Updated upstream
                        category: e.target.value,
=======
                        roomType: e.target.value,
>>>>>>> Stashed changes
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a4a7ae] pointer-events-none" />
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Price per Night ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editFormData.price || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              {/* Max Guests */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Max Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={editFormData.maxGuest || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      maxGuest: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>

              {/* Bed Type */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Bed Type
                </label>
                <div className="relative">
                  <select
                    value={editFormData.bedType}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        bedType: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                    <option value="twin">Twin</option>
                    <option value="double">Double</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a4a7ae] pointer-events-none" />
                </div>
              </div>

              {/* Ocean View */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editOceanView"
                  checked={editFormData.oceanView}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      oceanView: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="editOceanView"
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Ocean View
                </label>
              </div>

              {/* Room Status */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Room Status
                </label>
                <div className="relative">
                  <select
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
<<<<<<< Updated upstream
                        status: e.target.value,
=======
                        roomStatus: e.target.value,
>>>>>>> Stashed changes
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-sm text-base leading-6 text-[#181d27] outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unserviceable">Unserviceable</option>
                    <option value="disabled">Disabled</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a4a7ae] pointer-events-none" />
                </div>
              </div>
<<<<<<< Updated upstream
=======

              {/* Clean Status */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Clean Status
                </label>
                <div className="relative">
                  <select
                    value={editFormData.cleanStatus}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        cleanStatus: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] text-base leading-6 text-[#717680] outline-none appearance-none cursor-pointer"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option value="Clean">Clean</option>
                    <option value="Dirty">Dirty</option>
                    <option value="Inspected">Inspected</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a4a7ae] pointer-events-none" />
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium leading-5 text-[#414651]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Price
                </label>
                <input
                  type="text"
                  value={editFormData.price}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, price: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d5d7da] rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] text-base leading-6 text-[#181d27] outline-none"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
              </div>
>>>>>>> Stashed changes
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-5 py-3 bg-[#e9f0fd] border border-[#e9f0fd] rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-[#d3e0fb] transition-colors"
              >
                <span
                  className="text-base font-semibold leading-6 text-[#19429d]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Cancel
                </span>
              </button>
              <button
                onClick={handleUpdateRoom}
                className="flex-1 px-5 py-3 bg-blue-600 border border-blue-600 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-blue-700 transition-colors"
              >
                <span
                  className="text-base font-semibold leading-6 text-white"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Save Changes
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
