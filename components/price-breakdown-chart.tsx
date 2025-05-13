"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Producteur", value: 4.5, color: "#16a34a" },
  { name: "Certification", value: 0.3, color: "#86ef0c" },
  { name: "Logistique", value: 1.2, color: "#22c5de" },
  { name: "Plateforme", value: 0.25, color: "#efaa00" },
];

const COLORS = data.map((item) => item.color);

export default function PriceBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} €/kg`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
