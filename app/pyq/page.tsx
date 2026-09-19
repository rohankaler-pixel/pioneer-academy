"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PYQHub() {
  const [activeTab, setActiveTab] = useState<'NEET' | 'JEE_MAIN' | 'JEE_ADV'>('NEET');

  const pyqData = {
    NEET: ["2023", "2022", "2021", "2020", "2019"],
    JEE_MAIN: ["2023", "2022", "2021", "2020", "2019"],
    JEE_ADV: ["2023", "2022", "2021", "2020", "2019"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#162b66] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="font-bold text-xl text-[#00b4d8]">PIONEER <span className="text-white font-light">| PYQ Archive</span></Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#162b66] mb-4">Master the Exam Pattern with PYQs</h2>
          <p className="text-lg text-gray-600">The best way to predict the future is to study the past. Access authentic past papers with detailed step-by-step solutions.</p>
        </div>

        {/* Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['NEET', 'JEE_MAIN', 'JEE_ADV'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={`px-8 py-3 font-bold rounded-full transition-colors ${activeTab === tab ? 'bg-[#f9d200] text-[#162b66]' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
            >
              {tab.replace('_', ' ')} Papers
            </button>
          ))}
        </div>

        {/* List of Years */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {pyqData[activeTab].map((year, idx) => (
            <div key={idx} className="flex justify-between items-center p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#162b66]/5 text-[#162b66] font-black rounded-lg flex items-center justify-center text-xl">
                  {year}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{activeTab.replace('_', ' ')} {year} Official Paper & Solutions</h3>
              </div>
              <button className="bg-white border-2 border-[#00b4d8] text-[#00b4d8] font-bold px-6 py-2 rounded-lg hover:bg-[#00b4d8] hover:text-white transition-colors">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}