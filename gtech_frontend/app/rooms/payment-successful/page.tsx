"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Bed,
  Eye,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Download,
  ChevronLeft,
  Info,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoomById } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoomDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = parseInt(resolvedParams.id);
  const room = getRoomById(roomId);

  if (!room) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Room not found
            </h1>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Mock booking data
  const checkIn = "Sep 22";
  const checkOut = "Sep 25";
  const nights = 3;
  const taxesAndFees = 1200;
  const totalCost = room.price * nights + taxesAndFees;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Success Banner */}
        <section className="relative w-full bg-white border border-blue-600 mt-32 mb-8">
          <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-24 relative">
            {/* Decorative elements */}
            <div className="absolute left-[97px] top-[36px] w-[196px] h-[186px] opacity-20">
              <div className="w-full h-full rotate-[50deg] bg-gradient-to-br from-blue-400 to-purple-400 blur-3xl rounded-full" />
            </div>
            <div className="absolute right-[100px] top-[36px] w-[181px] h-[198px] opacity-20">
              <div className="w-full h-full rotate-[144deg] bg-gradient-to-br from-blue-400 to-purple-400 blur-3xl rounded-full" />
            </div>

            {/* Success Icon */}
            <div className="absolute left-1/2 top-[46px] -translate-x-1/2 bg-[#d3e0fb] p-7 rounded-full">
              <div className="bg-blue-600 p-8 rounded-full">
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-1 pt-32 text-center">
              <h1 className="text-3xl font-semibold text-blue-600 mb-2">
                Payment Successful, Welcome to Luxe Haven!
              </h1>
              <p className="text-gray-500 text-base mb-4">
                Your room is ready and waiting for you
              </p>

              {/* Booking Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {checkIn} - {checkOut}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{room.guests} Guest{room.guests > 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-1 bg-neutral-100 rounded-lg mt-12 mb-8" />

            {/* Assigned Room & Digital Access */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Assigned Room */}
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-[#0c214e]">
                  Assigned Room
                </h2>
                <div className="bg-[#e9f0fd] rounded-3xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 text-base">YOUR ROOM</p>
                    <p className="text-5xl font-semibold text-blue-600 my-2 tracking-tight">
                      {room.roomNumber}
                    </p>
                    <p className="text-gray-500 text-base mb-3">{room.name}</p>
                    <div className="inline-block bg-[#e9f0fd] border border-[#19429d]/20 px-3 py-1 rounded-2xl">
                      <p className="text-sm font-medium text-[#19429d]">
                        {room.floor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Access */}
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-[#0c214e]">
                  Digital Access
                </h2>
                <div className="bg-blue-600 rounded-3xl h-48 flex items-center justify-center relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-white rounded-full blur-3xl" />
                      <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-white rounded-full blur-3xl" />
                    </div>
                  </div>

                  <div className="text-center z-10">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <p className="text-base text-white">Access PIN</p>
                      <div className="bg-[#ecfdf3] px-2 py-0.5 rounded-2xl">
                        <p className="text-xs font-medium text-[#027a48]">
                          Active
                        </p>
                      </div>
                    </div>
                    <p className="text-5xl font-semibold text-white tracking-tight my-2">
                      8 1 4 2
                    </p>
                    <p className="text-base text-[#e9f0fd]">
                      Enter this code on the door keypad
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="border border-blue-600 rounded-3xl mt-5 p-6">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#d3e0fb] p-2 rounded-full">
                  <div className="bg-blue-600 p-2 rounded-2xl">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="text-center w-full">
                  <h3 className="text-base font-medium text-black mb-4">
                    Important Information
                  </h3>

                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <div className="text-center">
                      <p className="text-base font-medium text-[#535862] mb-2">
                        Check-in time
                      </p>
                      <p className="text-base text-[#717680]">3:00 PM</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-[#535862] mb-2">
                        Check-out time
                      </p>
                      <p className="text-base text-[#717680]">11:00 AM</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-[#535862] mb-2">
                        WiFi Network
                      </p>
                      <p className="text-base text-[#717680]">
                        Luxe_Haven_Premium
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <Button
                variant="outline"
                className="bg-[#e9f0fd] border-[#e9f0fd] text-[#19429d] hover:bg-[#d3e0fb] h-12 rounded-full font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Details
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-full font-semibold">
                Go to Dashboard
              </Button>
            </div>
          </div>
        </section>

        {/* Room Details Section */}
        <section className="relative w-full bg-gray-50 py-16">
          <div className="max-w-[1192px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Rooms</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Room Image */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Room Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    {room.name}
                  </h1>
                  <p className="text-xl text-gray-600">
                    ${room.price} per night
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <span>{room.sqft} sq ft</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    <span>Up to {room.guests} guests</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {room.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {room.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {highlight.icon === "wifi" && (
                          <Wifi className="w-4 h-4 text-gray-500" />
                        )}
                        {highlight.icon === "coffee" && (
                          <Coffee className="w-4 h-4 text-gray-500" />
                        )}
                        {highlight.icon === "tv" && (
                          <Tv className="w-4 h-4 text-gray-500" />
                        )}
                        {highlight.icon === "wind" && (
                          <Wind className="w-4 h-4 text-gray-500" />
                        )}
                        {highlight.icon === "bathtub" && (
                          <Bed className="w-4 h-4 text-gray-500" />
                        )}
                        {highlight.icon === "bar" && (
                          <Coffee className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-700">
                          {highlight.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="border-t pt-6 mt-4">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Check-in</span>
                      <span className="text-gray-900 font-medium">
                        {checkIn}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Check-out</span>
                      <span className="text-gray-900 font-medium">
                        {checkOut}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Taxes & fees</span>
                      <span className="text-gray-900 font-medium">
                        ${taxesAndFees.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 my-4" />

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">
                      ${totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
