"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { Employee } from "@/types/hotel";
import {
  Receipt,
  IndianRupee,
  Lock,
  Unlock,
  Printer,
  CheckCircle2,
  Search,
  Filter,
  Download,
  ShieldCheck,
} from "lucide-react";

export default function PayrollPage() {
  const { employees, currentUser } = useHotel();

  const [periodLocked, setPeriodLocked] = useState(true);
  const [selectedEmpForPayslip, setSelectedEmpForPayslip] = useState<Employee | null>(null);

  const totalBasic = employees.reduce((acc, e) => acc + e.salary.basic, 0);
  const totalHra = employees.reduce((acc, e) => acc + e.salary.hra, 0);
  const totalAllowances = employees.reduce((acc, e) => acc + e.salary.allowances, 0);
  const totalPf = employees.reduce((acc, e) => acc + e.salary.pfDeduction, 0);
  const totalTax = employees.reduce((acc, e) => acc + e.salary.taxDeduction, 0);
  const totalNet = employees.reduce((acc, e) => acc + e.salary.netPay, 0);

  const canManagePayroll =
    currentUser.role === "Hotel Owner" ||
    currentUser.role === "General Manager" ||
    currentUser.role === "Finance Manager" ||
    currentUser.role === "HR Manager";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Statutory Payroll Engine & Payslips
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-hotel-success border border-emerald-200">
              Compliant with Indian EPF & TDS Rules
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Automated attendance integration, basic salary structures, EPF 12% deductions, TDS tax withholding, and period locking.
          </p>
        </div>

        {canManagePayroll && (
          <button
            onClick={() => {
              setPeriodLocked(!periodLocked);
              alert(`Payroll period ${periodLocked ? "UNLOCKED for HR adjustments" : "LOCKED & Certified for banking disbursement"}!`);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              periodLocked
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            {periodLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {periodLocked ? "Period October 2026 Locked" : "Period Unlocked"}
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total Net Disbursement</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">
            ₹{(totalNet / 100000).toFixed(2)} Lakhs
          </span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Disbursed to Bank</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total EPF Deductions</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">
            ₹{(totalPf / 1000).toFixed(0)}k
          </span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">12% Statutory Fund</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total TDS Withheld</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">
            ₹{(totalTax / 1000).toFixed(0)}k
          </span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Income Tax Department</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Staff Payroll Count</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">
            {employees.length} Staff
          </span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">100% Reconciled</span>
        </div>
      </div>

      {/* Payroll Register Table */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
            Monthly Payroll Register (October 2026)
          </h2>
          <span className="text-xs text-hotel-muted">Formula: Basic + HRA + Allowances - PF - TDS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3 font-mono">Basic (₹)</th>
                <th className="px-4 py-3 font-mono">HRA (₹)</th>
                <th className="px-4 py-3 font-mono">Allowances (₹)</th>
                <th className="px-4 py-3 font-mono">PF (12%)</th>
                <th className="px-4 py-3 font-mono">TDS (₹)</th>
                <th className="px-4 py-3 font-mono">Net Take-Home</th>
                <th className="px-4 py-3 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-hotel-ice/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-hotel-navy">{emp.fullName}</div>
                    <div className="text-[10px] font-mono text-hotel-muted">{emp.employeeCode} • {emp.designation}</div>
                  </td>
                  <td className="px-4 py-3 text-hotel-muted">{emp.departmentName}</td>
                  <td className="px-4 py-3 font-mono">₹{emp.salary.basic.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono">₹{emp.salary.hra.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono">₹{emp.salary.allowances.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-red-600">-₹{emp.salary.pfDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-red-600">-₹{emp.salary.taxDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono font-extrabold text-hotel-navy">
                    ₹{emp.salary.netPay.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedEmpForPayslip(emp)}
                      className="px-2.5 py-1 rounded-lg bg-hotel-ice hover:bg-blue-100 text-hotel-accent font-bold text-[11px] transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Payslip Modal */}
      {selectedEmpForPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border no-print">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Payslip Preview: {selectedEmpForPayslip.fullName}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-hotel-accent text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setSelectedEmpForPayslip(null)}
                  className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 border border-hotel-border rounded-xl space-y-4 text-hotel-navy text-xs bg-white">
              <div className="text-center pb-2 border-b">
                <h4 className="text-sm font-black">THE GRAND ELYSIUM HOTEL & RESORT</h4>
                <p className="text-[11px] text-hotel-muted">Salary Voucher • October 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div><strong>Employee:</strong> {selectedEmpForPayslip.fullName}</div>
                <div><strong>Code:</strong> {selectedEmpForPayslip.employeeCode}</div>
                <div><strong>Designation:</strong> {selectedEmpForPayslip.designation}</div>
                <div><strong>Department:</strong> {selectedEmpForPayslip.departmentName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-2">
                <div>
                  <p className="font-bold uppercase text-[10px] text-hotel-muted">Earnings</p>
                  <div className="flex justify-between py-1"><span>Basic:</span><span>₹{selectedEmpForPayslip.salary.basic.toLocaleString()}</span></div>
                  <div className="flex justify-between py-1"><span>HRA:</span><span>₹{selectedEmpForPayslip.salary.hra.toLocaleString()}</span></div>
                  <div className="flex justify-between py-1"><span>Allowances:</span><span>₹{selectedEmpForPayslip.salary.allowances.toLocaleString()}</span></div>
                </div>
                <div>
                  <p className="font-bold uppercase text-[10px] text-hotel-muted">Deductions</p>
                  <div className="flex justify-between py-1"><span>EPF (12%):</span><span className="text-red-600">-₹{selectedEmpForPayslip.salary.pfDeduction.toLocaleString()}</span></div>
                  <div className="flex justify-between py-1"><span>TDS Tax:</span><span className="text-red-600">-₹{selectedEmpForPayslip.salary.taxDeduction.toLocaleString()}</span></div>
                </div>
              </div>

              <div className="border-t pt-2 flex justify-between font-bold text-sm bg-hotel-ice p-2.5 rounded-lg">
                <span>Net Pay Disbursed:</span>
                <span className="text-hotel-accent">₹{selectedEmpForPayslip.salary.netPay.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
