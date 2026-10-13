"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Filter,
  FileText,
  Users,
  BedDouble,
  IndianRupee,
  Wrench,
  Star,
  Boxes,
  ShieldCheck,
} from "lucide-react";

export default function ReportsPage() {
  const {
    employees,
    departments,
    rooms,
    reservations,
    inventory,
    maintenanceTickets,
    guestComplaints,
  } = useHotel();

  const [selectedReport, setSelectedReport] = useState<"headcount" | "occupancy" | "revenue" | "inventory" | "maintenance" | "csat">("headcount");
  const [datePeriod, setDatePeriod] = useState("Month-to-Date (October 2026)");
  const [selectedDept, setSelectedDept] = useState("all");

  const nowTimestamp = new Date().toLocaleString();

  // Export CSV Helper
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `THE GRAND ELYSIUM HOTEL & RESORT - EXECUTIVE REPORT\r\n`;
    csvContent += `Report Type: ${selectedReport.toUpperCase()}\r\n`;
    csvContent += `Generated: ${nowTimestamp}\r\n`;
    csvContent += `Confidentiality: CONFIDENTIAL - OWNER & EXECUTIVE USE ONLY\r\n\r\n`;

    if (selectedReport === "headcount") {
      csvContent += "Code,Name,Department,Designation,Shift,Status,NetSalary\r\n";
      employees.forEach((e) => {
        csvContent += `"${e.employeeCode}","${e.fullName}","${e.departmentName}","${e.designation}","${e.currentShift}","${e.employmentStatus}","${e.salary.netPay}"\r\n`;
      });
    } else if (selectedReport === "occupancy") {
      csvContent += "SuiteNumber,Wing,Type,Rate,Status,GuestName\r\n";
      rooms.forEach((r) => {
        csvContent += `"${r.roomNumber}","${r.wing}","${r.roomType}","${r.pricePerNight}","${r.status}","${r.guestName || "N/A"}"\r\n`;
      });
    } else {
      csvContent += "Metric,Value\r\n";
      csvContent += "Monthly Revenue,14280000\r\n";
      csvContent += "Operating Expenses,8840000\r\n";
      csvContent += "Operating Margin,38.1%\r\n";
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elite_hotel_os_${selectedReport}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Executive Reports & Audit Intelligence
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Export Ready
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Official operational reports with date filters, export to CSV/print, and documented formulas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-hotel-ice hover:bg-blue-100 text-hotel-accent text-xs font-bold transition-all shadow-xs"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hotel-accent hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      {/* Filter and Category Selection Strip */}
      <div className="hotel-card p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-hotel-navy block mb-1">Select Report Subject</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value as any)}
              className="w-full px-3 py-2 border border-hotel-border rounded-xl font-bold text-hotel-navy bg-[#F8FAFD]"
            >
              <option value="headcount">1. Workforce Headcount & Department Roster</option>
              <option value="occupancy">2. Suite Occupancy & Room Status</option>
              <option value="revenue">3. Revenue & Operating Expenses (USALI)</option>
              <option value="inventory">4. Stores Inventory Valuation & Reorder Status</option>
              <option value="maintenance">5. Engineering Work Orders & Maintenance Costs</option>
              <option value="csat">6. Guest Relations & Forbes CSAT Ratings</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-hotel-navy block mb-1">Audit Period</label>
            <select
              value={datePeriod}
              onChange={(e) => setDatePeriod(e.target.value)}
              className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy bg-[#F8FAFD]"
            >
              <option>Month-to-Date (October 2026)</option>
              <option>Last 7 Operational Days</option>
              <option>Third Quarter Q3 2026</option>
              <option>Annual Audit Year 2026</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-hotel-navy block mb-1">Division Filter</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy bg-[#F8FAFD]"
            >
              <option value="all">All 22 Hotel Divisions</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Official Report Container */}
      <div className="hotel-card p-6 space-y-5 bg-white">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hotel-border gap-2 text-xs">
          <div>
            <h2 className="text-base font-black text-hotel-navy uppercase">
              THE GRAND ELYSIUM HOTEL & RESORT
            </h2>
            <p className="text-hotel-muted text-[11px]">
              Report: <strong className="text-hotel-navy uppercase">{selectedReport}</strong> • Period: {datePeriod}
            </p>
          </div>
          <div className="text-left sm:text-right text-[11px] text-hotel-muted">
            <p>Generated: <strong>{nowTimestamp}</strong></p>
            <span className="font-bold text-red-600 uppercase text-[10px]">
              Strictly Confidential • Management Only
            </span>
          </div>
        </div>

        {/* Report Content 1: Headcount */}
        {selectedReport === "headcount" && (
          <div className="space-y-4">
            <div className="p-3 bg-hotel-ice rounded-xl flex items-center justify-between text-xs font-bold text-hotel-navy">
              <span>Total Active Associates: {employees.length}</span>
              <span>On Duty Today: {employees.filter(e => e.attendanceStatus === "Present" || e.attendanceStatus === "On Duty").length}</span>
              <span>Total Payroll Commitment: ₹{(employees.reduce((acc, e) => acc + e.salary.netPay, 0) / 100000).toFixed(2)}L</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Employee Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Designation</th>
                  <th className="py-2.5 px-3">Shift</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td className="py-2 px-3 font-mono text-hotel-muted">{e.employeeCode}</td>
                    <td className="py-2 px-3 font-bold text-hotel-navy">{e.fullName}</td>
                    <td className="py-2 px-3 text-hotel-muted">{e.departmentName}</td>
                    <td className="py-2 px-3 font-medium">{e.designation}</td>
                    <td className="py-2 px-3">{e.currentShift}</td>
                    <td className="py-2 px-3 font-bold text-emerald-700">{e.attendanceStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report Content 2: Occupancy */}
        {selectedReport === "occupancy" && (
          <div className="space-y-4">
            <div className="p-3 bg-hotel-ice rounded-xl flex items-center justify-between text-xs font-bold text-hotel-navy">
              <span>Total Suites: {rooms.length}</span>
              <span>Occupied: {rooms.filter(r => r.status === "Occupied").length}</span>
              <span>Occupancy Rate: {((rooms.filter(r => r.status === "Occupied").length / rooms.length) * 100).toFixed(1)}%</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Suite #</th>
                  <th className="py-2.5 px-3">Wing</th>
                  <th className="py-2.5 px-3">Suite Category</th>
                  <th className="py-2.5 px-3">Rate (₹)</th>
                  <th className="py-2.5 px-3">Current Status</th>
                  <th className="py-2.5 px-3">Guest In-Residence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rooms.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 px-3 font-black text-hotel-navy">Suite {r.roomNumber}</td>
                    <td className="py-2 px-3 text-hotel-muted">{r.wing}</td>
                    <td className="py-2 px-3 font-semibold">{r.roomType}</td>
                    <td className="py-2 px-3 font-mono">₹{r.pricePerNight.toLocaleString()}</td>
                    <td className="py-2 px-3 font-bold text-hotel-accent">{r.status}</td>
                    <td className="py-2 px-3">{r.guestName || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report Content 3: Revenue */}
        {selectedReport === "revenue" && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-xl flex items-center justify-between text-sm font-black text-emerald-900 border border-emerald-200">
              <span>Gross Hotel Revenue: ₹1,42,80,000</span>
              <span>Net Operating Profit: ₹54,40,000 (38.1% Margin)</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Operating Line</th>
                  <th className="py-2.5 px-3">Accounting Category</th>
                  <th className="py-2.5 px-3 text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-2 px-3 font-bold">Suite & Room Nights</td><td className="py-2 px-3">Rooms Revenue</td><td className="py-2 px-3 text-right font-bold">₹85,60,000</td></tr>
                <tr><td className="py-2 px-3 font-bold">Restaurant & F&B Services</td><td className="py-2 px-3">Culinary Revenue</td><td className="py-2 px-3 text-right font-bold">₹38,40,000</td></tr>
                <tr><td className="py-2 px-3 font-bold">Banquets & Diplomatic Events</td><td className="py-2 px-3">Events Revenue</td><td className="py-2 px-3 text-right font-bold">₹11,20,000</td></tr>
                <tr><td className="py-2 px-3 font-bold">Lotus Sanctuary Spa</td><td className="py-2 px-3">Wellness Revenue</td><td className="py-2 px-3 text-right font-bold">₹7,60,000</td></tr>
                <tr><td className="py-2 px-3 font-bold text-red-600">Total Operating Expenses</td><td className="py-2 px-3">Payroll & Operations</td><td className="py-2 px-3 text-right font-bold text-red-600">(₹88,40,000)</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Report Content 4: Inventory */}
        {selectedReport === "inventory" && (
          <div className="space-y-4">
            <div className="p-3 bg-hotel-ice rounded-xl flex items-center justify-between text-xs font-bold text-hotel-navy">
              <span>Master Inventory Lines: {inventory.length}</span>
              <span>Low Stock Items: {inventory.filter(i => i.currentStock <= i.reorderLevel).length}</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Unit Price</th>
                  <th className="py-2.5 px-3">Supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.map((i) => (
                  <tr key={i.id}>
                    <td className="py-2 px-3 font-mono">{i.itemCode}</td>
                    <td className="py-2 px-3 font-bold text-hotel-navy">{i.name}</td>
                    <td className="py-2 px-3 text-hotel-muted">{i.category}</td>
                    <td className="py-2 px-3 font-bold">{i.currentStock} {i.unit}</td>
                    <td className="py-2 px-3 font-mono">₹{i.unitPrice.toLocaleString()}</td>
                    <td className="py-2 px-3">{i.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report Content 5: Maintenance */}
        {selectedReport === "maintenance" && (
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Ticket</th>
                <th className="py-2.5 px-3">Issue Title</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Technician</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {maintenanceTickets.map((m) => (
                <tr key={m.id}>
                  <td className="py-2 px-3 font-mono">{m.ticketCode}</td>
                  <td className="py-2 px-3 font-bold text-hotel-navy">{m.title}</td>
                  <td className="py-2 px-3 text-hotel-muted">{m.areaLocation}</td>
                  <td className="py-2 px-3 font-bold">{m.severity}</td>
                  <td className="py-2 px-3">{m.assignedTechnician}</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Report Content 6: CSAT */}
        {selectedReport === "csat" && (
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Guest & Suite</th>
                <th className="py-2.5 px-3">Complaint Category</th>
                <th className="py-2.5 px-3">Resolution Gesture</th>
                <th className="py-2.5 px-3">CSAT Score</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guestComplaints.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 px-3 font-bold text-hotel-navy">{c.guestName} (Suite {c.roomNumber})</td>
                  <td className="py-2 px-3 text-hotel-muted">{c.category}</td>
                  <td className="py-2 px-3">{c.serviceRecoveryAction}</td>
                  <td className="py-2 px-3 font-bold text-amber-600">{c.satisfactionRating} / 5 Stars</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
