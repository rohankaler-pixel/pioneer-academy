"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// NOTE: Replace YOUR_PLACE_ID below if you have your exact Place ID, 
// or use the Google Maps direct search link which opens Pioneer Academy's listing directly on mobile.
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Pioneer+Academy+Near+City+Dispensary+No+6+Outside+Nathusar+Gate+Bikaner";

type Stream = 'NEET' | 'JEE' | 'FOUNDATION';
type Lang = 'en' | 'hinglish' | 'hi';
type Relation = 'self' | 'daughter' | 'son' | 'sibling' | 'niece_nephew';

export default function ReviewGeneratorClient() {
  const [stream, setStream] = useState<Stream>('NEET');
  const [lang, setLang] = useState<Lang>('en');
  const [relation, setRelation] = useState<Relation>('self');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const buildDynamicReview = (s: Stream, l: Lang, r: Relation) => {
    // Dynamic Combinatorial Engine for 1,500+ unique, human-like variations
    if (l === 'en') {
      const openers: Record<Relation, string[]> = {
        self: [
          "Studying at Pioneer Academy has been a great experience.",
          "Best coaching institute in Bikaner by far.",
          "Joined Pioneer Academy this year and my concepts have improved a lot.",
          "Really happy with the study environment here at Pioneer Academy Bikaner.",
          "If you are looking for serious preparation in Bikaner, this is the right place."
        ],
        daughter: [
          "My daughter studies here and we can see a big improvement in her confidence.",
          "Enrolled my daughter at Pioneer Academy and we are very satisfied with the faculty.",
          "Very safe and disciplined environment for girls—my daughter is preparing here.",
          "My daughter's test scores have improved steadily since joining Pioneer Academy."
        ],
        son: [
          "My son is studying here and the personal attention given to him is commendable.",
          "Admitted my son to Pioneer Academy Bikaner and we are really happy with his progress.",
          "My son's conceptual clarity and study routine improved a lot after joining here."
        ],
        sibling: [
          "My brother studies here and always praises the supportive faculty.",
          "My sister is preparing here and the doubt-clearing support is really good.",
          "Recommended this institute to my younger brother and his marks have gone up significantly."
        ],
        niece_nephew: [
          "My niece studies here and our family is very impressed with the teaching quality.",
          "My nephew is enrolled here and the teachers pay proper attention to every student.",
          "Visited here for my niece's admission—the management and faculty are very cooperative."
        ]
      };

      const facultyLines: Record<Stream, string[]> = {
        NEET: [
          "Girish sir and Rudra sir make Physics numericals super easy to solve.",
          "Sumit sir for Zoology and Vikram sir for Botany cover NCERT line by line.",
          "Organic chemistry by Jay Dahiya sir and Inorganic by Abhishek sir cleared all doubts.",
          "Rudra sir in Physics and Sumit sir in Biology explain even tough concepts very patiently.",
          "Vikram sir's Botany classes and Jay Dahiya sir's Organic mechanisms are top-notch.",
          "Abhishek sir for Chemistry and Girish sir for Physics are always available at the doubt counters."
        ],
        JEE: [
          "Naveen Sharma sir makes JEE Mathematics look so simple and logical.",
          "Girish sir and Rudra sir build crystal-clear concepts in Physics for JEE Main & Advanced.",
          "Ashish Bissa sir and Rohit Paliwal sir are fantastic with Maths problem-solving tricks.",
          "Jay Dahiya sir for Organic Chemistry and Abhishek sir for Inorganic teach from the basics to advanced level.",
          "Naveen sir in Maths and Girish sir in Physics give personal attention to every student in the batch."
        ],
        FOUNDATION: [
          "Nidhi mam for Science and Aishwarya mam for Social Science explain chapters so clearly.",
          "Rohit Paliwal sir and Ashish Bissa sir build a very strong Maths foundation for 9th & 10th.",
          "Vijay Gopal sir and Kishore Joshi sir for English and Dilip sir for Hindi ensure complete board preparation.",
          "Nidhi mam's Science lectures and Naveen sir's Maths guidance make school + competitive prep seamless."
        ]
      };

      const closers = [
        "Regular mock tests and DPPs keep students consistent.",
        "Small batch size means no student is ignored.",
        "Doubt counters and weekly assessments help a lot.",
        "Truly the best team near Nathusar Gate in Bikaner.",
        "Thank you to Dr. Narendra Shekhawat sir and the entire team!",
        "Highly recommended for serious students in Bikaner."
      ];

      return `${pickRandom(openers[r])} ${pickRandom(facultyLines[s])} ${pickRandom(closers)}`;
    }

    if (l === 'hinglish') {
      const openers: Record<Relation, string[]> = {
        self: [
          "Pioneer Academy join karne ke baad mere concepts kafi strong ho gaye hain.",
          "Bikaner me preparation ke liye sabse best coaching hai.",
          "Yahan ka study environment aur discipline bahut badiya hai."
        ],
        daughter: [
          "Meri beti yahan padh rahi hai aur uske marks me kafi acha improvement hai.",
          "Meri daughter ka admission yahan karwaya tha, teachers bahut supportive hain."
        ],
        son: [
          "Mera beta yahan padhta hai, har student pe personal attention diya jata hai.",
          "Mere son ki performance me kafi sudhaar aaya hai Pioneer join karne ke baad."
        ],
        sibling: [
          "Mera bhai yahan padh raha hai, full-time faculty team bahut mehnati hai.",
          "Meri sister yahan taiyari kar rahi hai aur doubt solving regular hoti hai."
        ],
        niece_nephew: [
          "Meri bhatiji yahan padhti hai, Bikaner me isse badiya faculty team nahi hai.",
          "Mere bhanje ka admission karwaya hai, management aur teachers bahut ache hain."
        ]
      };

      const facultyLines: Record<Stream, string[]> = {
        NEET: [
          "Girish sir aur Rudra sir physics ke numericals bahut easy tarike se samjhate hain.",
          "Sumit sir zoology aur Vikram sir botany pura NCERT class me hi yaad karwa dete hain.",
          "Jay Dahiya sir ki organic chemistry aur Abhishek sir ki inorganic ekdum top level hai.",
          "SPMC ya top medical college target karne walo ke liye Rudra sir aur Sumit sir best guidance dete hain."
        ],
        JEE: [
          "Naveen Sharma sir aur Ashish Bissa sir maths ke concepts ekdum crystal clear karwate hain.",
          "JEE physics ke liye Girish sir aur Rudra sir best hain Bikaner me.",
          "Chemistry me Jay Dahiya sir aur Abhishek sir har doubt bade patience se solve karte hain.",
          "Rohit Paliwal sir aur Naveen sir ki wajah se maths ka dar bilkul khatam ho gaya."
        ],
        FOUNDATION: [
          "Nidhi mam science aur Aishwarya mam SST bahut ache se samjhati hain.",
          "9th-10th foundation me Ashish Bissa sir aur Rohit Paliwal sir maths ka base strong karwate hain.",
          "English me Vijay Gopal sir & Kishore Joshi sir aur Hindi me Dilip sir board exams ki puri taiyari karwate hain."
        ]
      };

      const closers = [
        "Regular mock tests aur DPP se kafi confidence aata hai 👍",
        "Small batch size hai toh har bache pe dhyan rehta hai.",
        "Best coaching institute in Bikaner!",
        "Doubt counters pe hamesha teachers available rehte hain."
      ];

      return `${pickRandom(openers[r])} ${pickRandom(facultyLines[s])} ${pickRandom(closers)}`;
    }

    // Hindi ('hi')
    const openersHi: Record<Relation, string[]> = {
      self: [
        "पायनियर एकेडमी बीकानेर में पढ़ाई का माहौल और अनुशासन सबसे बेहतरीन है।",
        "यहाँ जॉइन करने के बाद मेरे सभी विषयों के कॉन्सेप्ट्स बहुत अच्छे से क्लियर हो गए हैं।"
      ],
      daughter: [
        "मेरी बेटी यहाँ पढ़ रही है और उसके टेस्ट के नंबरों में बहुत अच्छा सुधार देखने को मिला है।",
        "बेटियों के लिए बहुत ही सुरक्षित और अनुशासित माहौल है, मेरी बेटी यहाँ तैयारी कर रही है।"
      ],
      son: [
        "मेरा बेटा यहाँ पढ़ता है और टीचर्स हर बच्चे पर व्यक्तिगत ध्यान देते हैं।",
        "मेरे बेटे के आत्मविश्वास और पढ़ाई में पायनियर एकेडमी आने के बाद बहुत सुधार हुआ है।"
      ],
      sibling: [
        "मेरा भाई यहाँ तैयारी कर रहा है और यहाँ की पूरी फैकल्टी टीम बहुत मेहनती है।",
        "मेरी बहन यहाँ पढ़ती है, डाउट क्लियर करने के लिए टीचर्स हमेशा उपलब्ध रहते हैं।"
      ],
      niece_nephew: [
        "मेरी भतीजी यहाँ पढ़ती है, बीकानेर में इससे अच्छी कोचिंग और फैकल्टी टीम नहीं है।",
        "मेरे भतीजे का एडमिशन यहाँ करवाया है, पढ़ाई और टेस्ट सीरीज की व्यवस्था बहुत शानदार है।"
      ]
    };

    const facultyHi: Record<Stream, string[]> = {
      NEET: [
        "नीट (NEET) के लिए गिरीश सर और रुद्र सर फिजिक्स बहुत ही सरल भाषा में समझाते हैं।",
        "सुमित सर (जूलॉजी) और विक्रम सर (बॉटनी) एनसीईआरटी (NCERT) की हर लाइन क्लास में ही याद करवा देते हैं।",
        "जय दहिया सर की ऑर्गेनिक केमिस्ट्री और अभिषेक सर की इनऑर्गेनिक केमिस्ट्री पढ़ाने का तरीका लाजवाब है।"
      ],
      JEE: [
        "आईआईटी जेईई (IIT-JEE) के लिए नवीन शर्मा सर और आशीष बिस्सा सर मैथ्स बहुत शानदार पढ़ाते हैं।",
        "रोहित पालीवाल सर की मैथ्स और गिरीश सर व रुद्र सर की फिजिक्स से कठिन सवाल भी आसानी से हल हो जाते हैं।",
        "केमिस्ट्री में अभिषेक सर और जय दहिया सर बच्चों का बेस बहुत मजबूत करवाते हैं।"
      ],
      FOUNDATION: [
        "फाउंडेशन बैच में निधि मैम (साइंस) और ऐश्वर्या मैम (सोशल साइंस) बहुत ही अच्छे तरीके से पढ़ाती हैं।",
        "विजय गोपाल सर और किशोर जोशी सर (अंग्रेजी) तथा दिलीप सर (हिंदी) बोर्ड परीक्षा की भी पूरी तैयारी करवाते हैं।"
      ]
    };

    const closersHi = [
      "नियमित टेस्ट सीरीज और छोटे बैच साइज की वजह से हर विद्यार्थी पर पूरा ध्यान दिया जाता है।",
      "डॉ. नरेंद्र शेखावत सर और पूरी पायनियर टीम का बहुत-बहुत धन्यवाद!",
      "बीकानेर में साइंस और प्रतियोगी परीक्षाओं की तैयारी के लिए सबसे भरोसेमंद संस्थान।"
    ];

    return `${pickRandom(openersHi[r])} ${pickRandom(facultyHi[s])} ${pickRandom(closersHi)}`;
  };

  const regenerate = () => {
    setText(buildDynamicReview(stream, lang, relation));
    setCopied(false);
  };

  useEffect(() => {
    regenerate();
  }, [stream, lang, relation]);

  const handleCopyAndRedirect = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        window.location.href = GOOGLE_REVIEW_URL;
      }, 600);
    } catch {
      window.location.href = GOOGLE_REVIEW_URL;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1a40] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-[#f9d200]">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-block bg-[#162b66] px-4 py-2 rounded-xl mb-3">
            <Image src="/logo.png" alt="Pioneer Academy" width={160} height={40} className="h-9 w-auto object-contain" />
          </div>
          <h1 className="text-xl font-black text-[#162b66]">Share Your Experience ⭐</h1>
          <p className="text-xs text-gray-500 mt-1">
            Tap your options below, copy the review, and paste it on Google!
          </p>
        </div>

        {/* 1. Who is reviewing? */}
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-700 block mb-1.5">1. Who studies at Pioneer Academy?</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'self', label: 'Myself (Student)' },
              { id: 'daughter', label: 'My Daughter' },
              { id: 'son', label: 'My Son' },
              { id: 'sibling', label: 'Brother / Sister' },
              { id: 'niece_nephew', label: 'Niece / Nephew' }
            ].map((rel) => (
              <button
                key={rel.id}
                onClick={() => setRelation(rel.id as Relation)}
                className={`py-2 px-2 text-[11px] font-bold rounded-lg border transition ${
                  relation === rel.id
                    ? 'bg-[#162b66] text-[#f9d200] border-[#162b66]'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {rel.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Course Selector */}
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-700 block mb-1.5">2. Select Batch / Course</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'NEET', label: 'NEET UG' },
              { id: 'JEE', label: 'IIT-JEE' },
              { id: 'FOUNDATION', label: '9th-12th / Found.' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStream(s.id as Stream)}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                  stream === s.id
                    ? 'bg-[#162b66] text-[#f9d200] border-[#162b66]'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Language Selector */}
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-700 block mb-1.5">3. Select Language</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'en', label: 'English' },
              { id: 'hinglish', label: 'Hinglish' },
              { id: 'hi', label: 'हिंदी' }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id as Lang)}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                  lang === l.id
                    ? 'bg-[#162b66] text-[#f9d200] border-[#162b66]'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className="bg-yellow-50/70 border-2 border-[#f9d200] rounded-xl p-3.5 mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[#f9d200] text-base tracking-widest drop-shadow-sm">★★★★★</span>
            <button
              onClick={regenerate}
              className="text-xs text-[#162b66] font-extrabold hover:underline flex items-center gap-1"
            >
              🔄 Generate New Text
            </button>
          </div>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-transparent text-gray-800 text-sm font-medium focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            ✏️ You can tap the text above to edit or add anything before copying.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopyAndRedirect}
          className={`w-full font-black py-4 rounded-xl shadow-lg transition text-base flex items-center justify-center gap-2 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-[#f9d200] text-[#162b66] hover:bg-yellow-400'
          }`}
        >
          {copied ? '✅ Copied! Opening Google...' : '📋 Copy Review & Open Google'}
        </button>

        <p className="text-[11px] text-center text-gray-500 mt-3">
          <strong>On the next screen:</strong> Tap <strong>Reviews</strong> → Tap ⭐⭐⭐⭐⭐ → <strong>Paste</strong> & Post!
        </p>
      </div>
    </div>
  );
}