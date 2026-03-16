"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import Chatbot from "@/components/chatbot"

const fallbackGalleryItems = [
  { id: 1, title: "Elegant Garden Wedding", category: "wedding", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp", description: "Beautiful outdoor ceremony with floral arrangements" },
  { id: 2, title: "Corporate Tech Summit", category: "corporate", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp", description: "Modern conference setup with interactive displays" },
  { id: 3, title: "Princess Birthday Party", category: "birthday", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp", description: "Magical themed celebration with castle decorations" },
  { id: 4, title: "Wedding Ceremony", category: "wedding", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-UxKYPScbm5G1fZDKOXVEouBTGRNFzd.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-UxKYPScbm5G1fZDKOXVEouBTGRNFzd.webp", description: "Traditional ceremony highlights" },
  { id: 5, title: "Golden Anniversary", category: "anniversary", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-hpODjzoGGj0VTWvUslwtijzZt7EY2k.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-hpODjzoGGj0VTWvUslwtijzZt7EY2k.webp", description: "Sophisticated anniversary celebration" },
  { id: 6, title: "Charity Gala Night", category: "charity", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-yd9XXYMGamvVCfBlhFNVIfDb5HY9lC.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-yd9XXYMGamvVCfBlhFNVIfDb5HY9lC.webp", description: "Upscale fundraising event with elegant decor" },
  { id: 7, title: "Corporate Event", category: "corporate", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-GyiaaJM8eHDS0e7ynK9dxw4ftESmPe.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-GyiaaJM8eHDS0e7ynK9dxw4ftESmPe.webp", description: "Professional event documentation" },
  { id: 8, title: "Graduation Celebration", category: "graduation", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-G0NYsEwBEKofszE53nOEgxzhLrveBU.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-G0NYsEwBEKofszE53nOEgxzhLrveBU.webp", description: "Memorable graduation party setup" },
  { id: 9, title: "Floral Decoration", category: "decor", type: "image", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp", thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp", description: "Beautiful floral arrangements" },
]

const categories = [
  { id: "all", label: "All Events" },
  { id: "wedding", label: "Weddings" },
  { id: "corporate", label: "Corporate" },
  { id: "birthday", label: "Birthdays" },
  { id: "anniversary", label: "Anniversaries" },
  { id: "haldi", label: "Haldi" },
  { id: "engagement", label: "Engagement" },
  { id: "social", label: "Social Events" },
  { id: "decor", label: "Decorations" },
  { id: "charity", label: "Charity" },
  { id: "graduation", label: "Graduations" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems)
  const [filteredItems, setFilteredItems] = useState(fallbackGalleryItems)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch from Firestore
  useEffect(() => {
    async function fetchGallery() {
      try {
        const q = query(collection(db, "gallery"), orderBy("order", "asc"))
        const snap = await getDocs(q)
        if (snap.size > 0) {
          const items = snap.docs.map((d, i) => {
            const data = d.data()
            return {
              id: i + 1,
              title: data.title,
              category: data.category,
              type: "image" as const,
              src: data.imageUrl,
              thumbnail: data.imageUrl,
              description: data.description,
            }
          })
          setGalleryItems(items)
        }
      } catch (err) {
        // Firestore unavailable — fallback data already set
      }
    }
    fetchGallery()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, galleryItems])

  const openLightbox = (item: any) => {
    setCurrentItem(item)
    setCurrentIndex(filteredItems.findIndex((i) => i.id === item.id))
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    let newIndex = currentIndex
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1
    } else if (direction === "next" && currentIndex < filteredItems.length - 1) {
      newIndex = currentIndex + 1
    }
    setCurrentIndex(newIndex)
    setCurrentItem(filteredItems[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateLightbox("prev")
      if (e.key === "ArrowRight") navigateLightbox("next")
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, currentIndex, filteredItems.length])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in-up text-white">
              Events{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Gallery
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl animate-fade-in-up animation-delay-200 text-gray-300 px-4">
              Explore our portfolio of extraordinary events and celebrations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 ${
                  selectedCategory === category.id
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "border-2 border-rose-600 text-rose-600 hover:bg-rose-50"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group cursor-pointer overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-rose-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl sm:text-3xl mb-2">🔍</div>
                      <p className="text-xs sm:text-sm font-semibold">View Image</p>
                    </div>
                  </div>
                  <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-rose-600/90 text-white text-xs">
                    {item.category}
                  </Badge>
                </div>

                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 group-hover:opacity-80 transition-opacity text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95" onClick={closeLightbox}>
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-gray-900 hover:bg-white"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </Button>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox("prev")
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full z-10 bg-white/90 text-gray-900 hover:bg-white"
              >
                ←
              </Button>
            )}

            {currentIndex < filteredItems.length - 1 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox("next")
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full z-10 bg-white/90 text-gray-900 hover:bg-white"
              >
                →
              </Button>
            )}

            {/* Content */}
            <div
              className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.src || "/placeholder.svg"}
                alt={currentItem.title}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
              />

              {/* Info Panel */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/95">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{currentItem.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{currentItem.description}</p>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-2 rounded-full bg-white/90 text-gray-900 text-sm">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </main>
  )
}
