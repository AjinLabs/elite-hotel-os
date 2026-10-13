"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { HousekeepingTask, LostAndFoundItem } from "@/types/hotel";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  Search,
  Box,
  BedDouble,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function HousekeepingPage() {
  const {
    housekeepingTasks,
    lostAndFound,
    updateHousekeepingStatus,
    rooms,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<"cleaning" | "lostFound">("cleaning");
  const [selectedTask, setSelectedTask] = useState<HousekeepingTask | null>(null);
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const assignedTasks = housekeepingTasks.filter((t) => t.status === "Assigned");
  const inProgressTasks = housekeepingTasks.filter((t) => t.status === "Cleaning In Progress");
  const readyTasks = housekeepingTasks.filter((t) => t.status === "Completed / Ready");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Housekeeping, Turnaround & Linen Logistics
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              5-Star Hygiene Standards
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Floor attendant dispatch, 18-point inspection protocols, express checkouts, and vault lost-and-found.
          </p>
        </div>

        <div className="flex p-1 bg-hotel-ice rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("cleaning")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "cleaning"
                ? "bg-hotel-accent text-white shadow-xs"
                : "text-hotel-navy hover:text-hotel-accent"
            }`}
          >
            Room Cleaning Board
          </button>
          <button
            onClick={() => setActiveTab("lostFound")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "lostFound"
                ? "bg-hotel-accent text-white shadow-xs"
                : "text-hotel-navy hover:text-hotel-accent"
            }`}
          >
            Lost & Found Vault
          </button>
        </div>
      </div>

      {activeTab === "cleaning" ? (
        <div className="space-y-6">
          {/* Cleaning Pipeline Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Assigned */}
            <div className="hotel-card p-4 space-y-3 bg-[#FAFCFE]">
              <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
                <span className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
                  Assigned / Express Queue ({assignedTasks.length})
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>

              <div className="space-y-2.5">
                {assignedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 bg-white rounded-xl border border-hotel-border shadow-xs space-y-2 hover:border-hotel-accent transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-hotel-navy">
                        Suite {task.roomNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-xs text-hotel-muted">
                      Attendant: <strong className="text-hotel-navy">{task.attendantName}</strong>
                    </p>
                    {task.notes && (
                      <p className="text-[11px] text-hotel-muted italic bg-gray-50 p-1.5 rounded">
                        {task.notes}
                      </p>
                    )}

                    <button
                      onClick={() => {
                        updateHousekeepingStatus(task.id, "Cleaning In Progress");
                      }}
                      className="w-full py-1.5 text-xs font-bold rounded-lg bg-hotel-ice hover:bg-blue-100 text-hotel-accent transition-colors"
                    >
                      Start Cleaning
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="hotel-card p-4 space-y-3 bg-[#FAFCFE]">
              <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
                <span className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
                  Cleaning In Progress ({inProgressTasks.length})
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              </div>

              <div className="space-y-2.5">
                {inProgressTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 bg-white rounded-xl border border-blue-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-hotel-navy">
                        Suite {task.roomNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-hotel-accent">
                        Active
                      </span>
                    </div>

                    <p className="text-xs text-hotel-muted">
                      Attendant: <strong className="text-hotel-navy">{task.attendantName}</strong>
                    </p>
                    <p className="text-[10px] text-hotel-muted">
                      Assigned: {task.assignedTime}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setShowInspectionModal(true);
                      }}
                      className="w-full py-1.5 text-xs font-bold rounded-lg bg-hotel-accent text-white hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Conduct Inspection
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Ready / Inspected */}
            <div className="hotel-card p-4 space-y-3 bg-[#FAFCFE]">
              <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
                <span className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
                  Inspected & Ready for Guests ({readyTasks.length})
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="space-y-2.5">
                {readyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-hotel-navy">
                        Suite {task.roomNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Ready
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-hotel-success font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-hotel-success" />
                      <span>18-Point Staging Passed</span>
                    </div>

                    <p className="text-[11px] text-hotel-muted">
                      Inspected by Executive Housekeeper Sunita Rao
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Lost and Found Vault Register */
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
              Security Safe & Lost-and-Found Register ({lostAndFound.length})
            </h2>
            <span className="text-xs text-hotel-muted">
              Valuables retained under 90-day protocol
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="px-4 py-3">Item Description</th>
                <th className="px-4 py-3">Found Location</th>
                <th className="px-4 py-3">Date Found</th>
                <th className="px-4 py-3">Found By Associate</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {lostAndFound.map((item) => (
                <tr key={item.id} className="hover:bg-hotel-ice/30">
                  <td className="px-4 py-3 font-bold text-hotel-navy">{item.itemDescription}</td>
                  <td className="px-4 py-3 text-hotel-muted">{item.foundLocation}</td>
                  <td className="px-4 py-3 font-mono">{item.foundDate}</td>
                  <td className="px-4 py-3 font-medium text-hotel-navy">{item.foundBy}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === "Claimed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-hotel-accent"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 18-Point Inspection Modal */}
      {showInspectionModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Supervisor 18-Point Inspection — Suite {selectedTask.roomNumber}
              </h3>
              <button
                onClick={() => setShowInspectionModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <p className="text-hotel-muted text-[11px]">
                Verify mandatory five-star turndown & hygiene touchpoints before releasing suite to reception:
              </p>
              {[
                "1000TC Egyptian cotton sheets aligned at 45° turndown angle",
                "Hermès Eau d'Orange Verte amenities refreshed in marble bath",
                "Sub-zero mini-bar restocked with artisan beverages & Grand Cuvée",
                "Climate wall thermostat calibrated to ambient 21.0°C",
                "Zero dust on high moldings, drapery, and private terrace",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-hotel-border">
                  <CheckCircle2 className="w-4 h-4 text-hotel-success flex-shrink-0" />
                  <span className="font-semibold text-hotel-navy">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowInspectionModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateHousekeepingStatus(selectedTask.id, "Completed / Ready", true);
                  setShowInspectionModal(false);
                  alert(`Suite ${selectedTask.roomNumber} verified by Supervisor Sunita Rao and released as AVAILABLE to Reception!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Approve & Mark Available
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
