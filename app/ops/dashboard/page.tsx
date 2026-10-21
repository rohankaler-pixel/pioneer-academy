"use client";

import React, { useState, useEffect } from "react";

const OPS_API_URL = "/api/ops";

interface LogItem {
  Timestamp: string;
  Date_Str: string;
  Room: string;
  Batch: string;
  Slot_ID: string;
  Scheduled_Start: string;
  Scheduled_End: string;
  Teacher_ID: string;
  Teacher_Name: string;
  Action_Type: string;
  Actual_Time: string;
  Delay_Mins: string;
  Status: string;
  Topic_DPP: string;
  Distance_Meters: string;
  Device_ID: string;
}

interface StaffLogItem {
  Timestamp: string;
  Date_Str: string;
  Staff_ID: string;
  Staff_Name: string;
  Role: string;
  Shift_Start: string;
  Shift_End: string;
  Check_In_Time: string;
  Check_Out_Time: string;
  Duration_Mins: string;
  Duration_Formatted: string;
  Status: string;
  Notes: string;
  Distance_Meters: string;
  Device_ID: string;
}

interface TeacherInfo {
  id: string;
  name: string;
  subject: string;
}

interface StaffInfo {
  id: string;
  name: string;
  role: string;
  shiftStart: string;
  shiftEnd: string;
}

export default function OpsDashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"ACADEMIC" | "STAFF">("ACADEMIC");

  // Date Presets & Filters
  const [datePreset, setDatePreset] = useState<"TODAY" | "7DAYS" | "MONTH" | "ALL">("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [selectedStaff, setSelectedStaff] = useState("ALL");

  // Master Data from Backend
  const [teachersMaster, setTeachersMaster] = useState<TeacherInfo[]>([]);
  const [staffMaster, setStaffMaster] = useState<StaffInfo[]>([]);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [staffLogs, setStaffLogs] = useState<StaffLogItem[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${OPS_API_URL}?action=dashboard&key=${passcode}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) {
        setIsAuthed(true);
        setTeachersMaster(data.teachers || []);
        setStaffMaster(data.staff || []);
        setLogs(data.logs || []);
        setStaffLogs(data.staffLogs || []);
      } else {
        setError(data.error || "Invalid Passcode");
      }
    } catch {
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${OPS_API_URL}?action=dashboard&key=${passcode}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) {
        setTeachersMaster(data.teachers || []);
        setStaffMaster(data.staff || []);
        setLogs(data.logs || []);
        setStaffLogs(data.staffLogs || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const applyDatePreset = (preset: "TODAY" | "7DAYS" | "MONTH" | "ALL") => {
    setDatePreset(preset);
    const todayStr = new Date().toISOString().split("T")[0];

    if (preset === "TODAY") {
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "7DAYS") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      setStartDate(d.toISOString().split("T")[0]);
      setEndDate(todayStr);
    } else if (preset === "MONTH") {
      const d = new Date();
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
      setStartDate(firstDay);
      setEndDate(todayStr);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#0d1a40] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl space-y-4">
          <div className="text-center">
            <h1 className="text-xl font-black text-[#162b66]">PIONEER ACADEMY</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Management Command Center</p>
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Enter Admin Passcode</label>
            <input
              type="password"
              placeholder="••••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold text-center tracking-widest text-lg bg-gray-50 focus:border-[#162b66] outline-none"
            />
          </div>
          {error && <p className="text-red-600 text-xs font-bold text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#162b66] hover:bg-[#1f3a8a] text-[#f9d200] font-black py-3.5 rounded-xl shadow-lg transition"
          >
            {loading ? "Verifying..." : "UNLOCK DASHBOARD"}
          </button>
        </form>
      </div>
    );
  }

  // Filtered Logs
  const filteredLogs = logs.filter((l) => {
    if (startDate && l.Date_Str < startDate) return false;
    if (endDate && l.Date_Str > endDate) return false;
    if (selectedRoom !== "ALL" && l.Room !== selectedRoom) return false;
    return true;
  });

  const filteredStaffLogs = staffLogs.filter((s) => {
    if (startDate && s.Date_Str < startDate) return false;
    if (endDate && s.Date_Str > endDate) return false;
    if (selectedStaff !== "ALL" && s.Staff_ID !== selectedStaff) return false;
    return true;
  });

  // Aggregate Teacher Summary Data
  const teacherSummaryMap: { [id: string]: { name: string; subject: string; classes: number; onTime: number; earlyExits: number } } = {};
  teachersMaster.forEach((t) => {
    teacherSummaryMap[t.id] = { name: t.name, subject: t.subject, classes: 0, onTime: 0, earlyExits: 0 };
  });

  filteredLogs.forEach((l) => {
    if (!teacherSummaryMap[l.Teacher_ID]) {
      teacherSummaryMap[l.Teacher_ID] = { name: l.Teacher_Name, subject: "-", classes: 0, onTime: 0, earlyExits: 0 };
    }
    if (l.Action_Type === "START") {
      teacherSummaryMap[l.Teacher_ID].classes += 1;
      if (l.Status.includes("ON_TIME")) {
        teacherSummaryMap[l.Teacher_ID].onTime += 1;
      }
    }
    if (l.Status.includes("EARLY_EXIT")) {
      teacherSummaryMap[l.Teacher_ID].earlyExits += 1;
    }
  });

  const teacherSummaryList = Object.values(teacherSummaryMap);

  // Aggregate Non-Academic Employee Summary Data
  const staffSummaryMap: { [id: string]: { name: string; role: string; shifts: number; completed: number; onTimeCheckIns: number; totalMins: number } } = {};
  staffMaster.forEach((s) => {
    staffSummaryMap[s.id] = { name: s.name, role: s.role, shifts: 0, completed: 0, onTimeCheckIns: 0, totalMins: 0 };
  });

  filteredStaffLogs.forEach((s) => {
    if (!staffSummaryMap[s.Staff_ID]) {
      staffSummaryMap[s.Staff_ID] = { name: s.Staff_Name, role: s.Role, shifts: 0, completed: 0, onTimeCheckIns: 0, totalMins: 0 };
    }
    staffSummaryMap[s.Staff_ID].shifts += 1;
    if (s.Status.includes("COMPLETED")) {
      staffSummaryMap[s.Staff_ID].completed += 1;
    }
    if (s.Status.includes("ON_TIME")) {
      staffSummaryMap[s.Staff_ID].onTimeCheckIns += 1;
    }
    const mins = Number(s.Duration_Mins) || 0;
    staffSummaryMap[s.Staff_ID].totalMins += mins;
  });

  const staffSummaryList = Object.values(staffSummaryMap);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-12">
      {/* Header */}
      <div className="bg-[#162b66] text-white py-6 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs font-bold text-[#f9d200] uppercase tracking-wider">Pioneer Academy Bikaner</p>
            <h1 className="text-2xl font-black">Operations Command Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="bg-[#f9d200] text-[#162b66] font-black px-4 py-2 rounded-xl text-xs shadow hover:bg-yellow-400 transition"
            >
              {loading ? "Refreshing..." : "🔄 Refresh Data"}
            </button>
            <a
              href="/ops/qr-print"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              🖨️ Printable QR Posters
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab("ACADEMIC")}
            className={`pb-3 px-6 font-black text-sm transition border-b-4 ${
              activeTab === "ACADEMIC"
                ? "border-[#162b66] text-[#162b66]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            📚 Academic Faculty Summary & Logs
          </button>
          <button
            onClick={() => setActiveTab("STAFF")}
            className={`pb-3 px-6 font-black text-sm transition border-b-4 ${
              activeTab === "STAFF"
                ? "border-[#162b66] text-[#162b66]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            🏢 Non-Academic Staff Summary & Shifts
          </button>
        </div>

        {/* Date Range & Filter Presets Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase text-gray-400 mr-2">Quick Range:</span>
            <button
              onClick={() => applyDatePreset("TODAY")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                datePreset === "TODAY" ? "bg-[#162b66] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => applyDatePreset("7DAYS")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                datePreset === "7DAYS" ? "bg-[#162b66] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => applyDatePreset("MONTH")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                datePreset === "MONTH" ? "bg-[#162b66] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Current Month
            </button>
            <button
              onClick={() => applyDatePreset("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                datePreset === "ALL" ? "bg-[#162b66] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Time
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-gray-100">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDatePreset("ALL");
                }}
                className="border rounded-xl px-3 py-2 text-xs font-bold bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDatePreset("ALL");
                }}
                className="border rounded-xl px-3 py-2 text-xs font-bold bg-gray-50"
              />
            </div>

            {activeTab === "ACADEMIC" ? (
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Room Filter</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="border rounded-xl px-3 py-2 text-xs font-bold bg-gray-50"
                >
                  <option value="ALL">All Rooms</option>
                  <option value="LT-1">LT-1 (Target)</option>
                  <option value="LT-2">LT-2 (11th E/H)</option>
                  <option value="LT-3">LT-3 (12th H.M)</option>
                  <option value="LT-4">LT-4 (11th Maths)</option>
                  <option value="LT-5">LT-5 (12th E.M)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Staff Filter</label>
                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="border rounded-xl px-3 py-2 text-xs font-bold bg-gray-50"
                >
                  <option value="ALL">All Staff Members</option>
                  {staffMaster.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ACADEMIC TAB CONTENT                                                 */}
        {/* ==================================================================== */}
        {activeTab === "ACADEMIC" && (
          <div className="space-y-8">
            {/* Teacher-Wise Summary Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5">
              <h2 className="text-sm font-black text-[#162b66] uppercase tracking-wider mb-4">
                👨‍🏫 Teacher-Wise Performance Summary ({datePreset})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider">
                      <th className="p-3">Faculty Name & Subject</th>
                      <th className="p-3 text-center">Classes Taken</th>
                      <th className="p-3 text-center">On-Time Starts</th>
                      <th className="p-3 text-center">On-Time %</th>
                      <th className="p-3 text-center">Early Departures</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {teacherSummaryList.map((t, i) => {
                      const pct = t.classes > 0 ? Math.round((t.onTime / t.classes) * 100) : 0;
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-3">
                            <span className="font-bold text-[#162b66]">{t.name}</span>
                            <span className="block text-[10px] text-gray-500">{t.subject}</span>
                          </td>
                          <td className="p-3 text-center font-black">{t.classes}</td>
                          <td className="p-3 text-center font-bold text-green-700">{t.onTime}</td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                pct >= 80 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {pct}%
                            </span>
                          </td>
                          <td className="p-3 text-center font-bold text-red-600">{t.earlyExits}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Academic Logs Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5">
              <h2 className="text-sm font-black text-[#162b66] uppercase tracking-wider mb-4">
                📜 Detailed Classroom Scan Logs ({filteredLogs.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider">
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Room / Batch</th>
                      <th className="p-3">Faculty</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Scheduled</th>
                      <th className="p-3">Actual</th>
                      <th className="p-3">Status / Delay</th>
                      <th className="p-3">Topic / DPP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-400 font-bold">
                          No academic scan logs found for the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((l, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-3 font-bold">{l.Date_Str}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#162b66]">{l.Room}</span>
                            <span className="block text-[10px] text-gray-500">{l.Batch}</span>
                          </td>
                          <td className="p-3 font-bold">{l.Teacher_Name}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                l.Action_Type === "START" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {l.Action_Type}
                            </span>
                          </td>
                          <td className="p-3 text-gray-600">
                            {l.Scheduled_Start} - {l.Scheduled_End}
                          </td>
                          <td className="p-3 font-bold">{l.Actual_Time}</td>
                          <td className="p-3">
                            <span
                              className={`font-bold ${
                                l.Status.includes("ON_TIME") || l.Status.includes("PROPER")
                                  ? "text-green-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {l.Status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-600 italic">{l.Topic_DPP}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* NON-ACADEMIC STAFF TAB CONTENT                                       */}
        {/* ==================================================================== */}
        {activeTab === "STAFF" && (
          <div className="space-y-8">
            {/* Employee-Wise Summary Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5">
              <h2 className="text-sm font-black text-[#162b66] uppercase tracking-wider mb-4">
                👔 Non-Academic Employee Performance Summary ({datePreset})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider">
                      <th className="p-3">Employee Name & Role</th>
                      <th className="p-3 text-center">Shifts Logged</th>
                      <th className="p-3 text-center">Completed</th>
                      <th className="p-3 text-center">On-Time Check-Ins</th>
                      <th className="p-3 text-center">Avg Daily Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {staffSummaryList.map((s, i) => {
                      const avgMins = s.shifts > 0 ? Math.round(s.totalMins / s.shifts) : 0;
                      const avgHoursFormatted = `${Math.floor(avgMins / 60)}h ${avgMins % 60}m`;
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-3">
                            <span className="font-bold text-[#162b66]">{s.name}</span>
                            <span className="block text-[10px] text-gray-500">{s.role}</span>
                          </td>
                          <td className="p-3 text-center font-black">{s.shifts}</td>
                          <td className="p-3 text-center font-bold text-green-700">{s.completed}</td>
                          <td className="p-3 text-center font-bold text-blue-700">{s.onTimeCheckIns}</td>
                          <td className="p-3 text-center font-bold text-gray-700">{avgHoursFormatted}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Staff Shift Logs Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5">
              <h2 className="text-sm font-black text-[#162b66] uppercase tracking-wider mb-4">
                📜 Detailed Shift Logs ({filteredStaffLogs.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider">
                      <th className="p-3">Date</th>
                      <th className="p-3">Staff Name & Role</th>
                      <th className="p-3">Shift Timing</th>
                      <th className="p-3">Check-In</th>
                      <th className="p-3">Check-Out</th>
                      <th className="p-3">Total Duration</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStaffLogs.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-400 font-bold">
                          No non-academic staff logs found for the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredStaffLogs.map((s, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-3 font-bold">{s.Date_Str}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#162b66]">{s.Staff_Name}</span>
                            <span className="block text-[10px] text-gray-500">{s.Role}</span>
                          </td>
                          <td className="p-3 text-gray-600">
                            {s.Shift_Start} - {s.Shift_End}
                          </td>
                          <td className="p-3 font-bold text-green-700">{s.Check_In_Time || "-"}</td>
                          <td className="p-3 font-bold text-red-700">{s.Check_Out_Time || "Active Shift"}</td>
                          <td className="p-3 font-black text-[#162b66]">{s.Duration_Formatted || "-"}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                s.Status.includes("COMPLETED")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {s.Status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-600 italic">{s.Notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}