"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotel } from "@/lib/store";
import { UserRole } from "@/types/hotel";
import {
  Menu,
  Search,
  Bell,
  Clock,
  ChevronDown,
  Building,
  RotateCcw,
  ShieldCheck,
  User,
  LogOut,
  ExternalLink,
  Sparkles,
  BedDouble,
  Users,
  AlertTriangle,
} from "lucide-react";

export const TopNavbar: React.FC<{ onOpenMobileMenu: () => void }> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
  const {
    currentUser,
    switchUserRole,
    users,
    notifications,
    employees,
    rooms,
    reservations,
    clockIn,
    clockOut,
    attendance,
    resetAllData,
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if current user is clocked in
  const today = new Date().toISOString().split("T")[0];
  const userAttendance = attendance.find(
    (a) => a.employeeName === currentUser.name && a.date === today
  );
  const isClockedIn = userAttendance?.status === "Present" || userAttendance?.status === "On Duty";

  // Filter global search results across employees, rooms, reservations
  const filteredEmployees = searchQuery.trim()
    ? employees.filter(
        (e) =>
          e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredRooms = searchQuery.trim()
    ? rooms.filter(
        (r) =>
          r.roomNumber.includes(searchQuery) ||
          r.roomType.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredReservations = searchQuery.trim()
    ? reservations.filter(
        (r) =>
          r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasSearchResults =
    filteredEmployees.length > 0 || filteredRooms.length > 0 || filteredReservations.length > 0;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-8 bg-white border-b border-hotel-border shadow-sm">
      {/* Left side: Hamburger + Hotel Property Selector */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 text-hotel-muted rounded-lg hover:bg-hotel-ice hover:text-hotel-accent lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-hotel-ice border border-blue-100 text-xs font-semibold text-hotel-navy">
          <Building className="w-4 h-4 text-hotel-accent" />
          <span className="hidden sm:inline">The Grand Elysium Palace</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-hotel-accent text-white rounded font-bold">
            Flagship 5★
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div ref={searchRef} className="relative flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
          <input
            type="text"
            placeholder="Search employees, rooms (e.g. 501), guests, folios..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent focus:bg-white transition-all text-hotel-text placeholder-hotel-muted"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-dropdown border border-hotel-border p-2 z-50 max-h-96 overflow-y-auto">
            {hasSearchResults ? (
              <div className="space-y-3">
                {filteredEmployees.length > 0 && (
                  <div>
                    <p className="px-2 py-1 text-[10px] font-bold text-hotel-muted uppercase">
                      Employees
                    </p>
                    {filteredEmployees.map((emp) => (
                      <Link
                        key={emp.id}
                        href="/employees"
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-hotel-ice text-xs text-hotel-text"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={emp.photo}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-semibold text-hotel-navy">
                              {emp.fullName}
                            </span>
                            <span className="text-[11px] text-hotel-muted ml-1.5">
                              ({emp.designation})
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-hotel-accent bg-blue-50 px-1.5 py-0.5 rounded">
                          {emp.employeeCode}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredRooms.length > 0 && (
                  <div>
                    <p className="px-2 py-1 text-[10px] font-bold text-hotel-muted uppercase">
                      Suites & Rooms
                    </p>
                    {filteredRooms.map((rm) => (
                      <Link
                        key={rm.id}
                        href="/front-office"
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-hotel-ice text-xs text-hotel-text"
                      >
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-hotel-accent" />
                          <span className="font-semibold text-hotel-navy">
                            Suite {rm.roomNumber} - {rm.roomType}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            rm.status === "Occupied"
                              ? "bg-purple-100 text-purple-700"
                              : rm.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {rm.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredReservations.length > 0 && (
                  <div>
                    <p className="px-2 py-1 text-[10px] font-bold text-hotel-muted uppercase">
                      Guest Reservations
                    </p>
                    {filteredReservations.map((res) => (
                      <Link
                        key={res.id}
                        href="/reservations"
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-hotel-ice text-xs text-hotel-text"
                      >
                        <span className="font-semibold text-hotel-navy">
                          {res.guestName} (Room {res.roomNumber})
                        </span>
                        <span className="text-[10px] text-hotel-muted">
                          {res.bookingCode}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-hotel-muted">
                No matching records found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Quick Web Check-In / Duty Clock Toggle */}
        <button
          onClick={() => {
            const myEmp = employees.find((e) => e.fullName === currentUser.name);
            if (myEmp) {
              if (isClockedIn) {
                clockOut(myEmp.id);
              } else {
                clockIn(myEmp.id, "Biometric WebSync");
              }
            } else {
              // Owner/GM toggle
              alert(`Simulated duty status toggled for ${currentUser.name}`);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            isClockedIn
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          }`}
          title="Toggle your daily on-duty status"
        >
          <Clock className={`w-3.5 h-3.5 ${isClockedIn ? "text-emerald-600 animate-pulse" : "text-gray-500"}`} />
          <span className="hidden sm:inline">
            {isClockedIn ? "On Duty (Active)" : "Clock In"}
          </span>
        </button>

        {/* 15-Role Switcher Trigger Button */}
        <button
          onClick={() => setShowRoleModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-hotel-ice border border-blue-200 text-hotel-accent hover:bg-blue-100 text-xs font-bold transition-all shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-hotel-accent" />
          <span className="hidden sm:inline">Switch Role</span>
          <span className="text-[10px] px-1 bg-white text-hotel-accent rounded font-bold">
            15
          </span>
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 text-hotel-muted hover:text-hotel-navy hover:bg-hotel-ice rounded-lg transition-all"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-hotel-error text-[10px] font-bold text-white ring-2 ring-white">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-dropdown border border-hotel-border p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
                <span className="text-xs font-bold text-hotel-navy">
                  Operational Alerts ({notifications.length})
                </span>
                <Link
                  href="/approvals"
                  onClick={() => setShowNotifDropdown(false)}
                  className="text-[11px] font-semibold text-hotel-accent hover:underline"
                >
                  View Approvals
                </Link>
              </div>

              <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href={notif.link}
                      onClick={() => setShowNotifDropdown(false)}
                      className="block p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-hotel-ice/60 border border-hotel-border transition-all"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            notif.type === "error"
                              ? "text-hotel-error"
                              : notif.type === "warning"
                              ? "text-hotel-warning"
                              : "text-hotel-accent"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-hotel-navy truncate">
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-hotel-muted mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                          <span className="text-[10px] font-medium text-hotel-muted mt-1 block">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-hotel-muted">
                    All operations normal. No pending alerts!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div ref={userMenuRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-hotel-border hover:bg-hotel-ice transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold text-hotel-navy block leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-hotel-muted block mt-0.5">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-hotel-muted mr-1" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-dropdown border border-hotel-border p-2 z-50">
              <div className="px-3 py-2 border-b border-hotel-border">
                <p className="text-xs font-bold text-hotel-navy truncate">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-hotel-muted truncate">
                  {currentUser.email}
                </p>
                <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-hotel-accent">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/self-service"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-hotel-text hover:bg-hotel-ice rounded-lg"
                >
                  <User className="w-4 h-4 text-hotel-muted" />
                  My Staff Profile
                </Link>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setShowRoleModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-hotel-text hover:bg-hotel-ice rounded-lg text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-hotel-accent" />
                  Switch Active Role
                </button>
                <button
                  onClick={() => {
                    if (confirm("Reset all operational data back to default luxury demo state?")) {
                      resetAllData();
                      setShowUserMenu(false);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg text-left"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  Reset Demo State
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 15-Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-dropdown border border-hotel-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-hotel-border bg-gradient-to-r from-hotel-ice to-white">
              <div>
                <h3 className="text-base font-extrabold text-hotel-navy">
                  Role-Based Access Control Switcher
                </h3>
                <p className="text-xs text-hotel-muted">
                  Test the entire platform across 15 enterprise roles and verify role-specific permissions.
                </p>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {users.map((u) => {
                const isCurrent = currentUser.role === u.role;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUserRole(u.role);
                      setShowRoleModal(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? "bg-blue-50/80 border-hotel-accent ring-2 ring-hotel-accent/20"
                        : "bg-white border-hotel-border hover:border-hotel-accent hover:bg-hotel-ice/40"
                    }`}
                  >
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover border border-hotel-border flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-hotel-navy truncate">
                          {u.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-hotel-accent bg-white px-1.5 py-0.5 rounded shadow-xs">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-hotel-accent block mt-0.5">
                        {u.role}
                      </span>
                      <span className="text-[10px] text-hotel-muted block truncate mt-0.5">
                        {u.email}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-6 py-3 bg-[#F8FAFC] border-t border-hotel-border flex items-center justify-between">
              <span className="text-xs text-hotel-muted">
                Currently logged in as: <strong className="text-hotel-navy">{currentUser.role}</strong>
              </span>
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
