"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const SCROLL_SPEED = 30 // seconds to complete one loop

export function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setScrollHeight(containerRef.current.scrollHeight / 2)
    }
  }, [])

  const testimonials = [
    {
      name: "Maria Gutierrez",
      role: "Coffee Cooperative Leader, Colombia",
      quote:
        "Kinasa has transformed how we do business. We now receive 35% more for our coffee and have direct relationships with buyers who value our story and quality.",
      rating: 5,
      isPrimary: true,
    },
    {
      name: "Jean-Pierre Dumont",
      role: "Specialty Coffee Importer, France",
      quote:
        "The transparency and direct connection with farmers has revolutionized our sourcing. Our customers appreciate the authentic stories and consistent quality.",
      rating: 5,
      isPrimary: false,
    },
    {
      name: "Kwame Addo",
      role: "Cocoa Farmer Association, Ghana",
      quote:
        "Before Kinasa, we struggled to find reliable buyers who would pay fairly. Now we have stable partnerships and can plan for the future. Our community is thriving.",
      rating: 5,
      isPrimary: true,
    },
    {
      name: "Sophie Chen",
      role: "Specialty Food Brand Owner, USA",
      quote:
        "Finding authentic, sustainably-produced ingredients used to be incredibly difficult. Kinasa has simplified our sourcing process while ensuring farmers get fair compensation.",
      rating: 4,
      isPrimary: false,
    },
    {
      name: "Raj Patel",
      role: "Spice Cooperative, India",
      quote:
        "The platform has opened global markets that were previously inaccessible to us. We've increased our production and can now invest in organic certification.",
      rating: 5,
      isPrimary: true,
    },
    {
      name: "Lukas Meyer",
      role: "Chocolate Manufacturer, Switzerland",
      quote:
        "The traceability and quality control features give us confidence in our supply chain. Our customers appreciate knowing the story behind every ingredient.",
      rating: 5,
      isPrimary: false,
    },
    {
      name: "Isabel Sanchez",
      role: "Quinoa Producer, Peru",
      quote:
        "Joining Kinasa has transformed our business. We now export directly to health food companies across Europe and receive fair prices that reflect our organic practices.",
      rating: 5,
      isPrimary: true,
    },
    {
      name: "David Wilson",
      role: "Ethical Food Retailer, UK",
      quote:
        "The platform's verification process ensures we're truly getting what we pay for. The direct messaging with producers has built valuable relationships.",
      rating: 5,
      isPrimary: false,
    },
  ]

  return (
    <section className="container max-w-screen-xl py-20 overflow-hidden" id="testimonials">
      <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>

      <div
        className="relative h-[400px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={containerRef}
          className="testimonial-scroll"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
            animationDuration: `${SCROLL_SPEED}s`,
            transform: `translateY(-${scrollHeight}px)`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i + testimonials.length} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  quote,
  rating,
  isPrimary,
}: {
  name: string
  role: string
  quote: string
  rating: number
  isPrimary: boolean
}) {
  return (
    <Card
      className={`${isPrimary ? "bg-primary/10 border-primary/30" : "bg-white border-border/40"} transition-all duration-300 hover:shadow-lg`}
    >
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-sm mb-4 text-gray-600">{quote}</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border/20">
            <AvatarImage src={`https://i.pravatar.cc/40?u=${name}`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
