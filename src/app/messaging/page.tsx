"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { InternalMessage } from "@/types/hotel";
import {
  MessageSquare,
  Send,
  Users,
  Building2,
  Radio,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function MessagingPage() {
  const {
    messages,
    sendMessage,
    currentUser,
    departments,
    employees,
  } = useHotel();

  const [activeChannel, setActiveChannel] = useState<"broadcast" | "frontdesk" | "management">("broadcast");
  const [composerText, setComposerText] = useState("");
  const [recipientType, setRecipientType] = useState<"Hotel Broadcast" | "Department" | "Direct">("Hotel Broadcast");
  const [targetDept, setTargetDept] = useState("Front Office and Reception");

  const filteredMessages = messages.filter((m) => {
    if (activeChannel === "broadcast") return m.recipientType === "Hotel Broadcast";
    if (activeChannel === "frontdesk") return m.recipientName.includes("Front Office") || m.senderRole.includes("Front Office");
    return true;
  });

  const handleSend = () => {
    if (!composerText.trim()) return;

    sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      recipientType,
      recipientName: recipientType === "Hotel Broadcast" ? "All Hotel Staff" : targetDept,
      content: composerText,
    });

    setComposerText("");
    alert("Message transmitted successfully across internal hotel communications network!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Internal Communications & Emergency Broadcasts
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              Encrypted In-House Network
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Department dispatch channels, executive directives, and protocol emergency broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-hotel-muted font-medium">
          <ShieldCheck className="w-4 h-4 text-hotel-accent" />
          <span>Active Sender: <strong className="text-hotel-navy">{currentUser.name}</strong></span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="hotel-card overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
        {/* Left: Channels Sidebar */}
        <div className="p-4 border-r border-hotel-border bg-[#F8FAFD] space-y-4">
          <p className="text-xs font-bold text-hotel-muted uppercase px-2">
            Communication Channels
          </p>

          <div className="space-y-1">
            <button
              onClick={() => setActiveChannel("broadcast")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                activeChannel === "broadcast"
                  ? "bg-hotel-accent text-white font-bold shadow-xs"
                  : "hover:bg-hotel-ice text-hotel-navy"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4" />
                <span className="text-xs">Hotel-Wide Broadcasts</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded-full font-bold">
                HOTEL
              </span>
            </button>

            <button
              onClick={() => setActiveChannel("frontdesk")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                activeChannel === "frontdesk"
                  ? "bg-hotel-accent text-white font-bold shadow-xs"
                  : "hover:bg-hotel-ice text-hotel-navy"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" />
                <span className="text-xs">Front Office & Suites</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-hotel-navy rounded-full font-bold">
                FO
              </span>
            </button>

            <button
              onClick={() => setActiveChannel("management")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                activeChannel === "management"
                  ? "bg-hotel-accent text-white font-bold shadow-xs"
                  : "hover:bg-hotel-ice text-hotel-navy"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span className="text-xs">Executive Leadership</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-hotel-navy rounded-full font-bold">
                EXEC
              </span>
            </button>
          </div>
        </div>

        {/* Right: Message Stream and Composer */}
        <div className="md:col-span-2 p-5 flex flex-col justify-between space-y-4 bg-white">
          {/* Messages Feed */}
          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-hotel-border space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-hotel-navy">{msg.senderName}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-100 text-hotel-accent font-semibold">
                      {msg.senderRole}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-hotel-muted">{msg.timestamp}</span>
                </div>

                <p className="text-xs text-hotel-text leading-relaxed">
                  {msg.content}
                </p>

                <div className="text-[10px] text-hotel-muted font-medium pt-1">
                  Recipient: <strong className="text-hotel-navy">{msg.recipientName}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="pt-3 border-t border-hotel-border space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-hotel-navy">Target Audience:</span>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value as any)}
                className="px-2.5 py-1 border border-hotel-border rounded-lg bg-[#F8FAFD] font-semibold text-hotel-navy"
              >
                <option value="Hotel Broadcast">Hotel Broadcast (All Staff)</option>
                <option value="Department">Department Channel</option>
                <option value="Direct">Direct Staff Message</option>
              </select>

              {recipientType === "Department" && (
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="px-2.5 py-1 border border-hotel-border rounded-lg bg-[#F8FAFD] font-semibold text-hotel-navy"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type directives, shift instructions, or hotel-wide announcements..."
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-2.5 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:border-hotel-accent text-hotel-text"
              />
              <button
                onClick={handleSend}
                disabled={!composerText.trim()}
                className="px-4 py-2.5 rounded-xl bg-hotel-accent text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Transmit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
