"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { Department } from "@/types/hotel";
import {
  Building2,
  Users,
  Clock,
  ShieldCheck,
  BookOpen,
  IndianRupee,
  Layers,
  Sparkles,
  ChevronRight,
  UserCheck,
  UserX,
  CalendarCheck,
  Plus,
  ArrowRightLeft,
} from "lucide-react";

export default function DepartmentsPage() {
  const {
    departments,
    employees,
    attendance,
    leaveRequests,
    sops,
    currentUser,
  } = useHotel();

  const [selectedDeptId, setSelectedDeptId] = useState<string>("dept-fo");
  const [compareMode, setCompareMode] = useState(false);
  const [compareDept1, setCompareDept1] = useState("dept-fo");
  const [compareDept2, setCompareDept2] = useState("dept-hk");

  const activeDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  // Department staff breakdown
  const deptEmployees = employees.filter((e) => e.departmentId === activeDept.id);
  const deptPresent = deptEmployees.filter((e) => e.attendanceStatus === "Present" || e.attendanceStatus === "On Duty").length;
  const deptOnLeave = deptEmployees.filter((e) => e.attendanceStatus === "On Leave").length;
  const deptAbsent = deptEmployees.length - deptPresent - deptOnLeave;
  const deptSops = sops.filter((s) => s.department === activeDept.name);

  // Helper for department stats
  const getDeptMetrics = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    const staff = employees.filter((e) => e.departmentId === deptId);
    const present = staff.filter((e) => e.attendanceStatus === "Present" || e.attendanceStatus === "On Duty").length;
    return {
      name: dept?.name || "Unknown",
      code: dept?.code || "",
      head: dept?.headName || "TBD",
      staffCount: staff.length,
      present,
      attendanceRate: staff.length ? Math.round((present / staff.length) * 100) : 100,
      budget: dept?.budgetMonthly || 0,
      sops: dept?.sopsCount || 0,
    };
  };

  const d1Metrics = getDeptMetrics(compareDept1);
  const d2Metrics = getDeptMetrics(compareDept2);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Department Operations Management
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              22 Luxury Divisions
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Department heads, shift rosters, operational budgets, SOP compliance, and comparative analysis.
          </p>
        </div>

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            compareMode
              ? "bg-hotel-navy text-white"
              : "bg-hotel-ice text-hotel-accent hover:bg-blue-100"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          {compareMode ? "Exit Department Comparison" : "Compare Departments"}
        </button>
      </div>

      {/* Comparison Matrix Modal/Drawer */}
      {compareMode && (
        <div className="hotel-card p-6 bg-gradient-to-r from-blue-50/50 to-white space-y-4 border-2 border-hotel-accent/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-hotel-navy flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-hotel-accent" />
              Executive Department Comparison Matrix
            </h3>
            <span className="text-[11px] font-semibold text-hotel-accent">
              Owner / General Manager Analysis Tool
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-hotel-navy block mb-1">Select Department 1</label>
              <select
                value={compareDept1}
                onChange={(e) => setCompareDept1(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl bg-white font-bold text-hotel-navy"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-hotel-navy block mb-1">Select Department 2</label>
              <select
                value={compareDept2}
                onChange={(e) => setCompareDept2(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-hotel-border rounded-xl bg-white font-bold text-hotel-navy"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-white rounded-xl border border-hotel-border space-y-2">
              <span className="text-[10px] font-bold text-hotel-muted uppercase block">Metric</span>
              <p className="font-semibold text-hotel-navy">Department Head</p>
              <p className="font-semibold text-hotel-navy">Total Headcount</p>
              <p className="font-semibold text-hotel-navy">On Duty Today</p>
              <p className="font-semibold text-hotel-navy">Turnout Rate</p>
              <p className="font-semibold text-hotel-navy">Monthly Budget</p>
              <p className="font-semibold text-hotel-navy">Registered SOPs</p>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
              <span className="text-[10px] font-bold text-hotel-accent uppercase block truncate">{d1Metrics.name}</span>
              <p className="font-bold text-hotel-navy truncate">{d1Metrics.head}</p>
              <p className="font-bold text-hotel-navy">{d1Metrics.staffCount} staff</p>
              <p className="font-bold text-hotel-navy">{d1Metrics.present} on duty</p>
              <p className="font-bold text-emerald-600">{d1Metrics.attendanceRate}%</p>
              <p className="font-bold text-hotel-navy">₹{(d1Metrics.budget / 100000).toFixed(1)} Lakhs</p>
              <p className="font-bold text-hotel-navy">{d1Metrics.sops} standards</p>
            </div>

            <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 space-y-2">
              <span className="text-[10px] font-bold text-purple-700 uppercase block truncate">{d2Metrics.name}</span>
              <p className="font-bold text-hotel-navy truncate">{d2Metrics.head}</p>
              <p className="font-bold text-hotel-navy">{d2Metrics.staffCount} staff</p>
              <p className="font-bold text-hotel-navy">{d2Metrics.present} on duty</p>
              <p className="font-bold text-emerald-600">{d2Metrics.attendanceRate}%</p>
              <p className="font-bold text-hotel-navy">₹{(d2Metrics.budget / 100000).toFixed(1)} Lakhs</p>
              <p className="font-bold text-hotel-navy">{d2Metrics.sops} standards</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout: Left Department Selector, Right Detailed Department View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 22 Department Navigator List */}
        <div className="hotel-card p-4 space-y-2 max-h-[680px] overflow-y-auto">
          <p className="text-xs font-bold text-hotel-muted uppercase px-2">
            Select Department (22)
          </p>
          <div className="space-y-1">
            {departments.map((dept) => {
              const isSelected = dept.id === activeDept.id;
              const staffCount = employees.filter((e) => e.departmentId === dept.id).length;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-hotel-accent text-white shadow-sm font-semibold"
                      : "hover:bg-hotel-ice text-hotel-navy"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold block truncate">
                      {dept.name}
                    </span>
                    <span
                      className={`text-[10px] block mt-0.5 truncate ${
                        isSelected ? "text-blue-100" : "text-hotel-muted"
                      }`}
                    >
                      Head: {dept.headName}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ml-2 ${
                      isSelected ? "bg-white text-hotel-accent" : "bg-gray-100 text-hotel-muted"
                    }`}
                  >
                    {dept.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Department Detail Hub */}
        <div className="lg:col-span-2 space-y-6">
          {/* Department Overview Banner */}
          <div className="hotel-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hotel-border">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-hotel-navy">
                    {activeDept.name}
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-blue-50 text-hotel-accent border border-blue-200">
                    CODE: {activeDept.code}
                  </span>
                </div>
                <p className="text-xs text-hotel-muted mt-1 leading-relaxed">
                  {activeDept.description}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[10px] font-bold text-hotel-muted uppercase block">Monthly Budget</span>
                <span className="text-lg font-black text-hotel-navy block mt-0.5">
                  ₹{(activeDept.budgetMonthly / 100000).toFixed(1)} Lakhs
                </span>
              </div>
            </div>

            {/* Department Leadership & Headcount Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-hotel-muted uppercase block">Department Head</span>
                <span className="font-extrabold text-hotel-navy block mt-1 truncate">{activeDept.headName}</span>
                <span className="text-[10px] text-hotel-accent font-semibold block">{activeDept.headTitle}</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold text-hotel-muted uppercase block">Present Today</span>
                <span className="text-xl font-black text-hotel-success block mt-0.5">{deptPresent}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">On Duty</span>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <span className="text-[10px] font-bold text-hotel-muted uppercase block">Approved Leave</span>
                <span className="text-xl font-black text-hotel-warning block mt-0.5">{deptOnLeave}</span>
                <span className="text-[10px] text-amber-700 font-semibold block">Scheduled</span>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <span className="text-[10px] font-bold text-hotel-muted uppercase block">Open Positions</span>
                <span className="text-xl font-black text-purple-700 block mt-0.5">{activeDept.openPositions}</span>
                <span className="text-[10px] text-purple-600 font-semibold block">Recruitment</span>
              </div>
            </div>
          </div>

          {/* Department Staff Roster */}
          <div className="hotel-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
                <Users className="w-4 h-4 text-hotel-accent" />
                Department Assigned Staff ({deptEmployees.length})
              </h3>
            </div>

            <div className="divide-y divide-hotel-border">
              {deptEmployees.length > 0 ? (
                deptEmployees.map((emp) => (
                  <div key={emp.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.photo}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-hotel-border"
                      />
                      <div>
                        <span className="text-xs font-bold text-hotel-navy block">
                          {emp.fullName}
                        </span>
                        <span className="text-[11px] text-hotel-muted block">
                          {emp.designation} • {emp.currentShift} Shift
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        emp.attendanceStatus === "Present" || emp.attendanceStatus === "On Duty"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {emp.attendanceStatus}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-hotel-muted">
                  No staff profiles directly assigned to {activeDept.name}.
                </div>
              )}
            </div>
          </div>

          {/* Registered SOPs for Department */}
          <div className="hotel-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-hotel-accent" />
                5-Star Standard Operating Procedures ({deptSops.length})
              </h3>
            </div>

            <div className="space-y-2">
              {deptSops.length > 0 ? (
                deptSops.map((sop) => (
                  <div key={sop.id} className="p-3 rounded-xl bg-gray-50 border border-hotel-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-hotel-navy">{sop.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-hotel-accent rounded font-bold">
                        {sop.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-hotel-muted mt-1">{sop.summary}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-hotel-muted">
                  Standard SOP set active across division. Total division documents: {activeDept.sopsCount}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
