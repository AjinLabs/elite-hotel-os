"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { LeaveRequest } from "@/types/hotel";
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function LeaveManagementPage() {
  const {
    leaveRequests,
    employees,
    departments,
    currentUser,
    applyLeave,
    approveLeave,
    rejectLeave,
  } = useHotel();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || "");
  const [leaveType, setLeaveType] = useState<LeaveRequest["leaveType"]>("Annual Leave");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [reason, setReason] = useState("");
  const [approvalComment, setApprovalComment] = useState("");
  const [selectedReqForAction, setSelectedReqForAction] = useState<LeaveRequest | null>(null);

  const pendingLeaves = leaveRequests.filter((l) => l.status.startsWith("Pending"));
  const approvedLeaves = leaveRequests.filter((l) => l.status === "Approved");

  // Calculate day difference
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1);

  const selectedEmp = employees.find((e) => e.id === selectedEmpId) || employees[0];

  const canApprove =
    currentUser.role === "Hotel Owner" ||
    currentUser.role === "General Manager" ||
    currentUser.role === "HR Manager" ||
    currentUser.role === "Department Head";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Leave Quotas & Approval Workflows
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Multi-Stage Authorization
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Annual, casual, sick, and compensatory leaves with automated staffing shortage detection.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-accent text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Apply for Leave
        </button>
      </div>

      {/* Staffing Shortage & Overlap Alert Banner */}
      {pendingLeaves.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-hotel-navy">
              Staffing Shortage Warning Check
            </p>
            <p className="text-hotel-muted mt-0.5">
              Reviewing concurrent absences across Front Office and Housekeeping. Ensure minimum 8 associates remain on morning shift before approving overlapping dates.
            </p>
          </div>
        </div>
      )}

      {/* Leave Quota Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Pending Approvals</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">{pendingLeaves.length}</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Awaiting HOD / HR</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Approved This Month</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">{approvedLeaves.length}</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Within Department Quota</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Available Annual Pool</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">18 Days</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Per Permanent Associate</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Coverage Health</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">96.8%</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Zero Service Disruption</span>
        </div>
      </div>

      {/* Pending Approvals Table */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <Clock className="w-4 h-4 text-hotel-accent" />
            Pending Leave Requests Queue ({pendingLeaves.length})
          </h2>
          <span className="text-xs text-hotel-muted">
            Authorized Clearances: {currentUser.role}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">Dates & Days</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {pendingLeaves.length > 0 ? (
                pendingLeaves.map((req) => (
                  <tr key={req.id} className="hover:bg-hotel-ice/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-hotel-navy">
                      {req.employeeName}
                    </td>
                    <td className="px-4 py-3 text-hotel-muted">
                      {req.departmentName}
                    </td>
                    <td className="px-4 py-3 font-semibold text-hotel-navy">
                      {req.leaveType}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {req.startDate} to {req.endDate} ({req.daysCount}d)
                    </td>
                    <td className="px-4 py-3 text-hotel-muted max-w-xs truncate">
                      {req.reason}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canApprove ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              approveLeave(req.id, "Approved by Executive Management");
                              alert(`Leave approved for ${req.employeeName}!`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("Enter rejection reason:");
                              if (reason) {
                                rejectLeave(req.id, reason);
                                alert(`Leave request rejected.`);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-red-50 text-hotel-error font-bold text-[11px] transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-hotel-muted italic">View Only</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-hotel-muted">
                    No pending leave requests requiring approval.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Leave Records */}
      <div className="hotel-card overflow-hidden">
        <div className="p-4 border-b border-hotel-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-hotel-accent" />
            Approved & Historical Leave Records ({approvedLeaves.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Approved By</th>
                <th className="px-4 py-3">Approver Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {approvedLeaves.map((req) => (
                <tr key={req.id} className="hover:bg-hotel-ice/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-hotel-navy">{req.employeeName}</td>
                  <td className="px-4 py-3 text-hotel-muted">{req.departmentName}</td>
                  <td className="px-4 py-3 font-semibold text-hotel-navy">{req.leaveType}</td>
                  <td className="px-4 py-3 font-mono">{req.startDate} to {req.endDate} ({req.daysCount} days)</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{req.approvedBy || "Management"}</td>
                  <td className="px-4 py-3 text-hotel-muted text-[11px]">{req.approverComments || "Standard leave entitlement verified."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply for Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Submit Leave Application
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Applying Associate</label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.fullName} ({e.departmentName} - Balance: {e.leaveBalance.annual}d Annual, {e.leaveBalance.casual}d Casual)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                  <option value="Compensatory Off">Compensatory Off</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl text-hotel-accent font-semibold flex items-center justify-between">
                <span>Calculated Absence Duration:</span>
                <span className="font-bold">{daysDiff} Day(s)</span>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Application Reason *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State operational reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!reason.trim()) {
                    alert("Please provide a reason for the leave application.");
                    return;
                  }
                  applyLeave({
                    employeeId: selectedEmp.id,
                    employeeName: selectedEmp.fullName,
                    departmentName: selectedEmp.departmentName,
                    leaveType,
                    startDate,
                    endDate,
                    daysCount: daysDiff,
                    reason,
                  });
                  setShowApplyModal(false);
                  setReason("");
                  alert(`Leave request for ${selectedEmp.fullName} submitted to HOD and HR!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
