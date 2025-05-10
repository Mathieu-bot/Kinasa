import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ImpactSection() {
  return (
    <section className="container max-w-screen-xl py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Creating sustainable
            <br />
            impact globally
          </h2>
          <p className="text-gray-600 mb-8">
            Kinasa empowers farming communities around the world by connecting them directly with fair trade
            opportunities, eliminating exploitative middlemen, and ensuring they receive proper compensation for their
            quality products.
          </p>

          <Card className="bg-primary/5 border-primary/20 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                For every transaction, 1% goes toward local community development projects chosen by the producer
                communities.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Economic empowerment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Sustainable agriculture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Women-led cooperatives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Environmental conservation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=256&width=200"
                alt="Farmer harvesting coffee"
                width={200}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 h-32 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=128&width=200"
                alt="Coffee processing"
                width={200}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 h-32 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=128&width=200"
                alt="Farmer cooperative meeting"
                width={200}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=256&width=200"
                alt="Fair trade certification"
                width={200}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-6">Our Impact Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-border/40">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Coffee cooperative in Ethiopia"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Ethiopian Coffee Revival</h4>
              <p className="text-sm text-gray-600 mb-4">
                How a coffee cooperative in Ethiopia increased their income by 35% and invested in local education.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Read Story
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-border/40">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Chocolate artisans in Peru"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">From Bean to Chocolate</h4>
              <p className="text-sm text-gray-600 mb-4">
                Peruvian cocoa farmers who transformed their community by connecting with specialty chocolate makers.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Read Story
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-border/40">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt="Women's spice collective in India"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Women-Led Spice Revolution</h4>
              <p className="text-sm text-gray-600 mb-4">
                How a women's collective in Kerala transformed the local economy through direct spice exports.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Read Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
