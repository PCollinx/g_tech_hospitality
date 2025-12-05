"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LayoutGrid,
  Eye,
  Users,
  FileText,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  Stars,
  Settings,
  LogOut,
  Grid3x3,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  path: string;
  icon: typeof LayoutGrid;
}

interface NavContentProps {
  navigationItems: NavigationItem[];
  isActive: (path: string) => boolean;
  router: ReturnType<typeof useRouter>;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

function NavContent({
  navigationItems,
  isActive,
  router,
  setIsMobileSidebarOpen,
}: NavContentProps) {
  return (
    <>
      <div className="flex flex-col gap-6 pt-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start pl-4 pr-5">
          <Image
            src="/logo.svg"
            alt="luxehaven"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4 px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setIsMobileSidebarOpen(false);
                }}
                className={`relative flex items-center justify-between h-10 px-4 py-2 rounded overflow-hidden ${
                  active ? "bg-[#d3e0fb]" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-blue-600" : "text-[#535862]"
                    }`}
                  />
                  <span
                    className={`text-base leading-6 ${
                      active ? "text-blue-600" : "text-[#535862]"
                    }`}
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    {item.name}
                  </span>
                </div>
                {active && (
                  <div className="absolute left-0 top-0 w-[7px] h-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col gap-6 pb-8 px-4 mt-auto">
        {/* Settings Button */}
        <button
          onClick={() => router.push("/admin/settings")}
          className="flex items-center justify-between h-10 px-4 py-2 rounded overflow-hidden bg-white hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#535862]" />
            <span
              className="text-base leading-6 text-[#535862]"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              Settings
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="h-px bg-[#e9eaeb]" />

        {/* User Account */}
        <div className="flex items-start justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600 text-white font-semibold">
                DK
              </div>
            </div>
            <div className="flex flex-col text-sm leading-5">
              <p
                className="font-semibold text-black"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Daniel Kyle
              </p>
              <p
                className="text-blue-600"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                Administrator
              </p>
            </div>
          </div>
          <button className="w-5 h-5 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutGrid,
    },
    {
      name: "Live Monitoring (Guests)",
      path: "/admin/live-monitoring",
      icon: Eye,
    },
    {
      name: "Staff",
      path: "/admin/staff",
      icon: Users,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: FileText,
    },
    {
      name: "Fraud Detection",
      path: "/admin/fraud-detection",
      icon: ShieldAlert,
    },
    {
      name: "Transaction",
      path: "/admin/transaction",
      icon: DollarSign,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: TrendingUp,
    },
    {
      name: "Automation",
      path: "/admin/automation",
      icon: Stars,
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[272px] bg-white border-r border-[#e9eaeb] flex-col justify-between">
        <NavContent
          navigationItems={navigationItems}
          isActive={isActive}
          router={router}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -272 }}
              animate={{ x: 0 }}
              exit={{ x: -272 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[272px] bg-white border-r border-[#e9eaeb] z-50 lg:hidden flex flex-col"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between px-4 pt-8 pb-6">
                <Image
                  src="/logo.svg"
                  alt="luxehaven"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-4 px-4 flex-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        router.push(item.path);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`relative flex items-center justify-between h-10 px-4 py-2 rounded overflow-hidden ${
                        active ? "bg-[#d3e0fb]" : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-5 h-5 ${
                            active ? "text-blue-600" : "text-[#535862]"
                          }`}
                        />
                        <span
                          className={`text-base leading-6 ${
                            active ? "text-blue-600" : "text-[#535862]"
                          }`}
                          style={{ fontFamily: "Pretendard, sans-serif" }}
                        >
                          {item.name}
                        </span>
                      </div>
                      {active && (
                        <div className="absolute left-0 top-0 w-[7px] h-full bg-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer Section */}
              <div className="flex flex-col gap-6 pb-8 px-4 mt-auto">
                {/* Settings Button */}
                <button
                  onClick={() => {
                    router.push("/admin/settings");
                    setIsMobileSidebarOpen(false);
                  }}
                  className="flex items-center justify-between h-10 px-4 py-2 rounded overflow-hidden bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#535862]" />
                    <span
                      className="text-base leading-6 text-[#535862]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      Settings
                    </span>
                  </div>
                </button>

                {/* Divider */}
                <div className="h-px bg-[#e9eaeb]" />

                {/* User Account */}
                <div className="flex items-start justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600 text-white font-semibold">
                        DK
                      </div>
                    </div>
                    <div className="flex flex-col text-sm leading-5">
                      <p
                        className="font-semibold text-black"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        Daniel Kyle
                      </p>
                      <p
                        className="text-blue-600"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        Administrator
                      </p>
                    </div>
                  </div>
                  <button className="w-5 h-5 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm flex items-center py-6 px-3 sm:px-5 lg:px-6 border-b border-[#e9eaeb]">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded mr-2"
          >
            <Grid3x3 className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-2">
            <h1
              className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-7 lg:leading-8 text-[#181d27]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Welcome back, Daniel 👋
            </h1>
            <p
              className="text-sm sm:text-base leading-5 sm:leading-6 text-[#535862]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Here&apos;s a quick overview of today&apos;s activities, tasks,
              and system updates.
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
