"use client";

import { LayoutGrid, Grid3x3, FileText, Settings, LogOut, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-white w-full overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-[272px] bg-[#0c214e] flex-col justify-between">
        {/* Sidebar Header */}
        <div className="flex flex-col gap-6 pt-8">
          {/* Logo */}
          <div className="px-4 pr-5">
            <Image
              src="/dashboard-logo.svg"
              alt="luxehaven"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="px-4 flex flex-col gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                isActive("/dashboard")
                  ? "bg-blue-600 text-white"
                  : "bg-[#0c214e] text-[#eaddeb] hover:bg-[#19429d]/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5" />
                <span className="text-base">Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => router.push("/dashboard/services")}
              className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                isActive("/dashboard/services")
                  ? "bg-blue-600 text-white"
                  : "bg-[#0c214e] text-[#eaddeb] hover:bg-[#19429d]/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                <span className="text-base">Services</span>
              </div>
            </button>

            <button
              onClick={() => router.push("/dashboard/requests")}
              className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                isActive("/dashboard/requests")
                  ? "bg-blue-600 text-white"
                  : "bg-[#0c214e] text-[#eaddeb] hover:bg-[#19429d]/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-base">Requests</span>
              </div>
            </button>

            <button
              onClick={() => router.push("/dashboard/settings")}
              className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                isActive("/dashboard/settings")
                  ? "bg-blue-600 text-white"
                  : "bg-[#0c214e] text-[#eaddeb] hover:bg-[#19429d]/20"
              }`}
            >
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

      {/* Mobile Sidebar Overlay & Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -272 }}
              animate={{ x: 0 }}
              exit={{ x: -272 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[272px] bg-[#0c214e] z-50 lg:hidden"
            >
              <div className="flex flex-col justify-between h-full">
                {/* Header with Logo and Close Button */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between px-4 pt-8">
                    <Image
                      src="/dashboard-logo.svg"
                      alt="luxehaven"
                      width={120}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 hover:bg-[#19429d]/20 rounded"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  <nav className="px-4 flex flex-col gap-4">
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                        isActive("/dashboard")
                          ? "bg-blue-600 text-white"
                          : "bg-[#0c214e] text-[#eaddeb]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5" />
                        <span className="text-base">Dashboard</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/dashboard/services");
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                        isActive("/dashboard/services")
                          ? "bg-blue-600 text-white"
                          : "bg-[#0c214e] text-[#eaddeb]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Grid3x3 className="w-5 h-5" />
                        <span className="text-base">Services</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/dashboard/requests");
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                        isActive("/dashboard/requests")
                          ? "bg-blue-600 text-white"
                          : "bg-[#0c214e] text-[#eaddeb]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span className="text-base">Requests</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/dashboard/settings");
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 rounded h-10 ${
                        isActive("/dashboard/settings")
                          ? "bg-blue-600 text-white"
                          : "bg-[#0c214e] text-[#eaddeb]"
                      }`}
                    >
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-3 sm:px-5 lg:px-6 py-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>

          {/* Welcome Message */}
          <div className="flex flex-col gap-2">
            <h1 className="font-['Geist'] font-semibold text-lg sm:text-xl lg:text-2xl text-[#181d27] leading-tight sm:leading-7 lg:leading-8">
              Welcome back, Daniel 👋
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
          {children}
        </div>
      </main>
    </div>
  );
}
