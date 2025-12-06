"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { storage } from "./storage";

export function useAuth(requiredRole?: "admin" | "guest") {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = storage.getAccessToken();
      const storedUser = storage.getUser();

      if (!token || !storedUser) {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      setUser(storedUser);
      setIsAuthenticated(true);

      if (requiredRole === "admin") {
        const userRole = storedUser?.role || "guest";
        if (userRole !== "admin" && userRole !== "super-admin") {
          router.push("/dashboard");
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  return {
    isLoading,
    isAuthenticated,
    user,
    session,
    status,
  };
}

