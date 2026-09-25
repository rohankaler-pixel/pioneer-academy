import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pioneer Academy Bikaner | Best IIT JEE, NEET & Foundation Coaching',
  description: 'Bikaner\'s premier coaching institute for IIT JEE (Mains & Advanced), NEET-UG Medical preparation, and Class 9th-12th Foundation (CBSE/RBSE). Expert faculty, top AIR results, and small batches near Nathusar Gate.',
  keywords: [
    // Brand
    'Pioneer Academy Bikaner', 'Pioneer Coaching Bikaner', 'Pioneer Institute Bikaner', 'Pioneer Academy Nathusar Gate',
    // NEET / Medical cluster
    'NEET coaching Bikaner', 'best NEET coaching in Bikaner', 'NEET UG preparation Bikaner', 'medical entrance coaching Bikaner',
    'top medical coaching Rajasthan', 'NEET dropper batch Bikaner', 'NEET repeater batch', 'biology coaching Bikaner',
    'AIIMS preparation Bikaner', 'NEET target batch Bikaner', 'NEET crash course Bikaner', 'NEET online + offline coaching Bikaner',
    'best biology teacher Bikaner', 'NEET result Bikaner coaching',
    // JEE / Engineering cluster
    'IIT JEE coaching in Bikaner', 'best IIT coaching Bikaner', 'JEE Mains and Advanced coaching Bikaner',
    'best engineering entrance coaching Bikaner', 'JEE dropper batch Bikaner', 'physics chemistry maths coaching Bikaner',
    'top IIT coaching Rajasthan', 'JEE test series Bikaner', 'JEE crash course Bikaner', 'IIT foundation batch Bikaner',
    // Foundation / School / Board cluster
    'foundation classes 9th 10th Bikaner', 'class 11 12 coaching Bikaner', 'CBSE board exam preparation Bikaner',
    'RBSE board coaching Bikaner', 'NTSE preparation Bikaner', 'olympiad coaching Bikaner', 'best science tuition Bikaner',
    'class 9 foundation course Bikaner', 'class 10 foundation course Bikaner', 'school + competitive exam coaching Bikaner',
    // Results / trust intent
    'Bikaner coaching institute results', 'AIR results Bikaner coaching', 'top rankers Bikaner NEET JEE',
    'coaching institute with best results Bikaner', 'toppers coaching Bikaner',
    // Local / commercial intent
    'coaching near Nathusar Gate Bikaner', 'best coaching classes in Bikaner', 'top 10 coaching institutes Bikaner',
    'Bikaner coaching center fees', 'coaching institute admission Bikaner', 'coaching institute near me Bikaner',
    'best coaching institute Rajasthan', 'Bikaner tuition center JEE NEET',
    // Hindi / Hinglish intent
    'Bikaner me sabse achi coaching', 'NEET ki taiyari Bikaner', 'IIT JEE ki taiyari Bikaner',
    'Bikaner best teachers NEET', 'medical coaching hindi medium Bikaner', 'coaching institute Bikaner fees details',
    'Bikaner ka best coaching center',
    // Core Institutional Keywords
    'Pioneer Academy Bikaner', 'Pioneer Coaching Bikaner', 'Pioneer Institute',
    // Medical / NEET Cluster
    'NEET coaching Bikaner', 'Best institute for NEET in Bikaner', 'NEET UG preparation', 'Medical entrance exam coaching', 'Top medical coaching in Rajasthan', 'NEET dropper batch Bikaner', 'Biology coaching Bikaner', 'AIIMS preparation Bikaner', 'NEET target batch',
    // Engineering / JEE Cluster
    'IIT JEE coaching in Bikaner', 'JEE Mains and Advanced coaching', 'Best engineering coaching in Bikaner', 'JEE dropper batch', 'Physics chemistry math coaching', 'Top IIT coaching Rajasthan', 'JEE test series Bikaner',
    // Foundation / School / Board Cluster
    'Foundation classes 9th 10th Bikaner', 'Class 11 12 coaching Bikaner', 'CBSE board exam preparation', 'RBSE board coaching', 'NTSE preparation Bikaner', 'Olympiad coaching', 'Best science tuition Bikaner',
    // Location & Intent Variations
    'Coaching near Nathusar Gate Bikaner', 'Best coaching classes in Bikaner', 'Top 10 coaching in Bikaner', 'Bikaner coaching center fee', 'Best results in Bikaner coaching',
    // Hindi / Hinglish Search Intent
    'Bikaner me sabse achi coaching', 'NEET ki taiyari Bikaner', 'IIT JEE preparation Bikaner', 'Bikaner best teachers for NEET', 'Medical coaching hindi medium Bikaner',
    // Founder / faculty recognition cluster
    'Girish Sharma Coaching', 'Narendra Shekhawat Coaching', 'Girish Sharma Sir', 'Ashish Bissa Sir', 'Jai Dhaiya Sir',
    'Best Physics Teacher in Bikaner', 'Best Chemistry Teacher in Bikaner', 'Best Biology Teacher in Bikaner', 'Best Maths Teacher in Bikaner', 'Best NEET Teacher Bikaner', 'Best JEE Teacher Bikaner',
    'Dr. Narendra Shekhawat Bikaner', 'Dr. Narendra Shekhawat Pioneer Academy',
    'Dr. Narendra Shekhawat coaching Bikaner', 'Narendra Shekhawat NEET faculty Bikaner',
    // Topper / results intent
    'Bikaner JEE topper', 'Bikaner NEET topper', 'Bikaner top coaching institute',
    'Bikaner top rankers coaching', 'best results coaching Bikaner', 'JEE topper Bikaner Rajasthan',
    'NEET topper Bikaner Rajasthan', 'coaching with best toppers Bikaner'
  ].join(', '),
  openGraph: {
    title: 'Pioneer Academy Bikaner | Top JEE & NEET Coaching',
    description: 'Engineer your future or path to top Medical colleges with Bikaner’s premier coaching institute. Comprehensive pedagogy and proven AIR results.',
    url: 'https://pioneeracademybikaner.com',
    siteName: 'Pioneer Academy Bikaner',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pioneer Academy Bikaner | IIT JEE & NEET Results',
    description: 'Bikaner’s premier coaching institute for Medical and Engineering entrance exams.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
        
        {/* FLOATING WHATSAPP BUTTON */}
        <a
          href="https://wa.me/918302224782?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20admissions%20at%20Pioneer%20Academy%20Bikaner."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-2.972-1.49-4.925-2.671-6.891-6.082-.206-.352.206-.326.59-1.032.065-.124.033-.233-.016-.347-.049-.115-.57-1.374-.782-1.883-.206-.503-.415-.434-.57-.442-.149-.009-.32-.009-.49-.009s-.444.064-.678.324c-.234.26-1.002 1.016-1.002 2.477 0 1.461 1.028 2.873 1.171 3.069.143.196 2.025 3.1 4.902 4.343 2.877 1.243 2.877.829 3.402.776.525-.053 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-bold text-sm">
            Chat with Us
          </span>
        </a>

        {/* SCHEMA MARKUP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Pioneer Academy Bikaner",
                "url": "https://pioneeracademybikaner.com",
                "logo": "https://pioneeracademybikaner.com/favicon.ico",
                "description": "Bikaner's top coaching institute for IIT JEE (Mains & Advanced), NEET medical entrance, and Foundation (Class 9-12) board exam preparation.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Near City Dispensary No. 6, Outside Nathusar Gate",
                  "addressLocality": "Bikaner",
                  "addressRegion": "Rajasthan",
                  "postalCode": "334001",
                  "addressCountry": "IN"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+91-8302224782",
                    "contactType": "Admissions",
                    "availableLanguage": ["English", "Hindi"]
                  },
                  {
                    "@type": "ContactPoint",
                    "telephone": "+91-7891002402",
                    "contactType": "Customer Support",
                    "availableLanguage": ["English", "Hindi"]
                  }
                ],
                "sameAs": [
                  "https://pioneeracademybikaner.com"
                ],
                "areaServed": {
                  "@type": "City",
                  "name": "Bikaner"
                },
                "knowsAbout": [
                  "IIT JEE Mains", "JEE Advanced", "NEET-UG", "Engineering Entrance", 
                  "Medical Entrance", "CBSE Board Exams", "RBSE Board Exams", 
                  "Class 9 Foundation", "Class 10 Foundation", "NTSE", "Olympiads",
                  "Physics", "Chemistry", "Mathematics", "Biology"
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "125"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Which is the best coaching for NEET and IIT JEE in Bikaner?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pioneer Academy Bikaner is the premier institute for NEET and IIT JEE preparation, offering highly experienced faculty, small batch sizes, and exceptional results like AIR 4771 and AIR 7231 in NEET."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does Pioneer Academy offer foundation courses for 9th and 10th class?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Pioneer Academy provides a specialized Foundation program for 9th and 10th-grade students focused on scoring high in school exams while building a strong base for future medical and engineering entrances."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Where is Pioneer Academy Bikaner located?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pioneer Academy is located near City Dispensary No. 6, Outside Nathusar Gate, Bikaner, Rajasthan."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}