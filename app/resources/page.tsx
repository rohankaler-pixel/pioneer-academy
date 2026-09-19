"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    // Here you would trigger the webhook to save the lead to Google Sheets
    setIsUnlocked(true);
  };

  const resources = [
    { title: "Physics: Kinematics Formula Sheet", exam: "JEE & NEET" },
    { title: "Chemistry: Organic Reaction Maps", exam: "JEE & NEET" },
    { title: "Biology: NCERT Highlighters Vol 1", exam: "NEET" },
    { title: "Mathematics: Integration Shortcuts", exam: "JEE" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#162b66] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="font-bold text-xl text-[#00b4d8]">PIONEER <span className="text-white font-light">| Resources</span></Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl font-black text-[#162b66] mb-4">Unlock Your Potential with Free Resources</h2>
        <p className="text-lg text-gray-600 mb-12">Get a taste of Pioneer’s premium content. Download expert-curated notes to kickstart your preparation today.</p>

        {!isUnlocked ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-t-4 border-[#f9d200]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Access Free Notes Library</h3>
            <p className="text-sm text-gray-500 mb-6">Enter your details to instantly unlock all PDF study materials.</p>
            <form onSubmit={handleUnlock} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
                <input type="tel" pattern="[0-9]{10}" required value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
              <button type="submit" className="w-full bg-[#162b66] text-white font-bold text-lg py-3 rounded-lg hover:bg-blue-900">Unlock PDFs Now</button>
            </form>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {resources.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white bg-[#00b4d8] px-2 py-1 rounded mb-2 inline-block">{res.exam}</span>
                  <h4 className="font-bold text-gray-900">{res.title}</h4>
                </div>
                <button className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-200 text-sm">Download</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}