"use client";

import React, { useState } from 'react';

export default function PioneerAcademy() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobile: '',
    email: '',
    grade: '',
    targetExam: 'NEET'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [activeTab, setActiveTab] = useState('NEET');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace this URL with your actual Google Apps Script Webhook / Firebase URL
    const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
    
    try {
      // Simulated API Call for Google Sheets Sync
      // await fetch(GOOGLE_SHEET_WEBHOOK, { method: 'POST', body: JSON.stringify(formData) });
      setTimeout(() => {
        setSubmitStatus('Success! We will contact you shortly.');
        setFormData({ studentName: '', parentName: '', mobile: '', email: '', grade: '', targetExam: 'NEET' });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const faculties = [
    { name: "Dr. Narendra Shekhawat", role: "Patron & Motivator", exp: "40+ Years Combined" },
    { name: "Dr. Jogendra Singh", role: "H.O.D. Chemistry", exp: "14 Years Exp." },
    { name: "Mr. Girish Sharma", role: "H.O.D. Physics", exp: "16 Years Exp." },
    { name: "Dr. H.K. Suthar", role: "H.O.D. Biology", exp: "15 Years Exp." }
  ];

  const features = [
    "Legendary Faculties", "Daily Doubt Clearing Sessions", "Weekly & Monthly Tests",
    "Digital Board Classrooms", "0% Interest EMI Facility", "Fully A.C. Building & Hostel"
  ];

  const pyqData = {
    NEET: [
      { year: "2023", title: "NEET 2023 Paper & Detailed Solutions" },
      { year: "2022", title: "NEET 2022 Paper & Detailed Solutions" },
      { year: "2021", title: "NEET 2021 Paper & Detailed Solutions" }
    ],
    JEE: [
      { year: "2023", title: "JEE Main & Adv 2023 Solutions" },
      { year: "2022", title: "JEE Main & Adv 2022 Solutions" },
      { year: "2021", title: "JEE Main & Adv 2021 Solutions" }
    ]
  };

  const storeItems = [
    { id: 1, title: "NEET 2024 All India Test Series", price: 2999, type: "Test Series" },
    { id: 2, title: "JEE Main Complete Study Material", price: 4500, type: "Study Material" },
    { id: 3, title: "Foundation (XI-XII) Question Bank", price: 1500, type: "Study Material" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Navigation Bar */}
      <nav className="bg-[#162b66] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#f9d200] text-[#162b66] rounded-full flex items-center justify-center font-bold text-xl italic">
              π
            </div>
            <div>
              <h1 className="font-bold text-2xl tracking-wider text-[#00b4d8]">PIONEER</h1>
              <p className="text-xs text-[#f9d200] font-semibold tracking-widest uppercase">Academy</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6 font-medium">
            <a href="#about" className="hover:text-[#f9d200] transition-colors">About Us</a>
            <a href="#faculties" className="hover:text-[#f9d200] transition-colors">Faculties</a>
            <a href="#pyq" className="hover:text-[#f9d200] transition-colors">Previous Year Papers</a>
            <a href="#store" className="hover:text-[#f9d200] transition-colors">Test Series & Store</a>
          </div>
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-[#f9d200] text-[#162b66] px-4 py-2 rounded-md font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-96 h-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#162b66]">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black">✖</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-[#162b66] font-bold">₹{item.price}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <p className="text-xl font-bold mb-4">Total: ₹{cart.reduce((a, b) => a + b.price, 0)}</p>
                  <button className="w-full bg-[#f9d200] text-[#162b66] font-bold py-3 rounded-md">Checkout Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section & Lead Capture */}
      <section className="bg-[#162b66] text-white pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-[#00b4d8] text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
              Admissions Open 2024-25
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              First time in Bikaner, a team of <span className="text-[#f9d200]">Legendary Faculties</span>
            </h2>
            <p className="text-xl text-gray-200">
              An institute for NEET / IIT-JEE (Main + Advance) / XI-XII Foundation & Pre-Foundation (VIII to X).
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-[#f9d200] font-bold text-2xl">40+</span>
                <span className="text-sm leading-tight">Years Combined<br/>Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-[#f9d200] font-bold text-2xl">100%</span>
                <span className="text-sm leading-tight">Doubt Clearing<br/>Assurance</span>
              </div>
            </div>
          </div>

          {/* Lead Generation Form */}
          <div className="bg-white rounded-xl p-8 shadow-2xl text-gray-800" id="register">
            <h3 className="text-2xl font-bold text-center text-[#162b66] mb-6">Register for Free Counselling</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
                  <input type="text" name="studentName" required value={formData.studentName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Parent Name</label>
                  <input type="text" name="parentName" required value={formData.parentName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                  <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email ID</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Grade</label>
                  <select name="grade" required value={formData.grade} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66] bg-white">
                    <option value="">Select</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Target Exam</label>
                  <select name="targetExam" required value={formData.targetExam} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#162b66] bg-white">
                    <option value="NEET">NEET</option>
                    <option value="JEE">IIT-JEE</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#f9d200] hover:bg-yellow-500 text-[#162b66] font-bold text-lg py-3 rounded-md transition-colors mt-4">
                {isSubmitting ? 'Submitting...' : 'Book Your Seat Now'}
              </button>
              {submitStatus && <p className="text-center font-semibold text-green-600 mt-2">{submitStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Why Pioneer Academy */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#162b66] mb-4">Why Choose Pioneer Academy?</h2>
          <div className="w-24 h-1 bg-[#f9d200] mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#00b4d8]/10 text-[#00b4d8] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="font-bold text-gray-800">{feature}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculties" className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#162b66] mb-4">Our Legendary Faculties</h2>
            <div className="w-24 h-1 bg-[#f9d200] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {faculties.map((faculty, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md text-center border-b-4 border-[#162b66]">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Faculty Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{faculty.name}</h3>
                  <p className="text-[#00b4d8] font-semibold mb-3">{faculty.role}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">{faculty.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Commerce / Store Section */}
      <section id="store" className="py-16 px-4 max-w-7xl mx-auto">
         <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#162b66] mb-4">Enroll & Buy Study Material</h2>
          <div className="w-24 h-1 bg-[#f9d200] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {storeItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col">
              <span className="text-xs font-bold text-[#00b4d8] uppercase tracking-wider mb-2">{item.type}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex-grow">{item.title}</h3>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-black text-[#162b66]">₹{item.price}</span>
                <button onClick={() => addToCart(item)} className="bg-[#162b66] text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section: Previous Year Papers & Solutions */}
      <section id="pyq" className="py-16 px-4 bg-[#162b66] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Previous Year Papers & Solutions</h2>
            <p className="text-gray-300">Boost your preparation with comprehensive step-by-step solutions.</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('NEET')}
              className={`px-8 py-3 font-bold rounded-full transition-colors ${activeTab === 'NEET' ? 'bg-[#f9d200] text-[#162b66]' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              NEET Papers
            </button>
            <button 
              onClick={() => setActiveTab('JEE')}
              className={`px-8 py-3 font-bold rounded-full transition-colors ${activeTab === 'JEE' ? 'bg-[#f9d200] text-[#162b66]' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              JEE Papers
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pyqData[activeTab].map((paper, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="font-bold text-xl text-[#00b4d8] mb-2">{paper.year}</h3>
                <p className="font-medium text-gray-200 mb-6">{paper.title}</p>
                <div className="flex gap-3">
                  <a href={`/solutions/${activeTab.toLowerCase()}/${paper.year}`} className="flex-1 text-center bg-white text-[#162b66] font-bold py-2 rounded hover:bg-gray-100 text-sm">
                    View Solutions
                  </a>
                  <button className="flex-1 border border-white text-white font-bold py-2 rounded hover:bg-white/10 text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#f9d200] text-[#162b66] rounded-full flex items-center justify-center font-bold italic">π</div>
              <h2 className="text-xl font-bold text-white">PIONEER ACADEMY</h2>
            </div>
            <p className="text-sm">An institute where dedication, devotion, and hard work are the guiding principles.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Contact Us</h3>
            <p className="text-sm mb-2">📞 +91 83022 24782</p>
            <p className="text-sm mb-2">📞 78910-02402, 78910-02403</p>
            <p className="text-sm mt-4"><strong>Main Campus:</strong> A-27, Near JNV Thana, Kanta Khaturia Colony, Bikaner</p>
            <p className="text-sm mt-2"><strong>City Branch:</strong> Near City Dispensary No. 6, Outside Nathusar Gate, Bikaner</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About the Institute</a></li>
              <li><a href="#faculties" className="hover:text-white">Faculty Team</a></li>
              <li><a href="#pyq" className="hover:text-white">Student Login</a></li>
              <li><a href="#store" className="hover:text-white">Buy Study Materials</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} Pioneer Academy Bikaner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}