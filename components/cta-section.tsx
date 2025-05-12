import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export function CtaSection() {
  return (
    <section className="container max-w-screen-xl py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Ready to transform global trade?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of farmers and ethical buyers already creating
          sustainable supply chains on Kinasa.
        </p>
        <div className="flex flex-wrap gap-4 w-full">
          <InteractiveHoverButton
            text="Join as Farmer"
            className="bg-green-600 w-1/5 py-4"
          />
          <InteractiveHoverButton text="Join as Buyer" className="w-1/5 py-4" />
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Register today and get a 3-month free trial with full platform access.
        </p>
      </div>
    </section>
  );
}
