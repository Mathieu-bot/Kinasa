"use client";
import type React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  LineChart,
  ShieldCheck,
  TruckIcon,
  Share2,
  Banknote,
  Framer,
  RocketIcon,
} from "lucide-react";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Simplified Logistics",
    date: "Jan 2025",
    content:
      "Streamlined payment systems and logistics solutions make international trade accessible to small producers.",
    category: "Planning",
    icon: RocketIcon,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Direct Connection",
    date: "Feb 2024",
    content:
      "Our platform connects farmers directly with buyers, eliminating unnecessary middlemen and increasing farmer income.",
    category: "Connection",
    icon: Share2,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Fair Pricing",
    date: "Mar 2024",
    content:
      "Transparent pricing mechanisms ensure farmers receive fair compensation while buyers get quality products at reasonable prices.",
    category: "Pricing",
    icon: Banknote,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Verified Profiles",
    date: "Apr 2025",
    content:
      "Detailed producer profiles with certification verification build trust between all parties in the supply chain.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 60,
  },
];

export function FeaturesSection() {
  return (
    <>
      <section
        className="container flex items-center justify-between ml-14 max-w-screen-xl py-20"
        id="features"
      >
        <div className="flex flex-col gap-5 ">
          <h2 className="text-7xl font-bold text-grey-600 dark:text-white mb-4">
            How Kinasa Works
          </h2>
          <p className="text-grey-600 dark:text-white  text-2xl max-w-2xl mx-auto mb-12">
            Our platform bridges the gap between small farmers and international
            buyers, creating a more sustainable and equitable global trade
            ecosystem.
          </p>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>
    </>
  );
}

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <Card className="bg-white border-border/60">
//       <CardHeader>
//         <div className="mb-4">{icon}</div>
//         <CardTitle className="text-xl">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-gray-600">{description}</p>
//       </CardContent>
//     </Card>
//   );
// }
