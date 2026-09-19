import React from 'react';
import Link from 'next/link';

export default function JEEProgram() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#162b66] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <Link href="/" className="font-bold text-xl text-[#00b4d8]">PIONEER <span className="text-white font-light">| Programs</span></Link>
          <Link href="/#register" className="bg-[#f9d200] text-[#162b66] px-4 py-1 rounded font-bold">Apply Now</Link>
        </div>
      </nav>

      <section className="bg-white py-16 px-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold tracking-wide mb-4">IIT-JEE (Main + Advanced)</div>
          <h1 className="text-4xl md:text-5xl font-black text-[#162b66] mb-6">Engineer Your Future</h1>
          <p className="text-xl text-gray-600 mb-8">Rigorous preparation focused on advanced problem-solving, deep mathematical applications, and conceptual clarity required to crack the IITs.</p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-8">Program Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Advanced Problem Solving</h3>
             <p className="text-gray-600 text-sm">Transitioning students from rote memorization to multi-concept application required for JEE Advanced.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Computer Based Tests (CBT)</h3>
             <p className="text-gray-600 text-sm">Practice in our digital labs to get comfortable with the official online testing environment.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Doubt Clearing Desks</h3>
             <p className="text-gray-600 text-sm">Dedicated sessions to resolve complex algebraic and physical chemistry doubts one-on-one.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Comprehensive Study Material</h3>
             <p className="text-gray-600 text-sm">Tiered question banks starting from Main level and progressing to Advanced level difficulty.</p>
           </div>
        </div>
      </section>
    </div>
  );
}