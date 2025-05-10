import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="container max-w-screen-xl py-20 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex mb-6">
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm rounded-full border-primary/30 bg-primary/5 text-primary"
            >
              Fair Trade Reimagined
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Bridging farmers to global markets
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Kinasa connects small farmers in developing countries directly with international buyers, ensuring fair
            prices, transparency, and sustainable practices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="px-8">
              Join as Farmer
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Join as Buyer
            </Button>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Farmers working in field"
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium">Direct, transparent pricing</div>
                <div className="text-xs text-gray-500">Up to 40% higher earnings for farmers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
