import { HeroSection } from "@/components/hero-section";
import { PlatformPreview } from "@/components/platform-preview";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ImpactSection } from "@/components/impact-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <div className="z-2 pt-14 -mt-14 bg-gradient-to-tr to-white from-emerald-300 dark:from-emerald-950 ">
      <header className="fixed top-4 z-50 w-full ">
        <Navbar />
      </header>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ImpactSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </>
  );
}
