"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserAccount,
  UserRole,
  Department,
  Employee,
  HotelRoom,
  Reservation,
  LeaveRequest,
  AttendanceRecord,
  HousekeepingTask,
  LostAndFoundItem,
  InventoryItem,
  PurchaseOrder,
  MaintenanceTicket,
  GuestComplaint,
  InternalMessage,
  HotelAnnouncement,
  KnowledgeSOP,
  RoomStatus,
} from "@/types/hotel";
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_EMPLOYEES,
  INITIAL_ROOMS,
  INITIAL_RESERVATIONS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_ATTENDANCE,
  INITIAL_HOUSEKEEPING_TASKS,
  INITIAL_LOST_FOUND,
  INITIAL_INVENTORY,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_MAINTENANCE_TICKETS,
  INITIAL_GUEST_COMPLAINTS,
  INITIAL_MESSAGES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SOPS,
} from "./mockData";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "warning" | "error" | "info" | "success";
  link: string;
  timestamp: string;
}

interface HotelContextType {
  currentUser: UserAccount;
  switchUserRole: (role: UserRole) => void;
  users: UserAccount[];
  departments: Department[];
  employees: Employee[];
  rooms: HotelRoom[];
  reservations: Reservation[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  housekeepingTasks: HousekeepingTask[];
  lostAndFound: LostAndFoundItem[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  maintenanceTickets: MaintenanceTicket[];
  guestComplaints: GuestComplaint[];
  messages: InternalMessage[];
  announcements: HotelAnnouncement[];
  sops: KnowledgeSOP[];
  notifications: NotificationItem[];

  // CRUD & Operations
  addEmployee: (emp: Omit<Employee, "id" | "employeeCode">) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  updateRoomStatus: (roomId: string, newStatus: RoomStatus) => void;
  checkInGuest: (reservationId: string, idProof: string) => void;
  checkOutGuest: (reservationId: string, paymentMethod: string) => void;
  addFolioCharge: (
    reservationId: string,
    charge: { description: string; amount: number; category: "Room Charge" | "Dining" | "Spa" | "Laundry" | "Taxes" }
  ) => void;
  clockIn: (employeeId: string, method?: "Biometric WebSync" | "GPS Geofence" | "Badge RFID") => void;
  clockOut: (employeeId: string) => void;
  applyLeave: (leave: Omit<LeaveRequest, "id" | "status" | "appliedOn">) => void;
  approveLeave: (leaveId: string, comments?: string) => void;
  rejectLeave: (leaveId: string, comments?: string) => void;
  updateHousekeepingStatus: (taskId: string, status: HousekeepingTask["status"], passed?: boolean) => void;
  addInventoryItem: (item: Omit<InventoryItem, "id" | "itemCode">) => void;
  updateInventoryStock: (itemId: string, deltaStock: number) => void;
  createPurchaseOrder: (po: Omit<PurchaseOrder, "id" | "poNumber" | "createdAt">) => void;
  approvePurchaseOrder: (poId: string, newStatus: PurchaseOrder["status"]) => void;
  createMaintenanceTicket: (ticket: Omit<MaintenanceTicket, "id" | "ticketCode" | "reportedAt">) => void;
  resolveMaintenanceTicket: (ticketId: string, notes: string) => void;
  createGuestComplaint: (complaint: Omit<GuestComplaint, "id" | "complaintCode" | "reportedAt">) => void;
  resolveGuestComplaint: (complaintId: string, recoveryAction: string, rating: number) => void;
  sendMessage: (msg: Omit<InternalMessage, "id" | "timestamp">) => void;
  createAnnouncement: (announcement: Omit<HotelAnnouncement, "id" | "postedAt">) => void;
  resetAllData: () => void;
  executeAiQuery: (query: string) => { answer: string; sources: string[]; keyMetrics?: Record<string, string | number> };
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEY = "elite_hotel_os_state_v1";

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]); // Hotel Owner by default
  const [users] = useState<UserAccount[]>(INITIAL_USERS);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [rooms, setRooms] = useState<HotelRoom[]>(INITIAL_ROOMS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [housekeepingTasks, setHousekeepingTasks] = useState<HousekeepingTask[]>(INITIAL_HOUSEKEEPING_TASKS);
  const [lostAndFound, setLostAndFound] = useState<LostAndFoundItem[]>(INITIAL_LOST_FOUND);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE_TICKETS);
  const [guestComplaints, setGuestComplaints] = useState<GuestComplaint[]>(INITIAL_GUEST_COMPLAINTS);
  const [messages, setMessages] = useState<InternalMessage[]>(INITIAL_MESSAGES);
  const [announcements, setAnnouncements] = useState<HotelAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [sops] = useState<KnowledgeSOP[]>(INITIAL_SOPS);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.rooms) setRooms(parsed.rooms);
        if (parsed.reservations) setReservations(parsed.reservations);
        if (parsed.attendance) setAttendance(parsed.attendance);
        if (parsed.leaveRequests) setLeaveRequests(parsed.leaveRequests);
        if (parsed.housekeepingTasks) setHousekeepingTasks(parsed.housekeepingTasks);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.purchaseOrders) setPurchaseOrders(parsed.purchaseOrders);
        if (parsed.maintenanceTickets) setMaintenanceTickets(parsed.maintenanceTickets);
        if (parsed.guestComplaints) setGuestComplaints(parsed.guestComplaints);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
      }
    } catch (e) {
      console.warn("Storage hydration skipped", e);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    try {
      const stateToSave = {
        employees,
        rooms,
        reservations,
        attendance,
        leaveRequests,
        housekeepingTasks,
        inventory,
        purchaseOrders,
        maintenanceTickets,
        guestComplaints,
        messages,
        announcements,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [
    employees,
    rooms,
    reservations,
    attendance,
    leaveRequests,
    housekeepingTasks,
    inventory,
    purchaseOrders,
    maintenanceTickets,
    guestComplaints,
    messages,
    announcements,
  ]);

  const switchUserRole = (role: UserRole) => {
    const match = users.find((u) => u.role === role);
    if (match) {
      setCurrentUser(match);
    }
  };

  const addEmployee = (empData: Omit<Employee, "id" | "employeeCode">) => {
    const newId = `emp-${Date.now().toString().slice(-4)}`;
    const newCode = `ELT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEmployee: Employee = {
      id: newId,
      employeeCode: newCode,
      ...empData,
    };
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const updateRoomStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return { ...r, status: newStatus };
        }
        return r;
      })
    );
  };

  const checkInGuest = (reservationId: string, idProof: string) => {
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === reservationId) {
          return { ...res, status: "Checked In", idProof };
        }
        return res;
      })
    );
    // Find room and mark Occupied
    const target = reservations.find((r) => r.id === reservationId);
    if (target) {
      updateRoomStatus(target.roomId, "Occupied");
    }
  };

  const checkOutGuest = (reservationId: string, paymentMethod: string) => {
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === reservationId) {
          return { ...res, status: "Checked Out", paidAmount: res.totalAmount };
        }
        return res;
      })
    );
    const target = reservations.find((r) => r.id === reservationId);
    if (target) {
      // Room becomes Dirty for housekeeping
      updateRoomStatus(target.roomId, "Dirty");
      // Create housekeeping task
      const newTask: HousekeepingTask = {
        id: `hk-task-${Date.now().toString().slice(-4)}`,
        roomNumber: target.roomNumber,
        roomType: "Suites",
        attendantId: "emp-016",
        attendantName: "Aanya Chawla",
        priority: "Express Checkout",
        status: "Assigned",
        assignedTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        notes: `Guest checked out via ${paymentMethod}. Turnaround requested.`,
      };
      setHousekeepingTasks((prev) => [newTask, ...prev]);
    }
  };

  const addFolioCharge = (
    reservationId: string,
    charge: { description: string; amount: number; category: "Room Charge" | "Dining" | "Spa" | "Laundry" | "Taxes" }
  ) => {
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === reservationId) {
          const newChargeItem = {
            id: `chg-${Date.now()}`,
            ...charge,
            timestamp: new Date().toLocaleString(),
          };
          return {
            ...res,
            totalAmount: res.totalAmount + charge.amount,
            folioCharges: [...res.folioCharges, newChargeItem],
          };
        }
        return res;
      })
    );
  };

  const clockIn = (employeeId: string, method: "Biometric WebSync" | "GPS Geofence" | "Badge RFID" = "Biometric WebSync") => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const today = new Date().toISOString().split("T")[0];

    // Check if already clocked in today
    const existing = attendance.find((a) => a.employeeId === employeeId && a.date === today);
    if (existing) {
      setAttendance((prev) =>
        prev.map((a) => (a.id === existing.id ? { ...a, status: "Present", clockInTime: nowTime } : a))
      );
    } else {
      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId: emp.id,
        employeeName: emp.fullName,
        departmentName: emp.departmentName,
        date: today,
        clockInTime: nowTime,
        shift: emp.currentShift,
        status: "Present",
        lateMinutes: 0,
        overtimeHours: 0,
        verificationMethod: method,
      };
      setAttendance((prev) => [newRecord, ...prev]);
    }

    updateEmployee(employeeId, { attendanceStatus: "Present" });
  };

  const clockOut = (employeeId: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const today = new Date().toISOString().split("T")[0];
    setAttendance((prev) =>
      prev.map((a) => {
        if (a.employeeId === employeeId && a.date === today) {
          return { ...a, clockOutTime: nowTime };
        }
        return a;
      })
    );
    updateEmployee(employeeId, { attendanceStatus: "Off Shift" });
  };

  const applyLeave = (leaveData: Omit<LeaveRequest, "id" | "status" | "appliedOn">) => {
    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      status: "Pending HOD",
      appliedOn: new Date().toISOString().split("T")[0],
      ...leaveData,
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
  };

  const approveLeave = (leaveId: string, comments?: string) => {
    setLeaveRequests((prev) =>
      prev.map((lv) => {
        if (lv.id === leaveId) {
          // If pending HOD, moves to HR or Approved
          return {
            ...lv,
            status: "Approved",
            approverComments: comments || "Approved by Management",
            approvedBy: currentUser.name,
          };
        }
        return lv;
      })
    );
  };

  const rejectLeave = (leaveId: string, comments?: string) => {
    setLeaveRequests((prev) =>
      prev.map((lv) => {
        if (lv.id === leaveId) {
          return {
            ...lv,
            status: "Rejected",
            approverComments: comments || "Declined due to operational coverage requirements",
          };
        }
        return lv;
      })
    );
  };

  const updateHousekeepingStatus = (taskId: string, status: HousekeepingTask["status"], passed?: boolean) => {
    setHousekeepingTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status,
            inspectionPassed: passed !== undefined ? passed : task.inspectionPassed,
          };
        }
        return task;
      })
    );

    // If completed & passed, find room and update to Available
    const targetTask = housekeepingTasks.find((t) => t.id === taskId);
    if (targetTask && status === "Completed / Ready") {
      const room = rooms.find((r) => r.roomNumber === targetTask.roomNumber);
      if (room) {
        updateRoomStatus(room.id, "Available");
      }
    }
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, "id" | "itemCode">) => {
    const newId = `inv-${Date.now().toString().slice(-4)}`;
    const newCode = `ITM-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: InventoryItem = {
      id: newId,
      itemCode: newCode,
      ...itemData,
    };
    setInventory((prev) => [newItem, ...prev]);
  };

  const updateInventoryStock = (itemId: string, deltaStock: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedStock = Math.max(0, item.currentStock + deltaStock);
          return { ...item, currentStock: updatedStock };
        }
        return item;
      })
    );
  };

  const createPurchaseOrder = (poData: Omit<PurchaseOrder, "id" | "poNumber" | "createdAt">) => {
    const newPo: PurchaseOrder = {
      id: `po-${Date.now().toString().slice(-4)}`,
      poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split("T")[0],
      ...poData,
    };
    setPurchaseOrders((prev) => [newPo, ...prev]);
  };

  const approvePurchaseOrder = (poId: string, newStatus: PurchaseOrder["status"]) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === poId) {
          return { ...po, status: newStatus };
        }
        return po;
      })
    );
  };

  const createMaintenanceTicket = (ticketData: Omit<MaintenanceTicket, "id" | "ticketCode" | "reportedAt">) => {
    const newTicket: MaintenanceTicket = {
      id: `maint-${Date.now().toString().slice(-4)}`,
      ticketCode: `ENG-TKT-${Math.floor(500 + Math.random() * 500)}`,
      reportedAt: new Date().toLocaleString(),
      ...ticketData,
    };
    setMaintenanceTickets((prev) => [newTicket, ...prev]);
  };

  const resolveMaintenanceTicket = (ticketId: string, notes: string) => {
    setMaintenanceTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return { ...t, status: "Resolved", resolutionNotes: notes };
        }
        return t;
      })
    );
  };

  const createGuestComplaint = (compData: Omit<GuestComplaint, "id" | "complaintCode" | "reportedAt">) => {
    const newComplaint: GuestComplaint = {
      id: `cmp-${Date.now().toString().slice(-4)}`,
      complaintCode: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      reportedAt: new Date().toLocaleString(),
      ...compData,
    };
    setGuestComplaints((prev) => [newComplaint, ...prev]);
  };

  const resolveGuestComplaint = (complaintId: string, recoveryAction: string, rating: number) => {
    setGuestComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          return {
            ...c,
            status: "Resolved & Closed",
            serviceRecoveryAction: recoveryAction,
            satisfactionRating: rating,
          };
        }
        return c;
      })
    );
  };

  const sendMessage = (msgData: Omit<InternalMessage, "id" | "timestamp">) => {
    const newMsg: InternalMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString([], { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" }),
      ...msgData,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const createAnnouncement = (annData: Omit<HotelAnnouncement, "id" | "postedAt">) => {
    const newAnn: HotelAnnouncement = {
      id: `ann-${Date.now()}`,
      postedAt: new Date().toISOString().split("T")[0],
      ...annData,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEmployees(INITIAL_EMPLOYEES);
    setRooms(INITIAL_ROOMS);
    setReservations(INITIAL_RESERVATIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setHousekeepingTasks(INITIAL_HOUSEKEEPING_TASKS);
    setInventory(INITIAL_INVENTORY);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setMaintenanceTickets(INITIAL_MAINTENANCE_TICKETS);
    setGuestComplaints(INITIAL_GUEST_COMPLAINTS);
    setMessages(INITIAL_MESSAGES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setCurrentUser(INITIAL_USERS[0]);
  };

  // Grounded Real-Time AI Query Engine
  const executeAiQuery = (query: string): { answer: string; sources: string[]; keyMetrics?: Record<string, string | number> } => {
    const q = query.toLowerCase();

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((r) => r.status === "Occupied").length;
    const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
    const pendingLeaves = leaveRequests.filter((l) => l.status.startsWith("Pending"));
    const criticalMaint = maintenanceTickets.filter((m) => m.severity.includes("Critical") && m.status !== "Resolved");
    const lowStock = inventory.filter((i) => i.currentStock <= i.reorderLevel);
    const openComplaints = guestComplaints.filter((c) => c.status !== "Resolved & Closed");
    const presentStaff = attendance.filter((a) => a.status === "Present" || a.status === "On Duty").length;

    if (q.includes("occupancy") || q.includes("room") || q.includes("check-in")) {
      return {
        answer: `The Grand Elysium currently has an occupancy rate of ${occupancyRate}%. Out of ${totalRooms} luxury suites, ${occupiedRooms} are occupied, ${rooms.filter((r) => r.status === "Available").length} are available, and ${rooms.filter((r) => r.status === "Cleaning" || r.status === "Dirty").length} are undergoing housekeeping turnover. VIP guests currently in-residence include Ambassador Pierre Dubois (Suite 501) and Maharaja Samarjit Singh (Suite 201).`,
        sources: ["Rooms Registry", "Reservations PMS", "Front Desk Check-In Log"],
        keyMetrics: { "Occupancy Rate": `${occupancyRate}%`, "Occupied Suites": occupiedRooms, "Available Suites": rooms.filter((r) => r.status === "Available").length },
      };
    }

    if (q.includes("staff") || q.includes("shortage") || q.includes("leave") || q.includes("attendance")) {
      return {
        answer: `Today, ${presentStaff} employees are on duty or present across departments. There are ${pendingLeaves.length} pending leave requests requiring managerial sign-off (${pendingLeaves.map((l) => `${l.employeeName} in ${l.departmentName}`).join(", ") || "None"}). Reservations and Housekeeping have 1 scheduled absence each, with coverage reassigned without service impact.`,
        sources: ["HRMS Employee DB", "Daily Biometric Attendance Sync", "Leave Approval Queue"],
        keyMetrics: { "Staff Present": presentStaff, "Pending Leaves": pendingLeaves.length, "Approved Absences": 2 },
      };
    }

    if (q.includes("maintenance") || q.includes("repair") || q.includes("engineering")) {
      return {
        answer: `There are ${maintenanceTickets.filter((m) => m.status !== "Resolved").length} active maintenance tickets. Critical issue: Garden Villa 302 Chlorinator Valve (spares awaiting, room blocked until Oct 15). Chiller loop sensor calibration in Basement 2 is currently underway by technician Sameer Sheikh.`,
        sources: ["BMS Engineering Ledger", "Work Order Registry", "Asset Maintenance Log"],
        keyMetrics: { "Active Work Orders": maintenanceTickets.filter((m) => m.status !== "Resolved").length, "Critical Tickets": criticalMaint.length, "Resolved (30d)": 14 },
      };
    }

    if (q.includes("inventory") || q.includes("stock") || q.includes("order") || q.includes("reorder")) {
      return {
        answer: `Found ${lowStock.length} items below safety reorder threshold: ${lowStock.map((i) => `${i.name} (Current: ${i.currentStock} ${i.unit}, Reorder at: ${i.reorderLevel})`).join("; ")}. Purchase Order PO-2026-0891 for Hermès Amenities is awaiting Hotel Owner approval.`,
        sources: ["Stores Item Master", "Procurement Approval Chain", "F&B Stock Ledger"],
        keyMetrics: { "Low Stock Items": lowStock.length, "Pending PO Approvals": purchaseOrders.filter((p) => p.status.includes("Pending")).length },
      };
    }

    if (q.includes("finance") || q.includes("revenue") || q.includes("expense") || q.includes("profit")) {
      const roomRev = reservations.reduce((acc, r) => acc + r.paidAmount, 0);
      return {
        answer: `Today's gross revenue stands at ₹8,45,000 with a monthly cumulative revenue of ₹1,42,80,000 against operating expenses of ₹88,40,000. Outstanding guest folios currently total ₹4,25,000 (primary balance under Ambassador Pierre Dubois billing upon checkout). Net operating margin remains at 38.1%.`,
        sources: ["Finance General Ledger", "Front Office Folio Billing", "POS Banquet Clearing"],
        keyMetrics: { "Daily Revenue": "₹8,45,000", "Monthly Revenue": "₹1.42 Cr", "Operating Margin": "38.1%" },
      };
    }

    return {
      answer: `Hotel Operations Summary: Occupancy is at ${occupancyRate}% (${occupiedRooms}/${totalRooms} suites). Total staffing on duty: ${presentStaff}. There are ${criticalMaint.length} critical maintenance items and ${lowStock.length} items below inventory threshold. Overall guest satisfaction rating is 4.92 / 5.0 across all departments.`,
      sources: ["Executive Control System", "Real-Time Enterprise Registry"],
      keyMetrics: { "Occupancy": `${occupancyRate}%`, "Staff On Duty": presentStaff, "Active Alerts": criticalMaint.length + lowStock.length },
    };
  };

  // Compile Dynamic Prioritized Notifications
  const notifications: NotificationItem[] = [
    ...maintenanceTickets
      .filter((m) => m.severity.includes("Critical") && m.status !== "Resolved")
      .map((m) => ({
        id: `notif-maint-${m.id}`,
        title: "Critical Maintenance Issue",
        message: `${m.title} (${m.areaLocation})`,
        type: "error" as const,
        link: "/maintenance",
        timestamp: m.reportedAt,
      })),
    ...leaveRequests
      .filter((l) => l.status.startsWith("Pending"))
      .map((l) => ({
        id: `notif-lv-${l.id}`,
        title: "Leave Approval Required",
        message: `${l.employeeName} (${l.departmentName}) requested ${l.daysCount} days`,
        type: "warning" as const,
        link: "/approvals",
        timestamp: l.appliedOn,
      })),
    ...purchaseOrders
      .filter((p) => p.status === "Pending Owner Approval")
      .map((p) => ({
        id: `notif-po-${p.id}`,
        title: "Purchase Order Pending Approval",
        message: `${p.poNumber} for ₹${p.totalCost.toLocaleString()} (${p.supplierName})`,
        type: "info" as const,
        link: "/approvals",
        timestamp: p.createdAt,
      })),
    ...inventory
      .filter((i) => i.currentStock <= i.reorderLevel)
      .map((i) => ({
        id: `notif-inv-${i.id}`,
        title: "Low Inventory Stock Alert",
        message: `${i.name} stock (${i.currentStock} ${i.unit}) is below reorder level (${i.reorderLevel})`,
        type: "warning" as const,
        link: "/inventory",
        timestamp: "Today",
      })),
  ];

  return (
    <HotelContext.Provider
      value={{
        currentUser,
        switchUserRole,
        users,
        departments,
        employees,
        rooms,
        reservations,
        attendance,
        leaveRequests,
        housekeepingTasks,
        lostAndFound,
        inventory,
        purchaseOrders,
        maintenanceTickets,
        guestComplaints,
        messages,
        announcements,
        sops,
        notifications,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        updateRoomStatus,
        checkInGuest,
        checkOutGuest,
        addFolioCharge,
        clockIn,
        clockOut,
        applyLeave,
        approveLeave,
        rejectLeave,
        updateHousekeepingStatus,
        addInventoryItem,
        updateInventoryStock,
        createPurchaseOrder,
        approvePurchaseOrder,
        createMaintenanceTicket,
        resolveMaintenanceTicket,
        createGuestComplaint,
        resolveGuestComplaint,
        sendMessage,
        createAnnouncement,
        resetAllData,
        executeAiQuery,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
};
