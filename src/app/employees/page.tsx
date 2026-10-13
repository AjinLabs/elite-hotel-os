"use client";

import React, { useState } from "react";
import { useHotel } from "@/lib/store";
import { Employee, EmploymentType, EmploymentStatus } from "@/types/hotel";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  IndianRupee,
  Briefcase,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  ExternalLink,
} from "lucide-react";

export default function EmployeesPage() {
  const {
    employees,
    departments,
    currentUser,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"official" | "salary" | "leave" | "onboarding">("official");

  // Form State for Adding Employee
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    departmentId: "dept-fo",
    designation: "",
    grade: "L3 - Staff",
    employmentType: "Full-time Permanent" as EmploymentType,
    employmentStatus: "Active" as EmploymentStatus,
    reportingManager: "Rajesh Varma (GM)",
    joiningDate: new Date().toISOString().split("T")[0],
    currentShift: "Morning" as const,
    workLocation: "Main Hotel Premises",
    basicSalary: 45000,
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  // Filtered list
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "all" || emp.departmentId === selectedDept;
    const matchesStatus = selectedStatus === "all" || emp.employmentStatus === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const canViewSalary =
    currentUser.role === "Hotel Owner" ||
    currentUser.role === "General Manager" ||
    currentUser.role === "HR Manager" ||
    currentUser.role === "Finance Manager" ||
    currentUser.role === "Platform Super Admin";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-hotel-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-hotel-navy">
              Employee Directory & HRMS
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-hotel-accent">
              {employees.length} Staff On Payroll
            </span>
          </div>
          <p className="text-xs text-hotel-muted mt-1">
            Complete employee profiles, shifts, salary structures, leave quotas, and onboarding records.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hotel-accent text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Add New Employee
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="hotel-card p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-muted" />
          <input
            type="text"
            placeholder="Search by name, ID code, designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent"
          />
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent text-hotel-navy font-medium"
          >
            <option value="all">All Departments (22 Divisions)</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-hotel-border rounded-xl focus:outline-none focus:border-hotel-accent text-hotel-navy font-medium"
          >
            <option value="all">All Employment Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Suspended">Suspended</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="hotel-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-hotel-border text-hotel-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department & Title</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Shift & Attendance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hotel-border">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-hotel-ice/40 transition-colors cursor-pointer group"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.photo}
                        alt={emp.fullName}
                        className="w-10 h-10 rounded-full object-cover border border-hotel-border"
                      />
                      <div>
                        <div className="font-extrabold text-hotel-navy group-hover:text-hotel-accent transition-colors">
                          {emp.fullName}
                        </div>
                        <div className="text-[10px] font-mono text-hotel-muted">
                          {emp.employeeCode} • {emp.grade}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold text-hotel-navy">
                      {emp.designation}
                    </div>
                    <div className="text-[11px] text-hotel-muted">
                      {emp.departmentName}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-hotel-navy font-medium">
                      {emp.phone}
                    </div>
                    <div className="text-[11px] text-hotel-muted">
                      {emp.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-semibold text-hotel-navy">
                      <Clock className="w-3.5 h-3.5 text-hotel-accent" />
                      {emp.currentShift} Shift
                    </div>
                    <span
                      className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        emp.attendanceStatus === "Present" || emp.attendanceStatus === "On Duty"
                          ? "bg-green-100 text-hotel-success"
                          : emp.attendanceStatus === "On Leave"
                          ? "bg-amber-100 text-hotel-warning"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {emp.attendanceStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        emp.employmentStatus === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {emp.employmentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(emp);
                      }}
                      className="px-3 py-1 rounded-lg bg-hotel-ice hover:bg-blue-100 text-hotel-accent font-bold text-xs transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Individual Employee Profile Drawer / Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-dropdown border border-hotel-border overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-hotel-ice to-white border-b border-hotel-border">
              <div className="flex items-center gap-4">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.fullName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-hotel-accent shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-hotel-navy">
                      {selectedEmployee.fullName}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-hotel-accent rounded-full font-bold">
                      {selectedEmployee.employeeCode}
                    </span>
                  </div>
                  <p className="text-xs text-hotel-muted mt-0.5">
                    {selectedEmployee.designation} • {selectedEmployee.departmentName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-hotel-muted hover:text-hotel-navy font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex border-b border-hotel-border px-6 bg-[#FAFCFE]">
              {(["official", "salary", "leave", "onboarding"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-xs font-bold capitalize border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-hotel-accent text-hotel-accent bg-white"
                      : "border-transparent text-hotel-muted hover:text-hotel-navy"
                  }`}
                >
                  {tab === "official"
                    ? "Official & Contact"
                    : tab === "salary"
                    ? "Salary Structure"
                    : tab === "leave"
                    ? "Leave Quotas"
                    : "Onboarding Checklist"}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {activeTab === "official" && (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Reporting Manager</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.reportingManager}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Joining Date</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.joiningDate}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Official Email</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.email}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Phone Contact</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.phone}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Work Location</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.workLocation}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-hotel-muted text-[10px] font-bold uppercase block">Current Shift</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">{selectedEmployee.currentShift} Shift</span>
                  </div>
                  <div className="col-span-2 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                    <span className="text-hotel-accent text-[10px] font-bold uppercase block">Emergency Contact</span>
                    <span className="font-extrabold text-hotel-navy block mt-0.5">
                      {selectedEmployee.emergencyContact.name} ({selectedEmployee.emergencyContact.relation}) • {selectedEmployee.emergencyContact.phone}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "salary" && (
                <div>
                  {canViewSalary ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-hotel-muted uppercase">Net Monthly Take-Home</span>
                          <span className="text-2xl font-black text-hotel-navy block mt-0.5">
                            ₹{selectedEmployee.salary.netPay.toLocaleString()}
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-hotel-accent text-white rounded-lg text-xs font-bold">
                          Grade {selectedEmployee.grade}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                          <span className="text-hotel-muted">Basic Salary:</span>
                          <span className="font-bold text-hotel-navy">₹{selectedEmployee.salary.basic.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                          <span className="text-hotel-muted">HRA (House Rent):</span>
                          <span className="font-bold text-hotel-navy">₹{selectedEmployee.salary.hra.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                          <span className="text-hotel-muted">Special Allowances:</span>
                          <span className="font-bold text-hotel-navy">₹{selectedEmployee.salary.allowances.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                          <span className="text-hotel-muted">PF Deduction (12%):</span>
                          <span className="font-bold text-red-600">-₹{selectedEmployee.salary.pfDeduction.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                          <span className="text-hotel-muted">Tax TDS Withholding:</span>
                          <span className="font-bold text-red-600">-₹{selectedEmployee.salary.taxDeduction.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-hotel-muted space-y-2">
                      <ShieldCheck className="w-8 h-8 text-hotel-accent mx-auto" />
                      <p className="text-xs font-bold text-hotel-navy">Restricted Access</p>
                      <p className="text-[11px]">
                        Salary structures require HR Manager, Finance Manager, GM, or Owner role.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "leave" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                    <span className="text-2xl font-black text-hotel-accent block">{selectedEmployee.leaveBalance.annual}</span>
                    <span className="text-[11px] font-bold text-hotel-navy block mt-1">Annual Leave</span>
                  </div>
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="text-2xl font-black text-hotel-success block">{selectedEmployee.leaveBalance.casual}</span>
                    <span className="text-[11px] font-bold text-hotel-navy block mt-1">Casual Leave</span>
                  </div>
                  <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
                    <span className="text-2xl font-black text-purple-600 block">{selectedEmployee.leaveBalance.sick}</span>
                    <span className="text-[11px] font-bold text-hotel-navy block mt-1">Sick Leave</span>
                  </div>
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
                    <span className="text-2xl font-black text-hotel-warning block">{selectedEmployee.leaveBalance.compensatory}</span>
                    <span className="text-[11px] font-bold text-hotel-navy block mt-1">Comp Off</span>
                  </div>
                </div>
              )}

              {activeTab === "onboarding" && (
                <div className="space-y-3">
                  <p className="text-xs text-hotel-muted">
                    Mandatory Five-Star Luxury Compliance Onboarding Checklist:
                  </p>
                  {[
                    { key: "idDocumentVerified", label: "Government ID & Background Verification" },
                    { key: "contractSigned", label: "Employment Agreement & NDA Signed" },
                    { key: "uniformIssued", label: "Bespoke Hotel Grooming Uniform & Nametag Issued" },
                    { key: "safetyTrainingDone", label: "HACCP & Fire Life Safety Certified" },
                    { key: "accessCardGranted", label: "RFID Smart Keycard & System Permissions Provisioned" },
                  ].map((chk) => {
                    const isChecked = selectedEmployee.onboardingChecklist?.[chk.key as keyof typeof selectedEmployee.onboardingChecklist];
                    return (
                      <div
                        key={chk.key}
                        onClick={() => {
                          const updatedChecklist = {
                            ...selectedEmployee.onboardingChecklist,
                            [chk.key]: !isChecked,
                          };
                          updateEmployee(selectedEmployee.id, {
                            onboardingChecklist: updatedChecklist as any,
                          });
                          setSelectedEmployee({
                            ...selectedEmployee,
                            onboardingChecklist: updatedChecklist as any,
                          });
                        }}
                        className="flex items-center justify-between p-3 rounded-xl border border-hotel-border hover:bg-hotel-ice/40 cursor-pointer transition-all"
                      >
                        <span className="text-xs font-semibold text-hotel-navy">{chk.label}</span>
                        {isChecked ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-hotel-success">
                            <CheckCircle2 className="w-4 h-4 text-hotel-success" /> Completed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-hotel-muted">
                            <XCircle className="w-4 h-4 text-hotel-muted" /> Pending
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 bg-[#F8FAFC] border-t border-hotel-border flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Remove ${selectedEmployee.fullName} from active roster?`)) {
                    deleteEmployee(selectedEmployee.id);
                    setSelectedEmployee(null);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-hotel-error hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Deactivate / Delete Record
              </button>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-hotel-navy text-white hover:bg-black transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hotel-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-dropdown border border-hotel-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hotel-border">
              <h3 className="text-base font-extrabold text-hotel-navy">
                Onboard New Hotel Employee
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-hotel-muted hover:text-hotel-navy font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="font-bold text-hotel-navy block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram.r@grandelysium.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98200 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Department</label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent font-medium text-hotel-navy"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Job Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sommelier / Front Desk Lead"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Initial Shift</label>
                <select
                  value={formData.currentShift}
                  onChange={(e) => setFormData({ ...formData, currentShift: e.target.value as any })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent font-medium text-hotel-navy"
                >
                  <option value="Morning">Morning Shift (07:00 - 15:30)</option>
                  <option value="General">General Shift (09:00 - 17:30)</option>
                  <option value="Evening">Evening Shift (15:00 - 23:30)</option>
                  <option value="Night">Night Shift (23:00 - 07:30)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Monthly Basic Salary (₹) *</label>
                <input
                  type="number"
                  value={formData.basicSalary}
                  onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>

              <div>
                <label className="font-bold text-hotel-navy block mb-1">Emergency Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91 98200 99881"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-hotel-border rounded-xl focus:border-hotel-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-hotel-border">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-hotel-navy hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!formData.fullName || !formData.designation || !formData.email) {
                    alert("Please fill in required fields: Name, Email, and Designation.");
                    return;
                  }
                  const dept = departments.find((d) => d.id === formData.departmentId);
                  const basic = Number(formData.basicSalary) || 40000;
                  const hra = basic * 0.4;
                  const allowances = basic * 0.25;
                  const pf = basic * 0.12;
                  const tax = basic * 0.05;
                  const net = basic + hra + allowances - pf - tax;

                  addEmployee({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone || "+91 98200 00000",
                    photo: formData.photo,
                    departmentId: formData.departmentId,
                    departmentName: dept?.name || "General Hospitality",
                    designation: formData.designation,
                    grade: formData.grade,
                    employmentType: formData.employmentType,
                    employmentStatus: formData.employmentStatus,
                    reportingManager: formData.reportingManager,
                    joiningDate: formData.joiningDate,
                    currentShift: formData.currentShift,
                    attendanceStatus: "Present",
                    workLocation: formData.workLocation,
                    emergencyContact: {
                      name: formData.fullName + " Family",
                      relation: "Primary Contact",
                      phone: formData.emergencyPhone || "+91 98200 99999",
                    },
                    salary: {
                      basic,
                      hra,
                      allowances,
                      pfDeduction: pf,
                      taxDeduction: tax,
                      netPay: net,
                    },
                    leaveBalance: { annual: 15, casual: 6, sick: 8, compensatory: 2 },
                    onboardingChecklist: {
                      idDocumentVerified: true,
                      contractSigned: true,
                      uniformIssued: false,
                      safetyTrainingDone: false,
                      accessCardGranted: false,
                    },
                  });

                  setShowAddModal(false);
                  alert(`Employee ${formData.fullName} successfully onboarded into HRMS!`);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-hotel-accent text-white hover:bg-blue-700"
              >
                Save & Onboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
