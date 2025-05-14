"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export interface PricePoint {
  date: string
  kinasa: number
  market: number
  fairTrade?: number
}

interface MarketComparisonProps {
  productName: string
  priceData: PricePoint[]
  currency?: string
}

export function MarketComparison({ 
  productName, 
  priceData, 
  currency = "€" 
}: MarketComparisonProps) {
  
  // Calculate the average premium over market price
  const premium = priceData.reduce((acc, point) => {
    return acc + ((point.kinasa / point.market) - 1)
  }, 0) / priceData.length * 100
  
  return (
    <Card className="border border-emerald-300 hover:border-emerald-600 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-emerald-800">Market Price Comparison</CardTitle>
        <CardDescription>
          {productName} prices compared to global market prices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Fair Premium</AlertTitle>
          <AlertDescription className="text-amber-700">
            Kinasa prices are on average <span className="font-semibold text-emerald-600">{premium.toFixed(1)}%</span> higher than market prices, ensuring fair compensation for farmers.
          </AlertDescription>
        </Alert>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: `${currency}/kg`, angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => [`${currency}${value.toFixed(2)}/kg`, ""]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="market" 
                stroke="#9ca3af" 
                name="Global Market" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              {priceData[0].fairTrade !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="fairTrade" 
                  stroke="#f59e0b" 
                  name="Fair Trade Minimum" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}
              <Line 
                type="monotone" 
                dataKey="kinasa" 
                stroke="#10b981" 
                name="Kinasa Price" 
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
