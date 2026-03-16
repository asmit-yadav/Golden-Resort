"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutSection() {
  const stats = [
    { value: "500+", label: "Events Organized" },
    { value: "50+", label: "Corporate Clients" },
    { value: "200+", label: "Wedding Celebrations" },
    { value: "8+", label: "Years of Excellence" },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-G0NYsEwBEKofszE53nOEgxzhLrveBU.webp"
                    alt="Floral arch decoration"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 object-cover"
                  />
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-UxKYPScbm5G1fZDKOXVEouBTGRNFzd.webp"
                    alt="Traditional ceremony setup"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 object-cover mt-4 sm:mt-8"
                  />
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-hpODjzoGGj0VTWvUslwtijzZt7EY2k.webp"
                    alt="Elegant entrance decoration"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 object-cover"
                  />
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-yd9XXYMGamvVCfBlhFNVIfDb5HY9lC.webp"
                    alt="Colorful event setup"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 object-cover mt-4 sm:mt-8"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-rose-600 text-white p-4 sm:p-6 rounded-lg shadow-xl">
                  <p className="text-sm sm:text-lg font-semibold">Trusted by</p>
                  <p className="text-xl sm:text-3xl font-bold">500+ Clients</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-4 sm:mb-6">
                About Golden Resort
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Transforming Visions into Extraordinary Experiences
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Golden Resort is a premier event management company specializing in
                creating memorable experiences for weddings, corporate events, and social gatherings. With over 8 years
                of industry expertise, we bring creativity, precision, and passion to every event we organize.
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                Our team of experienced professionals handles every aspect of event planning with meticulous attention
                to detail, from conceptualization to execution. We pride ourselves on understanding our clients' unique
                visions and transforming them into reality, exceeding expectations at every step.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className="border-none shadow-md bg-gray-50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <CardContent className="p-3 sm:p-4 text-center">
                      <p className="text-xl sm:text-3xl font-bold text-rose-600">{stat.value}</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-tight">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Link href="/#services" passHref>
                <Button 
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}