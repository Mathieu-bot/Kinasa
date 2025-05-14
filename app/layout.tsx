import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full relative z-0 overflow-x-hidden">
            <div className="z-2 pt-14">{children}</div>
            <AnimatedGridPattern className="w-full blur-sm h-full -z-10"></AnimatedGridPattern>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
