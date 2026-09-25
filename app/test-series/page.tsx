"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

export default function TestSeriesPage() {
  const [formData, setFormData] = useState({
    studentName: '', mobile: '', grade: '', batch: 'Test_Series'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbwnYj4OD4L6w3gH0h-ANEMuQMYY-OcgIByIhx6EnK4lXTisRKMakdHgmhHKKHHYpOjQ0Q/exec";
    
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      setSubmitStatus('Success! We will contact you shortly with test details.');
      setFormData({ studentName: '', mobile: '', grade: '', batch: 'Test_Series' });
    } catch (error) {
      setSubmitStatus('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      {/* Top Contact Bar */}
      <div className="bg-[#0d1a40] text-gray-200 text-xs md:text-sm py-2 px-4 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#f9d200]">📞 Helpline:</span> 
            <span>8302224782</span> • <span>7891002402</span> • <span>7891002403</span>
          </div>
          <div className="font-bold text-[#f9d200] tracking-wide bg-white/10 px-3 py-1 rounded-full">
            हिंदी और English माध्यम उपलब्ध
          </div>
        </div>
      </div>

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
            <Link href="/pyq" className="hover:text-[#f9d200] transition-colors">PYQs</Link>
          </div>
        </div>
      </nav>

      {/* Hero / Form Section */}
      <section className="bg-gradient-to-br from-[#162b66] to-[#0d1a40] text-white pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white/10 text-[#f9d200] px-4 py-1 rounded-full text-sm font-bold tracking-wide border border-[#f9d200]/30">
              All India Level Mock Tests
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Pioneer Test Series for NEET & JEE
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Test your preparation against the best minds in Bikaner and across India. Get detailed performance analytics, video solutions, and pinpoint your weaknesses before the actual exam.
            </p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00b4d8] flex items-center justify-center font-bold">✓</div>
                <span className="font-medium text-lg">Strict NCERT & NTA Pattern</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00b4d8] flex items-center justify-center font-bold">✓</div>
                <span className="font-medium text-lg">Detailed Subject-wise Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00b4d8] flex items-center justify-center font-bold">✓</div>
                <span className="font-medium text-lg">Real Exam Simulation</span>
              </li>
            </ul>
          </div>

          {/* Test Series Registration Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800 border-t-4 border-[#f9d200]">
            <h3 className="text-2xl font-black text-center text-[#162b66] mb-2">Register for Test Series</h3>
            <p className="text-center text-gray-500 text-sm mb-6">Fill out the details to get your test schedule and access.</p>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
                <input type="text" name="studentName" required value={formData.studentName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#162b66] outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" name="mobile" pattern="[0-9]{10}" required value={formData.mobile} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#162b66] outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Current Grade / Target</label>
                <select name="grade" required value={formData.grade} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#162b66] outline-none">
                  <option value="">Select Class</option>
                  <option value="11th">Class 11th</option>
                  <option value="12th">Class 12th</option>
                  <option value="Dropper">Dropper</option>
                </select>
              </div>
              
              {/* Hidden input to lock the batch strictly to Test Series */}
              <input type="hidden" name="batch" value="Test_Series" />

              <button disabled={isSubmitting} type="submit" className="w-full bg-[#162b66] text-white font-bold text-lg py-4 rounded-lg hover:bg-blue-900 transition-colors mt-2 shadow-lg">
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </button>
              {submitStatus && <p className="text-center font-bold text-green-600 mt-2">{submitStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1a40] text-gray-300 py-12 px-4 border-t-4 border-[#f9d200] mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#f9d200] text-[#162b66] rounded-full flex items-center justify-center font-bold text-lg italic">π</div>
              <h2 className="font-bold text-2xl tracking-wider text-[#00b4d8]">PIONEER <span className="text-[#f9d200]">ACADEMY</span></h2>
            </div>
            <p className="text-sm text-gray-400">Bikaner&apos;s premier coaching institute for JEE Main, Advanced, NEET, and Foundation preparation.</p>
          </div>
          <div className="md:text-right">
            <h4 className="font-bold text-white mb-2 text-lg">Contact & Admissions</h4>
            <p className="mb-1 text-sm">Near City Dispensary No. 6, Outside Nathusar Gate, Bikaner</p>
            <p className="text-[#f9d200] font-bold text-lg mt-3 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4">
              <span>8302224782</span>
              <span className="hidden sm:inline">|</span>
              <span>7891002402</span>
              <span className="hidden sm:inline">|</span>
              <span>7891002403</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}