import type React from "react"
import { Metadata } from "next/types"
import "./globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinasa - Fair Trade for Farmers",
  description:
    "Fair trade platform connecting small producers from developing countries with international buyers.",
  keywords: [
    "fair trade",
    "agriculture",
    "farmers",
    "producers",
    "sustainable development",
    "international trade",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
