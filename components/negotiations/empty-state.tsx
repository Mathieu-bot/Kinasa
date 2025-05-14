"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface NegotiationsEmptyProps {
  title: string
  description: string
  buttonText: string
  onAction: () => void
}

export function NegotiationsEmpty({ title, description, buttonText, onAction }: NegotiationsEmptyProps) {
  return (
    <Card className="w-full border-dashed">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-2">
        <div className="rounded-full w-20 h-20 bg-muted flex items-center justify-center">
          <Plus className="h-10 w-10 text-muted-foreground" />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
          onClick={onAction}
        >
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
