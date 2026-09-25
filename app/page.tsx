"use client";

import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const [formData, setFormData] = useState({
    studentName: '', mobile: '', grade: '', batch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically calculate the academic year based on the June 1st rule
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    if (now.getMonth() >= 5) {
      setAcademicYear(`${currentYear}-${(currentYear + 1).toString().slice(-2)}`);
    } else {
      setAcademicYear(`${currentYear - 1}-${currentYear.toString().slice(-2)}`);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'grade') {
      // Reset the batch when the grade changes so they don't submit an invalid combination
      setFormData({ ...formData, grade: value, batch: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTestSeriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Pre-fill the batch as Test Series and scroll to the form
    setFormData(prev => ({ ...prev, batch: 'Test_Series' }));
    document.getElementById('counseling-form')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
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
      
      setSubmitStatus('Success! We will contact you shortly.');
      setFormData({ studentName: '', mobile: '', grade: '', batch: '' });
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
      <nav className="bg-[#162b66] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#f9d200] text-[#162b66] rounded-full flex items-center justify-center font-bold text-xl italic">π</div>
            <div>
              <h1 className="font-bold text-2xl tracking-wider text-[#00b4d8] leading-none">PIONEER</h1>
              <p className="text-[10px] text-[#f9d200] font-bold tracking-[0.2em] uppercase leading-tight">Academy</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 font-medium items-center">
            <Link href="/programs/neet" className="hover:text-[#f9d200] transition-colors">NEET</Link>
            <Link href="/programs/jee" className="hover:text-[#f9d200] transition-colors">JEE</Link>
            <Link href="/resources" className="hover:text-[#f9d200] transition-colors">Free Material</Link>
            <Link href="/pyq" className="hover:text-[#f9d200] transition-colors">PYQs</Link>
            <button onClick={handleTestSeriesClick} className="bg-[#f9d200] text-[#162b66] px-4 py-2 rounded-md hover:bg-yellow-500 font-bold transition-colors">
              Test Series
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-white focus:outline-none p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0d1a40] border-t border-blue-900 px-4 py-6 flex flex-col gap-6 font-medium text-lg shadow-inner">
            <Link href="/programs/neet" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#f9d200]">NEET</Link>
            <Link href="/programs/jee" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#f9d200]">JEE</Link>
            <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#f9d200]">Free Material</Link>
            <Link href="/pyq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#f9d200]">PYQs</Link>
            <button onClick={handleTestSeriesClick} className="text-left bg-[#f9d200] text-[#162b66] px-4 py-3 rounded-md font-bold mt-2">
              Book Test Series
            </button>
          </div>
        )}
      </nav>

      {/* Wall of Fame Banner */}
      <section className="bg-white py-12 px-4 border-b-4 border-[#f9d200]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#162b66] mb-2 uppercase tracking-tight">
            Our Result Speaks For Itself
          </h2>
          <p className="text-[#00b4d8] font-black text-xl md:text-2xl mb-8">
            Best Results in Bikaner
          </p>

          <div className="flex flex-col gap-8">
            {/* Top Row: NEET & JEE Achievers */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* NEET Achievers */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-md">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-[#162b66] mb-2">NEET Achievers</h3>
                  <p className="text-sm text-gray-500 font-bold">बीकानेर से NEET में एक और सफलता की उड़ान !</p>
                </div>
                <div className="flex justify-around items-start">
                  <div className="text-center group flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#f9d200] overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform bg-gray-200">
                      <Image src="/urmila.png" alt="Urmila" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#162b66] text-white rounded-full px-3 py-1 text-xs font-bold mb-1 w-max">AIR 7231</div>
                    <p className="font-black text-gray-900 text-lg">Urmila</p>
                  </div>
                  <div className="text-center group flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#f9d200] overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform bg-gray-200">
                      <Image src="/kanishka.png" alt="Kanishka" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#162b66] text-white rounded-full px-3 py-1 text-xs font-bold mb-1 w-max">AIR 4771</div>
                    <p className="font-black text-gray-900 text-lg">Kanishka</p>
                  </div>
                </div>
              </div>

              {/* JEE Achievers */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-md">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-[#162b66] mb-2">JEE Achievers</h3>
                  <p className="text-sm text-gray-500 font-bold">Engineered for Excellence !</p>
                </div>
                <div className="flex justify-around items-start">
                  <div className="text-center group flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#00b4d8] overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform bg-gray-200">
                      <Image src="/rahan.png" alt="Rahan" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#162b66] text-white rounded-full px-3 py-1 text-xs font-bold mb-1 w-max">97.29 PR</div>
                    <p className="font-black text-gray-900 text-lg">Rahan</p>
                  </div>
                  <div className="text-center group flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#00b4d8] overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform bg-gray-200">
                      <Image src="/jai-vardhan-singh-rajvi.png" alt="Jai Vardhan Singh Rajvi" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#162b66] text-white rounded-full px-3 py-1 text-xs font-bold mb-1 w-max">95.59 PR</div>
                    <p className="font-black text-gray-900 text-lg leading-tight">Jai Vardhan<br/>Singh Rajvi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Class XII */}
            <div className="bg-gradient-to-b from-yellow-50 to-white rounded-2xl p-6 border border-yellow-200 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b-2 border-yellow-200 pb-4">
                <h3 className="text-xl font-black text-[#162b66]">Class XII Result (2024-25)</h3>
                <p className="text-sm text-red-600 font-bold bg-white px-4 py-1.5 rounded-full border border-red-100 mt-2 sm:mt-0 shadow-sm">
                  हर दूसरा विद्यार्थी 80% पार !
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { name: "Kalpana Soni", score: "97.00%", img: "kalpana-soni" },
                  { name: "Lakshay Gautam", score: "96.83%", img: "lakshay-gautam" },
                  { name: "Aashish Sethia", score: "96.40%", img: "aashish-sethia" },
                  { name: "Aaditya", score: "92.00%", img: "aaditya" },
                  { name: "Prerna Sankhla", score: "92.00%", img: "prerna-sankhla" },
                  { name: "Vivek Meena", score: "91.82%", img: "vivek-meena" },
                  { name: "Abhishek Bohra", score: "90.08%", img: "abhishek-bohra" },
                  { name: "Manmath Vyas", score: "90.00%", img: "manmath-vyas" }
                ].map((student, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:border-[#f9d200] hover:shadow-md transition-all text-center flex flex-col items-center group">
                    <div className="w-16 h-16 rounded-full border-2 border-[#162b66] overflow-hidden mb-2 group-hover:scale-105 transition-transform bg-gray-200">
                      <Image src={`/${student.img}.png`} alt={student.name} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[#162b66] font-black text-lg leading-none mb-1">{student.score}</div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide leading-tight">{student.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Hero Section (Added ID for scrolling) */}
      <section id="counseling-form" className="bg-gradient-to-br from-[#162b66] to-[#0d1a40] text-white pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white/10 text-[#f9d200] px-4 py-1 rounded-full text-sm font-bold tracking-wide border border-[#f9d200]/30">
              Admissions Open {academicYear}
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Realize Your IIT & NEET Dreams with Bikaner’s Premier Academy.
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Expert faculty, personalized attention, and a proven track record. We empower ambitious students to crack highly competitive exams through a supportive and rigorous learning environment.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="#programs" className="bg-[#f9d200] text-[#162b66] px-6 py-3 rounded-md font-bold text-lg hover:bg-yellow-500 transition shadow-lg">Explore Courses</Link>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800 border-t-4 border-[#f9d200]">
            <h3 className="text-2xl font-black text-center text-[#162b66] mb-2">Book Free Counseling</h3>
            <p className="text-center text-gray-500 text-sm mb-6">Take the first step towards your dream college.</p>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
                <input type="text" name="studentName" required value={formData.studentName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#162b66] outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" name="mobile" pattern="[0-9]{10}" required value={formData.mobile} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#162b66] outline-none transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Current Grade</label>
                  <select name="grade" required value={formData.grade} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#162b66] outline-none">
                    <option value="">Select</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Target Batch</label>
                  <select name="batch" required value={formData.batch} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#162b66] outline-none text-sm">
                    <option value="">Select</option>
                    
                    {/* Dynamic Batch Options based on Grade */}
                    {(formData.grade === '9th' || formData.grade === '10th') && (
                      <option value="Foundation">Foundation (9/10)</option>
                    )}
                    {formData.grade === '11th' && (
                      <>
                        <option value="JEE_2_Year">JEE 2 Year</option>
                        <option value="NEET_2_Year">NEET 2 Year</option>
                      </>
                    )}
                    {formData.grade === '12th' && (
                      <>
                        <option value="JEE_1_Year">JEE 1 Year</option>
                        <option value="NEET_1_Year">NEET 1 Year</option>
                      </>
                    )}
                    {formData.grade === 'Dropper' && (
                      <>
                        <option value="JEE_Target">JEE Target</option>
                        <option value="NEET_Target">NEET Target</option>
                      </>
                    )}
                    
                    {/* Persist Test Series if selected via button, regardless of grade */}
                    {formData.batch === 'Test_Series' && (
                      <option value="Test_Series">Test Series</option>
                    )}
                  </select>
                </div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#162b66] text-white font-bold text-lg py-4 rounded-lg hover:bg-blue-900 transition-colors mt-2 shadow-lg">
                {isSubmitting ? 'Requesting...' : 'Get Callback'}
              </button>
              {submitStatus && <p className="text-center font-bold text-green-600 mt-2">{submitStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* 2. The Pioneer Pedagogy */}
      <section className="py-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#162b66] mb-4">The Pioneer Advantage: Engineered for Success</h2>
          <div className="w-24 h-1.5 bg-[#f9d200] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Expert-Led Concept Mastery", desc: "Learn directly from subject matter experts who break down complex topics into high-scoring concepts." },
            { title: "Small Batch Sizes", desc: "No overcrowded halls. We strictly limit batch sizes to ensure every student gets individual attention." },
            { title: "Continuous Assessment", desc: "Track progress with weekly tests and detailed performance analytics to identify weak points." },
            { title: "Comprehensive Ecosystem", desc: "From state-of-the-art modern classrooms to complete study materials for a competitive edge." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#00b4d8]/10 text-[#00b4d8] rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">✓</div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Leadership & Vision (Completely Redesigned) */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#162b66] mb-4">Guided by Visionaries</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Pioneer Academy is led by educators with a collective experience of over 40 years, tailored specifically to bring top-tier competitive coaching to the students of Bikaner.</p>
            <div className="w-24 h-1.5 bg-[#f9d200] mx-auto rounded-full mt-6"></div>
          </div>
          
          {/* Highlight: Patron / Mentor */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border-t-8 border-[#162b66] max-w-3xl mx-auto mb-16 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#f9d200] shadow-md bg-gray-200">
              <Image
                src="/narendra-shekhawat.png"
                alt="Dr. Narendra Shekhawat"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">Dr. Narendra Shekhawat</h3>
              <p className="text-[#00b4d8] font-black text-lg mb-4 uppercase tracking-wide">Patron / Mentor</p>
              <p className="text-gray-600 leading-relaxed text-base">Renowned for his educational philosophy and absolute dedication to bringing top-tier, structured competitive coaching to the students of Bikaner. His vision shapes the pedagogical excellence at Pioneer Academy.</p>
            </div>
          </div>

          {/* HODs Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#162b66]">Heads of Department</h3>
            <p className="text-sm text-gray-500 font-bold mt-2">Decades of combined expertise</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Mr. Girish Sharma", role: "HOD Physics" },
              { name: "Mr. Sumit Yogi", role: "HOD Biology" },
              { name: "Mr. Ashish Bissa", role: "HOD Mathematics" },
              { name: "Mr. Jai Dhaiya", role: "HOD Chemistry" }
            ].map((hod, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:border-[#00b4d8] hover:shadow-md transition-all">
                <h4 className="text-lg font-black text-gray-900 mb-1">{hod.name}</h4>
                <p className="text-sm font-bold text-[#00b4d8]">{hod.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Programs */}
      <section id="programs" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#162b66] mb-4">Tailored Courses for Every Goal</h2>
          <div className="w-24 h-1.5 bg-[#f9d200] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "NEET Coaching", tag: "Your Path to Top Medical Colleges.", desc: "Intensive curriculum covering Physics, Chemistry, and Biology. Focused on speed, accuracy, and NCERT mastery.", link: "/programs/neet" },
            { title: "IIT-JEE Coaching", tag: "Engineer Your Future.", desc: "Rigorous preparation for JEE Main & Advanced. Heavy focus on problem-solving, advanced mathematics, and conceptual applications.", link: "/programs/jee" },
            { title: "Foundation (9th & 10th) + NEET / JEE", tag: "School Prep", desc: "Focus on improving marks in school exams for 9th and 10th with the backdrop of early preparation for Medical or Engineering.", link: "/programs/foundation" }
          ].map((prog, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-black text-[#162b66] mb-2">{prog.title}</h3>
              <p className="text-[#00b4d8] font-bold text-sm mb-4">{prog.tag}</p>
              <p className="text-gray-600 mb-8 flex-grow">{prog.desc}</p>
              <Link href={prog.link} className="text-center w-full bg-gray-50 border border-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition">View Plan</Link>
            </div>
          ))}
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