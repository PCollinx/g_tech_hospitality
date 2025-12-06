"use client";

import {
  LayoutGrid,
  Grid3x3,
  FileText,
  Settings,
  LogOut,
  Clock,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { useSession } from "next-auth/react";

// Request data matching Figma design
const requests = [
  {
    id: 1,
    serviceType: "Room Service",
    description:
      "I have a slight injury on my lower right back from lifting luggage, so please avoid deep pressure in that area. Also, I have sensitive...",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 2,
    serviceType: "Housekeeping",
    description:
      "We accidentally spilled some soda on the rug near the bed. Could you please send someone to clean it up before it stains? We also need fresh towels.",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 3,
    serviceType: "Laundry",
    description:
      "The blue silk dress is very delicate. Please dry clean only and do not use high heat. It has a small sequin detail on the collar, please be careful.",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Pending",
    iconColor: "#dc6803",
    iconBg: "#fffaeb",
    icon: "clock",
  },
  {
    id: 4,
    serviceType: "Breakfast Order",
    description: "Continental breakfast for 2",
    time: "01:01",
    estimatedTime: "Est. 15-30 min",
    status: "Completed",
    iconColor: "#039855",
    iconBg: "#ecfdf3",
    icon: "check",
  },
];

export default function RequestsPage() {
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
    <div className="flex min-h-screen bg-white w-full overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-[272px] bg-[#0c214e] flex-col justify-between">
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

            <button
              onClick={() => router.push("/services")}
              className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10 hover:bg-[#19429d]/20"
            >
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                <span className="text-base">Services</span>
              </div>
            </button>

            <button className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded text-white h-10">
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
              <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden relative">
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[272px] bg-[#0c214e] z-50 transform transition-transform lg:hidden ${
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
                onClick={() => {
                  router.push("/dashboard");
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10"
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  <span className="text-base">Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => {
                  router.push("/services");
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 bg-[#0c214e] rounded text-[#eaddeb] h-10"
              >
                <div className="flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5" />
                  <span className="text-base">Services</span>
                </div>
              </button>

              <button className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded text-white h-10">
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

          {/* Sidebar Footer */}
          <div className="pb-8 px-4 flex flex-col gap-6">
            <div className="h-px bg-gray-700" />

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden relative">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm h-20 flex items-center justify-between px-3 sm:px-5 lg:px-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>

          {/* Welcome Message */}
          <div className="flex flex-col gap-1">
            <h1 className="font-['Geist'] font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight sm:leading-7 lg:leading-8">
              Welcome back, {user?.firstName || "User"}
            </h1>
            <p className="font-['Geist'] font-normal text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
              Here&apos;s everything about your upcoming stay.
            </p>
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="User"
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#12b76a] border-[1.5px] border-white rounded-full" />
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold text-[#181d27]">Daniel Kyle</p>
              <p className="text-[#535862]">danielkyl@gmail.com</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
            {/* Page Header */}
            <div className="mb-4 sm:mb-5 lg:mb-6">
              <h2 className="font-['Geist'] font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight sm:leading-7 lg:leading-8">
                Your Requests
              </h2>
              <p className="font-['Geist'] font-normal text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                Track and manage your service requests
              </p>
            </div>

            {/* Requests Table */}
            <div className="bg-white border border-[#e9eaeb] rounded-lg sm:rounded-xl overflow-hidden shadow-sm w-full">
              <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#e9eaeb] bg-white">
                      <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                        Service Type
                      </th>
                      <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                        Description
                      </th>
                      <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                        Time
                      </th>
                      <th className="text-left px-4 sm:px-5 lg:px-6 py-3 font-['Geist'] font-medium text-[10px] sm:text-xs text-[#535862] leading-[18px]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr
                        key={request.id}
                        className={`border-b border-[#e9eaeb] ${
                          index === requests.length - 1 ? "" : "bg-neutral-50"
                        }`}
                      >
                        {/* Service Type */}
                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: request.iconBg }}
                            >
                              {request.icon === "clock" ? (
                                <Clock
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  style={{ color: request.iconColor }}
                                />
                              ) : (
                                <Check
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  style={{ color: request.iconColor }}
                                />
                              )}
                            </div>
                            <span className="font-['Geist'] font-medium text-xs sm:text-sm text-[#181d27] leading-5">
                              {request.serviceType}
                            </span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                          <p className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5 line-clamp-2">
                            {request.description}
                          </p>
                        </td>

                        {/* Time */}
                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                          <div className="font-['Geist'] font-normal text-xs sm:text-sm text-[#535862] leading-5">
                            <p>{request.time}</p>
                            <p className="mt-1">{request.estimatedTime}</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
                          {request.status === "Pending" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#fffaeb] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#b54708] leading-[18px]">
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-2xl bg-[#ecfdf3] font-['Geist'] font-medium text-[10px] sm:text-xs text-[#027a48] leading-[18px]">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
