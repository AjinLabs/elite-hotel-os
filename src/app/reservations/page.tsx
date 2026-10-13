"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { Reservation } from "@/types/hotel";
import {
  BookOpenCheck,
  Search,
  Plus,
  CreditCard,
  Printer,
  Sparkles,
  Crown,
  Receipt,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function ReservationsPage() {
  const {
    reservations,
    rooms,
    checkInGuest,
    checkOutGuest,
    addFolioCharge,
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(reservations[0] || null);
  const [showAddChargeModal, setShowAddChargeModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // New Charge form
  const [chargeDesc, setChargeDesc] = useState("");
  const [chargeAmount, setChargeAmount] = useState(5000);
  const [chargeCat, setChargeCat] = useState<"Room Charge" | "Dining" | "Spa" | "Laundry" | "Taxes">("Dining");

  const filteredReservations = reservations.filter((r) =>
    r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.roomNumber.includes(searchQuery)
  );

  const activeRes = selectedRes ? (reservations.find(r => r.id === selectedRes.id) || selectedRes) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Guest Reservations & Folio Accounting
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              PMS Live Integration
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Luxury guest folios, restaurant/spa billing transfers, deposit reconciliations, and checkout invoices.
          </p>
        </div>

        <div className="text-xs text-hotel-muted font-medium">
          Total Bookings: <strong className="text-hotel-navy">{reservations.length}</strong>
        </div>
      </div>

      {/* Main Grid: Reservations Directory (Left) + Folio Ledger & Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Reservations List */}
        <div className="hotel-card p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
            <input
              type="text"
              placeholder="Search by guest name or booking code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:border-hotel-accent"
            />
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto">
            {filteredReservations.map((res) => {
              const isSelected = activeRes?.id === res.id;
              return (
                <div
                  key={res.id}
                  onClick={() => setSelectedRes(res)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-50/70 border-hotel-accent ring-1 ring-hotel-accent/30"
                      : "bg-white border-hotel-border hover:bg-hotel-ice/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-hotel-navy truncate">
                      {res.guestName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        res.status === "Checked In"
                          ? "bg-emerald-100 text-emerald-800"
                          : res.status === "Checked Out"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-hotel-accent"
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[11px] text-hotel-muted">
                    <span>Suite {res.roomNumber}</span>
                    <span className="font-mono text-[10px]">{res.bookingCode}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[10px]">
                    <span>{res.checkInDate} to {res.checkOutDate}</span>
                    <span className="font-bold text-hotel-navy">₹{res.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Guest Folio Ledger */}
        <div className="lg:col-span-2 space-y-6">
          {activeRes ? (
            <div className="hotel-card p-6 space-y-6">
              {/* Folio Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hotel-border">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-hotel-navy">
                      {activeRes.guestName}
                    </h2>
                    {activeRes.vipStatus && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        <Crown className="w-3 h-3" /> VIP Protocol
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-hotel-muted mt-1">
                    Booking Code: <strong className="font-mono text-hotel-navy">{activeRes.bookingCode}</strong> • Suite: <strong className="text-hotel-navy">{activeRes.roomNumber}</strong>
                  </p>
                  <p className="text-[11px] text-hotel-muted">
                    Contact: {activeRes.guestEmail} • {activeRes.guestPhone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddChargeModal(true)}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-hotel-ice hover:bg-blue-100 text-hotel-accent flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post Folio Charge
                  </button>
                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-hotel-accent hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Generate Invoice
                  </button>
                </div>
              </div>

              {/* Financial Balance Strip */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total Charges</span>
                  <span className="text-lg font-black text-hotel-navy block mt-0.5">
                    ₹{activeRes.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Deposits Paid</span>
                  <span className="text-lg font-black text-emerald-700 block mt-0.5">
                    ₹{activeRes.paidAmount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Balance Due</span>
                  <span className="text-lg font-black text-amber-700 block mt-0.5">
                    ₹{(activeRes.totalAmount - activeRes.paidAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Folio Line Items Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
                  Itemized Folio Transactions ({activeRes.folioCharges.length})
                </h3>

                <div className="border border-hotel-border rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFD] border-b border-hotel-border text-[10px] font-bold text-hotel-muted uppercase">
                      <tr>
                        <th className="px-4 py-2.5">Date & Time</th>
                        <th className="px-4 py-2.5">Department / Category</th>
                        <th className="px-4 py-2.5">Description</th>
                        <th className="px-4 py-2.5 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hotel-border">
                      {activeRes.folioCharges.map((item) => (
                        <tr key={item.id} className="hover:bg-hotel-ice/30">
                          <td className="px-4 py-2.5 font-mono text-[11px] text-hotel-muted">{item.timestamp}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-hotel-accent">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 font-medium text-hotel-navy">{item.description}</td>
                          <td className="px-4 py-2.5 text-right font-extrabold text-hotel-navy">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="hotel-card p-12 text-center text-hotel-muted">
              Select a reservation from the left to view folio records.
            </div>
          )}
        </div>
      </div>

      {/* Post Folio Charge Modal */}
      {showAddChargeModal && activeRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Post Department Charge to Folio
              </h3>
              <button
                onClick={() => setShowAddChargeModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Service / Item Category</label>
                <select
                  value={chargeCat}
                  onChange={(e) => setChargeCat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium text-hotel-navy"
                >
                  <option value="Dining">In-Room Dining / Restaurant</option>
                  <option value="Spa">The Lotus Sanctuary Spa</option>
                  <option value="Laundry">Express Steam Laundry</option>
                  <option value="Room Charge">Suite Upgrade / Extra Night</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Charge Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Beluga Caviar & Champagne Service"
                  value={chargeDesc}
                  onChange={(e) => setChargeDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowAddChargeModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!chargeDesc.trim() || chargeAmount <= 0) {
                    alert("Please provide charge description and positive amount.");
                    return;
                  }
                  addFolioCharge(activeRes.id, {
                    description: chargeDesc,
                    amount: chargeAmount,
                    category: chargeCat,
                  });
                  setShowAddChargeModal(false);
                  setChargeDesc("");
                  alert(`Posted ₹${chargeAmount.toLocaleString()} to ${activeRes.guestName}'s folio!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Post to Folio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Folio Invoice Modal */}
      {showInvoiceModal && activeRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border no-print">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Guest Folio Tax Invoice
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-hotel-accent text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-hotel-border bg-white text-hotel-navy space-y-4">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h4 className="text-lg font-black">THE GRAND ELYSIUM HOTEL & RESORT</h4>
                  <p className="text-xs text-hotel-muted">GSTIN: 08AAACH1234F1Z5 • 5-Star Luxury Resort</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-hotel-accent">INVOICE: INV-{activeRes.bookingCode}</p>
                  <p className="text-hotel-muted">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><strong>Billed To:</strong> {activeRes.guestName}</div>
                <div><strong>Suite:</strong> {activeRes.roomNumber}</div>
                <div><strong>Arrival:</strong> {activeRes.checkInDate}</div>
                <div><strong>Departure:</strong> {activeRes.checkOutDate}</div>
              </div>

              <table className="w-full text-left text-xs border-t pt-2">
                <thead>
                  <tr className="border-b font-bold text-hotel-muted">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">Department</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeRes.folioCharges.map((chg) => (
                    <tr key={chg.id}>
                      <td className="py-2">{chg.description}</td>
                      <td className="py-2">{chg.category}</td>
                      <td className="py-2 text-right font-bold">₹{chg.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t pt-3 flex justify-between font-black text-base">
                <span>Grand Total Settlement:</span>
                <span className="text-hotel-accent">₹{activeRes.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
