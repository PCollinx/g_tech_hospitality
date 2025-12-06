"use client";

import { Eye, EyeOff, Clock, ChevronRight, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [showPin, setShowPin] = useState(false);
  const router = useRouter();

  const handleFoodClick = () => {
    router.push("/dashboard/services/request?service=8&name=Restaurant");
  };

  return (
    <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 max-w-full">
      {/* Room Info Cards */}
      <div className="mb-4 sm:mb-5 lg:mb-6 flex flex-col lg:flex-row gap-3 sm:gap-4 w-full min-w-0">
        {/* Access PIN Card */}
        <div className="lg:flex-1 bg-blue-600 rounded-xl sm:rounded-2xl lg:rounded-3xl min-h-40 sm:min-h-[180px] lg:h-56 p-3 sm:p-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "url('/pin-card.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <p className="text-white text-xs sm:text-sm lg:text-base">
                Access PIN
              </p>
              <span className="bg-[#ecfdf3] text-[#027a48] text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <p className="text-white text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight">
                {showPin ? "8 1 4 2" : "* * * *"}
              </p>
              <button
                onClick={() => setShowPin(!showPin)}
                className="bg-white/20 backdrop-blur-md p-1 sm:p-1.5 lg:p-2 rounded-full"
              >
                {showPin ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                ) : (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                )}
              </button>
            </div>

            <p className="text-[#e9f0fd] text-xs sm:text-sm lg:text-base text-center px-2 sm:px-4">
              Enter this code on the door keypad
            </p>
          </div>
        </div>

        {/* Room Details Card */}
        <div className="lg:flex-1 bg-[#d3e0fb] rounded-xl sm:rounded-2xl lg:rounded-3xl min-h-[140px] sm:min-h-40 lg:h-56 flex items-center justify-center p-3 sm:p-4">
          <div className="text-center flex items-center flex-col gap-1.5 sm:gap-2">
            <p className="text-[#717680] text-xs sm:text-sm lg:text-base">
              YOUR ROOM
            </p>
            <p className="text-blue-600 text-lg sm:text-xl lg:text-[30px] font-semibold leading-tight">
              Room C01 - Penthouse
            </p>
            <p className="text-[#717680] text-xs sm:text-sm lg:text-base mb-1">
              Check-out • Jul 26, 2025
            </p>
            <span className="inline-block bg-[#e9f0fd] text-[#19429d] text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              Second Floor
            </span>
          </div>
        </div>
      </div>

      {/* Services and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 w-full min-w-0">
        {/* Suggested Services */}
        <div className="flex flex-col gap-3 sm:gap-4 min-w-0 w-full">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-blue-600/10 backdrop-blur-md p-1.5 sm:p-2 rounded-full shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-[#181d27] leading-tight">
              Suggested for you{" "}
              <span className="hidden sm:inline font-normal text-[#717680] text-xs sm:text-sm lg:text-base">
                (Based on your last stay)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {[1, 2].map((item) => (
              <button
                key={item}
                onClick={handleFoodClick}
                className="flex flex-col gap-1.5 sm:gap-2 text-left hover:opacity-90 transition-opacity"
              >
                <div className="h-[110px] sm:h-[140px] lg:h-[193px] w-full rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=268&h=193&fit=crop"
                    alt="Spicy Thai Basic Chicken"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xs sm:text-sm lg:text-base text-black line-clamp-1">
                      Spicy Thai Basic Chicken
                    </p>
                    <p className="text-[#717680] text-[10px] sm:text-xs lg:text-sm line-clamp-2">
                      Freshly prepared and served based on order.
                    </p>
                  </div>
                  <p className="text-blue-600 text-sm sm:text-base lg:text-lg font-bold">
                    $249
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div className="flex flex-col gap-3 sm:gap-4 min-w-0 w-full">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-blue-600/10 backdrop-blur-md p-1.5 sm:p-2 rounded-full shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-[#181d27]">
              Quick Services
            </h2>
          </div>

          <div className="bg-neutral-100 border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3 lg:gap-4">
            {[
              {
                name: "Room Service",
                color: "bg-[#dc6803]",
                icon: "🛁",
                id: 1,
              },
              { name: "Laundry", color: "bg-[#039855]", icon: "👔", id: 2 },
              {
                name: "SPA & Amenities",
                color: "bg-[#1570ef]",
                icon: "☕",
                id: 3,
              },
            ].map((service, idx) => (
              <button
                key={idx}
                onClick={() =>
                  router.push(
                    `/dashboard/services/request?service=${
                      service.id
                    }&name=${encodeURIComponent(service.name)}`
                  )
                }
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 flex items-center justify-between hover:shadow-md transition-shadow min-w-0"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 min-w-0 flex-1">
                  <div
                    className={`${service.color} p-2 sm:p-2.5 lg:p-3 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-base sm:text-lg lg:text-xl">
                      {service.icon}
                    </span>
                  </div>
                  <p className="text-[#252b37] text-xs sm:text-sm lg:text-xl font-medium truncate">
                    {service.name}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#717680] flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Requests Table */}
      <div className="mt-4 sm:mt-5 lg:mt-6 bg-white border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#181d27] p-3 sm:p-4">
          Active Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px] sm:min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-[#535862] whitespace-nowrap">
                  Service Type
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-[#535862] min-w-[180px] sm:min-w-[200px]">
                  Description
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-[#535862] whitespace-nowrap">
                  Time
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-[#535862] whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  service: "Room Service",
                  description:
                    "I have a slight injury on my lower right back from lifting luggage, so please avoid deep pressure in that area. Also, I have sensitive...",
                  status: "Pending",
                  completed: false,
                },
                {
                  service: "Housekeeping",
                  description:
                    "We accidentally spilled some soda on the rug near the bed. Could you please send someone to clean it up before it stains? We also need fresh towels.",
                  status: "Pending",
                  completed: false,
                },
                {
                  service: "Laundry",
                  description:
                    "The blue silk dress is very delicate. Please dry clean only and do not use high heat. It has a small sequin detail on the collar, please be careful.",
                  status: "Pending",
                  completed: false,
                },
                {
                  service: "Breakfast Order",
                  description: "Continental breakfast for 2",
                  status: "Completed",
                  completed: true,
                },
              ].map((request, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 bg-neutral-50"
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                          request.completed ? "bg-[#ecfdf3]" : "bg-[#fffaeb]"
                        }`}
                      >
                        <Clock
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                            request.completed
                              ? "text-[#039855]"
                              : "text-[#dc6803]"
                          }`}
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#181d27] whitespace-nowrap">
                        {request.service}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <p className="text-xs sm:text-sm text-[#535862] line-clamp-2">
                      {request.description}
                    </p>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm text-[#535862]">
                      <p>01:01</p>
                      <p className="text-[10px] sm:text-xs">Est. 15-30 min</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span
                      className={`inline-block px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                        request.completed
                          ? "bg-[#ecfdf3] text-[#027a48]"
                          : "bg-[#fffaeb] text-[#b54708]"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
