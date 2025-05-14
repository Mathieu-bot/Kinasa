import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
            Kinasa empowers farming communities around the world by connecting
            them directly with fair trade opportunities, eliminating
            exploitative middlemen, and ensuring they receive proper
            compensation for their quality products.
          </p>

          <Card className="bg-primary/5 border-primary/20 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Community Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                For every transaction, 1% goes toward local community
                development projects chosen by the producer communities.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                Economic empowerment
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                Sustainable agriculture
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                Women-led cooperatives
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                Environmental conservation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden relative">
              <Image
                alt="Impact Image"
                src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/5/15/1431698013780/5dd84ee7-d1da-4d8b-95fb-b292a284d283-2060x1236.jpeg?width=1900&dpr=1&s=none&crop=none"
                width={200}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 h-32 rounded-lg overflow-hidden relative">
              <Image
                src="data:image/jpeg;base64,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"
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL7tKCrWDJov4fO27KlrwmP8oUyGwgKXJtA&s"
                alt="Farmer cooperative meeting"
                width={200}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden relative">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKxDCAsfrF7wtE1XKE-2mfVFqvrL4PMgVkA&s"
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SCsiJxKM7Gs0X0-1Y3oOBttJZ6WsdHC5qw&s"                  alt="Coffee cooperative in Ethiopia"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Ethiopian Coffee Revival</h4>
              <p className="text-sm text-gray-600 mb-4">
                How a coffee cooperative in Ethiopia increased their income by
                35% and invested in local education.
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOVbEf5jPTA8pdC5HUv1BaFvIpFxw7CbDOmw&s"
                  alt="Chocolate artisans in Peru"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">From Bean to Chocolate</h4>
              <p className="text-sm text-gray-600 mb-4">
                Peruvian cocoa farmers who transformed their community by
                connecting with specialty chocolate makers.
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-9d82C08gV3XXHF24mLXHhulfNAHgOCQgA&s"
                  alt="Women's spice collective in India"
                  width={384}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Women-Led Spice Revolution</h4>
              <p className="text-sm text-gray-600 mb-4">
                How a women's collective in Kerala transformed the local economy
                through direct spice exports.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Read Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
