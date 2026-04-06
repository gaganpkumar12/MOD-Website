import type { Metadata } from "next";
import { DM_Sans, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const faviconPath = "/CF LOGO WITHOUT TEXT.png";
const siteUrl = "https://cleanfanatics.com";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-footer-display",
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Clean Fanatics | Your home, spotless - in a tap.",
    template: "%s | Clean Fanatics",
  },
  description:
    "Clean Fanatics connects you with verified home cleaning professionals in minutes. Book on-demand, scheduled, or recurring help.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "home cleaning services",
    "cleaning professionals",
    "book cleaners online",
    "house cleaning app",
    "verified cleaners",
    "Clean Fanatics",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Clean Fanatics",
    description: "Your home, spotless - in a tap.",
    type: "website",
    url: siteUrl,
    siteName: "Clean Fanatics",
    images: [
      {
        url: faviconPath,
        width: 512,
        height: 512,
        alt: "Clean Fanatics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean Fanatics",
    description:
      "Clean Fanatics connects you with verified home cleaning professionals in minutes.",
    images: [faviconPath],
  },
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath,
  },
  category: "Home Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
