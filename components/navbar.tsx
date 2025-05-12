import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex rounded-lg w-9/12 mx-auto border-b border-border/40 bg-white/95 dark:bg-green-950/20 backdrop-blur">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
            <span className="font-bold">Kinasa</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="transition-colors hover:text-primary"
            >
              Success Stories
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link href="#faq" className="transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Se connecter
          </Link>
          <Link href="/auth/register">
            <Button className="ml-4 rounded-full">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
