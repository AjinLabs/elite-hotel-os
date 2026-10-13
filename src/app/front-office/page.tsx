"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { HotelRoom, RoomStatus } from "@/types/hotel";
import {
  BedDouble,
  DoorOpen,
  DoorClosed,
  Sparkles,
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function FrontOfficePage() {
  const {
    rooms,
    updateRoomStatus,
    checkInGuest,
    checkOutGuest,
    reservations,
  } = useHotel();

  const [selectedWing, setSelectedWing] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // New Check-In form
  const [checkInName, setCheckInName] = useState("");
  const [checkInIdProof, setCheckInIdProof] = useState("");
  const [checkInDays, setCheckInDays] = useState(3);
  const [isVip, setIsVip] = useState(false);

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    const matchesWing = selectedWing === "all" || r.wing === selectedWing;
    const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;
    return matchesWing && matchesStatus;
  });

  const availableCount = rooms.filter((r) => r.status === "Available").length;
  const occupiedCount = rooms.filter((r) => r.status === "Occupied").length;
  const dirtyCount = rooms.filter((r) => r.status === "Dirty" || r.status === "Cleaning").length;
  const maintenanceCount = rooms.filter((r) => r.status === "Maintenance").length;

  const validTransitions: Record<RoomStatus, RoomStatus[]> = {
    Available: ["Reserved", "Occupied", "Maintenance"],
    Reserved: ["Occupied", "Available"],
    Occupied: ["Dirty", "Maintenance"],
    Dirty: ["Cleaning", "Maintenance"],
    Cleaning: ["Inspected", "Dirty"],
    Inspected: ["Available", "Dirty"],
    Maintenance: ["Dirty", "Inspected", "Available"],
    "Out of Service": ["Maintenance", "Available"],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Front Office & Room Operations
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              {rooms.length} Luxury Suites
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Real-time room occupancy, status machine transitions, and guest check-in / check-out desk.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {availableCount} Available
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            {occupiedCount} Occupied
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            {dirtyCount} Housekeeping
          </span>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="hotel-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-hotel-navy">Filter Wing:</span>
          <select
            value={selectedWing}
            onChange={(e) => setSelectedWing(e.target.value)}
            className="px-3 py-1.5 border border-hotel-border rounded-xl bg-[#F7F9FC] font-semibold text-hotel-navy"
          >
            <option value="all">All Hotel Wings</option>
            <option value="East Wing">East Wing (Floors 1-2)</option>
            <option value="West Wing">West Wing (Floors 3-4)</option>
            <option value="Sky Villa">Sky Villa Penthouses (Floor 5)</option>
            <option value="Royal Garden Pavilion">Royal Garden Pavilion</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-hotel-navy">Room Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 border border-hotel-border rounded-xl bg-[#F7F9FC] font-semibold text-hotel-navy"
          >
            <option value="all">All Room States</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Dirty">Dirty</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Inspected">Inspected</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
      </div>

      {/* Interactive Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room) => {
          const isOccupied = room.status === "Occupied";
          const isAvailable = room.status === "Available";
          const isDirty = room.status === "Dirty" || room.status === "Cleaning";
          const isMaintenance = room.status === "Maintenance";

          return (
            <div
              key={room.id}
              onClick={() => {
                setSelectedRoom(room);
                setShowStatusModal(true);
              }}
              className={`hotel-card hotel-card-hover p-4 cursor-pointer relative overflow-hidden transition-all flex flex-col justify-between ${
                isOccupied
                  ? "border-blue-300 bg-blue-50/20"
                  : isAvailable
                  ? "border-emerald-300 bg-emerald-50/20"
                  : isMaintenance
                  ? "border-red-300 bg-red-50/20"
                  : "border-amber-300 bg-amber-50/20"
              }`}
            >
              {room.isVip && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white p-1 rounded-bl-lg shadow-sm">
                  <Crown className="w-3.5 h-3.5" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-hotel-navy">
                    Suite {room.roomNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isOccupied
                        ? "bg-blue-600 text-white"
                        : isAvailable
                        ? "bg-emerald-600 text-white"
                        : isMaintenance
                        ? "bg-red-600 text-white"
                        : "bg-amber-600 text-white"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>

                <p className="text-xs font-bold text-hotel-navy mt-1 truncate">
                  {room.roomType}
                </p>
                <p className="text-[10px] text-hotel-muted font-medium">
                  {room.wing} • Floor {room.floor}
                </p>

                {room.guestName ? (
                  <div className="mt-3 pt-2.5 border-t border-black/5 text-xs">
                    <span className="text-[10px] text-hotel-muted block">In Residence:</span>
                    <span className="font-extrabold text-hotel-navy block truncate">
                      {room.guestName}
                    </span>
                    <span className="text-[10px] text-hotel-muted block mt-0.5">
                      Departing: {room.checkOutDate}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 pt-2.5 border-t border-black/5 text-[11px] text-hotel-muted">
                    <span>Tariff: </span>
                    <strong className="text-hotel-navy">₹{room.pricePerNight.toLocaleString()}/nt</strong>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                <span className="text-hotel-accent font-bold">Manage Status</span>
                <ChevronRight className="w-3.5 h-3.5 text-hotel-muted" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Room Status Transition & Action Modal */}
      {showStatusModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <div>
                <h3 className="text-lg font-black text-hotel-navy">
                  Suite {selectedRoom.roomNumber} Management
                </h3>
                <p className="text-xs text-hotel-muted">
                  {selectedRoom.roomType} • {selectedRoom.wing}
                </p>
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Current Status State */}
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-hotel-muted">Current Operational State:</span>
              <span className="font-extrabold text-hotel-accent px-3 py-1 bg-white rounded-lg border border-hotel-border">
                {selectedRoom.status}
              </span>
            </div>

            {/* State Machine Transition Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-hotel-navy block">
                Allowed Validated Transitions:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {validTransitions[selectedRoom.status]?.map((nextState) => (
                  <button
                    key={nextState}
                    onClick={() => {
                      updateRoomStatus(selectedRoom.id, nextState);
                      setSelectedRoom({ ...selectedRoom, status: nextState });
                      alert(`Suite ${selectedRoom.roomNumber} transitioned to ${nextState}!`);
                      setShowStatusModal(false);
                    }}
                    className="p-2.5 rounded-xl border border-hotel-border hover:border-hotel-accent hover:bg-hotel-ice text-xs font-bold text-hotel-navy text-center transition-all"
                  >
                    Set to {nextState}
                  </button>
                ))}
              </div>
            </div>

            {/* Check-In / Check-Out Actions */}
            <div className="pt-3 border-t border-hotel-border flex gap-2">
              {selectedRoom.status === "Available" && (
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setShowCheckInModal(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-hotel-accent text-white font-bold text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <DoorOpen className="w-4 h-4" />
                  Perform Direct Check-In
                </button>
              )}

              {selectedRoom.status === "Occupied" && (
                <button
                  onClick={() => {
                    const targetRes = reservations.find((r) => r.roomId === selectedRoom.id);
                    if (targetRes) {
                      checkOutGuest(targetRes.id, "American Express Black Card");
                      alert(`Checked OUT ${selectedRoom.guestName}. Suite ${selectedRoom.roomNumber} marked DIRTY and dispatched to Housekeeping!`);
                    } else {
                      updateRoomStatus(selectedRoom.id, "Dirty");
                      alert(`Suite ${selectedRoom.roomNumber} checked out and marked DIRTY!`);
                    }
                    setShowStatusModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-hotel-error text-white font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <DoorClosed className="w-4 h-4" />
                  Settle Folio & Check-Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guest Check-In Modal */}
      {showCheckInModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Guest Registration & Check-In — Suite {selectedRoom.roomNumber}
              </h3>
              <button
                onClick={() => setShowCheckInModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Countess Isabelle de Monaco"
                  value={checkInName}
                  onChange={(e) => setCheckInName(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">ID / Passport Proof *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Passport FRA-9920141"
                  value={checkInIdProof}
                  onChange={(e) => setCheckInIdProof(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="font-bold text-hotel-navy block mb-1">Duration of Stay (Nights)</label>
                  <input
                    type="number"
                    value={checkInDays}
                    onChange={(e) => setCheckInDays(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="vipFlag"
                    checked={isVip}
                    onChange={(e) => setIsVip(e.target.checked)}
                    className="w-4 h-4 text-hotel-accent rounded"
                  />
                  <label htmlFor="vipFlag" className="font-bold text-hotel-navy cursor-pointer">
                    VIP Protocol Service Flag
                  </label>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl flex items-center justify-between text-hotel-navy font-bold">
                <span>Room Rate:</span>
                <span>₹{(selectedRoom.pricePerNight * checkInDays).toLocaleString()} (for {checkInDays} nights)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowCheckInModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!checkInName.trim()) {
                    alert("Please enter guest name");
                    return;
                  }
                  updateRoomStatus(selectedRoom.id, "Occupied");
                  setShowCheckInModal(false);
                  alert(`Guest ${checkInName} successfully checked into Suite ${selectedRoom.roomNumber}!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Confirm & Issue Keycard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
