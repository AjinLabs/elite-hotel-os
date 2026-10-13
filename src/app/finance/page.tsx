"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  Landmark,
  IndianRupee,
  TrendingUp,
  Receipt,
  CreditCard,
  Building2,
  Calendar,
  Download,
  Printer,
  Sparkles,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function FinancePage() {
  const { reservations } = useHotel();

  const [activeTab, setActiveTab] = useState<"overview" | "pnl" | "expenses">("overview");

  const revenueByDept = [
    { name: "Suites & Rooms", revenue: 85.6, color: "#245BDB" },
    { name: "The Sapphire & F&B", revenue: 38.4, color: "#6B9CFF" },
    { name: "Royal Banquets", revenue: 11.2, color: "#16845B" },
    { name: "Lotus Wellness Spa", revenue: 7.6, color: "#D98A16" },
  ];

  const operatingExpensesList = [
    { category: "Staff Salaries & Payroll", amount: 4850000, vendor: "Direct Employee Disbursement", status: "Processed" },
    { category: "Power, Cummins Diesel & BMS Utilities", amount: 1620000, vendor: "State Power Grid & Fuel Depot", status: "Paid" },
    { category: "Kitchen Food & Raw Ingredient Sourcing", amount: 1240000, vendor: "Caspian Gourmet & Tokyo Meats", status: "Paid" },
    { category: "Engineering Spares & Chiller Overhaul", amount: 580000, vendor: "Daikin Engineering India", status: "Paid" },
    { category: "Luxury Guest Amenities (Hermès)", amount: 350000, vendor: "Hermès Parfums Hospitality", status: "Pending PO Approval" },
    { category: "Virtuoso & Global Luxury PR Marketing", amount: 200000, vendor: "Condé Nast Luxury Traveler", status: "Paid" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Financial Management, Treasury & P&L
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-hotel-success border border-emerald-200">
              Audit Grade Accuracy
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Department revenue streams, operating margin tracking, line-item P&L statements, and vendor payables.
          </p>
        </div>

        <div className="flex p-1 bg-hotel-ice rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "overview" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            Financial Overview
          </button>
          <button
            onClick={() => setActiveTab("pnl")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "pnl" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            Profit & Loss (P&L)
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "expenses" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            Expense Ledger
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Monthly Gross Revenue</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">₹1.42 Cr</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">+18.4% vs Projected</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total Operating Expenses</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">₹88.4 Lakhs</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">62.2% Revenue Ratio</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Net Operating Income (EBITDA)</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">₹54.4 Lakhs</span>
          <span className="text-[11px] font-semibold text-emerald-700 mt-0.5 block">38.3% Margin</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Outstanding Guest Folios</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">₹4.25 Lakhs</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Due on Checkout</span>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Streams Chart */}
            <div className="hotel-card p-5 space-y-4">
              <h3 className="text-sm font-extrabold text-hotel-navy">
                Revenue Contribution by Division (₹ Lakhs)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByDept} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#65738B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#65738B" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "10px", borderColor: "#E1E8F2", fontSize: "11px" }} />
                    <Bar dataKey="revenue" fill="#245BDB" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Summary Cards */}
            <div className="hotel-card p-5 space-y-3">
              <h3 className="text-sm font-extrabold text-hotel-navy pb-2 border-b border-hotel-border">
                Department Performance Ledger
              </h3>
              <div className="space-y-2.5 text-xs">
                {revenueByDept.map((dept, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 flex items-center justify-between border border-hotel-border">
                    <span className="font-bold text-hotel-navy">{dept.name}</span>
                    <span className="font-extrabold text-hotel-navy">₹{dept.revenue} Lakhs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Profit & Loss Statement */}
      {activeTab === "pnl" && (
        <div className="hotel-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
            <div>
              <h3 className="text-base font-extrabold text-hotel-navy">
                Statement of Profit and Loss (October 2026 MTD)
              </h3>
              <p className="text-xs text-hotel-muted">
                Compiled under Indian AS / International Hospitality Accounting Standards (USALI)
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-hotel-ice hover:bg-blue-100 text-hotel-accent text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Statement
            </button>
          </div>

          <div className="divide-y divide-hotel-border text-xs">
            {/* Revenue Section */}
            <div className="py-3 space-y-2">
              <div className="flex justify-between font-black text-hotel-navy text-sm uppercase">
                <span>Total Operating Revenue</span>
                <span>₹1,42,80,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Rooms & Suites Revenue</span>
                <span>₹85,60,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Food & Beverage (Restaurant, Bar, In-Room)</span>
                <span>₹38,40,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Banquets & Diplomatic Conferences</span>
                <span>₹11,20,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Spa & Wellness Sanctuary</span>
                <span>₹7,60,000</span>
              </div>
            </div>

            {/* Direct Departmental Expenses */}
            <div className="py-3 space-y-2">
              <div className="flex justify-between font-black text-hotel-navy text-sm uppercase">
                <span>Departmental Cost of Sales</span>
                <span className="text-red-600">(₹26,80,000)</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Culinary Food & Beverage Ingredients Cost</span>
                <span>₹12,40,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Guest Room Linens & Luxury Hermès Amenities</span>
                <span>₹9,80,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Spa Essential Oils & Ayurvedic Formulation Sourcing</span>
                <span>₹4,60,000</span>
              </div>
            </div>

            {/* Operating Expenses */}
            <div className="py-3 space-y-2">
              <div className="flex justify-between font-black text-hotel-navy text-sm uppercase">
                <span>Undistributed Operating Expenses</span>
                <span className="text-red-600">(₹61,60,000)</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Human Resources & Hotel Staff Payroll</span>
                <span>₹48,50,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Property Operations, Chiller Energy & Power Utilities</span>
                <span>₹16,20,000</span>
              </div>
              <div className="flex justify-between text-hotel-muted pl-4">
                <span>Global Virtuoso Marketing & Guest Relations</span>
                <span>₹6,90,000</span>
              </div>
            </div>

            {/* Net EBITDA */}
            <div className="py-4 flex justify-between font-black text-base text-hotel-navy bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <span className="text-emerald-900">Net Operating Income (EBITDA) — 38.3% Margin</span>
              <span className="text-emerald-700">₹54,40,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Expense Ledger Table */}
      {activeTab === "expenses" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
              Vendor Payables & Operating Expense Disbursements
            </h3>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="px-4 py-3">Expense Category</th>
                <th className="px-4 py-3">Vendor / Entity</th>
                <th className="px-4 py-3 font-mono">Amount (₹)</th>
                <th className="px-4 py-3">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {operatingExpensesList.map((exp, idx) => (
                <tr key={idx} className="hover:bg-hotel-ice/30">
                  <td className="px-4 py-3 font-bold text-hotel-navy">{exp.category}</td>
                  <td className="px-4 py-3 text-hotel-muted">{exp.vendor}</td>
                  <td className="px-4 py-3 font-mono font-extrabold text-hotel-navy">₹{exp.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        exp.status === "Paid" || exp.status === "Processed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
