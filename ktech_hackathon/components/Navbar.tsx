"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AlignLeft, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/storage";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = storage.getAccessToken();
      const storedUser = storage.getUser();
      setIsAuthenticated(!!token && !!storedUser);
      setUser(storedUser);
    };

    checkAuth();

    // Check auth on storage changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    storage.clearAuth();
    await signOut({ redirect: false });
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const isHomePage = window.location.pathname === "/";
      const isInHeroSection = scrollY < 400;

      setIsDarkBackground(isHomePage && isInHeroSection);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className={`backdrop-blur-xl border shadow-lg px-2 sm:pl-4 transition-colors duration-300 ${
          isDarkBackground && !isScrolled
            ? "bg-white/10 border-white/30"
            : "bg-white/95 border-gray-200"
        }`}
        style={{ overflow: "hidden" }}
        initial={false}
        animate={{
          marginTop: isMenuOpen ? "0px" : windowWidth >= 640 ? "40px" : "24px",
          marginLeft: isMenuOpen ? "0px" : windowWidth >= 640 ? "5%" : "3%",
          marginRight: isMenuOpen ? "0px" : windowWidth >= 640 ? "5%" : "3%",
          width: isMenuOpen ? "100%" : windowWidth >= 640 ? "90%" : "94%",
          maxWidth: isMenuOpen ? "100%" : "1200px",
          borderRadius: isMenuOpen ? "0px" : "100px",
          paddingTop: isMenuOpen ? "20px" : "8px",
          paddingBottom: isMenuOpen ? "20px" : "8px",
        }}
        transition={{
          marginTop: {
            duration: isMenuOpen ? 0.35 : 0.3,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.32, 0, 0.67, 0],
            delay: 0,
          },
          marginLeft: {
            duration: isMenuOpen ? 0.35 : 0.25,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.22, 1, 0.36, 1],
            delay: isMenuOpen ? 0 : 0.2,
          },
          marginRight: {
            duration: isMenuOpen ? 0.35 : 0.25,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.22, 1, 0.36, 1],
            delay: isMenuOpen ? 0 : 0.2,
          },
          width: {
            duration: isMenuOpen ? 0.35 : 0.25,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.22, 1, 0.36, 1],
            delay: isMenuOpen ? 0 : 0.2,
          },
          maxWidth: {
            duration: isMenuOpen ? 0.35 : 0.25,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.22, 1, 0.36, 1],
            delay: isMenuOpen ? 0 : 0.2,
          },
          borderRadius: {
            duration: isMenuOpen ? 0.35 : 0.25,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.22, 1, 0.36, 1],
            delay: isMenuOpen ? 0 : 0.2,
          },
          paddingTop: {
            duration: isMenuOpen ? 0.35 : 0.3,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.32, 0, 0.67, 0],
            delay: 0,
          },
          paddingBottom: {
            duration: isMenuOpen ? 0.35 : 0.3,
            ease: isMenuOpen ? [0.32, 0.72, 0, 1] : [0.32, 0, 0.67, 0],
            delay: 0,
          },
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.img
              src={
                isDarkBackground && !isScrolled
                  ? "/dashboard-logo.svg"
                  : "/logo.svg"
              }
              alt="luxehaven"
              className="h-7 sm:h-8 md:h-9 w-auto"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={isDarkBackground && !isScrolled ? "dark" : "light"}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href="/#rooms"
                className={`text-sm font-medium transition-colors ${
                  isDarkBackground && !isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Rooms
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  isDarkBackground && !isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                About
              </Link>
              {isAuthenticated && (
                <Link
                  href={
                    user?.role === "admin" || user?.role === "super-admin"
                      ? "/admin"
                      : "/dashboard"
                  }
                  className={`text-sm font-medium transition-colors ${
                    isDarkBackground && !isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                size="default"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 shadow-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Link href="/signup">
                <Button
                  size="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 shadow-sm"
                >
                  Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              ) : (
                <AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Dropdown Menu - Expanded navbar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="md:hidden"
            >
              <div className="flex flex-col gap-1 pt-6 pb-2">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <Link
                    href="/#rooms"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                      isDarkBackground && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Rooms
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                      isDarkBackground && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    About
                  </Link>
                </motion.div>
                {isAuthenticated && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.17,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    <Link
                      href={
                        user?.role === "admin" || user?.role === "super-admin"
                          ? "/admin"
                          : "/dashboard"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                        isDarkBackground && !isScrolled
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
                {isAuthenticated ? (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className={`pt-2 mt-2 ${
                      isDarkBackground && !isScrolled
                        ? "border-t border-white/20"
                        : "border-t border-gray-200"
                    }`}
                  >
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      size="default"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full w-full flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className={`pt-2 mt-2 ${
                      isDarkBackground && !isScrolled
                        ? "border-t border-white/20"
                        : "border-t border-gray-200"
                    }`}
                  >
                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        size="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full w-full"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
