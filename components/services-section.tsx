"use client"
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Fallback data used when Firestore is empty or fails
const fallbackServices = [
  {
    title: "Wedding Planning",
    description: "Comprehensive wedding planning services from engagement to reception, including venue selection, decor, catering, and entertainment coordination.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp",
  },
  {
    title: "Corporate Events",
    description: "Professional corporate event management including conferences, product launches, team building activities, and annual celebrations.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp",
  },
  {
    title: "Social Gatherings",
    description: "Memorable social events including birthday parties, anniversaries, baby showers, and festive celebrations tailored to your preferences.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp",
  },
  {
    title: "Decoration Services",
    description: "Exquisite decoration services featuring floral arrangements, themed setups, lighting design, and custom installations for any occasion.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp",
  },
  {
    title: "Dandiya Night",
    description: "Vibrant and energetic Dandiya and Garba nights with professional choreography, live music, and stunning thematic decor.",
    image: "https://images.unsplash.com/photo-1604282719164-8931b097b6a0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Festival Events",
    description: "Grand celebrations for all major festivals, including Diwali, Holi, and more, with traditional decor, food, and entertainment.",
    image: "https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Destination Wedding",
    description: "Exotic destination wedding planning services at breathtaking locations, managing travel, accommodation, and all event logistics.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Catering Services",
    description: "Gourmet catering services offering a wide range of cuisines, from traditional Indian dishes to international flavors, for all events.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
  },
]

interface Service {
  title: string
  description: string
  image: string
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(fallbackServices)

  useEffect(() => {
    async function fetchServices() {
      try {
        const q = query(collection(db, "services"), orderBy("order", "asc"))
        const snap = await getDocs(q)
        if (snap.size > 0) {
          setServices(
            snap.docs.map((d) => {
              const data = d.data()
              return { title: data.title, description: data.description, image: data.imageUrl }
            })
          )
        }
      } catch (err) {
        // Firestore unavailable — fallback data already set
      }
    }
    fetchServices()
  }, [])

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-4 sm:mb-6">
              Our Services
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">
              Comprehensive Event Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
              From intimate gatherings to grand celebrations, we offer end-to-end event management services tailored to
              your unique requirements and vision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-white rounded-lg hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 group-hover:text-rose-600 transition-colors duration-300 font-serif">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}