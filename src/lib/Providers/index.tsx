"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";
// import UserProvider from "@/src/context/user.provider"; // Uncomment this when UserProvider is needed

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  // const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      {/* If you want to use UserProvider, uncomment this and wrap it */}
      <UserProvider>
        {children}
        <Toaster position="top-right" />
      </UserProvider>
    </QueryClientProvider>
  );
}
