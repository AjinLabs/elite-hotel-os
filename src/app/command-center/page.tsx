"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  Radio,
  ShieldCheck,
  Sparkles,
  BedDouble,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Activity,
  Flame,
  Zap,
  Droplet,
  Wifi,
  DoorOpen,
  Send,
} from "lucide-react";

export default function HotelCommandCenter() {
  const {
    departments,
    rooms,
    employees,
    attendance,
    maintenanceTickets,
    leaveRequests,
    reservations,
    createAnnouncement,
  } = useHotel();

  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // Critical items calculation
  const totalOccupied = rooms.filter((r) => r.status === "Occupied").length;
  const totalDirty = rooms.filter((r) => r.status === "Dirty" || r.status === "Cleaning").length;
  const criticalTickets = maintenanceTickets.filter((m) => m.severity.includes("Critical") && m.status !== "Resolved");

  // Filter rooms by floor
  const floorRooms = rooms.filter((r) => r.floor === selectedFloor);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-hotel-navy text-white shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-hotel-accent text-white shadow-glow">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight">
                HOTEL COMMAND CENTRE
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                OPERATIONAL HEARTBEAT: OPTIMAL
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Live multi-department coordination, IoT building automation, and real-time incident resolution.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hotel-accent text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            Dispatch Urgent Broadcast
          </button>
        </div>
      </div>

      {/* Building Environmental & BMS Sensors Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-hotel-muted uppercase">Power Grid</p>
              <p className="text-xs font-extrabold text-hotel-navy">Dual Cummins Sync</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            100%
          </span>
        </div>

        <div className="hotel-card p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-hotel-muted uppercase">Water RO System</p>
              <p className="text-xs font-extrabold text-hotel-navy">4.8 Bar Pressure</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            Normal
          </span>
        </div>

        <div className="hotel-card p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-hotel-muted uppercase">Fire Life Safety</p>
              <p className="text-xs font-extrabold text-hotel-navy">All 420 Zones Armed</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Secure
          </span>
        </div>

        <div className="hotel-card p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-hotel-muted uppercase">Guest Wi-Fi 6</p>
              <p className="text-xs font-extrabold text-hotel-navy">1.2 Gbps Dedicated</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            99.99%
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Floor Map + Department Health Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor-by-Floor Interactive Suite Matrix */}
        <div className="lg:col-span-2 hotel-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-hotel-border">
            <div>
              <h2 className="text-sm font-extrabold text-hotel-navy flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-hotel-accent" />
                Floor-by-Floor Operational Suite Matrix
              </h2>
              <p className="text-[11px] text-hotel-muted">
                Live housekeeping and guest status across wings
              </p>
            </div>

            {/* Floor selector buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-hotel-ice rounded-xl text-xs font-bold">
              {[1, 2, 3, 4, 5].map((fl) => (
                <button
                  key={fl}
                  onClick={() => setSelectedFloor(fl)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    selectedFloor === fl
                      ? "bg-hotel-accent text-white shadow-xs"
                      : "text-hotel-navy hover:text-hotel-accent"
                  }`}
                >
                  Floor {fl} {fl === 5 ? "(Sky Villas)" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Suites in Selected Floor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {floorRooms.map((rm) => (
              <div
                key={rm.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  rm.status === "Occupied"
                    ? "bg-blue-50/50 border-blue-200"
                    : rm.status === "Available"
                    ? "bg-emerald-50/40 border-emerald-200"
                    : rm.status === "Maintenance"
                    ? "bg-red-50/50 border-red-200"
                    : "bg-amber-50/50 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-hotel-navy">
                    Suite {rm.roomNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rm.status === "Occupied"
                        ? "bg-blue-600 text-white"
                        : rm.status === "Available"
                        ? "bg-emerald-600 text-white"
                        : rm.status === "Maintenance"
                        ? "bg-red-600 text-white"
                        : "bg-amber-600 text-white"
                    }`}
                  >
                    {rm.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-hotel-navy mt-1 truncate">
                  {rm.roomType}
                </p>

                {rm.guestName ? (
                  <div className="mt-2 pt-2 border-t border-black/5 text-[11px]">
                    <p className="font-bold text-hotel-navy truncate">
                      {rm.guestName}
                    </p>
                    <p className="text-hotel-muted text-[10px]">
                      Checkout: {rm.checkOutDate} {rm.isVip && "• VIP"}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 pt-2 border-t border-black/5 text-[10px] text-hotel-muted">
                    {rm.status === "Cleaning"
                      ? "Turnaround in progress"
                      : rm.status === "Maintenance"
                      ? "Awaiting spare valve"
                      : "Ready for arrival"}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-hotel-ice/60 rounded-xl flex items-center justify-between text-xs text-hotel-muted">
            <span className="font-medium">
              Showing Floor {selectedFloor} suites. Total on floor: {floorRooms.length}
            </span>
            <span className="text-hotel-navy font-bold">
              Rate: ₹{floorRooms[0]?.pricePerNight.toLocaleString() || "35,000"} / night
            </span>
          </div>
        </div>

        {/* 22 Department Real-Time Health Radar */}
        <div className="hotel-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
            <div>
              <h2 className="text-sm font-extrabold text-hotel-navy flex items-center gap-2">
                <Activity className="w-4 h-4 text-hotel-accent" />
                Department Health Radar
              </h2>
              <p className="text-[11px] text-hotel-muted">
                Staffing & operational SLA status
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              22 Active
            </span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {departments.map((dept) => {
              // Calculate status
              const isEngineeringCritical = dept.code === "ENG" && criticalTickets.length > 0;
              return (
                <div
                  key={dept.id}
                  className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-hotel-ice/50 border border-hotel-border transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-hotel-navy truncate">
                        {dept.name}
                      </span>
                      <span className="text-[10px] text-hotel-muted font-mono">
                        ({dept.code})
                      </span>
                    </div>
                    <p className="text-[10px] text-hotel-muted truncate mt-0.5">
                      Lead: {dept.headName}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      isEngineeringCritical
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {isEngineeringCritical ? "Spares Pending" : "Optimal"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Urgent Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Dispatch Urgent Hotel Broadcast
              </h3>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-hotel-navy block mb-1">
                  Broadcast Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g., Protocol Security Alert: VIP Convoy Arrival"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-hotel-navy block mb-1">
                  Message Content & Instructions
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail explicit instructions for hotel staff..."
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!broadcastTitle || !broadcastContent) {
                    alert("Please provide both headline and content");
                    return;
                  }
                  createAnnouncement({
                    title: broadcastTitle,
                    content: broadcastContent,
                    author: "Command Centre",
                    authorRole: "Executive Command",
                    audience: "All Hotel Staff",
                    priority: "Urgent Alert",
                  });
                  setBroadcastTitle("");
                  setBroadcastContent("");
                  setShowBroadcastModal(false);
                  alert("Urgent broadcast dispatched to all hotel departments!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Dispatch Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
