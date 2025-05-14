import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logo } from "./ui/Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex rounded-lg w-9/12 mx-auto border-b border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/95 shadow-sm backdrop-blur">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-xl"><span className="text-amber-700">Kina</span><span className="text-emerald-700">sa</span></span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="transition-colors hover:text-emerald-600"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-emerald-600"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="transition-colors hover:text-emerald-600"
            >
              Success Stories
            </Link>
            <Link href="#faq" className="transition-colors hover:text-emerald-600">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
          >
            Se connecter
          </Link>
          <Link href="/auth/register">
            <Button className="ml-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-emerald-600 hover:to-emerald-500 shadow hover:shadow-md transition-all duration-300">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
