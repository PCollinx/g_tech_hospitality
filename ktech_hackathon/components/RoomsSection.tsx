"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Users, Bed, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roomsData } from "@/lib/mockData";

const rooms = roomsData.map((room) => ({
  id: room.id,
  name: room.name,
  description: room.description,
  price: room.price,
  image: room.image,
  guests: room.guests,
  bed: room.bed,
  view: room.view,
}));

export default function RoomsSection() {
  return (
    <section
      id="rooms"
      className="relative w-full max-w-[100vw] bg-linear-to-b from-white via-gray-50 to-white pt-16 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 -right-10 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/20 rounded-full blur-3xl z-20" />
      <div className="absolute bottom-20 -left-10 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/15 rounded-full blur-3xl z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] bg-blue-400/10 rounded-full blur-3xl z-20" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-blue-600/60 to-transparent" />
            </div>
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

        {/* Rooms Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 md:gap-6 md:gap-y-10 lg:gap-y-12 mb-8 md:mb-12">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="flex flex-col gap-3 md:gap-4 group"
            >
              {/* Room Image */}
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 group cursor-pointer">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />

                {/* Price Badge */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold text-gray-900">
                    ${room.price}
                    <span className="text-gray-600 font-normal">/night</span>
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Room Details */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {room.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                  {room.description}
                </p>

                {/* Room Features */}
                <div className="flex-row md:flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{room.guests}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <div className="flex items-center gap-1">
                    <Bed className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{room.bed}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{room.view}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
