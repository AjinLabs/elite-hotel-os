"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { MaintenanceTicket } from "@/types/hotel";
import {
  Wrench,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  Cpu,
} from "lucide-react";

interface AssetRecord {
  id: string;
  name: string;
  category: "HVAC" | "Power & Generators" | "Water & RO" | "Vertical Transit (Lifts)" | "Spa Engineering";
  location: string;
  serialNumber: string;
  warrantyUntil: string;
  status: "Operational" | "Scheduled Service" | "Attention Required";
  lastServiced: string;
}

export default function MaintenancePage() {
  const {
    maintenanceTickets,
    createMaintenanceTicket,
    resolveMaintenanceTicket,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<"tickets" | "assets">("tickets");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicketForResolve, setSelectedTicketForResolve] = useState<MaintenanceTicket | null>(null);
  const [resolveNotes, setResolveNotes] = useState("");

  // New ticket state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [severity, setSeverity] = useState<MaintenanceTicket["severity"]>("High");
  const [technician, setTechnician] = useState("Sameer Sheikh");
  const [cost, setCost] = useState(15000);

  const assets: AssetRecord[] = [
    { id: "ast-01", name: "Daikin Centrifugal Water Chiller 500TR", category: "HVAC", location: "Basement 2 Central Plant", serialNumber: "DKN-CHL-9982", warrantyUntil: "2029-06-30", status: "Operational", lastServiced: "2026-09-10" },
    { id: "ast-02", name: "Cummins 1500kVA Synchronized Genset A", category: "Power & Generators", location: "Power Substation Bay 1", serialNumber: "CUM-GEN-4410", warrantyUntil: "2028-12-15", status: "Operational", lastServiced: "2026-10-01" },
    { id: "ast-03", name: "Pentair Medical RO Water Filtration 20kL/h", category: "Water & RO", location: "Water Treatment Plant", serialNumber: "PNT-RO-8812", warrantyUntil: "2027-04-18", status: "Operational", lastServiced: "2026-08-25" },
    { id: "ast-04", name: "Otis SkyRise High-Speed VIP Elevators (East)", category: "Vertical Transit (Lifts)", location: "East Wing Shaft", serialNumber: "OTS-VTR-1190", warrantyUntil: "2030-01-01", status: "Operational", lastServiced: "2026-10-11" },
    { id: "ast-05", name: "Pentair IntelliChem Automated Spa Chlorinator", category: "Spa Engineering", location: "Villa 302 Private Pool", serialNumber: "PNT-CHL-3341", warrantyUntil: "2027-08-10", status: "Attention Required", lastServiced: "2026-10-12" },
  ];

  const criticalCount = maintenanceTickets.filter((m) => m.severity.includes("Critical") && m.status !== "Resolved").length;
  const activeCount = maintenanceTickets.filter((m) => m.status !== "Resolved").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Engineering, Maintenance & BMS Assets
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              BMS Automated Dispatch
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Work order lifecycle, guest suite climate diagnostics, chiller plant uptime, and capital asset registers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-hotel-ice rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("tickets")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "tickets" ? "bg-hotel-accent text-white" : "text-hotel-navy"
              }`}
            >
              Work Orders ({maintenanceTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("assets")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "assets" ? "bg-hotel-accent text-white" : "text-hotel-navy"
              }`}
            >
              Asset Registry ({assets.length})
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-hotel-accent hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Work Order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Active Work Orders</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">{activeCount}</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Dispatched to Engineers</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Critical Suite Tickets</span>
          <span className="text-2xl font-black text-red-600 block mt-1">{criticalCount}</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">VIP Guest Impact Priority</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Chiller & Plant Uptime</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">99.98%</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Dual Redundancy Online</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Engineering Specialists</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">6 Techs</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">HVAC, Plumbing, Electrical</span>
        </div>
      </div>

      {/* Tab 1: Work Orders Table */}
      {activeTab === "tickets" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Wrench className="w-4 h-4 text-hotel-accent" />
              Active Maintenance Work Orders ({maintenanceTickets.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Issue Title & Code</th>
                  <th className="px-4 py-3">Location / Suite</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Assigned Specialist</th>
                  <th className="px-4 py-3">Estimated Cost</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hotel-border">
                {maintenanceTickets.map((tkt) => {
                  const isResolved = tkt.status === "Resolved";
                  return (
                    <tr key={tkt.id} className="hover:bg-hotel-ice/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-extrabold text-hotel-navy">{tkt.title}</div>
                        <div className="text-[10px] font-mono text-hotel-muted">{tkt.ticketCode} • Reported: {tkt.reportedAt}</div>
                      </td>

                      <td className="px-4 py-3 font-semibold text-hotel-navy">
                        {tkt.areaLocation} {tkt.roomNumber && `(Suite ${tkt.roomNumber})`}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tkt.severity.includes("Critical")
                              ? "bg-red-100 text-hotel-error"
                              : tkt.severity === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-hotel-accent"
                          }`}
                        >
                          {tkt.severity}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-medium text-hotel-navy">
                        {tkt.assignedTechnician}
                      </td>

                      <td className="px-4 py-3 font-mono font-bold text-hotel-navy">
                        ₹{tkt.estimatedCost.toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isResolved
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tkt.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        {!isResolved ? (
                          <button
                            onClick={() => {
                              setSelectedTicketForResolve(tkt);
                            }}
                            className="px-3 py-1 rounded-lg bg-hotel-accent hover:bg-blue-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                          >
                            Resolve Ticket
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-semibold">Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Asset Registry Table */}
      {activeTab === "assets" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Cpu className="w-4 h-4 text-hotel-accent" />
              Central Plant & Engineering Asset Registry
            </h2>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="px-4 py-3">Asset Equipment</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Serial Code</th>
                <th className="px-4 py-3">Warranty Valid</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-hotel-ice/30">
                  <td className="px-4 py-3 font-bold text-hotel-navy">{ast.name}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-hotel-accent">
                      {ast.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-hotel-muted">{ast.location}</td>
                  <td className="px-4 py-3 font-mono font-bold text-hotel-navy">{ast.serialNumber}</td>
                  <td className="px-4 py-3 font-mono text-hotel-muted">{ast.warrantyUntil}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ast.status === "Operational"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ast.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resolve Ticket Modal */}
      {selectedTicketForResolve && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Close & Resolve Work Order {selectedTicketForResolve.ticketCode}
              </h3>
              <button
                onClick={() => setSelectedTicketForResolve(null)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="font-bold text-hotel-navy">{selectedTicketForResolve.title}</p>
              <div>
                <label className="font-bold text-hotel-navy block mb-1">
                  Technician Resolution & Testing Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail parts replaced, calibration readings, and quality check..."
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setSelectedTicketForResolve(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!resolveNotes.trim()) {
                    alert("Please write resolution notes");
                    return;
                  }
                  resolveMaintenanceTicket(selectedTicketForResolve.id, resolveNotes);
                  setSelectedTicketForResolve(null);
                  setResolveNotes("");
                  alert(`Work Order ${selectedTicketForResolve.ticketCode} marked RESOLVED!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Work Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Dispatch Engineering Work Order
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Fault Description / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bath Jacuzzi Air Jet Sensor Malfunction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Area / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Presidential Suite 501"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option value="Critical - Guest Suite">Critical - Guest Suite</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Assigned Specialist</label>
                  <select
                    value={technician}
                    onChange={(e) => setTechnician(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option>Sameer Sheikh (HVAC Specialist)</option>
                    <option>Eng. Dinesh Kumar (Chief Eng)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!title.trim() || !location.trim()) {
                    alert("Please provide fault title and location");
                    return;
                  }
                  createMaintenanceTicket({
                    title,
                    areaLocation: location,
                    severity,
                    status: "In Progress",
                    assignedTechnician: technician,
                    reportedBy: "Front Desk / BMS",
                    estimatedCost: cost,
                  });
                  setShowCreateModal(false);
                  setTitle("");
                  setLocation("");
                  alert("Work order generated and technician dispatched!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Dispatch Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
