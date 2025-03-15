import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScrollProvider";
import Loading from "@/components/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://snow-med.netlify.app/'),
  title: "Snow Medical",
  description: "Snow Medical Community - Leading Healthcare Solutions",
  keywords: 'medical, healthcare, snow medical, medical community',
  openGraph: {
    title: 'Snow Medical',
    description: 'Snow Medical Community - Leading Healthcare Solutions',
    siteName: 'Snow Medical',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snow Medical',
    description: 'Snow Medical Community - Leading Healthcare Solutions',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Separate viewport export as per Next.js recommendations
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll>
          <Navbar />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
