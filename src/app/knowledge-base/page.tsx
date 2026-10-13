"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { KnowledgeSOP } from "@/types/hotel";
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react";

export default function KnowledgeBasePage() {
  const { sops } = useHotel();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeSop, setActiveSop] = useState<KnowledgeSOP | null>(sops[0] || null);

  const filteredSops = sops.filter((sop) => {
    const matchesSearch =
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || sop.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              5-Star Luxury Knowledge Base & SOP Repository
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Forbes & Michelin Compliant
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Central repository for Standard Operating Procedures, emergency protocols, grooming benchmarks, and food safety.
          </p>
        </div>

        <div className="text-xs text-hotel-muted font-medium">
          Active Documents: <strong className="text-hotel-navy">{sops.length} Standards</strong>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="hotel-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
          <input
            type="text"
            placeholder="Search standards by title, code, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:border-hotel-accent"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-hotel-navy">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 border border-hotel-border rounded-xl bg-[#F7F9FC] font-semibold text-hotel-navy"
          >
            <option value="all">All Standards (Master Repository)</option>
            <option value="Guest Service Standards">Guest Service Standards</option>
            <option value="Safety & Emergency">Safety & Emergency</option>
            <option value="Culinary Hygiene">Culinary Hygiene (HACCP)</option>
            <option value="Engineering Protocols">Engineering Protocols</option>
          </select>
        </div>
      </div>

      {/* Main Grid: SOP Document List (Left) + Document Reader (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Document List */}
        <div className="hotel-card p-4 space-y-2 max-h-[640px] overflow-y-auto">
          {filteredSops.map((sop) => {
            const isSelected = activeSop?.id === sop.id;
            return (
              <div
                key={sop.id}
                onClick={() => setActiveSop(sop)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-blue-50/70 border-hotel-accent ring-1 ring-hotel-accent/30"
                    : "bg-white border-hotel-border hover:bg-hotel-ice/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-hotel-accent font-bold">
                    {sop.code}
                  </span>
                  <span className="text-[10px] text-hotel-muted">
                    Updated {sop.lastUpdated}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-hotel-navy mt-1 line-clamp-1">
                  {sop.title}
                </h3>
                <p className="text-[11px] text-hotel-muted mt-0.5 line-clamp-2">
                  {sop.summary}
                </p>
                <span className="text-[10px] text-hotel-accent font-semibold block mt-1">
                  {sop.department}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Full Document Reader */}
        <div className="lg:col-span-2">
          {activeSop ? (
            <div className="hotel-card p-6 space-y-5 bg-white">
              <div className="flex items-start justify-between pb-4 border-b border-hotel-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-hotel-accent">
                      {activeSop.code}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-hotel-navy">
                      {activeSop.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-hotel-navy mt-2">
                    {activeSop.title}
                  </h2>
                  <p className="text-xs text-hotel-muted mt-0.5">
                    Governing Division: <strong className="text-hotel-navy">{activeSop.department}</strong> • Certified: {activeSop.lastUpdated}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-hotel-ice/60 rounded-xl text-xs text-hotel-navy leading-relaxed border border-blue-100">
                <span className="font-bold text-hotel-accent uppercase text-[10px] block mb-1">Executive Summary:</span>
                {activeSop.summary}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy">
                  Standard Operating Execution Checklist
                </h3>
                <div className="p-4 rounded-xl bg-gray-50 border border-hotel-border whitespace-pre-line text-xs text-hotel-text leading-relaxed font-sans">
                  {activeSop.content}
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFD] rounded-xl flex items-center justify-between text-[11px] text-hotel-muted border border-hotel-border">
                <span>Compliance Verification: Mandatory for all division associates</span>
                <span className="text-hotel-navy font-bold">Approved by Quality Assurance</span>
              </div>
            </div>
          ) : (
            <div className="hotel-card p-12 text-center text-hotel-muted">
              Select an SOP document from the list to read instructions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
