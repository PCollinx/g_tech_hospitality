"use client";

import { useState } from "react";
import {
  Loading,
  LoadingSpinner,
  LoadingSkeleton,
  PageLoading,
} from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

export default function TestLoadingPage() {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showPageLoading, setShowPageLoading] = useState(false);

  if (showPageLoading) {
    return <PageLoading message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Loading Components Test
        </h1>

        {/* Basic Loading */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            1. Basic Loading Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-sm font-medium mb-4 text-gray-600">
                Small Size
              </p>
              <Loading size="sm" text="Loading..." />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-sm font-medium mb-4 text-gray-600">
                Medium Size (Default)
              </p>
              <Loading size="md" text="Processing request..." />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-sm font-medium mb-4 text-gray-600">
                Large Size
              </p>
              <Loading size="lg" text="Please wait..." />
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            2. Loading Spinner (Minimal)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-center">
              <LoadingSpinner size="sm" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-center">
              <LoadingSpinner size="md" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            3. Loading Skeleton (Content Placeholder)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <LoadingSkeleton className="h-32 mb-4" />
              <LoadingSkeleton className="h-4 w-3/4 mb-2" />
              <LoadingSkeleton className="h-4 w-1/2" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex gap-4 mb-4">
                <LoadingSkeleton className="h-20 w-20 rounded-full" />
                <div className="flex-1">
                  <LoadingSkeleton className="h-4 w-full mb-2" />
                  <LoadingSkeleton className="h-4 w-2/3" />
                </div>
              </div>
              <LoadingSkeleton className="h-24" />
            </div>
          </div>
        </div>

        {/* Button with Spinner */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            4. Button Loading States
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button
              disabled
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <LoadingSpinner size="sm" />
              Processing...
            </Button>
            <Button
              disabled
              className="bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <LoadingSpinner size="sm" />
              Saving...
            </Button>
            <Button
              disabled
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <LoadingSpinner size="sm" />
              Submitting...
            </Button>
          </div>
        </div>

        {/* Fullscreen Loading */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            5. Fullscreen Loading Overlay
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 mb-4">
              Click the button below to show a fullscreen loading overlay:
            </p>
            <Button
              onClick={() => {
                setShowFullScreen(true);
                setTimeout(() => setShowFullScreen(false), 3000);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Show Fullscreen Loading (3s)
            </Button>
          </div>
        </div>

        {/* Page Loading */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            6. Full Page Loading
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 mb-4">
              Click the button below to show a full page loading screen:
            </p>
            <Button
              onClick={() => {
                setShowPageLoading(true);
                setTimeout(() => setShowPageLoading(false), 3000);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Show Page Loading (3s)
            </Button>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            7. Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loading Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">
                Loading Service Requests
              </h3>
              <div className="flex flex-col items-center py-8">
                <Loading text="Loading requests..." />
              </div>
            </div>

            {/* Loading Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">
                Loading Table Data
              </h3>
              <div className="space-y-3">
                <LoadingSkeleton className="h-10" />
                <LoadingSkeleton className="h-10" />
                <LoadingSkeleton className="h-10" />
                <LoadingSkeleton className="h-10" />
              </div>
            </div>

            {/* Loading Dashboard */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">
                Loading Dashboard Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <LoadingSkeleton className="h-24" />
                <LoadingSkeleton className="h-24" />
                <LoadingSkeleton className="h-24" />
                <LoadingSkeleton className="h-24" />
              </div>
            </div>

            {/* Loading Profile */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">
                Loading Profile
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <LoadingSkeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1">
                  <LoadingSkeleton className="h-4 w-3/4 mb-2" />
                  <LoadingSkeleton className="h-3 w-1/2" />
                </div>
              </div>
              <LoadingSkeleton className="h-20" />
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Usage Examples
          </h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`// Basic Loading
<Loading text="Loading services..." />

// Small Spinner
<LoadingSpinner size="sm" />

// Fullscreen Overlay
<Loading fullScreen text="Processing..." />

// Page Loading
<PageLoading message="Setting up dashboard..." />

// Content Skeleton
<LoadingSkeleton className="h-32 w-full" />

// Button Loading
<button disabled>
  <LoadingSpinner size="sm" />
  Processing...
</button>`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Fullscreen Loading Overlay */}
      {showFullScreen && (
        <Loading fullScreen size="lg" text="Processing your request..." />
      )}
    </div>
  );
}
