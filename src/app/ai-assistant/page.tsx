"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import {
  Sparkles,
  Send,
  Database,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  sources?: string[];
  keyMetrics?: Record<string, string | number>;
  timestamp: string;
}

export default function AiOperationsAssistant() {
  const { currentUser, executeAiQuery } = useHotel();

  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-msg",
      sender: "ai",
      content: `Greetings, ${currentUser.name}. I am the Elite Hotel OS Intelligence Engine, securely grounded in your live property database. I can answer real-time operational questions regarding occupancy, workforce attendance, low-stock inventory, pending approvals, and engineering maintenance. How may I assist your executive overview today?`,
      sources: ["Live Relational Store", "The Grand Elysium 5-Star Telemetry"],
      keyMetrics: { "System State": "Online", "Grounded Tables": 18, "Data Privacy": "Role-Enforced" },
      timestamp: "Just now",
    },
  ]);

  const quickPrompts = [
    "What is our current occupancy and check-in status?",
    "Which departments have staffing shortages or pending leaves?",
    "Show items below reorder level in Food & Beverage and Stores.",
    "What are the critical engineering issues and suite maintenance status?",
    "Summarize today's financial performance and outstanding guest folios.",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsProcessing(true);

    setTimeout(() => {
      const response = executeAiQuery(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        content: response.answer,
        sources: response.sources,
        keyMetrics: response.keyMetrics,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-hotel-navy to-[#1E4378] text-white shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-hotel-accent text-white shadow-glow">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight">
                GROUNDED HOTEL AI ASSISTANT
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                GROUNDED TO DATABASE
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Verified deterministic answers generated directly from real active tables. No hallucinations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Access Clearance: <strong className="text-white">{currentUser.role}</strong></span>
        </div>
      </div>

      {/* Suggested Quick Executive Prompts */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-hotel-muted uppercase tracking-wider">
          Suggested Executive Inquiries:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white border border-hotel-border hover:border-hotel-accent hover:bg-hotel-ice text-xs font-semibold text-hotel-navy transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-hotel-accent opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="hotel-card p-6 min-h-[460px] flex flex-col justify-between space-y-4">
        <div className="space-y-6 overflow-y-auto max-h-[550px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-hotel-navy text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                  m.sender === "user"
                    ? "bg-hotel-accent text-white"
                    : "bg-[#F8FAFD] border border-hotel-border text-hotel-text"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-75">
                  <span className="font-bold">
                    {m.sender === "user" ? currentUser.name : "Elite Intelligence"}
                  </span>
                  <span>{m.timestamp}</span>
                </div>

                <p className="text-xs leading-relaxed whitespace-pre-line font-medium">
                  {m.content}
                </p>

                {/* Key Grounded Metrics Cards */}
                {m.keyMetrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-black/5">
                    {Object.entries(m.keyMetrics).map(([key, val]) => (
                      <div key={key} className="p-2 rounded-lg bg-white border border-hotel-border shadow-xs">
                        <span className="text-[10px] font-bold text-hotel-muted block">{key}</span>
                        <span className="text-xs font-extrabold text-hotel-navy block mt-0.5">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grounded Source Citations */}
                {m.sources && m.sources.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-hotel-muted">
                    <Database className="w-3 h-3 text-hotel-accent" />
                    <span>Verified Data Sources:</span>
                    <span className="font-semibold text-hotel-navy">
                      {m.sources.join(" • ")}
                    </span>
                  </div>
                )}
              </div>

              {m.sender === "user" && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover flex-shrink-0 border border-hotel-border"
                />
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 p-3 text-xs text-hotel-muted animate-pulse">
              <Sparkles className="w-4 h-4 text-hotel-accent" />
              <span>Querying hotel operational database in real time...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-hotel-border flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask any question about staff, occupancy, folios, inventory, or maintenance..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(inputQuery)}
            className="flex-1 px-4 py-3 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent focus:bg-white text-hotel-text placeholder-hotel-muted transition-all"
          />
          <button
            onClick={() => handleSend(inputQuery)}
            disabled={!inputQuery.trim()}
            className="p-3 rounded-xl bg-hotel-accent text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
