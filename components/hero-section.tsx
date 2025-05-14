import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MacbookPro } from "./ui/macbook-pro";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export function HeroSection() {
  return (
    <section className="container max-w-screen-xl py-20 md:py-24 flex justify-center items-center ">
      <div className="flex gap-12 items-center w-full">
        <div className="flex flex-col w-full ">
          <div className="flex mb-6">
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm rounded-full border-primary/30 bg-primary/5 text-primary"
            >
              Fair Trade Reimagined
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-balance font-bold tracking-tight mb-6">
            Bridging farmers <br />
            <span>to global markets</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Kinasa connects small farmers in developing countries directly with
            international buyers, ensuring fair prices, transparency, and
            sustainable practices.
          </p>
          <div className="flex flex-wrap gap-4 w-full">
            <InteractiveHoverButton
              text="Join as Farmer"
              className="bg-green-600 w-1/5 py-4"
            />
            <InteractiveHoverButton
              text="Join as Buyer"
              className="w-1/5 py-4"
            />
          </div>
        </div>
        <div className="absolute -right-1/3 w-full">
          <MacbookPro
            src="/hero.jpg"
            className="w-full scale-125"
          />
        </div>
      </div>
    </section>
  );
}
