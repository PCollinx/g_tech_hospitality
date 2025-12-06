"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SelectDatePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    calculateNights();
  }, [checkIn, checkOut, room]);

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

  const calculateNights = () => {
    if (!checkIn || !checkOut || !room) {
      setNights(0);
      setTotalPrice(0);
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setNights(0);
      setTotalPrice(0);
      return;
    }

    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const calculatedNights = diffDays;
    const calculatedTotal = (room.price / 100) * calculatedNights;

    setNights(calculatedNights);
    setTotalPrice(calculatedTotal);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleContinue = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    if (nights <= 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const guestCount = parseInt(guests);
    if (!guestCount || guestCount < 1) {
      toast.error("Please enter a valid number of guests");
      return;
    }

    if (room && guestCount > room.maxGuest) {
      toast.error(
        `This room can only accommodate up to ${room.maxGuest} guests`
      );
      return;
    }

    setNavigating(true);

    // Store booking data in sessionStorage to pass to confirm page
    const bookingData = {
      roomId,
      checkIn,
      checkOut,
      guests: guestCount,
      nights,
      totalPrice,
      roomPrice: room?.price || 0,
    };
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

    router.push(`/rooms/${roomId}/confirm`);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = checkIn || today;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading room details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Room not found
            </h1>
            <Link href="/rooms">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Rooms
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
            href={`/rooms/${roomId}`}
            className="inline-flex items-center gap-4 text-black hover:text-gray-700 mb-8 sm:mb-12 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base font-normal">Back</span>
          </Link>

          {/* 3-Step Progress */}
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
              <p className="font-medium text-xs sm:text-sm lg:text-base text-[#717680]">
                Confirm
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-[#e9f0fd] rounded-[24px]" />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[44px] tracking-[-0.72px] text-black mb-1">
              Choose Your Dates
            </h1>
            <p className="text-sm sm:text-base text-[#717680]">
              Select your check-in and check-out dates
            </p>
          </div>

          {/* Date Selection Form */}
          <div className="max-w-[788px]">
            <div className="flex flex-col gap-6 mb-6">
              {/* Check-In and Check-Out Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Check-In */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="check-in"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Check-In
                  </label>
                  <input
                    type="date"
                    id="check-in"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  {checkIn && (
                    <p className="text-sm text-[#535862]">
                      {formatDate(checkIn)}
                    </p>
                  )}
                </div>

                {/* Check-Out */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="check-out"
                    className="font-medium text-sm text-[#414651]"
                  >
                    Check-Out
                  </label>
                  <input
                    type="date"
                    id="check-out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={minCheckOut}
                    className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  {checkOut && (
                    <p className="text-sm text-[#535862]">
                      {formatDate(checkOut)}
                    </p>
                  )}
                </div>
              </div>

              {/* Stay Summary */}
              {nights > 0 && (
                <div className="flex flex-col gap-2 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-base">
                    <p className="text-blue-600">Total length of stay</p>
                    <p className="font-medium text-black">
                      {nights} night{nights !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-blue-600">Price per night</p>
                    <p className="font-medium text-black">
                      ${formatPrice(room.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-blue-600">Total price</p>
                    <p className="font-medium text-black">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Guests Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="guests"
                  className="font-medium text-sm text-[#414651]"
                >
                  Number of Guests (Max: {room.maxGuest})
                </label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max={room.maxGuest}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 text-base text-[#181d27] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Link href={`/rooms/${roomId}`} className="w-full">
                <Button
                  variant="outline"
                  disabled={navigating}
                  className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d0e1fc] hover:border-[#d0e1fc] font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
                >
                  Back
                </Button>
              </Link>
              <Button
                onClick={handleContinue}
                disabled={nights <= 0 || !checkIn || !checkOut || navigating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] flex items-center justify-center gap-2"
              >
                {navigating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
