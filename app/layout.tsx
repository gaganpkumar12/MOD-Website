import type { Metadata } from "next";
import { DM_Sans, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const faviconPath = "/CF LOGO WITHOUT TEXT.png";

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
  metadataBase: new URL("https://cleanfanatics.com"),
  openGraph: {
    title: "Clean Fanatics",
    description: "Your home, spotless - in a tap.",
    type: "website",
  },
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath,
  },
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
