import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="container max-w-screen-xl py-20" id="faq">
      <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div>
          <p className="text-gray-600 mb-6">
            Got more questions? Feel free to reach out to our support team or schedule a demo.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <FaqItem
              question="How does Kinasa ensure fair prices for farmers?"
              answer="We use a transparent pricing system that shows the complete value chain breakdown. Farmers set their own base prices based on production costs, and our system ensures they receive a minimum of 60% of the final export price."
            />
            <FaqItem
              question="What verification processes do you use for farmers and buyers?"
              answer="We verify all participants through a multi-step process including document verification, community vouching, and optional third-party certification. For high-volume buyers, we conduct additional background checks."
            />
            <FaqItem
              question="Can small-scale farmers use your platform effectively?"
              answer="We're specifically designed for small-scale producers. We offer cooperative joining options, aggregated shipping, and a simple mobile interface that works well in rural areas with limited connectivity."
            />
          </Accordion>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            <FaqItem
              question="How do payments work on the platform?"
              answer="We use a secure escrow system where buyers make a partial payment upfront (typically 50%) and the remainder upon shipment confirmation. Funds are released to farmers promptly, and we support multiple payment methods including mobile money."
            />
            <FaqItem
              question="What about shipping and logistics?"
              answer="We partner with trusted logistics providers who specialize in agricultural exports. The platform generates all necessary documentation, and farmers can choose between arranging their own shipping or using our simplified logistics service."
            />
            <FaqItem
              question="How do you handle quality control issues?"
              answer="Each listing includes detailed quality specifications. We encourage sample exchanges before large orders, and our dispute resolution process protects both parties if products don't meet agreed standards."
            />
            <FaqItem
              question="Is the platform available worldwide?"
              answer="We currently operate in 26 countries across Africa, Asia, and Latin America for producers, and accept buyers from anywhere in the world. We're expanding to new regions each quarter."
            />
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left">{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  )
}
