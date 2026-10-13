"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { GuestComplaint } from "@/types/hotel";
import {
  HeartHandshake,
  Star,
  CheckCircle2,
  Clock,
  MessageSquareWarning,
  Plus,
  Sparkles,
  ShieldCheck,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function GuestRelationsPage() {
  const {
    guestComplaints,
    createGuestComplaint,
    resolveGuestComplaint,
    rooms,
  } = useHotel();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<GuestComplaint | null>(null);
  const [recoveryAction, setRecoveryAction] = useState("");
  const [csatScore, setCsatScore] = useState(5);

  // New form state
  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("105");
  const [category, setCategory] = useState<GuestComplaint["category"]>("Air Conditioning / Climate");
  const [severity, setSeverity] = useState<GuestComplaint["severity"]>("Moderate");
  const [desc, setDesc] = useState("");
  const [assignedDept, setAssignedDept] = useState("Engineering and Maintenance");

  const openTickets = guestComplaints.filter((c) => c.status !== "Resolved & Closed");
  const resolvedTickets = guestComplaints.filter((c) => c.status === "Resolved & Closed");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Guest Relations & Five-Star Service Recovery
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Forbes 5★ Standard
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            VIP guest experience tracking, resolution SLA countdowns, service recovery gestures, and CSAT scores.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-accent text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Log Service Request / Complaint
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Guest CSAT Score</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-black text-hotel-navy">4.92</span>
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Deluxe Forbes Standard</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Active Escalations</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">{openTickets.length}</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">SLA Target &lt; 20 Mins</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Resolved Recoveries</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">{resolvedTickets.length}</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">100% Satisfaction Recovered</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Average Resolution</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">14.2 Mins</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Fastest in Hotel Sector</span>
        </div>
      </div>

      {/* Active and Historical Service Cases Table */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-hotel-accent" />
            Guest Service Recoveries & Resolution Ledger ({guestComplaints.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Guest & Room</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Department Assigned</th>
                <th className="px-4 py-3">Service Recovery Action</th>
                <th className="px-4 py-3">Status & Rating</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {guestComplaints.map((cmp) => {
                const isResolved = cmp.status === "Resolved & Closed";
                return (
                  <tr key={cmp.id} className="hover:bg-hotel-ice/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-extrabold text-hotel-navy">{cmp.guestName}</div>
                      <div className="text-[10px] font-mono text-hotel-muted">Suite {cmp.roomNumber} • {cmp.complaintCode}</div>
                    </td>

                    <td className="px-4 py-3 font-semibold text-hotel-navy">
                      {cmp.category}
                    </td>

                    <td className="px-4 py-3 text-hotel-muted max-w-xs leading-relaxed">
                      {cmp.description}
                    </td>

                    <td className="px-4 py-3 text-hotel-navy font-medium">
                      {cmp.assignedDepartment}
                    </td>

                    <td className="px-4 py-3 text-[11px] text-hotel-muted max-w-xs">
                      {cmp.serviceRecoveryAction || "Recovery gesture being orchestrated..."}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isResolved
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {cmp.status}
                      </span>
                      {cmp.satisfactionRating && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{cmp.satisfactionRating} / 5 Stars</span>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {!isResolved ? (
                        <button
                          onClick={() => setSelectedComplaint(cmp)}
                          className="px-3 py-1 rounded-lg bg-hotel-accent text-white font-bold text-[11px] hover:bg-blue-700 transition-colors"
                        >
                          Perform Recovery
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-semibold">Closed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Perform Service Recovery Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Complete Service Recovery Gesture — Suite {selectedComplaint.roomNumber}
              </h3>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <p className="font-bold text-hotel-navy">{selectedComplaint.guestName}:</p>
                <p className="text-hotel-muted">{selectedComplaint.description}</p>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">
                  Service Recovery Gesture Dispatched *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Complimentary Dom Pérignon delivered with personal handwritten letter from GM Rajesh Varma; thermostat recalibrated."
                  value={recoveryAction}
                  onChange={(e) => setRecoveryAction(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">
                  Confirmed Guest Satisfaction Post-Recovery (Stars)
                </label>
                <select
                  value={csatScore}
                  onChange={(e) => setCsatScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-bold text-hotel-navy"
                >
                  <option value={5}>5 Stars — Delighted & Loyal</option>
                  <option value={4}>4 Stars — Satisfied</option>
                  <option value={3}>3 Stars — Neutral</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!recoveryAction.trim()) {
                    alert("Please describe the service recovery gesture dispatched");
                    return;
                  }
                  resolveGuestComplaint(selectedComplaint.id, recoveryAction, csatScore);
                  setSelectedComplaint(null);
                  setRecoveryAction("");
                  alert("Service recovery logged and guest file updated with 5-star rating!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Save & Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Log Guest Service Recovery Case
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Arthur Pemberton"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Suite Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 101"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option value="Air Conditioning / Climate">Air Conditioning / Climate</option>
                    <option value="Noise Disruption">Noise Disruption</option>
                    <option value="Housekeeping Cleanliness">Housekeeping Cleanliness</option>
                    <option value="Food Quality / Service">Food Quality / Service</option>
                    <option value="Billing Query">Billing Query</option>
                    <option value="Keycard Malfunction">Keycard Malfunction</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Assigned Department</label>
                  <select
                    value={assignedDept}
                    onChange={(e) => setAssignedDept(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option>Engineering and Maintenance</option>
                    <option>Housekeeping</option>
                    <option>Kitchen and Culinary</option>
                    <option>Front Office and Reception</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Complaint / Service Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the exact guest feedback..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!guestName.trim() || !desc.trim()) {
                    alert("Please provide guest name and description");
                    return;
                  }
                  createGuestComplaint({
                    guestName,
                    roomNumber,
                    category,
                    severity,
                    description: desc,
                    assignedDepartment: assignedDept,
                    assignedStaff: "Guest Service Manager",
                    status: "Open",
                  });
                  setShowAddModal(false);
                  setGuestName("");
                  setDesc("");
                  alert("Complaint ticket created and routed to department head!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
