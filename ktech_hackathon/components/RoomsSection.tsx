"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, ArrowRight, Users, Bed, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import ScrollAnimation from "@/components/ScrollAnimation";

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

export default function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams?.get("type");
    const guests = searchParams?.get("guests");

    if (type || guests) {
      filterRoomsBySearch();
    } else {
      fetchRooms();
    }
  }, [searchParams]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/rooms");
      const roomsData = response.data.data?.rooms || [];
      // Show only first 8 rooms on homepage
      setRooms(roomsData.slice(0, 8));
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRoomsBySearch = () => {
    const type = searchParams?.get("type");
    const guests = searchParams?.get("guests");

    if (!type && !guests) {
      fetchRooms();
      return;
    }

    // Fetch all rooms and filter
    axiosInstance
      .get("/rooms")
      .then((response) => {
        let filtered = response.data.data?.rooms || [];

        if (type && type !== "All Rooms") {
          const categoryMap: { [key: string]: string } = {
            "Deluxe Room": "deluxe",
            Suite: "suite",
            "Executive Suite": "suite",
            "Presidential Suite": "suite",
          };
          const category = categoryMap[type] || type.toLowerCase();
          filtered = filtered.filter(
            (room: Room) => room.category.toLowerCase() === category
          );
        }

        if (guests) {
          const guestCount = parseInt(guests);
          filtered = filtered.filter(
            (room: Room) => room.maxGuest >= guestCount
          );
        }

        setRooms(filtered.slice(0, 8));
      })
      .catch((error) => {
        console.error("Error filtering rooms:", error);
      });
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
  return (
    <section
      id="rooms"
      className="relative w-full max-w-[100vw] bg-linear-to-b from-white via-gray-50 to-white pt-16 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 -right-10 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/20 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-20 -left-10 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/15 rounded-full blur-3xl z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] bg-blue-400/10 rounded-full blur-3xl z-10" />

      {/* Rotating Star Decorations */}
      <div className="absolute top-10 right-[15%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-30 animate-spin-slow z-10">
        <Image src="/star.svg" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-32 left-[10%] w-12 h-12 sm:w-16 sm:h-16 opacity-20 animate-spin-slower z-10">
        <Image src="/star.svg" alt="" fill className="object-contain" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        {/* Section Header */}
        <ScrollAnimation animation="fade-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-2">
                Explore our rooms
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-xl">
                Handpicked spaces designed for comfort and style. Discover the
                perfect retreat for your stay.
              </p>
            </div>

            {/* View All Button */}
            <Link href="/rooms" className="shrink-0">
              <Button
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-4 sm:px-6 text-xs sm:text-sm md:text-base shadow-sm group whitespace-nowrap"
              >
                View All
                <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </ScrollAnimation>

        {/* Rooms Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 md:gap-6 md:gap-y-10 lg:gap-y-12 mb-8 md:mb-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 md:gap-4">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 mb-8 md:mb-12">
            <p className="text-gray-600 text-lg mb-2">No rooms available</p>
            <p className="text-gray-500 text-sm">
              Please try different search criteria
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 md:gap-6 md:gap-y-10 lg:gap-y-12 mb-8 md:mb-12">
          {rooms.map((room, index) => (
            <ScrollAnimation
              key={room._id}
              animation="fade-up"
              delay={index * 100}
            >
              <Link
                href={`/rooms/${room._id}`}
                className="flex flex-col gap-3 md:gap-4 group"
              >
              {/* Room Image */}
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 group cursor-pointer">
                <Image
                    src={room.images?.[0] || "/placeholder-room.jpg"}
                    alt={getRoomName(room)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                {/* Price Badge */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold text-gray-900">
                      ${formatPrice(room.price)}
                    <span className="text-gray-600 font-normal">/night</span>
                  </p>
                </div>

                  {/* Status Badge */}
                  {room.status === "available" && !room.isBooked && (
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-green-500/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
                      <p className="text-xs font-semibold text-white">
                        Available
                      </p>
                    </div>
                  )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Room Details */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {getRoomName(room)}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                    {getRoomDescription(room)}
                </p>

                {/* Room Features */}
                <div className="flex-row md:flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{room.maxGuest}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <div className="flex items-center gap-1">
                    <Bed className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="capitalize">{room.bedType}</span>
                  </div>
                    {room.oceanView && (
                      <>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Ocean View</span>
                  </div>
                      </>
                    )}
                </div>
              </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
