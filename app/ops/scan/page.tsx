"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const OPS_API_URL =
  process.env.NEXT_PUBLIC_PIONEER_OPS_API ||
  "https://script.google.com/macros/s/AKfycbzLAhd4FjQV7d-9o39bNi-AiR5TOgc_o0KLVqRFRtFdIKHk1rpC4hvA556f982iP0x7/exec";


// Exact Pioneer Academy Bikaner Coordinates
const ACADEMY_LAT = 28.011928;
const ACADEMY_LNG = 73.292024;
const MAX_ALLOWED_METERS = 65; // 65m radius buffer for indoor mobile GPS drift

interface SlotItem {
  Slot_ID: string;
  Days: string;
  Room: string;
  Batch: string;
  Start_Time: string;
  End_Time: string;
  Teacher_ID: string;
  Subject_Note: string;
}

interface TeacherItem {
  id: string;
  name: string;
  subject: string;
}

function calculateMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function ScannerContent() {
  const searchParams = useSearchParams();
  const roomParam = (searchParams.get("room") || "LT-1").toUpperCase();

  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");

  // GPS State
  const [distanceMeters, setDistanceMeters] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string>("");
  const [checkingGps, setCheckingGps] = useState<boolean>(true);

  // Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [resultBanner, setResultBanner] = useState<{ ok: boolean; text: string } | null>(null);

  // 1. Initialize Device Fingerprint & Saved Teacher Credentials
  useEffect(() => {
    let devId = localStorage.getItem("pioneer_device_id");
    if (!devId) {
      devId = "DEV-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("pioneer_device_id", devId);
    }
    setDeviceId(devId);

    const savedTeacher = localStorage.getItem("pioneer_teacher_id");
    const savedPin = localStorage.getItem("pioneer_teacher_pin");
    if (savedTeacher) setSelectedTeacherId(savedTeacher);
    if (savedPin) setPin(savedPin);
  }, []);

  // 2. Verify GPS Location on Mobile Data
  const verifyGpsLocation = () => {
    setCheckingGps(true);
    setGpsError("");
    if (!navigator.geolocation) {
      setGpsError("GPS is not supported by your browser.");
      setCheckingGps(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = calculateMeters(
          pos.coords.latitude,
          pos.coords.longitude,
          ACADEMY_LAT,
          ACADEMY_LNG
        );
        setDistanceMeters(dist);
        setCheckingGps(false);
      },
      () => {
        setGpsError("Please allow Location Access on your phone to log class attendance.");
        setCheckingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    verifyGpsLocation();
  }, []);

  // 3. Fetch Room Schedule from Master Google Sheet
  useEffect(() => {
    async function loadRoomData() {
      try {
        const res = await fetch(`${OPS_API_URL}?action=room_info&room=${roomParam}`);
        const data = await res.json();
        if (data.ok) {
          setSlots(data.slots);
          setTeachers(data.teachers);

          // Auto-select the slot closest to current time
          const now = new Date();
          const nowMins = now.getHours() * 60 + now.getMinutes();
          let bestSlot = data.slots[0]?.Slot_ID || "";
          let minDiff = 9999;

          data.slots.forEach((s: SlotItem) => {
            const [sh, sm] = s.Start_Time.split(":").map(Number);
            const [eh, em] = s.End_Time.split(":").map(Number);
            const startM = sh * 60 + sm;
            const endM = eh * 60 + em;
            if (nowMins >= startM - 15 && nowMins <= endM + 15) {
              const diff = Math.abs(nowMins - startM);
              if (diff < minDiff) {
                minDiff = diff;
                bestSlot = s.Slot_ID;
              }
            }
          });
          setSelectedSlotId(bestSlot);

          // If no saved teacher, auto-fill scheduled teacher
          const matchedSlot = data.slots.find((s: SlotItem) => s.Slot_ID === bestSlot);
          if (matchedSlot && !localStorage.getItem("pioneer_teacher_id")) {
            setSelectedTeacherId(matchedSlot.Teacher_ID);
          }
        }
      } catch {
        // Fallback if API URL not yet configured
      }
    }
    loadRoomData();
  }, [roomParam]);

  const activeSlot = slots.find((s) => s.Slot_ID === selectedSlotId);
  const insideGeofence = distanceMeters !== null && distanceMeters <= MAX_ALLOWED_METERS;

  const handleScanSubmit = async (actionType: "START" | "END") => {
    if (!activeSlot || !selectedTeacherId || !pin) {
      setResultBanner({ ok: false, text: "Please select your name and enter your 4-digit PIN." });
      return;
    }
    if (!insideGeofence) {
      setResultBanner({ ok: false, text: "You are outside Pioneer Academy campus radius." });
      return;
    }

    setSubmitting(true);
    setResultBanner(null);

    // Save teacher credentials on their phone for 1-tap future check-ins
    localStorage.setItem("pioneer_teacher_id", selectedTeacherId);
    localStorage.setItem("pioneer_teacher_pin", pin);

    try {
      const res = await fetch(OPS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          room: roomParam,
          slotId: activeSlot.Slot_ID,
          batch: activeSlot.Batch,
          scheduledStart: activeSlot.Start_Time,
          scheduledEnd: activeSlot.End_Time,
          teacherId: selectedTeacherId,
          pin,
          actionType,
          topic,
          distanceMeters,
          deviceId
        })
      });
      const data = await res.json();
      if (data.ok) {
        setResultBanner({ ok: true, text: `✓ ${data.message}` });
        setTopic("");
      } else {
        setResultBanner({ ok: false, text: data.error || "Submission failed" });
      }
    } catch {
      setResultBanner({ ok: false, text: "Network error. Please check your mobile data." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1a40] text-white flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Header */}
      <div>
        <div className="bg-[#162b66] border-b-4 border-[#f9d200] rounded-2xl p-4 shadow-lg flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-[#f9d200] uppercase tracking-wider">
              Pioneer Academy Classroom Ops
            </p>
            <h1 className="text-2xl font-black">Room: {roomParam}</h1>
          </div>
          <div className="bg-[#f9d200] text-[#162b66] font-black px-3 py-1.5 rounded-xl text-sm">
            LIVE QR
          </div>
        </div>

        {/* GPS Geofence Verification Pill */}
        <div
          className={`rounded-xl p-3 mb-5 border flex items-center justify-between text-xs font-bold ${
            checkingGps
              ? "bg-blue-950 border-blue-700 text-blue-200"
              : insideGeofence
              ? "bg-green-950/80 border-green-500 text-green-300"
              : "bg-red-950/80 border-red-500 text-red-300"
          }`}
        >
          <div>
            {checkingGps && "📍 Verifying Campus GPS Coordinates..."}
            {!checkingGps && gpsError && `⚠️ ${gpsError}`}
            {!checkingGps && !gpsError && insideGeofence && (
              <span>✓ Inside Pioneer Campus ({distanceMeters}m from center)</span>
            )}
            {!checkingGps && !gpsError && !insideGeofence && (
              <span>
                ❌ Outside Campus ({distanceMeters}m away • Max {MAX_ALLOWED_METERS}m)
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={verifyGpsLocation}
            className="underline ml-2 text-[#f9d200] whitespace-nowrap"
          >
            Retry GPS
          </button>
        </div>

        {/* Main Scanner Form Card */}
        <div className="bg-white text-gray-900 rounded-2xl p-5 shadow-2xl space-y-4">
          {/* 1. Scheduled Lecture Slot */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">
              1. Active Class Slot ({roomParam})
            </label>
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold text-sm bg-gray-50 focus:border-[#162b66] outline-none"
            >
              {slots.map((s) => (
                <option key={s.Slot_ID} value={s.Slot_ID}>
                  {s.Start_Time} - {s.End_Time} | {s.Batch} ({s.Subject_Note})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Teacher Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">
              2. Faculty Name
            </label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold text-sm bg-gray-50 focus:border-[#162b66] outline-none"
            >
              <option value="">-- Select Teacher --</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.subject})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Secret 4-Digit PIN */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">
              3. Faculty 4-Digit PIN (Auto-Saved on Phone)
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 font-black text-center tracking-widest text-lg bg-gray-50 focus:border-[#162b66] outline-none"
            />
          </div>

          {/* 4. Topic / DPP Covered */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">
              4. Sub-Topic Taught / DPP Assigned (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Rotational Motion L-4 / DPP #12"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm bg-gray-50 focus:border-[#162b66] outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              disabled={submitting || !insideGeofence}
              onClick={() => handleScanSubmit("START")}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-black py-4 rounded-xl shadow-lg text-base transition active:scale-95"
            >
              🟢 START CLASS
            </button>
            <button
              type="button"
              disabled={submitting || !insideGeofence}
              onClick={() => handleScanSubmit("END")}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-black py-4 rounded-xl shadow-lg text-base transition active:scale-95"
            >
              🔴 END CLASS
            </button>
          </div>

          {/* Result Status Banner */}
          {resultBanner && (
            <div
              className={`p-3 rounded-xl text-center font-bold text-sm ${
                resultBanner.ok
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {resultBanner.text}
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 mt-6">
        Device Token: {deviceId} • Geofence Lock: 28.011928, 73.292024
      </p>
    </div>
  );
}

export default function QRScannerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading Scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}