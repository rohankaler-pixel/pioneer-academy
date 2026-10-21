"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRPrintPage() {
  const baseUrl = "https://pioneeracademybikaner.com/ops/scan";

  const posters = [
    { room: "STAFF", title: "Non-Academic Staff Office", subtitle: "Daily Shift Check-In & Check-Out" },
    { room: "LT-1", title: "Lecture Theater 1", subtitle: "Target Batch Classroom" },
    { room: "LT-2", title: "Lecture Theater 2", subtitle: "11th English & Hindi Medium" },
    { room: "LT-3", title: "Lecture Theater 3", subtitle: "12th Hindi Medium Batch" },
    { room: "LT-4", title: "Lecture Theater 4", subtitle: "11th Mathematics Batch" },
    { room: "LT-5", title: "Lecture Theater 5", subtitle: "12th English Medium Batch" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <h1 className="text-xl font-black text-[#162b66]">Printable QR Posters (6 Sheets)</h1>
        <button
          onClick={() => window.print()}
          className="bg-[#162b66] text-[#f9d200] font-black px-6 py-3 rounded-xl shadow hover:bg-[#1f3a8a] transition"
        >
          🖨️ Print All Posters (A4)
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 print:block">
        {posters.map((p, idx) => {
          const scanUrl = `${baseUrl}?room=${p.room}`;
          return (
            <div
              key={idx}
              className="bg-white border-4 border-[#162b66] rounded-3xl p-8 text-center shadow-xl break-after-page print:shadow-none print:border-8 print:my-0 print:h-screen print:flex print:flex-col print:justify-between"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#f9d200] bg-[#162b66] py-1.5 px-4 rounded-full inline-block mb-3">
                  Pioneer Academy Bikaner • Geofenced Ops
                </p>
                <h2 className="text-3xl font-black text-[#162b66]">{p.title}</h2>
                <p className="text-sm font-bold text-gray-500 mt-1">{p.subtitle}</p>
              </div>

              <div className="my-8 flex justify-center">
                <div className="p-4 border-4 border-dashed border-[#162b66] rounded-3xl bg-gray-50">
                  <QRCodeSVG value={scanUrl} size={240} level="H" includeMargin={true} />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-xs font-black uppercase text-[#162b66]">How to use:</p>
                <ol className="text-xs text-gray-700 mt-1 space-y-1 font-medium">
                  <li>1. Scan using your smartphone camera.</li>
                  <li>2. Ensure GPS location permission is allowed.</li>
                  <li>3. Select your name &amp; enter your 4-digit PIN.</li>
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}