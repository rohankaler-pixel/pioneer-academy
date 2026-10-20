"use client";

import React, { useState } from "react";
import Link from "next/link";

const OPS_API_URL = "/api/ops";

interface ScanLog {
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
}

interface StaffItem {
  id: string;
  name: string;
  role: string;
  shiftStart: string;
  shiftEnd: string;
}

interface StaffLog {
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
}

function getTodayIST(): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  return istDate.toISOString().split("T")[0];
}

function getDaysAgoIST(days: number): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset - days * 86400000);
  return istDate.toISOString().split("T")[0];
}

function formatMinsToHrs(totalMins: number): string {
  if (!totalMins || totalMins <= 0) return "0h 0m";
  const h = Math.floor(totalMins / 60);
  const m = Math.round(totalMins % 60);
  return `${h}h ${m}m`;
}

export default function ManagementDashboard() {
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Section Toggle: ACADEMIC vs NON_ACADEMIC
  const [activeTab, setActiveTab] = useState<"ACADEMIC" | "NON_ACADEMIC">("ACADEMIC");

  // Custom Start Date & End Date Filter (Defaults to Last 7 Days)
  const [startDate, setStartDate] = useState<string>(() => getDaysAgoIST(6));
  const [endDate, setEndDate] = useState<string>(() => getTodayIST());

  // Data States
  const [teachers, setTeachers] = useState<{ id: string; name: string; subject: string }[]>([]);
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [staff, setStaff] = useState<StaffItem[]>([]);
  const [staffLogs, setStaffLogs] = useState<StaffLog[]>([]);

  const fetchDashboard = async (keyToUse: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${OPS_API_URL}?action=dashboard&key=${encodeURIComponent(keyToUse)}`, {
        cache: "no-store",
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        setError(`Script returned non-JSON (${res.status}): ${rawText.slice(0, 100)}...`);
        setLoading(false);
        return;
      }

      if (data.ok) {
        setTeachers(data.teachers || []);
        setLogs(data.logs || []);
        setStaff(data.staff || []);
        setStaffLogs(data.staffLogs || []);
        setAuthenticated(true);
      } else {
        setError(data.error || "Invalid Passcode");
      }
    } catch (err: any) {
      setError(`Connection Error: ${err?.message || "Failed to reach server"}`);
    } finally {
      setLoading(false);
    }
  };

  const applyPresetRange = (daysBack: number) => {
    setEndDate(getTodayIST());
    setStartDate(getDaysAgoIST(daysBack));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0d1a40] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border-t-4 border-[#f9d200]">
          <h1 className="text-2xl font-black text-[#162b66] mb-1">Pioneer Ops Command</h1>
          <p className="text-xs text-gray-500 font-bold mb-6">Restricted Management View • Bikaner</p>
          <input
            type="password"
            placeholder="Enter Admin Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold mb-4 outline-none focus:border-[#162b66]"
          />
          <button
            onClick={() => fetchDashboard(passcode)}
            disabled={loading}
            className="w-full bg-[#162b66] text-white font-black py-3 rounded-xl hover:bg-blue-900 transition"
          >
            {loading ? "Verifying..." : "Unlock Dashboard"}
          </button>
          {error && <p className="text-red-600 text-xs font-bold text-center mt-3">{error}</p>}
        </div>
      </div>
    );
  }

  // Filter Academic & Non-Academic Logs by Selected Date Range (YYYY-MM-DD inclusive)
  const filteredAcademicLogs = logs.filter(
    (l) => l.Date_Str >= startDate && l.Date_Str <= endDate
  );

  const filteredStaffLogs = staffLogs.filter(
    (l) => l.Date_Str >= startDate && l.Date_Str <= endDate
  );

  // Compute Academic Teacher Leaderboard
  const academicLeaderboard = teachers.map((t) => {
    const startScans = filteredAcademicLogs.filter(
      (l) => l.Teacher_ID === t.id && l.Action_Type === "START"
    );
    const endScans = filteredAcademicLogs.filter(
      (l) => l.Teacher_ID === t.id && l.Action_Type === "END"
    );
    const onTimeCount = startScans.filter((l) => l.Status.startsWith("ON_TIME")).length;
    const earlyExits = endScans.filter((l) => l.Status.startsWith("EARLY_EXIT")).length;

    const avgDelay =
      startScans.length > 0
        ? (
            startScans.reduce((sum, item) => sum + Math.max(0, Number(item.Delay_Mins)), 0) /
            startScans.length
          ).toFixed(1)
        : "0.0";

    const onTimePct =
      startScans.length > 0 ? Math.round((onTimeCount / startScans.length) * 100) : 100;

    return { ...t, totalStarts: startScans.length, onTimeCount, earlyExits, avgDelay, onTimePct };
  });

  // Compute Non-Academic Staff Summary
  const staffLeaderboard = staff.map((s) => {
    const empLogs = filteredStaffLogs.filter((l) => l.Staff_ID === s.id);
    const daysPresent = empLogs.length;
    const completedShifts = empLogs.filter((l) => Boolean(l.Check_Out_Time)).length;
    const totalMins = empLogs.reduce((sum, item) => sum + (Number(item.Duration_Mins) || 0), 0);
    const avgDailyMins = completedShifts > 0 ? Math.round(totalMins / completedShifts) : 0;
    const onTimeCount = empLogs.filter((l) => l.Status.startsWith("ON_TIME")).length;

    return {
      ...s,
      daysPresent,
      completedShifts,
      totalHoursFormatted: formatMinsToHrs(totalMins),
      avgDailyFormatted: formatMinsToHrs(avgDailyMins),
      onTimeCount
    };
  });

  const rooms = ["LT-1", "LT-2", "LT-3", "LT-4", "LT-5"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      {/* Top Header */}
      <div className="bg-[#162b66] text-white py-5 px-6 border-b-4 border-[#f9d200]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#f9d200] tracking-wider">
              Pioneer Academy Bikaner • Management Command
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              Attendance, Punctuality & Shift Duration Portal
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchDashboard(passcode)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-xs transition"
            >
              🔄 Refresh Live Data
            </button>
            <Link
              href="/ops/qr-print"
              className="bg-[#00b4d8] text-white px-4 py-2 rounded-lg font-bold text-xs hover:opacity-90"
            >
              🖨️ Print All 6 QR Posters
            </Link>
          </div>
        </div>
      </div>

      {/* Control Bar: Bifurcated Section Tabs + Date Range Filter */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          {/* Bifurcated Section Toggle */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl gap-2">
            <button
              onClick={() => setActiveTab("ACADEMIC")}
              className={`flex-1 lg:flex-none px-5 py-2.5 rounded-lg font-black text-xs md:text-sm transition ${
                activeTab === "ACADEMIC"
                  ? "bg-[#162b66] text-[#f9d200] shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📚 Academic Faculty (LT-1 to LT-5)
            </button>
            <button
              onClick={() => setActiveTab("NON_ACADEMIC")}
              className={`flex-1 lg:flex-none px-5 py-2.5 rounded-lg font-black text-xs md:text-sm transition ${
                activeTab === "NON_ACADEMIC"
                  ? "bg-[#162b66] text-[#f9d200] shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🏢 Non-Academic Staff (Check-In / Out)
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
              <span className="text-gray-500">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent font-black text-[#162b66] outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
              <span className="text-gray-500">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent font-black text-[#162b66] outline-none"
              />
            </div>

            {/* Quick Presets */}
            <button
              onClick={() => applyPresetRange(0)}
              className="px-3 py-2 rounded-lg bg-blue-50 text-[#162b66] hover:bg-blue-100 transition"
            >
              Today
            </button>
            <button
              onClick={() => applyPresetRange(6)}
              className="px-3 py-2 rounded-lg bg-blue-50 text-[#162b66] hover:bg-blue-100 transition"
            >
              7 Days
            </button>
            <button
              onClick={() => applyPresetRange(29)}
              className="px-3 py-2 rounded-lg bg-blue-50 text-[#162b66] hover:bg-blue-100 transition"
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: ACADEMIC FACULTY VIEW
         ===================================================================== */}
      {activeTab === "ACADEMIC" && (
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
          {/* Live Lecture Theater Feed */}
          <div>
            <h2 className="text-lg font-black text-[#162b66] mb-3 uppercase">
              Live Classroom Status (LT-1 to LT-5)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {rooms.map((room) => {
                const latestRoomScan = filteredAcademicLogs.find((l) => l.Room === room);
                return (
                  <div
                    key={room}
                    className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-lg text-[#162b66]">{room}</span>
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          latestRoomScan?.Action_Type === "START"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {latestRoomScan ? latestRoomScan.Action_Type : "NO SCAN"}
                      </span>
                    </div>
                    {latestRoomScan ? (
                      <div className="text-xs space-y-1 text-gray-600">
                        <p className="font-bold text-gray-900">{latestRoomScan.Teacher_Name}</p>
                        <p>
                          Batch: <strong>{latestRoomScan.Batch}</strong>
                        </p>
                        <p>
                          Logged: <strong>{latestRoomScan.Actual_Time}</strong> (
                          {latestRoomScan.Date_Str})
                        </p>
                        <p className="truncate text-[11px] text-[#00b4d8] font-semibold">
                          Topic: {latestRoomScan.Topic_DPP}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No scan in selected date range.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Teacher Punctuality Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h2 className="text-lg font-black text-[#162b66] uppercase">
                Academic Faculty On-Time % ({startDate} to {endDate})
              </h2>
              <span className="text-xs font-bold text-gray-500">
                Grace Window: &le; 4 mins from scheduled start
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-black border-b">
                    <th className="p-4">Faculty Name</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Classes Scanned</th>
                    <th className="p-4">On-Time Starts</th>
                    <th className="p-4">Avg Start Delay</th>
                    <th className="p-4">Early Exits</th>
                    <th className="p-4">On-Time %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {academicLeaderboard.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/30">
                      <td className="p-4 font-black text-gray-900">{t.name}</td>
                      <td className="p-4 text-gray-500 text-xs font-bold">{t.subject}</td>
                      <td className="p-4 font-bold">{t.totalStarts}</td>
                      <td className="p-4 text-green-700 font-bold">{t.onTimeCount}</td>
                      <td className="p-4 font-bold">+{t.avgDelay} mins</td>
                      <td className="p-4 text-red-600 font-bold">{t.earlyExits}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            t.onTimePct >= 90
                              ? "bg-green-100 text-green-800"
                              : t.onTimePct >= 75
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {t.onTimePct}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Detailed Scan Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-[#162b66] uppercase">
                Academic Classroom Scan Logs ({filteredAcademicLogs.length} Records)
              </h2>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase font-black border-b">
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Room / Batch</th>
                    <th className="p-3">Faculty</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Scheduled</th>
                    <th className="p-3">Status / Delay</th>
                    <th className="p-3">Topic / DPP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAcademicLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 font-bold">
                        {log.Date_Str} • {log.Actual_Time}
                      </td>
                      <td className="p-3 font-black text-[#162b66]">
                        {log.Room} ({log.Batch})
                      </td>
                      <td className="p-3 font-bold">{log.Teacher_Name}</td>
                      <td className="p-3 font-black">{log.Action_Type}</td>
                      <td className="p-3 text-gray-500">
                        {log.Scheduled_Start} - {log.Scheduled_End}
                      </td>
                      <td className="p-3 font-bold">
                        {log.Status} (
                        {Number(log.Delay_Mins) > 0 ? `+${log.Delay_Mins}m` : "0m"})
                      </td>
                      <td className="p-3 text-gray-700">{log.Topic_DPP}</td>
                    </tr>
                  ))}
                  {filteredAcademicLogs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-400 italic">
                        No classroom scans recorded between {startDate} and {endDate}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: NON-ACADEMIC STAFF VIEW
         ===================================================================== */}
      {activeTab === "NON_ACADEMIC" && (
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
          {/* Non-Academic Staff Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h2 className="text-lg font-black text-[#162b66] uppercase">
                Non-Academic Staff Shift Summary ({startDate} to {endDate})
              </h2>
              <span className="text-xs font-bold text-gray-500">
                Editable in Google Sheet &rarr; &ldquo;Staff&rdquo; Tab
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-black border-b">
                    <th className="p-4">Employee Name</th>
                    <th className="p-4">Role / Department</th>
                    <th className="p-4">Assigned Shift</th>
                    <th className="p-4">Days Present</th>
                    <th className="p-4">On-Time Check-Ins</th>
                    <th className="p-4">Total Duration Worked</th>
                    <th className="p-4">Avg Daily Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {staffLeaderboard.map((s) => (
                    <tr key={s.id} className="hover:bg-blue-50/30">
                      <td className="p-4 font-black text-gray-900">{s.name}</td>
                      <td className="p-4 text-gray-500 text-xs font-bold">{s.role}</td>
                      <td className="p-4 text-xs font-bold text-[#162b66]">
                        {s.shiftStart} - {s.shiftEnd}
                      </td>
                      <td className="p-4 font-bold">{s.daysPresent} days</td>
                      <td className="p-4 text-green-700 font-bold">{s.onTimeCount}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-[#162b66] px-3 py-1 rounded-full text-xs font-black">
                          {s.totalHoursFormatted}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-700">{s.avgDailyFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Non-Academic Daily Check-In / Check-Out & Duration Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-[#162b66] uppercase">
                Non-Academic Daily Check-In / Check-Out Logs ({filteredStaffLogs.length} Shifts)
              </h2>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase font-black border-b">
                    <th className="p-3">Date</th>
                    <th className="p-3">Employee Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Check-In Time</th>
                    <th className="p-3">Check-Out Time</th>
                    <th className="p-3">Total Duration</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStaffLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 font-bold">{log.Date_Str}</td>
                      <td className="p-3 font-black text-[#162b66]">{log.Staff_Name}</td>
                      <td className="p-3 text-gray-500 font-semibold">{log.Role}</td>
                      <td className="p-3 font-black text-green-700">{log.Check_In_Time}</td>
                      <td className="p-3 font-black text-red-600">
                        {log.Check_Out_Time || "🟢 Still Working"}
                      </td>
                      <td className="p-3">
                        <span className="bg-yellow-100 text-yellow-900 font-black px-2.5 py-1 rounded-md">
                          {log.Duration_Formatted}
                        </span>
                      </td>
                      <td className="p-3 font-bold">{log.Status}</td>
                      <td className="p-3 text-gray-600">{log.Notes}</td>
                    </tr>
                  ))}
                  {filteredStaffLogs.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-gray-400 italic">
                        No non-academic staff logs recorded between {startDate} and {endDate}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}