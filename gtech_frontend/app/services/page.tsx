"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Grid3x3,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { useSession } from "next-auth/react";

const services = [
  {
    id: 1,
    name: "Room Service",
    availability: "Available 24/7",
    icon: "🍽️",
    color: "bg-[#dc6803]",
  },
  {
    id: 2,
    name: "Laundry",
    availability: "Available 24/7",
    icon: "👔",
    color: "bg-[#039855]",
  },
  {
    id: 3,
    name: "SPA & Amenities",
    availability: "Available 24/7",
    icon: "💆",
    color: "bg-[#1570ef]",
  },
  {
    id: 4,
    name: "Housekeeping",
    availability: "Available 24/7",
    icon: "🧹",
    color: "bg-[#7e22ce]",
  },
  {
    id: 5,
    name: "Concierge",
    availability: "Available 24/7",
    icon: "🛎️",
    color: "bg-[#ea580c]",
  },
  {
    id: 6,
    name: "Maintenance",
    availability: "Available 24/7",
    icon: "🔧",
    color: "bg-[#0891b2]",
  },
  {
    id: 7,
    name: "Gym & Fitness",
    availability: "6:00 AM - 10:00 PM",
    icon: "💪",
    color: "bg-[#dc2626]",
  },
  {
    id: 8,
    name: "Restaurant",
    availability: "7:00 AM - 11:00 PM",
    icon: "🍳",
    color: "bg-[#ca8a04]",
  },
  {
    id: 9,
    name: "Transportation",
    availability: "Available 24/7",
    icon: "🚗",
    color: "bg-[#16a34a]",
  },
];

export default function ServicesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = storage.getUser() || (session?.user as any);
    if (storedUser) {
      setUser(storedUser);
    }
  }, [session]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-[272px] bg-[#0c214e] flex-col justify-between">
        {/* Sidebar Header */}
        <div className="flex flex-col gap-6 pt-8">
          {/* Logo */}
          <div className="px-4 pr-5">
            <img src="/logo.svg" alt="luxehaven" className="h-8 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="px-4 flex flex-col gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10 hover:bg-[#19429d]/20"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5" />
                <span className="text-base">Dashboard</span>
              </div>
            </button>

            <button className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded text-white h-10">
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                <span className="text-base">Services</span>
              </div>
            </button>

            <button className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10 hover:bg-[#19429d]/20">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-base">Requests</span>
              </div>
            </button>

            <button className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10 hover:bg-[#19429d]/20">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span className="text-base">Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pb-8 px-4 flex flex-col gap-6">
          <div className="h-px bg-gray-700" />

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="User"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-sm">
                <p className="font-semibold text-white">Daniel Kyle</p>
                <p className="text-[#92b1f5]">danielkyl@gmail.com</p>
              </div>
            </div>
            <button className="p-2 hover:bg-[#19429d]/20 rounded">
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[272px] bg-[#0c214e] z-50 transform transition-transform md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Sidebar Header */}
          <div className="flex flex-col gap-6 pt-8">
            <div className="px-4 pr-5">
              <img src="/logo.svg" alt="luxehaven" className="h-8 w-auto" />
            </div>

            <nav className="px-4 flex flex-col gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10"
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  <span className="text-base">Dashboard</span>
                </div>
              </button>

              <button className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded text-white h-10">
                <div className="flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5" />
                  <span className="text-base">Services</span>
                </div>
              </button>

              <button className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-base">Requests</span>
                </div>
              </button>

              <button className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span className="text-base">Settings</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="pb-8 px-4 flex flex-col gap-6">
            <div className="h-px bg-gray-700" />

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <p className="font-semibold text-white">Daniel Kyle</p>
                  <p className="text-[#92b1f5]">danielkyl@gmail.com</p>
                </div>
              </div>
              <button className="p-2">
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header - Desktop */}
        <header className="hidden md:flex h-20 bg-white border-b border-gray-200 shadow-sm items-center justify-between px-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-[#181d27]">
              Welcome back, {user?.firstName || "User"}
            </h1>
            <p className="text-base text-[#535862]">
              Here&apos;s everything about your upcoming stay.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="User"
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#12b76a] rounded-full border-[1.5px] border-white" />
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold text-[#181d27]">Daniel Kyle</p>
              <p className="text-[#535862]">danielkyl@gmail.com</p>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="flex md:hidden h-16 bg-white border-b border-gray-200 shadow-sm items-center justify-between px-5">
          <img src="/logo.svg" alt="luxehaven" className="h-8 w-auto" />

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Grid3x3 className="w-6 h-6 text-[#717680]" />
          </button>
        </header>

        {/* Services Content */}
        <div className="flex-1 overflow-y-auto bg-neutral-50 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#181d27] mb-1">
              Request a Service
            </h2>
            <p className="text-base text-[#535862]">
              Choose from available hotel services
            </p>
          </div>

          {/* Services Grid */}
          <div className="bg-neutral-100 border border-gray-200 rounded-3xl p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  className="bg-white rounded-[18px] p-4 flex flex-col gap-4 hover:shadow-md transition-shadow text-left"
                >
                  <div
                    className={`${service.color} p-3 rounded-lg w-fit flex items-center justify-center`}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-base text-[#535862]">
                        {service.availability}
                      </p>
                      <p className="text-[30px] font-semibold text-[#181d27] leading-[38px]">
                        {service.name}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[#717680] shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
