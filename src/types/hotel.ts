export type UserRole =
  | "Platform Super Admin"
  | "Hotel Owner"
  | "General Manager"
  | "Department Head"
  | "HR Manager"
  | "Finance Manager"
  | "Front Office Manager"
  | "Housekeeping Manager"
  | "Executive Chef"
  | "Restaurant Manager"
  | "Inventory Manager"
  | "Maintenance Manager"
  | "Security Manager"
  | "Employee"
  | "Read-only Auditor";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  avatar: string;
  phone: string;
  hotelId: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  headTitle: string;
  deputyName?: string;
  description: string;
  icon: string;
  budgetMonthly: number;
  openPositions: number;
  sopsCount: number;
}

export type EmploymentType = "Full-time Permanent" | "Probationary" | "Contractual" | "Intern";
export type EmploymentStatus = "Active" | "On Leave" | "Suspended" | "Resigned" | "Terminated";
export type AttendanceStatus = "Present" | "On Duty" | "Absent" | "On Leave" | "Late" | "Half Day" | "Off Shift";

export interface Employee {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  photo: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  grade: string;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  reportingManager: string;
  joiningDate: string;
  currentShift: "Morning" | "General" | "Evening" | "Night" | "Split";
  attendanceStatus: AttendanceStatus;
  workLocation: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  salary: {
    basic: number;
    hra: number;
    allowances: number;
    pfDeduction: number;
    taxDeduction: number;
    netPay: number;
  };
  leaveBalance: {
    annual: number;
    casual: number;
    sick: number;
    compensatory: number;
  };
  onboardingChecklist?: {
    idDocumentVerified: boolean;
    contractSigned: boolean;
    uniformIssued: boolean;
    safetyTrainingDone: boolean;
    accessCardGranted: boolean;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  departmentName: string;
  date: string;
  clockInTime?: string;
  clockOutTime?: string;
  shift: string;
  status: AttendanceStatus;
  lateMinutes: number;
  overtimeHours: number;
  verificationMethod: "Biometric WebSync" | "GPS Geofence" | "Badge RFID" | "Manual Override";
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  departmentName: string;
  leaveType: "Annual Leave" | "Casual Leave" | "Sick Leave" | "Emergency Leave" | "Compensatory Off";
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: "Pending HOD" | "Pending HR" | "Pending GM" | "Approved" | "Rejected" | "Cancelled";
  appliedOn: string;
  approverComments?: string;
  approvedBy?: string;
}

export type RoomStatus =
  | "Available"
  | "Reserved"
  | "Occupied"
  | "Dirty"
  | "Cleaning"
  | "Inspected"
  | "Maintenance"
  | "Out of Service";

export interface HotelRoom {
  id: string;
  roomNumber: string;
  floor: number;
  wing: "East Wing" | "West Wing" | "Royal Garden Pavilion" | "Sky Villa";
  roomType: "Deluxe Ocean Suite" | "Presidential Suite" | "Royal Heritage Suite" | "Executive Club" | "Garden Villa" | "Penthouse";
  pricePerNight: number;
  status: RoomStatus;
  guestName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  housekeeperAssigned?: string;
  isVip?: boolean;
  features: string[];
}

export interface Reservation {
  id: string;
  bookingCode: string;
  roomId: string;
  roomNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  idProof: string;
  vipStatus: boolean;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  status: "Confirmed" | "Checked In" | "Checked Out" | "Cancelled";
  totalAmount: number;
  paidAmount: number;
  folioCharges: Array<{
    id: string;
    description: string;
    amount: number;
    category: "Room Charge" | "Dining" | "Spa" | "Laundry" | "Taxes";
    timestamp: string;
  }>;
}

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  roomType: string;
  attendantId: string;
  attendantName: string;
  priority: "High (VIP)" | "Standard" | "Express Checkout" | "Deep Clean";
  status: "Assigned" | "Cleaning In Progress" | "Pending Inspection" | "Completed / Ready";
  assignedTime: string;
  inspectionPassed?: boolean;
  notes?: string;
}

export interface LostAndFoundItem {
  id: string;
  itemDescription: string;
  foundLocation: string;
  foundDate: string;
  foundBy: string;
  claimedByGuest?: string;
  status: "Stored in Vault" | "Claimed" | "Disposed after 90 Days";
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: "Food Ingredients" | "Beverages" | "Housekeeping" | "Linen" | "Maintenance" | "Guest Amenities" | "Office" | "Cutlery & Glassware";
  currentStock: number;
  reorderLevel: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  storageLocation: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  requestedByDepartment: string;
  totalCost: number;
  items: Array<{
    itemName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }>;
  status: "Draft" | "Pending Manager Approval" | "Pending Owner Approval" | "Approved & Ordered" | "Goods Received";
  createdAt: string;
}

export interface MaintenanceTicket {
  id: string;
  ticketCode: string;
  title: string;
  areaLocation: string;
  roomNumber?: string;
  severity: "Critical - Guest Suite" | "High" | "Medium" | "Low";
  status: "Open" | "Technician Dispatched" | "In Progress" | "Awaiting Spares" | "Resolved";
  assignedTechnician: string;
  reportedBy: string;
  reportedAt: string;
  estimatedCost: number;
  resolutionNotes?: string;
}

export interface GuestComplaint {
  id: string;
  complaintCode: string;
  guestName: string;
  roomNumber: string;
  category: "Noise Disruption" | "Air Conditioning / Climate" | "Food Quality / Service" | "Housekeeping Cleanliness" | "Billing Query" | "Keycard Malfunction";
  severity: "High (VIP Escalation)" | "Moderate" | "Minor";
  description: string;
  assignedDepartment: string;
  assignedStaff: string;
  reportedAt: string;
  status: "Open" | "Investigating" | "Service Recovery Offered" | "Resolved & Closed";
  serviceRecoveryAction?: string;
  satisfactionRating?: number;
}

export interface InternalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientType: "Direct" | "Department" | "Hotel Broadcast";
  recipientId?: string;
  recipientName: string;
  content: string;
  timestamp: string;
  isUrgent?: boolean;
}

export interface HotelAnnouncement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  audience: "All Hotel Staff" | "Management Only" | "Front Office & Housekeeping" | "F&B Brigade";
  postedAt: string;
  priority: "Normal" | "Urgent Alert";
}

export interface KnowledgeSOP {
  id: string;
  code: string;
  title: string;
  department: string;
  category: "Guest Service Standards" | "Safety & Emergency" | "Culinary Hygiene" | "Engineering Protocols";
  lastUpdated: string;
  summary: string;
  content: string;
}
