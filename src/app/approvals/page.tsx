"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  FileCheck2,
  CalendarCheck,
  ShoppingBag,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ApprovalsHubPage() {
  const {
    currentUser,
    leaveRequests,
    purchaseOrders,
    maintenanceTickets,
    inventory,
    approveLeave,
    rejectLeave,
    approvePurchaseOrder,
  } = useHotel();

  const [activeQueue, setActiveQueue] = useState<"leaves" | "pos" | "maint">("leaves");

  const pendingLeaves = leaveRequests.filter((l) => l.status.startsWith("Pending"));
  const pendingPOs = purchaseOrders.filter((p) => p.status.includes("Pending"));
  const criticalMaint = maintenanceTickets.filter((m) => m.severity.includes("Critical") && m.status !== "Resolved");

  const totalPending = pendingLeaves.length + pendingPOs.length + criticalMaint.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Executive Approval & Authorization Centre
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {totalPending} Awaiting Decision
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Single command queue for HR leaves, purchase requisitions, and engineering escalations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-hotel-accent" />
          <span>Approver: <strong className="text-hotel-navy">{currentUser.name} ({currentUser.role})</strong></span>
        </div>
      </div>

      {/* Queue Selection Bar */}
      <div className="flex p-1 bg-white border border-hotel-border rounded-xl text-xs font-bold w-fit">
        <button
          onClick={() => setActiveQueue("leaves")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeQueue === "leaves" ? "bg-hotel-accent text-white shadow-xs" : "text-hotel-navy hover:text-hotel-accent"
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          Leave Applications ({pendingLeaves.length})
        </button>
        <button
          onClick={() => setActiveQueue("pos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeQueue === "pos" ? "bg-hotel-accent text-white shadow-xs" : "text-hotel-navy hover:text-hotel-accent"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Purchase Orders ({pendingPOs.length})
        </button>
        <button
          onClick={() => setActiveQueue("maint")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeQueue === "maint" ? "bg-hotel-accent text-white shadow-xs" : "text-hotel-navy hover:text-hotel-accent"
          }`}
        >
          <Wrench className="w-4 h-4" />
          Critical Escalations ({criticalMaint.length})
        </button>
      </div>

      {/* Queue 1: Leaves */}
      {activeQueue === "leaves" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
              Staff Leave Approvals Queue ({pendingLeaves.length})
            </h2>
          </div>

          <div className="divide-y divide-hotel-border">
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-hotel-ice/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-hotel-navy">{req.employeeName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-hotel-accent">
                        {req.leaveType}
                      </span>
                    </div>
                    <p className="text-xs text-hotel-muted">
                      {req.departmentName} • Duration: <strong>{req.startDate} to {req.endDate} ({req.daysCount} days)</strong>
                    </p>
                    <p className="text-xs text-hotel-navy italic bg-gray-50 p-2 rounded-lg">
                      "{req.reason}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        approveLeave(req.id, `Authorized by ${currentUser.role}`);
                        alert(`Leave approved for ${req.employeeName}!`);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      Authorize Leave
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt("Enter decline justification:");
                        if (reason) {
                          rejectLeave(req.id, reason);
                          alert(`Request declined.`);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-hotel-error font-bold text-xs transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-hotel-muted">
                All staff leave applications have been authorized.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Queue 2: Purchase Orders */}
      {activeQueue === "pos" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
              Purchase Order Procurement Authorizations ({pendingPOs.length})
            </h2>
          </div>

          <div className="divide-y divide-hotel-border">
            {pendingPOs.length > 0 ? (
              pendingPOs.map((po) => (
                <div key={po.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-hotel-ice/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-hotel-navy">{po.poNumber}</span>
                      <span className="text-xs font-black text-hotel-accent">₹{po.totalCost.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-hotel-muted">
                      Supplier: <strong className="text-hotel-navy">{po.supplierName}</strong> • Requisitioned by: {po.requestedByDepartment}
                    </p>
                    <div className="text-[11px] text-hotel-navy">
                      Items: {po.items.map((it) => `${it.itemName} (${it.quantity} ${it.unit})`).join(", ")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        approvePurchaseOrder(po.id, "Approved & Ordered");
                        alert(`Purchase Order ${po.poNumber} approved and dispatched to supplier!`);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      Authorize Purchase
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-hotel-muted">
                No purchase requisitions currently awaiting executive sign-off.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Queue 3: Critical Maintenance */}
      {activeQueue === "maint" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
              Critical Engineering Escalations ({criticalMaint.length})
            </h2>
          </div>

          <div className="divide-y divide-hotel-border">
            {criticalMaint.length > 0 ? (
              criticalMaint.map((tkt) => (
                <div key={tkt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-hotel-ice/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-hotel-navy">{tkt.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-hotel-error">
                        {tkt.severity}
                      </span>
                    </div>
                    <p className="text-xs text-hotel-muted">
                      Location: <strong className="text-hotel-navy">{tkt.areaLocation}</strong> • Assigned: {tkt.assignedTechnician}
                    </p>
                    {tkt.resolutionNotes && (
                      <p className="text-[11px] text-hotel-muted italic bg-gray-50 p-1.5 rounded">
                        Notes: {tkt.resolutionNotes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Specialist Dispatched</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-hotel-muted">
                No critical engineering issues requiring executive intervention.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
