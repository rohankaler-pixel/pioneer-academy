import React from 'react';
import Link from 'next/link';

export default function FoundationPage() {
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
            <Link href="/test-series" className="bg-[#f9d200] text-[#162b66] px-4 py-2 rounded-md hover:bg-yellow-500 font-bold transition-colors">Test Series</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#162b66] to-[#0d1a40] text-white py-16 px-4 text-center border-b-4 border-[#f9d200]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 text-[#f9d200] px-4 py-1 rounded-full text-sm font-bold tracking-wide border border-[#f9d200]/30 mb-6">
            Class 9th & 10th
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Foundation + NEET / JEE
          </h1>
          <p className="text-xl text-[#00b4d8] font-bold mb-6">School Prep Engineered for Excellence</p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Build a rock-solid academic base. Our Foundation program focuses on securing top marks in school exams while seamlessly integrating early preparation for Medical and Engineering entrance exams.
          </p>
        </div>
      </header>

      {/* School Integration Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#162b66] mb-4">Trusted by Students Across Bikaner&apos;s Top Schools</h2>
            <div className="w-24 h-1.5 bg-[#f9d200] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              We understand that school exams are your first priority. Our expert faculty specifically aligns the curriculum to help students score exceptionally well in their regular school exams. We proudly train students currently studying at:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "RSV Higher Secondary School",
              "Dayanand Public School (Narayana)",
              "Ryan International School",
              "Shri Jain Public School",
              "Army Public School",
              "H. P. MODI SCHOOL BIKANER",
              "& many more..."
            ].map((school, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-100 text-[#162b66] font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:border-[#00b4d8] transition-all text-sm md:text-base">
                {school}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pedagogy Section */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#162b66] mb-4">The Foundation Pedagogy</h2>
            <p className="text-gray-600">A dual-approach system balancing board excellence with competitive readiness.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl font-bold text-[#162b66] mb-3">School Board Mastery</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Comprehensive coverage of the NCERT syllabus ensuring absolute clarity for 9th and 10th-grade school exams and board papers.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-xl font-bold text-[#162b66] mb-3">Early Competitive Edge</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Gradually introduce high-level analytical thinking required for IIT-JEE and NEET, keeping students one step ahead of the competition.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-bold text-[#162b66] mb-3">Olympiad & NTSE Focus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Specialized training modules for national-level scholarship exams and Olympiads to build confidence and academic portfolio.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✍️</div>
              <h3 className="text-xl font-bold text-[#162b66] mb-3">Dual Testing System</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Subjective tests to improve school answer-writing skills, combined with objective tests to sharpen speed and accuracy for entrance exams.</p>
            </div>
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