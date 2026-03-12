import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: "ABIT — Association of Budding Information Technocrats",
    template: "%s | ABIT",
  },
  description:
    "ABIT is a student-driven technology community at RGIT dedicated to fostering innovation, collaboration, and technical excellence through workshops, hackathons, and events.",
  keywords: [
    "ABIT",
    "ABIT RGIT",
    "ABIT tech community",
    "ABIT events",
    "ABIT SYNERGY",
    "Association of Budding Information Technocrats",
    "student tech community",
  ],
  authors: [{ name: "ABIT" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://abit.rgit.ac.in",
    siteName: "ABIT",
    title: "ABIT — Association of Budding Information Technocrats",
    description:
      "A student-driven technology community fostering innovation, collaboration, and technical excellence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABIT — Association of Budding Information Technocrats",
    description:
      "A student-driven technology community fostering innovation, collaboration, and technical excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, inter.variable, playfair.variable, "font-sans", geist.variable)}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
