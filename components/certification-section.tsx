"use client"

import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CertificationSection() {
  const certificateImages = [
    {
      src: "/image_79c9b1.png",
      alt: "Government of India Registration Certificate",
    },
    {
      src: "/image_79c9d8.png",
      alt: "Registration Certificate Details",
    },
    {
      src: "/image_79ccd8.png",
      alt: "Certificate Issuing Authority Details",
    },
  ]

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <section id="certification" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Registration Certification</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We are a legally registered and compliant entity, ensuring complete peace of mind for our clients.
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
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {certificateImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden border-gray-200 shadow-lg">
                      <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}