"use client";

import React, { useState } from "react";
import { HotelProvider } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <HotelProvider>
      <div className="min-h-screen bg-[#F7F9FC] text-hotel-text flex flex-col antialiased selection:bg-hotel-accent selection:text-white">
        {/* Desktop & Mobile Sidebar */}
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <TopNavbar onOpenMobileMenu={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </HotelProvider>
  );
};
