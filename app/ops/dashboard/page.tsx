"use client";

import React, { useState } from "react";
import Link from "next/link";

const DIRECT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLAhd4FjQV7d-9o39bNi-AiR5TOgc_o0KLVqRFRtFdIKHk1rpC4hvA556f982iP0x7/exec";

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

export default function ManagementDashboard() {
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [teachers, setTeachers] = useState<{ id: string; name: string; subject: string }[]>([]);
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [rangeDays, setRangeDays] = useState<number>(7);

  const fetchDashboard = async (keyToUse: string) => {
    setLoading(true);
    setError("");
    try {
      let res = await fetch(`/api/ops?action=dashboard&key=${encodeURIComponent(keyToUse)}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        res = await fetch(
          `${DIRECT_SCRIPT_URL}?action=dashboard&key=${encodeURIComponent(keyToUse)}`,
          { redirect: "follow", cache: "no-store" }
        );
      }

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
        setTeachers(data.teachers);
        setLogs(data.logs);
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

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - rangeDays);
  const filteredLogs = logs.filter((l) => new Date(l.Timestamp) >= cutoff);

  const leaderboard = teachers.map((t) => {
    const startScans = filteredLogs.filter((l) => l.Teacher_ID === t.id && l.Action_Type === "START");
    const endScans = filteredLogs.filter((l) => l.Teacher_ID === t.id && l.Action_Type === "END");
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

  const rooms = ["LT-1", "LT-2", "LT-3", "LT-4", "LT-5"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <div className="bg-[#162b66] text-white py-5 px-6 border-b-4 border-[#f9d200]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#f9d200] tracking-wider">
              Management Analytics Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              Faculty Class On-Time & Hygiene Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "Today", days: 1 },
              { label: "7 Days", days: 7 },
              { label: "30 Days", days: 30 }
            ].map((period) => (
              <button
                key={period.days}
                onClick={() => setRangeDays(period.days)}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition ${
                  rangeDays === period.days
                    ? "bg-[#f9d200] text-[#162b66]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {period.label}
              </button>
            ))}
            <Link
              href="/ops/qr-print"
              className="bg-[#00b4d8] text-white px-4 py-2 rounded-lg font-bold text-xs hover:opacity-90"
            >
              🖨️ Print Room QRs
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        <div>
          <h2 className="text-lg font-black text-[#162b66] mb-3 uppercase">
            Live Classroom Feed (LT-1 to LT-5)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {rooms.map((room) => {
              const latestRoomScan = logs.find((l) => l.Room === room);
              return (
                <div key={room} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
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
                      <p>Batch: <strong>{latestRoomScan.Batch}</strong></p>
                      <p>Logged: <strong>{latestRoomScan.Actual_Time}</strong> ({latestRoomScan.Status})</p>
                      <p className="truncate text-[11px] text-[#00b4d8] font-semibold">
                        Topic: {latestRoomScan.Topic_DPP}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No activity logged yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-black text-[#162b66] uppercase">
              Teacher On-Time % Leaderboard (Last {rangeDays} Days)
            </h2>
            <span className="text-xs font-bold text-gray-500">Grace Window: &le; 4 mins</span>
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
                {leaderboard.map((t) => (
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
      </div>
    </div>
  );
}