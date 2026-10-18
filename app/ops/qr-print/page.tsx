"use client";

import React from "react";

const ROOMS = [
  { room: "LT-1", subtitle: "Target (Repeater) Batch" },
  { room: "LT-2", subtitle: "Class 11th (English & Hindi Medium)" },
  { room: "LT-3", subtitle: "Class 12th (Hindi Medium)" },
  { room: "LT-4", subtitle: "Class 11th (Mathematics)" },
  { room: "LT-5", subtitle: "Class 12th (English Medium)" }
];

export default function PrintableQRPosters() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden bg-[#162b66] text-white p-4 rounded-xl">
        <div>
          <h1 className="text-xl font-black">Classroom QR Code Generator (LT-1 to LT-5)</h1>
          <p className="text-xs text-gray-300">
            Print and laminate these 5 sheets. Paste next to the whiteboard in each Lecture Theater.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-[#f9d200] text-[#162b66] px-5 py-2.5 rounded-lg font-black text-sm shadow-md"
        >
          🖨️ Print All Posters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto print:grid-cols-2">
        {ROOMS.map((item) => {
          const scanUrl = `https://pioneeracademybikaner.com/ops/scan?room=${item.room}`;
          const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(
            scanUrl
          )}`;

          return (
            <div
              key={item.room}
              className="bg-white border-4 border-[#162b66] rounded-3xl p-8 text-center shadow-lg flex flex-col items-center justify-between break-inside-avoid"
            >
              <div className="w-full bg-[#162b66] text-white py-3 px-4 rounded-2xl mb-4 border-b-4 border-[#f9d200]">
                <p className="text-xs font-bold text-[#f9d200] uppercase tracking-widest">
                  Pioneer Academy Bikaner
                </p>
                <h2 className="text-4xl font-black mt-1">{item.room}</h2>
                <p className="text-xs text-gray-200 font-semibold mt-0.5">{item.subtitle}</p>
              </div>

              {/* QR Image */}
              <div className="p-3 border-2 border-dashed border-gray-300 rounded-2xl my-2">
                <img
                  src={qrImgSrc}
                  alt={`QR Code for ${item.room}`}
                  className="w-56 h-56 object-contain"
                />
              </div>

              <div className="mt-4 space-y-1 text-xs text-gray-700 font-bold bg-gray-50 p-3 rounded-xl w-full border border-gray-200">
                <p className="text-[#162b66] font-black text-sm">
                  FACULTY ATTENDANCE & SYLLABUS LOG
                </p>
                <p>1. कक्षा शुरू करते समय स्कैन करें और 🟢 START दबाएं।</p>
                <p>2. कक्षा समाप्त होने पर पुनः स्कैन करें और 🔴 END दबाएं।</p>
                <p className="text-[10px] text-gray-400 pt-1">{scanUrl}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}