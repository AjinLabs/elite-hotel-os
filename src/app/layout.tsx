import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Elite Hotel OS — Luxury Five-Star Hotel ERP Platform",
  description: "Enterprise operations, HRMS, guest folios, kitchen, inventory, maintenance, and owner command system for The Grand Elysium Hotel & Resort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F9FC]">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
