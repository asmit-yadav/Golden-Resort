"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp",
    alt: "Elegant entrance with yellow and white drapes and floral decorations",
    title: "Exquisite Wedding Entrances",
    description: "Create unforgettable first impressions with our custom-designed entrance decorations",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp",
    alt: "Elegant floral arch entrance to event venue",
    title: "Sophisticated Venue Styling",
    description: "Transform any space into a breathtaking setting for your special occasion",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp",
    alt: "Outdoor event space with water feature and colorful lighting",
    title: "Magical Outdoor Celebrations",
    description: "Create enchanting outdoor experiences with our expert lighting and decor",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-GyiaaJM8eHDS0e7ynK9dxw4ftESmPe.webp",
    alt: "Elegant stage setup with floral decorations",
    title: "Stunning Stage Designs",
    description: "Bespoke stage setups tailored to your event theme and vision",
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 50) {
      nextSlide()
    } else if (touchStart - touchEnd < -50) {
      prevSlide()
    }
  }

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Images */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Golden Resort</span>
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-2 font-light text-rose-200">
              Crafting Unforgettable Experiences
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-gray-100 px-2">
            {carouselImages[currentIndex].title}
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-8 sm:mb-12 text-gray-200 px-2 leading-relaxed">
            {carouselImages[currentIndex].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/contact" passHref>
              <Button
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 sm:px-8 py-3 sm:py-4 lg:py-6 text-base sm:text-lg rounded-full w-full sm:w-auto min-w-[200px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Plan Your Event
              </Button>
            </Link>
            <Link href="/#services" passHref>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-rose-600 px-6 sm:px-8 py-3 sm:py-4 lg:py-6 text-base sm:text-lg rounded-full transition-all duration-300 font-semibold w-full sm:w-auto min-w-[200px] hover:shadow-lg transform hover:scale-105"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex justify-center gap-2 sm:gap-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}