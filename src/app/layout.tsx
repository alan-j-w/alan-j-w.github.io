import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrolling from "@/components/SmoothScrolling";
import { getAssetPath } from "@/lib/assets";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Alan Joy Wilson — MERN Stack & Python Developer",
  description:
    "Full stack engineer specializing in MERN (MongoDB, Express, React, Node.js), Python, Next.js, and React Native. Builder of Nexcart, Trackpi Job Portal, Cellulogram, and VulnBox.",
  openGraph: {
    title: "Alan Joy Wilson — MERN Stack & Python Developer",
    description:
      "Full stack engineer specializing in MERN, Python, Next.js, and React Native. Open to opportunities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Joy Wilson — MERN Stack & Python Developer",
    description:
      "Full stack engineer specializing in MERN, Python, Next.js, and React Native. Open to opportunities.",
  },
  icons: {
    icon: getAssetPath("/images/logo.jpg"),
    apple: getAssetPath("/images/logo.jpg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrolling>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
