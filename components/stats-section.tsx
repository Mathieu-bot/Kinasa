import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section className="container max-w-screen-xl py-16 bg-primary/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard value="40%" label="Average increase in farmer income" />
        <StatCard value="14,000+" label="Farmers connected" />
        <StatCard value="95%" label="Satisfied buyers" />
        <StatCard value="26" label="Countries represented" />
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="bg-white border-border/40">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2 text-primary">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
