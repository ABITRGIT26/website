import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400"],
});

const mono2 = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono2",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: '#060A1A',
  width: 'device-width',
  initialScale: 1,
};

const SITE_URL = 'https://rgitabit.in';
const SITE_NAME = 'ABIT · RGIT Mumbai';
const SITE_TITLE = 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai';
const SITE_DESCRIPTION =
  'ABIT is the official departmental committee of RGIT Mumbai’s Information Technology Department. Workshops, hackathons, the SYNERGY festival, and a community of student builders.';
const OG_IMAGE = {
  url: '/hero-wide.png',
  width: 1200,
  height: 630,
  alt: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | ABIT RGIT',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'ABIT',
    'ABIT RGIT',
    'Association of Budding Information Technocrats',
    'RGIT Information Technology',
    'RGIT Mumbai',
    'SYNERGY',
    'SYNERGY',
    'student tech committee Mumbai',
  ],
  authors: [{ name: 'ABIT · Association of Budding Information Technocrats' }],
  creator: 'ABIT · RGIT Mumbai',
  publisher: 'ABIT · RGIT Mumbai',
  category: 'education',
  alternates: {
    canonical: '/',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description:
      'The official IT department committee of RGIT Mumbai. Workshops, hackathons, SYNERGY festival, and community.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description:
      'The official IT department committee of RGIT Mumbai. Workshops, hackathons, SYNERGY festival, and community.',
    images: [OG_IMAGE.url],
  },
  // Add your Search Console token when ready:
  // verification: { google: 'paste-google-site-verification-code-here' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Association of Budding Information Technocrats',
        alternateName: 'ABIT',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: SITE_DESCRIPTION,
        parentOrganization: {
          '@type': 'CollegeOrUniversity',
          name: 'Rajiv Gandhi Institute of Technology, Mumbai',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn(interTight.variable, instrument.variable, mono2.variable, "font-sans")}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NQHJMSF9');`}
        </Script>
      </head>
      <body className="noise">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQHJMSF9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
