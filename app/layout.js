
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Snow Medical",
  description: "Snow Medical Community - Leading Healthcare Solutions",
  keywords: 'medical, healthcare, snow medical, medical community',
  openGraph: {
    title: 'Snow Medical',
    description: 'Snow Medical Community - Leading Healthcare Solutions',
    siteName: 'Snow Medical',
    images: [
      {
        url: '/snow.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snow Medical',
    description: 'Snow Medical Community - Leading Healthcare Solutions',
    images: ['/snow.png'],
  },
  icons: {
    icon: [
      { url: '/snow.png', sizes: '16x16', type: 'image/png' },
      { url: '/snow.png', sizes: '32x32', type: 'image/png' },
      { url: '/snow.png', sizes: '48x48', type: 'image/png' }
    ],
    shortcut: '/snow.png',
    apple: { url: '/snow.png', sizes: '180x180', type: 'image/png' }
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
