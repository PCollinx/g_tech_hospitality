"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Bath,
  Wine,
  Users,
  Bed,
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { storage } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignUpDialog from "@/components/SignUpDialog";
import LoginDialog from "@/components/LoginDialog";

interface Room {
  _id: string;
  number: number;
  alphabet: string;
  category: string;
  price: number;
  maxGuest: number;
  bedType: string;
  oceanView: boolean;
  isBooked: boolean;
  status: string;
  images: string[];
}

interface BookingData {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  roomPrice: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConfirmPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchRoom();
    loadBookingData();
  }, [roomId]);

  const checkAuth = () => {
    const token = storage.getAccessToken();
    const user = storage.getUser();
    setIsAuthenticated(!!token && !!user);
  };

  const fetchRoom = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/rooms/${roomId}`);
      const roomData =
        response.data.doc || response.data.data?.room || response.data.data;
      if (!roomData) {
        toast.error("Room not found");
        router.push("/rooms");
        return;
      }
      setRoom(roomData);
    } catch (error: any) {
      console.error("Error fetching room:", error);
      toast.error("Failed to load room details");
      router.push("/rooms");
    } finally {
      setLoading(false);
    }
  };

  const loadBookingData = () => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.roomId === roomId) {
          setBookingData(data);
        } else {
          toast.error("Booking data mismatch. Please start over.");
          router.push(`/rooms/${roomId}/select-date`);
        }
      } catch (error) {
        console.error("Error parsing booking data:", error);
        router.push(`/rooms/${roomId}/select-date`);
      }
    } else {
      toast.error("No booking data found. Please select dates first.");
      router.push(`/rooms/${roomId}/select-date`);
    }
  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      setShowSignUp(true);
      return;
    }

    if (!bookingData || !room) {
      toast.error("Missing booking information");
      return;
    }

    try {
      setCreating(true);

      // Calculate total price in cents (backend expects price in cents)
      const totalPriceInCents = Math.round(bookingData.totalPrice * 100);

      const bookingPayload = {
        room: room._id,
        startDate: new Date(bookingData.checkIn).toISOString(),
        endDate: new Date(bookingData.checkOut).toISOString(),
        totalPrice: totalPriceInCents,
        paymentMethod: "online payment", // Default payment method
        paymentName:
          storage.getUser()?.firstName + " " + storage.getUser()?.lastName ||
          "Guest",
      };

      const response = await axiosInstance.post("/bookings", bookingPayload);

      // Clear booking data from sessionStorage
      sessionStorage.removeItem("bookingData");

      toast.success("Booking confirmed successfully!");

      // Redirect to booking confirmation page or dashboard
      const bookingId =
        response.data.data?.booking?._id || response.data.data?._id;
      if (bookingId) {
        router.push(
          `/rooms/booking-code?code=${
            response.data.data?.booking?.confirmationCode ||
            response.data.data?.confirmationCode
          }`
        );
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create booking. Please try again.";
      toast.error(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoomName = (room: Room) => {
    const categoryMap: { [key: string]: string } = {
      standard: "Standard Room",
      deluxe: "Deluxe Room",
      suite: "Suite",
    };
    return `${categoryMap[room.category] || room.category} ${room.alphabet}${
      room.number
    }`;
  };

  const getRoomDescription = (room: Room) => {
    return `Comfortable ${room.category} room with ${
      room.bedType
    } bed, perfect for ${room.maxGuest} guest${room.maxGuest > 1 ? "s" : ""}.`;
  };

  // Calculate taxes (10% of total price)
  const taxesAndFees = bookingData ? bookingData.totalPrice * 0.1 : 0;
  const grandTotal = bookingData ? bookingData.totalPrice + taxesAndFees : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!room || !bookingData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Booking information not found
            </h1>
            <Link href={`/rooms/${roomId}/select-date`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Select Dates
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 pt-32 pb-16">
          {/* Back Button */}
          <Link
            href={`/rooms/${roomId}/select-date`}
            className="inline-flex items-center gap-4 text-black hover:text-gray-700 mb-8 sm:mb-12 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base font-normal">Back</span>
          </Link>

          {/* 3-Step Progress - All Complete */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-14 mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Reserve Room
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Select Date
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Confirm
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[44px] tracking-[-0.72px] text-black mb-1">
              Review Booking
            </h1>
            <p className="text-sm sm:text-base text-[#717680]">
              Confirm booking to secure room
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[687px_1fr] gap-8 lg:gap-5">
            {/* Left Column - Summary */}
            <div className="flex flex-col gap-6">
              {/* Room Summary Card */}
              <div className="flex gap-5">
                <div className="relative w-[182px] h-[123px] rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={room.images?.[0] || "/placeholder-room.jpg"}
                    alt={getRoomName(room)}
                    fill
                    className="object-cover"
                    sizes="182px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col text-base leading-6">
                    <p className="font-semibold text-black">
                      {getRoomName(room)}
                    </p>
                    <p className="text-[#717680]">
                      {formatDate(bookingData.checkIn)} →{" "}
                      {formatDate(bookingData.checkOut)}
                    </p>
                  </div>
                  <p className="text-xs text-[#717680]">
                    {bookingData.guests} Guest
                    {bookingData.guests !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">
                    ${formatPrice(room.price)} × {bookingData.nights} night
                    {bookingData.nights !== 1 ? "s" : ""}
                  </p>
                  <p className="font-medium text-[#414651]">
                    ${bookingData.totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">Taxes & fees</p>
                  <p className="font-medium text-[#414651]">
                    ${taxesAndFees.toFixed(2)}
                  </p>
                </div>
                <div className="h-px bg-[#d5d7da] my-1" />
                <div className="flex items-center justify-between text-base">
                  <p className="text-[#717680]">Total</p>
                  <p className="font-semibold text-[#181d27]">
                    ${grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link href={`/rooms/${roomId}/select-date`} className="w-full">
                  <Button
                    variant="outline"
                    disabled={creating}
                    className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d0e1fc] hover:border-[#d0e1fc] font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={creating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Confirming...
                    </>
                  ) : isAuthenticated ? (
                    "Confirm Booking"
                  ) : (
                    "Sign In to Confirm"
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column - Room Details Card */}
            <div className="flex flex-col gap-6">
              {/* Room Image */}
              <div className="relative w-full h-[275px] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={room.images?.[0] || "/placeholder-room.jpg"}
                  alt={getRoomName(room)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 485px"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Room Details */}
              <div className="flex flex-col gap-4">
                {/* Basic Info */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-[#181d27]">{getRoomName(room)}</p>
                  <p className="text-base text-[#717680]">
                    ${formatPrice(room.price)} per night
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#717680]" />
                    <span className="text-xs text-[#717680]">
                        Up to {room.maxGuest} guest
                        {room.maxGuest > 1 ? "s" : ""}
                    </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#a4a7ae]" />
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-[#717680]" />
                      <span className="text-xs text-[#717680] capitalize">
                        {room.bedType} bed
                      </span>
                    </div>
                    {room.oceanView && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-[#a4a7ae]" />
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-[#717680]" />
                    <span className="text-xs text-[#717680]">
                            Ocean View
                    </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg text-[#181d27]">
                    Description
                  </p>
                  <p className="text-base text-[#717680]">
                    {getRoomDescription(room)}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl text-[#181d27]">
                    Highlights
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Premium WiFi
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Coffee maker
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">Smart TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Smart climate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">
                        Modern bathroom
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="w-[18px] h-[18px] text-black" />
                      <span className="text-xs text-[#252b37]">Mini bar</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Check-in</p>
                    <p className="font-medium text-[#414651]">
                      {formatDate(bookingData.checkIn)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Check-out</p>
                    <p className="font-medium text-[#414651]">
                      {formatDate(bookingData.checkOut)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Nights</p>
                    <p className="font-medium text-[#414651]">
                      {bookingData.nights}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[#717680]">Taxes & fees</p>
                    <p className="font-medium text-[#414651]">
                      ${taxesAndFees.toFixed(2)}
                    </p>
                  </div>
                  <div className="h-px bg-[#d5d7da] my-1" />
                  <div className="flex items-center justify-between text-base">
                    <p className="text-[#717680]">Total</p>
                    <p className="font-semibold text-[#181d27]">
                      ${grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      {/* Sign Up Dialog */}
      <SignUpDialog
        open={showSignUp}
        onOpenChange={(open) => {
          setShowSignUp(open);
          if (!open) {
            checkAuth();
          }
        }}
        onSwitchToLogin={() => {
          setShowSignUp(false);
          setTimeout(() => setShowLogin(true), 300);
        }}
      />

      {/* Login Dialog */}
      <LoginDialog
        open={showLogin}
        onOpenChange={(open) => {
          setShowLogin(open);
          if (!open) {
            checkAuth();
          }
        }}
        onSwitchToSignUp={() => {
          setShowLogin(false);
          setTimeout(() => setShowSignUp(true), 300);
        }}
      />
    </>
  );
}
