import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="container max-w-screen-xl py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to transform global trade?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of farmers and ethical buyers already creating sustainable supply chains on Kinasa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8">
            Join as a Farmer
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Join as a Buyer
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Register today and get a 3-month free trial with full platform access.
        </p>
      </div>
    </section>
  )
}
