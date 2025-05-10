import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, LineChart, ShieldCheck, TruckIcon } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="container max-w-screen-xl py-20" id="features">
      <h2 className="text-3xl font-bold text-center mb-4">How Kinasa Works</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Our platform bridges the gap between small farmers and international buyers, creating a more sustainable and
        equitable global trade ecosystem.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Users className="h-10 w-10 text-primary" />}
          title="Direct Connection"
          description="Our platform connects farmers directly with buyers, eliminating unnecessary middlemen and increasing farmer income."
        />
        <FeatureCard
          icon={<LineChart className="h-10 w-10 text-primary" />}
          title="Fair Pricing"
          description="Transparent pricing mechanisms ensure farmers receive fair compensation while buyers get quality products at reasonable prices."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-10 w-10 text-primary" />}
          title="Verified Profiles"
          description="Detailed producer profiles with certification verification build trust between all parties in the supply chain."
        />
        <FeatureCard
          icon={<TruckIcon className="h-10 w-10 text-primary" />}
          title="Simplified Logistics"
          description="Streamlined payment systems and logistics solutions make international trade accessible to small producers."
        />
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-white border-border/60">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
