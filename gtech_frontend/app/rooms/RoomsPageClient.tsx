"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Users,
  Bed,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axiosInstance from "@/lib/axios";

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

export default function RoomsPageClient() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [guestFilter, setGuestFilter] = useState<string>("all");

  useEffect(() => {
    fetchRooms();
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams?.get("type");
    const guests = searchParams?.get("guests");

    if (type) {
      const categoryMap: { [key: string]: string } = {
        "Deluxe Room": "deluxe",
        Suite: "suite",
        "Executive Suite": "suite",
        "Presidential Suite": "suite",
      };
      const category = categoryMap[type] || type.toLowerCase();
      setCategoryFilter(category);
    }

    if (guests) {
      setGuestFilter(guests);
    }
  }, [searchParams]);

  useEffect(() => {
    filterRooms();
  }, [rooms, searchQuery, categoryFilter, priceFilter, guestFilter]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/rooms");
      const roomsData = response.data.data?.rooms || [];
      setRooms(roomsData);
      setFilteredRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    let filtered = [...rooms];

    // Search by room number or category
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.number.toString().includes(query) ||
          room.category.toLowerCase().includes(query) ||
          `${room.alphabet}${room.number}`.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (room) => room.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Filter by price range
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((room) => {
        const price = room.price;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    // Filter by guests
    if (guestFilter !== "all") {
      const guests = parseInt(guestFilter);
      filtered = filtered.filter((room) => room.maxGuest >= guests);
    }

    setFilteredRooms(filtered);
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
    return `${categoryMap[room.category] || room.category} ${room.alphabet}${room.number}`;
  };

  const getRoomDescription = (room: Room) => {
    return `Comfortable ${room.category} room with ${room.bedType} bed, perfect for ${room.maxGuest} guest${room.maxGuest > 1 ? "s" : ""}.`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rooms...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="relative w-full bg-gradient-to-b from-blue-600 to-blue-700 pt-32 pb-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              All Rooms
            </h1>
            <p className="text-blue-100 text-sm md:text-base max-w-2xl">
              Discover our complete collection of luxurious accommodations
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by room number or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
              >
                <option value="all">All Prices</option>
                <option value="0-15000">$0 - $150</option>
                <option value="15000-20000">$150 - $200</option>
                <option value="20000-35000">$200 - $350</option>
                <option value="35000">$350+</option>
              </select>

              {/* Guest Filter */}
              <select
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
              >
                <option value="all">All Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-[1440px] mx-auto lg:px-16 xl:px-32">
            {filteredRooms.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No rooms found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredRooms.map((room) => (
                  <Link
                    key={room._id}
                    href={`/rooms/${room._id}`}
                    className="flex flex-col gap-4 group"
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
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <p className="text-sm font-semibold text-gray-900">
                          ${formatPrice(room.price)}
                          <span className="text-gray-600 font-normal">/night</span>
                        </p>
                      </div>

                      {/* Status Badge */}
                      {room.status === "available" && !room.isBooked && (
                        <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                          <p className="text-xs font-semibold text-white">Available</p>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>

                    {/* Room Details */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {getRoomName(room)}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed line-clamp-2">
                        {getRoomDescription(room)}
                      </p>

                      {/* Room Features */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{room.maxGuest}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span className="capitalize">{room.bedType}</span>
                        </div>
                        {room.oceanView && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>Ocean View</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

