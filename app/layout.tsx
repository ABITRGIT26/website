import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
    template: '%s | ABIT RGIT',
  },
  description:
    'ABIT is the official departmental committee of RGIT Mumbai\u2019s Information Technology Department. Workshops, hackathons, the SYNERGY festival, and a community of student builders.',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://abit.rgit.ac.in',
    siteName: 'ABIT · RGIT Mumbai',
    title: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
    description:
      'The official IT department committee of RGIT Mumbai. Workshops, hackathons, SYNERGY festival, and community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
    description:
      'The official IT department committee of RGIT Mumbai. Workshops, hackathons, SYNERGY festival, and community.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn(interTight.variable, instrument.variable, mono2.variable, "font-sans")}>
      <body className="noise">
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
