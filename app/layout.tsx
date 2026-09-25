import type { Metadata } from 'next';
import './globals.css';

// 1. MASSIVE METADATA & LONG-TAIL KEYWORD MATRIX
export const metadata: Metadata = {
  title: 'Pioneer Academy Bikaner | Best IIT JEE, NEET & Foundation Coaching',
  description: 'Bikaner\'s premier coaching institute for IIT JEE (Mains & Advanced), NEET-UG Medical preparation, and Class 9th-12th Foundation (CBSE/RBSE). Expert faculty, top AIR results, and small batches near Nathusar Gate.',
  keywords: [
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
    'Bikaner me sabse achi coaching', 'NEET ki taiyari Bikaner', 'IIT JEE preparation Bikaner', 'Bikaner best teachers for NEET', 'Medical coaching hindi medium Bikaner'
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
        
        {/* 2. MULTI-LAYERED JSON-LD SCHEMA FOR LOCAL SEO & RICH SNIPPETS */}
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