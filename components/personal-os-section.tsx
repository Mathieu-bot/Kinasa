import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PersonalOsSection() {
  return (
    <section className="container max-w-screen-xl py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Your personal
            <br />
            operating system
          </h2>
          <p className="text-muted-foreground mb-8">
            Connect your team with an intuitive platform that brings together your data, applications, and people.
          </p>

          <Card className="bg-card/50 border-border/40 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">AI Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tell the AI to manage your tasks</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureItem title="Email integration" />
            <FeatureItem title="Customizable" />
            <FeatureItem title="Real-time collaboration" />
            <FeatureItem title="Unlimited storage" />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Terminal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs font-mono">
              <div className="text-green-500 mb-1">$ npm install next-saas</div>
              <div className="text-muted-foreground mb-1">Installing packages...</div>
              <div className="text-blue-500">✓ Installation complete</div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <FeatureCheck title="Analytics dashboard" />
            <FeatureCheck title="Predictive analytics" />
            <FeatureCheck title="Kanban view project tracking" />
            <FeatureCheck title="Auto-sync integrations" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
        <Check className="h-3 w-3 text-primary-foreground" />
      </div>
      <span className="text-sm">{title}</span>
    </div>
  )
}

function FeatureCheck({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 bg-accent/50 rounded-md p-2">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
        <Check className="h-3 w-3 text-primary-foreground" />
      </div>
      <span className="text-xs">{title}</span>
    </div>
  )
}
