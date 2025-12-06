"use client";

import { SessionProvider } from "./SessionProvider";
import ToastProvider from "./ToastProvider";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <ToastProvider />
    </SessionProvider>
  );
}
