import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StardustCursor from "./components/StardustCursor";
import MilkyWayLoader from "./components/MilkyWayLoader";
import InteractiveSpaceBackground from "./components/InteractiveSpaceBackground";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Drama | High-End Interior Design",
  description: "Main character energy for your space in Pune. Unveil deep space cosmic interiors by Khushi Surana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <InteractiveSpaceBackground />
        <MilkyWayLoader />
        <StardustCursor />
        {children}
      </body>
    </html>
  );
}
