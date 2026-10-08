import type { Metadata } from 'next';
import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Keep your existing metadata right here (do not duplicate it below)
export const metadata: Metadata = {
  title: 'Pioneer Academy Bikaner | Best IIT JEE, NEET & Foundation Coaching',
  description: 'Bikaner\'s premier coaching institute for IIT JEE (Mains & Advanced), NEET...',
  // ... rest of your existing metadata fields
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18474173107"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18474173107');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
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
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        >
          <svg
            className="w-8 h-8 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.54 1.761.815 2.796.815 3.183 0 5.77-2.588 5.77-5.768 0-3.181-2.587-5.768-5.77-5.768zm0 10.378c-.896 0-1.745-.252-2.482-.692l-.178-.106-1.844.484.492-1.799-.116-.185c-.482-.767-.74-1.637-.74-2.512 0-2.541 2.068-4.609 4.611-4.609 2.542 0 4.611 2.068 4.611 4.609 0 2.542-2.069 4.61-4.611 4.61z" opacity="0.15"/>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414Z" />
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