"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type ExamCategory = 'NEET' | 'JEE_ADV';

interface PaperItem {
  year: number;
  title: string;
  driveUrl: string; 
}

const pyqData: Record<ExamCategory, PaperItem[]> = {
  NEET: [
    { year: 2025, title: "NEET 2025 Official Paper & Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2024, title: "NEET 2024 Official Paper & Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2023, title: "NEET 2023 Official Paper & Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2022, title: "NEET 2022 Official Paper & Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2021, title: "NEET 2021 Official Paper & Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
  ],
  JEE_ADV: [
    { year: 2025, title: "JEE Advanced 2025 Paper 1 & 2 Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2024, title: "JEE Advanced 2024 Paper 1 & 2 Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2023, title: "JEE Advanced 2023 Paper 1 & 2 Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2022, title: "JEE Advanced 2022 Paper 1 & 2 Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
    { year: 2021, title: "JEE Advanced 2021 Paper 1 & 2 Solutions", driveUrl: "https://drive.google.com/drive/folders/1pQZW-aWkNVFxMu9u1C6zOFazKoYZXiqi" },
  ]
};

export default function PYQPage() {
  const [activeTab, setActiveTab] = useState<ExamCategory>('NEET');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="bg-[#162b66] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#f9d200] text-[#162b66] rounded-full flex items-center justify-center font-bold text-xl italic">π</div>
            <div>
              <h1 className="font-bold text-2xl tracking-wider text-[#00b4d8]">PIONEER</h1>
              <p className="text-xs text-[#f9d200] font-semibold tracking-widest uppercase">Academy</p>
            </div>
          </Link>
          <div className="hidden md:flex gap-6 font-medium items-center">
            <Link href="/programs/neet" className="hover:text-[#f9d200] transition-colors">NEET</Link>
            <Link href="/programs/jee" className="hover:text-[#f9d200] transition-colors">JEE</Link>
            <Link href="/resources" className="hover:text-[#f9d200] transition-colors">Free Material</Link>
            <Link href="/pyq" className="text-[#f9d200] font-bold">PYQs</Link>
            <Link href="/test-series" className="bg-[#f9d200] text-[#162b66] px-4 py-2 rounded-md hover:bg-yellow-500 font-bold transition-colors">Test Series</Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="bg-[#162b66] text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-3">Previous Year Question Papers</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Master the exam pattern with authentic past 5-year question papers and comprehensive step-by-step solutions verified by Pioneer faculty.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('NEET')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-200 shadow-sm ${
              activeTab === 'NEET'
                ? 'bg-[#f9d200] text-[#162b66] shadow-md scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            NEET Papers
          </button>
          <button
            onClick={() => setActiveTab('JEE_ADV')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-200 shadow-sm ${
              activeTab === 'JEE_ADV'
                ? 'bg-[#f9d200] text-[#162b66] shadow-md scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            JEE ADV Papers
          </button>
        </div>

        {/* Paper List Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {pyqData[activeTab].map((item) => (
            <div
              key={item.year}
              className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
            >
              <div className="flex items-center gap-5">
                <span className="bg-blue-50 text-[#162b66] font-extrabold text-xl px-4 py-2 rounded-xl">
                  {item.year}
                </span>
                <h3 className="font-bold text-gray-900 text-lg md:text-xl">
                  {item.title}
                </h3>
              </div>
              <a
                href={item.driveUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center border-2 border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
              >
                Access Papers
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}