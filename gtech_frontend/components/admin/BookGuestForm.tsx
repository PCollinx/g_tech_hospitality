"use client";

import { useState } from "react";
import {
  X,
  Loader2,
  Calendar,
  User,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import { StaffRegisterGuestData } from "@/lib/hooks/useStaff";
import RoomSelectionModal from "./RoomSelectionModal";
import { Room } from "@/lib/hooks/useRooms";
import { formatPrice } from "@/lib/utils/roomUtils";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";

interface BookGuestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookGuestForm({
  isOpen,
  onClose,
  onSuccess,
}: BookGuestFormProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"guest" | "booking">("guest");
  const [showRoomModal, setShowRoomModal] = useState(false);

  const [guestData, setGuestData] = useState<StaffRegisterGuestData>({
    firstName: "",
    lastName: "",
    NIN: "",
    phone: "",
    email: "",
    address: "",
  });

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    selectedRoom: null as Room | null,
    paymentMethod: "cash" as
      | "cash"
      | "transfer"
      | "card"
      | "POS"
      | "online payment",
    paymentName: "",
  });

  if (!isOpen) return null;

  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights(bookingData.startDate, bookingData.endDate);
  const totalPrice = bookingData.selectedRoom
    ? bookingData.selectedRoom.price * nights
    : 0;

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestData.firstName || !guestData.lastName) {
      toast.error("First name and last name are required");
      return;
    }

    if (!guestData.NIN) {
      toast.error("NIN is required");
      return;
    }

    if (!guestData.phone) {
      toast.error("Phone number is required");
      return;
    }

    setStep("booking");
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!bookingData.selectedRoom) {
        toast.error("Please select a room");
        setLoading(false);
        return;
      }

      if (!bookingData.startDate || !bookingData.endDate) {
        toast.error("Please select check-in and check-out dates");
        setLoading(false);
        return;
      }

      if (nights < 1) {
        toast.error("Check-out date must be after check-in date");
        setLoading(false);
        return;
      }

      const bookingPayload = {
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        NIN: guestData.NIN,
        phone: guestData.phone,
        email: guestData.email || undefined,
        address: guestData.address || undefined,
        room: bookingData.selectedRoom._id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice: totalPrice,
        paymentMethod: bookingData.paymentMethod,
        paymentName:
          bookingData.paymentName ||
          `${guestData.firstName} ${guestData.lastName}`,
      };

      const response = await axiosInstance.post(
        "/bookings/staff-booking",
        bookingPayload
      );

      const isNewGuest = response.data.data?.guest?.isNewGuest;
      if (isNewGuest) {
        toast.success("New guest account created and booking confirmed!");
      } else {
        toast.success("Booking confirmed for existing guest!");
      }

      onSuccess?.();
      onClose();
      resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create booking";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGuestData({
      firstName: "",
      lastName: "",
      NIN: "",
      phone: "",
      email: "",
      address: "",
    });
    setBookingData({
      startDate: "",
      endDate: "",
      selectedRoom: null,
      paymentMethod: "cash",
      paymentName: "",
    });
    setStep("guest");
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div>
              <h2
                className="text-lg font-semibold leading-7 text-[#181d27]"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                {step === "guest" ? "Register Guest" : "Create Booking"}
              </h2>
              <p
                className="text-sm text-gray-600 mt-1"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {step === "guest"
                  ? "Enter guest information"
                  : "Select room and payment details"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-[#181d27] hover:text-gray-700 transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2">
              <div
                className={`flex-1 h-2 rounded-full ${
                  step === "guest" ? "bg-blue-600" : "bg-blue-600"
                }`}
              />
              <div
                className={`flex-1 h-2 rounded-full ${
                  step === "booking" ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          {/* Guest Information Form */}
          {step === "guest" && (
            <form onSubmit={handleGuestSubmit} className="p-6 space-y-5">
              {/* First Name */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={guestData.firstName}
                    onChange={(e) =>
                      setGuestData({ ...guestData, firstName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={guestData.lastName}
                    onChange={(e) =>
                      setGuestData({ ...guestData, lastName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* NIN */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  NIN (National Identification Number) *
                </label>
                <input
                  type="text"
                  required
                  value={guestData.NIN}
                  onChange={(e) =>
                    setGuestData({ ...guestData, NIN: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                  placeholder="Enter NIN"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={guestData.phone}
                    onChange={(e) =>
                      setGuestData({ ...guestData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={guestData.email}
                    onChange={(e) =>
                      setGuestData({ ...guestData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                    placeholder="Enter email (optional)"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Address (Optional)
                </label>
                <input
                  type="text"
                  value={guestData.address}
                  onChange={(e) =>
                    setGuestData({ ...guestData, address: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "Geist, sans-serif" }}
                  placeholder="Enter address (optional)"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
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
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Continue
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* Booking Form */}
          {step === "booking" && (
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 mb-1.5 block"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Check-in Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={bookingData.startDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          startDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 mb-1.5 block"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Check-out Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={bookingData.endDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          endDate: e.target.value,
                        })
                      }
                      min={
                        bookingData.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    />
                  </div>
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Select Room *
                </label>
                {bookingData.selectedRoom ? (
                  <div className="p-4 border border-blue-500 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {bookingData.selectedRoom.alphabet}
                          {bookingData.selectedRoom.number} -{" "}
                          {bookingData.selectedRoom.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${formatPrice(bookingData.selectedRoom.price)} per
                          night
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowRoomModal(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!bookingData.startDate || !bookingData.endDate) {
                        toast.error(
                          "Please select check-in and check-out dates first"
                        );
                        return;
                      }
                      setShowRoomModal(true);
                    }}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-600"
                  >
                    Click to select a room
                  </button>
                )}
              </div>

              {/* Booking Summary */}
              {bookingData.selectedRoom && nights > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">{nights} night(s)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per night:</span>
                    <span className="font-medium">
                      ${formatPrice(bookingData.selectedRoom.price)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ${formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Payment Method *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    required
                    value={bookingData.paymentMethod}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        paymentMethod: e.target.value as any,
                      })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer</option>
                    <option value="POS">POS</option>
                    <option value="card">Card</option>
                    <option value="online payment">Online Payment</option>
                  </select>
                </div>
              </div>

              {/* Payment Name (if not cash) */}
              {bookingData.paymentMethod !== "cash" && (
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 mb-1.5 block"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Payment Name (Name on card/account)
                  </label>
                  <input
                    type="text"
                    value={bookingData.paymentName}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        paymentName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geist, sans-serif" }}
                    placeholder="Enter name on payment method"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("guest")}
                  className="flex-1 px-5 py-3 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  <span
                    className="text-base font-semibold text-gray-700"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Back
                  </span>
                </button>
                <button
                  type="submit"
                  className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  disabled={loading || !bookingData.selectedRoom}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span
                      className="text-base font-semibold"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Complete Booking
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Room Selection Modal */}
      <RoomSelectionModal
        isOpen={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        onSelectRoom={(room) => {
          setBookingData({ ...bookingData, selectedRoom: room });
        }}
        startDate={bookingData.startDate}
        endDate={bookingData.endDate}
      />
    </>
  );
}
