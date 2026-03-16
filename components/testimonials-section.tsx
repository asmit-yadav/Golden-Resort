"use client"

import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya & Rahul Sharma",
      role: "Wedding Clients",
      image: "/placeholder-user.jpg",
      content:
        "Golden Resort transformed our wedding into a magical experience. Their attention to detail and creative vision exceeded our expectations. Everything was perfect!",
      rating: 5,
    },
    {
      name: "Akash Patel",
      role: "Corporate Client",
      image: "/placeholder-user.jpg",
      content:
        "We hired Golden Resort for our annual corporate conference. The team handled everything with utmost professionalism, and our attendees were impressed with the elegant decor.",
      rating: 5,
    },
    {
      name: "Meera Kapoor",
      role: "Birthday Celebration",
      image: "/placeholder-user.jpg",
      content:
        "I cannot thank Golden Resort enough for creating such a beautiful 50th birthday celebration. Their creativity and execution made the evening truly special.",
      rating: 5,
    },
    {
      name: "TechSolutions India",
      role: "Product Launch Event",
      image: "/placeholder-user.jpg",
      content:
        "Golden Resort handled our product launch with exceptional professionalism. Their understanding of our brand resulted in an impressive event that generated significant media coverage.",
      rating: 5,
    },
    {
        name: "Anjali & Vikram Singh",
        role: "Anniversary Party",
        image: "/placeholder-user.jpg",
        content:
          "For our 25th anniversary, Golden Resort created an atmosphere of pure elegance and nostalgia. It was a beautiful evening that we and our guests will cherish forever.",
        rating: 5,
    },
  ]

  const clientLogos = [
    { name: "Innovate Inc.", logo: "https://placehold.co/120x60/EEE/31343C?text=Innovate" },
    { name: "Quantum Corp", logo: "https://placehold.co/120x60/EEE/31343C?text=Quantum" },
    { name: "Apex Solutions", logo: "https://placehold.co/120x60/EEE/31343C?text=Apex" },
    { name: "Stellar Group", logo: "https://placehold.co/120x60/EEE/31343C?text=Stellar" },
    { name: "Zenith Co.", logo: "https://placehold.co/120x60/EEE/31343C?text=Zenith" },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-6">
              Client Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from our satisfied clients about their experiences working with
              Golden Resort.
            </p>
          </div>

          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full border-none shadow-lg bg-white flex flex-col group transition-all duration-300 hover:bg-rose-500 hover:scale-105">
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-rose-100 mr-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-white">{testimonial.name}</p>
                            <p className="text-rose-600 text-sm group-hover:text-rose-100">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400 group-hover:fill-white group-hover:text-white" />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 italic flex-grow group-hover:text-white">
                          "{testimonial.content}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8" />
            <CarouselNext className="-right-4 md:-right-8" />
          </Carousel>

          {/* Client Logos */}
          <div className="mt-20">
            <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider font-medium">
              Trusted by Leading Brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {clientLogos.map((client, i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all text-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-12 w-auto"
                  />
                  <p className="mt-2 text-sm text-gray-600 font-semibold">{client.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}