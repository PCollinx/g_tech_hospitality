"use client";

import {
  Users,
  Hotel,
  FileText,
  AlertCircle,
  ArrowUp,
  Upload,
} from "lucide-react";

export default function AdminDashboard() {
  const statsCards = [
    {
      title: "Total Guests",
      value: "246",
      change: "+12% from last month",
      icon: Users,
      iconBg: "bg-[#1570ef]",
      iconColor: "text-white",
    },
    {
      title: "Active Rooms",
      value: "87",
      change: "+74% from last month",
      icon: Hotel,
      iconBg: "bg-[#6938ef]",
      iconColor: "text-white",
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "+12% from last month",
      icon: FileText,
      iconBg: "bg-[#dc6803]",
      iconColor: "text-white",
    },
    {
      title: "Active Alerts",
      value: "7",
      change: "+12% from last month",
      icon: AlertCircle,
      iconBg: "bg-[#d92d20]",
      iconColor: "text-white",
    },
  ];

  const recentActivities = [
    {
      name: "Sarah Miller",
      action: "Check-in • Room A04",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Michael Chen",
      action: "Check-in • Room B04",
      status: "Pending",
      statusColor: "bg-[#fffaeb] text-[#b54708]",
      time: "5 minutes ago",
      borderColor: "bg-[#dc6803]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
    {
      name: "Emma Wilson",
      action: "Check-in • Room C01",
      status: "Completed",
      statusColor: "bg-[#ecfdf3] text-[#027a48]",
      time: "2 minutes ago",
      borderColor: "bg-[#039855]",
    },
  ];

  const staffMembers = Array(9).fill({
    name: "Alice Johnson",
    role: "Housekeeping",
    status: "Active",
    statusColor: "bg-[#ecfdf3] text-[#027a48]",
    tasks: "8 tasks",
  });

  return (
    <div className="p-6 bg-white min-h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-xl font-semibold leading-[30px] text-[#181d27]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Hotel Operations
          </h2>
          <p
            className="text-base leading-6 text-[#535862]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Dashboard management
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors">
          <Upload className="w-6 h-6" />
          <span
            className="text-sm inline-block font-semibold leading-5"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Export Data
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="bg-neutral-100 border border-[#e9eaeb] rounded-3xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-[18px] p-4 flex flex-col"
              >
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                      <p
                        className="text-base leading-6 text-[#535862]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.title}
                      </p>
                      <p
                        className="text-[30px] leading-[38px] font-semibold text-[#181d27]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#ecfdf3] rounded-2xl px-2 py-0.5 w-fit">
                      <ArrowUp className="w-3 h-3 text-[#027a48]" />
                      <p
                        className="text-xs leading-[18px] text-[#027a48] font-medium"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        {card.change}
                      </p>
                    </div>
                  </div>
                  <div className={`${card.iconBg} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity and Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white border border-[#e9eaeb] rounded-2xl overflow-hidden">
          <div className="p-4">
            <h3
              className="text-base font-medium leading-6 text-black"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Recent Activity
            </h3>
          </div>
          <div className="px-4 pb-4 overflow-y-auto max-h-[700px]">
            <div className="flex flex-col gap-5">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${activity.borderColor} w-1 h-[45px] rounded-lg`}
                      />
                      <div className="flex flex-col gap-0.5 min-w-[118px]">
                        <p
                          className="text-sm leading-5 text-[#181d27]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {activity.name}
                        </p>
                        <p
                          className="text-xs leading-[18px] text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 items-end">
                      <div
                        className={`${activity.statusColor} px-2 py-0.5 rounded-2xl text-center`}
                      >
                        <p
                          className="text-xs leading-[18px] font-medium"
                          style={{ fontFamily: "Pretendard, sans-serif" }}
                        >
                          {activity.status}
                        </p>
                      </div>
                      <p
                        className="text-xs leading-[18px] text-[#717680] text-center"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  {index < recentActivities.length - 1 && (
                    <div className="h-0.5 bg-[#e9eaeb] rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Status */}
        <div className="bg-white border border-[#e9eaeb] rounded-2xl overflow-hidden">
          <div className="p-4">
            <h3
              className="text-base font-medium leading-6 text-black"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Staff Status
            </h3>
          </div>
          <div className="px-4 pb-4 overflow-y-auto max-h-[700px]">
            <div className="flex flex-col gap-5">
              {staffMembers.map((staff, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f0fd] flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-[118px]">
                        <p
                          className="text-sm leading-5 text-[#181d27]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {staff.name}
                        </p>
                        <p
                          className="text-xs leading-[18px] text-[#717680]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {staff.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 items-end">
                      <div
                        className={`${staff.statusColor} px-2 py-0.5 rounded-2xl text-center`}
                      >
                        <p
                          className="text-xs leading-[18px] font-medium"
                          style={{ fontFamily: "Pretendard, sans-serif" }}
                        >
                          {staff.status}
                        </p>
                      </div>
                      <p
                        className="text-xs leading-[18px] text-[#717680] text-center"
                        style={{ fontFamily: "Geist, sans-serif" }}
                      >
                        {staff.tasks}
                      </p>
                    </div>
                  </div>
                  {index < staffMembers.length - 1 && (
                    <div className="h-0.5 bg-[#e9eaeb] rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
