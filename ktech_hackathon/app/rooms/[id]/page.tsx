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
  Check,
  Users,
  Bed,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function RoomDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/rooms/${roomId}`);
      // Backend returns { status: "success", doc: { ...room data } }
      const roomData =
        response.data.doc || response.data.data?.room || response.data.data;
      if (!roomData) {
        setError("Room data not found in response");
        return;
      }
      setRoom(roomData);
    } catch (err: any) {
      console.error("Error fetching room:", err);
      setError(err.response?.data?.message || "Failed to load room details");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(0);
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

  if (error || !room) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-32 px-4">
          <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {error || "Room not found"}
            </h1>
            <p className="text-gray-600 mb-6">
              The room you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/rooms">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse All Rooms
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isAvailable = room.status === "available" && !room.isBooked;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 pt-32 pb-16">
          {/* Back Button */}
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 sm:gap-4 text-black hover:text-gray-700 mb-8 sm:mb-12 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base font-normal">Back</span>
          </Link>

          {/* 3-Step Onboarding Progress */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-14 mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-black">
                Reserve Room
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-blue-600 rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-[#717680]">
                Select Date
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-[#e9f0fd] rounded-[24px]" />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[200px] lg:max-w-[360px]">
              <p className="font-medium text-xs sm:text-sm lg:text-base text-[#717680]">
                Confirm
              </p>
              <div className="h-[6px] sm:h-[8px] lg:h-[11px] bg-[#e9f0fd] rounded-[24px]" />
            </div>
          </div>

          {/* Room Header */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[44px] tracking-[-0.72px] text-black">
                  {getRoomName(room)}
                </h1>
                <p className="text-sm sm:text-base text-[#717680]">
                  {getRoomDescription(room)}
                </p>
              </div>
              {isAvailable && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#12B76A]" />
                  <div className="flex items-center gap-1 bg-[#ecfdf3] px-3 py-1 rounded-2xl">
                    <Check className="w-3 h-3 text-[#027a48]" />
                    <span className="text-xs sm:text-sm font-medium text-[#027a48]">
                      Available
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-left lg:text-right">
              <span className="font-semibold text-2xl sm:text-[30px] leading-[38px] text-[#181d27]">
                ${formatPrice(room.price)}
              </span>
              <span className="font-semibold text-lg sm:text-[20px] leading-[30px] text-[#181d27]">
                /night
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex flex-col gap-3 sm:gap-5 mb-12 sm:mb-16">
            {/* Large Hero Image */}
            <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[329px] rounded-2xl sm:rounded-[24px] overflow-hidden bg-gray-200">
              <Image
                src={room.images?.[0] || "/placeholder-room.jpg"}
                alt={getRoomName(room)}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1192px"
                priority
              />
            </div>

            {/* Smaller Images Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {(room.images?.slice(1, 5) || []).map((image, i) => (
                <div
                  key={i}
                  className="relative h-[120px] sm:h-[160px] lg:h-[208px] rounded-2xl sm:rounded-[24px] overflow-hidden bg-gray-200"
                >
                  <Image
                    src={image || room.images?.[0] || "/placeholder-room.jpg"}
                    alt={`${getRoomName(room)} - View ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 283px"
                  />
                </div>
              ))}
              {/* Fill remaining slots if less than 4 images */}
              {(!room.images || room.images.length < 5) &&
                Array.from({
                  length: 4 - (room.images?.slice(1).length || 0),
                }).map((_, i) => (
                  <div
                    key={`placeholder-${i}`}
                    className="relative h-[120px] sm:h-[160px] lg:h-[208px] rounded-2xl sm:rounded-[24px] overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={room.images?.[0] || "/placeholder-room.jpg"}
                      alt={`${getRoomName(room)} - View ${
                        i + (room.images?.length || 1)
                      }`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 283px"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Description & Continue Button */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 sm:mb-10">
            <div className="flex flex-col gap-2 w-full lg:max-w-[617px]">
              <h2 className="font-semibold text-xl sm:text-2xl text-[#181d27]">
                Description
              </h2>
              <p className="text-sm sm:text-base text-[#717680] leading-6">
                {getRoomDescription(room)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-[#717680]" />
                  <span className="text-xs text-[#717680]">
                    Up to {room.maxGuest} guest{room.maxGuest > 1 ? "s" : ""}
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
                      <span className="text-xs text-[#717680]">Ocean View</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isAvailable && (
              <Link
                href={`/rooms/${roomId}/select-date`}
                className="w-full lg:w-auto"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-5 py-6 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full lg:min-w-[253px] min-h-[56px]">
                  Continue
                </Button>
              </Link>
            )}
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-4 sm:gap-5 max-w-[947px]">
            <h3 className="font-semibold text-lg sm:text-xl text-[#181d27]">
              Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-[91px] gap-y-4 sm:gap-y-5">
              <div className="flex items-center gap-2">
                <Wifi className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Premium WiFi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Coffee maker
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Smart TV
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Smart climate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Modern bathroom
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wine className="w-[18px] h-[18px] text-black flex-shrink-0" />
                <span className="text-sm sm:text-base text-[#252b37]">
                  Mini bar
                </span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
