"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Users, Info, Download, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

interface Booking {
  _id: string;
  confirmationCode: string;
  room: {
    _id: string;
    number: number;
    alphabet: string;
    category: string;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  accessPin?: string;
}

export default function BookingCodePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (code) {
      fetchBooking();
    } else {
      toast.error("No confirmation code provided");
      router.push("/rooms");
    }
  }, [code]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/bookings/confirmation/${code}`
      );
      const bookingData =
        response.data.data?.booking || response.data.data || response.data.doc;
      if (!bookingData) {
        toast.error("Booking not found");
        router.push("/rooms");
        return;
      }
      setBooking(bookingData);
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to load booking details";
      toast.error(errorMessage);
      router.push("/rooms");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatFullDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoomName = (room: any) => {
    if (!room) return "N/A";
    const categoryMap: { [key: string]: string } = {
      standard: "Standard Room",
      deluxe: "Deluxe Room",
      suite: "Suite",
    };
    return `${categoryMap[room.category] || room.category} ${room.alphabet}${
      room.number
    }`;
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);

      if (!booking) {
        toast.error("No booking data available");
        setDownloading(false);
        return;
      }

      // Dynamically import jsPDF (required for Next.js)
      const { default: jsPDF } = await import("jspdf");

      // Calculate nights
      const calculateNights = (start: string, end: string) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      };

      const nights = calculateNights(booking.startDate, booking.endDate);

      // Create PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Header with blue background
      doc.setFillColor(37, 99, 235); // Blue-600
      doc.rect(0, 0, pageWidth, 50, "F");

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Luxe Haven", pageWidth / 2, 25, { align: "center" });

      doc.setFontSize(16);
      doc.text("Booking Confirmation", pageWidth / 2, 35, { align: "center" });

      yPos = 60;

      // Confirmation Code (highlighted)
      doc.setFillColor(219, 234, 254); // Blue-100
      doc.rect(margin, yPos, pageWidth - 2 * margin, 20, "F");
      doc.setTextColor(25, 58, 157); // Blue-900
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Confirmation Code", margin + 5, yPos + 8);
      doc.setFontSize(20);
      doc.text(booking.confirmationCode || "", pageWidth / 2, yPos + 18, {
        align: "center",
      });

      yPos += 35;

      // Reset text color
      doc.setTextColor(0, 0, 0);

      // Booking Details Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Booking Details", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      const details = [
        ["Room", getRoomName(booking.room)],
        ["Check-in", formatFullDate(booking.startDate || "")],
        ["Check-out", formatFullDate(booking.endDate || "")],
        ["Nights", `${nights} night${nights !== 1 ? "s" : ""}`],
        ["Total Price", `$${((booking.totalPrice || 0) / 100).toFixed(2)}`],
      ];

      details.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, margin, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(value, margin + 50, yPos);
        yPos += 8;
      });

      yPos += 5;

      // Guest Information Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Guest Information", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Name: ${booking?.user?.firstName || ""} ${
          booking?.user?.lastName || ""
        }`,
        margin,
        yPos
      );
      yPos += 8;
      doc.text(`Email: ${booking?.user?.email || ""}`, margin, yPos);
      yPos += 15;

      // Important Information
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Important Information", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Check-in time: 3:00 PM", margin, yPos);
      yPos += 8;
      doc.text("Check-out time: 11:00 AM", margin, yPos);
      yPos += 8;
      doc.text("WiFi Network: Luxe_Haven_Premium", margin, yPos);
      yPos += 15;

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(113, 113, 122); // Gray-500
      doc.text(
        "Thank you for choosing Luxe Haven!",
        pageWidth / 2,
        pageHeight - 20,
        { align: "center" }
      );
      doc.text(
        "For any inquiries, please contact our support team.",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );

      // Save PDF
      doc.save(`booking-${booking?.confirmationCode}.pdf`);
      toast.success("Booking confirmation downloaded as PDF");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Failed to download booking details");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pb-0 mt-24 md:mt-32">
          <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading booking details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pb-0 mt-24 md:mt-32">
          <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Booking not found
              </h1>
              <Button
                onClick={() => router.push("/rooms")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Browse Rooms
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate nights
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const nights = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-0 mt-24 md:mt-32">
        {/* Main Container */}
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
          {/* Card Container with Floating Success Icon */}
          <div className="relative">
            {/* Success Icon - Overlaying top border */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-20 ">
              <div className="bg-[#d3e0fb] p-7 rounded-full">
                <div className="bg-blue-600 p-8 rounded-full">
                  <Check className="w-14 h-14 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="relative bg-white border border-blue-600 rounded-3xl overflow-hidden pt-16">
              {/* Decorative Elements */}
              <div className="absolute left-4 top-9 w-[120px] h-[130px] md:left-11 md:w-[181.529px] md:h-[198.119px] pointer-events-none hidden sm:block">
                <div className="relative w-full h-full">
                  <Image
                    src="/vector-left.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="absolute right-4 top-9 w-[120px] h-[130px] md:right-11 md:w-[181.529px] md:h-[198.119px] pointer-events-none hidden sm:block">
                <div className="relative w-full h-full">
                  <Image
                    src="/vector-right.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2">
                    Payment Successful, Welcome to Luxe Haven!
                  </h1>
                  <p className="text-[#717680] text-base mb-4">
                    Your room is ready and waiting for you
                  </p>

                  {/* Booking Info */}
                  <div className="flex items-center justify-center gap-4 text-sm text-[#717680]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(booking.startDate)} -{" "}
                        {formatDate(booking.endDate)}
                      </span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a4a7ae]" />
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {nights} Night{nights !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-1 bg-neutral-100 rounded-full mb-8" />

                {/* Room and Access Cards */}
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  {/* Assigned Room */}
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-[#0c214e]">
                      Assigned Room
                    </h2>
                    <div className="bg-[#e9f0fd] rounded-3xl h-[192px] flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <p className="text-[#717680] text-base">YOUR ROOM</p>
                        <p className="text-blue-600 text-5xl font-semibold tracking-tight leading-none my-2">
                          {booking.room?.alphabet || ""}
                          {booking.room?.number || ""}
                        </p>
                        <p className="text-[#717680] text-base mb-3">
                          {booking.room?.category
                            ? booking.room.category.charAt(0).toUpperCase() +
                              booking.room.category.slice(1)
                            : "Room"}
                        </p>
                        <span className="inline-block bg-[#e9f0fd] border border-[#19429d]/20 text-[#19429d] text-sm font-medium px-3 py-1 rounded-full">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Access */}
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-[#0c214e]">
                      Confirmation Code
                    </h2>
                    <div className="bg-blue-600 rounded-3xl h-[192px] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800" />
                      </div>

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <p className="text-white text-base">Booking Code</p>
                          <span className="inline-block bg-[#ecfdf3] text-[#027a48] text-xs font-medium px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-white text-5xl font-semibold tracking-tight leading-none my-2">
                          {booking.confirmationCode}
                        </p>
                        <p className="text-[#e9f0fd] text-base">
                          Keep this code for your records
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="border border-blue-600 rounded-3xl p-4 sm:p-6 mb-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-[#d3e0fb] p-2 rounded-full">
                      <div className="bg-blue-600 p-2 rounded-full">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <h3 className="text-sm sm:text-base font-medium text-black text-center">
                        Important Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 text-center">
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            Check-in time
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            3:00 PM
                          </p>
                        </div>
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            Check-out time
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            11:00 AM
                          </p>
                        </div>
                        <div>
                          <p className="text-[#535862] font-medium text-sm sm:text-base mb-1 sm:mb-2">
                            Total Price
                          </p>
                          <p className="text-[#717680] text-sm sm:text-base">
                            ${((booking.totalPrice || 0) / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    variant="outline"
                    className="w-full bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d3e0fb] font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Details
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] min-h-[56px]"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
