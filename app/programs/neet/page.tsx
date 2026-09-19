import React from 'react';
import Link from 'next/link';

export default function NEETProgram() {
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
          <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold tracking-wide mb-4">NEET (UG)</div>
          <h1 className="text-4xl md:text-5xl font-black text-[#162b66] mb-6">Your Path to Top Medical Colleges</h1>
          <p className="text-xl text-gray-600 mb-8">An intensive, NCERT-focused curriculum covering Physics, Chemistry, and Biology, designed to maximize your speed and accuracy on exam day.</p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-8">Program Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">NCERT Mastery</h3>
             <p className="text-gray-600 text-sm">Line-by-line breakdown of NCERT Biology, as 90% of the questions are directly sourced from the text.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Conceptual Physics</h3>
             <p className="text-gray-600 text-sm">Simplifying complex mechanics and electromagnetism concepts to ensure high scoring in the toughest section.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">Daily Practice Papers (DPPs)</h3>
             <p className="text-gray-600 text-sm">Targeted daily assignments to build muscle memory for objective-type problem solving.</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg text-[#162b66] mb-2">All India Test Series</h3>
             <p className="text-gray-600 text-sm">Regular full-syllabus mock tests mimicking the exact NTA pattern to build exam temperament.</p>
           </div>
        </div>
      </section>
    </div>
  );
}