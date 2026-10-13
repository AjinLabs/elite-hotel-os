"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  ShieldCheck,
  ShieldAlert,
  Flame,
  PhoneCall,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Plus,
  Eye,
} from "lucide-react";

interface IncidentRecord {
  id: string;
  code: string;
  title: string;
  location: string;
  severity: "Major Protocol" | "Moderate" | "Minor";
  reportedAt: string;
  status: "Under Investigation" | "Resolved & Closed";
  investigator: string;
  actionTaken: string;
}

export default function SecurityPage() {
  const { currentUser } = useHotel();

  const [incidents, setIncidents] = useState<IncidentRecord[]>([
    {
      id: "inc-1",
      code: "SEC-INC-081",
      title: "Unauthorized Drone Activity near Sky Villa Rooftop Helipad",
      location: "Sky Villa Perimeter (Airspace)",
      severity: "Major Protocol",
      reportedAt: "2026-10-12 16:45",
      status: "Resolved & Closed",
      investigator: "Col. Amarjeet Gill",
      actionTaken: "Radio frequency directional jammer activated. Local civil aviation authority notified and perimeter cleared within 4 minutes.",
    },
    {
      id: "inc-2",
      code: "SEC-INC-082",
      title: "Vehicle License Plate Anomaly at Portico Security Gate",
      location: "Main Gateway Barrier",
      severity: "Minor",
      reportedAt: "2026-10-13 09:10",
      status: "Resolved & Closed",
      investigator: "Duty Officer Gurpreet Singh",
      actionTaken: "Driver verified as registered high-net-worth supplier. RFID tag magnetic strip updated.",
    },
  ]);

  const [showAddIncidentModal, setShowAddIncidentModal] = useState(false);
  const [incTitle, setIncTitle] = useState("");
  const [incLoc, setIncLoc] = useState("");
  const [incSev, setIncSev] = useState<IncidentRecord["severity"]>("Moderate");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Hotel Security, Perimeter & Life Safety
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-hotel-success border border-emerald-200">
              Protocol Level 1 Active
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            24/7 VIP diplomatic security, access credential control, CCTV operations, and fire life-safety systems.
          </p>
        </div>

        <button
          onClick={() => setShowAddIncidentModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-accent text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <ShieldAlert className="w-4 h-4" />
          Log Incident Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Chief Security Officer</span>
          <span className="text-sm font-extrabold text-hotel-navy block mt-1">Col. Amarjeet Gill</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Commanding Shift A</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">CCTV Surveillance Grid</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">420 Cameras</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">100% Perimeter Armed</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Fire Life Safety Check</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">Certified</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Pressure: 9.2 Bar</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Guards on Patrol</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">12 Officers</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Lobby, Portico & Helipad</span>
        </div>
      </div>

      {/* Incident Log Table */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-hotel-accent" />
            Security & Protocol Incident Register ({incidents.length})
          </h2>
          <span className="text-xs text-hotel-muted">Strict Confidentiality Enforced</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
            <tr>
              <th className="px-4 py-3">Incident Code & Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Investigator</th>
              <th className="px-4 py-3">Resolution Action</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hotel-border">
            {incidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-hotel-ice/30">
                <td className="px-4 py-3">
                  <div className="font-bold text-hotel-navy">{inc.title}</div>
                  <div className="text-[10px] font-mono text-hotel-muted">{inc.code}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-hotel-navy">{inc.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inc.severity === "Major Protocol"
                        ? "bg-red-100 text-hotel-error"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {inc.severity}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-hotel-muted">{inc.reportedAt}</td>
                <td className="px-4 py-3 font-medium text-hotel-navy">{inc.investigator}</td>
                <td className="px-4 py-3 text-hotel-muted max-w-xs">{inc.actionTaken}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {inc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Safety Inspection & Emergency Contacts Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fire & Life Safety Checklist */}
        <div className="hotel-card p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <Flame className="w-4 h-4 text-hotel-accent" />
            Daily 5-Star Fire & Life Safety Verification
          </h3>

          <div className="space-y-2 text-xs">
            {[
              "Main Diesel Fire Pump Jockey pressure holding at 9.2 Bar",
              "Helipad Obstacle Lighting & Wind Direction Cone illuminated",
              "Emergency Panic Exit stairwells 100% unobstructed across all wings",
              "Server Room FM-200 Clean Agent Gas Suppression system green",
            ].map((chk, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50 border border-hotel-border">
                <CheckCircle2 className="w-4 h-4 text-hotel-success flex-shrink-0" />
                <span className="font-semibold text-hotel-navy">{chk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Liaison Contacts */}
        <div className="hotel-card p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-hotel-accent" />
            Emergency Protocol Hotline Directory
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-red-50/60 rounded-xl border border-red-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-red-900">City Central Emergency & Trauma</p>
                <p className="text-[10px] text-red-700">Apollo Multi-Specialty Hospital</p>
              </div>
              <span className="font-mono font-bold text-red-800 text-xs">+91 98200 10811</span>
            </div>

            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-hotel-navy">Diplomatic Security Bureau Liaison</p>
                <p className="text-[10px] text-hotel-muted">Consulate General Protocol Wing</p>
              </div>
              <span className="font-mono font-bold text-hotel-accent text-xs">+91 98200 99110</span>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-xl border border-hotel-border flex justify-between items-center">
              <div>
                <p className="font-bold text-hotel-navy">Local Police Station Station House Officer</p>
                <p className="text-[10px] text-hotel-muted">Division Headquarters</p>
              </div>
              <span className="font-mono font-bold text-hotel-navy text-xs">100 / 022-26110022</span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Incident Modal */}
      {showAddIncidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Log Confidential Security Incident
              </h3>
              <button
                onClick={() => setShowAddIncidentModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Incident Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken keycard lock sensor detected in service corridor"
                  value={incTitle}
                  onChange={(e) => setIncTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Location / Zone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4th Floor West Wing"
                    value={incLoc}
                    onChange={(e) => setIncLoc(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Severity Classification</label>
                  <select
                    value={incSev}
                    onChange={(e) => setIncSev(e.target.value as any)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option value="Minor">Minor Incident</option>
                    <option value="Moderate">Moderate Security Breach</option>
                    <option value="Major Protocol">Major Diplomatic Protocol Event</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowAddIncidentModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!incTitle.trim() || !incLoc.trim()) {
                    alert("Please provide incident title and location");
                    return;
                  }
                  const newInc: IncidentRecord = {
                    id: `inc-${Date.now()}`,
                    code: `SEC-INC-${Math.floor(100 + Math.random() * 900)}`,
                    title: incTitle,
                    location: incLoc,
                    severity: incSev,
                    reportedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    status: "Under Investigation",
                    investigator: "Col. Amarjeet Gill",
                    actionTaken: "Security patrol team deployed immediately.",
                  };
                  setIncidents([newInc, ...incidents]);
                  setShowAddIncidentModal(false);
                  setIncTitle("");
                  setIncLoc("");
                  alert("Security incident logged and investigation active!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Log Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
