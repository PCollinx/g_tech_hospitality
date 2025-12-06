"use client";

import { Search, Calendar, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const roomTypes = [
    "All Rooms",
    "Deluxe Room",
    "Suite",
    "Executive Suite",
    "Presidential Suite",
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (roomType && roomType !== "All Rooms") params.append("type", roomType);
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);
    if (guests) params.append("guests", guests);

    // If there are search params, go to rooms page, otherwise scroll to rooms section
    if (params.toString()) {
      router.push(`/rooms?${params.toString()}`);
    } else {
      router.push(`/#rooms`);
    }
  };

  return (
    <section className="relative w-full max-w-[100vw] h-screen min-h-[600px] sm:min-h-[700px] lg:h-[789px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-2 sm:px-4">
        <div className="w-full max-w-[718px] flex flex-col items-center gap-4 sm:gap-6 mt-12 md:mt-0">
          {/* Hero Text */}
          <div className="text-center text-white space-y-2 sm:space-y-3 px-2 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              Find your <span className="inline-block">perfect</span> stay
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-90 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              Discover luxury accommodations with AI-powered personalization
            </p>
          </div>

          {/* Simple Search Bar - Mobile First */}
          <div className="w-full backdrop-blur-sm bg-white/20 rounded-3xl p-2 sm:p-3 lg:hidden">
            <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-lg space-y-3">
              {/* Room Type */}
              <div className="relative">
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full text-sm sm:text-base text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600 appearance-none cursor-pointer"
                >
                  <option value="">Select room type</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="Check in"
                  className="text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="Check out"
                  className="text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
                />
              </div>

              {/* Guests */}
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Number of guests"
                className="w-full text-sm sm:text-base text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
              />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm sm:text-base font-semibold shadow-md transition-all duration-200"
              >
                Search Rooms
              </button>
            </div>
          </div>

          {/* Advanced Search Bar - Desktop */}
          <div className="hidden lg:block w-full backdrop-blur-sm bg-white/20 rounded-full p-4">
            <div className="bg-white rounded-full flex items-center justify-between p-3 shadow-xl">
              <div className="flex items-center gap-6 flex-1">
                {/* Room Type */}
                <div className="flex flex-col gap-1 flex-1 min-w-0 relative">
                  <label className="text-xs font-medium text-gray-900">
                    Room type
                  </label>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="text-sm text-gray-700 outline-none bg-transparent w-full appearance-none cursor-pointer pr-4"
                    >
                      <option value="">Select type</option>
                      {roomTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none absolute right-0" />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Check In */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Check in
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="text-sm text-gray-700 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Check Out */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Check out
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="text-sm text-gray-700 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Guests */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-xs font-medium text-gray-900">
                    Guests
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Decorative Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}
