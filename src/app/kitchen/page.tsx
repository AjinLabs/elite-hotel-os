"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  UtensilsCrossed,
  ChefHat,
  ThermometerSnowflake,
  Trash2,
  DollarSign,
  AlertTriangle,
  Clock,
  Sparkles,
  Plus,
  CheckCircle2,
  Layers,
} from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  category: "Starters" | "Main Course" | "Pastry & Dessert" | "Signature Degustation";
  menuPrice: number;
  foodCost: number;
  costPercentage: number;
  allergens: string[];
  prepTimeMinutes: number;
  ingredients: Array<{ name: string; qty: string; cost: number }>;
}

export default function KitchenPage() {
  const { employees, inventory } = useHotel();

  const [activeTab, setActiveTab] = useState<"recipes" | "tempLogs" | "waste">("recipes");

  const recipes: Recipe[] = [
    {
      id: "rcp-1",
      name: "Imperial Beluga Caviar & Sea Urchin Tartlet",
      category: "Signature Degustation",
      menuPrice: 8500,
      foodCost: 2280,
      costPercentage: 26.8,
      allergens: ["Fish", "Crustacean", "Gluten"],
      prepTimeMinutes: 25,
      ingredients: [
        { name: "Imperial Beluga Caviar (20g)", qty: "20g", cost: 1800 },
        { name: "Hokkaido Uni (Sea Urchin)", qty: "15g", cost: 350 },
        { name: "Buckwheat Tart Shell", qty: "1 pc", cost: 130 },
      ],
    },
    {
      id: "rcp-2",
      name: "Miyazaki A5 Wagyu Tenderloin with Morel Reduction",
      category: "Main Course",
      menuPrice: 9800,
      foodCost: 2650,
      costPercentage: 27.0,
      allergens: ["Dairy", "Sulfites"],
      prepTimeMinutes: 35,
      ingredients: [
        { name: "Miyazaki Wagyu Tenderloin", qty: "220g", cost: 2200 },
        { name: "Fresh French Morels", qty: "40g", cost: 320 },
        { name: "Normandy Butter & Truffle Jus", qty: "30ml", cost: 130 },
      ],
    },
    {
      id: "rcp-3",
      name: "Autumn Truffle & Acquerello Carnaroli Risotto",
      category: "Main Course",
      menuPrice: 4200,
      foodCost: 980,
      costPercentage: 23.3,
      allergens: ["Dairy"],
      prepTimeMinutes: 30,
      ingredients: [
        { name: "Acquerello Aged Risotto Rice", qty: "120g", cost: 180 },
        { name: "Piedmont Black Truffle", qty: "10g", cost: 650 },
        { name: "Parmigiano-Reggiano 36 Month", qty: "30g", cost: 150 },
      ],
    },
    {
      id: "rcp-4",
      name: "Valrhona Guanaja 70% Dark Chocolate Sphere",
      category: "Pastry & Dessert",
      menuPrice: 2400,
      foodCost: 480,
      costPercentage: 20.0,
      allergens: ["Dairy", "Eggs", "Nuts"],
      prepTimeMinutes: 40,
      ingredients: [
        { name: "Valrhona Guanaja Couverture", qty: "80g", cost: 260 },
        { name: "Gold Leaf & Gold Dust", qty: "0.2g", cost: 120 },
        { name: "Madagascar Bourbon Vanilla Bean", qty: "0.5 pc", cost: 100 },
      ],
    },
  ];

  const tempLogs = [
    { zone: "Meat Locker (Walk-in Freezers)", target: "-18.0°C", actual: "-18.4°C", status: "Optimal", loggedAt: "07:00 AM", loggedBy: "Chef Rohit Sen" },
    { zone: "Caviar & Seafood Cooler Safe", target: "1.0°C", actual: "1.2°C", status: "Optimal", loggedAt: "07:15 AM", loggedBy: "Chef Sanjeev Mehra" },
    { zone: "Pastry Butter & Cream Refrigerator", target: "3.5°C", actual: "3.8°C", status: "Optimal", loggedAt: "07:30 AM", loggedBy: "Chef Rohit Sen" },
    { zone: "Hot Line Holding Cabinet (Sauces)", target: "68.0°C", actual: "68.5°C", status: "Optimal", loggedAt: "08:00 AM", loggedBy: "Anil Khurana" },
  ];

  const wasteRecords = [
    { date: "12 Oct", item: "Organic Heirloom Vegetable Trimmings", qty: "2.4 kg", reason: "Prep trimming for consommé", lossCost: 850, reportedBy: "Commis Chef" },
    { date: "11 Oct", item: "French Baguette Ends (Bakery)", qty: "4 loaves", reason: "Converted to artisan croutons", lossCost: 320, reportedBy: "Pastry Section" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Kitchen Brigade & Culinary Operations
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Michelin Haute Cuisine
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Recipe cost analysis, HACCP cold chain temperature logging, ingredient stocks, and food waste reduction.
          </p>
        </div>

        <div className="flex p-1 bg-hotel-ice rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "recipes" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            Menu & Recipe Costs
          </button>
          <button
            onClick={() => setActiveTab("tempLogs")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "tempLogs" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            HACCP Cold Chain
          </button>
          <button
            onClick={() => setActiveTab("waste")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "waste" ? "bg-hotel-accent text-white" : "text-hotel-navy"
            }`}
          >
            Food Waste Tracker
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Executive Chef</span>
          <span className="text-sm font-extrabold text-hotel-navy block mt-1 truncate">Chef Sanjeev Mehra</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Present On Morning Shift</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Overall Food Cost</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">26.1%</span>
          <span className="text-[11px] font-semibold text-hotel-muted mt-0.5 block">Target: &lt; 28.0%</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">HACCP Cold Chain</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">100% Pass</span>
          <span className="text-[11px] font-semibold text-hotel-success mt-0.5 block">Zero Temp Deviations</span>
        </div>

        <div className="hotel-card p-4">
          <span className="text-[10px] font-bold text-hotel-muted uppercase block">Active Menu Items</span>
          <span className="text-2xl font-black text-hotel-navy block mt-1">42 Dishes</span>
          <span className="text-[11px] font-semibold text-hotel-accent mt-0.5 block">Autumn Degustation</span>
        </div>
      </div>

      {/* Tab 1: Menu & Recipe Costings */}
      {activeTab === "recipes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((rcp) => (
              <div key={rcp.id} className="hotel-card p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-hotel-accent">
                      {rcp.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-hotel-navy mt-1">
                      {rcp.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-hotel-navy block">
                      ₹{rcp.menuPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">
                      Cost: {rcp.costPercentage}% (₹{rcp.foodCost})
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs pt-2 border-t border-hotel-border">
                  <p className="font-bold text-hotel-navy text-[10px] uppercase">Ingredient Breakdown:</p>
                  {rcp.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-gray-50 text-[11px]">
                      <span className="text-hotel-muted">{ing.name} ({ing.qty})</span>
                      <span className="font-semibold text-hotel-navy">₹{ing.cost}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] pt-1 text-hotel-muted">
                  <span>Allergens: {rcp.allergens.join(", ")}</span>
                  <span>Prep: {rcp.prepTimeMinutes} mins</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: HACCP Temperature Logs */}
      {activeTab === "tempLogs" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-hotel-accent" />
              Digital HACCP Temperature Audit Log (ISO 22000 Compliance)
            </h3>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="px-4 py-3">Storage Zone</th>
                <th className="px-4 py-3">Target Temp</th>
                <th className="px-4 py-3">Sensor Reading</th>
                <th className="px-4 py-3">Audit Time</th>
                <th className="px-4 py-3">Inspector Chef</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {tempLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-hotel-ice/30">
                  <td className="px-4 py-3 font-bold text-hotel-navy">{log.zone}</td>
                  <td className="px-4 py-3 font-mono">{log.target}</td>
                  <td className="px-4 py-3 font-mono font-bold text-hotel-accent">{log.actual}</td>
                  <td className="px-4 py-3 text-hotel-muted">{log.loggedAt}</td>
                  <td className="px-4 py-3 font-medium text-hotel-navy">{log.loggedBy}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Food Waste Tracking */}
      {activeTab === "waste" && (
        <div className="hotel-card overflow-hidden">
          <div className="p-4 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-hotel-accent" />
              Culinary Waste & Sustainable Spoilage Register
            </h3>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Ingredient / Prep Item</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Root Cause & Action</th>
                <th className="px-4 py-3">Calculated Cost (₹)</th>
                <th className="px-4 py-3">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {wasteRecords.map((w, idx) => (
                <tr key={idx} className="hover:bg-hotel-ice/30">
                  <td className="px-4 py-3 font-mono text-hotel-muted">{w.date}</td>
                  <td className="px-4 py-3 font-bold text-hotel-navy">{w.item}</td>
                  <td className="px-4 py-3 font-semibold">{w.qty}</td>
                  <td className="px-4 py-3 text-hotel-muted">{w.reason}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600">₹{w.lossCost}</td>
                  <td className="px-4 py-3 text-hotel-navy">{w.reportedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
