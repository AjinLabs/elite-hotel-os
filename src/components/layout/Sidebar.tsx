"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHotel } from "@/lib/store";
import {
  LayoutDashboard,
  Radio,
  Sparkles,
  Users,
  Building2,
  Clock,
  CalendarCheck,
  UserCheck,
  BedDouble,
  BookOpenCheck,
  UtensilsCrossed,
  Boxes,
  Wrench,
  ShieldAlert,
  Landmark,
  Receipt,
  FileCheck2,
  BarChart3,
  BookOpen,
  MessageSquare,
  HeartHandshake,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Crown,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentUser, notifications, leaveRequests, purchaseOrders, maintenanceTickets } = useHotel();

  const pendingApprovalsCount =
    leaveRequests.filter((l) => l.status.startsWith("Pending")).length +
    purchaseOrders.filter((p) => p.status.includes("Pending")).length;

  const criticalIssuesCount = maintenanceTickets.filter(
    (m) => m.severity.includes("Critical") && m.status !== "Resolved"
  ).length;

  const navSections: NavSection[] = [
    {
      title: "EXECUTIVE COMMAND",
      items: [
        { name: "Owner Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Command Centre", href: "/command-center", icon: Radio, badge: "LIVE" },
        { name: "Grounded AI Assistant", href: "/ai-assistant", icon: Sparkles, badge: "AI" },
      ],
    },
    {
      title: "PEOPLE & HRMS",
      items: [
        { name: "Employee Directory", href: "/employees", icon: Users },
        { name: "Departments (22)", href: "/departments", icon: Building2 },
        { name: "Attendance & Shifts", href: "/attendance", icon: Clock },
        { name: "Leave Management", href: "/leave", icon: CalendarCheck, badge: leaveRequests.filter(l => l.status.startsWith("Pending")).length || undefined },
        { name: "Staff Self-Service", href: "/self-service", icon: UserCheck },
      ],
    },
    {
      title: "ROOMS & HOSPITALITY",
      items: [
        { name: "Front Office & Rooms", href: "/front-office", icon: BedDouble },
        { name: "Reservations & Folios", href: "/reservations", icon: BookOpenCheck },
        { name: "Housekeeping & Linen", href: "/housekeeping", icon: Sparkles },
        { name: "Guest Relations & CSAT", href: "/guest-relations", icon: HeartHandshake },
      ],
    },
    {
      title: "HOTEL OPERATIONS",
      items: [
        { name: "Kitchen & Culinary F&B", href: "/kitchen", icon: UtensilsCrossed },
        { name: "Inventory & Stores", href: "/inventory", icon: Boxes },
        { name: "Engineering & Maintenance", href: "/maintenance", icon: Wrench, badge: criticalIssuesCount > 0 ? `${criticalIssuesCount}!` : undefined },
        { name: "Security & Safety", href: "/security", icon: ShieldAlert },
      ],
    },
    {
      title: "FINANCE & GOVERNANCE",
      items: [
        { name: "Revenue & P&L", href: "/finance", icon: Landmark },
        { name: "Payroll Management", href: "/payroll", icon: Receipt },
        { name: "Approvals Hub", href: "/approvals", icon: FileCheck2, badge: pendingApprovalsCount || undefined },
        { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
        { name: "5-Star SOP Knowledge", href: "/knowledge-base", icon: BookOpen },
        { name: "Internal Messaging", href: "/messaging", icon: MessageSquare },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-hotel-navy/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-[#FFFFFF] border-r border-hotel-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-hotel-border bg-gradient-to-r from-hotel-ice/60 to-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-hotel-accent to-hotel-navy shadow-glow text-white font-bold">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-hotel-navy">
                  ELITE HOTEL OS
                </span>
              </div>
              <p className="text-[11px] font-medium text-hotel-muted">
                The Grand Elysium Luxury Hotel ★★★★★
              </p>
            </div>
          </div>
        </div>

        {/* Current Role Clearance Banner */}
        <div className="px-5 py-2.5 bg-hotel-ice/50 border-b border-hotel-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-hotel-accent" />
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold tracking-wider text-hotel-muted block">
                Active Clearance
              </span>
              <span className="text-xs font-semibold text-hotel-navy truncate block">
                {currentUser.role}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-hotel-accent text-white">
            PROD
          </span>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold tracking-wider text-hotel-muted uppercase">
                {section.title}
              </h3>
              <div className="space-y-0.5 mt-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        isActive
                          ? "bg-hotel-accent text-white font-semibold shadow-sm"
                          : "text-hotel-text hover:bg-hotel-ice hover:text-hotel-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${
                            isActive ? "text-white" : "text-hotel-muted"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? "bg-white text-hotel-accent"
                              : typeof item.badge === "string" && item.badge.includes("!")
                              ? "bg-red-100 text-hotel-error"
                              : "bg-blue-100 text-hotel-accent"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer User Info Card */}
        <div className="p-3 border-t border-hotel-border bg-[#FAFCFF]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-hotel-border shadow-sm">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-hotel-border"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-hotel-navy truncate">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-hotel-muted truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
