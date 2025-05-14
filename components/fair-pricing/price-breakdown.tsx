"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface PriceComponent {
  name: string
  value: number
  color: string
  description: string
}

interface PriceBreakdownProps {
  productName: string
  priceComponents: PriceComponent[]
  totalPrice: number
  currency?: string
}

export function PriceBreakdown({ 
  productName, 
  priceComponents, 
  totalPrice, 
  currency = "€" 
}: PriceBreakdownProps) {
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? "start" : "end"} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card className="border border-emerald-300 hover:border-emerald-600 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-emerald-800">Price Breakdown</CardTitle>
        <CardDescription>
          Transparency for {productName} (Total: {currency}{totalPrice.toFixed(2)}/kg)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priceComponents}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {priceComponents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [
                  `${currency}${value.toFixed(2)} (${((value/totalPrice)*100).toFixed(1)}%)`, 
                  "Amount"
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-3 text-emerald-800">Components:</h3>
          <div className="space-y-3">
            {priceComponents.map((component, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: component.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{component.name}</span>
                    <span>
                      {currency}{component.value.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{component.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
