"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface TrendData {
  region: string
  conventional: number
  fairTrade: number
  kinasa: number
}

interface PriceTrendsProps {
  productName: string
  trendData: TrendData[]
  currency?: string
}

export function PriceTrends({ 
  productName, 
  trendData, 
  currency = "€" 
}: PriceTrendsProps) {
  return (
    <Card className="border border-emerald-300 hover:border-emerald-600 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-emerald-800">Regional Price Comparison</CardTitle>
        <CardDescription>
          {productName} prices by region and trading system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="region" />
              <YAxis label={{ value: `${currency}/kg`, angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => [`${currency}${value.toFixed(2)}/kg`, ""]}
                labelFormatter={(label) => `Region: ${label}`}
              />
              <Legend />
              <Bar dataKey="conventional" name="Conventional Market" fill="#9ca3af" />
              <Bar dataKey="fairTrade" name="Fair Trade" fill="#f59e0b" />
              <Bar dataKey="kinasa" name="Kinasa Platform" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
