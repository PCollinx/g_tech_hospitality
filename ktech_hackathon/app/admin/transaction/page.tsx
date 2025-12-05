"use client";

import { useState } from "react";
import { Search, ChevronDown, Download } from "lucide-react";

interface Transaction {
  id: string;
  guestName: string;
  dateTime: string;
  roomNo: string;
  type: "Booking" | "Service" | "Refund";
  description: string;
  method: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export default function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "All Types" | "Booking" | "Service" | "Refund"
  >("All Types");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Mock transaction data
  const allTransactions: Transaction[] = [
    {
      id: "TXN00783741",
      guestName: "Daniel Kyle",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Booking",
      description: "Room Booking - 3 nights",
      method: "Credit Card",
      amount: 450.0,
      status: "Completed",
    },
    {
      id: "TXN00783742",
      guestName: "Michael Chen",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Service",
      description: "Room Service - Breakfast",
      method: "Credit Card",
      amount: 85.5,
      status: "Completed",
    },
    {
      id: "TXN00783743",
      guestName: "Emma Wilson",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Refund",
      description: "Cancellation Refund",
      method: "Debit Card",
      amount: -125.0,
      status: "Pending",
    },
    {
      id: "TXN00783744",
      guestName: "David Brown",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Booking",
      description: "Room Booking - 4 nights",
      method: "Debit Card",
      amount: 450.0,
      status: "Completed",
    },
    {
      id: "TXN00783745",
      guestName: "Sarah Johnson",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Booking",
      description: "Room Booking - 4 nights",
      method: "Debit Card",
      amount: 450.0,
      status: "Completed",
    },
    {
      id: "TXN00783746",
      guestName: "James Martinez",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Booking",
      description: "Room Booking - 4 nights",
      method: "Debit Card",
      amount: 450.0,
      status: "Completed",
    },
    {
      id: "TXN00783747",
      guestName: "Lisa Anderson",
      dateTime: "2025-12-05 14:23",
      roomNo: "305",
      type: "Booking",
      description: "Room Booking - 4 nights",
      method: "Debit Card",
      amount: 450.0,
      status: "Completed",
    },
  ];

  // Filter transactions based on type
  const transactions =
    typeFilter === "All Types"
      ? allTransactions
      : allTransactions.filter((t) => t.type === typeFilter);

  // Calculate stats based on filtered transactions
  const totalRevenue = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const todayTransactions = transactions.length;
  const pendingAmount = transactions
    .filter((t) => t.status === "Pending")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const avgTransaction =
    transactions.length > 0
      ? totalRevenue / transactions.filter((t) => t.amount > 0).length
      : 0;

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Booking":
        return "bg-blue-50 text-blue-700";
      case "Service":
        return "bg-green-50 text-green-700";
      case "Refund":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Failed":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title and Export Button */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Transactions
            </h2>
            <p className="mt-1 text-base text-gray-600">
              View and manage all payment transactions
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 pt-6">
        <div className="rounded-3xl border border-gray-200 bg-gray-100 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Revenue */}
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm md:text-base text-gray-600">
                    Total Revenue
                  </p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-green-600 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Today's Transactions */}
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm md:text-base text-gray-600">
                    Today&apos;s Transactions
                  </p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                    {todayTransactions}
                  </p>
                </div>
                <div className="rounded-lg bg-[#0086c9] p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending Amount */}
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm md:text-base text-gray-600">
                    Pending Amount
                  </p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                    ${pendingAmount.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-[#ff9b00] p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Avg Transaction */}
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm md:text-base text-gray-600">
                    Avg Transaction
                  </p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                    ${avgTransaction.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-600 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 pt-6">
        <div className="flex gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by transaction ID, guest, or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-base text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50"
            >
              {typeFilter}
              <ChevronDown className="h-5 w-5 text-gray-600" />
            </button>

            {showTypeDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {(["All Types", "Booking", "Service", "Refund"] as const).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        setShowTypeDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="px-6 pt-6 pb-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Guest Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Date &amp; Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Room No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.guestName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.dateTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.roomNo}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTypeBadgeColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.method}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-normal ${
                        transaction.amount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
