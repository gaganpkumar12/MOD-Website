import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const logoUrl =
  "https://cleanfanatics.com/wp-content/uploads/2023/03/logo-25.png";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
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
    default: "Clean Fantics | Your home, spotless - in a tap.",
    template: "%s | Clean Fantics",
  },
  description:
    "Clean Fantics connects you with verified home cleaning professionals in minutes. Book on-demand, scheduled, or recurring help.",
  metadataBase: new URL("https://cleanfanatics.com"),
  openGraph: {
    title: "Clean Fantics",
    description: "Your home, spotless - in a tap.",
    type: "website",
  },
  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
    apple: logoUrl,
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
        className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
