import { Hotel } from "lucide-react";
import Image from "next/image";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  text,
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Logo */}
      <div className="relative">
        {/* Pulsing background circle */}
        <div
          className={`absolute inset-0 bg-blue-100 rounded-full animate-ping ${sizeClasses[size]}`}
          style={{ animationDuration: "1.5s" }}
        />

        {/* Spinning outer ring */}
        <div
          className={`relative ${sizeClasses[size]} rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin`}
          style={{ animationDuration: "1s" }}
        />

        {/* Hotel icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Hotel
            className={`${
              size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"
            } text-blue-600`}
          />
        </div>
      </div>

      {/* Loading text */}
      {text && (
        <p
          className={`${textSizeClasses[size]} font-medium text-gray-700 animate-pulse`}
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          {text}
        </p>
      )}

      {/* Animated dots */}
      <div className="flex gap-1.5">
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "1s" }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "150ms", animationDuration: "1s" }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "300ms", animationDuration: "1s" }}
        />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// Spinner only variant (no text, minimal)
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-blue-600 animate-spin`}
      style={{ animationDuration: "0.8s" }}
    />
  );
}

// Card loading skeleton for content
export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-full w-full" />
    </div>
  );
}

// Page loading with hotel branding
export function PageLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.svg"
            alt="luxehaven"
            width={120}
            height={48}
            className="h-12 w-auto animate-pulse"
          />
        </div>

        {/* Animated hotel icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 w-16 h-16 bg-blue-100 rounded-full animate-ping"
              style={{ animationDuration: "1.5s" }}
            />
            <div
              className="relative w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"
              style={{ animationDuration: "1s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Hotel className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Message */}
        <p
          className="text-lg font-medium text-gray-700 mb-4"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          {message}
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms", animationDuration: "1s" }}
          />
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms", animationDuration: "1s" }}
          />
        </div>

        {/* Subtle message */}
        <p
          className="mt-8 text-sm text-gray-500"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}
