"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Calendar,
  Search,
  Filter,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Download,
} from "lucide-react";

export default function AttendancePage() {
  const {
    attendance,
    employees,
    departments,
    currentUser,
    clockIn,
    clockOut,
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [clockInEmpId, setClockInEmpId] = useState(employees[0]?.id || "");
  const [clockMethod, setClockMethod] = useState<"Biometric WebSync" | "GPS Geofence" | "Badge RFID">("Biometric WebSync");
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Stats
  const totalRecords = attendance.length;
  const presentCount = attendance.filter((a) => a.status === "Present" || a.status === "On Duty").length;
  const lateCount = attendance.filter((a) => a.lateMinutes > 0).length;
  const overtimeHoursTotal = attendance.reduce((acc, a) => acc + (a.overtimeHours || 0), 0);

  const filteredAttendance = attendance.filter((rec) => {
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || rec.departmentName.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Attendance & Shift Roster Control
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-hotel-success border border-emerald-200">
              Live Biometric WebSync
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Real-time biometric punch sync, shift schedules, overtime approvals, and regularization audit trails.
          </p>
        </div>

        <button
          onClick={() => setShowCorrectionModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-ice hover:bg-blue-100 text-hotel-accent text-xs font-bold transition-all shadow-xs"
        >
          <Clock className="w-4 h-4" />
          Request Attendance Regularization
        </button>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Logged Turnout Today</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">{presentCount}</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Present / On Duty</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Late Arrivals</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">{lateCount}</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">&gt; 5 mins threshold</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Overtime Authorized</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">{overtimeHoursTotal.toFixed(1)} hrs</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">1.5x Premium Rate</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Active Shifts</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">4 Shifts</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Morning, General, Evening, Night</span>
        </div>
      </div>

      {/* Web Check-In / Clock-Out Simulation Station */}
      <div className="hotel-card p-5 bg-gradient-to-r from-blue-50/40 via-white to-blue-50/20 border-2 border-hotel-accent/20 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <Clock className="w-4 h-4 text-hotel-accent" />
            Live Web Clock-In Station (Biometric & RFID Simulation)
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-hotel-accent">
            Hardware Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-hotel-navy block mb-1">Select Employee</label>
            <select
              value={clockInEmpId}
              onChange={(e) => setClockInEmpId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl bg-white font-medium text-hotel-navy"
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.fullName} ({e.departmentName} - {e.currentShift})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-hotel-navy block mb-1">Punch Verification Mode</label>
            <select
              value={clockMethod}
              onChange={(e) => setClockMethod(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl bg-white font-medium text-hotel-navy"
            >
              <option value="Biometric WebSync">Biometric Fingerprint / WebSync</option>
              <option value="GPS Geofence">GPS Mobile Geofence (Within Hotel)</option>
              <option value="Badge RFID">RFID NFC Badge Reader</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                clockIn(clockInEmpId, clockMethod);
                const emp = employees.find((e) => e.id === clockInEmpId);
                alert(`Successfully clocked IN: ${emp?.fullName} via ${clockMethod}!`);
              }}
              className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-hotel-accent text-white hover:bg-blue-700 transition-all shadow-sm"
            >
              Punch Clock IN
            </button>
            <button
              onClick={() => {
                clockOut(clockInEmpId);
                const emp = employees.find((e) => e.id === clockInEmpId);
                alert(`Successfully clocked OUT: ${emp?.fullName}!`);
              }}
              className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-gray-100 text-hotel-navy hover:bg-gray-200 transition-all"
            >
              Punch Clock OUT
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
            <input
              type="text"
              placeholder="Search attendance by employee name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:border-hotel-accent"
            />
          </div>

          <span className="text-xs text-hotel-muted font-medium">
            Showing {filteredAttendance.length} records for {today}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Staff Name</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Shift & Date</th>
                <th className="px-4 py-3">Clock In</th>
                <th className="px-4 py-3">Clock Out</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {filteredAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-hotel-ice/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-hotel-navy">
                    {rec.employeeName}
                  </td>
                  <td className="px-4 py-3 text-hotel-muted">
                    {rec.departmentName}
                  </td>
                  <td className="px-4 py-3 font-medium text-hotel-navy">
                    {rec.shift} ({rec.date})
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-hotel-navy">
                    {rec.clockInTime || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-hotel-muted">
                    {rec.clockOutTime || "Active on shift"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.status === "Present" || rec.status === "On Duty"
                          ? "bg-emerald-100 text-emerald-800"
                          : rec.status === "On Leave"
                          ? "bg-blue-100 text-hotel-accent"
                          : "bg-red-100 text-hotel-error"
                      }`}
                    >
                      {rec.status}
                    </span>
                    {rec.lateMinutes > 0 && (
                      <span className="ml-1 text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        +{rec.lateMinutes}m Late
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-hotel-muted">
                    {rec.verificationMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regularization Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Attendance Punch Regularization Request
              </h3>
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Staff Member</label>
                <select
                  value={clockInEmpId}
                  onChange={(e) => setClockInEmpId(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>{e.fullName} ({e.departmentName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Reason for Missing Punch / Override</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Escorting European ambassador convoy to presidential suite during morning entry..."
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!correctionNotes.trim()) {
                    alert("Please enter the regularization reason");
                    return;
                  }
                  alert("Regularization request submitted for Department Head and HR Manager sign-off!");
                  setShowCorrectionModal(false);
                  setCorrectionNotes("");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Submit Regularization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
