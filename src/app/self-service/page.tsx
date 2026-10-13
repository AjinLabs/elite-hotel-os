"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  UserCheck,
  Clock,
  CalendarCheck,
  Receipt,
  FileText,
  Bell,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function SelfServicePortal() {
  const {
    currentUser,
    employees,
    attendance,
    leaveRequests,
    announcements,
    clockIn,
    clockOut,
  } = useHotel();

  const [showPayslipModal, setShowPayslipModal] = useState(false);

  // Find corresponding employee record or fallback to first
  const myEmployee =
    employees.find((e) => e.fullName === currentUser.name) ||
    employees.find((e) => e.id === "emp-003") ||
    employees[0];

  const today = new Date().toISOString().split("T")[0];
  const myAttendanceToday = attendance.find(
    (a) => a.employeeId === myEmployee.id && a.date === today
  );
  const isClocked =
    myAttendanceToday?.status === "Present" || myAttendanceToday?.status === "On Duty";

  const myLeaves = leaveRequests.filter((l) => l.employeeId === myEmployee.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Employee Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-hotel-navy to-[#1E4378] text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={myEmployee.photo}
            alt={myEmployee.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/60 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">{myEmployee.fullName}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-white/20 text-white rounded-full font-bold">
                {myEmployee.employeeCode}
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              {myEmployee.designation} • {myEmployee.departmentName}
            </p>
            <p className="text-[11px] text-blue-200 mt-0.5">
              Current Assigned Shift: <strong className="text-white">{myEmployee.currentShift} Shift (07:00 - 15:30)</strong>
            </p>
          </div>
        </div>

        {/* Quick Clock-in/Clock-out trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isClocked) {
                clockOut(myEmployee.id);
                alert("Clocked OUT successfully!");
              } else {
                clockIn(myEmployee.id, "Biometric WebSync");
                alert("Clocked IN successfully via Biometric WebSync!");
              }
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
              isClocked
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-white text-hotel-navy hover:bg-hotel-ice"
            }`}
          >
            <Clock className="w-4 h-4" />
            {isClocked ? "On Duty: Clock OUT" : "Punch Clock IN"}
          </button>
        </div>
      </div>

      {/* Main Grid: Shift Roster, Leave Balances, Payslip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leave Balance Quotas */}
        <div className="hotel-card p-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-hotel-accent" />
            My Leave Quotas
          </h2>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-3 bg-blue-50/70 rounded-xl">
              <span className="text-xl font-black text-hotel-accent block">
                {myEmployee.leaveBalance.annual}
              </span>
              <span className="text-[10px] font-bold text-hotel-navy block mt-0.5">Annual Days</span>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl">
              <span className="text-xl font-black text-emerald-700 block">
                {myEmployee.leaveBalance.casual}
              </span>
              <span className="text-[10px] font-bold text-hotel-navy block mt-0.5">Casual Days</span>
            </div>

            <div className="p-3 bg-purple-50/70 rounded-xl">
              <span className="text-xl font-black text-purple-700 block">
                {myEmployee.leaveBalance.sick}
              </span>
              <span className="text-[10px] font-bold text-hotel-navy block mt-0.5">Sick Days</span>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl">
              <span className="text-xl font-black text-amber-700 block">
                {myEmployee.leaveBalance.compensatory}
              </span>
              <span className="text-[10px] font-bold text-hotel-navy block mt-0.5">Comp Off</span>
            </div>
          </div>
        </div>

        {/* Payslip & Earnings */}
        <div className="hotel-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Receipt className="w-4 h-4 text-hotel-accent" />
              My Latest Payslip
            </h2>
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] font-bold text-hotel-muted uppercase block">October 2026 Salary</span>
              <span className="text-xl font-black text-hotel-navy block mt-0.5">
                ₹{myEmployee.salary.netPay.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                Status: Verified & Disbursed
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPayslipModal(true)}
            className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-hotel-ice hover:bg-blue-100 text-hotel-accent flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            View & Print Payslip
          </button>
        </div>

        {/* Assigned Duty Roster */}
        <div className="hotel-card p-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <Clock className="w-4 h-4 text-hotel-accent" />
            Weekly Duty Roster
          </h2>

          <div className="space-y-1.5 text-xs">
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
              <span className="font-semibold text-hotel-navy">Mon (13 Oct)</span>
              <span className="font-bold text-emerald-600">Morning (07:00 - 15:30)</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
              <span className="font-semibold text-hotel-navy">Tue (14 Oct)</span>
              <span className="font-bold text-emerald-600">Morning (07:00 - 15:30)</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
              <span className="font-semibold text-hotel-navy">Wed (15 Oct)</span>
              <span className="font-bold text-emerald-600">Morning (07:00 - 15:30)</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
              <span className="font-semibold text-hotel-navy">Thu (16 Oct)</span>
              <span className="font-bold text-gray-500">Weekly Off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Hotel Announcements Feed */}
      <div className="hotel-card p-5 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
          <Bell className="w-4 h-4 text-hotel-accent" />
          Hotel-Wide Management Announcements
        </h2>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-3.5 rounded-xl bg-[#F8FAFD] border border-hotel-border space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-hotel-navy">{ann.title}</span>
                <span className="text-[10px] font-mono text-hotel-muted">{ann.postedAt}</span>
              </div>
              <p className="text-xs text-hotel-muted leading-relaxed">{ann.content}</p>
              <div className="text-[10px] text-hotel-accent font-semibold pt-1">
                Posted by {ann.author} ({ann.authorRole}) • Target: {ann.audience}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Payslip Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border no-print">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Employee Salary Statement & Payslip
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-hotel-accent text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setShowPayslipModal(false)}
                  className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Payslip Layout */}
            <div className="p-4 rounded-xl border border-hotel-border space-y-4 bg-white text-hotel-navy">
              <div className="text-center pb-3 border-b border-hotel-border">
                <h4 className="text-base font-black">THE GRAND ELYSIUM LUXURY HOTEL & RESORT</h4>
                <p className="text-[11px] text-hotel-muted">Five-Star Deluxe Hospitality • Payroll Division</p>
                <p className="text-xs font-bold mt-1">PAYSLIP FOR OCTOBER 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><strong>Employee:</strong> {myEmployee.fullName}</div>
                <div><strong>Code:</strong> {myEmployee.employeeCode}</div>
                <div><strong>Designation:</strong> {myEmployee.designation}</div>
                <div><strong>Department:</strong> {myEmployee.departmentName}</div>
                <div><strong>Grade:</strong> {myEmployee.grade}</div>
                <div><strong>Date of Joining:</strong> {myEmployee.joiningDate}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-hotel-border text-xs">
                {/* Earnings */}
                <div className="space-y-1">
                  <p className="font-bold text-hotel-navy uppercase text-[10px]">Earnings (₹)</p>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Basic Salary:</span>
                    <span>₹{myEmployee.salary.basic.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>House Rent Allowance (HRA):</span>
                    <span>₹{myEmployee.salary.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Special Allowances:</span>
                    <span>₹{myEmployee.salary.allowances.toLocaleString()}</span>
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-1">
                  <p className="font-bold text-hotel-navy uppercase text-[10px]">Deductions (₹)</p>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Provident Fund (PF):</span>
                    <span className="text-red-600">-₹{myEmployee.salary.pfDeduction.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Income Tax (TDS):</span>
                    <span className="text-red-600">-₹{myEmployee.salary.taxDeduction.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-hotel-ice rounded-xl flex items-center justify-between font-bold text-sm text-hotel-navy">
                <span>Net Pay Deposited to Bank:</span>
                <span className="text-base text-hotel-accent">₹{myEmployee.salary.netPay.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
