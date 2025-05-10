import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CuboidIcon as Cube } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="container max-w-screen-xl pb-16">
      <Tabs defaultValue="tab1" className="w-full">
        <div className="border-b border-border/40 pb-2">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger
              value="tab1"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Tab 1
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Tab 2
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Tab 3
            </TabsTrigger>
            <TabsTrigger
              value="tab4"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Tab 4
            </TabsTrigger>
            <TabsTrigger
              value="tab5"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Tab 5
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="tab1" className="mt-0 pt-6 border border-border/40 rounded-md bg-card/20">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <Cube className="w-24 h-24 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab2" className="mt-0 pt-6 border border-border/40 rounded-md bg-card/20">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <Cube className="w-24 h-24 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab3" className="mt-0 pt-6 border border-border/40 rounded-md bg-card/20">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <Cube className="w-24 h-24 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab4" className="mt-0 pt-6 border border-border/40 rounded-md bg-card/20">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <Cube className="w-24 h-24 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab5" className="mt-0 pt-6 border border-border/40 rounded-md bg-card/20">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
              <Cube className="w-24 h-24 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
