# Elite Hotel OS — Luxury Five-Star Hotel ERP Platform
**The Grand Elysium Luxury Hotel & Resort**

An enterprise-grade, comprehensive Hotel Management ERP platform designed for luxury hospitality operations. Connecting ownership, general management, HR, front desk, housekeeping, culinary brigades, stores inventory, engineering maintenance, security, and finance into a single digital control system.

---

## 🎨 Design System & Color Palette
Inspired by the clarity of modern enterprise SaaS products and the prestige of five-star luxury hospitality:

| Token | Hex Value | Usage |
|---|---|---|
| **Main Background** | `#F7F9FC` | Clean neutral canvas |
| **Primary Surfaces** | `#FFFFFF` | Crisp cards and elevated panels |
| **Primary Accent** | `#245BDB` | Electric blue buttons, KPI indicators, active items |
| **Dark Navy Headings**| `#17345C` | Executive typography & titles |
| **Ice Blue Surfaces** | `#EAF3FF` | Subtle highlights, badges, and soft backings |
| **Secondary Blue** | `#6B9CFF` | Charts, auxiliary accents |
| **Primary Text** | `#172033` | Legible high-contrast body text |
| **Secondary Text** | `#65738B` | Subtitles, labels, metadata |
| **Borders** | `#E1E8F2` | Subtle structural separators |
| **Success** | `#16845B` | Completed states, approvals |
| **Warning** | `#D98A16` | Inventory reorder, pending tasks |
| **Error / Critical**| `#D94343` | Urgent repairs, escalations |

---

## 👥 Multi-Level Role-Based Access Control (15 Roles)
The platform features an instant **Role Switcher** accessible from the top navigation bar to test permissions across all 15 hospitality personas:

1. **Platform Super Admin** (Alex Sterling)
2. **Hotel Owner** (Vikramaditya Singhania)
3. **General Manager** (Rajesh Varma)
4. **Department Head / HOD** (Anya Sharma)
5. **HR Manager** (Priya Nair)
6. **Finance Manager** (Siddharth Sengupta)
7. **Front Office Manager** (Arjun Kapoor)
8. **Housekeeping Manager** (Sunita Rao)
9. **Executive Chef / Kitchen Manager** (Chef Sanjeev Mehra)
10. **Restaurant / F&B Manager** (Marcus D'Souza)
11. **Inventory & Procurement Manager** (Ramesh Joshi)
12. **Maintenance Manager** (Eng. Dinesh Kumar)
13. **Security Manager** (Col. Amarjeet Gill)
14. **Employee / Staff** (Kavita Patel - Guest Service Associate)
15. **Read-only Auditor** (Meera Deshmukh - Ernst & Young)

---

## 🏨 22 Dedicated Luxury Hotel Divisions
1. Executive Management (`EXEC`)
2. Front Office and Reception (`FO`)
3. Reservations (`RES`)
4. Guest Relations (`GREL`)
5. Housekeeping (`HK`)
6. Laundry (`LND`)
7. Kitchen and Culinary (`KTC`)
8. Restaurant Operations (`REST`)
9. Food and Beverage Service (`FBS`)
10. Banquets and Events (`BNQ`)
11. Spa and Wellness (`SPA`)
12. Concierge and Transport (`CONC`)
13. Security (`SEC`)
14. Engineering and Maintenance (`ENG`)
15. Human Resources (`HR`)
16. Finance and Accounts (`FIN`)
17. Payroll (`PAY`)
18. Procurement (`PROC`)
19. Stores and Inventory (`STR`)
20. IT & Cyber Systems (`IT`)
21. Sales and Marketing (`MKT`)
22. Quality Assurance and Food Safety (`QA`)

---

## ⚡ Core Operational Modules
- **Owner's Executive Control Dashboard (`/`)**: 20 real-time KPIs, attendance trend charts (7d & 30d), department distributions, monthly financial trajectory, and prioritized alerts.
- **Hotel Command Centre (`/command-center`)**: Live IoT telemetry, building environmental status (Power, RO Water, Fire Life Safety, Wi-Fi 6), and interactive floor-by-floor suite grid.
- **Grounded AI Operations Assistant (`/ai-assistant`)**: Grounded hotel intelligence engine querying real database state with source citations and key metric summaries.
- **Employee Management / HRMS (`/employees`)**: Searchable directory, detailed profiles, salary breakdown, onboarding compliance checklists, and employee registration.
- **Department Management (`/departments`)**: Individual views for all 22 divisions, shift rosters, SOP documents, and side-by-side comparison matrix.
- **Attendance & Shifts (`/attendance`)**: Live web clock-in/out station with Biometric, GPS Geofence, and RFID modes, late tracking, and regularization requests.
- **Leave Management (`/leave`)**: Quotas, conflict detection, staffing shortage warnings, and multi-step approval workflow.
- **Staff Self-Service Portal (`/self-service`)**: Staff profile, duty timer, weekly duty roster, and printable monthly salary statement / payslip.
- **Rooms & Front Desk (`/front-office`)**: Validated room status machine (`Available` → `Reserved` → `Occupied` → `Dirty` → `Cleaning` → `Inspected` → `Available`), check-in & check-out workflows.
- **Reservations & Guest Folios (`/reservations`)**: Itemized billing breakdown (Dining, Spa, Laundry, Room charges), balance tracking, and tax invoice generator.
- **Housekeeping & Linen (`/housekeeping`)**: Attendant assignment board, cleaning progression, 18-point supervisor turndown inspection, and lost-and-found vault.
- **Kitchen & Culinary (`/kitchen`)**: Michelin recipe cost calculations, HACCP sub-zero cold chain logger, and food waste reduction register.
- **Stores & Inventory (`/inventory`)**: 8-category master, stock valuation, reorder threshold alerts, quick stock adjustments, and purchase order drafting.
- **Engineering & Maintenance (`/maintenance`)**: Work orders with severity classification, technician dispatch, resolution notes, and plant asset registry.
- **Security & Safety (`/security`)**: Protocol incident register, fire life-safety verification checklists, and emergency liaison directory.
- **Guest Relations & CSAT (`/guest-relations`)**: Service recovery gestures (complimentary champagne, GM letter), CSAT scoring, and SLA tracking.
- **Finance, Revenue & P&L (`/finance`)**: Division revenue streams, USALI standard P&L statement, and vendor expense ledger.
- **Payroll Processing (`/payroll`)**: Statutory Indian EPF 12% & TDS tax withholding calculations, monthly register, and period locking.
- **Approvals Hub (`/approvals`)**: Unified decision queue for leaves, purchase orders, and engineering work orders.
- **Reports & Analytics (`/reports`)**: Date-range filtered reports with printable layout and instant CSV data export.
- **5-Star SOP Knowledge Base (`/knowledge-base`)**: Searchable operational protocols and execution checklists.
- **Internal Messaging (`/messaging`)**: Department channels, direct employee messaging, and emergency broadcasts.

---

## 🚀 Running Locally
```bash
# Install dependencies
npm.cmd install

# Start development server on port 3005
npm.cmd run dev

# Open in browser:
http://localhost:3005
```
