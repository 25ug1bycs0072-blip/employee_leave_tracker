const STORAGE_KEY = "orbit-people-data-v1";

const initialData = {
  employees: [
    { id: "EMP-1042", name: "Olivia Rhye", email: "olivia.rhye@orbit.co", department: "Design", designation: "Product Designer", joiningDate: "2023-02-14", role: "Employee", initials: "OR", color: "avatar-pink", balances: { CL: 7, SL: 8, EL: 12, LWP: 0 } },
    { id: "EMP-1043", name: "Phoenix Baker", email: "phoenix.baker@orbit.co", department: "Engineering", designation: "Senior Engineer", joiningDate: "2022-08-03", role: "Manager", initials: "PB", color: "avatar-blue", balances: { CL: 6, SL: 9, EL: 11, LWP: 0 } },
    { id: "EMP-1044", name: "Lana Steiner", email: "lana.steiner@orbit.co", department: "Marketing", designation: "Marketing Lead", joiningDate: "2021-11-18", role: "Manager", initials: "LS", color: "avatar-yellow", balances: { CL: 5, SL: 10, EL: 11, LWP: 0 } },
    { id: "EMP-1045", name: "Demi Wilkinson", email: "demi.wilkinson@orbit.co", department: "People", designation: "People Partner", joiningDate: "2023-06-07", role: "HR", initials: "DW", color: "avatar-mint", balances: { CL: 8, SL: 9, EL: 16, LWP: 0 } },
    { id: "EMP-1046", name: "Candice Wu", email: "candice.wu@orbit.co", department: "Engineering", designation: "Software Engineer", joiningDate: "2024-01-22", role: "Employee", initials: "CW", color: "avatar-lilac", balances: { CL: 7, SL: 8, EL: 10, LWP: 0 } },
    { id: "EMP-1047", name: "Natali Craig", email: "natali.craig@orbit.co", department: "Design", designation: "UX Researcher", joiningDate: "2022-04-11", role: "Employee", initials: "NC", color: "avatar-orange", balances: { CL: 2, SL: 7, EL: 13, LWP: 0 } },
    { id: "EMP-1048", name: "Drew Cano", email: "drew.cano@orbit.co", department: "Sales", designation: "Account Executive", joiningDate: "2023-09-04", role: "Employee", initials: "DC", color: "avatar-blue", balances: { CL: 8, SL: 10, EL: 9, LWP: 0 } },
    { id: "EMP-1049", name: "Andi Lane", email: "andi.lane@orbit.co", department: "People", designation: "Recruiter", joiningDate: "2024-02-19", role: "Employee", initials: "AL", color: "avatar-pink", balances: { CL: 5, SL: 9, EL: 11, LWP: 0 } },
    { id: "EMP-1050", name: "Maxwell Porter", email: "maxwell.porter@orbit.co", department: "Engineering", designation: "QA Engineer", joiningDate: "2023-04-03", role: "Employee", initials: "MP", color: "avatar-mint", balances: { CL: 6, SL: 6, EL: 11, LWP: 0 } }
  ],
  leaves: [
    { id: "LV-2081", employeeId: "EMP-1042", type: "CL", start: "2026-10-30", end: "2026-11-02", days: 2, reason: "A long weekend to visit family.", status: "Pending", applied: "2026-10-28", reviewer: "" },
    { id: "LV-2080", employeeId: "EMP-1046", type: "SL", start: "2026-10-29", end: "2026-10-30", days: 2, reason: "Not feeling well and need time to recover.", status: "Pending", applied: "2026-10-28", reviewer: "" },
    { id: "LV-2079", employeeId: "EMP-1043", type: "EL", start: "2026-11-05", end: "2026-11-07", days: 3, reason: "Personal travel.", status: "Approved", applied: "2026-10-23", reviewer: "Alex Morgan" },
    { id: "LV-2078", employeeId: "EMP-1047", type: "CL", start: "2026-10-27", end: "2026-10-28", days: 2, reason: "Moving into a new apartment.", status: "Approved", applied: "2026-10-20", reviewer: "Alex Morgan" },
    { id: "LV-2077", employeeId: "EMP-1044", type: "EL", start: "2026-11-12", end: "2026-11-14", days: 3, reason: "Family vacation.", status: "Pending", applied: "2026-10-27", reviewer: "" },
    { id: "LV-2076", employeeId: "EMP-1048", type: "CL", start: "2026-10-22", end: "2026-10-22", days: 1, reason: "Personal appointment.", status: "Rejected", applied: "2026-10-18", reviewer: "Alex Morgan", rejectionReason: "Quarter-end coverage is limited. Could you choose a date next week?" },
    { id: "LV-2075", employeeId: "EMP-1049", type: "EL", start: "2026-11-20", end: "2026-11-25", days: 4, reason: "Taking a short trip.", status: "Approved", applied: "2026-10-16", reviewer: "Alex Morgan" },
    { id: "LV-2074", employeeId: "EMP-1050", type: "SL", start: "2026-10-14", end: "2026-10-15", days: 2, reason: "Doctor advised rest.", status: "Approved", applied: "2026-10-10", reviewer: "Alex Morgan" }
  ],
  holidays: [
    { name: "Diwali", date: "2026-11-08", region: "India" },
    { name: "Thanksgiving Day", date: "2026-11-26", region: "United States" },
    { name: "Christmas Day", date: "2026-12-25", region: "Global" },
    { name: "New Year's Day", date: "2027-01-01", region: "Global" }
  ],
  audit: [],
  nextEmployee: 1051,
  nextLeave: 2082
};

const leaveTypes = { CL: "Casual Leave", SL: "Sick Leave", EL: "Earned Leave", LWP: "Unpaid Leave" };
const colors = ["avatar-pink", "avatar-blue", "avatar-yellow", "avatar-mint", "avatar-lilac", "avatar-orange"];
let data = loadData();
let activePage = "dashboard";
let calendarDate = new Date(2026, 9, 1);
let requestFilter = "All";
let employeeFilter = "";
let globalSearch = "";

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(initialData);
    const parsed = JSON.parse(saved);
    return { ...structuredClone(initialData), ...parsed };
  } catch (error) {
    console.error("Could not load saved leave tracker data.", error);
    return structuredClone(initialData);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Could not save leave tracker data.", error);
    toast("Changes could not be saved in this browser.");
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function employee(id) { return data.employees.find((person) => person.id === id); }
function usedDays(employeeId, type) {
  return data.leaves.filter((leave) => leave.employeeId === employeeId && leave.type === type && leave.status === "Approved").reduce((sum, leave) => sum + leave.days, 0);
}
function initials(name) { return name.split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase(); }
function shortDate(value, options = { month: "short", day: "numeric" }) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", options);
}
function dateSpan(start, end) { return start === end ? shortDate(start) : `${shortDate(start)} – ${shortDate(end)}`; }
function dateDiff(start, end) {
  const first = new Date(`${start}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);
  return Math.round((last - first) / 86400000) + 1;
}
function weekdayDays(start, end) {
  let count = 0;
  const cursor = new Date(`${start}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);
  while (cursor <= last) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}
function statusBadge(status) {
  const modifier = status.toLowerCase();
  return `<span class="badge badge-${modifier}">${escapeHtml(status)}</span>`;
}
function kindClass(type) { return ({ CL: "", SL: "kind-sl", EL: "kind-el", LWP: "kind-lwp" })[type] || ""; }
function recordAudit(action, detail) {
  data.audit.unshift({ action, detail, at: new Date().toISOString(), by: "Alex Morgan" });
}
function toast(message) {
  const region = document.getElementById("toast-region");
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 3200);
}

function render() {
  const pageNames = { dashboard: "Overview", requests: "Leave requests", employees: "People", calendar: "Calendar", reports: "Reports", settings: "Settings" };
  document.getElementById("page-crumb").textContent = pageNames[activePage];
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => link.classList.toggle("active", link.dataset.page === activePage));
  document.getElementById("nav-pending").textContent = data.leaves.filter((leave) => leave.status === "Pending").length;
  const container = document.getElementById("page-container");
  const pages = { dashboard: renderDashboard, requests: renderRequests, employees: renderEmployees, calendar: renderCalendar, reports: renderReports, settings: renderSettings };
  container.innerHTML = pages[activePage]();
}

function renderHeading(title, subtitle, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">People operations</div><h1>${title}</h1><p class="subtitle">${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`;
}
function renderMetric(label, value, note, icon, tone, trend = "") {
  return `<article class="metric-card"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon ${tone}">${icon}</span></div><div class="metric-value"><strong>${value}</strong>${trend ? `<span class="metric-trend">${trend}</span>` : ""}</div><div class="metric-note">${note}</div></article>`;
}
function requestRows(leaves, compact = false) {
  if (!leaves.length) return `<tr><td colspan="6"><div class="empty-state"><strong>All caught up</strong>No leave requests match your filters.</div></td></tr>`;
  return leaves.map((leave) => {
    const person = employee(leave.employeeId);
    if (!person) return "";
    return `<tr>
      <td><div class="employee-cell"><span class="avatar ${person.color}">${person.initials}</span><span><span class="employee-name">${escapeHtml(person.name)}</span><span class="employee-email">${escapeHtml(person.department)}</span></span></div></td>
      <td><span class="leave-kind"><i class="${kindClass(leave.type)}"></i>${leaveTypes[leave.type]}</span></td>
      <td>${dateSpan(leave.start, leave.end)}</td><td>${leave.days} ${leave.days === 1 ? "day" : "days"}</td><td>${statusBadge(leave.status)}</td>
      <td>${leave.status === "Pending" ? compact ? `<button class="button button-small button-plain" data-page="requests">Review →</button>` : `<div class="actions-cell"><button class="button button-small button-plain" data-action="approve" data-id="${leave.id}" aria-label="Approve ${leave.id}">Approve</button><button class="button button-small button-danger" data-action="reject" data-id="${leave.id}" aria-label="Reject ${leave.id}">Reject</button><button class="button button-small button-plain" data-action="cancel-leave" data-id="${leave.id}" aria-label="Cancel ${leave.id}">Cancel</button></div>` : `<span class="toolbar-note">${escapeHtml(leave.reviewer || "—")}</span>`}</td>
    </tr>`;
  }).join("");
}
function renderRequestTable(leaves, compact = false) {
  return `<div class="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>LEAVE TYPE</th><th>DATES</th><th>DURATION</th><th>STATUS</th><th>${compact ? "REVIEW" : "ACTIONS"}</th></tr></thead><tbody>${requestRows(leaves, compact)}</tbody></table></div>`;
}
function departmentSummary() {
  const departments = [...new Set(data.employees.map((person) => person.department))].map((department) => {
    const people = data.employees.filter((person) => person.department === department);
    const away = data.leaves.filter((leave) => leave.status === "Approved" && leave.start <= todayISO() && leave.end >= todayISO() && people.some((person) => person.id === leave.employeeId));
    return { department, people, away: away.length };
  }).sort((a, b) => b.away - a.away || a.department.localeCompare(b.department));
  return departments.slice(0, 5).map((item) => `<div class="team-row"><div class="face-stack">${item.people.slice(0, 3).map((person) => `<span class="avatar ${person.color}">${person.initials}</span>`).join("")}</div><div class="team-details"><strong>${escapeHtml(item.department)}</strong><span>${item.people.length} team members</span></div><span class="team-count">${item.away} away</span></div>`).join("");
}
function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function renderChart() {
  const months = [];
  const today = new Date();
  for (let offset = 5; offset >= 0; offset--) {
    const month = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    months.push(month);
  }
  const max = Math.max(4, ...months.map((month) => {
    const monthLeaves = data.leaves.filter((leave) => new Date(`${leave.start}T12:00:00`).getMonth() === month.getMonth() && new Date(`${leave.start}T12:00:00`).getFullYear() === month.getFullYear());
    return monthLeaves.length;
  }));
  const width = 550, height = 180, left = 28, base = 145, chartHeight = 115, step = 80;
  const grid = [0, 1, 2, 3].map((line) => {
    const y = base - line * (chartHeight / 3);
    return `<line x1="${left}" y1="${y}" x2="${width - 7}" y2="${y}" stroke="#f0f0f5" stroke-dasharray="${line ? "3 4" : "0"}"/><text x="2" y="${y + 3}" fill="#b0b1bd" font-size="8">${Math.round(max * line / 3)}</text>`;
  }).join("");
  const bars = months.map((month, index) => {
    const monthLeaves = data.leaves.filter((leave) => {
      const start = new Date(`${leave.start}T12:00:00`);
      return start.getMonth() === month.getMonth() && start.getFullYear() === month.getFullYear();
    });
    const approved = monthLeaves.filter((leave) => leave.status === "Approved").length;
    const pending = monthLeaves.filter((leave) => leave.status === "Pending").length;
    const x = left + 22 + index * step;
    const fullHeight = Math.max(2, (approved + pending) / max * chartHeight);
    const approvedHeight = fullHeight * (approved / Math.max(1, approved + pending));
    const pendingHeight = fullHeight - approvedHeight;
    return `<rect x="${x}" y="${base - fullHeight}" width="28" height="${pendingHeight}" rx="4" fill="#d9d4fb"/><path d="M${x} ${base - approvedHeight} h28 v${approvedHeight - 4} q0 4 -4 4 h-20 q-4 0 -4 -4z" fill="#7668e4"/><text x="${x + 14}" y="166" fill="#a0a1ae" text-anchor="middle" font-size="8">${month.toLocaleDateString("en-US", { month: "short" })}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Leave requests by month">${grid}${bars}</svg>`;
}
function upcomingHolidays(limit = 3) {
  return data.holidays.filter((holiday) => holiday.date >= todayISO()).sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}
function renderDashboard() {
  const today = todayISO();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const pending = data.leaves.filter((leave) => leave.status === "Pending");
  const awayToday = data.leaves.filter((leave) => leave.status === "Approved" && leave.start <= today && leave.end >= today).length;
  const approved = data.leaves.filter((leave) => leave.status === "Approved" && leave.applied.slice(0, 7) === today.slice(0, 7)).length;
  const rejected = data.leaves.filter((leave) => leave.status === "Rejected").length;
  const monthLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const actions = `<button class="button button-secondary" data-action="new-employee">＋ Add person</button><button class="button button-primary" data-action="new-leave">＋ Apply for leave</button>`;
  const holidays = upcomingHolidays().map((holiday) => `<div class="holiday-row"><div class="date-tile"><strong>${new Date(`${holiday.date}T12:00:00`).getDate()}</strong><span>${shortDate(holiday.date, { month: "short" })}</span></div><div class="holiday-info"><strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.region)} · ${shortDate(holiday.date, { weekday: "long" })}</span></div></div>`).join("");
  return `${renderHeading(`${greeting}, Alex <span aria-hidden="true">☀</span>`, "Here’s what’s happening with your people today.", actions)}
    <section class="metric-grid">
      ${renderMetric("Total employees", data.employees.length, `<span class="metric-trend">↑ 2</span> since last month`, "♙", "")}
      ${renderMetric("On leave today", awayToday, "Across all departments", "◷", "green")}
      ${renderMetric("Pending requests", pending.length, pending.length ? "Needs your attention" : "You’re all caught up", "◷", "orange")}
      ${renderMetric("Approved this month", approved, `${rejected} request${rejected === 1 ? "" : "s"} declined`, "✓", "blue")}
    </section>
    <section class="dashboard-grid">
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Leave overview</h2><p class="panel-subtitle">Requests submitted over the last six months</p></div><div class="chart-legend"><span><i class="legend-dot"></i>Approved</span><span><i class="legend-dot pending-dot"></i>Pending</span></div></div><div class="chart-wrap">${renderChart()}</div></article>
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Team availability</h2><p class="panel-subtitle">Out of office today by department</p></div><button class="button button-plain" data-page="calendar">View calendar →</button></div><div class="team-list">${departmentSummary() || '<div class="empty-state">No teams to show yet.</div>'}</div></article>
    </section>
    <section class="lower-grid">
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Recent requests</h2><p class="panel-subtitle">The latest leave activity from your team</p></div><button class="button button-plain" data-page="requests">View all →</button></div>${renderRequestTable(data.leaves.slice().sort((a, b) => b.applied.localeCompare(a.applied)).slice(0, 4), true)}</article>
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Upcoming holidays</h2><p class="panel-subtitle">A little time to look forward to</p></div><button class="button button-plain" data-page="calendar">See calendar →</button></div><div class="holiday-list">${holidays || '<div class="empty-state">No upcoming holidays added.</div>'}</div></article>
    </section>`;
}

function renderRequests() {
  const filtered = data.leaves.slice().sort((a, b) => b.applied.localeCompare(a.applied)).filter((leave) => {
    const person = employee(leave.employeeId);
    const searchText = `${person?.name} ${person?.department} ${leave.id} ${leave.type}`.toLowerCase();
    return (requestFilter === "All" || leave.status === requestFilter) && searchText.includes(globalSearch.toLowerCase());
  });
  const action = `<button class="button button-primary" data-action="new-leave">＋ Apply for leave</button>`;
  return `${renderHeading("Leave requests", "Review time off, track decisions, and keep everyone in the loop.", action)}
    <section class="balance-grid">${Object.entries(leaveTypes).map(([code, name]) => `<article class="balance-card"><div class="balance-card-top"><i class="${kindClass(code)}"></i>${name}</div><strong>${code === "LWP" ? "Flexible" : `${data.employees.reduce((sum, person) => sum + (person.balances?.[code] || 0), 0)} days`}</strong><small>${code === "LWP" ? "Unpaid leave" : "Available across your team"}</small></article>`).join("")}</section>
    <section class="panel page-panel"><div class="list-header"><div class="filter-row">${["All", "Pending", "Approved", "Rejected"].map((status) => `<button class="button ${requestFilter === status ? "button-primary" : "button-plain"} button-small" data-action="filter-requests" data-status="${status}">${status}</button>`).join("")}</div><div class="filter-row"><input class="text-control inline-search" id="request-search" type="search" value="${escapeHtml(globalSearch)}" placeholder="Search requests..." /><select class="select-control" id="type-filter"><option value="">All leave types</option>${Object.entries(leaveTypes).map(([key, value]) => `<option value="${key}">${value}</option>`).join("")}</select></div></div>
    ${renderRequestTable(filtered)}<div class="pagination"><span>Showing ${filtered.length} of ${data.leaves.length} requests</span><div class="pagination-buttons"><button class="button button-plain button-small" disabled>← Previous</button><button class="button button-plain button-small" disabled>Next →</button></div></div></section>`;
}
function renderEmployees() {
  const people = data.employees.filter((person) => {
    const searchText = `${person.name} ${person.email} ${person.id} ${person.department} ${person.designation}`.toLowerCase();
    return searchText.includes(globalSearch.toLowerCase()) && (!employeeFilter || person.department === employeeFilter);
  }).sort((a, b) => a.name.localeCompare(b.name));
  const departments = [...new Set(data.employees.map((person) => person.department))].sort();
  const actions = `<button class="button button-primary" data-action="new-employee">＋ Add employee</button>`;
  const rows = people.length ? people.map((person) => `<tr><td><div class="employee-cell"><span class="avatar ${person.color}">${person.initials}</span><span><span class="employee-name">${escapeHtml(person.name)}</span><span class="employee-email">${escapeHtml(person.email)}</span></span></div></td><td>${escapeHtml(person.id)}</td><td>${escapeHtml(person.department)}</td><td>${escapeHtml(person.designation)}</td><td><span class="badge badge-info">${escapeHtml(person.role)}</span></td><td>${shortDate(person.joiningDate, { month: "short", day: "numeric", year: "numeric" })}</td><td><div class="actions-cell"><button class="button button-plain button-small" data-action="edit-employee" data-id="${person.id}">Edit</button><button class="button button-danger button-small" data-action="delete-employee" data-id="${person.id}" aria-label="Delete ${escapeHtml(person.name)}">×</button></div></td></tr>`).join("") : `<tr><td colspan="7"><div class="empty-state"><strong>No employees found</strong>Try changing your search or filters.</div></td></tr>`;
  return `${renderHeading("Your people", "Manage employee details, roles, and leave balances.", actions)}
    <section class="metric-grid">${renderMetric("Team members", data.employees.length, "Across all departments", "♙", "")}${renderMetric("Departments", departments.length, "Teams making great things", "⌘", "blue")}${renderMetric("Roles assigned", new Set(data.employees.map((person) => person.role)).size, "Access managed by role", "◇", "green")}${renderMetric("Leave categories", 4, "CL · SL · EL · LWP", "▤", "orange")}</section>
    <section class="panel page-panel"><div class="list-header"><div class="filter-row"><span class="toolbar-note">${people.length} employees</span></div><div class="filter-row"><input class="text-control inline-search" id="employee-search" type="search" value="${escapeHtml(globalSearch)}" placeholder="Search people..." /><select class="select-control" id="department-filter"><option value="">All departments</option>${departments.map((department) => `<option value="${escapeHtml(department)}" ${employeeFilter === department ? "selected" : ""}>${escapeHtml(department)}</option>`).join("")}</select></div></div>
    <div class="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>EMPLOYEE ID</th><th>DEPARTMENT</th><th>DESIGNATION</th><th>ROLE</th><th>JOINED</th><th>ACTIONS</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="pagination"><span>Showing ${people.length} of ${data.employees.length} employees</span><button class="button button-plain button-small" data-action="export-employees">Export CSV ↓</button></div></section>
    <section class="panel page-panel"><div class="panel-head"><div><h2 class="panel-title">Leave balance overview</h2><p class="panel-subtitle">Used and remaining leave days for each team member</p></div></div><div class="table-wrap"><table class="leave-balance-table"><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>CASUAL (CL)</th><th>SICK (SL)</th><th>EARNED (EL)</th><th>UNPAID (LWP)</th></tr></thead><tbody>${data.employees.map((person) => `<tr><td><span class="employee-name">${escapeHtml(person.name)}</span></td><td>${escapeHtml(person.department)}</td>${["CL", "SL", "EL", "LWP"].map((code) => `<td class="balance-cell">${person.balances?.[code] ?? 0} days left<small>Used ${usedDays(person.id, code)} days</small></td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
}

function renderCalendar() {
  const year = calendarDate.getFullYear(), month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  let cells = "";
  const count = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let index = 0; index < count; index++) {
    let day, date, outside = false;
    if (index < firstDay) { day = prevMonthDays - firstDay + index + 1; date = new Date(year, month - 1, day); outside = true; }
    else if (index >= firstDay + daysInMonth) { day = index - firstDay - daysInMonth + 1; date = new Date(year, month + 1, day); outside = true; }
    else { day = index - firstDay + 1; date = new Date(year, month, day); }
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const leaveEvents = data.leaves.filter((leave) => leave.start <= iso && leave.end >= iso && leave.status !== "Rejected").slice(0, 2);
    const holidayEvents = data.holidays.filter((holiday) => holiday.date === iso);
    const dayEvents = [...holidayEvents.map((holiday) => `<div class="calendar-event holiday" title="${escapeHtml(holiday.name)}">${escapeHtml(holiday.name)}</div>`), ...leaveEvents.map((leave) => `<div class="calendar-event ${leave.status === "Pending" ? "pending" : ""}" title="${escapeHtml(employee(leave.employeeId)?.name || "Employee")} · ${leave.status}">${escapeHtml(employee(leave.employeeId)?.name || "Employee")}${leave.status === "Pending" ? " · pending" : ""}</div>`)].join("");
    const isToday = iso === todayISO();
    cells += `<div class="calendar-cell"><span class="calendar-day ${outside ? "outside" : ""} ${isToday ? "today" : ""}">${day}</span>${dayEvents}</div>`;
  }
  const monthName = calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const actions = `<button class="button button-secondary" data-action="new-holiday">＋ Add holiday</button>`;
  return `${renderHeading("Leave calendar", "See who's away, what's coming up, and how your team is covered.", actions)}
    <section class="metric-grid">${renderMetric("On leave this month", data.leaves.filter((leave) => leave.status === "Approved" && new Date(`${leave.start}T12:00:00`).getMonth() === month).length, monthName, "◷", "green")}${renderMetric("Pending requests", data.leaves.filter((leave) => leave.status === "Pending").length, "Awaiting a decision", "◷", "orange")}${renderMetric("Upcoming holidays", upcomingHolidays(8).length, "On your organization calendar", "✳", "blue")}${renderMetric("Team availability", `${Math.max(0, data.employees.length - data.leaves.filter((leave) => leave.status === "Approved" && leave.start <= todayISO() && leave.end >= todayISO()).length)} / ${data.employees.length}`, "Available today", "♙", "")}</section>
    <section class="panel page-panel"><div class="calendar-toolbar"><h2>${monthName}</h2><div class="calendar-controls"><button data-action="calendar-prev" aria-label="Previous month">‹</button><button data-action="calendar-today">Today</button><button data-action="calendar-next" aria-label="Next month">›</button></div></div>
    <div class="calendar-grid">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<div class="calendar-weekday">${day}</div>`).join("")}${cells}</div>
    <div class="calendar-legend"><span><i class="legend-dot"></i>Approved leave</span><span><i class="legend-dot pending-dot"></i>Pending request</span><span><i class="legend-dot" style="background:#59b99b"></i>Public holiday</span></div></section>
    <section class="panel page-panel"><div class="panel-head"><div><h2 class="panel-title">Upcoming public holidays</h2><p class="panel-subtitle">Keep track of days off across your locations</p></div></div><div class="holiday-list">${upcomingHolidays(8).map((holiday) => `<div class="holiday-row"><div class="date-tile"><strong>${new Date(`${holiday.date}T12:00:00`).getDate()}</strong><span>${shortDate(holiday.date, { month: "short" })}</span></div><div class="holiday-info"><strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.region)} · ${new Date(`${holiday.date}T12:00:00`).getFullYear()}</span></div><button class="button button-plain button-small" data-action="delete-holiday" data-date="${holiday.date}">Remove</button></div>`).join("") || '<div class="empty-state">No upcoming holidays added.</div>'}</div></section>`;
}
function renderReports() {
  const totalApproved = data.leaves.filter((leave) => leave.status === "Approved").reduce((sum, leave) => sum + leave.days, 0);
  const departmentRows = [...new Set(data.employees.map((person) => person.department))].map((department) => {
    const ids = data.employees.filter((person) => person.department === department).map((person) => person.id);
    const days = data.leaves.filter((leave) => ids.includes(leave.employeeId) && leave.status === "Approved").reduce((sum, leave) => sum + leave.days, 0);
    return { department, days };
  }).sort((a, b) => b.days - a.days);
  const max = Math.max(1, ...departmentRows.map((row) => row.days));
  const typeRows = Object.entries(leaveTypes).map(([code, name]) => ({ code, name, days: data.leaves.filter((leave) => leave.type === code && leave.status === "Approved").reduce((sum, leave) => sum + leave.days, 0) }));
  return `${renderHeading("Reports & insights", "A clearer picture of leave trends across your organization.", `<button class="button button-secondary" data-action="print-report">↓ Export PDF</button><button class="button button-primary" data-action="export-report">↓ Export Excel</button>`)}
    <section class="metric-grid">${renderMetric("Approved leave days", totalApproved, "Across your organization", "▤", "")}${renderMetric("Requests this month", data.leaves.filter((leave) => leave.applied.slice(0, 7) === todayISO().slice(0, 7)).length, "All leave types", "◷", "blue")}${renderMetric("Approval rate", `${data.leaves.length ? Math.round(data.leaves.filter((leave) => leave.status === "Approved").length / data.leaves.length * 100) : 0}%`, "Of all submitted requests", "✓", "green")}${renderMetric("Average duration", `${data.leaves.length ? (data.leaves.reduce((sum, leave) => sum + leave.days, 0) / data.leaves.length).toFixed(1) : "0"} days`, "Per leave request", "⌁", "orange")}</section>
    <section class="report-grid">
      <article class="report-card"><span class="report-symbol">⌘</span><h2>Department leave summary</h2><p>Approved leave days grouped by department.</p><div class="report-bars">${departmentRows.map((row) => `<div class="bar-row"><span>${escapeHtml(row.department)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(row.days / max * 100)}%"></div></div><strong>${row.days}</strong></div>`).join("")}</div></article>
      <article class="report-card"><span class="report-symbol">▤</span><h2>Leave type utilization</h2><p>How your team is using each leave category.</p><div class="report-bars">${typeRows.map((row) => `<div class="bar-row"><span>${escapeHtml(row.name.split(" ")[0])}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(row.days / Math.max(1, totalApproved) * 100)}%;background:${row.code === "CL" ? "#7668e4" : row.code === "SL" ? "#ef9b76" : row.code === "EL" ? "#59b99b" : "#6c9fe1"}"></div></div><strong>${row.days}d</strong></div>`).join("")}</div></article>
      <article class="report-card"><span class="report-symbol">♙</span><h2>Employee leave history</h2><p>Download each employee's submitted requests and decisions.</p><button class="button button-secondary" data-action="export-report">Download employee report ↓</button></article>
      <article class="report-card"><span class="report-symbol">▦</span><h2>Monthly leave summary</h2><p>Get a spreadsheet-ready export of leave dates, types, and approval status.</p><button class="button button-secondary" data-action="export-report">Download monthly report ↓</button></article>
    </section>
    <section class="panel page-panel"><div class="panel-head"><div><h2 class="panel-title">Recent activity</h2><p class="panel-subtitle">Approvals, rejections, and updates</p></div></div>${data.audit.length ? `<div class="holiday-list">${data.audit.slice(0, 8).map((entry) => `<div class="holiday-row"><div class="date-tile"><strong>✓</strong><span>LOG</span></div><div class="holiday-info"><strong>${escapeHtml(entry.action)}</strong><span>${escapeHtml(entry.detail)} · ${new Date(entry.at).toLocaleString()}</span></div><span class="toolbar-note">${escapeHtml(entry.by)}</span></div>`).join("")}</div>` : '<div class="empty-state"><strong>No recent activity</strong>Actions will show up here as your team uses the tracker.</div>'}</section>`;
}
function renderSettings() {
  return `${renderHeading("Settings", "Tune your workspace to work the way your people do.", "")}
    <section class="panel page-panel"><div class="settings-section"><h2>Leave policy</h2><p>Annual leave allowances and categories assigned to employees.</p><div class="balance-grid">${Object.entries(leaveTypes).map(([code, name]) => `<article class="balance-card"><div class="balance-card-top"><i class="${kindClass(code)}"></i>${name}</div><strong>${code === "LWP" ? "No limit" : `${code === "CL" ? 8 : code === "SL" ? 10 : 15} days`}</strong><small>${code === "LWP" ? "Unpaid leave" : "Annual allowance"}</small></article>`).join("")}</div><p>Balances are displayed per employee and may be edited from People.</p></div>
    <div class="settings-section"><h2>Workspace data</h2><p>Your demo workspace data is saved in this browser using local storage.</p><div class="filter-row"><button class="button button-secondary" data-action="export-report">Export all data</button><button class="button button-danger" data-action="reset-data">Reset demo data</button></div></div>
    <div class="settings-section"><h2>Roles & permissions</h2><p>Admin and HR can manage organization requests and employee records. Managers can review requests for their team. Employees can apply for leave and view their own balances.</p><div class="filter-row">${["Admin", "HR", "Manager", "Employee"].map((role) => `<span class="badge badge-info">${role}</span>`).join("")}</div></div></section>`;
}

function openModal(title, subtitle, body) {
  const backdrop = document.getElementById("modal-backdrop");
  document.getElementById("modal").innerHTML = `<div class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close dialog">×</button></div>${body}`;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  backdrop.querySelector("input,select,textarea,button")?.focus();
}
function closeModal() {
  document.getElementById("modal-backdrop").hidden = true;
  document.body.style.overflow = "";
}
function employeeForm(person = null) {
  const edit = Boolean(person);
  const body = `<form class="modal-body" id="employee-form"><div class="form-grid">
    <div class="form-field"><label for="employee-name-input">Full name *</label><input id="employee-name-input" name="name" required value="${escapeHtml(person?.name || "")}" placeholder="e.g. Jamie Lee" /></div>
    <div class="form-field"><label for="employee-email-input">Work email *</label><input id="employee-email-input" name="email" type="email" required value="${escapeHtml(person?.email || "")}" placeholder="name@company.com" /></div>
    <div class="form-field"><label for="employee-department-input">Department *</label><input id="employee-department-input" name="department" required value="${escapeHtml(person?.department || "")}" placeholder="e.g. Engineering" /></div>
    <div class="form-field"><label for="employee-designation-input">Designation *</label><input id="employee-designation-input" name="designation" required value="${escapeHtml(person?.designation || "")}" placeholder="e.g. Product Manager" /></div>
    <div class="form-field"><label for="employee-role-input">Role *</label><select id="employee-role-input" name="role">${["Employee", "Manager", "HR", "Admin"].map((role) => `<option ${person?.role === role ? "selected" : ""}>${role}</option>`).join("")}</select></div>
    <div class="form-field"><label for="employee-joined-input">Joining date *</label><input id="employee-joined-input" name="joiningDate" type="date" required value="${escapeHtml(person?.joiningDate || todayISO())}" /></div>
    ${edit ? `<div class="form-field"><label for="employee-cl-input">Casual leave balance</label><input id="employee-cl-input" name="CL" type="number" min="0" value="${person.balances?.CL ?? 0}" /></div><div class="form-field"><label for="employee-sl-input">Sick leave balance</label><input id="employee-sl-input" name="SL" type="number" min="0" value="${person.balances?.SL ?? 0}" /></div><div class="form-field"><label for="employee-el-input">Earned leave balance</label><input id="employee-el-input" name="EL" type="number" min="0" value="${person.balances?.EL ?? 0}" /></div><div class="form-field"><label for="employee-lwp-input">Unpaid leave balance</label><input id="employee-lwp-input" name="LWP" type="number" min="0" value="${person.balances?.LWP ?? 0}" /></div>` : ""}
    <div class="form-field full"><span class="form-hint">${edit ? `Employee ID: ${escapeHtml(person.id)} · Adjust leave balances as needed.` : "A default leave balance will be assigned to this new employee."}</span></div></div>
    <div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${edit ? "Save changes" : "Add employee"}</button></div></form>`;
  openModal(edit ? "Edit employee" : "Add employee", edit ? "Update employee details and leave balance." : "Add someone new to your organization.", body);
  document.getElementById("employee-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email")).trim();
    if (data.employees.some((item) => item.email.toLowerCase() === email.toLowerCase() && item.id !== person?.id)) {
      toast("That email address is already in use.");
      return;
    }
    if (edit) {
      Object.assign(person, { name: String(fields.get("name")).trim(), email, department: String(fields.get("department")).trim(), designation: String(fields.get("designation")).trim(), role: String(fields.get("role")), joiningDate: String(fields.get("joiningDate")), initials: initials(String(fields.get("name"))) });
      person.balances = { ...person.balances, CL: Number(fields.get("CL")), SL: Number(fields.get("SL")), EL: Number(fields.get("EL")), LWP: Number(fields.get("LWP")) };
      recordAudit("Employee updated", `${person.name} · ${person.id}`);
    } else {
      const name = String(fields.get("name")).trim();
      const newPerson = { id: `EMP-${data.nextEmployee++}`, name, email, department: String(fields.get("department")).trim(), designation: String(fields.get("designation")).trim(), role: String(fields.get("role")), joiningDate: String(fields.get("joiningDate")), initials: initials(name), color: colors[data.employees.length % colors.length], balances: { CL: 8, SL: 10, EL: 15, LWP: 0 } };
      data.employees.push(newPerson);
      recordAudit("Employee added", `${newPerson.name} · ${newPerson.id}`);
    }
    saveData(); closeModal(); render(); toast(edit ? "Employee details updated." : "Employee added successfully.");
  });
}
function leaveForm() {
  if (!data.employees.length) { toast("Add an employee before applying for leave."); return; }
  const body = `<form class="modal-body" id="leave-form"><div class="form-grid">
    <div class="form-field full"><label for="leave-employee-input">Employee *</label><select id="leave-employee-input" name="employeeId" required>${data.employees.map((person) => `<option value="${person.id}">${escapeHtml(person.name)} · ${escapeHtml(person.department)}</option>`).join("")}</select></div>
    <div class="form-field full"><label for="leave-type-input">Leave type *</label><select id="leave-type-input" name="type">${Object.entries(leaveTypes).map(([code, name]) => `<option value="${code}">${name}${code !== "LWP" ? ` · ${data.employees[0].balances?.[code] || 0} days available` : ""}</option>`).join("")}</select></div>
    <div class="form-field"><label for="leave-start-input">Start date *</label><input id="leave-start-input" name="start" type="date" min="${todayISO()}" required value="${todayISO()}" /></div>
    <div class="form-field"><label for="leave-end-input">End date *</label><input id="leave-end-input" name="end" type="date" min="${todayISO()}" required value="${todayISO()}" /></div>
    <div class="form-field full"><label for="leave-reason-input">Reason for leave *</label><textarea id="leave-reason-input" name="reason" required maxlength="500" placeholder="Share a little context with your manager..."></textarea></div>
    <div class="form-field full"><label for="leave-document-input">Supporting document <span class="form-hint">(optional)</span></label><input id="leave-document-input" type="file" accept=".pdf,.png,.jpg,.jpeg" /><span class="form-hint">PDF or image, up to 10 MB. Files stay in this browser session.</span></div>
    <div class="form-field full"><span class="form-hint" id="leave-days-hint">Weekends are not counted as leave days.</span></div></div>
    <div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Submit request →</button></div></form>`;
  openModal("Request time off", "Your manager will be notified when you submit your request.", body);
  const form = document.getElementById("leave-form");
  const updateDays = () => {
    const start = form.elements.start.value, end = form.elements.end.value;
    const hint = document.getElementById("leave-days-hint");
    if (start && end && end >= start) hint.textContent = `${weekdayDays(start, end)} working day${weekdayDays(start, end) === 1 ? "" : "s"} requested. Weekends are not counted.`;
    else hint.textContent = "End date must be on or after the start date.";
  };
  form.elements.start.addEventListener("change", () => { form.elements.end.min = form.elements.start.value; updateDays(); });
  form.elements.end.addEventListener("change", updateDays);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const start = form.elements.start.value, end = form.elements.end.value;
    const person = employee(form.elements.employeeId.value);
    const type = form.elements.type.value;
    const days = weekdayDays(start, end);
    if (!start || !end || end < start || days < 1) { toast("Choose a valid date range with at least one working day."); return; }
    const overlap = data.leaves.some((leave) => leave.employeeId === person.id && leave.status !== "Rejected" && start <= leave.end && end >= leave.start);
    if (overlap) { toast("This employee already has a pending or approved request for those dates."); return; }
    const reserved = data.leaves.filter((leave) => leave.employeeId === person.id && leave.type === type && leave.status === "Pending").reduce((sum, leave) => sum + leave.days, 0);
    const available = person.balances?.[type] ?? 0;
    if (type !== "LWP" && days + reserved > available) { toast(`Not enough ${leaveTypes[type]} balance. ${Math.max(0, available - reserved)} day(s) remain.`); return; }
    const attachment = document.getElementById("leave-document-input").files[0];
    if (attachment && attachment.size > 10 * 1024 * 1024) { toast("Supporting documents must be smaller than 10 MB."); return; }
    const newLeave = { id: `LV-${data.nextLeave++}`, employeeId: person.id, type, start, end, days, reason: String(form.elements.reason.value).trim(), status: "Pending", applied: todayISO(), reviewer: "", attachment: attachment?.name || "" };
    data.leaves.unshift(newLeave);
    recordAudit("Leave request submitted", `${person.name} · ${leaveTypes[type]} · ${days} days`);
    saveData(); closeModal(); render(); toast("Leave request submitted. Your manager has been notified.");
  });
}
function rejectForm(leave) {
  const body = `<form class="modal-body" id="reject-form"><div class="form-field"><label for="reject-reason">Reason for rejection *</label><textarea id="reject-reason" name="reason" required maxlength="400" placeholder="Let the employee know why this request can't be approved..."></textarea></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Reject request</button></div></form>`;
  openModal("Reject leave request", "A clear reason helps your team plan next steps.", body);
  document.getElementById("reject-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const reason = new FormData(event.currentTarget).get("reason").toString().trim();
    if (!reason) return;
    leave.status = "Rejected"; leave.reviewer = "Alex Morgan"; leave.rejectionReason = reason;
    recordAudit("Leave request rejected", `${employee(leave.employeeId)?.name} · ${leave.id}: ${reason}`);
    saveData(); closeModal(); render(); toast("Request rejected. The employee has been notified.");
  });
}
function addHolidayForm() {
  const body = `<form class="modal-body" id="holiday-form"><div class="form-grid"><div class="form-field full"><label for="holiday-name">Holiday name *</label><input id="holiday-name" name="name" required placeholder="e.g. Company foundation day" /></div><div class="form-field"><label for="holiday-date">Date *</label><input id="holiday-date" name="date" type="date" required /></div><div class="form-field"><label for="holiday-region">Region *</label><input id="holiday-region" name="region" required placeholder="e.g. Global" /></div></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">Add holiday</button></div></form>`;
  openModal("Add a holiday", "Keep your team's shared calendar up to date.", body);
  document.getElementById("holiday-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const holiday = { name: String(fields.get("name")).trim(), date: String(fields.get("date")), region: String(fields.get("region")).trim() };
    if (data.holidays.some((item) => item.date === holiday.date && item.name.toLowerCase() === holiday.name.toLowerCase())) { toast("That holiday is already on the calendar."); return; }
    data.holidays.push(holiday); recordAudit("Holiday added", `${holiday.name} · ${holiday.date}`);
    saveData(); closeModal(); render(); toast("Holiday added to the calendar.");
  });
}
function exportCsv() {
  const headers = ["Request ID", "Employee", "Employee ID", "Department", "Leave Type", "Start Date", "End Date", "Days", "Status", "Reason", "Reviewer"];
  const rows = data.leaves.map((leave) => { const person = employee(leave.employeeId) || {}; return [leave.id, person.name, person.id, person.department, leaveTypes[leave.type], leave.start, leave.end, leave.days, leave.status, leave.reason, leave.reviewer]; });
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`orbit-leave-report-${todayISO()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  toast("Your Excel-compatible CSV report is ready.");
}
function exportEmployees() {
  const headers = ["Employee ID", "Name", "Email", "Department", "Designation", "Role", "Joining Date", "Casual Leave", "Sick Leave", "Earned Leave", "Unpaid Leave"];
  const rows = data.employees.map((person) => [person.id, person.name, person.email, person.department, person.designation, person.role, person.joiningDate, person.balances?.CL, person.balances?.SL, person.balances?.EL, person.balances?.LWP]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`orbit-employee-report-${todayISO()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  toast("Employee report downloaded.");
}
function downloadFile(filename, content, type) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
function csvCell(value) {
  let text = String(value ?? "");
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
function handleAction(button) {
  const action = button.dataset.action;
  const id = button.dataset.id;
  const leave = data.leaves.find((item) => item.id === id);
  const person = data.employees.find((item) => item.id === id);
  if (action === "new-employee") employeeForm();
  if (action === "new-leave") leaveForm();
  if (action === "edit-employee" && person) employeeForm(person);
  if (action === "delete-employee" && person) {
    const linked = data.leaves.some((item) => item.employeeId === person.id);
    if (linked) { toast("This employee has leave history and can't be deleted."); return; }
    if (window.confirm(`Remove ${person.name} from the employee directory?`)) {
      data.employees = data.employees.filter((item) => item.id !== person.id);
      recordAudit("Employee removed", `${person.name} · ${person.id}`);
      saveData(); render(); toast("Employee removed.");
    }
  }
  if (action === "approve" && leave?.status === "Pending") {
    const personForLeave = employee(leave.employeeId);
    const approvedOverlap = data.leaves.some((item) => item.id !== leave.id && item.employeeId === leave.employeeId && item.status === "Approved" && leave.start <= item.end && leave.end >= item.start);
    if (approvedOverlap) { toast("This request overlaps another approved leave."); return; }
    if (leave.type !== "LWP" && leave.days > (personForLeave.balances?.[leave.type] ?? 0)) { toast("Not enough leave balance to approve this request."); return; }
    leave.status = "Approved"; leave.reviewer = "Alex Morgan";
    if (leave.type !== "LWP") personForLeave.balances[leave.type] -= leave.days;
    recordAudit("Leave request approved", `${personForLeave.name} · ${leaveTypes[leave.type]} · ${leave.days} days`);
    saveData(); render(); toast("Request approved. The employee has been notified.");
  }
  if (action === "reject" && leave?.status === "Pending") rejectForm(leave);
  if (action === "cancel-leave" && leave?.status === "Pending") {
    if (window.confirm(`Cancel ${employee(leave.employeeId)?.name}'s pending leave request?`)) {
      leave.status = "Cancelled";
      recordAudit("Leave request cancelled", `${employee(leave.employeeId)?.name} · ${leave.id}`);
      saveData(); render(); toast("Pending request cancelled.");
    }
  }
  if (action === "close-modal") closeModal();
  if (action === "filter-requests") { requestFilter = button.dataset.status; render(); }
  if (action === "calendar-prev") { calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1); render(); }
  if (action === "calendar-next") { calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1); render(); }
  if (action === "calendar-today") { const now = new Date(); calendarDate = new Date(now.getFullYear(), now.getMonth(), 1); render(); }
  if (action === "new-holiday") addHolidayForm();
  if (action === "delete-holiday") {
    data.holidays = data.holidays.filter((holiday) => holiday.date !== button.dataset.date);
    recordAudit("Holiday removed", button.dataset.date);
    saveData(); render(); toast("Holiday removed.");
  }
  if (action === "export-report") exportCsv();
  if (action === "export-employees") exportEmployees();
  if (action === "print-report") window.print();
  if (action === "reset-data" && window.confirm("Reset all workspace data to the original demo? This cannot be undone.")) {
    data = structuredClone(initialData); saveData(); render(); toast("Demo data reset.");
  }
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-page]");
  if (nav) {
    activePage = nav.dataset.page;
    globalSearch = "";
    render();
    document.getElementById("sidebar").classList.remove("open");
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action) handleAction(action);
  if (event.target === document.getElementById("modal-backdrop")) closeModal();
});
document.getElementById("global-search").addEventListener("input", (event) => {
  globalSearch = event.target.value;
  if (activePage !== "employees" && activePage !== "requests") activePage = "employees";
  const search = globalSearch;
  render();
  const target = document.getElementById(activePage === "employees" ? "employee-search" : "request-search");
  if (target) { target.value = search; target.focus(); target.setSelectionRange(search.length, search.length); }
});
document.getElementById("page-container").addEventListener("input", (event) => {
  if (event.target.id === "employee-search" || event.target.id === "request-search") {
    globalSearch = event.target.value;
    const cursor = event.target.selectionStart;
    render();
    const id = activePage === "employees" ? "employee-search" : "request-search";
    const input = document.getElementById(id);
    if (input) { input.focus(); input.setSelectionRange(cursor, cursor); }
  }
});
document.getElementById("page-container").addEventListener("change", (event) => {
  if (event.target.id === "department-filter") { employeeFilter = event.target.value; render(); }
  if (event.target.id === "type-filter") {
    const type = event.target.value;
    const rows = data.leaves.slice().sort((a, b) => b.applied.localeCompare(a.applied)).filter((leave) => (requestFilter === "All" || leave.status === requestFilter) && (!type || leave.type === type) && `${employee(leave.employeeId)?.name} ${employee(leave.employeeId)?.department} ${leave.id}`.toLowerCase().includes(globalSearch.toLowerCase()));
    const table = document.querySelector(".page-panel .table-wrap");
    if (table) table.innerHTML = `<table><thead><tr><th>EMPLOYEE</th><th>LEAVE TYPE</th><th>DATES</th><th>DURATION</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>${requestRows(rows)}</tbody></table>`;
  }
});
document.getElementById("menu-toggle").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("notifications-button").addEventListener("click", () => { activePage = "requests"; requestFilter = "Pending"; render(); });
document.querySelector(".profile-trigger").addEventListener("click", () => { activePage = "settings"; render(); });
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("global-search").focus(); }
  if (event.key === "Escape") closeModal();
});

render();
