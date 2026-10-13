"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHotel } from "@/lib/store";
import {
  Users,
  UserCheck,
  UserX,
  CalendarCheck,
  Briefcase,
  Building2,
  FileCheck2,
  CheckSquare,
  AlertTriangle,
  BedDouble,
  DoorOpen,
  DoorClosed,
  IndianRupee,
  TrendingUp,
  Receipt,
  CreditCard,
  MessageSquareWarning,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Sparkles,
  Radio,
  ChevronRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function OwnerDashboard() {
  const {
    currentUser,
    employees,
    departments,
    rooms,
    reservations,
    attendance,
    leaveRequests,
    inventory,
    purchaseOrders,
    maintenanceTickets,
    guestComplaints,
    notifications,
  } = useHotel();

  const [timeRange, setTimeRange] = useState<"7d" | "30d">("7d");

  // Calculations for 20 KPIs
  const totalEmployees = employees.length;
  const presentEmployees = attendance.filter(
    (a) => a.status === "Present" || a.status === "On Duty"
  ).length;
  const absentEmployees = attendance.filter((a) => a.status === "Absent").length;
  const onLeaveEmployees = leaveRequests.filter((l) => l.status === "Approved").length;
  const onDutyEmployees = attendance.filter((a) => a.status === "On Duty").length;
  const vacantPositions = departments.reduce((acc, d) => acc + d.openPositions, 0);
  const totalDepartments = departments.length;
  const pendingLeaves = leaveRequests.filter((l) => l.status.startsWith("Pending")).length;
  const openTasks = 18; // active operational workflows
  const overdueTasks = 2;

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === "Occupied").length;
  const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
  const todayCheckIns = reservations.filter((r) => r.status === "Confirmed").length;
  const todayCheckOuts = reservations.filter((r) => r.checkOutDate === "2026-10-14" || r.checkOutDate === "2026-10-15").length;

  const todayRevenue = 845000;
  const monthlyRevenue = 14280000;
  const monthlyExpenses = 8840000;
  const outstandingPayments = reservations.reduce(
    (acc, r) => acc + (r.totalAmount - r.paidAmount),
    0
  );
  const openComplaints = guestComplaints.filter((c) => c.status !== "Resolved & Closed").length;
  const maintenanceIssues = maintenanceTickets.filter((m) => m.status !== "Resolved").length;

  // Chart Data: 7-day vs 30-day attendance trend
  const attendanceTrendData = [
    { day: "07 Oct", present: 38, leave: 2, late: 1 },
    { day: "08 Oct", present: 39, leave: 1, late: 0 },
    { day: "09 Oct", present: 37, leave: 2, late: 2 },
    { day: "10 Oct", present: 40, leave: 1, late: 1 },
    { day: "11 Oct", present: 39, leave: 2, late: 0 },
    { day: "12 Oct", present: 38, leave: 3, late: 1 },
    { day: "13 Oct (Today)", present: presentEmployees, leave: onLeaveEmployees, late: 1 },
  ];

  // Department distribution
  const deptEmployeeData = [
    { name: "Front Office", count: 8, budget: "₹8.5L" },
    { name: "Housekeeping", count: 12, budget: "₹14.5L" },
    { name: "Culinary & F&B", count: 14, budget: "₹21.0L" },
    { name: "Engineering", count: 6, budget: "₹10.5L" },
    { name: "Security", count: 5, budget: "₹6.2L" },
    { name: "Executive & Admin", count: 6, budget: "₹16.8L" },
  ];

  // Room Status Distribution
  const roomStatusData = [
    { name: "Occupied", value: occupiedRooms, color: "#245BDB" },
    { name: "Available", value: rooms.filter((r) => r.status === "Available").length, color: "#16845B" },
    { name: "Cleaning/Dirty", value: rooms.filter((r) => r.status === "Cleaning" || r.status === "Dirty").length, color: "#D98A16" },
    { name: "Maintenance", value: rooms.filter((r) => r.status === "Maintenance").length, color: "#D94343" },
    { name: "Reserved", value: rooms.filter((r) => r.status === "Reserved").length, color: "#6B9CFF" },
  ];

  // Revenue vs Expense monthly comparison
  const financialBarData = [
    { month: "Jun", revenue: 118, expense: 76 },
    { month: "Jul", revenue: 125, expense: 79 },
    { month: "Aug", revenue: 132, expense: 82 },
    { month: "Sep", revenue: 138, expense: 85 },
    { month: "Oct (Proj)", revenue: 142.8, expense: 88.4 },
  ];

  // 20 KPI cards data
  const kpiGroups = [
    {
      group: "WORKFORCE & HRMS",
      cards: [
        { title: "Total Employees", value: totalEmployees, trend: "+3 this month", isPositive: true, icon: Users, link: "/employees" },
        { title: "Present Today", value: presentEmployees, trend: "94.2% turnout", isPositive: true, icon: UserCheck, link: "/attendance" },
        { title: "Absent Today", value: absentEmployees, trend: "0 unscheduled", isPositive: true, icon: UserX, link: "/attendance" },
        { title: "Approved Leave", value: onLeaveEmployees, trend: "Scheduled quotas", isPositive: true, icon: CalendarCheck, link: "/leave" },
        { title: "Currently On Duty", value: onDutyEmployees, trend: "Shift coverage 98%", isPositive: true, icon: Clock, link: "/attendance" },
        { title: "Vacant Positions", value: vacantPositions, trend: "Recruitment active", isPositive: false, icon: Briefcase, link: "/departments" },
        { title: "Total Departments", value: totalDepartments, trend: "22 Divisions", isPositive: true, icon: Building2, link: "/departments" },
        { title: "Pending Leaves", value: pendingLeaves, trend: `${pendingLeaves} requires sign-off`, isPositive: pendingLeaves === 0, icon: FileCheck2, link: "/approvals", alert: pendingLeaves > 0 },
      ],
    },
    {
      group: "ROOMS & FRONT DESK",
      cards: [
        { title: "Total Suites", value: totalRooms, trend: "100% capacity", isPositive: true, icon: BedDouble, link: "/front-office" },
        { title: "Occupancy Rate", value: `${occupancyRate}%`, trend: "+12.4% vs last week", isPositive: true, icon: TrendingUp, link: "/front-office" },
        { title: "Today's Check-ins", value: todayCheckIns, trend: "2 VIP arrivals", isPositive: true, icon: DoorOpen, link: "/reservations" },
        { title: "Today's Check-outs", value: todayCheckOuts, trend: "Express folios", isPositive: true, icon: DoorClosed, link: "/reservations" },
        { title: "Open Tasks", value: openTasks, trend: "Across 6 departments", isPositive: true, icon: CheckSquare, link: "/command-center" },
        { title: "Overdue Tasks", value: overdueTasks, trend: "Resolution prioritized", isPositive: false, icon: AlertTriangle, link: "/command-center", alert: overdueTasks > 0 },
      ],
    },
    {
      group: "FINANCE & GUEST SATISFACTION",
      cards: [
        { title: "Today's Revenue", value: `₹${(todayRevenue / 1000).toFixed(0)}k`, trend: "+18.2% vs target", isPositive: true, icon: IndianRupee, link: "/finance" },
        { title: "Monthly Revenue", value: `₹${(monthlyRevenue / 100000).toFixed(1)}L`, trend: "38.1% net margin", isPositive: true, icon: TrendingUp, link: "/finance" },
        { title: "Monthly Expenses", value: `₹${(monthlyExpenses / 100000).toFixed(1)}L`, trend: "Within budget", isPositive: true, icon: Receipt, link: "/finance" },
        { title: "Outstanding Folios", value: `₹${(outstandingPayments / 1000).toFixed(0)}k`, trend: "Due on checkout", isPositive: true, icon: CreditCard, link: "/reservations" },
        { title: "Open Complaints", value: openComplaints, trend: openComplaints === 0 ? "Zero defects" : "SLA tracking", isPositive: openComplaints === 0, icon: MessageSquareWarning, link: "/guest-relations", alert: openComplaints > 0 },
        { title: "Maintenance Tickets", value: maintenanceIssues, trend: "2 in engineering", isPositive: maintenanceIssues <= 2, icon: Wrench, link: "/maintenance", alert: maintenanceIssues > 2 },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Welcome & Operations Pulse Banner */}
      <div className="relative overflow-hidden p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-hotel-navy via-[#1F4578] to-hotel-accent text-white shadow-card">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-white backdrop-blur-md uppercase tracking-wider">
                Hotel Owner Control Centre
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live 5-Star Telemetry
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs lg:text-sm text-blue-100 max-w-2xl leading-relaxed">
              All 22 divisions are operating normally. Occupancy is at {occupancyRate}% with ₹8.45L booked today. 
              {pendingLeaves > 0 && ` You have ${pendingLeaves} pending approvals requiring executive authorization.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/command-center"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-hotel-navy font-bold text-xs hover:bg-hotel-ice hover:shadow-glow transition-all"
            >
              <Radio className="w-4 h-4 text-hotel-accent" />
              Live Command Centre
            </Link>
            <Link
              href="/ai-assistant"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-accent/40 border border-white/30 text-white font-bold text-xs hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ask AI Intelligence
            </Link>
          </div>
        </div>
      </div>

      {/* Prioritized Operational Alerts Ribbon */}
      {notifications.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-hotel-warning flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-hotel-navy">
                {notifications.length} Operational Action Items Requiring Attention
              </p>
              <p className="text-[11px] text-hotel-muted">
                {notifications[0]?.title}: {notifications[0]?.message}
              </p>
            </div>
          </div>
          <Link
            href={notifications[0]?.link || "/approvals"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-all flex-shrink-0"
          >
            Resolve Alerts <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 20 KPI Cards Organized into Meaningful Groups */}
      {kpiGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold tracking-wider text-hotel-navy uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hotel-accent" />
              {group.group}
            </h2>
            <span className="text-[11px] text-hotel-muted">Click any metric for deep drill-down</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {group.cards.map((card, cIdx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={cIdx}
                  href={card.link}
                  className="hotel-card hotel-card-hover p-4 group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-hotel-muted line-clamp-1">
                      {card.title}
                    </span>
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        card.alert
                          ? "bg-red-50 text-hotel-error group-hover:bg-red-100"
                          : "bg-hotel-ice text-hotel-accent group-hover:bg-blue-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl lg:text-2xl font-black text-hotel-navy tracking-tight">
                        {card.value}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span
                        className={`font-semibold ${
                          card.alert
                            ? "text-hotel-error"
                            : card.isPositive
                            ? "text-hotel-success"
                            : "text-hotel-muted"
                        }`}
                      >
                        {card.trend}
                      </span>
                      <ExternalLink className="w-3 h-3 text-hotel-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends Chart */}
        <div className="lg:col-span-2 hotel-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-hotel-navy">
                Attendance & Workforce Roster Trends
              </h3>
              <p className="text-[11px] text-hotel-muted">
                Daily turnout across 22 hotel divisions over the last 7 days
              </p>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-hotel-ice rounded-lg text-xs font-semibold">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  timeRange === "7d"
                    ? "bg-hotel-accent text-white shadow-xs"
                    : "text-hotel-navy hover:text-hotel-accent"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  timeRange === "30d"
                    ? "bg-hotel-accent text-white shadow-xs"
                    : "text-hotel-navy hover:text-hotel-accent"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#245BDB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#245BDB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#65738B" fontSize={11} tickLine={false} />
                <YAxis stroke="#65738B" fontSize={11} tickLine={false} domain={[25, 45]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "10px", borderColor: "#E1E8F2", fontSize: "11px" }}
                />
                <Area type="monotone" dataKey="present" stroke="#245BDB" strokeWidth={2.5} fillOpacity={1} fill="url" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Occupancy Breakdown Pie Chart */}
        <div className="hotel-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-hotel-navy">
              Room Status Real-Time Distribution
            </h3>
            <p className="text-[11px] text-hotel-muted">
              {totalRooms} Suites across 4 luxury wings
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {roomStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", borderColor: "#E1E8F2", fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-hotel-border text-[11px]">
            {roomStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-hotel-muted truncate">{item.name}:</span>
                <span className="font-bold text-hotel-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Headcount & Monthly Budget */}
        <div className="hotel-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-hotel-navy">
                Key Department Headcount Distribution
              </h3>
              <p className="text-[11px] text-hotel-muted">
                Staff allocations across highest volume hospitality zones
              </p>
            </div>
            <Link href="/departments" className="text-xs font-semibold text-hotel-accent hover:underline">
              View All 22
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptEmployeeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#65738B" fontSize={10} tickLine={false} />
                <YAxis stroke="#65738B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "10px", borderColor: "#E1E8F2", fontSize: "11px" }}
                />
                <Bar dataKey="count" fill="#245BDB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Financial Performance */}
        <div className="hotel-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-hotel-navy">
                Revenue vs Operating Expenses (₹ Lakhs)
              </h3>
              <p className="text-[11px] text-hotel-muted">
                5-month trajectory maintaining 38%+ operating margin
              </p>
            </div>
            <Link href="/finance" className="text-xs font-semibold text-hotel-accent hover:underline">
              Full P&L Ledger
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#65738B" fontSize={11} tickLine={false} />
                <YAxis stroke="#65738B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "10px", borderColor: "#E1E8F2", fontSize: "11px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Bar dataKey="revenue" name="Revenue (₹L)" fill="#245BDB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Operating Expenses (₹L)" fill="#6B9CFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Operational Watchlist & Direct Executive Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Maintenance Watchlist */}
        <div className="hotel-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Wrench className="w-4 h-4 text-hotel-accent" />
              Engineering Watchlist
            </h3>
            <Link href="/maintenance" className="text-[11px] font-semibold text-hotel-accent hover:underline">
              All Tickets
            </Link>
          </div>

          <div className="space-y-2.5">
            {maintenanceTickets.slice(0, 3).map((ticket) => (
              <div key={ticket.id} className="p-2.5 rounded-xl bg-gray-50 border border-hotel-border">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-hotel-navy line-clamp-1">
                    {ticket.title}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      ticket.severity.includes("Critical")
                        ? "bg-red-100 text-hotel-error"
                        : "bg-blue-100 text-hotel-accent"
                    }`}
                  >
                    {ticket.severity}
                  </span>
                </div>
                <p className="text-[10px] text-hotel-muted mt-1">
                  Location: {ticket.areaLocation} | Tech: {ticket.assignedTechnician}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="hotel-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Low Stock Reorder Alerts
            </h3>
            <Link href="/inventory" className="text-[11px] font-semibold text-hotel-accent hover:underline">
              Stores Inventory
            </Link>
          </div>

          <div className="space-y-2.5">
            {inventory
              .filter((i) => i.currentStock <= i.reorderLevel)
              .slice(0, 3)
              .map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-hotel-navy truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">
                      {item.currentStock} {item.unit} left
                    </span>
                  </div>
                  <p className="text-[10px] text-hotel-muted mt-1">
                    Threshold: {item.reorderLevel} {item.unit} | Location: {item.storageLocation}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* VIP In-House Guests */}
        <div className="hotel-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hotel-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-hotel-accent" />
              VIP Dignitaries In Residence
            </h3>
            <Link href="/reservations" className="text-[11px] font-semibold text-hotel-accent hover:underline">
              Folios
            </Link>
          </div>

          <div className="space-y-2.5">
            {reservations
              .filter((r) => r.vipStatus && r.status === "Checked In")
              .map((vip) => (
                <div key={vip.id} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-hotel-navy truncate">
                      {vip.guestName}
                    </span>
                    <span className="text-[10px] font-bold text-hotel-accent">
                      Suite {vip.roomNumber}
                    </span>
                  </div>
                  <p className="text-[10px] text-hotel-muted mt-1">
                    Stay: {vip.checkInDate} to {vip.checkOutDate} | Folio: ₹{vip.totalAmount.toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
