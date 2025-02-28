
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScrollProvider";
import Head from "next/head";

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
    icon: "/snow.png",
    shortcut: "/snow.png",
    apple: "/snow.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head> 
      <title>Snow || Snow Medical</title>
      <meta name="keywords" content="medical, healthcare, snow medical, medical community" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" sizes="32x32" href="/snow.png" />
      <meta name="description" content="snow is a medical community." />
      </Head>
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
