import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinasa - Commerce équitable pour agriculteurs",
  description:
    "Plateforme de commerce équitable connectant les petits producteurs des pays en développement avec des acheteurs internationaux.",
  keywords: [
    "commerce équitable",
    "agriculture",
    "agriculteurs",
    "producteurs",
    "développement durable",
    "commerce international",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
