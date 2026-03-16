"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// Fallback data
const fallbackGalleryItems = [
  { id: 1, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp", category: "wedding", title: "Traditional Wedding Entrance" },
  { id: 2, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-UxKYPScbm5G1fZDKOXVEouBTGRNFzd.webp", category: "haldi", title: "Haldi Ceremony Setup" },
  { id: 3, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-hpODjzoGGj0VTWvUslwtijzZt7EY2k.webp", category: "decor", title: "Floral Entrance Arch" },
  { id: 4, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-yd9XXYMGamvVCfBlhFNVIfDb5HY9lC.webp", category: "engagement", title: "Engagement Celebration" },
  { id: 5, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-02-06-CTbIuA90ieM6x7ihfoHGA9lj4v22i9.webp", category: "wedding", title: "Wedding Entrance Decor" },
  { id: 6, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-GyiaaJM8eHDS0e7ynK9dxw4ftESmPe.webp", category: "social", title: "Mehendi Ceremony Setup" },
  { id: 7, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-G0NYsEwBEKofszE53nOEgxzhLrveBU.webp", category: "decor", title: "Floral Decoration" },
  { id: 8, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp", category: "corporate", title: "Corporate Stage Setup" },
  { id: 9, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp", category: "anniversary", title: "Anniversary Celebration" },
  { id: 10, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp", category: "social", title: "Outdoor Event Space" },
]

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems)

  const filters = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Weddings" },
    { id: "corporate", label: "Corporate" },
    { id: "social", label: "Social Events" },
    { id: "decor", label: "Decorations" },
    { id: "anniversary", label: "Anniversary" },
    { id: "haldi", label: "Haldi" },
    { id: "engagement", label: "Engagement" },
    { id: "birthday", label: "Birthdays" },
  ]

  useEffect(() => {
    async function fetchGallery() {
      try {
        const q = query(collection(db, "gallery"), orderBy("order", "asc"))
        const snap = await getDocs(q)
        if (snap.size > 0) {
          setGalleryItems(
            snap.docs.map((d, i) => {
              const data = d.data()
              return {
                id: i + 1,
                image: data.imageUrl,
                category: data.category,
                title: data.title,
              }
            })
          )
        }
      } catch (err) {
        // Firestore unavailable — fallback data already set
      }
    }
    fetchGallery()
  }, [])

  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  const openLightbox = (image: string) => {
    setCurrentImage(image)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-6">
              Our Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Event Gallery</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Browse through our collection of beautifully executed events and stunning decorations that showcase our
              creativity and attention to detail.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`rounded-full px-6 ${
                  activeFilter === filter.id ? "bg-rose-600 hover:bg-rose-700" : "hover:bg-rose-50"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-none"
                onClick={() => openLightbox(item.image)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center p-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">+</span>
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2 rounded-full">
              View Full Gallery
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}