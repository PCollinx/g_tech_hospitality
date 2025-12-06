"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full max-w-[100vw] bg-blue-600 text-white overflow-hidden">
      {/* Footer Container with horizontal margins */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        {/* Footer Background Image - Positioned at top with matching horizontal spacing */}
        <div
          className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-16 lg:right-16 xl:left-32 xl:right-32 pointer-events-none opacity-80"
          style={{
            backgroundImage: "url(/footer-bg.svg)",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        />

        {/* Footer Content with top spacing to clear background */}
        <div className="relative pt-48 sm:pt-52 md:pt-56 pb-12 md:pb-16 lg:pb-24">
          {/* Footer Content */}
          <div className="flex flex-col justify-center gap-8 md:gap-12">
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* About */}
              <div className="flex flex-col gap-4 md:gap-6">
                <h3 className="text-base md:text-lg lg:text-xl font-medium">
                  About
                </h3>
                <div className="flex flex-col gap-3 md:gap-4 text-xs md:text-sm opacity-70">
                  <Link
                    href="/about"
                    className="hover:opacity-100 transition-opacity"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-8 md:gap-12">
              {/* Copyright & Social */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-xs md:text-sm text-center sm:text-left">
                  © 2025 luxehaven. All rights reserved. Designed & Built with
                  ❤️ at the KTech Fest Hackathon 2025.
                </p>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-8 md:gap-12 items-center">
                <div className="w-full h-px bg-white/20" />
                <p className="text-xs md:text-sm opacity-75 md:text-center max-w-[1139px] px-4">
                  AI-powered hospitality automation designed to completely
                  transform the way modern hotels operate. Our platform brings
                  together every touchpoint of the guest experience, before
                  arrival, during the stay, and long after checkout, into one
                  seamless, intelligent ecosystem. With advanced automation,
                  smart insights, and deeply integrated workflows, we help
                  hotels unlock new levels of efficiency, elevate guest
                  satisfaction, and stay ahead in a fast-evolving industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
