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

  // Automatically calculate the academic year based on the June 1st rule
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // JavaScript months are 0-indexed (0 = Jan, 5 = June)
    if (now.getMonth() >= 5) {
      setAcademicYear(`${currentYear}-${(currentYear + 1).toString().slice(-2)}`);
    } else {
      setAcademicYear(`${currentYear - 1}-${currentYear.toString().slice(-2)}`);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    // Replace this with the URL you copied from Google Apps Script
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
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
            <Link href="/test-series" className="bg-[#f9d200] text-[#162b66] px-4 py-2 rounded-md hover:bg-yellow-500 font-bold transition-colors">Test Series</Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-[#162b66] to-[#0d1a40] text-white pt-16 pb-24 px-4">
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
              <Link href="#programs" className="bg-[#f9d200] text-[#162b66] px-6 py-3 rounded-md font-bold text-lg hover:bg-yellow-500 transition">Explore Courses</Link>
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
                    <option value="Foundation">Foundation (9/10)</option>
                    <option value="JEE_2_Year">JEE 2 Year (11/12)</option>
                    <option value="JEE_1_Year">JEE 1 Year (12)</option>
                    <option value="JEE_Target">JEE Target</option>
                    <option value="NEET_2_Year">NEET 2 Year (11/12)</option>
                    <option value="NEET_1_Year">NEET 1 Year (12)</option>
                    <option value="NEET_Target">NEET Target</option>
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
      <section className="py-20 px-4 max-w-7xl mx-auto">
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

{/* 3. Leadership & Vision */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#162b66] mb-4">Guided by Visionaries</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Pioneer Academy is led by educators who understand what it takes to win at the highest academic levels.</p>
            <div className="w-24 h-1.5 bg-[#f9d200] mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md flex gap-6 items-start border-l-4 border-[#162b66]">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#162b66] relative">
                <Image
                  src="/narendra-shekhawat.png"
                  alt="Dr. Narendra Shekhawat"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Dr. Narendra Shekhawat</h3>
                <p className="text-[#00b4d8] font-bold mb-3">Founder / Director</p>
                <p className="text-gray-600 text-sm leading-relaxed">Renowned for his educational philosophy and absolute dedication to bringing top-tier, structured competitive coaching to the students of Bikaner.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md flex gap-6 items-start border-l-4 border-[#162b66]">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#162b66] relative">
                <Image
                  src="/girish-sharma.png"
                  alt="Mr. Girish Sharma"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Mr. Girish Sharma</h3>
                <p className="text-[#00b4d8] font-bold mb-3">Founder / Director</p>
                <p className="text-gray-600 text-sm leading-relaxed">With 28 years of mentoring experience, bringing unmatched expertise in physics and a clear vision for student success in national-level exams.</p>
              </div>
            </div>
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
            { title: "Foundation (9th-12th)", tag: "Build a Rock-Solid Foundation.", desc: "Specialized coaching aligned with CBSE and RBSE syllabus to ensure 95%+ board scores while preparing for competitive exams.", link: "/programs/foundation" }
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
    </div>
  );
}