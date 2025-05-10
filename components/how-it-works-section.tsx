import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function HowItWorksSection() {
  return (
    <section className="container max-w-screen-xl py-20 bg-primary/5" id="how-it-works">
      <h2 className="text-3xl font-bold mb-4">The next-gen trading platform</h2>
      <p className="text-gray-600 max-w-2xl mb-12">
        Kinasa provides a comprehensive solution that transforms how agricultural products move from farm to market,
        putting the power back in the hands of producers while giving buyers access to authentic, quality products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-white border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">For Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Create detailed farm profiles</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>List products with transparent pricing</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Receive direct inquiries from global buyers</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Access simplified export logistics</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Get paid securely and promptly</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">For Buyers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Discover authentic products with provenance</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Connect directly with verified producers</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Ensure ethical and sustainable sourcing</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Simplify import documentation</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Track orders from farm to delivery</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kinasa Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Up to 40% higher earnings for farmers</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Complete transparency in pricing</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Verified sustainability practices</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Smaller minimum order quantities</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/20 p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>End-to-end traceability</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
