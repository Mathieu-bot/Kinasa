import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import AuthProvider from "@/components/auth-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full relative z-0 overflow-x-hidden">
              <div className="z-2 pt-14">{children}</div>
              <AnimatedGridPattern className="w-full blur-xs h-full -z-10"></AnimatedGridPattern>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
