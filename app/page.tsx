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

export default function HomePage() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full mt-4 ">
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
    </>
  );
  {
    /* <div className="relative overflow-hidden">
      {/* Hero Section */
  }
  //   <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-40 lg:pb-48">
  //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
  //       <div className="text-center sm:text-left">
  //         <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
  //           <span className="block xl:inline">Commerce équitable pour</span>{" "}
  //           <span className="block text-primary xl:inline">
  //             les agriculteurs
  //           </span>
  //         </h1>
  //         <p className="mx-auto mt-6 max-w-lg text-lg text-gray-500 dark:text-gray-300 sm:mx-0">
  //           Connectez directement les petits producteurs des pays en
  //           développement avec des acheteurs internationaux pour un commerce
  //           plus juste et transparent.
  //         </p>
  //         <div className="mt-10 sm:flex sm:justify-start">
  //           <div className="rounded-md shadow">
  //             <Link href="/auth/register">
  //               <Button size="lg">Commencer maintenant</Button>
  //             </Link>
  //           </div>
  //           <div className="mt-3 sm:ml-3 sm:mt-0">
  //             <Link href="/about">
  //               <Button variant="outline" size="lg">
  //                 En savoir plus
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Background décoration */}
  //     <div className="absolute top-0 right-0 -z-10 opacity-20 dark:opacity-10">
  //       <svg
  //         width="800"
  //         height="800"
  //         viewBox="0 0 800 800"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="text-primary"
  //       >
  //         <circle cx="400" cy="400" r="400" fill="currentColor" />
  //       </svg>
  //     </div>
  //   </div>

  //   {/* Statistiques */}
  //   <div className="bg-white dark:bg-gray-900 py-12">
  //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
  //         <div className="text-center">
  //           <p className="text-4xl font-bold text-primary">500+</p>
  //           <p className="mt-2 text-gray-600 dark:text-gray-400">
  //             Petits producteurs
  //           </p>
  //         </div>
  //         <div className="text-center">
  //           <p className="text-4xl font-bold text-primary">50+</p>
  //           <p className="mt-2 text-gray-600 dark:text-gray-400">
  //             Acheteurs internationaux
  //           </p>
  //         </div>
  //         <div className="text-center">
  //           <p className="text-4xl font-bold text-primary">200+</p>
  //           <p className="mt-2 text-gray-600 dark:text-gray-400">
  //             Produits différents
  //           </p>
  //         </div>
  //         <div className="text-center">
  //           <p className="text-4xl font-bold text-primary">15%</p>
  //           <p className="mt-2 text-gray-600 dark:text-gray-400">
  //             Augmentation des revenus
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div> */}
}
