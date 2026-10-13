"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { InventoryItem, PurchaseOrder } from "@/types/hotel";
import {
  Boxes,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpDown,
  FileCheck2,
  CheckCircle2,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function InventoryPage() {
  const {
    inventory,
    purchaseOrders,
    updateInventoryStock,
    addInventoryItem,
    createPurchaseOrder,
    currentUser,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<"items" | "orders">("items");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showPoModal, setShowPoModal] = useState(false);

  // New Item State
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState<InventoryItem["category"]>("Food Ingredients");
  const [itemStock, setItemStock] = useState(10);
  const [itemReorder, setItemReorder] = useState(15);
  const [itemUnit, setItemUnit] = useState("kg");
  const [itemPrice, setItemPrice] = useState(1500);
  const [itemSupplier, setItemSupplier] = useState("Global Hospitality Direct");
  const [itemLocation, setItemLocation] = useState("Main Central Warehouse");

  // Filtered inventory
  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const lowStockCount = inventory.filter((i) => i.currentStock <= i.reorderLevel).length;
  const totalValuation = inventory.reduce((acc, i) => acc + i.currentStock * i.unitPrice, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Stores Inventory & Procurement Hub
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Multi-Category Stock Control
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Real-time stock valuation, reorder automation, purchase requisition approvals, and warehouse tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPoModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-hotel-ice hover:bg-blue-100 text-hotel-accent text-xs font-bold transition-all shadow-xs"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            Raise Purchase Order
          </button>
          <button
            onClick={() => setShowAddItemModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hotel-accent hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Total Stock Valuation</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">
            ₹{(totalValuation / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Audited Inventory</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Items Below Reorder</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">{lowStockCount}</span>
          <span className="text-[11px] font-semibold text-amber-700 mt-0.5 block">Reorder Triggered</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Purchase Orders</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">{purchaseOrders.length}</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Across 8 Divisions</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Safety Stock Fulfillment</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">94.8%</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Stores Grade A</span>
        </div>
      </div>

      {/* Low Stock Warning Ribbon */}
      {lowStockCount > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-hotel-navy">
              Critical Stock Replenishment Action Required
            </p>
            <p className="text-hotel-muted mt-0.5">
              {lowStockCount} items have fallen below safety buffer thresholds. Purchase orders have been drafted and routed for authorized sign-off.
            </p>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="hotel-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
          <input
            type="text"
            placeholder="Search item code, name, or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:border-hotel-accent"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-hotel-navy">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-1.5 border border-hotel-border rounded-xl bg-[#F7F9FC] font-semibold text-hotel-navy"
          >
            <option value="all">All Categories (8 Master Lines)</option>
            <option value="Food Ingredients">Food Ingredients</option>
            <option value="Beverages">Beverages & Wine</option>
            <option value="Guest Amenities">Guest Amenities (Hermès)</option>
            <option value="Linen">Linen & Laundry</option>
            <option value="Housekeeping">Housekeeping Supplies</option>
            <option value="Maintenance">Maintenance Spares</option>
          </select>
        </div>
      </div>

      {/* Item Master Table */}
      <div className="hotel-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Item Details</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stock vs Reorder</th>
                <th className="px-4 py-3">Unit Cost (₹)</th>
                <th className="px-4 py-3">Storage Depot</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3 text-right">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {filteredItems.map((item) => {
                const isLow = item.currentStock <= item.reorderLevel;
                return (
                  <tr key={item.id} className="hover:bg-hotel-ice/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-extrabold text-hotel-navy">{item.name}</div>
                      <div className="text-[10px] font-mono text-hotel-muted">{item.itemCode}</div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-hotel-accent">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-black ${isLow ? "text-red-600" : "text-hotel-navy"}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        <span className="text-[10px] text-hotel-muted">
                          (Reorder at: {item.reorderLevel})
                        </span>
                      </div>
                      {isLow && (
                        <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                          Low Stock Alert
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 font-mono font-bold text-hotel-navy">
                      ₹{item.unitPrice.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-hotel-muted text-[11px]">
                      {item.storageLocation}
                    </td>

                    <td className="px-4 py-3 text-hotel-navy font-medium">
                      {item.supplier}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => updateInventoryStock(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-50 text-hotel-navy hover:text-red-600 font-black text-xs transition-colors"
                          title="Consume / Issue 1 unit"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => updateInventoryStock(item.id, 5)}
                          className="px-2 py-1 rounded-lg bg-hotel-ice hover:bg-blue-100 text-hotel-accent font-black text-[11px] transition-colors"
                          title="Restock 5 units"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Register New Inventory Item
              </h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Item Description / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Pellegrino Sparkling Water (750ml)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Category</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                  >
                    <option value="Food Ingredients">Food Ingredients</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Guest Amenities">Guest Amenities</option>
                    <option value="Linen">Linen</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Storage Unit</label>
                  <input
                    type="text"
                    value={itemUnit}
                    onChange={(e) => setItemUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={itemStock}
                    onChange={(e) => setItemStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Reorder Level Threshold</label>
                  <input
                    type="number"
                    value={itemReorder}
                    onChange={(e) => setItemReorder(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-hotel-navy block mb-1">Storage Location</label>
                  <input
                    type="text"
                    value={itemLocation}
                    onChange={(e) => setItemLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Primary Supplier</label>
                <input
                  type="text"
                  value={itemSupplier}
                  onChange={(e) => setItemSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowAddItemModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!itemName.trim()) {
                    alert("Please provide item name.");
                    return;
                  }
                  addInventoryItem({
                    name: itemName,
                    category: itemCategory,
                    currentStock: itemStock,
                    reorderLevel: itemReorder,
                    unit: itemUnit,
                    unitPrice: itemPrice,
                    supplier: itemSupplier,
                    storageLocation: itemLocation,
                  });
                  setShowAddItemModal(false);
                  setItemName("");
                  alert(`Added ${itemName} to inventory master!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Raise PO Modal */}
      {showPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Raise Luxury Purchase Order
              </h3>
              <button
                onClick={() => setShowPoModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-hotel-muted text-[11px]">
                Create an auditable purchase requisition for executive sign-off:
              </p>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Supplier Entity</label>
                <input
                  type="text"
                  defaultValue="Moët Hennessy & Caspian Gourmet"
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Requesting Division</label>
                <select className="w-full px-3 py-2 border border-hotel-border rounded-xl font-medium">
                  <option>Kitchen and Culinary</option>
                  <option>Housekeeping & Amenities</option>
                  <option>Engineering & Maintenance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Estimated Requisition Value (₹)</label>
                <input
                  type="number"
                  defaultValue={145000}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowPoModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  createPurchaseOrder({
                    supplierName: "Moët Hennessy Direct",
                    requestedByDepartment: "Kitchen and Culinary",
                    totalCost: 145000,
                    items: [
                      { itemName: "Dom Pérignon Vintage 2013", quantity: 5, unit: "cases", unitPrice: 29000 },
                    ],
                    status: "Pending Owner Approval",
                  });
                  setShowPoModal(false);
                  alert("Purchase order generated and queued in Owner Approval Hub!");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Route for Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
