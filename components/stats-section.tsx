"use client";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { categorie: "farmer_income", valeur: 40, fill: "hsl(142.1, 76.2%, 36.3%)" },
  { categorie: "farmers_connected", valeur: 14, fill: "hsl(120, 100%, 25%)" },
  { categorie: "satisfied_buyers", valeur: 95, fill: "hsl(204, 70%, 40%)" },
  { categorie: "countries", valeur: 26, fill: "hsl(39, 100%, 50%)" },
];

const chartConfig = {
  valeur: {
    label: "Value",
  },
  farmer_income: {
    label: "Income (+40%)",
    color: "hsl(142.1, 76.2%, 36.3%)",
    icon: TrendingUp,
  },
  farmers_connected: {
    label: "Thousands of farmers",
    color: "hsl(120, 100%, 25%)",
  },
  satisfied_buyers: {
    label: "Satisfied buyers",
    color: "hsl(204, 70%, 40%)",
  },
  countries: {
    label: "Countries represented",
    color: "hsl(39, 100%, 50%)",
  },
} satisfies ChartConfig;

export function StatsSection() {
  return (
    <section className="container max-w-screen-xl py-16 bg-primary/5">
      <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <ChartStats />

        <Card>
          <CardHeader>
            <CardTitle>Kinasa Impact</CardTitle>
            <CardDescription>2024 Statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="categorie"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="valeur"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={0}
                  animationDuration={1500}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Constantly growing <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Data based on the year 2024
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

const chartData2 = [
  { name: "producers", agriculteurs: 1260, cooperatives: 570 },
];

const chartConfig2 = {
  agriculteurs: {
    label: "Farmers",
    color: "hsl(142.1, 76.2%, 36.3%)",
  },
  cooperatives: {
    label: "Cooperatives",
    color: "hsl(41, 70%, 40%)",
  },
} satisfies ChartConfig;

export function ChartStats() {
  const totalProfiles = chartData2[0].agriculteurs + chartData2[0].cooperatives;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Producer Profiles</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig2}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData2}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            startAngle={0}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalProfiles.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Producers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="agriculteurs"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig2.agriculteurs.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="cooperatives"
              fill={chartConfig2.cooperatives.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          5.2% growth this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Detailed profiles with photos, videos and producer stories
        </div>
      </CardFooter>
    </Card>
  );
}
